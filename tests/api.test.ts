import { describe, it, expect } from "vitest";
import {
  validateRegistration,
  normalizeEmail,
  NAME_MAX,
  PASSWORD_MIN,
  PASSWORD_MAX,
} from "../src/lib/registerValidation";
import { parseLeaderboardQuery, LEADERBOARD_DEFAULT_LIMIT, LEADERBOARD_MAX_LIMIT } from "../src/lib/leaderboard";
import { isTrackComplete, sanitizeProgress } from "../src/lib/progressValidation";
import { clientIp } from "../src/lib/rateLimit";

describe("validateRegistration", () => {
  it("accepts a valid payload and trims/normalizes", () => {
    const r = validateRegistration({
      name: "  Ada Lovelace  ",
      email: "  ADA@Example.COM ",
      password: "correct-horse",
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.name).toBe("Ada Lovelace");
      expect(r.email).toBe("ada@example.com");
      expect(r.password).toBe("correct-horse");
    }
  });

  it("rejects when any field is missing", () => {
    expect(validateRegistration({ name: "Ada", email: "a@b.com" }).ok).toBe(false);
    expect(validateRegistration({ name: "Ada" }).ok).toBe(false);
    expect(validateRegistration({}).ok).toBe(false);
  });

  it("rejects non-string / too-short / too-long names", () => {
    expect(validateRegistration({ name: 42, email: "a@b.com", password: "secret1" }).ok).toBe(false);
    expect(validateRegistration({ name: "A", email: "a@b.com", password: "secret1" }).ok).toBe(false);
    expect(
      validateRegistration({ name: "x".repeat(NAME_MAX + 1), email: "a@b.com", password: "secret1" }).ok
    ).toBe(false);
  });

  it("rejects malformed emails", () => {
    for (const bad of ["nope", "no@at", "a@b", "a b@c.com", "@b.com", "a@.com"]) {
      const r = validateRegistration({ name: "Ada", email: bad, password: "secret1" });
      expect(r.ok, `email "${bad}" should fail`).toBe(false);
    }
  });

  it("rejects passwords shorter than 6 or longer than 128", () => {
    const base = { name: "Ada", email: "a@b.com" };
    expect(validateRegistration({ ...base, password: "x".repeat(PASSWORD_MIN - 1) }).ok).toBe(false);
    expect(validateRegistration({ ...base, password: "x".repeat(PASSWORD_MAX + 1) }).ok).toBe(false);
    expect(validateRegistration({ ...base, password: 123456 }).ok).toBe(false);
  });
});

describe("normalizeEmail", () => {
  it("lowercases and trims", () => {
    expect(normalizeEmail("  Ada@Example.COM ")).toBe("ada@example.com");
  });
});

describe("parseLeaderboardQuery", () => {
  it("defaults limit to 50 and track to c", () => {
    const q = parseLeaderboardQuery("http://x/api/leaderboard");
    expect(q.limit).toBe(LEADERBOARD_DEFAULT_LIMIT);
    expect(q.track).toBe("c");
  });

  it("clamps limit to the configured max", () => {
    expect(parseLeaderboardQuery("http://x/api/leaderboard?limit=1000").limit).toBe(LEADERBOARD_MAX_LIMIT);
    expect(parseLeaderboardQuery("http://x/api/leaderboard?limit=10").limit).toBe(10);
  });

  it("falls back to default on non-numeric limits and clamps negatives", () => {
    expect(parseLeaderboardQuery("http://x/api/leaderboard?limit=abc").limit).toBe(LEADERBOARD_DEFAULT_LIMIT);
    expect(parseLeaderboardQuery("http://x/api/leaderboard?limit=-5").limit).toBe(1);
  });

  it("maps valid track params and rejects unknown ones", () => {
    expect(parseLeaderboardQuery("http://x/api/leaderboard?track=python").track).toBe("python");
    expect(parseLeaderboardQuery("http://x/api/leaderboard?track=cpp").track).toBe("cpp");
    expect(parseLeaderboardQuery("http://x/api/leaderboard?track=js").track).toBe("js");
    expect(parseLeaderboardQuery("http://x/api/leaderboard?track=rust").track).toBe("rust");
    expect(parseLeaderboardQuery("http://x/api/leaderboard?track=sql").track).toBe("sql");
    expect(parseLeaderboardQuery("http://x/api/leaderboard?track=bash").track).toBe("bash");
    expect(parseLeaderboardQuery("http://x/api/leaderboard?track=go").track).toBe("c");
  });
});

describe("isTrackComplete", () => {
  it("is true when all days are covered (order/dedup independent)", () => {
    expect(isTrackComplete([1, 2, 3, 4, 5], 5)).toBe(true);
    expect(isTrackComplete([5, 4, 3, 2, 1, 1, 1], 5)).toBe(true);
  });

  it("is false when days are missing or the input is not an array", () => {
    expect(isTrackComplete([1, 2, 3, 4], 5)).toBe(false);
    expect(isTrackComplete([1, 2, 3, 4, 6], 5)).toBe(false);
    expect(isTrackComplete("nope", 5)).toBe(false);
    expect(isTrackComplete(null, 5)).toBe(false);
    expect(isTrackComplete([1, 2, 3, 4, 5], 0)).toBe(false);
  });

  it("ignores out-of-range extras once every valid day is present", () => {
    expect(isTrackComplete([1, 2, 3, 4, 5, 6], 5)).toBe(true);
    expect(isTrackComplete([0, 1, 2, 3, 4, 5], 5)).toBe(true);
  });
});

describe("clientIp", () => {
  it("prefers the first x-forwarded-for entry", () => {
    const req = new Request("http://x/", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(clientIp(req)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip then unknown", () => {
    expect(clientIp(new Request("http://x/", { headers: { "x-real-ip": "9.9.9.9" } }))).toBe("9.9.9.9");
    expect(clientIp(new Request("http://x/"))).toBe("unknown");
  });
});

describe("sanitizeProgress end-to-end shape", () => {
  it("produces a safe record for the db, level derived from XP", () => {
    const data = sanitizeProgress(
      { totalXp: 800, currentDay: 3, completedDays: [1, 2, 3], level: "master" },
      "python"
    );
    expect(data.level).toBe("apprentice");
    expect(data.completedDays).toEqual([1, 2, 3]);
    expect(data.totalXp).toBe(800);
  });
});
