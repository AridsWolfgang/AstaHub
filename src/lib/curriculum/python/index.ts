import type { Lesson } from "../../types";

export const PYTHON_TOTAL_DAYS = 40;

let corePromise: Promise<typeof import("./core")> | null = null;
function getCore(): Promise<typeof import("./core")> {
  if (!corePromise) corePromise = import("./core");
  return corePromise;
}

const cache = new Map<number, Promise<Lesson>>();

export async function getPythonLesson(day: number): Promise<Lesson | undefined> {
  if (day < 1 || day > PYTHON_TOTAL_DAYS) return undefined;
  let p = cache.get(day);
  if (!p) {
    p = (async () => {
      const core = await getCore();
      return core.buildPythonLesson(day);
    })();
    cache.set(day, p);
  }
  return p;
}

export async function getPythonLessons(): Promise<Lesson[]> {
  const days = Array.from({ length: PYTHON_TOTAL_DAYS }, (_, i) => i + 1);
  return Promise.all(days.map((d) => getPythonLesson(d))) as Promise<Lesson[]>;
}
export async function getPythonLessonRange(from: number, to: number): Promise<Lesson[]> {
  const lo = Math.max(1, from);
  const hi = Math.min(PYTHON_TOTAL_DAYS, to);
  const days = Array.from({ length: Math.max(0, hi - lo + 1) }, (_, i) => lo + i);
  const results = await Promise.all(days.map((d) => getPythonLesson(d)));
  return results.filter((l): l is Lesson => l !== undefined);
}
