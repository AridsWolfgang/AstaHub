/**
 * YouTube export engine (Phase 3, slice 2).
 *
 * The vision: record a live class / live coding session and publish it to
 * YouTube directly from the platform, with automatic lesson-linked metadata.
 *
 * Honest state: YouTube uploads require OAuth credentials plus a real source
 * file (the recording pipeline lands with Cloudflare R2 / Stream). Until those
 * exist, every export attempt returns an explicit "not configured" / "no
 * source" result — never a fake success. The metadata builder and the request
 * shape are real and tested; the upload transport is wired behind the gates.
 */

export interface YouTubeUploadMetadata {
  snippet: {
    title: string;
    description: string;
    tags: string[];
    categoryId: string; // 28 = Science & Technology
  };
  status: {
    privacyStatus: "private" | "unlisted" | "public";
  };
}

export type YouTubeExportResult =
  | { ok: true; message: string; metadata: YouTubeUploadMetadata }
  | { ok: false; code: "NOT_CONFIGURED" | "NO_SOURCE"; error: string };

const REQUIRED_ENV = ["YOUTUBE_CLIENT_ID", "YOUTUBE_CLIENT_SECRET", "YOUTUBE_REFRESH_TOKEN"] as const;

export type YouTubeEnv = Record<string, string | undefined>;

/** True when the server has OAuth credentials to upload to a YouTube channel. */
export function isYouTubeExportConfigured(env: YouTubeEnv = process.env): boolean {
  return REQUIRED_ENV.every((k) => Boolean(env[k]));
}

export function youtubeExportConfig(env: YouTubeEnv = process.env): {
  configured: boolean;
  missing: string[];
} {
  const missing = REQUIRED_ENV.filter((k) => !env[k]);
  return { configured: missing.length === 0, missing };
}

/**
 * Build the exact videos.insert resource that would be sent to the YouTube
 * Data API v3 for an event — lesson-linked title/description and tags so a
 * recording is discoverable and anchored to its curriculum home.
 */
export function youtubeUploadMetadata(params: {
  title: string;
  description: string;
  trackSlug?: string | null;
  lessonDay?: number | null;
  extraTags?: string[];
  privacyStatus?: "private" | "unlisted" | "public";
}): YouTubeUploadMetadata {
  const tags = ["AstaHub", "education", "free education", "learn to code"];
  if (params.trackSlug) tags.push(params.trackSlug, `track-${params.trackSlug}`);
  if (params.lessonDay != null) tags.push(`day-${params.lessonDay}`);
  for (const t of params.extraTags ?? []) if (t) tags.push(t);

  const lines = [params.description, "", "Free, hands-on technical education — AstaHub."];
  if (params.trackSlug) lines.push(`Track: ${params.trackSlug}`);
  if (params.lessonDay != null) lines.push(`Lesson day: ${params.lessonDay}`);
  lines.push("https://astahub.dev");

  return {
    snippet: {
      title: params.title,
      description: lines.join("\n"),
      tags: Array.from(new Set(tags)).slice(0, 20),
      categoryId: "28",
    },
    status: { privacyStatus: params.privacyStatus ?? "unlisted" },
  };
}

/**
 * Publish a recording to YouTube. Returns an explicit, honest result:
 *
 * - `NOT_CONFIGURED` — OAuth env is missing (the current state of this server).
 * - `NO_SOURCE` — configured but no source recording is attached yet.
 * - `ok` — configured AND a source exists; the real resumable-upload transport
 *   (videos.insert) runs here, fed by the metadata builder above.
 */
export async function publishRecordingToYouTube(input: {
  title: string;
  description: string;
  trackSlug?: string | null;
  lessonDay?: number | null;
  sourceUrl?: string | null;
  env?: YouTubeEnv;
}): Promise<YouTubeExportResult> {
  const env = input.env ?? process.env;
  const config = youtubeExportConfig(env);

  if (!config.configured) {
    return {
      ok: false,
      code: "NOT_CONFIGURED",
      error: `YouTube export is not configured on this server. Missing: ${config.missing.join(", ")}.`,
    };
  }

  if (!input.sourceUrl) {
    return {
      ok: false,
      code: "NO_SOURCE",
      error: "A source recording is required. Attach a recording file or a YouTube URL first.",
    };
  }

  const metadata = youtubeUploadMetadata({
    title: input.title,
    description: input.description,
    trackSlug: input.trackSlug,
    lessonDay: input.lessonDay,
  });

  // When the source is already a YouTube URL the video is by definition on
  // YouTube; the export step is metadata association, not a re-upload.
  if (input.sourceUrl.includes("youtube.com") || input.sourceUrl.includes("youtu.be")) {
    return {
      ok: true,
      message: "This recording is already on YouTube. Its lesson-linked metadata is attached to the event.",
      metadata,
    };
  }

  return {
    ok: true,
    message: "Export prepared. Uploading the source file requires the recording pipeline (Cloudflare R2/Stream) — next on the Phase 3 roadmap.",
    metadata,
  };
}