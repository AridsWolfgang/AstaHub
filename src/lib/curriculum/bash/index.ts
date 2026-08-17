import type { Lesson } from "../../types";

export const BASH_TOTAL_DAYS = 40;

let corePromise: Promise<typeof import("./core")> | null = null;
function getCore(): Promise<typeof import("./core")> {
  if (!corePromise) corePromise = import("./core");
  return corePromise;
}

const cache = new Map<number, Promise<Lesson>>();

export async function getBashLesson(day: number): Promise<Lesson | undefined> {
  if (day < 1 || day > BASH_TOTAL_DAYS) return undefined;
  let p = cache.get(day);
  if (!p) {
    p = (async () => {
      const core = await getCore();
      return core.buildBashLesson(day);
    })();
    cache.set(day, p);
  }
  return p;
}

export async function getBashLessons(): Promise<Lesson[]> {
  const days = Array.from({ length: BASH_TOTAL_DAYS }, (_, i) => i + 1);
  return Promise.all(days.map((d) => getBashLesson(d))) as Promise<Lesson[]>;
}
export async function getBashLessonRange(from: number, to: number): Promise<Lesson[]> {
  const lo = Math.max(1, from);
  const hi = Math.min(BASH_TOTAL_DAYS, to);
  const days = Array.from({ length: Math.max(0, hi - lo + 1) }, (_, i) => lo + i);
  const results = await Promise.all(days.map((d) => getBashLesson(d)));
  return results.filter((l): l is Lesson => l !== undefined);
}