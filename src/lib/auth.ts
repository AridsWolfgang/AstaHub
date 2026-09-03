import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

// Pure auth helpers — framework-agnostic (no NextAuth).
// Used by server/api routes and client auth context.

export async function verifyCredentials(email: string, password: string) {
  const normalized = email.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email: normalized } });
  if (!user || !user.passwordHash) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;
  return { id: user.id, name: user.name, email: user.email, image: user.image };
}

export async function findOrCreateGoogleUser(profile: { id: string; email: string; name: string; picture?: string | null }) {
  const email = profile.email.toLowerCase().trim();
  const anyUser = prisma.user as unknown as {
    findFirst: (a: unknown) => Promise<{ id:string; googleId?:string|null; image?:string|null } | null>;
    update: (a: unknown) => Promise<any>;
    create: (a: unknown) => Promise<any>;
  };
  let user = await anyUser.findFirst({ where: { OR: [{ googleId: profile.id }, { email }] } }) as unknown as { id:string; googleId?:string|null; image?:string|null; name:string; email:string } | null;
  if (user) {
    if (!user.googleId) {
      user = await anyUser.update({ where: { id: user.id }, data: { googleId: profile.id, image: (user as unknown as { image?:string|null }).image ?? profile.picture ?? undefined } });
    }
    return user as unknown as { id:string; name:string; email:string; image?:string|null };
  }
  user = await anyUser.create({
    data: {
      name: profile.name,
      email,
      googleId: profile.id,
      image: profile.picture ?? undefined,
      passwordHash: null,
    },
  });
  return user as unknown as { id:string; name:string; email:string; image?:string|null };
}

// Minimal JWT helpers (no extra dep) — HMAC-SHA256 via WebCrypto / Node crypto fallback
// For production use `jsonwebtoken` if you prefer, but this keeps the bundle lean.
const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret-change-me";

function b64urlEncode(str: string) {
  return Buffer.from(str).toString("base64url");
}
function b64urlDecode(str: string) {
  return Buffer.from(str, "base64url").toString("utf8");
}

export function signJwt(payload: Record<string, unknown>, expiresInSec = 60 * 60 * 24 * 30): string {
  const header = b64urlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const exp = Math.floor(Date.now() / 1000) + expiresInSec;
  const body = b64urlEncode(JSON.stringify({ ...payload, exp }));
  // Node: use crypto
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require("crypto") as typeof import("crypto");
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${sig}`;
}

export function verifyJwt(token: string): Record<string, unknown> | null {
  try {
    const [header, body, sig] = token.split(".");
    if (!header || !body || !sig) return null;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const crypto = require("crypto") as typeof import("crypto");
    const expected = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
    if (expected !== sig) return null;
    const payload = JSON.parse(b64urlDecode(body));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
