import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { simulateAnsi } from "../src/lib/simulator";
import { prisma } from "../src/lib/prisma";
import { rateLimit, clientIp } from "../src/lib/rateLimit";
import { validateRegistration } from "../src/lib/registerValidation";
import { signJwt, verifyJwt, findOrCreateGoogleUser } from "../src/lib/auth";
import { parseLeaderboardQuery } from "../src/lib/leaderboard";
import { parseCertificateId } from "../src/lib/certificate";
import {
  TRACKS,
  TRACK_TOTAL_DAYS,
  TRACK_CERT_TITLES,
  sanitizeProgress,
  isTrackComplete,
} from "../src/lib/progressValidation";
import {
  parseFeedQuery,
  POST_TITLE_MIN,
  POST_TITLE_MAX,
  POST_BODY_MAX,
  COMMENT_BODY_MAX,
  QUESTION_TITLE_MAX,
  GROUP_NAME_MAX,
  GROUP_DESC_MAX,
  MESSAGE_BODY_MAX,
  REPORT_REASON_MAX,
  FEED_DEFAULT_LIMIT,
  FEED_MAX_LIMIT,
  isReportTargetType,
  isReportStatus,
  reportStatusTransition,
  canModerate,
  groupSlugify,
  nextVoteValue,
  applyVote,
  answerAcceptGuard,
} from "../src/lib/community";
import {
  parseLiveQuery,
  validateLiveEvent,
  liveEventSlugify,
  deriveLiveStatus,
  isLiveEventStatus,
} from "../src/lib/live";
import { publishRecordingToYouTube } from "../src/lib/youtube";
import {
  parseCoachRequest,
  buildCoachMessages,
  enforceCoachRules,
  isCoachConfigured,
} from "../src/lib/coach";
import { askOpenRouter, DEFAULT_AI_MODEL } from "../src/lib/openrouter";
import bcrypt from "bcryptjs";

const app = express();
const PORT = Number(process.env.PORT || process.env.SERVER_PORT || 4000);
const isProd = process.env.NODE_ENV === "production";

// Never let one bad request take the whole API down (Express 4 does not
// catch async handler rejections — without this the process exits).
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection (server stays up):", err);
});

app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "128kb" }));

function cookieOpts(maxAge = 30 * 24 * 3600 * 1000): express.CookieOptions {
  return { httpOnly: true, sameSite: "lax", secure: isProd, maxAge, path: "/" };
}

function getUserFromReq(req: express.Request) {
  const token = req.cookies?.token || (req.headers.authorization?.replace("Bearer ", "") ?? "");
  if (!token) return null;
  const payload = verifyJwt(token);
  if (!payload || typeof payload.uid !== "string") return null;
  return payload as { uid: string; email: string };
}

// ---------- Ops ----------
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "astahub-api", time: new Date().toISOString() });
});

app.get("/ready", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: "up" });
  } catch {
    res.status(503).json({ ok: false, db: "down" });
  }
});

// ---------- Execute (Piston + simulator) ----------
const MAX_CODE_LENGTH = 50_000;
const MAX_OUTPUT_LENGTH = 20_000;
const PISTON_API = process.env.PISTON_API_URL || "https://emkc.org/api/v2/piston";
const AUTH_TOKEN = process.env.PISTON_AUTH_TOKEN || "";

function truncateOutput(s: string): string {
  if (s.length <= MAX_OUTPUT_LENGTH) return s;
  return s.slice(0, MAX_OUTPUT_LENGTH) + `\n\n// Output truncated at ${MAX_OUTPUT_LENGTH} chars`;
}

function getPistonLanguage(lang: string) {
  if (lang === "c") return { language: "c", version: "10.2.0" };
  if (lang === "asm") return { language: "nasm", version: "2.15.05" };
  if (lang === "python") return { language: "python", version: "*" };
  if (lang === "cpp") return { language: "c++", version: "*" };
  if (lang === "js") return { language: "javascript", version: "*" };
  if (lang === "sql") return { language: "sqlite3", version: "*" };
  if (lang === "bash") return { language: "bash", version: "*" };
  return { language: lang, version: "*" };
}

app.post("/api/execute", async (req, res) => {
  const ip = clientIp(req);
  if (!(await rateLimit(`execute:${ip}`, 30, 60_000))) {
    return res.status(429).json({ error: "Too many requests. Try again in a minute." });
  }
  const { code, language } = req.body ?? {};
  if (!code || !language) return res.status(400).json({ error: "Missing 'code' or 'language'" });
  if (typeof code !== "string" || code.length > MAX_CODE_LENGTH) return res.status(400).json({ error: "Invalid code" });
  const allowed = ["c", "asm", "python", "cpp", "js", "sql", "bash"];
  if (!allowed.includes(language)) return res.status(400).json({ error: "Unsupported language" });

  let output: string;
  let error: string | null = null;
  let real = false;

  if (AUTH_TOKEN) {
    try {
      const { language: pistonLang, version } = getPistonLanguage(language);
      const headers: Record<string, string> = { "Content-Type": "application/json", Authorization: `Bearer ${AUTH_TOKEN}` };
      const r = await fetch(`${PISTON_API}/execute`, {
        method: "POST",
        headers,
        body: JSON.stringify({ language: pistonLang, version, files: [{ content: code }], run_timeout: 5000 }),
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) throw new Error(`Piston ${r.status}`);
      const data = (await r.json()) as { compile?: { stdout: string; stderr: string }; run: { stdout: string; stderr: string; code: number; signal: string | null; status: string | null } };
      output = truncateOutput((data.compile ? `// Compiler:\n${data.compile.stderr || data.compile.stdout}\n` : "") + (data.run.stdout || "") + (data.run.stderr ? `\n// Stderr:\n${data.run.stderr}` : "") + `\n\n// exited ${data.run.code}`);
      error = data.run.status === "TO" ? "Execution timed out" : data.run.status === "SG" ? `Killed ${data.run.signal}` : data.run.stderr && !data.run.stdout ? data.run.stderr : null;
      real = true;
    } catch (e) {
      console.warn("Piston fallback", e);
      output = simulateAnsi(code, language);
      error = "(Piston unavailable — simulated)";
    }
  } else {
    output = simulateAnsi(code, language);
    error = "(Simulated — set PISTON_AUTH_TOKEN for real)";
  }
  res.json({ output, error, real });
});

// ---------- Auth ----------
app.post("/api/register", async (req, res) => {
  const ip = clientIp(req);
  if (!(await rateLimit(`register:${ip}`, 5, 10 * 60_000))) return res.status(429).json({ error: "Too many attempts" });
  const validated = validateRegistration(req.body);
  if (!validated.ok) return res.status(validated.status).json({ error: validated.error });
  const { name, email, password } = validated;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "Email exists" });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, passwordHash }, select: { id: true, name: true, email: true, image: true } });
  return res.status(201).json({ user });
});

app.post("/api/auth/signin", async (req, res) => {
  const ip = clientIp(req);
  if (!(await rateLimit(`signin:${ip}`, 10, 60_000))) return res.status(429).json({ error: "Too many sign-in attempts. Try again in a minute." });
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "Missing email/password" });
  const normalized = String(email).toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email: normalized } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  if (!user.passwordHash) return res.status(401).json({ error: "This account uses Google sign-in. Please use 'Continue with Google'." });
  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = signJwt({ uid: user.id, email: user.email });
  res.cookie("token", token, cookieOpts());
  res.json({ user: { id: user.id, name: user.name, email: user.email, image: user.image } });
});

// ---------- Google OAuth ----------
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `http://localhost:${PORT}/api/auth/google/callback`;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.get("/api/auth/google", (req, res) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return res.status(501).json({ error: "Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env. See docs/AUTH.md" });
  }
  const state = Math.random().toString(36).slice(2);
  res.cookie("oauth_state", state, { httpOnly: true, sameSite: "lax", maxAge: 10 * 60 * 1000, path: "/" });
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", GOOGLE_CLIENT_ID);
  url.searchParams.set("redirect_uri", GOOGLE_REDIRECT_URI);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "select_account");
  res.redirect(url.toString());
});

app.get("/api/auth/google/callback", async (req, res) => {
  try {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) return res.status(501).send("Google OAuth not configured");
    const { code, state } = req.query as { code?: string; state?: string };
    const storedState = req.cookies?.oauth_state;
    if (!code || !state || state !== storedState) return res.status(400).send("Invalid OAuth state");
    res.clearCookie("oauth_state", { path: "/" });
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!tokenRes.ok) {
      const t = await tokenRes.text();
      console.error("Google token exchange failed", t);
      return res.status(502).send("Google token exchange failed");
    }
    const tokenJson = (await tokenRes.json()) as { access_token: string };
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!userRes.ok) return res.status(502).send("Failed to fetch Google profile");
    const profile = (await userRes.json()) as { id: string; email: string; name: string; picture?: string };
    if (!profile.email) return res.status(400).send("Google account has no email");
    const user = await findOrCreateGoogleUser({ id: profile.id, email: profile.email, name: profile.name, picture: profile.picture });
    const token = signJwt({ uid: user.id, email: user.email });
    res.cookie("token", token, cookieOpts());
    res.redirect(`${FRONTEND_URL}/home`);
  } catch (e) {
    console.error("Google callback error", e);
    res.status(500).send("Google sign-in failed");
  }
});

app.post("/api/auth/google", async (req, res) => {
  try {
    const { idToken } = req.body ?? {};
    if (!idToken) return res.status(400).json({ error: "Missing idToken" });
    if (!GOOGLE_CLIENT_ID) return res.status(501).json({ error: "Google OAuth not configured" });
    const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!verifyRes.ok) return res.status(401).json({ error: "Invalid Google token" });
    const payload = (await verifyRes.json()) as { sub: string; email: string; name: string; picture?: string; aud: string };
    if (payload.aud !== GOOGLE_CLIENT_ID) return res.status(401).json({ error: "Token audience mismatch" });
    const user = await findOrCreateGoogleUser({ id: payload.sub, email: payload.email, name: payload.name, picture: payload.picture });
    const token = signJwt({ uid: user.id, email: user.email });
    res.cookie("token", token, cookieOpts());
    res.json({ user: { id: user.id, name: user.name, email: user.email, image: user.image } });
  } catch (e) {
    console.error("Google One-Tap error", e);
    res.status(500).json({ error: "Google sign-in failed" });
  }
});

app.post("/api/auth/signout", (_req, res) => {
  res.clearCookie("token", { path: "/", secure: isProd, sameSite: "lax" });
  res.json({ ok: true });
});

// ---------- Me / Profile ----------
app.get("/api/me", async (req, res) => {
  const payload = getUserFromReq(req);
  if (!payload) return res.status(401).json({ error: "Not authenticated" });
  const user = await prisma.user.findUnique({
    where: { id: payload.uid },
    include: { certificates: { orderBy: { issuedAt: "asc" } }, trackProgress: true },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
});

app.patch("/api/me", async (req, res) => {
  const payload = getUserFromReq(req);
  if (!payload) return res.status(401).json({ error: "Not authenticated" });
  try {
    const { name, bio } = req.body ?? {};
    const data: Record<string, string | null> = {};
    if (typeof name === "string" && name.trim()) data.name = name.trim();
    if (typeof bio === "string") data.bio = bio.trim() || null;
    const user = await prisma.user.update({
      where: { id: payload.uid },
      data,
      select: { id: true, name: true, email: true, image: true, bio: true },
    });
    return res.json({ user });
  } catch (err) {
    console.error("profile update error", err);
    return res.status(500).json({ error: "Failed to update profile." });
  }
});

app.delete("/api/me", async (req, res) => {
  const payload = getUserFromReq(req);
  if (!payload) return res.status(401).json({ error: "Not authenticated" });
  try {
    await prisma.user.delete({ where: { id: payload.uid } });
    res.clearCookie("token", { path: "/", secure: isProd, sameSite: "lax" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("account delete error", err);
    return res.status(500).json({ error: "Failed to delete account." });
  }
});

// ---------- Progress ----------
async function issueCertificateIfComplete(userId: string, track: string, completedDays: unknown, totalXp: unknown): Promise<void> {
  const total = TRACK_TOTAL_DAYS[track];
  if (!total || !isTrackComplete(completedDays, total)) return;
  const existing = await prisma.certificate.findFirst({ where: { userId, track } });
  if (existing) return;
  await prisma.certificate.create({
    data: {
      userId,
      track,
      title: `Certificate of Completion — ${TRACK_CERT_TITLES[track]}`,
      day: total,
      xp: typeof totalXp === "number" ? totalXp : total,
    },
  });
}

app.put("/api/progress", async (req, res) => {
  const payload = getUserFromReq(req);
  if (!payload) return res.status(401).json({ error: "Not authenticated." });
  try {
    const body = req.body ?? {};
    const track = typeof body.track === "string" && TRACKS.has(body.track) ? body.track : "c";
    const data = sanitizeProgress(body, track);

    let user;
    if (track === "c") {
      user = await prisma.user.update({
        where: { id: payload.uid },
        data,
        select: { id: true, name: true, email: true, image: true },
      });
    } else {
      user = await prisma.userTrackProgress.upsert({
        where: { userId_track: { userId: payload.uid, track } },
        update: data,
        create: { userId: payload.uid, track, ...data },
        select: { id: true, track: true, totalXp: true },
      });
    }
    await issueCertificateIfComplete(payload.uid, track, data.completedDays, data.totalXp);
    return res.json({ user });
  } catch (err) {
    console.error("progress sync error", err);
    return res.status(500).json({ error: "Failed to sync progress." });
  }
});

// ---------- Leaderboard ----------
app.get("/api/leaderboard", async (req, res) => {
  const { limit, track } = parseLeaderboardQuery(`http://localhost${req.originalUrl}`);
  if (track === "c") {
    const users = await prisma.user.findMany({
      orderBy: [{ totalXp: "desc" }, { updatedAt: "asc" }],
      take: limit,
      select: { id: true, name: true, image: true, totalXp: true, level: true, streak: true, currentDay: true },
    });
    return res.json({ users });
  }
  const rows = await prisma.userTrackProgress.findMany({
    where: { track },
    orderBy: [{ totalXp: "desc" }, { updatedAt: "asc" }],
    take: limit,
    select: {
      userId: true,
      totalXp: true,
      level: true,
      streak: true,
      currentDay: true,
      user: { select: { name: true, image: true } },
    },
  });
  const users = rows.map((r) => ({
    id: r.userId,
    name: r.user.name ?? "Anonymous",
    image: r.user.image,
    totalXp: r.totalXp,
    level: r.level,
    streak: r.streak,
    currentDay: r.currentDay,
  }));
  return res.json({ users });
});

// ---------- Public certificate verification ----------
// No auth: anyone with the link can confirm a credential is real.
// Exposes only the credential itself plus the earner's display name.
app.get("/api/certificates/:id/verify", async (req, res) => {
  const ip = clientIp(req);
  if (!(await rateLimit(`verify:${ip}`, 30, 60_000))) {
    return res.status(429).json({ error: "Too many attempts. Try again in a minute." });
  }
  const parsed = parseCertificateId(req.params.id);
  if (!parsed.ok) return res.status(400).json({ error: parsed.error, code: parsed.code });
  try {
    const cert = await prisma.certificate.findUnique({
      where: { id: parsed.id },
      select: {
        id: true,
        track: true,
        title: true,
        day: true,
        xp: true,
        issuedAt: true,
        user: { select: { name: true } },
      },
    });
    if (!cert) {
      return res.status(404).json({
        error: "No certificate exists with this code. Check the link and try again.",
        code: "NOT_FOUND",
      });
    }
    return res.json({
      certificate: {
        id: cert.id,
        track: cert.track,
        title: cert.title,
        day: cert.day,
        xp: cert.xp,
        issuedAt: cert.issuedAt,
      },
      earner: { name: cert.user.name ?? "Anonymous" },
    });
  } catch (err) {
    console.error("certificate verify error", err);
    return res.status(500).json({ error: "Verification is temporarily unavailable. Try again shortly." });
  }
});

// ---------- Password ----------
app.post("/api/password", async (req, res) => {
  const payload = getUserFromReq(req);
  if (!payload) return res.status(401).json({ error: "Not authenticated." });
  const { currentPassword, newPassword } = req.body ?? {};
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return res.status(400).json({ error: "New password must be at least 8 characters." });
  }
  const user = await prisma.user.findUnique({ where: { id: payload.uid } });
  if (!user || !user.passwordHash) return res.status(400).json({ error: "No password set on this account." });
  const ok = await bcrypt.compare(currentPassword ?? "", user.passwordHash);
  if (!ok) return res.status(400).json({ error: "Current password is incorrect." });
  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
  return res.json({ ok: true });
});

// ---------- Export ----------
app.get("/api/export", async (req, res) => {
  const payload = getUserFromReq(req);
  if (!payload) return res.status(401).json({ error: "Not authenticated." });
  const user = await prisma.user.findUnique({
    where: { id: payload.uid },
    include: { certificates: { orderBy: { issuedAt: "asc" } }, trackProgress: true },
  });
  if (!user) return res.status(404).json({ error: "User not found." });
  const exported = {
    exportedAt: new Date().toISOString(),
    profile: { name: user.name, email: user.email, bio: user.bio, joinedAt: user.createdAt },
    tracks: user.trackProgress.map((t) => ({
      track: t.track,
      currentDay: t.currentDay,
      totalXp: t.totalXp,
      level: t.level,
      streak: t.streak,
      lastActiveDate: t.lastActiveDate,
      completedDays: t.completedDays,
      completedExercises: t.completedExercises,
      completedAssignments: t.completedAssignments,
      notes: t.notes,
    })),
    certificates: user.certificates.map((c) => ({ id: c.id, track: c.track, title: c.title, issuedAt: c.issuedAt })),
  };
  return res.json(exported);
});

// ---------- Coach ----------
app.post("/api/coach", async (req, res) => {
  const ip = clientIp(req);
  if (!(await rateLimit(`coach:${ip}`, 10, 60_000))) {
    return res.status(429).json({ error: "Too many requests. Try again in a minute." });
  }
  if (!isCoachConfigured()) {
    return res.status(503).json({
      error: "The AI coach isn't configured on this server yet. Add OPENROUTER_API_KEY to enable it — until then, the built-in hints and community Q&A are your human-first helpers.",
      code: "NOT_CONFIGURED",
    });
  }
  let body: unknown;
  try {
    body = req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON body." });
  }
  const parsed = parseCoachRequest(body);
  if (!parsed.ok) return res.status(400).json({ error: parsed.error });
  const result = await askOpenRouter({
    messages: buildCoachMessages(parsed.value),
    apiKey: process.env.OPENROUTER_API_KEY!,
    model: process.env.AI_MODEL || DEFAULT_AI_MODEL,
  });
  if (!result.ok) return res.status(502).json({ error: result.error, code: result.code });
  return res.json({ hint: enforceCoachRules(result.text) });
});

// ---------- Posts ----------
app.get("/api/posts", async (req, res) => {
  const auth = getUserFromReq(req);
  const userId = auth?.uid ?? null;
  const { before, limit } = parseFeedQuery(`http://localhost${req.originalUrl}`);
  const posts = await prisma.post.findMany({
    where: { published: true, ...(before ? { createdAt: { lt: new Date(before) } } : {}) },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    include: {
      user: { select: { id: true, name: true, image: true } },
      votes: { select: { userId: true, value: true } },
      _count: { select: { comments: true } },
    },
  });
  const hasMore = posts.length > limit;
  const page = hasMore ? posts.slice(0, limit) : posts;
  const nextBefore = hasMore && page.length > 0 ? page[page.length - 1].createdAt.toISOString() : null;
  const items = page.map((p) => ({
    id: p.id,
    title: p.title,
    body: p.body,
    createdAt: p.createdAt.toISOString(),
    author: { id: p.user.id, name: p.user.name, image: p.user.image },
    score: p.votes.reduce((s: number, v: { value: number }) => s + v.value, 0),
    myVote: userId ? (p.votes.find((v: { userId: string; value: number }) => v.userId === userId)?.value ?? null) : null,
    commentCount: p._count.comments,
  }));
  res.json({ posts: items, nextBefore });
});

app.post("/api/posts", async (req, res) => {
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const title = typeof req.body?.title === "string" ? (req.body.title as string).trim() : "";
  const postBody = typeof req.body?.body === "string" ? (req.body.body as string).trim() : "";
  if (title.length < POST_TITLE_MIN || title.length > POST_TITLE_MAX) return res.status(400).json({ error: `Title must be ${POST_TITLE_MIN}–${POST_TITLE_MAX} characters.` });
  if (!postBody || postBody.length > POST_BODY_MAX) return res.status(400).json({ error: `Body must be 1–${POST_BODY_MAX} characters.` });
  const post = await prisma.post.create({ data: { userId: auth.uid, title, body: postBody }, select: { id: true } });
  await prisma.user.update({ where: { id: auth.uid }, data: { reputation: { increment: 5 } } });
  res.status(201).json({ post: { id: post.id } });
});

app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const auth = getUserFromReq(req);
  const userId = auth?.uid ?? null;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, image: true } },
      votes: { select: { userId: true, value: true } },
      comments: { orderBy: { createdAt: "asc" }, include: { user: { select: { id: true, name: true, image: true } } } },
    },
  });
  if (!post || !post.published) return res.status(404).json({ error: "Post not found." });
  const isMod = canModerate(auth?.email ?? null, process.env.MODERATOR_EMAILS ?? "");
  res.json({
    post: {
      id: post.id,
      title: post.title,
      body: post.body,
      createdAt: post.createdAt.toISOString(),
      author: { id: post.user.id, name: post.user.name, image: post.user.image },
      score: post.votes.reduce((s: number, v: { value: number }) => s + v.value, 0),
      myVote: userId ? (post.votes.find((v: { userId: string; value: number }) => v.userId === userId)?.value ?? null) : null,
      canDelete: post.userId === userId || isMod,
      comments: post.comments.map((c: { id: string; body: string; createdAt: Date; user: { id: string; name: string; image: string | null } }) => ({
        id: c.id,
        body: c.body,
        createdAt: c.createdAt.toISOString(),
        author: { id: c.user.id, name: c.user.name, image: c.user.image },
      })),
    },
  });
});

app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const post = await prisma.post.findUnique({ where: { id }, select: { id: true, userId: true } });
  if (!post) return res.status(404).json({ error: "Post not found." });
  const isMod = canModerate(auth.email ?? null, process.env.MODERATOR_EMAILS ?? "");
  if (post.userId !== auth.uid && !isMod) return res.status(403).json({ error: "You can only delete your own posts." });
  await prisma.post.delete({ where: { id } });
  res.json({ ok: true });
});

app.post("/api/posts/:id/vote", async (req, res) => {
  const { id } = req.params;
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const incoming = Number(req.body?.value);
  if (incoming !== 1 && incoming !== -1) return res.status(400).json({ error: "Vote value must be 1 or -1." });
  const post = await prisma.post.findUnique({ where: { id }, select: { id: true } });
  if (!post) return res.status(404).json({ error: "Post not found." });
  const existing = await prisma.vote.findUnique({ where: { userId_postId: { userId: auth.uid, postId: id } } });
  const prev = existing?.value ?? null;
  const next = nextVoteValue(prev, incoming);
  if (next === null) {
    if (existing) await prisma.vote.delete({ where: { id: existing.id } });
  } else if (existing) {
    await prisma.vote.update({ where: { id: existing.id }, data: { value: next } });
  } else {
    await prisma.vote.create({ data: { userId: auth.uid, postId: id, value: next } });
  }
  const votes = await prisma.vote.findMany({ where: { postId: id }, select: { value: true } });
  const total = votes.reduce((s: number, v: { value: number }) => s + v.value, 0);
  res.json({ score: total, myVote: next, delta: applyVote(0, prev, next) });
});

app.get("/api/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id }, select: { id: true } });
  if (!post) return res.status(404).json({ error: "Post not found." });
  const comments = await prisma.comment.findMany({ where: { postId: id }, orderBy: { createdAt: "asc" }, include: { user: { select: { id: true, name: true, image: true } } } });
  res.json({
    comments: comments.map((c: { id: string; body: string; createdAt: Date; user: { id: string; name: string; image: string | null } }) => ({
      id: c.id,
      body: c.body,
      createdAt: c.createdAt.toISOString(),
      author: { id: c.user.id, name: c.user.name, image: c.user.image },
    })),
  });
});

app.post("/api/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const commentBody = typeof req.body?.body === "string" ? (req.body.body as string).trim() : "";
  if (!commentBody || commentBody.length > COMMENT_BODY_MAX) return res.status(400).json({ error: `Comment must be 1–${COMMENT_BODY_MAX} characters.` });
  const post = await prisma.post.findUnique({ where: { id }, select: { id: true } });
  if (!post) return res.status(404).json({ error: "Post not found." });
  const comment = await prisma.comment.create({ data: { userId: auth.uid, postId: id, body: commentBody }, include: { user: { select: { id: true, name: true, image: true } } } });
  res.status(201).json({ comment: { id: comment.id, body: comment.body, createdAt: comment.createdAt.toISOString(), author: { id: comment.user.id, name: comment.user.name, image: comment.user.image } } });
});

// ---------- Questions ----------
app.get("/api/questions", async (req, res) => {
  const url = `http://localhost${req.originalUrl}`;
  const params = new URL(url).searchParams;
  const status = params.get("status") === "answered" || params.get("status") === "closed" ? params.get("status")! : "open";
  const parsed = parseInt(params.get("limit") ?? String(FEED_DEFAULT_LIMIT), 10);
  const limit = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), FEED_MAX_LIMIT) : FEED_DEFAULT_LIMIT;
  const questions = await prisma.question.findMany({
    where: { status },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit,
    include: { user: { select: { id: true, name: true, image: true } }, _count: { select: { answers: true, comments: true } } },
  });
  res.json({
    questions: questions.map((q: { id: string; title: string; body: string; status: string; tags: string[]; createdAt: Date; user: { id: string; name: string; image: string | null }; _count: { answers: number; comments: number } }) => ({
      id: q.id,
      title: q.title,
      body: q.body,
      status: q.status,
      tags: q.tags,
      createdAt: q.createdAt.toISOString(),
      author: { id: q.user.id, name: q.user.name, image: q.user.image },
      answerCount: q._count.answers,
      commentCount: q._count.comments,
    })),
  });
});

app.post("/api/questions", async (req, res) => {
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const title = typeof req.body?.title === "string" ? (req.body.title as string).trim() : "";
  const questionBody = typeof req.body?.body === "string" ? (req.body.body as string).trim() : "";
  const evidence = typeof req.body?.evidence === "string" ? (req.body.evidence as string).trim().slice(0, 2000) : "";
  const tags = Array.isArray(req.body?.tags)
    ? (req.body.tags as unknown[]).filter((t): t is string => typeof t === "string").map((t) => t.trim().toLowerCase()).filter((t) => t && t.length <= 20).slice(0, 5)
    : [];
  if (title.length < 8 || title.length > QUESTION_TITLE_MAX) return res.status(400).json({ error: `Question title must be 8–${QUESTION_TITLE_MAX} characters.` });
  if (!questionBody || questionBody.length > POST_BODY_MAX) return res.status(400).json({ error: `Question body must be 1–${POST_BODY_MAX} characters.` });
  if (!evidence) return res.status(400).json({ error: "Show your effort — describe what you tried before asking (evidence of effort)." });
  const question = await prisma.question.create({ data: { userId: auth.uid, title, body: questionBody, evidence, tags }, select: { id: true } });
  await prisma.user.update({ where: { id: auth.uid }, data: { reputation: { increment: 5 } } });
  res.status(201).json({ question: { id: question.id } });
});

app.get("/api/questions/:id", async (req, res) => {
  const { id } = req.params;
  const auth = getUserFromReq(req);
  const userId = auth?.uid ?? null;
  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, image: true } },
      comments: { orderBy: { createdAt: "asc" }, include: { user: { select: { id: true, name: true, image: true } } } },
      answers: {
        orderBy: [{ accepted: "desc" }, { createdAt: "asc" }],
        include: {
          user: { select: { id: true, name: true, image: true } },
          votes: { select: { userId: true, value: true } },
          comments: { orderBy: { createdAt: "asc" }, include: { user: { select: { id: true, name: true, image: true } } } },
        },
      },
    },
  });
  if (!question) return res.status(404).json({ error: "Question not found." });
  res.json({
    question: {
      id: question.id,
      title: question.title,
      body: question.body,
      evidence: question.evidence,
      status: question.status,
      tags: question.tags,
      createdAt: question.createdAt.toISOString(),
      author: { id: question.user.id, name: question.user.name, image: question.user.image },
      isAuthor: userId === question.userId,
      comments: question.comments.map((c: { id: string; body: string; createdAt: Date; user: { id: string; name: string; image: string | null } }) => ({
        id: c.id,
        body: c.body,
        createdAt: c.createdAt.toISOString(),
        author: { id: c.user.id, name: c.user.name, image: c.user.image },
      })),
      answers: question.answers.map((a: {
        id: string;
        body: string;
        accepted: boolean;
        createdAt: Date;
        user: { id: string; name: string; image: string | null };
        votes: { userId: string; value: number }[];
        comments: { id: string; body: string; createdAt: Date; user: { id: string; name: string; image: string | null } }[];
      }) => ({
        id: a.id,
        body: a.body,
        accepted: a.accepted,
        createdAt: a.createdAt.toISOString(),
        author: { id: a.user.id, name: a.user.name, image: a.user.image },
        score: a.votes.reduce((s: number, v: { value: number }) => s + v.value, 0),
        myVote: userId ? (a.votes.find((v) => v.userId === userId)?.value ?? null) : null,
        comments: a.comments.map((c) => ({ id: c.id, body: c.body, createdAt: c.createdAt.toISOString(), author: { id: c.user.id, name: c.user.name, image: c.user.image } })),
      })),
    },
  });
});

app.post("/api/questions/:id/answers", async (req, res) => {
  const { id } = req.params;
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const answerBody = typeof req.body?.body === "string" ? (req.body.body as string).trim() : "";
  if (!answerBody || answerBody.length > POST_BODY_MAX) return res.status(400).json({ error: `Answer must be 1–${POST_BODY_MAX} characters.` });
  const question = await prisma.question.findUnique({ where: { id }, select: { id: true, status: true } });
  if (!question) return res.status(404).json({ error: "Question not found." });
  if (question.status === "closed") return res.status(403).json({ error: "This question is closed to new answers." });
  const answer = await prisma.answer.create({ data: { questionId: id, userId: auth.uid, body: answerBody }, include: { user: { select: { id: true, name: true, image: true } } } });
  if (question.status === "open") await prisma.question.update({ where: { id }, data: { status: "answered" } });
  await prisma.user.update({ where: { id: auth.uid }, data: { reputation: { increment: 10 } } });
  res.status(201).json({ answer: { id: answer.id, body: answer.body, accepted: false, createdAt: answer.createdAt.toISOString(), author: { id: answer.user.id, name: answer.user.name, image: answer.user.image }, score: 0, myVote: null, comments: [] } });
});

app.post("/api/questions/:id/answers/:aid/vote", async (req, res) => {
  const { aid } = req.params;
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const incoming = Number(req.body?.value);
  if (incoming !== 1 && incoming !== -1) return res.status(400).json({ error: "Vote value must be 1 or -1." });
  const answer = await prisma.answer.findUnique({ where: { id: aid }, select: { id: true } });
  if (!answer) return res.status(404).json({ error: "Answer not found." });
  const existing = await prisma.vote.findUnique({ where: { userId_answerId: { userId: auth.uid, answerId: aid } } });
  const next = nextVoteValue(existing?.value ?? null, incoming);
  if (next === null) {
    if (existing) await prisma.vote.delete({ where: { id: existing.id } });
  } else if (existing) {
    await prisma.vote.update({ where: { id: existing.id }, data: { value: next } });
  } else {
    await prisma.vote.create({ data: { userId: auth.uid, answerId: aid, value: next } });
  }
  const votes = await prisma.vote.findMany({ where: { answerId: aid }, select: { value: true } });
  res.json({ score: votes.reduce((s: number, v: { value: number }) => s + v.value, 0), myVote: next });
});

app.patch("/api/questions/:id/answers/:aid/accept", async (req, res) => {
  const { id, aid } = req.params;
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const question = await prisma.question.findUnique({ where: { id }, select: { userId: true } });
  if (!question) return res.status(404).json({ error: "Question not found." });
  const answer = await prisma.answer.findUnique({ where: { id: aid }, select: { id: true, accepted: true, userId: true } });
  if (!answer) return res.status(404).json({ error: "Answer not found." });
  const guard = answerAcceptGuard({ actorUserId: auth.uid, questionUserId: question.userId, isAccepted: answer.accepted });
  if (!guard) return res.status(403).json({ error: "Only the question author can accept an answer, once." });
  await prisma.$transaction([
    prisma.answer.update({ where: { id: aid }, data: { accepted: true } }),
    prisma.user.update({ where: { id: answer.userId }, data: { reputation: { increment: 15 } } }),
  ]);
  res.json({ ok: true });
});

// ---------- Comments (generic) ----------
const COMMENT_TARGETS = ["post", "question", "answer"] as const;
function targetFilter(targetType: string, targetId: string): Record<string, string> {
  if (targetType === "post") return { postId: targetId };
  if (targetType === "question") return { questionId: targetId };
  return { answerId: targetId };
}
app.get("/api/comments", async (req, res) => {
  const targetType = String(req.query.targetType ?? "");
  const targetId = String(req.query.targetId ?? "");
  if (!targetType || !(COMMENT_TARGETS as readonly string[]).includes(targetType) || !targetId) return res.status(400).json({ error: "targetType and targetId are required." });
  const comments = await prisma.comment.findMany({ where: targetFilter(targetType, targetId), orderBy: { createdAt: "asc" }, include: { user: { select: { id: true, name: true, image: true } } } });
  res.json({ comments: comments.map((c: { id: string; body: string; createdAt: Date; user: { id: string; name: string; image: string | null } }) => ({ id: c.id, body: c.body, createdAt: c.createdAt.toISOString(), author: { id: c.user.id, name: c.user.name, image: c.user.image } })) });
});
app.post("/api/comments", async (req, res) => {
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const targetType = req.body?.targetType;
  const targetId = typeof req.body?.targetId === "string" ? (req.body.targetId as string) : "";
  const commentBody = typeof req.body?.body === "string" ? (req.body.body as string).trim() : "";
  if (typeof targetType !== "string" || !(COMMENT_TARGETS as readonly string[]).includes(targetType) || !targetId) return res.status(400).json({ error: "targetType and targetId are required." });
  if (!commentBody || commentBody.length > COMMENT_BODY_MAX) return res.status(400).json({ error: `Comment must be 1–${COMMENT_BODY_MAX} characters.` });
  const comment = await prisma.comment.create({ data: { userId: auth.uid, body: commentBody, ...targetFilter(targetType, targetId) }, include: { user: { select: { id: true, name: true, image: true } } } });
  res.status(201).json({ comment: { id: comment.id, body: comment.body, createdAt: comment.createdAt.toISOString(), author: { id: comment.user.id, name: comment.user.name, image: comment.user.image } } });
});

// ---------- Groups ----------
app.get("/api/groups", async (_req, res) => {
  const groups = await prisma.group.findMany({ orderBy: { createdAt: "desc" }, include: { owner: { select: { name: true, image: true } }, _count: { select: { members: true } } } });
  res.json({ groups: groups.map((g: { id: string; slug: string; name: string; description: string; createdAt: Date; owner: { name: string; image: string | null }; _count: { members: number } }) => ({ id: g.id, slug: g.slug, name: g.name, description: g.description, createdAt: g.createdAt.toISOString(), owner: { name: g.owner.name, image: g.owner.image }, memberCount: g._count.members })) });
});
app.post("/api/groups", async (req, res) => {
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const name = typeof req.body?.name === "string" ? (req.body.name as string).trim() : "";
  const description = typeof req.body?.description === "string" ? (req.body.description as string).trim() : "";
  if (!name || name.length > GROUP_NAME_MAX) return res.status(400).json({ error: `Group name must be 1–${GROUP_NAME_MAX} characters.` });
  if (description.length > GROUP_DESC_MAX) return res.status(400).json({ error: `Description must be at most ${GROUP_DESC_MAX} characters.` });
  const slug = groupSlugify(name);
  const existing = await prisma.group.findUnique({ where: { slug } });
  if (existing) return res.status(409).json({ error: "A group with this name already exists." });
  const group = await prisma.group.create({ data: { slug, name, description, ownerId: auth.uid, members: { create: { userId: auth.uid, role: "owner" } } }, select: { slug: true } });
  res.status(201).json({ group: { slug: group.slug } });
});
app.get("/api/groups/:slug", async (req, res) => {
  const { slug } = req.params;
  const auth = getUserFromReq(req);
  const group = await prisma.group.findUnique({ where: { slug }, include: { owner: { select: { id: true, name: true, image: true } }, members: { include: { user: { select: { id: true, name: true, image: true } } } } } });
  if (!group) return res.status(404).json({ error: "Group not found." });
  const isMember = auth?.uid ? group.members.some((m: { userId: string }) => m.userId === auth!.uid) : false;
  const myRole = auth?.uid ? (group.members.find((m: { userId: string; role: string }) => m.userId === auth!.uid)?.role ?? null) : null;
  res.json({ group: { id: group.id, slug: group.slug, name: group.name, description: group.description, createdAt: group.createdAt.toISOString(), owner: { id: group.owner.id, name: group.owner.name, image: group.owner.image }, isMember, myRole, members: group.members.map((m: { user: { id: string; name: string; image: string | null }; role: string }) => ({ id: m.user.id, name: m.user.name, image: m.user.image, role: m.role })) } });
});
app.patch("/api/groups/:slug", async (req, res) => {
  const { slug } = req.params;
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const action = req.body?.action;
  if (action !== "join" && action !== "leave") return res.status(400).json({ error: "Action must be 'join' or 'leave'." });
  const group = await prisma.group.findUnique({ where: { slug }, select: { id: true } });
  if (!group) return res.status(404).json({ error: "Group not found." });
  const existing = await prisma.groupMember.findUnique({ where: { groupId_userId: { groupId: group.id, userId: auth.uid } } });
  if (action === "join") {
    if (!existing) await prisma.groupMember.create({ data: { groupId: group.id, userId: auth.uid, role: "member" } });
  } else if (existing) {
    await prisma.groupMember.delete({ where: { id: existing.id } });
  }
  res.json({ ok: true, member: action === "join" });
});
app.get("/api/groups/:slug/messages", async (req, res) => {
  const { slug } = req.params;
  const after = String(req.query.after ?? "");
  const parsed = parseInt(String(req.query.limit ?? "50"), 10);
  const limit = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 200) : 50;
  const group = await prisma.group.findUnique({ where: { slug }, select: { id: true } });
  if (!group) return res.status(404).json({ error: "Group not found." });
  const messages = await prisma.message.findMany({ where: { groupId: group.id, ...(after ? { createdAt: { gt: new Date(after) } } : {}) }, orderBy: { createdAt: "asc" }, take: limit, include: { user: { select: { id: true, name: true, image: true } } } });
  res.json({ messages: messages.map((m: { id: string; body: string; createdAt: Date; user: { id: string; name: string; image: string | null } }) => ({ id: m.id, body: m.body, createdAt: m.createdAt.toISOString(), author: { id: m.user.id, name: m.user.name, image: m.user.image } })) });
});
app.post("/api/groups/:slug/messages", async (req, res) => {
  const { slug } = req.params;
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const messageBody = typeof req.body?.body === "string" ? (req.body.body as string).trim() : "";
  if (!messageBody || messageBody.length > MESSAGE_BODY_MAX) return res.status(400).json({ error: `Message must be 1–${MESSAGE_BODY_MAX} characters.` });
  const group = await prisma.group.findUnique({ where: { slug }, select: { id: true } });
  if (!group) return res.status(404).json({ error: "Group not found." });
  const membership = await prisma.groupMember.findUnique({ where: { groupId_userId: { groupId: group.id, userId: auth.uid } }, select: { id: true } });
  if (!membership) return res.status(403).json({ error: "Join the group before sending messages." });
  const message = await prisma.message.create({ data: { groupId: group.id, userId: auth.uid, body: messageBody }, include: { user: { select: { id: true, name: true, image: true } } } });
  res.status(201).json({ message: { id: message.id, body: message.body, createdAt: message.createdAt.toISOString(), author: { id: message.user.id, name: message.user.name, image: message.user.image } } });
});

// ---------- Reports ----------
app.get("/api/reports", async (req, res) => {
  const auth = getUserFromReq(req);
  if (!canModerate(auth?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) return res.status(403).json({ error: "Moderator access required." });
  const reports = await prisma.report.findMany({ where: { status: "open" }, orderBy: { createdAt: "desc" }, take: 100, include: { reporter: { select: { id: true, name: true, image: true } } } });
  res.json({ reports: reports.map((r: { id: string; targetType: string; targetId: string; reason: string; status: string; createdAt: Date; reporter: { id: string; name: string; image: string | null } }) => ({ id: r.id, targetType: r.targetType, targetId: r.targetId, reason: r.reason, status: r.status, createdAt: r.createdAt.toISOString(), reporter: { id: r.reporter.id, name: r.reporter.name, image: r.reporter.image } })) });
});
app.post("/api/reports", async (req, res) => {
  const auth = getUserFromReq(req);
  if (!auth?.uid) return res.status(401).json({ error: "Not authenticated." });
  const targetType = req.body?.targetType;
  const targetId = typeof req.body?.targetId === "string" ? (req.body.targetId as string) : "";
  const reason = typeof req.body?.reason === "string" ? (req.body.reason as string).trim() : "";
  if (!isReportTargetType(targetType)) return res.status(400).json({ error: "Invalid report target type." });
  if (!targetId) return res.status(400).json({ error: "Missing target id." });
  if (!reason || reason.length > REPORT_REASON_MAX) return res.status(400).json({ error: `Reason must be 1–${REPORT_REASON_MAX} characters.` });
  const report = await prisma.report.create({ data: { reporterId: auth.uid, targetType, targetId, reason }, select: { id: true } });
  res.status(201).json({ report: { id: report.id } });
});
app.patch("/api/reports/:id", async (req, res) => {
  const { id } = req.params;
  const auth = getUserFromReq(req);
  if (!canModerate(auth?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) return res.status(403).json({ error: "Moderator access required." });
  const next = req.body?.status;
  if (!isReportStatus(next)) return res.status(400).json({ error: "Status must be 'actioned' or 'dismissed'." });
  const report = await prisma.report.findUnique({ where: { id }, select: { id: true, status: true } });
  if (!report) return res.status(404).json({ error: "Report not found." });
  const status = reportStatusTransition(report.status as "open" | "actioned" | "dismissed", next as string);
  if (status !== report.status) await prisma.report.update({ where: { id }, data: { status, actionedAt: new Date() } });
  res.json({ ok: true, status });
});

// ---------- Live ----------
function serializeLiveEvent(
  e: {
    id: string;
    slug: string;
    title: string;
    description: string;
    type: string;
    track: string | null;
    lessonDay: number | null;
    startAt: Date;
    durationMinutes: number;
    hostName: string;
    youtubeUrl: string | null;
    recordingUrl: string | null;
    status: string;
    createdAt: Date;
  },
  now: Date,
) {
  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    description: e.description,
    type: e.type,
    track: e.track,
    lessonDay: e.lessonDay,
    startAt: e.startAt.toISOString(),
    durationMinutes: e.durationMinutes,
    hostName: e.hostName,
    youtubeUrl: e.youtubeUrl,
    recordingUrl: e.recordingUrl,
    status: deriveLiveStatus(e.status, e.startAt, e.durationMinutes, now),
  };
}
app.get("/api/live", async (req, res) => {
  const { scope, limit } = parseLiveQuery(`http://localhost${req.originalUrl}`);
  const now = new Date();
  const storedStatuses = scope === "past" ? ["finished", "cancelled"] : ["scheduled", "live"];
  const rows = await prisma.liveEvent.findMany({ where: { status: { in: storedStatuses } }, orderBy: { startAt: scope === "past" ? "desc" : "asc" }, take: limit * 3 });
  const derived = rows.map((e) => serializeLiveEvent(e as Parameters<typeof serializeLiveEvent>[0], now)).filter((e) => (scope === "past" ? e.status === "finished" || e.status === "cancelled" : e.status === "scheduled" || e.status === "live")).slice(0, limit);
  return res.json({ events: derived });
});
app.post("/api/live", async (req, res) => {
  const user = getUserFromReq(req);
  if (!canModerate(user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) return res.status(403).json({ error: "Moderator access required." });
  const body = req.body as Record<string, unknown> | undefined;
  if (!body || typeof body !== "object") return res.status(400).json({ error: "Invalid JSON body." });
  const result = validateLiveEvent(body);
  if (!result.ok) return res.status(400).json({ error: result.error });
  const baseSlug = liveEventSlugify(result.value.title);
  let slug = baseSlug;
  for (let i = 2; i <= 10; i++) {
    const taken = await prisma.liveEvent.findUnique({ where: { slug }, select: { id: true } });
    if (!taken) break;
    slug = `${baseSlug}-${i}`;
  }
  const event = await prisma.liveEvent.create({
    data: {
      slug,
      title: result.value.title,
      description: result.value.description,
      type: result.value.type,
      track: result.value.track,
      lessonDay: result.value.lessonDay,
      startAt: new Date(result.value.startAt),
      durationMinutes: result.value.durationMinutes,
      hostName: result.value.hostName,
      youtubeUrl: result.value.youtubeUrl,
      recordingUrl: result.value.recordingUrl,
      status: "scheduled",
      createdById: user!.uid,
    },
  });
  return res.status(201).json({ event: serializeLiveEvent(event as Parameters<typeof serializeLiveEvent>[0], new Date()) });
});
app.patch("/api/live/:id", async (req, res) => {
  const { id } = req.params;
  const user = getUserFromReq(req);
  if (!canModerate(user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) return res.status(403).json({ error: "Moderator access required." });
  const existing = await prisma.liveEvent.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: "Event not found." });
  const body = req.body as Record<string, unknown> | undefined;
  if (!body || typeof body !== "object") return res.status(400).json({ error: "Invalid JSON body." });
  const status = (body as { status?: unknown }).status;
  if (status !== undefined && !isLiveEventStatus(status)) return res.status(400).json({ error: "Invalid status." });
  const merged = {
    title: (body.title as unknown) ?? existing.title,
    description: (body.description as unknown) ?? existing.description,
    type: (body.type as unknown) ?? existing.type,
    track: (body.track as unknown) ?? existing.track,
    lessonDay: (body.lessonDay as unknown) ?? existing.lessonDay,
    startAt: (body.startAt as unknown) ?? existing.startAt.toISOString(),
    durationMinutes: (body.durationMinutes as unknown) ?? existing.durationMinutes,
    hostName: (body.hostName as unknown) ?? existing.hostName,
    youtubeUrl: (body.youtubeUrl as unknown) ?? existing.youtubeUrl,
    recordingUrl: (body.recordingUrl as unknown) ?? existing.recordingUrl,
  };
  const result = validateLiveEvent(merged as Record<string, unknown>);
  if (!result.ok) return res.status(400).json({ error: result.error });
  const event = await prisma.liveEvent.update({
    where: { id },
    data: {
      title: result.value.title,
      description: result.value.description,
      type: result.value.type,
      track: result.value.track,
      lessonDay: result.value.lessonDay,
      startAt: new Date(result.value.startAt),
      durationMinutes: result.value.durationMinutes,
      hostName: result.value.hostName,
      youtubeUrl: result.value.youtubeUrl,
      recordingUrl: result.value.recordingUrl,
      ...(status !== undefined ? { status: status as string } : {}),
    },
  });
  return res.json({ event: { id: event.id, slug: event.slug, title: event.title, status: deriveLiveStatus(event.status, event.startAt, event.durationMinutes, new Date()) } });
});
app.delete("/api/live/:id", async (req, res) => {
  const { id } = req.params;
  const user = getUserFromReq(req);
  if (!canModerate(user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) return res.status(403).json({ error: "Moderator access required." });
  const existing = await prisma.liveEvent.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return res.status(404).json({ error: "Event not found." });
  await prisma.liveEvent.delete({ where: { id } });
  return res.json({ ok: true });
});
app.get("/api/live/:id/messages", async (req, res) => {
  const { id } = req.params;
  const url = new URL(`http://localhost${req.originalUrl}`);
  const after = url.searchParams.get("after");
  const parsed = parseInt(url.searchParams.get("limit") ?? "100", 10);
  const limit = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 300) : 100;
  const event = await prisma.liveEvent.findUnique({ where: { id }, select: { id: true } });
  if (!event) return res.status(404).json({ error: "Event not found." });
  const messages = await prisma.liveEventMessage.findMany({ where: { eventId: id, ...(after ? { createdAt: { gt: new Date(after) } } : {}) }, orderBy: { createdAt: "asc" }, take: limit, include: { user: { select: { id: true, name: true, image: true } } } });
  return res.json({ messages: messages.map((m) => ({ id: m.id, body: m.body, createdAt: m.createdAt.toISOString(), author: { id: m.user.id, name: m.user.name, image: m.user.image } })) });
});
app.post("/api/live/:id/messages", async (req, res) => {
  const { id } = req.params;
  const user = getUserFromReq(req);
  if (!user?.uid) return res.status(401).json({ error: "Not authenticated." });
  const messageBody = typeof (req.body as { body?: unknown })?.body === "string" ? ((req.body as { body: string }).body as string).trim() : "";
  if (!messageBody || messageBody.length > MESSAGE_BODY_MAX) return res.status(400).json({ error: `Message must be 1–${MESSAGE_BODY_MAX} characters.` });
  const event = await prisma.liveEvent.findUnique({ where: { id }, select: { id: true } });
  if (!event) return res.status(404).json({ error: "Event not found." });
  const message = await prisma.liveEventMessage.create({ data: { eventId: id, userId: user.uid, body: messageBody }, include: { user: { select: { id: true, name: true, image: true } } } });
  return res.status(201).json({ message: { id: message.id, body: message.body, createdAt: message.createdAt.toISOString(), author: { id: message.user.id, name: message.user.name, image: message.user.image } } });
});
app.post("/api/live/:id/export", async (req, res) => {
  const { id } = req.params;
  const user = getUserFromReq(req);
  if (!canModerate(user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) return res.status(403).json({ error: "Moderator access required." });
  const event = await prisma.liveEvent.findUnique({ where: { id } });
  if (!event) return res.status(404).json({ error: "Event not found." });
  const result = await publishRecordingToYouTube({ title: event.title, description: event.description, trackSlug: event.track, lessonDay: event.lessonDay, sourceUrl: event.recordingUrl ?? event.youtubeUrl ?? null });
  if (!result.ok) return res.status(400).json({ error: result.error });
  return res.json({ message: result.message, metadata: result.metadata });
});

// ---------- Health ----------
app.get("/api/health", (_req, res) => res.json({ ok: true, poweredBy: "https://ps-hub.org" }));

// Global error handler (must be after all routes)
app.use(((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error", err);
  res.status(500).json({ error: "Internal server error" });
}) as express.ErrorRequestHandler);

// 404 for unknown API routes (kept honest, never fake success)
app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => console.log(`AstaHub API (Vite) listening on http://localhost:${PORT} — powered by https://ps-hub.org`));
