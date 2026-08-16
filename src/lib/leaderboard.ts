import type { TrackKey } from "./types";

/**
 * Pure parsing for the leaderboard query string. Kept dependency-free so it can
 * be unit-tested without a database.
 */

export const LEADERBOARD_DEFAULT_LIMIT = 50;
export const LEADERBOARD_MAX_LIMIT = 100;

export interface LeaderboardQuery {
  limit: number;
  track: TrackKey;
}

/** Parse `?limit=&track=` params with safe defaults and clamps. */
export function parseLeaderboardQuery(url: string): LeaderboardQuery {
  const searchParams = new URL(url).searchParams;
  const parsed = parseInt(searchParams.get("limit") ?? String(LEADERBOARD_DEFAULT_LIMIT), 10);
  const limit = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, 1), LEADERBOARD_MAX_LIMIT)
    : LEADERBOARD_DEFAULT_LIMIT;
  const trackParam = searchParams.get("track") ?? "c";
  const track = (trackParam === "python" || trackParam === "cpp" || trackParam === "js" ? trackParam : "c") as TrackKey;
  return { limit, track };
}
