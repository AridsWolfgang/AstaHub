import type { TrackKey } from "./types";

export interface SkillNode {
  id: string;
  label: string;
  description: string;
  /** Minimal day that represents this skill being taught. */
  day: number;
  track: TrackKey;
  /** Prerequisite node ids — honest chain, no fake mastery. */
  prereqs: string[];
}

export type SkillNodeWithStatus = SkillNode & {
  unlocked: boolean;
  /** 0..1 fraction of prerequisite + required day completion */
  progress: number;
};

export interface SkillProgressInput {
  completedDays: number[];
}

// Minimal per-track trees — each node maps to a real day in the curriculum.
// No invented mastery: a node is unlocked only when its day (or any later day
// in its tier) has been completed.

const C_TREE: SkillNode[] = [
  { id: "c-foundations", label: "Foundations", description: "Variables, types, and control flow (Days 1-10)", day: 1, track: "c", prereqs: [] },
  { id: "c-pointers", label: "Pointers & Arrays", description: "Pointer arithmetic, arrays, and strings (Days 10-20)", day: 10, track: "c", prereqs: ["c-foundations"] },
  { id: "c-memory", label: "Memory", description: "Dynamic memory and the heap (Days 13-20)", day: 13, track: "c", prereqs: ["c-pointers"] },
  { id: "c-structures", label: "Structures", description: "Structs, files, and the preprocessor (Days 21-40)", day: 21, track: "c", prereqs: ["c-memory"] },
  { id: "c-memory-adv", label: "Advanced Memory", description: "File I/O and low-level C (Days 41-50)", day: 41, track: "c", prereqs: ["c-structures"] },
  { id: "c-asm-intro", label: "Assembly Intro", description: "Registers and instructions (Days 51-60)", day: 51, track: "c", prereqs: ["c-memory-adv"] },
  { id: "c-asm-calling", label: "Calling Conventions", description: "Stack, calls, and SysV ABI (Days 61-75)", day: 61, track: "c", prereqs: ["c-asm-intro"] },
  { id: "c-optimization", label: "Optimization & Security", description: "Optimization, security, and bare metal (Days 76-100)", day: 81, track: "c", prereqs: ["c-asm-calling"] },
];

const PYTHON_TREE: SkillNode[] = [
  { id: "py-basics", label: "Basics", description: "Syntax, variables, and control flow (Days 1-7)", day: 1, track: "python", prereqs: [] },
  { id: "py-data", label: "Data Structures", description: "Lists, dicts, and comprehensions (Days 8-14)", day: 10, track: "python", prereqs: ["py-basics"] },
  { id: "py-functions", label: "Functions", description: "Functions, scope, and modules (Days 15-20)", day: 15, track: "python", prereqs: ["py-data"] },
  { id: "py-errors", label: "Error Handling", description: "Exceptions and file I/O (Days 21-27)", day: 21, track: "python", prereqs: ["py-functions"] },
  { id: "py-oop", label: "OOP & Advanced", description: "Classes, decorators, and generators (Days 28-40)", day: 34, track: "python", prereqs: ["py-errors"] },
];

const CPP_TREE: SkillNode[] = [
  { id: "cpp-basics", label: "Basics", description: "Syntax, types, and I/O (Days 1-7)", day: 1, track: "cpp", prereqs: [] },
  { id: "cpp-oop", label: "Objects", description: "Functions, classes, and memory (Days 8-21)", day: 10, track: "cpp", prereqs: ["cpp-basics"] },
  { id: "cpp-styles", label: "Idioms", description: "Templates, STL, and idioms (Days 22-30)", day: 21, track: "cpp", prereqs: ["cpp-oop"] },
  { id: "cpp-modern", label: "Modern C++", description: "Smart pointers and move semantics (Days 31-40)", day: 30, track: "cpp", prereqs: ["cpp-styles"] },
];

const JS_TREE: SkillNode[] = [
  { id: "js-basics", label: "Fundamentals", description: "Variables, types, and control flow (Days 1-7)", day: 1, track: "js", prereqs: [] },
  { id: "js-data", label: "Data & Functions", description: "Arrays, functions, and objects (Days 8-15)", day: 10, track: "js", prereqs: ["js-basics"] },
  { id: "js-async", label: "Async", description: "Promises, async/await, and events (Days 16-30)", day: 15, track: "js", prereqs: ["js-data"] },
  { id: "js-ts", label: "TypeScript & Apps", description: "TypeScript and full-stack patterns (Days 31-40)", day: 28, track: "js", prereqs: ["js-async"] },
];

const RUST_TREE: SkillNode[] = [
  { id: "rust-basics", label: "Basics", description: "Syntax and ownership intro (Days 1-7)", day: 1, track: "rust", prereqs: [] },
  { id: "rust-ownership", label: "Ownership", description: "Ownership, borrowing, lifetimes (Days 9-15)", day: 9, track: "rust", prereqs: ["rust-basics"] },
  { id: "rust-types", label: "Types & Traits", description: "Structs, enums, traits (Days 12-21)", day: 16, track: "rust", prereqs: ["rust-ownership"] },
  { id: "rust-advanced", label: "Advanced", description: "Iterators, threads, and async (Days 22-40)", day: 23, track: "rust", prereqs: ["rust-types"] },
];

const SQL_TREE: SkillNode[] = [
  { id: "sql-basics", label: "Querying", description: "SELECT, filtering, and sorting (Days 1-7)", day: 1, track: "sql", prereqs: [] },
  { id: "sql-modeling", label: "Modeling", description: "Schemas, constraints, and joins (Days 8-20)", day: 13, track: "sql", prereqs: ["sql-basics"] },
  { id: "sql-ops", label: "Operations", description: "Indexes, transactions, and tuning (Days 21-40)", day: 27, track: "sql", prereqs: ["sql-modeling"] },
];

const BASH_TREE: SkillNode[] = [
  { id: "bash-basics", label: "Shell Basics", description: "Echo, navigation, and redirection (Days 1-7)", day: 1, track: "bash", prereqs: [] },
  { id: "bash-text", label: "Text Processing", description: "Pipes, grep, and awk (Days 6-20)", day: 6, track: "bash", prereqs: ["bash-basics"] },
  { id: "bash-git", label: "Git & Automation", description: "Git, scripting, and deploys (Days 21-40)", day: 23, track: "bash", prereqs: ["bash-text"] },
];

export const SKILL_TREES: Record<TrackKey, SkillNode[]> = {
  c: C_TREE,
  python: PYTHON_TREE,
  cpp: CPP_TREE,
  js: JS_TREE,
  rust: RUST_TREE,
  sql: SQL_TREE,
  bash: BASH_TREE,
};

function isNodeUnlocked(node: SkillNode, completedDays: number[], lookup: Map<string, boolean>): boolean {
  // Honest rule: node is unlocked when its representative day is reached,
  // and all prereqs are unlocked. "Reached" = any completed day >= node.day.
  const reached = completedDays.some((d) => d >= node.day);
  if (!reached) return false;
  for (const pre of node.prereqs) {
    if (!lookup.get(pre)) return false;
  }
  return true;
}

/**
 * Map completedDays to unlocked skills for a given track.
 * Supports both call styles:
 *   skillProgress("c", { completedDays: [...] })
 *   skillProgress({ track: "c", completedDays: [...] })
 */
export function skillProgress(
  trackOrProgress: TrackKey | (SkillProgressInput & { track: TrackKey }),
  maybeProgress?: SkillProgressInput
): SkillNodeWithStatus[] {
  let track: TrackKey;
  let progress: SkillProgressInput;
  if (typeof trackOrProgress === "string") {
    track = trackOrProgress;
    progress = maybeProgress ?? { completedDays: [] };
  } else {
    track = trackOrProgress.track;
    progress = trackOrProgress;
  }
  const nodes = SKILL_TREES[track] ?? [];
  const completedDays = progress.completedDays ?? [];
  const unlockedMap = new Map<string, boolean>();
  const result: SkillNodeWithStatus[] = [];
  for (const node of nodes) {
    const unlocked = isNodeUnlocked(node, completedDays, unlockedMap);
    unlockedMap.set(node.id, unlocked);
    result.push({
      ...node,
      unlocked,
      progress: unlocked ? 1 : 0,
    });
  }
  return result;
}
