/**
 * Raincheck + adaptive review queue — pure, honest, no AI.
 *
 * Vision §4.3: periodic, low-pressure reflection prompts that measure
 * engagement and let learners self-correct, plus a spaced-repetition
 * queue that resurfaces missed exercises at 1/3/7/14/30-day intervals.
 *
 * All functions are pure (no I/O, no global state) and deterministic
 * when `now` is provided, so they are trivially unit-testable.
 */

import type { UserProgress } from "./types";
import { reviewSchedule, REVIEW_INTERVALS, type ReviewScheduleOptions } from "./adaptiveReview";

// ─── Types ──────────────────────────────────────────────────────────────────

export type RaincheckRating = 1 | 2 | 3 | 4 | 5;

export interface Raincheck {
  id: string;
  day: number;
  rating: RaincheckRating;
  blocker: string;
  createdAt: string; // ISO-8601
}

export interface RaincheckResponse {
  rating: RaincheckRating;
  blocker?: string;
  day?: number;
}

export interface RaincheckInput {
  rating: number;
  blocker?: string;
  day?: number;
}

export interface RaincheckProgress extends UserProgress {
  rainchecks?: Raincheck[];
}

// Interval / threshold constants — honest defaults, not magic.

export const RAINCHECK_INTERVAL_DAYS = 7;
export const RAINCHECK_MIN_COMPLETED = 3;
export const RAINCHECK_STALE_DAYS = 3;
export const RAINCHECK_BLOCKER_MAX = 500;

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseNow(now?: Date | string): Date {
  if (!now) return new Date();
  const d = typeof now === "string" ? new Date(now) : now;
  return isNaN(d.getTime()) ? new Date() : d;
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / 86_400_000);
}

function clampRating(n: number): RaincheckRating | null {
  if (!Number.isInteger(n) || n < 1 || n > 5) return null;
  return n as RaincheckRating;
}

function sanitizeBlocker(s: string | undefined): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, RAINCHECK_BLOCKER_MAX);
}

function lastRaincheck(progress: RaincheckProgress): Raincheck | undefined {
  const list = progress.rainchecks;
  if (!Array.isArray(list) || list.length === 0) return undefined;
  return list[list.length - 1];
}

// ─── Raincheck logic ────────────────────────────────────────────────────────

/**
 * True when we should show the raincheck prompt.
 *
 * Rules (simple, honest):
 *  - Not enough history (< MIN_COMPLETED) -> false
 *  - No prior raincheck:
 *      shows when completedDays >= 7 OR learner is stale (3+ days since lastActive)
 *  - With prior raincheck:
 *      shows only when >= 7 days have passed since the last raincheck
 *
 * `now` is injectable for tests.
 */
export function shouldShowRaincheck(
  progress: RaincheckProgress,
  now: Date | string = new Date()
): boolean {
  if (!progress || !Array.isArray(progress.completedDays)) return false;
  if (progress.completedDays.length < RAINCHECK_MIN_COMPLETED) return false;

  const nowDate = parseNow(now);
  const last = lastRaincheck(progress);

  if (!last) {
    if (progress.completedDays.length >= 7) return true;
    if (progress.lastActiveDate) {
      const lastActive = new Date(progress.lastActiveDate);
      if (!isNaN(lastActive.getTime())) {
        if (daysBetween(lastActive, nowDate) >= RAINCHECK_STALE_DAYS) return true;
      }
    } else {
      // No lastActive at all but has progress -> treat as stale enough to check
      return true;
    }
    return false;
  }

  const lastAt = new Date(last.createdAt);
  if (isNaN(lastAt.getTime())) return true;
  return daysBetween(lastAt, nowDate) >= RAINCHECK_INTERVAL_DAYS;
}

/**
 * The `day` number after which the next raincheck is due.
 * Pure projection — does not depend on "now", only on the last raincheck.
 * Returns 7 for a fresh learner (first checkpoint at day 7).
 */
export function nextRaincheckDay(progress: RaincheckProgress): number | null {
  if (!progress || !Array.isArray(progress.completedDays)) return 7;
  const last = lastRaincheck(progress);
  if (!last) return 7;
  const next = last.day + RAINCHECK_INTERVAL_DAYS;
  // Clamp to a sane day range (1..365, matches coach validation).
  return Math.max(1, Math.min(next, 365));
}

/**
 * Record a learner's raincheck response.
 * Pure — returns a new progress object with the appended Raincheck.
 * Validates rating 1-5 and trims blocker to 500 chars.
 * Throws on invalid rating so callers can surface the error honestly.
 */
export function recordRaincheckResponse(
  progress: RaincheckProgress,
  response: RaincheckInput,
  now: Date | string = new Date()
): RaincheckProgress {
  const rating = clampRating(Number(response.rating));
  if (rating === null) {
    throw new Error("Rating must be an integer 1-5.");
  }
  const blocker = sanitizeBlocker(response.blocker);
  const dayRaw = response.day ?? progress.currentDay ?? 1;
  const day = Number.isInteger(dayRaw) && (dayRaw as number) >= 1 && (dayRaw as number) <= 365 ? (dayRaw as number) : 1;
  const nowDate = parseNow(now);
  const createdAt = nowDate.toISOString();
  // Deterministic id for tests: rc-<day>-<rating>-<epoch>
  const id = `rc-${day}-${rating}-${nowDate.getTime()}`;

  const entry: Raincheck = { id, day, rating, blocker, createdAt };
  const existing = Array.isArray(progress.rainchecks) ? progress.rainchecks : [];
  return { ...progress, rainchecks: [...existing, entry] };
}

// ─── Adaptive review queue ──────────────────────────────────────────────────

/**
 * Options for the spaced-repetition queue.
 * `totalByDay` lets the caller provide the real exercise count per day
 * (e.g. from the curriculum). Defaults to 3 when omitted.
 */
export interface AdaptiveReviewOptions extends ReviewScheduleOptions {}

export interface ReviewQueueItem {
  day: number;
  total: number;
  completed: number;
  missed: number;
  nextReviewAt: string;
  intervalDays: number;
  overdue: boolean;
}

/**
 * Build a spaced-repetition queue from missed exercises.
 *
 * Compares `progress.completedExercises[day].length` vs `total` and
 * schedules a review at 1/3/7/14/30-day intervals (shorter when more
 * is missed). Items are sorted most-missed first.
 *
 * Delegates to `reviewSchedule` in `adaptiveReview.ts` for the actual
 * schedule computation so the two modules stay consistent.
 */
export function adaptiveReviewQueue(
  progress: UserProgress,
  options: AdaptiveReviewOptions = {}
): ReviewQueueItem[] {
  // reviewSchedule already returns the right shape; cast is safe.
  return reviewSchedule(progress, options) as ReviewQueueItem[];
}

// Re-export the interval constant for convenience.
export { REVIEW_INTERVALS };
