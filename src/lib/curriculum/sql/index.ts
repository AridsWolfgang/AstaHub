import type { Lesson } from "../../types";

export const SQL_TOTAL_DAYS = 40;

let corePromise: Promise<typeof import("./core")> | null = null;
function getCore(): Promise<typeof import("./core")> {
  if (!corePromise) corePromise = import("./core");
  return corePromise;
}

const cache = new Map<number, Promise<Lesson>>();

export async function getSqlLesson(day: number): Promise<Lesson | undefined> {
  if (day < 1 || day > SQL_TOTAL_DAYS) return undefined;
  let p = cache.get(day);
  if (!p) {
    p = (async () => {
      const core = await getCore();
      return core.buildSqlLesson(day);
    })();
    cache.set(day, p);
  }
  return p;
}

export async function getSqlLessons(): Promise<Lesson[]> {
  const days = Array.from({ length: SQL_TOTAL_DAYS }, (_, i) => i + 1);
  return Promise.all(days.map((d) => getSqlLesson(d))) as Promise<Lesson[]>;
}
export async function getSqlLessonRange(from: number, to: number): Promise<Lesson[]> {
  const lo = Math.max(1, from);
  const hi = Math.min(SQL_TOTAL_DAYS, to);
  const days = Array.from({ length: Math.max(0, hi - lo + 1) }, (_, i) => lo + i);
  const results = await Promise.all(days.map((d) => getSqlLesson(d)));
  return results.filter((l): l is Lesson => l !== undefined);
}