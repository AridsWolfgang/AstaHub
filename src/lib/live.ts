/**
 * Pure live-events logic — validation, status derivation, and YouTube URL
 * helpers for the Phase 3 "Live" layer (live classes, office hours, live
 * coding streams). Kept dependency-free so it can be unit-tested without a
 * database or network.
 */

export const LIVE_EVENT_TYPES = ["live_coding", "live_class", "office_hours", "qa"] as const;
export type LiveEventType = (typeof LIVE_EVENT_TYPES)[number];

export const LIVE_EVENT_STATUSES = ["scheduled", "live", "finished", "cancelled"] as const;
export type LiveEventStatus = (typeof LIVE_EVENT_STATUSES)[number];

export const LIVE_TITLE_MAX = 200;
export const LIVE_DESC_MAX = 5_000;
export const LIVE_HOST_MAX = 80;
export const LIVE_DURATION_MIN = 5;
export const LIVE_DURATION_MAX = 480;

export function isLiveEventType(v: unknown): v is LiveEventType {
  return typeof v === "string" && (LIVE_EVENT_TYPES as readonly string[]).includes(v);
}

export function isLiveEventStatus(v: unknown): v is LiveEventStatus {
  return typeof v === "string" && (LIVE_EVENT_STATUSES as readonly string[]).includes(v);
}

export const LIVE_TYPE_LABELS: Record<LiveEventType, string> = {
  live_coding: "Live coding",
  live_class: "Live class",
  office_hours: "Office hours",
  qa: "Q&A",
};

/** Create a unique, URL-safe slug for a live event from its title. */
export function liveEventSlugify(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || "event";
}

/**
 * Derive the effective live status from the stored status + the clock.
 * Manual statuses (cancelled, or an explicit live/finished) always win;
 * a "scheduled" event automatically flips to "live" at startAt and
 * "finished" once its duration has elapsed. This keeps the schedule honest
 * without a background job.
 */
export function deriveLiveStatus(
  status: string,
  startAt: string | Date,
  durationMinutes: number,
  now: Date
): LiveEventStatus {
  if (status === "cancelled") return "cancelled";
  if (status === "live" || status === "finished") return status;
  const start = new Date(startAt).getTime();
  const end = start + durationMinutes * 60_000;
  const t = now.getTime();
  if (t < start) return "scheduled";
  if (t < end) return "live";
  return "finished";
}

/** True when the event is happening right now (drives the "Join the stream" CTA). */
export function isCurrentlyLive(
  status: string,
  startAt: string | Date,
  durationMinutes: number,
  now: Date
): boolean {
  return deriveLiveStatus(status, startAt, durationMinutes, now) === "live";
}

export interface LiveQuery {
  /** "upcoming" (including events live right now) or "past" (finished/cancelled). */
  scope: "upcoming" | "past";
  limit: number;
}

/** Parse `?scope=&limit=` for the live schedule with safe clamps. */
export function parseLiveQuery(url: string): LiveQuery {
  const params = new URL(url).searchParams;
  const scope = params.get("scope") === "past" ? "past" : "upcoming";
  const parsed = parseInt(params.get("limit") ?? "50", 10);
  const limit = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 100) : 50;
  return { scope, limit };
}

export interface LiveEventInput {
  title: string;
  description: string;
  type: LiveEventType;
  track: string | null;
  lessonDay: number | null;
  startAt: string;
  durationMinutes: number;
  hostName: string;
  youtubeUrl: string | null;
  recordingUrl: string | null;
}

export type LiveEventValidationResult =
  | { ok: true; value: LiveEventInput }
  | { ok: false; error: string };

/**
 * Validate a live-event create/update payload. Normalizes URLs to a stable
 * form and rejects invalid YouTube links (so the embed logic can trust them).
 */
export function validateLiveEvent(input: {
  title?: unknown;
  description?: unknown;
  type?: unknown;
  track?: unknown;
  lessonDay?: unknown;
  startAt?: unknown;
  durationMinutes?: unknown;
  hostName?: unknown;
  youtubeUrl?: unknown;
  recordingUrl?: unknown;
}): LiveEventValidationResult {
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const description = typeof input.description === "string" ? input.description.trim() : "";
  const hostName = typeof input.hostName === "string" ? input.hostName.trim() : "";
  const type = input.type;

  if (!title || title.length > LIVE_TITLE_MAX) {
    return { ok: false, error: `Title must be 1–${LIVE_TITLE_MAX} characters.` };
  }
  if (description.length > LIVE_DESC_MAX) {
    return { ok: false, error: `Description must be at most ${LIVE_DESC_MAX} characters.` };
  }
  if (!isLiveEventType(type)) {
    return { ok: false, error: "Invalid event type." };
  }
  if (!hostName || hostName.length > LIVE_HOST_MAX) {
    return { ok: false, error: `Host must be 1–${LIVE_HOST_MAX} characters.` };
  }

  const startAt = typeof input.startAt === "string" ? input.startAt : "";
  const startTime = Date.parse(startAt);
  if (!startAt || Number.isNaN(startTime)) {
    return { ok: false, error: "A valid start time is required." };
  }

  const duration =
    typeof input.durationMinutes === "number"
      ? input.durationMinutes
      : Number(input.durationMinutes);
  if (!Number.isFinite(duration) || duration < LIVE_DURATION_MIN || duration > LIVE_DURATION_MAX) {
    return { ok: false, error: `Duration must be ${LIVE_DURATION_MIN}–${LIVE_DURATION_MAX} minutes.` };
  }

  const track = typeof input.track === "string" && input.track.trim() ? input.track.trim() : null;
  let lessonDay: number | null = null;
  if (input.lessonDay !== undefined && input.lessonDay !== null) {
    const d = Number(input.lessonDay);
    if (!Number.isInteger(d) || d < 1 || d > 365) {
      return { ok: false, error: "Lesson day must be a whole number between 1 and 365." };
    }
    lessonDay = d;
  }

  const youtubeUrl = normalizeYouTubeUrl(input.youtubeUrl);
  if (input.youtubeUrl !== undefined && input.youtubeUrl !== null && input.youtubeUrl !== "" && !youtubeUrl) {
    return { ok: false, error: "Invalid YouTube URL for the stream link." };
  }
  const recordingUrl = normalizeYouTubeUrl(input.recordingUrl);
  if (input.recordingUrl !== undefined && input.recordingUrl !== null && input.recordingUrl !== "" && !recordingUrl) {
    return { ok: false, error: "Invalid YouTube URL for the recording link." };
  }

  return {
    ok: true,
    value: {
      title,
      description,
      type,
      track,
      lessonDay,
      startAt: new Date(startTime).toISOString(),
      durationMinutes: Math.round(duration),
      hostName,
      youtubeUrl,
      recordingUrl,
    },
  };
}

/** Extract a YouTube video id from watch / youtu.be / embed / shorts URLs. */
export function youtubeVideoId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : null;
}

/** A privacy-preserving embed URL (youtube-nocookie) or null when not a valid YouTube link. */
export function youtubeEmbedUrl(url: string): string | null {
  const id = youtubeVideoId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

/** Normalize a user-supplied YouTube URL to its canonical watch form, or null when invalid. */
export function normalizeYouTubeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const url = value.trim();
  if (!url) return null;
  const id = youtubeVideoId(url);
  if (!id) return null;
  return `https://www.youtube.com/watch?v=${id}`;
}

/** A Google Calendar "add to calendar" URL for an event. */
export function googleCalendarUrl(params: {
  title: string;
  description: string;
  startAt: string;
  durationMinutes: number;
}): string {
  const start = new Date(params.startAt);
  const end = new Date(start.getTime() + params.durationMinutes * 60_000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const qs = new URLSearchParams({
    action: "TEMPLATE",
    text: params.title,
    details: params.description,
    dates: `${fmt(start)}/${fmt(end)}`,
  });
  return `https://calendar.google.com/calendar/render?${qs.toString()}`;
}