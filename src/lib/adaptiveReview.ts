/**
 * Adaptive review — spaced-repetition helpers, pure and honest.
 *
 * No AI, no network. Builds a review queue from progress by comparing
 * `completedExercises[day]` against the expected total per day and
 * scheduling the next review at 1/3/7/14/30-day intervals.
 *
 * The engine is deliberately simple and testable: every input is
 * explicit, every output is deterministic.
 */

import type { UserProgress } from "./types";

export const REVIEW_INTERVALS = [1, 3, 7, 14, 30] as const;

export interface ReviewScheduleOptions {
  /** Expected exercise count per day (default 3 for every day). */
  totalByDay?: Record<number, number>;
  /** Spaced-repetition intervals in days (default REVIEW_INTERVALS). */
  intervals?: number[];
  /** "Now" for deterministic tests — defaults to new Date(). */
  now?: Date | string;
  /** Max items to return (default: all). */
  limit?: number;
}

export interface ReviewScheduleItem {
  day: number;
  total: number;
  completed: number;
  missed: number;
  /** ISO-8601 of the next scheduled review. */
  nextReviewAt: string;
  /** Interval in days used for this item. */
  intervalDays: number;
  /** True when the item is past due (stale learner). */
  overdue: boolean;
}

function parseNow(now?: Date | string): Date {
  if (!now) return new Date();
  const d = typeof now === "string" ? new Date(now) : now;
  return isNaN(d.getTime()) ? new Date() : d;
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

function toISO(d: Date): string {
  return d.toISOString();
}

function defaultTotalForDay(day: number, totalByDay?: Record<number, number>): number {
  if (totalByDay && typeof totalByDay[day] === "number" && Number.isFinite(totalByDay[day])) {
    return Math.max(1, Math.floor(totalByDay[day]!));
  }
  return 3;
}

/**
 * Compute the interval to use for a given completion ratio.
 * Fewer completed -> shorter interval (review sooner).
 */
export function intervalForCompletion(
  completed: number,
  total: number,
  intervals: number[] = [...REVIEW_INTERVALS]
): number {
  if (intervals.length === 0) return 1;
  if (completed <= 0) return intervals[0]!;
  const ratio = completed / Math.max(1, total);
  if (ratio < 0.5) return intervals[1] ?? intervals[0]!;
  if (ratio < 1) return intervals[2] ?? intervals[0]!;
  return intervals[0]!;
}

/**
 * Compute the next review date from a base date and an interval index.
 * Pure helper — useful for advancing a card through the ladder.
 */
export function nextReviewDate(
  lastReviewedAt: string | Date,
  intervalIndex: number,
  intervals: number[] = [...REVIEW_INTERVALS]
): string {
  const base = typeof lastReviewedAt === "string" ? new Date(lastReviewedAt) : lastReviewedAt;
  if (isNaN(base.getTime())) return toISO(addDays(new Date(), intervals[0]!));
  const idx = Math.max(0, Math.min(Math.floor(intervalIndex), intervals.length - 1));
  return toISO(addDays(base, intervals[idx]!));
}

/**
 * True when an item is overdue (now is past nextReviewAt).
 */
export function isReviewOverdue(item: ReviewScheduleItem, now?: Date | string): boolean {
  const n = parseNow(now);
  return n.getTime() >= new Date(item.nextReviewAt).getTime();
}

/**
 * Build a sorted spaced-repetition queue from progress.
 *
 * Considers every day in:
 *  - 1 .. currentDay (inclusive, capped at 100)
 *  - plus any key in completedExercises (covers gaps)
 *
 * A day is included only when `completed < total` (there is something
 * missed). Items are sorted by most missed first, then by smallest day.
 */
export function reviewSchedule(
  progress: UserProgress,
  options: ReviewScheduleOptions = {}
): ReviewScheduleItem[] {
  const now = parseNow(options.now);
  const intervals = options.intervals ?? [...REVIEW_INTERVALS];
  const totalByDay = options.totalByDay;
  const limit = typeof options.limit === "number" && Number.isFinite(options.limit) ? Math.max(0, Math.floor(options.limit)) : undefined;

  if (!progress || !progress.completedExercises || typeof progress.completedExercises !== "object") {
    return [];
  }

  const days = new Set<number>();

  const currentDay = typeof progress.currentDay === "number" && Number.isFinite(progress.currentDay) ? Math.floor(progress.currentDay) : 1;
  const maxDay = Math.max(1, Math.min(currentDay, 100));
  for (let d = 1; d <= maxDay; d++) days.add(d);

  for (const k of Object.keys(progress.completedExercises)) {
    const n = Number(k);
    if (Number.isInteger(n) && n >= 1 && n <= 100) days.add(n);
  }
  // also include completedDays so a fully-done day with a missing
  // exercise still shows up — exercises are the source of truth.
  for (const d of progress.completedDays ?? []) {
    if (Number.isInteger(d) && d >= 1 && d <= 100) days.add(d);
  }

  const items: ReviewScheduleItem[] = [];

  // staleness: if the learner hasn't been active for 3+ days, mark as overdue
  let overdue = false;
  if (progress.lastActiveDate) {
    const lastActive = new Date(progress.lastActiveDate);
    if (!isNaN(lastActive.getTime())) {
      const daysSinceActive = Math.floor((now.getTime() - lastActive.getTime()) / 86_400_000);
      overdue = daysSinceActive >= 3;
    }
  }

  for (const day of days) {
    const total = defaultTotalForDay(day, totalByDay);
    const completedList = (progress.completedExercises as Record<string, string[]>)[String(day)] ?? [];
    const completed = Array.isArray(completedList) ? completedList.length : 0;
    if (completed >= total) continue;
    const missed = total - completed;
    const intervalDays = intervalForCompletion(completed, total, intervals);
    const nextReviewAt = toISO(addDays(now, intervalDays));
    items.push({ day, total, completed, missed, nextReviewAt, intervalDays, overdue });
  }

  items.sort((a, b) => {
    if (b.missed !== a.missed) return b.missed - a.missed;
    return a.day - b.day;
  });

  if (limit !== undefined) return items.slice(0, limit);
  return items;
}

/** Alias kept for discoverability — same as reviewSchedule. */
export const buildReviewQueue = reviewSchedule;
