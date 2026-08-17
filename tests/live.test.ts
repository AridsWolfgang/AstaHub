import { describe, it, expect } from "vitest";
import {
  liveEventSlugify,
  deriveLiveStatus,
  isCurrentlyLive,
  parseLiveQuery,
  validateLiveEvent,
  isLiveEventType,
  isLiveEventStatus,
  youtubeVideoId,
  youtubeEmbedUrl,
  normalizeYouTubeUrl,
  googleCalendarUrl,
  LIVE_DURATION_MIN,
  LIVE_DURATION_MAX,
} from "../src/lib/live";

const NOW = new Date("2026-08-17T12:00:00.000Z");
const START = new Date("2026-08-17T11:00:00.000Z");
const DURATION = 60;

describe("liveEventSlugify", () => {
  it("lowercases, replaces spaces/punctuation, trims dashes", () => {
    expect(liveEventSlugify("Live Class: Pointers & Memory")).toBe("live-class-pointers-memory");
    expect(liveEventSlugify("  Office Hours  ")).toBe("office-hours");
    expect(liveEventSlugify("C++ Q&A!")).toBe("c-q-a");
  });

  it("collapses separators and keeps length bounded", () => {
    expect(liveEventSlugify("a   b")).toBe("a-b");
    expect(liveEventSlugify("x".repeat(80))).toBe("x".repeat(60));
  });

  it("falls back to a safe slug for empty or symbol-only titles", () => {
    expect(liveEventSlugify("")).toBe("event");
    expect(liveEventSlugify("???")).toBe("event");
  });
});

describe("deriveLiveStatus", () => {
  it("stays scheduled before start", () => {
    expect(deriveLiveStatus("scheduled", "2026-08-17T13:00:00.000Z", DURATION, NOW)).toBe("scheduled");
  });

  it("flips to live at startAt and finished after the duration", () => {
    expect(deriveLiveStatus("scheduled", "2026-08-17T12:00:00.000Z", DURATION, NOW)).toBe("live");
    expect(deriveLiveStatus("scheduled", "2026-08-17T10:00:00.000Z", DURATION, NOW)).toBe("finished");
  });

  it("honors manual statuses regardless of the clock", () => {
    expect(deriveLiveStatus("cancelled", START, DURATION, NOW)).toBe("cancelled");
    expect(deriveLiveStatus("live", "2026-08-17T13:00:00.000Z", DURATION, NOW)).toBe("live");
    expect(deriveLiveStatus("finished", "2026-08-17T13:00:00.000Z", DURATION, NOW)).toBe("finished");
  });
});

describe("isCurrentlyLive", () => {
  it("is true exactly while an event is live", () => {
    expect(isCurrentlyLive("scheduled", "2026-08-17T12:00:00.000Z", DURATION, NOW)).toBe(true);
    expect(isCurrentlyLive("scheduled", "2026-08-17T13:00:00.000Z", DURATION, NOW)).toBe(false);
    expect(isCurrentlyLive("cancelled", "2026-08-17T12:00:00.000Z", DURATION, NOW)).toBe(false);
  });
});

describe("parseLiveQuery", () => {
  it("defaults to upcoming with a 50-item limit", () => {
    const q = parseLiveQuery("http://x/api/live");
    expect(q.scope).toBe("upcoming");
    expect(q.limit).toBe(50);
  });

  it("honors scope=past and clamps limit to [1, 100]", () => {
    expect(parseLiveQuery("http://x/api/live?scope=past").scope).toBe("past");
    expect(parseLiveQuery("http://x/api/live?scope=bogus").scope).toBe("upcoming");
    expect(parseLiveQuery("http://x/api/live?limit=1000").limit).toBe(100);
    expect(parseLiveQuery("http://x/api/live?limit=-5").limit).toBe(1);
    expect(parseLiveQuery("http://x/api/live?limit=abc").limit).toBe(50);
  });
});

describe("isLiveEventType / isLiveEventStatus", () => {
  it("accepts the four types and four statuses, rejects others", () => {
    for (const t of ["live_coding", "live_class", "office_hours", "qa"]) {
      expect(isLiveEventType(t)).toBe(true);
    }
    for (const s of ["scheduled", "live", "finished", "cancelled"]) {
      expect(isLiveEventStatus(s)).toBe(true);
    }
    expect(isLiveEventType("webinar")).toBe(false);
    expect(isLiveEventStatus("deleted")).toBe(false);
    expect(isLiveEventType(null)).toBe(false);
  });
});

describe("validateLiveEvent", () => {
  const base = {
    title: "Pointers under the hood",
    description: "A live walkthrough.",
    type: "live_class",
    track: "c",
    lessonDay: 12,
    startAt: "2026-08-20T18:00:00.000Z",
    durationMinutes: 60,
    hostName: "Ada Lovelace",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    recordingUrl: "",
  };

  it("accepts a valid payload and normalizes URLs", () => {
    const r = validateLiveEvent(base);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.youtubeUrl).toBe("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    expect(r.value.recordingUrl).toBeNull();
    expect(r.value.lessonDay).toBe(12);
  });

  it("accepts embed/shorts/live YouTube link shapes", () => {
    for (const url of [
      "https://youtu.be/dQw4w9WgXcQ",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "https://www.youtube.com/shorts/dQw4w9WgXcQ",
      "https://www.youtube.com/live/dQw4w9WgXcQ",
      "https://www.youtube.com/watch?foo=1&v=dQw4w9WgXcQ",
    ]) {
      const r = validateLiveEvent({ ...base, youtubeUrl: url });
      expect(r.ok).toBe(true);
    }
  });

  it("rejects a non-YouTube stream link", () => {
    const r = validateLiveEvent({ ...base, youtubeUrl: "https://example.com/not-youtube" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("YouTube");
  });

  it("rejects missing title, bad duration, bad start, and missing host", () => {
    expect(validateLiveEvent({ ...base, title: "" }).ok).toBe(false);
    expect(validateLiveEvent({ ...base, durationMinutes: 1 }).ok).toBe(false);
    expect(validateLiveEvent({ ...base, durationMinutes: 10_000 }).ok).toBe(false);
    expect(validateLiveEvent({ ...base, startAt: "not-a-date" }).ok).toBe(false);
    expect(validateLiveEvent({ ...base, hostName: "" }).ok).toBe(false);
    expect(validateLiveEvent({ ...base, lessonDay: 0 }).ok).toBe(false);
    expect(validateLiveEvent({ ...base, lessonDay: 400 }).ok).toBe(false);
  });

  it("rejects an invalid type", () => {
    expect(validateLiveEvent({ ...base, type: "webinar" }).ok).toBe(false);
  });
});

describe("YouTube URL helpers", () => {
  it("extracts video ids from common URL shapes", () => {
    expect(youtubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youtubeVideoId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youtubeVideoId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youtubeVideoId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youtubeVideoId("https://www.youtube.com/live/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youtubeVideoId("not a url")).toBeNull();
  });

  it("builds privacy-preserving embed URLs only for valid YouTube links", () => {
    expect(youtubeEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    );
    expect(youtubeEmbedUrl("https://example.com/x")).toBeNull();
  });

  it("normalizeYouTubeUrl canonicalizes or returns null", () => {
    expect(normalizeYouTubeUrl("  https://youtu.be/dQw4w9WgXcQ  ")).toBe(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
    expect(normalizeYouTubeUrl("")).toBeNull();
    expect(normalizeYouTubeUrl(null)).toBeNull();
  });
});

describe("googleCalendarUrl", () => {
  it("builds a valid add-to-calendar link with start and end dates", () => {
    const url = googleCalendarUrl({
      title: "Live class",
      description: "desc",
      startAt: "2026-08-20T18:00:00.000Z",
      durationMinutes: 60,
    });
    expect(url).toContain("action=TEMPLATE");
    expect(url).toContain("text=Live+class");
    expect(url).toContain("dates=20260820T180000Z%2F20260820T190000Z");
  });
});