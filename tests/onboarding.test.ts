import { describe, it, expect } from "vitest";
import {
  isTrackKey,
  trackSlugToKey,
  getPrimaryTrack,
  hasAnyProgress,
  dayOneHref,
} from "../src/lib/onboarding";

describe("onboarding", () => {
  it("validates track keys", () => {
    expect(isTrackKey("c")).toBe(true);
    expect(isTrackKey("python")).toBe(true);
    expect(isTrackKey("js")).toBe(true);
    expect(isTrackKey("rust")).toBe(false);
    expect(isTrackKey(null)).toBe(false);
    expect(isTrackKey(undefined)).toBe(false);
    expect(isTrackKey(42)).toBe(false);
  });

  it("maps registry slugs to track keys", () => {
    expect(trackSlugToKey("c")).toBe("c");
    expect(trackSlugToKey("assembly")).toBe("c");
    expect(trackSlugToKey("python")).toBe("python");
    expect(trackSlugToKey("cpp")).toBe("cpp");
    expect(trackSlugToKey("javascript")).toBe("js");
    expect(trackSlugToKey("js")).toBe("js");
    expect(trackSlugToKey("sql")).toBe("sql");
    expect(trackSlugToKey("toolkit")).toBe("bash");
    expect(trackSlugToKey("bash")).toBe("bash");
    expect(trackSlugToKey("mathematics")).toBe("c");
    expect(trackSlugToKey("")).toBe("c");
  });

  it("links every track to its day-one lesson", () => {
    expect(dayOneHref("c")).toBe("/lesson/1");
    expect(dayOneHref("python")).toBe("/lesson/python/1");
    expect(dayOneHref("cpp")).toBe("/lesson/cpp/1");
    expect(dayOneHref("js")).toBe("/lesson/js/1");
    expect(dayOneHref("sql")).toBe("/lesson/sql/1");
    expect(dayOneHref("bash")).toBe("/lesson/bash/1");
  });

  it("detects any progress across snapshots", () => {
    expect(hasAnyProgress([])).toBe(false);
    expect(
      hasAnyProgress([{ completedDays: [] }, { completedDays: [] }])
    ).toBe(false);
    expect(
      hasAnyProgress([{ completedDays: [] }, { completedDays: [1] }])
    ).toBe(true);
  });

  it("has no stored primary track in a non-browser env", () => {
    expect(getPrimaryTrack()).toBe(null);
  });
});
