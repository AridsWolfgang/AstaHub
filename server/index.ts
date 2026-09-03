import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { simulateAnsi } from "../src/lib/simulator";
import { prisma } from "../src/lib/prisma";
import { rateLimit, clientIp } from "../src/lib/rateLimit";
import { validateRegistration } from "../src/lib/registerValidation";
import { signJwt, verifyJwt, findOrCreateGoogleUser } from "../src/lib/auth";
import bcrypt from "bcryptjs";

const app = express();
const PORT = Number(process.env.PORT || process.env.SERVER_PORT || 4000);

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "128kb" }));

// helper to get user from jwt cookie/header
function getUserFromReq(req: express.Request) {
  const token = req.cookies?.token || (req.headers.authorization?.replace("Bearer ", "") ?? "");
  if (!token) return null;
  const payload = verifyJwt(token);
  if (!payload || typeof payload.uid !== "string") return null;
  return payload as { uid: string; email: string };
}

// ---------- Execute (Piston + simulator) ----------
const MAX_CODE_LENGTH = 50_000;
const PISTON_API = "https://emkc.org/api/v2/piston";
const AUTH_TOKEN = process.env.PISTON_AUTH_TOKEN || "";

function getPistonLanguage(lang: string) {
  if (lang === "c") return { language: "c", version: "10.2.0" };
  if (lang === "asm") return { language: "nasm", version: "2.15.05" };
  if (lang === "python") return { language: "python", version: "*" };
  if (lang === "cpp") return { language: "c++", version: "*" };
  if (lang === "js") return { language: "javascript", version: "*" };
  if (lang === "rust") return { language: "rust", version: "*" };
  if (lang === "sql") return { language: "sqlite3", version: "*" };
  if (lang === "bash") return { language: "bash", version: "*" };
  return { language: lang, version: "*" };
}

app.post("/api/execute", async (req, res) => {
  const ip = clientIp(req as unknown as Request);
  if (!rateLimit(`execute:${ip}`, 30, 60_000)) {
    return res.status(429).json({ error: "Too many requests. Try again in a minute." });
  }
  const { code, language } = req.body ?? {};
  if (!code || !language) return res.status(400).json({ error: "Missing 'code' or 'language'" });
  if (typeof code !== "string" || code.length > MAX_CODE_LENGTH) return res.status(400).json({ error: "Invalid code" });
  const allowed = ["c","asm","python","cpp","js","rust","sql","bash"];
  if (!allowed.includes(language)) return res.status(400).json({ error: "Unsupported language" });

  let output: string;
  let error: string | null = null;
  let real = false;

  if (AUTH_TOKEN) {
    try {
      const { language: pistonLang, version } = getPistonLanguage(language);
      const headers: Record<string,string> = { "Content-Type": "application/json", Authorization: `Bearer ${AUTH_TOKEN}` };
      const r = await fetch(`${PISTON_API}/execute`, {
        method: "POST",
        headers,
        body: JSON.stringify({ language: pistonLang, version, files: [{ content: code }], run_timeout: 5000 }),
      });
      if (!r.ok) throw new Error(`Piston ${r.status}`);
      const data = await r.json() as { compile?: { stdout:string;stderr:string }; run:{ stdout:string;stderr:string;code:number;signal:string|null;status:string|null } };
      output = (data.compile ? `// Compiler:\n${data.compile.stderr||data.compile.stdout}\n` : "") + (data.run.stdout||"") + (data.run.stderr?`\n// Stderr:\n${data.run.stderr}`:"") + `\n\n// exited ${data.run.code}`;
      error = data.run.status==="TO"?"Execution timed out": data.run.status==="SG"?`Killed ${data.run.signal}`: (data.run.stderr&&!data.run.stdout?data.run.stderr:null);
      real = true;
    } catch (e) {
      console.warn("Piston fallback",e);
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
  const ip = clientIp(req as unknown as Request);
  if (!rateLimit(`register:${ip}`, 5, 10*60_000)) return res.status(429).json({ error: "Too many attempts" });
  const validated = validateRegistration(req.body);
  if (!validated.ok) return res.status(validated.status).json({ error: validated.error });
  const { name, email, password } = validated;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "Email exists" });
  const passwordHash = await bcrypt.hash(password,10);
  const user = await prisma.user.create({ data:{ name,email,passwordHash }, select:{ id:true,name:true,email:true,image:true }});
  return res.status(201).json({ user });
});

app.post("/api/auth/signin", async (req,res)=>{
  const { email, password } = req.body ?? {};
  if(!email||!password) return res.status(400).json({ error:"Missing email/password" });
  const normalized = String(email).toLowerCase().trim();
  const user = await prisma.user.findUnique({ where:{ email: normalized }});
  if(!user) return res.status(401).json({ error:"Invalid credentials" });
  if(!user.passwordHash) return res.status(401).json({ error:"This account uses Google sign-in. Please use 'Continue with Google'." });
  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if(!ok) return res.status(401).json({ error:"Invalid credentials" });
  const token = signJwt({ uid: user.id, email: user.email });
  res.cookie("token", token, { httpOnly:true, sameSite:"lax", maxAge: 30*24*3600*1000, path:"/" });
  res.json({ user:{ id:user.id,name:user.name,email:user.email,image:user.image }});
});

// ---------- Google OAuth ----------
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `http://localhost:${PORT}/api/auth/google/callback`;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.get("/api/auth/google", (req,res)=>{
  if(!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET){
    return res.status(501).json({ error:"Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env. See docs/AUTH.md" });
  }
  const state = Math.random().toString(36).slice(2);
  res.cookie("oauth_state", state, { httpOnly:true, sameSite:"lax", maxAge: 10*60*1000, path:"/" });
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", GOOGLE_CLIENT_ID);
  url.searchParams.set("redirect_uri", GOOGLE_REDIRECT_URI);
  url.searchParams.set("response_type","code");
  url.searchParams.set("scope","openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("access_type","offline");
  url.searchParams.set("prompt","select_account");
  res.redirect(url.toString());
});

app.get("/api/auth/google/callback", async (req,res)=>{
  try{
    if(!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) return res.status(501).send("Google OAuth not configured");
    const { code, state } = req.query as { code?:string; state?:string };
    const storedState = req.cookies?.oauth_state;
    if(!code || !state || state !== storedState) return res.status(400).send("Invalid OAuth state");
    res.clearCookie("oauth_state",{ path:"/" });
    // exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token",{
      method:"POST",
      headers:{ "content-type":"application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type:"authorization_code",
      }),
    });
    if(!tokenRes.ok){
      const t=await tokenRes.text();
      console.error("Google token exchange failed",t);
      return res.status(502).send("Google token exchange failed");
    }
    const tokenJson = await tokenRes.json() as { access_token:string };
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo",{
      headers:{ Authorization:`Bearer ${tokenJson.access_token}` }
    });
    if(!userRes.ok) return res.status(502).send("Failed to fetch Google profile");
    const profile = await userRes.json() as { id:string; email:string; name:string; picture?:string };
    if(!profile.email) return res.status(400).send("Google account has no email");
    const user = await findOrCreateGoogleUser({ id: profile.id, email: profile.email, name: profile.name, picture: profile.picture });
    const token = signJwt({ uid: user.id, email: user.email });
    res.cookie("token", token, { httpOnly:true, sameSite:"lax", maxAge: 30*24*3600*1000, path:"/" });
    res.redirect(`${FRONTEND_URL}/dashboard`);
  } catch(e){
    console.error("Google callback error",e);
    res.status(500).send("Google sign-in failed");
  }
});

// Optional: One-Tap / GIS ID-token verification (POST idToken)
app.post("/api/auth/google", async (req,res)=>{
  try{
    const { idToken } = req.body ?? {};
    if(!idToken) return res.status(400).json({ error:"Missing idToken" });
    if(!GOOGLE_CLIENT_ID) return res.status(501).json({ error:"Google OAuth not configured" });
    // verify via tokeninfo
    const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
    if(!verifyRes.ok) return res.status(401).json({ error:"Invalid Google token" });
    const payload = await verifyRes.json() as { sub:string; email:string; name:string; picture?:string; aud:string };
    if(payload.aud !== GOOGLE_CLIENT_ID) return res.status(401).json({ error:"Token audience mismatch" });
    const user = await findOrCreateGoogleUser({ id: payload.sub, email: payload.email, name: payload.name, picture: payload.picture });
    const token = signJwt({ uid: user.id, email: user.email });
    res.cookie("token", token, { httpOnly:true, sameSite:"lax", maxAge: 30*24*3600*1000, path:"/" });
    res.json({ user:{ id:user.id,name:user.name,email:user.email,image:user.image }});
  } catch(e){
    console.error("Google One-Tap error",e);
    res.status(500).json({ error:"Google sign-in failed" });
  }
});

app.post("/api/auth/signout", (_req,res)=>{
  res.clearCookie("token",{ path:"/" });
  res.json({ ok:true });
});

app.get("/api/me", async (req,res)=>{
  const payload = getUserFromReq(req);
  if(!payload) return res.status(401).json({ error:"Not authenticated" });
  const user = await prisma.user.findUnique({ where:{ id: payload.uid }, select:{ id:true,name:true,email:true,image:true,totalXp:true,level:true,currentDay:true,streak:true,completedDays:true, bio:true }});
  if(!user) return res.status(404).json({ error:"User not found" });
  res.json({ user });
});

// ---------- Leaderboard ----------
app.get("/api/leaderboard", async (req,res)=>{
  const limit = Math.min(100, Math.max(1, Number(req.query.limit)||50));
  const users = await prisma.user.findMany({ orderBy:{ totalXp:"desc" }, take: limit, select:{ id:true,name:true,image:true,totalXp:true,level:true }});
  res.json({ users });
});

// ---------- Health ----------
app.get("/api/health", (_req,res)=> res.json({ ok:true, poweredBy:"https://ps-hub.org" }));

// Catch-all for not-yet-ported routes — honest 501, never fake success
app.all(/^\/api\/.*/, (_req,res)=> res.status(501).json({ error:"Not implemented in Vite server yet — porting from Next.js. See server/index.ts" }));

app.listen(PORT, ()=> console.log(`AstaHub API (Vite) listening on http://localhost:${PORT} — powered by https://ps-hub.org`));
