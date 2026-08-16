/**
 * Lightweight in-process rate limiter for public API routes.
 *
 * NOTE: This is a single-instance, in-memory limiter — sufficient for a single
 * Node/Vercel function deployment and to stop casual abuse. Distributed deployments
 * should move this to Redis (Upstash) — see ENGINEERING_ROADMAP.md §16.
 */

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();

const MAX_ENTRIES = 10_000;

/** Sliding-window rate limit. Returns `true` when the request is allowed. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    if (buckets.size >= MAX_ENTRIES) {
      // Evict stale keys to bound memory.
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

/** Best-effort client IP from proxy headers, falling back to the direct peer. */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}
