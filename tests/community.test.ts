import { describe, it, expect } from "vitest";
import {
  groupSlugify,
  parseFeedQuery,
  nextVoteValue,
  applyVote,
  reportStatusTransition,
  canModerate,
  answerAcceptGuard,
  isReportTargetType,
  FEED_DEFAULT_LIMIT,
  FEED_MAX_LIMIT,
} from "../src/lib/community";

describe("groupSlugify", () => {
  it("lowercases, replaces spaces/punctuation, trims dashes", () => {
    expect(groupSlugify("Rust Book Club")).toBe("rust-book-club");
    expect(groupSlugify("  C Cohort  ")).toBe("c-cohort");
    expect(groupSlugify("Lagos Devs!")).toBe("lagos-devs");
    expect(groupSlugify("A--B__C")).toBe("a-b-c");
  });

  it("collapses multiple separators and keeps length bounded", () => {
    expect(groupSlugify("a   b")).toBe("a-b");
    expect(groupSlugify("x".repeat(80))).toBe("x".repeat(40));
  });

  it("falls back to a safe slug for empty or symbol-only names", () => {
    expect(groupSlugify("")).toBe("group");
    expect(groupSlugify("!!!")).toBe("group");
  });
});

describe("parseFeedQuery", () => {
  it("defaults limit to 20 and before to undefined", () => {
    const q = parseFeedQuery("http://x/api/posts");
    expect(q.limit).toBe(FEED_DEFAULT_LIMIT);
    expect(q.before).toBeUndefined();
  });

  it("clamps limit to [1, 50]", () => {
    expect(parseFeedQuery("http://x/api/posts?limit=1000").limit).toBe(FEED_MAX_LIMIT);
    expect(parseFeedQuery("http://x/api/posts?limit=-3").limit).toBe(1);
    expect(parseFeedQuery("http://x/api/posts?limit=abc").limit).toBe(FEED_DEFAULT_LIMIT);
  });

  it("accepts only valid ISO dates as cursors", () => {
    expect(parseFeedQuery("http://x/api/posts?before=2026-08-17T00:00:00.000Z").before).toBe("2026-08-17T00:00:00.000Z");
    expect(parseFeedQuery("http://x/api/posts?before=notadate").before).toBeUndefined();
  });
});

describe("nextVoteValue", () => {
  it("creates a vote when there was none", () => {
    expect(nextVoteValue(null, 1)).toBe(1);
    expect(nextVoteValue(null, -1)).toBe(-1);
  });

  it("cancels a vote when the same value is repeated", () => {
    expect(nextVoteValue(1, 1)).toBeNull();
    expect(nextVoteValue(-1, -1)).toBeNull();
  });

  it("switches direction", () => {
    expect(nextVoteValue(1, -1)).toBe(-1);
    expect(nextVoteValue(-1, 1)).toBe(1);
  });

  it("rejects invalid incoming values", () => {
    expect(nextVoteValue(null, 0)).toBeNull();
    expect(nextVoteValue(null, 5)).toBeNull();
  });
});

describe("applyVote", () => {
  it("computes the score delta for create, cancel, and switch", () => {
    expect(applyVote(10, null, 1)).toBe(11);
    expect(applyVote(10, 1, null)).toBe(9);
    expect(applyVote(10, 1, -1)).toBe(8);
    expect(applyVote(10, null, null)).toBe(10);
  });
});

describe("reportStatusTransition", () => {
  it("allows open -> actioned and open -> dismissed", () => {
    expect(reportStatusTransition("open", "actioned")).toBe("actioned");
    expect(reportStatusTransition("open", "dismissed")).toBe("dismissed");
  });

  it("freezes non-open reports", () => {
    expect(reportStatusTransition("actioned", "dismissed")).toBe("actioned");
    expect(reportStatusTransition("dismissed", "open")).toBe("dismissed");
    expect(reportStatusTransition("open", "open")).toBe("open");
    expect(reportStatusTransition("open", "bogus")).toBe("open");
  });
});

describe("canModerate", () => {
  it("matches emails case-insensitively against the whitelist", () => {
    expect(canModerate("Ada@Example.com", "ada@example.com,grace@example.com")).toBe(true);
    expect(canModerate("grace@example.com", "ada@example.com, grace@example.com")).toBe(true);
    expect(canModerate("eve@example.com", "ada@example.com")).toBe(false);
  });

  it("never grants access without an email or a whitelist", () => {
    expect(canModerate(null, "ada@example.com")).toBe(false);
    expect(canModerate("ada@example.com", "")).toBe(false);
    expect(canModerate(undefined, "")).toBe(false);
  });
});

describe("answerAcceptGuard", () => {
  it("allows the question author to accept a not-yet-accepted answer", () => {
    expect(answerAcceptGuard({ actorUserId: "a", questionUserId: "a", isAccepted: false })).toBe(true);
  });

  it("rejects non-authors, self-accept after acceptance, and other users", () => {
    expect(answerAcceptGuard({ actorUserId: "b", questionUserId: "a", isAccepted: false })).toBe(false);
    expect(answerAcceptGuard({ actorUserId: "a", questionUserId: "a", isAccepted: true })).toBe(false);
  });
});

describe("report target types", () => {
  it("accepts the five reportable targets and rejects others", () => {
    for (const t of ["post", "comment", "question", "answer", "message"]) {
      expect(isReportTargetType(t)).toBe(true);
    }
    expect(isReportTargetType("user")).toBe(false);
    expect(isReportTargetType("")).toBe(false);
    expect(isReportTargetType(null)).toBe(false);
  });
});
