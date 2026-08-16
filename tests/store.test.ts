import { describe, it, expect, beforeEach, vi } from "vitest";
import { useProgressStore, usePythonStore } from "../src/lib/store";

// zustand's persist middleware reads/writes window.localStorage. Provide a
// minimal in-memory implementation so the stores hydrate to their defaults.
function makeLocalStorage() {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    },
    clear: () => {
      store = {};
    },
  };
}

beforeEach(() => {
  vi.stubGlobal("localStorage", makeLocalStorage());
  useProgressStore.setState({ completedDays: [], totalXp: 0, completedExercises: {}, completedAssignments: [], streak: 0, lastActiveDate: null, level: "initiate", currentDay: 1, notes: {} });
  usePythonStore.setState({ completedDays: [], totalXp: 0, completedExercises: {}, completedAssignments: [], streak: 0, lastActiveDate: null, level: "initiate", currentDay: 1, notes: {} });
});

describe("useProgressStore.completeDay", () => {
  it("awards XP on the first completion", () => {
    useProgressStore.getState().completeDay(1, 50);
    const s = useProgressStore.getState();
    expect(s.completedDays).toEqual([1]);
    expect(s.totalXp).toBe(50);
  });

  it("does not double-award XP when the day is already complete", () => {
    useProgressStore.getState().completeDay(1, 50);
    useProgressStore.getState().completeDay(1, 50);
    const s = useProgressStore.getState();
    expect(s.completedDays).toEqual([1]);
    expect(s.totalXp).toBe(50);
  });

  it("advances currentDay past the completed day", () => {
    useProgressStore.getState().completeDay(3, 50);
    expect(useProgressStore.getState().currentDay).toBe(4);
  });
});

describe("useProgressStore.completeExercise", () => {
  it("awards XP once per exercise id", () => {
    useProgressStore.getState().completeExercise(1, "d1-q1", 25);
    useProgressStore.getState().completeExercise(1, "d1-q1", 25);
    const s = useProgressStore.getState();
    expect(s.completedExercises[1]).toEqual(["d1-q1"]);
    expect(s.totalXp).toBe(25);
  });
});

describe("useProgressStore.completeAssignment", () => {
  it("awards XP once per day", () => {
    useProgressStore.getState().completeAssignment(1, 100);
    useProgressStore.getState().completeAssignment(1, 100);
    const s = useProgressStore.getState();
    expect(s.completedAssignments).toEqual([1]);
    expect(s.totalXp).toBe(100);
  });
});

describe("usePythonStore is independently namespaced", () => {
  it("keeps python XP separate from the C store", () => {
    useProgressStore.getState().completeDay(1, 50);
    usePythonStore.getState().completeDay(1, 40);
    expect(useProgressStore.getState().totalXp).toBe(50);
    expect(usePythonStore.getState().totalXp).toBe(40);
  });
});
