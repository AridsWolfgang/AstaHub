import { describe, it, expect } from "vitest";
import {
  getLesson,
  getLessons,
  getTrackLesson,
  getTrackLessons,
  getTrackTotalDays,
  TOTAL_TRACKS,
} from "../src/lib/curriculum";
import { simulateAnsi } from "../src/lib/simulator";
import type { Lesson, TrackKey } from "../src/lib/types";

function assertWellFormedLesson(l: Lesson, expectedDay: number) {
  expect(l).toBeDefined();
  expect(l.day).toBe(expectedDay);
  expect(l.title).toBeTruthy();
  expect(l.subtitle).toBeTruthy();
  expect(l.tags.length).toBeGreaterThan(0);
  expect(l.level).toBeTruthy();
  expect(l.durationMinutes).toBeGreaterThan(0);
  expect(l.xpTotal).toBeGreaterThan(0);

  expect(l.theory.sections.length).toBeGreaterThan(0);
  for (const s of l.theory.sections) {
    expect(s.heading).toBeTruthy();
    expect(s.content).toBeTruthy();
  }

  expect(l.playground).toBeTruthy();
  expect(l.playground.defaultCode.length).toBeGreaterThan(0);
  expect(l.playground.runnable).toBe(true);

  expect(l.exercises.length).toBeGreaterThan(0);
  const ids = new Set<string>();
  for (const ex of l.exercises) {
    expect(ex.id).toBeTruthy();
    expect(ids.has(ex.id)).toBe(false); // no duplicate exercise ids
    ids.add(ex.id);
    expect(ex.xpReward).toBeGreaterThan(0);
    expect(["quiz", "code"].includes(ex.type)).toBe(true);
    if (ex.type === "quiz") {
      expect(ex.question).toBeTruthy();
      expect(ex.options && ex.options.length >= 2).toBe(true);
    }
    if (ex.type === "code") {
      expect(ex.starterCode).toBeTruthy();
    }
  }
}

describe("C/Assembly curriculum integrity", () => {
  it("resolves every day 1-100 to a well-formed lesson", async () => {
    for (let day = 1; day <= 100; day++) {
      const l = await getLesson(day);
      assertWellFormedLesson(l!, day);
    }
  });

  it("getLessons() returns exactly 100 lessons", async () => {
    const lessons = await getLessons();
    expect(lessons).toHaveLength(100);
    expect(new Set(lessons.map((l) => l.day)).size).toBe(100);
  });
});

describe("Python track integrity", () => {
  it("resolves every day to a well-formed lesson", async () => {
    const total = await getTrackTotalDays("python");
    expect(total).toBe(TOTAL_TRACKS.python);
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("python", day);
      expect(l).toBeDefined();
      assertWellFormedLesson(l!, day);
      expect(l!.language).toBe("python");
      expect(l!.track).toBe("python");
    }
  });

  it("getTrackLessons('python') returns the full track", async () => {
    const lessons = await getTrackLessons("python");
    expect(lessons).toHaveLength(TOTAL_TRACKS.python);
  });
});

describe("C++ track integrity", () => {
  it("resolves every day to a well-formed lesson", async () => {
    const total = await getTrackTotalDays("cpp");
    expect(total).toBe(TOTAL_TRACKS.cpp);
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("cpp", day);
      expect(l).toBeDefined();
      assertWellFormedLesson(l!, day);
      expect(l!.language).toBe("cpp");
      expect(l!.track).toBe("cpp");
    }
  });

  it("getTrackLessons('cpp') returns the full track", async () => {
    const lessons = await getTrackLessons("cpp");
    expect(lessons).toHaveLength(TOTAL_TRACKS.cpp);
  });
});

describe("JavaScript/TypeScript track integrity", () => {
  it("resolves every day to a well-formed lesson", async () => {
    const total = await getTrackTotalDays("js");
    expect(total).toBe(TOTAL_TRACKS.js);
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("js", day);
      expect(l).toBeDefined();
      assertWellFormedLesson(l!, day);
      expect(l!.language).toBe("js");
      expect(l!.track).toBe("js");
    }
  });

  it("getTrackLessons('js') returns the full track", async () => {
    const lessons = await getTrackLessons("js");
    expect(lessons).toHaveLength(TOTAL_TRACKS.js);
  });
});

describe("Rust track integrity", () => {
  it("resolves every day to a well-formed lesson", async () => {
    const total = await getTrackTotalDays("rust");
    expect(total).toBe(TOTAL_TRACKS.rust);
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("rust", day);
      expect(l).toBeDefined();
      assertWellFormedLesson(l!, day);
      expect(l!.language).toBe("rust");
      expect(l!.track).toBe("rust");
    }
  });

  it("getTrackLessons('rust') returns the full track", async () => {
    const lessons = await getTrackLessons("rust");
    expect(lessons).toHaveLength(TOTAL_TRACKS.rust);
  });
});

describe("SQL track integrity", () => {
  it("resolves every day to a well-formed lesson", async () => {
    const total = await getTrackTotalDays("sql");
    expect(total).toBe(TOTAL_TRACKS.sql);
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("sql", day);
      expect(l).toBeDefined();
      assertWellFormedLesson(l!, day);
      expect(l!.language).toBe("sql");
      expect(l!.track).toBe("sql");
    }
  });

  it("getTrackLessons('sql') returns the full track", async () => {
    const lessons = await getTrackLessons("sql");
    expect(lessons).toHaveLength(TOTAL_TRACKS.sql);
  });
});

describe("Bash track integrity", () => {
  it("resolves every day to a well-formed lesson", async () => {
    const total = await getTrackTotalDays("bash");
    expect(total).toBe(TOTAL_TRACKS.bash);
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("bash", day);
      expect(l).toBeDefined();
      assertWellFormedLesson(l!, day);
      expect(l!.language).toBe("bash");
      expect(l!.track).toBe("bash");
    }
  });

  it("getTrackLessons('bash') returns the full track", async () => {
    const lessons = await getTrackLessons("bash");
    expect(lessons).toHaveLength(TOTAL_TRACKS.bash);
  });
});

describe("Track routing", () => {
  it("unknown tracks fall back to the C engine", async () => {
    const l = await getTrackLesson("c" as TrackKey, 1);
    expect(l).toBeDefined();
    expect(l!.day).toBe(1);
  });

  it("days out of range return undefined instead of throwing", async () => {
    const l = await getLesson(101);
    expect(l).toBeUndefined();
  });
});

function simBody(code: string, language: string): string {
  return simulateAnsi(code, language)
    .replace(/\/\/ ASTA Runner.*?\n\/\/ ─[─\r\n]*\n\n/, "")
    .replace(/\n?\/\/ Process finished.*$/, "")
    .replace(/\r/g, "");
}

describe("Generated code-challenge verification", () => {
  it("python code challenges that declare expectedOutput are reproducible by the simulator", async () => {
    const total = await getTrackTotalDays("python");
    let gated = 0;
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("python", day);
      const code = l?.exercises.find((e) => e.type === "code");
      if (!code || !code.expectedOutput) continue;
      gated++;
      expect(code.expectedOutput.length).toBeGreaterThan(0);
      const sim = simBody(code.starterCode ?? "", "python");
      expect(sim, `python day ${day} expectedOutput must be reproducible by the simulator`).toContain(code.expectedOutput);
    }
    expect(gated).toBeGreaterThan(20);
  });

  it("cpp code challenges that declare expectedOutput are non-empty", async () => {
    const total = await getTrackTotalDays("cpp");
    let gated = 0;
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("cpp", day);
      const code = l?.exercises.find((e) => e.type === "code");
      if (!code || !code.expectedOutput) continue;
      gated++;
      expect(code.expectedOutput.length).toBeGreaterThan(0);
    }
    expect(gated).toBeGreaterThan(30);
  });

  it("js code challenges that declare expectedOutput are non-empty", async () => {
    const total = await getTrackTotalDays("js");
    let gated = 0;
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("js", day);
      const code = l?.exercises.find((e) => e.type === "code");
      if (!code || !code.expectedOutput) continue;
      gated++;
      expect(code.expectedOutput.length).toBeGreaterThan(0);
    }
    expect(gated).toBeGreaterThan(25);
  });

  it("rust code challenges that declare expectedOutput are non-empty", async () => {
    const total = await getTrackTotalDays("rust");
    let gated = 0;
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("rust", day);
      const code = l?.exercises.find((e) => e.type === "code");
      if (!code || !code.expectedOutput) continue;
      gated++;
      expect(code.expectedOutput.length).toBeGreaterThan(0);
    }
    expect(gated).toBeGreaterThan(25);
  });

  it("sql code challenges that declare expectedOutput are non-empty", async () => {
    const total = await getTrackTotalDays("sql");
    let gated = 0;
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("sql", day);
      const code = l?.exercises.find((e) => e.type === "code");
      if (!code || !code.expectedOutput) continue;
      gated++;
      expect(code.expectedOutput.length).toBeGreaterThan(0);
    }
    expect(gated).toBeGreaterThan(30);
  });

  it("bash code challenges that declare expectedOutput are non-empty", async () => {
    const total = await getTrackTotalDays("bash");
    let gated = 0;
    for (let day = 1; day <= total; day++) {
      const l = await getTrackLesson("bash", day);
      const code = l?.exercises.find((e) => e.type === "code");
      if (!code || !code.expectedOutput) continue;
      gated++;
      expect(code.expectedOutput.length).toBeGreaterThan(0);
    }
    expect(gated).toBeGreaterThan(15);
  });

  it("every code challenge across all tracks keeps a stable id and shape", async () => {
    const lessons = [
      ...(await getLessons()),
      ...(await getTrackLessons("python")),
      ...(await getTrackLessons("cpp")),
      ...(await getTrackLessons("js")),
      ...(await getTrackLessons("rust")),
      ...(await getTrackLessons("sql")),
      ...(await getTrackLessons("bash")),
    ];
    const ids = new Set<string>();
    for (const l of lessons) {
      const code = l.exercises.find((e) => e.type === "code");
      expect(code).toBeDefined();
      expect(code!.id).toBeTruthy();
      expect(ids.has(code!.id)).toBe(false);
      ids.add(code!.id);
    }
  });
});
