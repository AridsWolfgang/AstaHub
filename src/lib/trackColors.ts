/**
 * Track identity colors — the vibrant system.
 *
 * Each track owns one hue, defined as CSS vars in globals.css
 * (`--track-<key>`) with dark + light values, and mapped to Tailwind
 * tokens (`text-track-python`, `bg-track-js/10`, …) in tailwind.config.ts.
 *
 * Always go through trackColorKey() — track slugs and color keys differ
 * in two cases (javascript -> js, toolkit -> bash). Class strings must
 * stay full literals (Tailwind JIT can't see interpolated names).
 */

export type TrackColorKey =
  | "c"
  | "assembly"
  | "python"
  | "cpp"
  | "js"
  | "sql"
  | "bash";

const SLUG_TO_KEY: Record<string, TrackColorKey> = {
  c: "c",
  asm: "assembly",
  assembly: "assembly",
  python: "python",
  cpp: "cpp",
  javascript: "js",
  js: "js",
  sql: "sql",
  toolkit: "bash",
  bash: "bash",
};

export function trackColorKey(slug: string): TrackColorKey {
  return SLUG_TO_KEY[slug] ?? "c";
}

/** Full-literal Tailwind classes per key — never interpolate. */
export const TRACK_BADGE: Record<TrackColorKey, string> = {
  c: "bg-track-c/10 text-track-c border-track-c/25",
  assembly: "bg-track-assembly/10 text-track-assembly border-track-assembly/25",
  python: "bg-track-python/10 text-track-python border-track-python/25",
  cpp: "bg-track-cpp/10 text-track-cpp border-track-cpp/25",
  js: "bg-track-js/10 text-track-js border-track-js/25",
  sql: "bg-track-sql/10 text-track-sql border-track-sql/25",
  bash: "bg-track-bash/10 text-track-bash border-track-bash/25",
};

/** Solid selected-state per key — full literals. */
export const TRACK_SELECTED: Record<TrackColorKey, string> = {
  c: "bg-track-c text-black",
  assembly: "bg-track-assembly text-black",
  python: "bg-track-python text-black",
  cpp: "bg-track-cpp text-black",
  js: "bg-track-js text-black",
  sql: "bg-track-sql text-black",
  bash: "bg-track-bash text-black",
};

/** Plain hue text per key — full literals. */
export const TRACK_TEXT: Record<TrackColorKey, string> = {
  c: "text-track-c",
  assembly: "text-track-assembly",
  python: "text-track-python",
  cpp: "text-track-cpp",
  js: "text-track-js",
  sql: "text-track-sql",
  bash: "text-track-bash",
};

/**
 * Group-hover hue text per key — full literals. The parent must carry
 * `group`. Used so hovering an unselected row tints its title instead of
 * flattening the whole row to white.
 */
export const TRACK_TEXT_GROUP_HOVER: Record<TrackColorKey, string> = {
  c: "group-hover:text-track-c",
  assembly: "group-hover:text-track-assembly",
  python: "group-hover:text-track-python",
  cpp: "group-hover:text-track-cpp",
  js: "group-hover:text-track-js",
  sql: "group-hover:text-track-sql",
  bash: "group-hover:text-track-bash",
};

/** Small solid dot per key — full literals. */
export const TRACK_DOT: Record<TrackColorKey, string> = {
  c: "bg-track-c",
  assembly: "bg-track-assembly",
  python: "bg-track-python",
  cpp: "bg-track-cpp",
  js: "bg-track-js",
  sql: "bg-track-sql",
  bash: "bg-track-bash",
};
