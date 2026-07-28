import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProficiencyLevel, UserProgress } from "./types";
import { levelFromXp, getLevelForDay } from "./types";

interface ProgressState extends UserProgress {
  completeDay: (day: number, xp: number) => void;
  completeExercise: (day: number, exerciseId: string, xp: number) => void;
  completeAssignment: (day: number, xp: number) => void;
  setCurrentDay: (day: number) => void;
  addNote: (day: number, note: string) => void;
  updateStreak: () => void;
  resetProgress: () => void;
  getDayProgress: (day: number) => {
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

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeDay: (day, xp) =>
        set((state) => {
          const completedDays = state.completedDays.includes(day)
            ? state.completedDays
            : [...state.completedDays, day];
          const totalXp = state.totalXp + xp;
          return {
            completedDays,
            totalXp,
            level: levelFromXp(totalXp),
            currentDay: Math.max(state.currentDay, day + 1),
            streak: calcStreak(state.lastActiveDate, state.streak),
            lastActiveDate: todayString(),
          };
        }),

      completeExercise: (day, exerciseId, xp) =>
        set((state) => {
          const dayExercises = state.completedExercises[day] ?? [];
          if (dayExercises.includes(exerciseId)) return state;
          const totalXp = state.totalXp + xp;
          return {
            completedExercises: {
              ...state.completedExercises,
              [day]: [...dayExercises, exerciseId],
            },
            totalXp,
            level: levelFromXp(totalXp),
            streak: calcStreak(state.lastActiveDate, state.streak),
            lastActiveDate: todayString(),
          };
        }),

      completeAssignment: (day, xp) =>
        set((state) => {
          if (state.completedAssignments.includes(day)) return state;
          const totalXp = state.totalXp + xp;
          return {
            completedAssignments: [...state.completedAssignments, day],
            totalXp,
            level: levelFromXp(totalXp),
            streak: calcStreak(state.lastActiveDate, state.streak),
            lastActiveDate: todayString(),
          };
        }),

      setCurrentDay: (day) => set({ currentDay: day }),

      addNote: (day, note) =>
        set((state) => ({
          notes: { ...state.notes, [day]: note },
        })),

      updateStreak: () =>
        set((state) => ({
          streak: calcStreak(state.lastActiveDate, state.streak),
          lastActiveDate: todayString(),
        })),

      resetProgress: () => set(initialState),

      getDayProgress: (day) => {
        const state = get();
        const exercisesDone = (state.completedExercises[day] ?? []).length;
        const theoryDone = state.completedDays.includes(day);
        const assignmentDone = state.completedAssignments.includes(day);
        const totalExercises = 3;
        const parts = [
          theoryDone ? 1 : 0,
          exercisesDone / totalExercises,
          assignmentDone ? 1 : 0,
        ];
        const percent = Math.round(
          ((parts[0] + parts[1] + (assignmentDone ? 1 : 0)) / 3) * 100
        );
        return { theoryDone, exercisesDone, totalExercises, assignmentDone, percent };
      },
    }),
    { name: "asta-100days-progress" }
  )
);

export function isDayUnlocked(day: number, completedDays: number[]): boolean {
  if (day === 1) return true;
  return completedDays.includes(day - 1) || day <= Math.max(...completedDays, 0) + 1;
}

export function getOverallProgress(completedDays: number[]): number {
  return Math.round((completedDays.length / 100) * 100);
}
