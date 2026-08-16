import { levelFromXp } from "./types";

export const TRACKS = new Set(["c", "python", "cpp", "js"]);
export const TRACK_TOTAL_DAYS: Record<string, number> = { c: 100, python: 40, cpp: 40, js: 40 };
export const TRACK_CERT_TITLES: Record<string, string> = {
  c: "C / x86-64 Assembly",
  python: "Python",
  cpp: "C++",
  js: "JavaScript / TypeScript",
};

// Server-side integrity bounds — the client must never be trusted for XP/level.
export const MAX_XP = 2_000_000;
export const MAX_STREAK = 10_000;
export const MAX_DAYS = 100;

/** Clamp a completed-days array to the track's valid day range, deduplicated. */
export function sanitizeCompletedDays(value: unknown, total: number): number[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<number>();
  const out: number[] = [];
  for (const d of value) {
    const n = typeof d === "number" && Number.isInteger(d) ? d : Number(d);
    if (Number.isInteger(n) && n >= 1 && n <= Math.min(total, MAX_DAYS) && !seen.has(n)) {
      seen.add(n);
      out.push(n);
    }
  }
  return out;
}

/** True when `completedDays` covers every day of a track (certificate condition). */
export function isTrackComplete(completedDays: unknown, total: number): boolean {
  if (!Array.isArray(completedDays) || total <= 0) return false;
  const daySet = new Set(completedDays.filter((d) => typeof d === "number" && Number.isInteger(d) && d >= 1 && d <= total));
  return daySet.size >= total;
}

export interface ProgressInput {
  currentDay?: unknown;
  totalXp?: unknown;
  streak?: unknown;
  lastActiveDate?: unknown;
  completedDays?: unknown;
  completedExercises?: unknown;
  completedAssignments?: unknown;
  notes?: unknown;
  /** Sent by the client but deliberately ignored — the level is derived from XP server-side. */
  level?: unknown;
}

/**
 * Validate and clamp a client progress payload into a safe database record.
 * The `level` is never accepted from the client — it is derived from XP here.
 */
export function sanitizeProgress(body: ProgressInput, track: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  if (typeof body.currentDay === "number" && Number.isInteger(body.currentDay)) {
    data.currentDay = Math.max(1, Math.min(body.currentDay, MAX_DAYS));
  }
  if (typeof body.totalXp === "number" && Number.isFinite(body.totalXp)) {
    data.totalXp = Math.max(0, Math.min(Math.round(body.totalXp), MAX_XP));
  }
  if (typeof body.streak === "number" && Number.isInteger(body.streak)) {
    data.streak = Math.max(0, Math.min(body.streak, MAX_STREAK));
  }
  if (typeof body.lastActiveDate === "string" || body.lastActiveDate === null) {
    data.lastActiveDate = body.lastActiveDate;
  }
  if (body.completedExercises && typeof body.completedExercises === "object") {
    data.completedExercises = body.completedExercises;
  }
  if (Array.isArray(body.completedAssignments)) data.completedAssignments = body.completedAssignments;
  if (body.notes && typeof body.notes === "object") data.notes = body.notes;

  const total = TRACK_TOTAL_DAYS[track] ?? 0;
  data.completedDays = sanitizeCompletedDays(body.completedDays, total);
  data.level = levelFromXp(typeof data.totalXp === "number" ? data.totalXp : 0);

  return data;
}
