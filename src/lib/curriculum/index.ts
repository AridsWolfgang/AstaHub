import type { Lesson, TrackKey } from "../types";

export const TOTAL_DAYS = 100;
export const TOTAL_TRACKS: Record<TrackKey, number> = { c: 100, python: 40, cpp: 40 };

const loaders: Record<number, () => Promise<{ default: Partial<Lesson> }>> = {
  1: () => import("./days/day-1"),
  2: () => import("./days/day-2"),
  3: () => import("./days/day-3"),
  4: () => import("./days/day-4"),
  5: () => import("./days/day-5"),
  6: () => import("./days/day-6"),
  7: () => import("./days/day-7"),
  8: () => import("./days/day-8"),
  9: () => import("./days/day-9"),
  10: () => import("./days/day-10"),
  11: () => import("./days/day-11"),
  12: () => import("./days/day-12"),
  13: () => import("./days/day-13"),
  14: () => import("./days/day-14"),
  15: () => import("./days/day-15"),
  16: () => import("./days/day-16"),
  17: () => import("./days/day-17"),
  18: () => import("./days/day-18"),
  19: () => import("./days/day-19"),
  20: () => import("./days/day-20"),
  21: () => import("./days/day-21"),
  22: () => import("./days/day-22"),
  23: () => import("./days/day-23"),
  24: () => import("./days/day-24"),
  25: () => import("./days/day-25"),
  26: () => import("./days/day-26"),
  27: () => import("./days/day-27"),
  28: () => import("./days/day-28"),
  29: () => import("./days/day-29"),
  30: () => import("./days/day-30"),
  31: () => import("./days/day-31"),
  32: () => import("./days/day-32"),
  33: () => import("./days/day-33"),
  34: () => import("./days/day-34"),
  35: () => import("./days/day-35"),
  36: () => import("./days/day-36"),
  37: () => import("./days/day-37"),
  38: () => import("./days/day-38"),
  39: () => import("./days/day-39"),
  40: () => import("./days/day-40"),
  41: () => import("./days/day-41"),
  42: () => import("./days/day-42"),
  43: () => import("./days/day-43"),
  44: () => import("./days/day-44"),
  45: () => import("./days/day-45"),
  46: () => import("./days/day-46"),
  47: () => import("./days/day-47"),
  48: () => import("./days/day-48"),
  49: () => import("./days/day-49"),
  50: () => import("./days/day-50"),
  51: () => import("./days/day-51"),
  52: () => import("./days/day-52"),
  53: () => import("./days/day-53"),
  54: () => import("./days/day-54"),
  55: () => import("./days/day-55"),
  56: () => import("./days/day-56"),
  57: () => import("./days/day-57"),
  58: () => import("./days/day-58"),
  59: () => import("./days/day-59"),
  60: () => import("./days/day-60"),
  61: () => import("./days/day-61"),
  62: () => import("./days/day-62"),
  63: () => import("./days/day-63"),
  64: () => import("./days/day-64"),
  65: () => import("./days/day-65"),
  66: () => import("./days/day-66"),
  67: () => import("./days/day-67"),
  68: () => import("./days/day-68"),
  69: () => import("./days/day-69"),
  70: () => import("./days/day-70"),
  71: () => import("./days/day-71"),
  72: () => import("./days/day-72"),
  73: () => import("./days/day-73"),
  74: () => import("./days/day-74"),
  75: () => import("./days/day-75"),
  76: () => import("./days/day-76"),
  77: () => import("./days/day-77"),
  78: () => import("./days/day-78"),
  79: () => import("./days/day-79"),
  80: () => import("./days/day-80"),
  81: () => import("./days/day-81"),
  82: () => import("./days/day-82"),
  83: () => import("./days/day-83"),
  84: () => import("./days/day-84"),
  85: () => import("./days/day-85"),
  86: () => import("./days/day-86"),
  87: () => import("./days/day-87"),
  88: () => import("./days/day-88"),
  89: () => import("./days/day-89"),
  90: () => import("./days/day-90"),
  91: () => import("./days/day-91"),
  92: () => import("./days/day-92"),
  93: () => import("./days/day-93"),
  94: () => import("./days/day-94"),
  95: () => import("./days/day-95"),
  96: () => import("./days/day-96"),
  97: () => import("./days/day-97"),
  98: () => import("./days/day-98"),
  99: () => import("./days/day-99"),
  100: () => import("./days/day-100"),
};

const cache = new Map<number, Promise<Lesson | undefined>>();

let corePromise: Promise<typeof import("./core")> | null = null;
function getCore(): Promise<typeof import("./core")> {
  if (!corePromise) corePromise = import("./core");
  return corePromise;
}

export function getLesson(day: number): Promise<Lesson | undefined> {
  if (!loaders[day]) return Promise.resolve(undefined);
  let p = cache.get(day);
  if (!p) {
    p = (async () => {
      const [dayMod, core] = await Promise.all([loaders[day](), getCore()]);
      return core.buildLesson(day, dayMod.default);
    })();
    cache.set(day, p);
  }
  return p;
}

export async function getLessons(): Promise<Lesson[]> {
  const days = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);
  return Promise.all(days.map((d) => getLesson(d))) as Promise<Lesson[]>;
}

export async function getLessonRange(from: number, to: number): Promise<Lesson[]> {
  const lo = Math.max(1, from);
  const hi = Math.min(TOTAL_DAYS, to);
  const days = Array.from({ length: Math.max(0, hi - lo + 1) }, (_, i) => lo + i);
  const results = await Promise.all(days.map((d) => getLesson(d)));
  return results.filter((l): l is Lesson => l !== undefined);
}

/* ─── Track-aware lookups (C/ASM is the legacy "c" track) ─── */

export async function getTrackLesson(track: TrackKey, day: number): Promise<Lesson | undefined> {
  if (track === "python") {
    const py = await import("./python");
    return py.getPythonLesson(day);
  }
  if (track === "cpp") {
    const cpp = await import("./cpp");
    return cpp.getCppLesson(day);
  }
  return getLesson(day);
}

export async function getTrackLessons(track: TrackKey): Promise<Lesson[]> {
  if (track === "python") {
    const py = await import("./python");
    return py.getPythonLessons();
  }
  if (track === "cpp") {
    const cpp = await import("./cpp");
    return cpp.getCppLessons();
  }
  return getLessons();
}

export async function getTrackTotalDays(track: TrackKey): Promise<number> {
  if (track === "python") {
    const py = await import("./python");
    return py.PYTHON_TOTAL_DAYS;
  }
  if (track === "cpp") {
    const cpp = await import("./cpp");
    return cpp.CPP_TOTAL_DAYS;
  }
  return TOTAL_DAYS;
}
