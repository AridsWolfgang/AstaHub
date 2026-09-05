/**
 * Lightweight rate limiter — in-memory by default, Redis (Upstash) when configured.
 * Use `rateLimit()` (async) for distributed deployments; it falls back to memory
 * when Redis is not configured or unavailable.
 */
import { isRedisConfigured, redisRateLimit } from "./redis";

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();
const MAX_ENTRIES = 10_000;

function memoryRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    if (buckets.size >= MAX_ENTRIES) {
      for (const [k, b] of buckets) {
        if (b.hits.every((t) => now - t > windowMs)) buckets.delete(k);
      }
    }
    bucket = { hits: [] };
    buckets.set(key, bucket);
  }
  bucket.hits = bucket.hits.filter((t) => now - t <= windowMs);
  if (bucket.hits.length >= limit) return false;
  bucket.hits.push(now);
  return true;
}

/** Sliding-window rate limit (async, Redis → memory fallback). Returns `true` when allowed. */
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  if (isRedisConfigured()) {
    const redisResult = await redisRateLimit(key, limit, windowMs);
    if (redisResult !== null) return redisResult;
  }
  return memoryRateLimit(key, limit, windowMs);
}

/** Sync memory-only check (for non-critical paths or tests). */
export function rateLimitSync(key: string, limit: number, windowMs: number): boolean {
  return memoryRateLimit(key, limit, windowMs);
}

/** Best-effort client IP from proxy headers, falling back to the direct peer. Works with both Fetch Request and Express req. */
export function clientIp(req: { headers: unknown; ip?: string; socket?: { remoteAddress?: string } }): string {
  const h = req.headers as Record<string, unknown> | Headers;
  // Fetch Headers
  if (h && typeof (h as Headers).get === "function") {
    const forwarded = (h as Headers).get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
    return (h as Headers).get("x-real-ip") || "unknown";
  }
  // Express plain object
  const hdr = (h as Record<string, string>) || {};
  const forwarded = (hdr["x-forwarded-for"] as string) || (hdr["X-Forwarded-For"] as string);
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIp = (hdr["x-real-ip"] as string) || (hdr["X-Real-Ip"] as string);
  if (realIp) return realIp;
  return (req as { ip?: string }).ip || (req as { socket?: { remoteAddress?: string } }).socket?.remoteAddress || "unknown";
}
