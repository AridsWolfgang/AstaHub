import { describe, it, expect, afterEach } from "vitest";
import {
  sanitizeProgress,
  sanitizeCompletedDays,
  TRACK_TOTAL_DAYS,
} from "../src/lib/progressValidation";
import { rateLimit } from "../src/lib/rateLimit";

describe("sanitizeProgress", () => {
  it("clamps totalXp and derives level from XP, ignoring client level", () => {
    const data = sanitizeProgress({ totalXp: 999_999_999, level: "master" }, "c");
    expect(data.totalXp).toBe(2_000_000);
    expect(data.level).toBe("master"); // still master at the cap
  });

  it("forces a non-master level when XP is small even if client claims master", () => {
    const data = sanitizeProgress({ totalXp: 100, level: "master" }, "c");
    expect(data.level).toBe("initiate");
  });

  it("clamps negative XP and streak to zero", () => {
    const data = sanitizeProgress({ totalXp: -50, streak: -3 }, "c");
    expect(data.totalXp).toBe(0);
    expect(data.streak).toBe(0);
  });

  it("clamps currentDay to the allowed day range", () => {
    const data = sanitizeProgress({ currentDay: 500, completedDays: [1, 2, 3] }, "c");
    expect(data.currentDay).toBe(100);
  });

  it("ignores the level field entirely", () => {
    const data = sanitizeProgress({ totalXp: 800, level: "expert" }, "c");
    expect(data.level).toBe("apprentice");
    expect("level" in data).toBe(true);
  });

  it("keeps level off the wire if XP is missing", () => {
    const data = sanitizeProgress({ currentDay: 1 }, "python");
    expect(data.level).toBe("initiate");
  });
});

describe("sanitizeCompletedDays", () => {
  it("deduplicates, coerces numeric strings, and drops out-of-range days", () => {
    const days = sanitizeCompletedDays([1, 2, 2, 99, 101, -1, "5"], TRACK_TOTAL_DAYS.c);
    expect(days).toEqual([1, 2, 99, 5]);
  });

  it("returns empty array for non-array input", () => {
    expect(sanitizeCompletedDays(null, 100)).toEqual([]);
    expect(sanitizeCompletedDays("nope", 100)).toEqual([]);
  });

  it("respects the track's total day count", () => {
    const days = sanitizeCompletedDays([1, 40, 41, 99], TRACK_TOTAL_DAYS.python);
    expect(days).toEqual([1, 40]);
  });
});

describe("rateLimit", () => {
  afterEach(() => {
    // Allow the limiter's internal state to be reused across tests cleanly.
  });

  it("allows up to the limit within the window", () => {
    const key = `test:${Date.now()}`;
    expect(rateLimit(key, 3, 60_000)).toBe(true);
    expect(rateLimit(key, 3, 60_000)).toBe(true);
    expect(rateLimit(key, 3, 60_000)).toBe(true);
    expect(rateLimit(key, 3, 60_000)).toBe(false);
  });

  it("treats distinct keys independently", () => {
    const a = `testa:${Date.now()}`;
    const b = `testb:${Date.now()}`;
    expect(rateLimit(a, 1, 60_000)).toBe(true);
    expect(rateLimit(a, 1, 60_000)).toBe(false);
    expect(rateLimit(b, 1, 60_000)).toBe(true);
  });

  it("refills after the window elapses", async () => {
    const key = `test:${Date.now()}`;
    expect(rateLimit(key, 1, 5)).toBe(true);
    expect(rateLimit(key, 1, 5)).toBe(false);
    await new Promise((r) => setTimeout(r, 10));
    expect(rateLimit(key, 1, 5)).toBe(true);
  });
});
