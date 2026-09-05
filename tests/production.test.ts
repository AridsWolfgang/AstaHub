import { describe, it, expect } from "vitest";
import { isRedisConfigured } from "../src/lib/redis";
import { isR2Configured } from "../src/lib/r2";
import { isWebRTCConfigured } from "../src/lib/webrtc";
import { buildAchievements } from "../src/lib/achievements";
import { skillProgress } from "../src/lib/skillTree";
import { certificateUrl, isCertificateVerifiable } from "../src/lib/certificate";
import { conceptForDay } from "../src/lib/knowledgeGraph";
import { shouldShowRaincheck } from "../src/lib/raincheck";
import { tierReconciliation } from "../src/lib/types";

describe("production gaps — honest gates", () => {
  it("redis not configured without env", () => {
    expect(isRedisConfigured({})).toBe(false);
  });
  it("r2 not configured without env", () => {
    expect(isR2Configured({})).toBe(false);
  });
  it("webrtc not configured without env", () => {
    expect(isWebRTCConfigured({})).toBe(false);
  });
  it("certificate not verifiable without env", () => {
    expect(isCertificateVerifiable({})).toBe(false);
  });
  it("certificate url is stable", () => {
    expect(certificateUrl("abc123")).toBe("/certificates/abc123/verify");
  });
  it("knowledge graph returns concept for day 1", () => {
    const c = conceptForDay("c", 1);
    expect(c).toBeTruthy();
  });
  it("tier reconciliation is honest", () => {
    const r = tierReconciliation(30, 100);
    expect(r.lessonTier).toBe("apprentice");
    expect(r.learnerLevel).toBe("initiate");
    expect(r.aligned).toBe(true); // initiate is within 1 tier of apprentice
  });
  it("raincheck logic", () => {
    expect(shouldShowRaincheck({ completedDays: [1,2], lastActiveDate: null } as never)).toBe(false);
    expect(shouldShowRaincheck({ completedDays: [1,2,3,4,5,6,7], lastActiveDate: null } as never)).toBe(true);
  });
  it("achievements are data-driven", () => {
    const ach = buildAchievements("c", { completedDays: [1,2,3], totalXp: 600, streak: 7, certificates: [] } as never);
    expect(ach.length).toBeGreaterThan(10);
    const first = ach.find((a) => a.id === "first-boot");
    expect(first?.unlocked).toBe(true);
  });
  it("skill tree maps days to nodes", () => {
    const nodes = skillProgress("c", { completedDays: [1,2,30], totalXp: 0 } as never);
    expect(nodes.length).toBeGreaterThan(0);
    expect(nodes[0].unlocked).toBe(true);
  });
});
