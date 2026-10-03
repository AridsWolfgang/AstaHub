import type { TrackKey } from "./types";

/**
 * First-run onboarding helpers — pure logic + tiny guarded persistence.
 *
 * A learner is "brand new" when no track store has any completed days and
 * no primary track was ever picked. /home renders the welcome picker in
 * that case; picking a track remembers it (localStorage) so "Continue"
 * keeps pointing at their track from then on.
 */

export const TRACK_KEYS: TrackKey[] = ["c", "python", "cpp", "js", "sql", "bash"];

const PRIMARY_TRACK_STORAGE_KEY = "asta-primary-track";

export function isTrackKey(value: unknown): value is TrackKey {
  return (
    typeof value === "string" &&
    (TRACK_KEYS as string[]).includes(value)
  );
}

/** Registry slug (tracks.ts) → progress TrackKey. Assembly shares the C track. */
export function trackSlugToKey(slug: string): TrackKey {
  if (slug === "python") return "python";
  if (slug === "cpp") return "cpp";
  if (slug === "javascript" || slug === "js") return "js";
  if (slug === "sql") return "sql";
  if (slug === "toolkit" || slug === "bash") return "bash";
  return "c";
}

export function getPrimaryTrack(): TrackKey | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const raw = window.localStorage.getItem(PRIMARY_TRACK_STORAGE_KEY);
    return isTrackKey(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function setPrimaryTrack(track: TrackKey): void {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(PRIMARY_TRACK_STORAGE_KEY, track);
  } catch {
    // Private mode etc. — the picker still works, the choice just doesn't stick.
  }
}

/** True once the learner has finished at least one day on any track. */
export function hasAnyProgress(
  snapshots: { completedDays: unknown[] }[]
): boolean {
  return snapshots.some((s) => s.completedDays.length > 0);
}

/** Deep link to a track's first lesson (the onboarding destination). */
export function dayOneHref(track: TrackKey): string {
  if (track === "c") return "/lesson/1";
  if (track === "js") return "/lesson/js/1";
  return `/lesson/${track}/1`;
}
