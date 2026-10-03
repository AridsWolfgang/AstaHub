/**
 * Minimal knowledge-graph stub — pure, honest, no DB.
 *
 * Each ConceptNode anchors a teachable idea to the curriculum day where
 * it first appears. Prereqs and related edges are hand-curated from the
 * blueprint sources in src/lib/curriculum/{core,python,cpp,js,sql,bash}/core.ts
 * so the graph mirrors the real course order, not an invented one.
 *
 * Until a full graph store exists, this is the single source of truth for
 * concept -> day, prerequisites, and "what's next" browsing.
 */

import type { TrackKey } from "./types";

export interface ConceptNode {
  /** Stable id, e.g. "c:variables" or "python:functions". */
  id: string;
  label: string;
  track: TrackKey;
  /** Curriculum day where the concept is first taught (1-indexed). */
  day: number;
  /** Concept ids that should be learned before this one. */
  prereqs: string[];
  /** Concept ids that are siblings or natural next steps. */
  related: string[];
  summary?: string;
}

/**
 * Per-track concept graph. Keep entries sorted by day for predictable helpers.
 * Not every day has a node — only the load-bearing ideas are graphed.
 */
export const CONCEPT_GRAPH: Record<TrackKey, ConceptNode[]> = {
  c: [
    { id: "c:hello", label: "Hello World & compilation", track: "c", day: 1, prereqs: [], related: ["c:types"] },
    { id: "c:types", label: "Data types & sizeof", track: "c", day: 2, prereqs: ["c:hello"], related: ["c:variables"] },
    { id: "c:variables", label: "Variables & operators", track: "c", day: 3, prereqs: ["c:types"], related: ["c:pointers", "c:arrays"] },
    { id: "c:control-flow", label: "Conditionals & loops", track: "c", day: 4, prereqs: ["c:variables"], related: ["c:functions"] },
    { id: "c:functions", label: "Functions & scope", track: "c", day: 6, prereqs: ["c:control-flow"], related: ["c:arrays", "c:pointers"] },
    { id: "c:arrays", label: "Arrays", track: "c", day: 7, prereqs: ["c:variables", "c:functions"], related: ["c:pointers", "c:strings"] },
    { id: "c:strings", label: "Strings & string.h", track: "c", day: 8, prereqs: ["c:arrays"], related: ["c:pointers"] },
    { id: "c:pointers", label: "Pointers & addresses", track: "c", day: 9, prereqs: ["c:variables", "c:arrays"], related: ["c:pointer-arithmetic", "c:structs", "c:malloc"] },
    { id: "c:pointer-arithmetic", label: "Pointer arithmetic", track: "c", day: 10, prereqs: ["c:pointers"], related: ["c:malloc", "c:arrays"] },
    { id: "c:structs", label: "Structs", track: "c", day: 11, prereqs: ["c:pointers"], related: ["c:malloc", "c:enums"] },
    { id: "c:malloc", label: "Dynamic memory — malloc/free", track: "c", day: 13, prereqs: ["c:pointers", "c:pointer-arithmetic"], related: ["c:structs", "c:realloc", "c:function-pointers"] },
    { id: "c:realloc", label: "realloc & calloc", track: "c", day: 14, prereqs: ["c:malloc"], related: ["c:structs", "c:hash-table"] },
    { id: "c:function-pointers", label: "Function pointers", track: "c", day: 15, prereqs: ["c:functions", "c:pointers"], related: ["c:preprocessor"] },
    { id: "c:files", label: "File I/O", track: "c", day: 17, prereqs: ["c:malloc", "c:strings"], related: ["c:linked-lists"] },
    { id: "c:recursion", label: "Recursion", track: "c", day: 19, prereqs: ["c:functions"], related: ["c:linked-lists", "c:binary-search"] },
    { id: "c:linked-lists", label: "Linked lists", track: "c", day: 20, prereqs: ["c:structs", "c:malloc"], related: ["c:stack", "c:binary-trees"] },
    { id: "c:stack", label: "Stacks & queues", track: "c", day: 21, prereqs: ["c:linked-lists", "c:arrays"], related: ["c:hash-table"] },
    { id: "c:binary-search", label: "Binary search", track: "c", day: 23, prereqs: ["c:arrays", "c:recursion"], related: ["c:sorting"] },
    { id: "c:sorting", label: "Sorting algorithms", track: "c", day: 24, prereqs: ["c:binary-search", "c:arrays"], related: ["c:hash-table"] },
    { id: "c:hash-table", label: "Hash tables", track: "c", day: 32, prereqs: ["c:malloc", "c:arrays"], related: ["c:binary-trees"] },
    { id: "c:binary-trees", label: "Binary trees", track: "c", day: 33, prereqs: ["c:linked-lists", "c:recursion"], related: ["c:threads"] },
    { id: "c:memory-alignment", label: "Memory alignment & padding", track: "c", day: 31, prereqs: ["c:structs", "c:malloc"], related: ["c:hash-table"] },
    { id: "c:threads", label: "Threads & mutexes", track: "c", day: 42, prereqs: ["c:binary-trees", "c:malloc"], related: ["c:memory-pools"] },
    { id: "c:capstone", label: "Capstone systems project", track: "c", day: 100, prereqs: ["c:hash-table", "c:binary-trees", "c:threads"], related: [] },
  ],
  python: [
    { id: "python:hello", label: "Hello, Python & REPL", track: "python", day: 1, prereqs: [], related: ["python:variables"] },
    { id: "python:variables", label: "Variables & dynamic typing", track: "python", day: 2, prereqs: ["python:hello"], related: ["python:numbers", "python:strings"] },
    { id: "python:numbers", label: "Numbers & arithmetic", track: "python", day: 3, prereqs: ["python:variables"], related: ["python:booleans"] },
    { id: "python:strings", label: "Strings", track: "python", day: 4, prereqs: ["python:variables"], related: ["python:lists"] },
    { id: "python:booleans", label: "Booleans & comparison", track: "python", day: 5, prereqs: ["python:numbers"], related: ["python:conditionals"] },
    { id: "python:conditionals", label: "Conditionals — if/elif/else", track: "python", day: 7, prereqs: ["python:booleans"], related: ["python:loops"] },
    { id: "python:loops", label: "for & while loops", track: "python", day: 8, prereqs: ["python:conditionals"], related: ["python:lists", "python:functions"] },
    { id: "python:lists", label: "Lists", track: "python", day: 10, prereqs: ["python:loops", "python:strings"], related: ["python:dicts", "python:comprehensions"] },
    { id: "python:dicts", label: "Dictionaries", track: "python", day: 12, prereqs: ["python:lists"], related: ["python:sets", "python:comprehensions"] },
    { id: "python:comprehensions", label: "List comprehensions", track: "python", day: 14, prereqs: ["python:lists", "python:loops"], related: ["python:functions"] },
    { id: "python:functions", label: "Functions & parameters", track: "python", day: 15, prereqs: ["python:loops"], related: ["python:scope", "python:recursion"] },
    { id: "python:scope", label: "Scope & namespaces", track: "python", day: 16, prereqs: ["python:functions"], related: ["python:closures"] },
    { id: "python:exceptions", label: "Exceptions — try/except", track: "python", day: 21, prereqs: ["python:functions"], related: ["python:files"] },
    { id: "python:files", label: "File I/O", track: "python", day: 23, prereqs: ["python:exceptions", "python:strings"], related: ["python:csv-json"] },
    { id: "python:csv-json", label: "CSV & JSON", track: "python", day: 24, prereqs: ["python:files"], related: ["python:modules"] },
    { id: "python:modules", label: "Modules & imports", track: "python", day: 25, prereqs: ["python:functions"], related: ["python:classes"] },
    { id: "python:classes", label: "Classes & objects", track: "python", day: 32, prereqs: ["python:functions", "python:dicts"], related: ["python:inheritance", "python:generators"] },
    { id: "python:inheritance", label: "Inheritance & magic methods", track: "python", day: 33, prereqs: ["python:classes"], related: ["python:decorators"] },
    { id: "python:generators", label: "Generators & iterators", track: "python", day: 36, prereqs: ["python:classes", "python:loops"], related: ["python:decorators"] },
    { id: "python:decorators", label: "Decorators & closures", track: "python", day: 37, prereqs: ["python:functions", "python:scope"], related: ["python:capstone"] },
    { id: "python:capstone", label: "Capstone job service", track: "python", day: 100, prereqs: ["python:classes", "python:files", "python:modules"], related: [] },
  ],
  cpp: [
    { id: "cpp:hello", label: "Hello, C++ & iostream", track: "cpp", day: 1, prereqs: [], related: ["cpp:types"] },
    { id: "cpp:types", label: "Variables & fundamental types", track: "cpp", day: 2, prereqs: ["cpp:hello"], related: ["cpp:strings"] },
    { id: "cpp:strings", label: "std::string", track: "cpp", day: 5, prereqs: ["cpp:types"], related: ["cpp:conditionals"] },
    { id: "cpp:conditionals", label: "Conditionals & switch", track: "cpp", day: 7, prereqs: ["cpp:types"], related: ["cpp:loops"] },
    { id: "cpp:loops", label: "Loops & range-for", track: "cpp", day: 8, prereqs: ["cpp:conditionals"], related: ["cpp:functions"] },
    { id: "cpp:functions", label: "Functions & overloads", track: "cpp", day: 9, prereqs: ["cpp:loops"], related: ["cpp:references", "cpp:classes"] },
    { id: "cpp:references", label: "References", track: "cpp", day: 12, prereqs: ["cpp:functions"], related: ["cpp:pointers"] },
    { id: "cpp:pointers", label: "Pointers & nullptr", track: "cpp", day: 13, prereqs: ["cpp:references"], related: ["cpp:arrays", "cpp:smart-pointers"] },
    { id: "cpp:arrays", label: "Arrays & std::array", track: "cpp", day: 14, prereqs: ["cpp:pointers"], related: ["cpp:vector"] },
    { id: "cpp:vector", label: "std::vector", track: "cpp", day: 15, prereqs: ["cpp:arrays"], related: ["cpp:stl-containers"] },
    { id: "cpp:structs", label: "Structs & classes", track: "cpp", day: 17, prereqs: ["cpp:vector"], related: ["cpp:constructors"] },
    { id: "cpp:constructors", label: "Constructors & RAII", track: "cpp", day: 19, prereqs: ["cpp:structs"], related: ["cpp:inheritance"] },
    { id: "cpp:inheritance", label: "Inheritance & polymorphism", track: "cpp", day: 21, prereqs: ["cpp:constructors"], related: ["cpp:smart-pointers"] },
    { id: "cpp:smart-pointers", label: "Smart pointers", track: "cpp", day: 24, prereqs: ["cpp:pointers", "cpp:inheritance"], related: ["cpp:templates"] },
    { id: "cpp:templates", label: "Templates", track: "cpp", day: 25, prereqs: ["cpp:functions", "cpp:smart-pointers"], related: ["cpp:stl-algorithms"] },
    { id: "cpp:stl-containers", label: "STL containers", track: "cpp", day: 27, prereqs: ["cpp:vector", "cpp:templates"], related: ["cpp:stl-algorithms"] },
    { id: "cpp:stl-algorithms", label: "STL algorithms & lambdas", track: "cpp", day: 28, prereqs: ["cpp:stl-containers", "cpp:templates"], related: ["cpp:move-semantics"] },
    { id: "cpp:move-semantics", label: "Move semantics", track: "cpp", day: 32, prereqs: ["cpp:smart-pointers", "cpp:constructors"], related: ["cpp:threads"] },
    { id: "cpp:threads", label: "Threads & mutexes", track: "cpp", day: 36, prereqs: ["cpp:move-semantics"], related: ["cpp:capstone"] },
    { id: "cpp:capstone", label: "Capstone library manager", track: "cpp", day: 100, prereqs: ["cpp:stl-algorithms", "cpp:threads"], related: [] },
  ],
  js: [
    { id: "js:hello", label: "Hello, JavaScript", track: "js", day: 1, prereqs: [], related: ["js:variables"] },
    { id: "js:variables", label: "Variables — let/const", track: "js", day: 2, prereqs: ["js:hello"], related: ["js:numbers", "js:strings"] },
    { id: "js:strings", label: "Strings & templates", track: "js", day: 4, prereqs: ["js:variables"], related: ["js:arrays"] },
    { id: "js:arrays", label: "Arrays & methods", track: "js", day: 9, prereqs: ["js:strings", "js:loops"], related: ["js:objects"] },
    { id: "js:loops", label: "Loops — for/while/for...of", track: "js", day: 11, prereqs: ["js:variables"], related: ["js:arrays", "js:functions"] },
    { id: "js:functions", label: "Functions & arrows", track: "js", day: 12, prereqs: ["js:loops"], related: ["js:scope", "js:objects"] },
    { id: "js:scope", label: "Scope & closures", track: "js", day: 15, prereqs: ["js:functions"], related: ["js:objects", "js:classes"] },
    { id: "js:objects", label: "Objects & destructuring", track: "js", day: 16, prereqs: ["js:functions"], related: ["js:classes", "js:json"] },
    { id: "js:json", label: "JSON & serialization", track: "js", day: 19, prereqs: ["js:objects"], related: ["js:classes"] },
    { id: "js:classes", label: "Classes & inheritance", track: "js", day: 21, prereqs: ["js:objects", "js:scope"], related: ["js:errors"] },
    { id: "js:errors", label: "Error handling", track: "js", day: 24, prereqs: ["js:classes"], related: ["js:promises"] },
    { id: "js:promises", label: "Promises & async/await", track: "js", day: 28, prereqs: ["js:errors", "js:functions"], related: ["js:fetch"] },
    { id: "js:fetch", label: "fetch & modules", track: "js", day: 30, prereqs: ["js:promises"], related: ["js:typescript"] },
    { id: "js:typescript", label: "TypeScript — types & generics", track: "js", day: 34, prereqs: ["js:classes", "js:fetch"], related: ["js:capstone"] },
    { id: "js:capstone", label: "Capstone mini service", track: "js", day: 100, prereqs: ["js:promises", "js:typescript"], related: [] },
  ],
  sql: [
    { id: "sql:select", label: "SELECT basics", track: "sql", day: 2, prereqs: [], related: ["sql:filtering"] },
    { id: "sql:filtering", label: "Filtering — WHERE & LIKE", track: "sql", day: 3, prereqs: ["sql:select"], related: ["sql:ordering"] },
    { id: "sql:ordering", label: "ORDER BY & LIMIT", track: "sql", day: 4, prereqs: ["sql:filtering"], related: ["sql:aggregates"] },
    { id: "sql:aggregates", label: "Aggregates — COUNT/SUM", track: "sql", day: 5, prereqs: ["sql:ordering"], related: ["sql:group-by"] },
    { id: "sql:group-by", label: "GROUP BY & HAVING", track: "sql", day: 6, prereqs: ["sql:aggregates"], related: ["sql:schema"] },
    { id: "sql:schema", label: "Schema — CREATE TABLE & constraints", track: "sql", day: 8, prereqs: ["sql:group-by"], related: ["sql:keys"] },
    { id: "sql:keys", label: "Keys — primary & foreign", track: "sql", day: 12, prereqs: ["sql:schema"], related: ["sql:joins"] },
    { id: "sql:joins", label: "JOINs — inner/left/cross", track: "sql", day: 15, prereqs: ["sql:keys"], related: ["sql:subqueries"] },
    { id: "sql:subqueries", label: "Subqueries & EXISTS", track: "sql", day: 19, prereqs: ["sql:joins"], related: ["sql:window-functions"] },
    { id: "sql:window-functions", label: "Window functions", track: "sql", day: 36, prereqs: ["sql:subqueries", "sql:group-by"], related: ["sql:ctes"] },
    { id: "sql:ctes", label: "CTEs", track: "sql", day: 37, prereqs: ["sql:window-functions"], related: ["sql:tuning"] },
    { id: "sql:tuning", label: "Indexes & query tuning", track: "sql", day: 28, prereqs: ["sql:joins"], related: ["sql:normalization"] },
    { id: "sql:normalization", label: "Normalization", track: "sql", day: 30, prereqs: ["sql:schema", "sql:keys"], related: ["sql:capstone"] },
    { id: "sql:capstone", label: "Capstone market database", track: "sql", day: 100, prereqs: ["sql:window-functions", "sql:normalization"], related: [] },
  ],
  bash: [
    { id: "bash:shell", label: "The shell & echo", track: "bash", day: 1, prereqs: [], related: ["bash:variables"] },
    { id: "bash:variables", label: "Variables & parameters", track: "bash", day: 2, prereqs: ["bash:shell"], related: ["bash:arithmetic"] },
    { id: "bash:arithmetic", label: "Arithmetic & redirection", track: "bash", day: 4, prereqs: ["bash:variables"], related: ["bash:pipes"] },
    { id: "bash:pipes", label: "Pipes & filters", track: "bash", day: 6, prereqs: ["bash:arithmetic"], related: ["bash:conditionals"] },
    { id: "bash:conditionals", label: "Conditionals & tests", track: "bash", day: 7, prereqs: ["bash:pipes"], related: ["bash:loops"] },
    { id: "bash:loops", label: "Loops", track: "bash", day: 9, prereqs: ["bash:conditionals"], related: ["bash:functions"] },
    { id: "bash:functions", label: "Functions & exit codes", track: "bash", day: 10, prereqs: ["bash:loops"], related: ["bash:text-tools"] },
    { id: "bash:text-tools", label: "Text tools — grep/sed/awk", track: "bash", day: 11, prereqs: ["bash:functions", "bash:pipes"], related: ["bash:arrays"] },
    { id: "bash:arrays", label: "Arrays & strings", track: "bash", day: 17, prereqs: ["bash:text-tools"], related: ["bash:git"] },
    { id: "bash:git", label: "Git — commits & branches", track: "bash", day: 23, prereqs: ["bash:arrays", "bash:functions"], related: ["bash:git-remote"] },
    { id: "bash:git-remote", label: "Git remotes & history", track: "bash", day: 25, prereqs: ["bash:git"], related: ["bash:pipelines"] },
    { id: "bash:pipelines", label: "Text pipelines", track: "bash", day: 29, prereqs: ["bash:text-tools"], related: ["bash:scripting"] },
    { id: "bash:scripting", label: "Scripting best practices", track: "bash", day: 34, prereqs: ["bash:loops", "bash:functions"], related: ["bash:capstone"] },
    { id: "bash:capstone", label: "Capstone ship-it script", track: "bash", day: 100, prereqs: ["bash:git-remote", "bash:scripting"], related: [] },
  ],
};

function graphFor(track: string): ConceptNode[] {
  return (CONCEPT_GRAPH as Record<string, ConceptNode[]>)[track] ?? [];
}

/**
 * The concept introduced on a specific curriculum day, if any.
 * Not every day introduces a graph-level concept — returns undefined for filler days.
 */
export function conceptForDay(track: string, day: number): ConceptNode | undefined {
  return graphFor(track).find((n) => n.day === day);
}

/**
 * Prerequisite concepts for the concept taught on this day.
 * Returns [] when the day has no graph node or the node has no prereqs.
 */
export function prereqsForDay(track: string, day: number): ConceptNode[] {
  const node = conceptForDay(track, day);
  if (!node) return [];
  const g = graphFor(track);
  const byId = new Map(g.map((n) => [n.id, n]));
  return node.prereqs.map((id) => byId.get(id)).filter((n): n is ConceptNode => Boolean(n));
}

/**
 * Related / sibling concepts for the concept taught on this day.
 */
export function relatedConcepts(track: string, day: number): ConceptNode[] {
  const node = conceptForDay(track, day);
  if (!node) return [];
  const g = graphFor(track);
  const byId = new Map(g.map((n) => [n.id, n]));
  return node.related.map((id) => byId.get(id)).filter((n): n is ConceptNode => Boolean(n));
}
