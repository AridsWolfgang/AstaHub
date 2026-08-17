/**
 * Pure community logic — validation, pagination, voting math, and moderation
 * rules. Kept dependency-free so it can be unit-tested without a database.
 */

export const FEED_DEFAULT_LIMIT = 20;
export const FEED_MAX_LIMIT = 50;

export const POST_TITLE_MIN = 4;
export const POST_TITLE_MAX = 200;
export const POST_BODY_MAX = 50_000;
export const COMMENT_BODY_MAX = 20_000;
export const QUESTION_TITLE_MAX = 300;
export const GROUP_NAME_MAX = 60;
export const GROUP_DESC_MAX = 500;
export const MESSAGE_BODY_MAX = 5_000;
export const REPORT_REASON_MAX = 500;

/** Reportable targets (targetType values). */
export const REPORT_TARGET_TYPES = ["post", "comment", "question", "answer", "message"] as const;
export type ReportTargetType = (typeof REPORT_TARGET_TYPES)[number];

export function isReportTargetType(v: unknown): v is ReportTargetType {
  return typeof v === "string" && (REPORT_TARGET_TYPES as readonly string[]).includes(v);
}

/** Create a unique, URL-safe slug for a group from its name. */
export function groupSlugify(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return slug || "group";
}

export interface FeedQuery {
  /** Cursor for cursor-based pagination (ISO date of the last row). */
  before?: string;
  limit: number;
}

/** Parse `?before=&limit=` for the public feed with safe clamps. */
export function parseFeedQuery(url: string): FeedQuery {
  const params = new URL(url).searchParams;
  const parsed = parseInt(params.get("limit") ?? String(FEED_DEFAULT_LIMIT), 10);
  const limit = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, 1), FEED_MAX_LIMIT)
    : FEED_DEFAULT_LIMIT;
  const before = params.get("before");
  return { before: before && !Number.isNaN(Date.parse(before)) ? before : undefined, limit };
}

/**
 * Voting toggle. Given the caller's existing vote on a target (or null) and the
 * incoming +1/-1, return the new stored vote value or null to cancel.
 * @example nextVoteValue(null, 1)   => 1  (new upvote)
 * @example nextVoteValue(1, 1)      => null (cancel)
 * @example nextVoteValue(1, -1)     => -1  (switch)
 */
export function nextVoteValue(current: number | null, incoming: number): number | null {
  if (incoming !== 1 && incoming !== -1) return current;
  if (current === null) return incoming;
  if (current === incoming) return null;
  return incoming;
}

/** Net score delta from a vote change. */
export function applyVote(total: number, prev: number | null, next: number | null): number {
  return total - (prev ?? 0) + (next ?? 0);
}

export const REPORT_STATUSES = ["open", "actioned", "dismissed"] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export function isReportStatus(v: unknown): v is ReportStatus {
  return typeof v === "string" && (REPORT_STATUSES as readonly string[]).includes(v);
}

/** Validate a report-status transition: open → actioned|dismissed; else no change. */
export function reportStatusTransition(current: ReportStatus, next: string): ReportStatus {
  if (current !== "open") return current;
  if (next === "actioned" || next === "dismissed") return next;
  return current;
}

/** A moderator gate: user's email must appear in the MODERATOR_EMAILS whitelist. */
export function canModerate(userEmail: string | null | undefined, whitelist: string): boolean {
  if (!userEmail) return false;
  const mods = whitelist
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (mods.length === 0) return false;
  return mods.includes(userEmail.toLowerCase());
}

/** Rules for accepting an answer: only the question author, while open, once. */
export function answerAcceptGuard(params: {
  actorUserId: string;
  questionUserId: string;
  isAccepted: boolean;
}): boolean {
  return params.actorUserId === params.questionUserId && !params.isAccepted;
}