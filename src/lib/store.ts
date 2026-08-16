import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProficiencyLevel, TrackKey, UserProgress } from "./types";
import { levelFromXp, getLevelForDay } from "./types";

export interface ProgressState extends UserProgress {
  completeDay: (day: number, xp: number) => void;
  completeExercise: (day: number, exerciseId: string, xp: number) => void;
  completeAssignment: (day: number, xp: number) => void;
  setCurrentDay: (day: number) => void;
  addNote: (day: number, note: string) => void;
  updateStreak: () => void;
  resetProgress: () => void;
  getDayProgress: (
    day: number,
    totalExercises?: number
  ) => {
    theoryDone: boolean;
    exercisesDone: number;
    totalExercises: number;
    assignmentDone: boolean;
    percent: number;
  };
}

const initialState: UserProgress = {
  currentDay: 1,
  completedDays: [],
  completedExercises: {},
  completedAssignments: [],
  totalXp: 0,
  streak: 0,
  lastActiveDate: null,
  level: "initiate",
  notes: {},
};

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

function calcStreak(lastDate: string | null, currentStreak: number): number {
  if (!lastDate) return 1;
  const last = new Date(lastDate);
  const today = new Date(todayString());
  const diff = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return currentStreak;
  if (diff === 1) return currentStreak + 1;
  return 1;
}

const syncTimers: Partial<Record<TrackKey, ReturnType<typeof setTimeout>>> = {};

function queueSync(
  track: TrackKey,
  getState: () => UserProgress
): void {
  if (typeof window === "undefined") return;
  if (!window.localStorage.getItem("asta-100days-synced")) return;
  if (syncTimers[track]) clearTimeout(syncTimers[track]);
  syncTimers[track] = setTimeout(() => {
    const {
      currentDay, totalXp, level, streak, lastActiveDate,
      completedDays, completedExercises, completedAssignments, notes,
    } = getState();
    fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        track,
        currentDay, totalXp, level, streak, lastActiveDate,
        completedDays, completedExercises, completedAssignments, notes,
      }),
    }).catch(() => {
      // Silent: auth token may have expired; progress stays local.
    });
  }, 800);
}

interface StoreFactoryOptions {
  /** Persist key for zustand's localStorage. */
  persistKey: string;
  /** Sync to the server via /api/progress (only meaningful for the primary track). */
  sync?: boolean;
}

function createProgressStore(track: TrackKey, { persistKey, sync = true }: StoreFactoryOptions) {
  return create<ProgressState>()(
    persist(
      (set, get) => ({
        ...initialState,

        completeDay: (day, xp) =>
          set((state) => {
            const alreadyDone = state.completedDays.includes(day);
            const completedDays = alreadyDone
              ? state.completedDays
              : [...state.completedDays, day];
            const totalXp = state.totalXp + (alreadyDone ? 0 : xp);
            const next = {
              completedDays,
              totalXp,
              level: levelFromXp(totalXp),
              currentDay: Math.max(state.currentDay, day + 1),
              streak: calcStreak(state.lastActiveDate, state.streak),
              lastActiveDate: todayString(),
            };
            if (sync) queueSync(track, get);
            return next;
          }),

        completeExercise: (day, exerciseId, xp) =>
          set((state) => {
            const dayExercises = state.completedExercises[day] ?? [];
            if (dayExercises.includes(exerciseId)) return state;
            const totalXp = state.totalXp + xp;
            const next = {
              completedExercises: {
                ...state.completedExercises,
                [day]: [...dayExercises, exerciseId],
              },
              totalXp,
              level: levelFromXp(totalXp),
              streak: calcStreak(state.lastActiveDate, state.streak),
              lastActiveDate: todayString(),
            };
            if (sync) queueSync(track, get);
            return next;
          }),

        completeAssignment: (day, xp) =>
          set((state) => {
            if (state.completedAssignments.includes(day)) return state;
            const totalXp = state.totalXp + xp;
            const next = {
              completedAssignments: [...state.completedAssignments, day],
              totalXp,
              level: levelFromXp(totalXp),
              streak: calcStreak(state.lastActiveDate, state.streak),
              lastActiveDate: todayString(),
            };
            if (sync) queueSync(track, get);
            return next;
          }),

        setCurrentDay: (day) => set({ currentDay: day }),

        addNote: (day, note) =>
          set((state) => {
            const next = { notes: { ...state.notes, [day]: note } };
            if (sync) queueSync(track, get);
            return next;
          }),

        updateStreak: () =>
          set((state) => {
            const next = {
              streak: calcStreak(state.lastActiveDate, state.streak),
              lastActiveDate: todayString(),
            };
            if (sync) queueSync(track, get);
            return next;
          }),

        resetProgress: () => set(initialState),

        getDayProgress: (day, totalExercises = 3) => {
          const state = get();
          const exercisesDone = (state.completedExercises[day] ?? []).length;
          const theoryDone = state.completedDays.includes(day);
          const assignmentDone = state.completedAssignments.includes(day);
          const parts = [
            theoryDone ? 1 : 0,
            Math.min(exercisesDone / totalExercises, 1),
            assignmentDone ? 1 : 0,
          ];
          const percent = Math.round(((parts[0] + parts[1] + parts[2]) / 3) * 100);
          return { theoryDone, exercisesDone, totalExercises, assignmentDone, percent };
        },
      }),
      { name: persistKey }
    )
  );
}

export const useProgressStore = createProgressStore("c", { persistKey: "asta-100days-progress" });
export const usePythonStore = createProgressStore("python", { persistKey: "asta-python-progress", sync: true });
export const useCppStore = createProgressStore("cpp", { persistKey: "asta-cpp-progress", sync: true });

export function markSynced(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("asta-100days-synced", "1");
}

export function markUnsynced(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("asta-100days-synced");
}

function mapTrackProgress(row: {
  currentDay: number;
  totalXp: number;
  level: string;
  streak: number;
  lastActiveDate: string | null;
  completedDays: number[];
  completedExercises: Record<string, string[]>;
  completedAssignments: number[];
  notes: Record<string, string>;
}): UserProgress {
  return {
    currentDay: row.currentDay ?? 1,
    totalXp: row.totalXp ?? 0,
    level: (row.level as ProficiencyLevel) ?? "initiate",
    streak: row.streak ?? 0,
    lastActiveDate: row.lastActiveDate ?? null,
    completedDays: row.completedDays ?? [],
    completedExercises: row.completedExercises ?? {},
    completedAssignments: row.completedAssignments ?? [],
    notes: row.notes ?? {},
  };
}

export async function hydrateFromServer(): Promise<boolean> {
  try {
    const res = await fetch("/api/me", { cache: "no-store" });
    if (!res.ok) {
      markUnsynced();
      return false;
    }
    const { user } = await res.json();
    if (!user) {
      markUnsynced();
      return false;
    }
    useProgressStore.setState({
      currentDay: user.currentDay ?? 1,
      totalXp: user.totalXp ?? 0,
      level: user.level ?? "initiate",
      streak: user.streak ?? 0,
      lastActiveDate: user.lastActiveDate ?? null,
      completedDays: user.completedDays ?? [],
      completedExercises: user.completedExercises ?? {},
      completedAssignments: user.completedAssignments ?? [],
      notes: user.notes ?? {},
    });
    const tracks = (user.trackProgress ?? []) as Array<{ track: string } & Parameters<typeof mapTrackProgress>[0]>;
    for (const row of tracks) {
      if (row.track === "python") usePythonStore.setState(mapTrackProgress(row));
      else if (row.track === "cpp") useCppStore.setState(mapTrackProgress(row));
    }
    markSynced();
    return true;
  } catch {
    markUnsynced();
    return false;
  }
}

export function isDayUnlocked(day: number, completedDays: number[]): boolean {
  if (day === 1) return true;
  return completedDays.includes(day - 1) || day <= Math.max(...completedDays, 0) + 1;
}

export function getOverallProgress(completedDays: number[], totalDays = 100): number {
  return Math.round((completedDays.length / Math.max(totalDays, 1)) * 100);
}
