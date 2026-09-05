/**
 * Upstash Redis helper — optional distributed rate limiting.
 * When UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set, rate limits
 * are enforced via Redis INCR+EXPIRE (atomic, multi-instance). Otherwise the
 * in-memory fallback in rateLimit.ts is used. Never throws — always falls back.
 */

export function isRedisConfigured(env: Record<string, string | undefined> = process.env): boolean {
  return Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);
}

export async function redisRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  env: Record<string, string | undefined> = process.env
): Promise<boolean | null> {
  const url = env.UPSTASH_REDIS_REST_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const windowSec = Math.ceil(windowMs / 1000);
  const redisKey = `ratelimit:${key}`;
  try {
    // INCR
    const incrRes = await fetch(`${url}/incr/${encodeURIComponent(redisKey)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!incrRes.ok) return null;
    const incrJson = (await incrRes.json()) as { result?: number };
    const count = typeof incrJson.result === "number" ? incrJson.result : 0;
    if (count === 1) {
      await fetch(`${url}/expire/${encodeURIComponent(redisKey)}/${windowSec}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    return count <= limit;
  } catch {
    return null;
  }
}
