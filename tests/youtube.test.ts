import { describe, it, expect } from "vitest";
import {
  isYouTubeExportConfigured,
  youtubeExportConfig,
  youtubeUploadMetadata,
  publishRecordingToYouTube,
} from "../src/lib/youtube";

const FULL_ENV = {
  YOUTUBE_CLIENT_ID: "client-id",
  YOUTUBE_CLIENT_SECRET: "client-secret",
  YOUTUBE_REFRESH_TOKEN: "refresh-token",
};

describe("YouTube export configuration", () => {
  it("is configured only when all OAuth env vars are present", () => {
    expect(isYouTubeExportConfigured(FULL_ENV)).toBe(true);
    expect(isYouTubeExportConfigured({})).toBe(false);
    expect(isYouTubeExportConfigured({ YOUTUBE_CLIENT_ID: "x" })).toBe(false);
  });

  it("reports the exact missing variables", () => {
    expect(youtubeExportConfig({}).missing.sort()).toEqual(
      ["YOUTUBE_CLIENT_ID", "YOUTUBE_CLIENT_SECRET", "YOUTUBE_REFRESH_TOKEN"].sort()
    );
    expect(youtubeExportConfig({ YOUTUBE_CLIENT_ID: "x" }).configured).toBe(false);
    expect(youtubeExportConfig(FULL_ENV).configured).toBe(true);
    expect(youtubeExportConfig(FULL_ENV).missing).toEqual([]);
  });
});

describe("youtubeUploadMetadata", () => {
  it("builds a videos.insert resource with lesson-linked tags", () => {
    const meta = youtubeUploadMetadata({
      title: "Pointers under the hood",
      description: "A live walkthrough.",
      trackSlug: "c",
      lessonDay: 12,
    });
    expect(meta.snippet.title).toBe("Pointers under the hood");
    expect(meta.snippet.categoryId).toBe("28");
    expect(meta.status.privacyStatus).toBe("unlisted");
    expect(meta.snippet.tags).toContain("AstaHub");
    expect(meta.snippet.tags).toContain("c");
    expect(meta.snippet.tags).toContain("track-c");
    expect(meta.snippet.tags).toContain("day-12");
    expect(meta.snippet.description).toContain("Track: c");
    expect(meta.snippet.description).toContain("Lesson day: 12");
  });

  it("defaults privacy to unlisted and dedupes tags", () => {
    const meta = youtubeUploadMetadata({
      title: "t",
      description: "d",
      extraTags: ["AstaHub", "c", "education"],
    });
    const tags = meta.snippet.tags;
    expect(new Set(tags).size).toBe(tags.length);
    expect(meta.status.privacyStatus).toBe("unlisted");
    expect(meta.status.privacyStatus).not.toBe("public");
  });

  it("works without a track/lesson", () => {
    const meta = youtubeUploadMetadata({ title: "t", description: "d" });
    expect(meta.snippet.tags).not.toContain("track-c");
    expect(meta.snippet.description).not.toContain("Track:");
  });
});

describe("publishRecordingToYouTube", () => {
  it("returns an honest NOT_CONFIGURED result without OAuth env", async () => {
    const r = await publishRecordingToYouTube({
      title: "t",
      description: "d",
      sourceUrl: "https://youtu.be/abc123",
      env: {},
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe("NOT_CONFIGURED");
      expect(r.error).toContain("YOUTUBE_CLIENT_ID");
    }
  });

  it("returns NO_SOURCE when configured but no recording is attached", async () => {
    const r = await publishRecordingToYouTube({
      title: "t",
      description: "d",
      env: FULL_ENV,
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe("NO_SOURCE");
      expect(r.error).toContain("source recording");
    }
  });

  it("reports success with metadata when configured and the source is a YouTube URL", async () => {
    const r = await publishRecordingToYouTube({
      title: "Pointers under the hood",
      description: "A live walkthrough.",
      trackSlug: "c",
      lessonDay: 12,
      sourceUrl: "https://youtu.be/dQw4w9WgXcQ",
      env: FULL_ENV,
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.metadata.snippet.tags).toContain("day-12");
      expect(r.message).toContain("already on YouTube");
    }
  });
});