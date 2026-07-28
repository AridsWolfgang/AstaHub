export type Language = "c" | "asm";

export type ProficiencyLevel =
  | "initiate"
  | "apprentice"
  | "adept"
  | "expert"
  | "master";

export type ExerciseType = "quiz" | "code" | "challenge";

export interface QuizOption {
  id: string;
  text: string;
  correct?: boolean;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  description: string;
  /** For quiz exercises */
  question?: string;
  options?: QuizOption[];
  /** For code exercises */
  starterCode?: string;
  solution?: string;
  expectedOutput?: string;
  hints?: string[];
  xpReward: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  starterCode: string;
  rubric: { criterion: string; points: number }[];
  xpReward: number;
}

export interface Lesson {
  day: number;
  title: string;
  subtitle: string;
  language: Language;
  level: ProficiencyLevel;
  durationMinutes: number;
  xpTotal: number;
  tags: string[];
  theory: {
    sections: {
      heading: string;
      content: string;
      codeExample?: string;
    }[];
  };
  playground: {
    defaultCode: string;
    language: "c" | "asm";
    runnable: boolean;
  };
  exercises: Exercise[];
  assignment?: Assignment;
}

export interface ProficiencyTier {
  id: ProficiencyLevel;
  name: string;
  title: string;
  dayRange: [number, number];
  color: string;
  icon: string;
  description: string;
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  completedExercises: Record<number, string[]>;
  completedAssignments: number[];
  totalXp: number;
  streak: number;
  lastActiveDate: string | null;
  level: ProficiencyLevel;
  notes: Record<number, string>;
}

export const PROFICIENCY_TIERS: ProficiencyTier[] = [
  {
    id: "initiate",
    name: "Initiate",
    title: "Memory Initiate",
    dayRange: [1, 20],
    color: "#00f0ff",
    icon: "◈",
    description: "Learn the fundamentals — variables, control flow, and your first pointers.",
  },
  {
    id: "apprentice",
    name: "Apprentice",
    title: "Stack Apprentice",
    dayRange: [21, 40],
    color: "#00e673",
    icon: "◆",
    description: "Master functions, arrays, strings, and struct composition.",
  },
  {
    id: "adept",
    name: "Adept",
    title: "Pointer Adept",
    dayRange: [41, 60],
    color: "#ffb000",
    icon: "◇",
    description: "Dynamic memory, file I/O, and the bridge to machine code.",
  },
  {
    id: "expert",
    name: "Expert",
    title: "Register Expert",
    dayRange: [61, 80],
    color: "#bf00ff",
    icon: "◉",
    description: "x86-64 Assembly — registers, instructions, and calling conventions.",
  },
  {
    id: "master",
    name: "Master",
    title: "Silicon Master",
    dayRange: [81, 100],
    color: "#ff0040",
    icon: "★",
    description: "Optimization, inline ASM, OS interfaces, and bare-metal thinking.",
  },
];

export function getLevelForDay(day: number): ProficiencyLevel {
  for (const tier of PROFICIENCY_TIERS) {
    if (day >= tier.dayRange[0] && day <= tier.dayRange[1]) return tier.id;
  }
  return "master";
}

export function getTierByLevel(level: ProficiencyLevel): ProficiencyTier {
  return PROFICIENCY_TIERS.find((t) => t.id === level)!;
}

export function xpForLevel(level: ProficiencyLevel): number {
  const thresholds: Record<ProficiencyLevel, number> = {
    initiate: 0,
    apprentice: 500,
    adept: 1500,
    expert: 3500,
    master: 7000,
  };
  return thresholds[level];
}

export function levelFromXp(xp: number): ProficiencyLevel {
  if (xp >= 7000) return "master";
  if (xp >= 3500) return "expert";
  if (xp >= 1500) return "adept";
  if (xp >= 500) return "apprentice";
  return "initiate";
}
