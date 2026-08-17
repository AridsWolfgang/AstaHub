import { describe, it, expect } from "vitest";
import {
  HINT_LADDER,
  COACH_HINT_LEVELS,
  COACH_SYSTEM_PROMPT,
  parseCoachRequest,
  buildHintPrompt,
  buildQuestionPrompt,
  buildCoachMessages,
  enforceCoachRules,
  isCoachConfigured,
  COACH_CODE_MAX,
} from "../src/lib/coach";

describe("HINT_LADDER", () => {
  it("has exactly four rungs in the right order", () => {
    expect(HINT_LADDER).toHaveLength(COACH_HINT_LEVELS);
    expect(HINT_LADDER.map((r) => r.title)).toEqual(["Clarify", "Shrink it", "Name the concept", "Find the bug"]);
  });

  it("the final rung is the only one about broken code", () => {
    expect(HINT_LADDER[3].instruction).toMatch(/broken/i);
  });

  it("the system prompt enforces coach-never-oracle", () => {
    expect(COACH_SYSTEM_PROMPT).toMatch(/never/i);
    expect(COACH_SYSTEM_PROMPT).toMatch(/now write it yourself/i);
    expect(COACH_SYSTEM_PROMPT).toMatch(/complete, correct solution/i);
  });
});

describe("parseCoachRequest", () => {
  const base = {
    track: "c",
    day: 12,
    topic: "Pointers and memory",
    prompt: "Write a function that swaps two integers.",
    code: "void swap(int* a, int* b) {}",
  };

  it("accepts a valid hint request", () => {
    const r = parseCoachRequest({ ...base, hintLevel: 2 });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.hintLevel).toBe(2);
  });

  it("accepts a valid question request", () => {
    const r = parseCoachRequest({ ...base, question: "Why do I need a pointer here?" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.question).toContain("pointer");
  });

  it("rejects invalid days and hint levels", () => {
    expect(parseCoachRequest({ ...base, day: 0 }).ok).toBe(false);
    expect(parseCoachRequest({ ...base, day: 400 }).ok).toBe(false);
    expect(parseCoachRequest({ ...base, hintLevel: 4 }).ok).toBe(false);
    expect(parseCoachRequest({ ...base, hintLevel: -1 }).ok).toBe(false);
  });

  it("rejects asking for both a hint and a question", () => {
    expect(parseCoachRequest({ ...base, hintLevel: 0, question: "why?" }).ok).toBe(false);
  });

  it("rejects requests with no context and no question", () => {
    expect(parseCoachRequest({ day: 12, hintLevel: 0 }).ok).toBe(false);
    expect(parseCoachRequest({ day: 12 }).ok).toBe(false);
  });

  it("caps the code snippet length", () => {
    const r = parseCoachRequest({ ...base, hintLevel: 0, code: "x".repeat(COACH_CODE_MAX + 100) });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.code.length).toBe(COACH_CODE_MAX);
  });
});

describe("buildHintPrompt", () => {
  it("includes context, the rung instruction, and the learner's code", () => {
    const p = buildHintPrompt({
      track: "python",
      day: 5,
      topic: "Loops",
      prompt: "Sum 1 to 10.",
      code: "total = 0",
      hintLevel: 1,
      question: "",
    });
    expect(p).toContain("Track: python · Day 5");
    expect(p).toContain("Loops");
    expect(p).toContain("smallest version");
    expect(p).toContain("total = 0");
  });

  it("uses the find-the-bug instruction at level 3", () => {
    const p = buildHintPrompt({
      track: "c",
      day: 1,
      topic: "x",
      prompt: "y",
      code: "",
      hintLevel: 3,
      question: "",
    });
    expect(p).toContain("deliberately broken");
  });
});

describe("buildQuestionPrompt", () => {
  it("passes the learner's question through and reminds the model to guide", () => {
    const p = buildQuestionPrompt({
      track: "c",
      day: 1,
      topic: "x",
      prompt: "y",
      code: "",
      hintLevel: undefined,
      question: "What is a pointer?",
    });
    expect(p).toContain("What is a pointer?");
    expect(p).toContain("do not give a finished solution");
  });
});

describe("buildCoachMessages", () => {
  it("returns a system message plus one user message", () => {
    const m = buildCoachMessages({
      track: "c",
      day: 1,
      topic: "x",
      prompt: "y",
      code: "",
      hintLevel: 0,
      question: "",
    });
    expect(m).toHaveLength(2);
    expect(m[0].role).toBe("system");
    expect(m[1].role).toBe("user");
    expect(m[0].content).toBe(COACH_SYSTEM_PROMPT);
  });
});

describe("enforceCoachRules", () => {
  it("appends the closing line when missing", () => {
    expect(enforceCoachRules("Try breaking the problem in half.")).toBe(
      "Try breaking the problem in half. Now write it yourself."
    );
  });

  it("keeps an existing closing line (case- and punctuation-insensitive)", () => {
    expect(enforceCoachRules("Think about the base case. now write it yourself")).toMatch(/now write it yourself\.?$/i);
  });

  it("caps very long replies", () => {
    const long = "word ".repeat(500);
    const out = enforceCoachRules(long);
    expect(out.length).toBeLessThanOrEqual(2000 + " Now write it yourself.".length);
  });
});

describe("isCoachConfigured", () => {
  it("is true only when an OpenRouter key exists", () => {
    expect(isCoachConfigured({ OPENROUTER_API_KEY: "sk-123" })).toBe(true);
    expect(isCoachConfigured({})).toBe(false);
  });
});