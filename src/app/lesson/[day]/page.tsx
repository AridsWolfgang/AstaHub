"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Trophy,
  StickyNote,
  Maximize2,
  Minimize2,
} from "lucide-react";
import CyberPanel from "@/components/CyberPanel";
import CodePlayground from "@/components/CodePlayground";
import { getLesson } from "@/lib/curriculum";
import { useProgressStore } from "@/lib/store";
import { getTierByLevel } from "@/lib/types";
import { formatDay, cn } from "@/lib/utils";
import type { Exercise } from "@/lib/types";

type Tab = "theory" | "playground" | "exercises" | "assignment";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const day = Number(params.day);
  const lesson = getLesson(day);

  const [activeTab, setActiveTab] = useState<Tab>("theory");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [noteInput, setNoteInput] = useState("");
  const [noteMinimized, setNoteMinimized] = useState(true);

  const {
    completeDay,
    completeExercise,
    completeAssignment,
    completedDays,
    completedExercises,
    completedAssignments,
    notes,
    addNote,
  } = useProgressStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft" && day > 1) router.push(`/lesson/${day - 1}`);
      if (e.key === "ArrowRight" && day < 100) router.push(`/lesson/${day + 1}`);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [day, router]);

  useEffect(() => {
    setNoteInput(notes[day] || "");
    setQuizAnswers({});
    setQuizResults({});
    setShowHints({});
    setActiveTab("theory");
  }, [day, notes]);

  if (!lesson || isNaN(day) || day < 1 || day > 100) {
    notFound();
  }

  const tier = getTierByLevel(lesson.level);
  const dayExercises = completedExercises[day] ?? [];
  const isDayComplete = completedDays.includes(day);
  const isAssignmentComplete = completedAssignments.includes(day);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "theory", label: "Theory", icon: BookOpen },
    { id: "playground", label: "Playground", icon: Code2 },
    { id: "exercises", label: "Exercises", icon: ClipboardList },
  ];
  if (lesson.assignment) {
    tabs.push({ id: "assignment", label: "Assignment", icon: Trophy });
  }

  const handleQuizSubmit = (exercise: Exercise) => {
    const selected = quizAnswers[exercise.id];
    if (!selected) return;
    const correct = exercise.options?.find((o) => o.id === selected)?.correct ?? false;
    setQuizResults((prev) => ({ ...prev, [exercise.id]: correct }));
    if (correct && !dayExercises.includes(exercise.id)) {
      completeExercise(day, exercise.id, exercise.xpReward);
    }
  };

  const handleMarkTheoryComplete = () => {
    if (!isDayComplete) {
      completeDay(day, 50);
    }
  };

  const handleCompleteAssignment = () => {
    if (!isAssignmentComplete && lesson.assignment) {
      completeAssignment(day, lesson.assignment.xpReward);
    }
  };

  const handleSaveNote = () => {
    addNote(day, noteInput);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-xs font-mono text-gray-500 hover:text-cyber-cyan mb-4 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Dashboard
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="rounded bg-cyber-cyan/10 border border-cyber-cyan/20 px-2 py-0.5 text-[10px] font-mono text-cyber-cyan">
            {formatDay(day)}
          </span>
          <span
            className={cn(
              "rounded px-2 py-0.5 text-[10px] font-mono uppercase",
              lesson.language === "c"
                ? "bg-cyber-cyan/10 text-cyber-cyan"
                : "bg-cyber-purple/10 text-cyber-purple"
            )}
          >
            {lesson.language}
          </span>
          <span
            className="rounded px-2 py-0.5 text-[10px] font-mono"
            style={{ color: tier.color, background: `${tier.color}10` }}
          >
            {tier.icon} {tier.name}
          </span>
          {isDayComplete && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-matrix-500">
              <CheckCircle2 className="h-3 w-3" /> Complete
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-1">
          {lesson.title}
        </h1>
        <p className="text-gray-400 text-sm">{lesson.subtitle}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {lesson.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-mono text-gray-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-white/5 pb-px overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-all border-b-2 -mb-px whitespace-nowrap",
              activeTab === id
                ? "border-cyber-cyan text-cyber-cyan"
                : "border-transparent text-gray-500 hover:text-white"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "theory" && (
            <div className="space-y-6">
              <CyberPanel glow="cyan" title="Theory Module">
                <div className="theory-content">
                  {lesson.theory.sections.map((section, i) => (
                    <div key={i}>
                      <h2>{section.heading}</h2>
                      <p>{section.content}</p>
                      {section.codeExample && (
                        <pre>{section.codeExample}</pre>
                      )}
                    </div>
                  ))}
                </div>
              </CyberPanel>

              {!isDayComplete && (
                <button onClick={handleMarkTheoryComplete} className="btn-cyber-solid">
                  <CheckCircle2 className="h-4 w-4" />
                  Mark Theory Complete (+50 XP)
                </button>
              )}
            </div>
          )}

          {activeTab === "playground" && (
            <CodePlayground
              defaultCode={lesson.playground.defaultCode}
              language={lesson.playground.language}
            />
          )}

          {activeTab === "exercises" && (
            <div className="space-y-6">
              {lesson.exercises.map((exercise, i) => {
                const done = dayExercises.includes(exercise.id);
                const result = quizResults[exercise.id];

                return (
                  <CyberPanel
                    key={exercise.id}
                    glow={done ? "green" : "amber"}
                    title={`Exercise ${i + 1}: ${exercise.title}`}
                  >
                    <p className="text-sm text-gray-400 mb-4">{exercise.description}</p>

                    {exercise.type === "quiz" && exercise.question && (
                      <div>
                        <p className="text-white font-semibold mb-3">{exercise.question}</p>
                        <div className="space-y-2 mb-4">
                          {exercise.options?.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() =>
                                !done &&
                                setQuizAnswers((prev) => ({ ...prev, [exercise.id]: opt.id }))
                              }
                              disabled={done}
                              className={cn(
                                "w-full text-left rounded-lg border px-4 py-3 text-sm transition-all",
                                quizAnswers[exercise.id] === opt.id
                                  ? "border-cyber-cyan/40 bg-cyber-cyan/5 text-white"
                                  : "border-white/5 text-gray-400 hover:border-white/10",
                                done && "opacity-60"
                              )}
                            >
                              {opt.text}
                            </button>
                          ))}
                        </div>
                        {result !== undefined && (
                          <div
                            className={cn(
                              "flex items-center gap-2 text-sm mb-3",
                              result ? "text-matrix-500" : "text-cyber-red"
                            )}
                          >
                            {result ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            {result ? "Correct!" : "Incorrect — try again"}
                          </div>
                        )}
                        {!done && (
                          <button
                            onClick={() => handleQuizSubmit(exercise)}
                            disabled={!quizAnswers[exercise.id]}
                            className="btn-cyber text-xs disabled:opacity-40"
                          >
                            Submit Answer (+{exercise.xpReward} XP)
                          </button>
                        )}
                        {done && (
                          <span className="text-xs font-mono text-matrix-500">
                            ✓ Completed (+{exercise.xpReward} XP)
                          </span>
                        )}
                      </div>
                    )}

                    {exercise.type === "code" && (
                      <div>
                        <CodePlayground
                          defaultCode={exercise.starterCode ?? ""}
                          language={lesson.language}
                          expectedOutput={exercise.expectedOutput}
                          height="240px"
                        />
                        {exercise.hints && (
                          <div className="mt-3">
                            <button
                              onClick={() =>
                                setShowHints((prev) => ({
                                  ...prev,
                                  [exercise.id]: !prev[exercise.id],
                                }))
                              }
                              className="flex items-center gap-1 text-xs font-mono text-cyber-amber hover:underline"
                            >
                              <Lightbulb className="h-3 w-3" />
                              {showHints[exercise.id] ? "Hide hints" : "Show hints"}
                            </button>
                            {showHints[exercise.id] && (
                              <ul className="mt-2 space-y-1">
                                {exercise.hints.map((hint, hi) => (
                                  <li key={hi} className="text-xs text-gray-500 font-mono">
                                    → {hint}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                        {!done && (
                          <button
                            onClick={() => completeExercise(day, exercise.id, exercise.xpReward)}
                            className="btn-cyber text-xs mt-3"
                          >
                            Mark Complete (+{exercise.xpReward} XP)
                          </button>
                        )}
                        {done && (
                          <span className="text-xs font-mono text-matrix-500 mt-3 block">
                            ✓ Completed (+{exercise.xpReward} XP)
                          </span>
                        )}
                      </div>
                    )}
                  </CyberPanel>
                );
              })}
            </div>
          )}

          {activeTab === "assignment" && lesson.assignment && (
            <div className="space-y-6">
              <CyberPanel glow="purple" title={lesson.assignment.title}>
                <p className="text-sm text-gray-400 mb-4">{lesson.assignment.description}</p>

                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                  Requirements
                </h4>
                <ul className="space-y-1 mb-6">
                  {lesson.assignment.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-cyber-cyan mt-0.5">▸</span>
                      {req}
                    </li>
                  ))}
                </ul>

                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                  Grading Rubric
                </h4>
                <div className="space-y-1 mb-6">
                  {lesson.assignment.rubric.map((r, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-400">{r.criterion}</span>
                      <span className="text-cyber-amber font-mono">{r.points}pts</span>
                    </div>
                  ))}
                </div>

                <CodePlayground
                  defaultCode={lesson.assignment.starterCode}
                  language={lesson.language}
                  height="280px"
                />

                {!isAssignmentComplete ? (
                  <button
                    onClick={handleCompleteAssignment}
                    className="btn-cyber-solid mt-4"
                  >
                    <Trophy className="h-4 w-4" />
                    Submit Assignment (+{lesson.assignment.xpReward} XP)
                  </button>
                ) : (
                  <span className="text-sm font-mono text-matrix-500 mt-4 block">
                    ✓ Assignment submitted (+{lesson.assignment.xpReward} XP)
                  </span>
                )}
              </CyberPanel>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Notes */}
      <div className="mt-8">
        <button
          onClick={() => setNoteMinimized(!noteMinimized)}
          className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-cyber-cyan transition-colors mb-2"
        >
          <StickyNote className="h-3.5 w-3.5" />
          {noteMinimized ? "Show notes" : "Hide notes"}
          {noteMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
        </button>
        {!noteMinimized && (
          <div className="rounded-xl border border-white/5 bg-cyber-panel/40 p-4">
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write your notes for this lesson..."
              className="w-full min-h-[100px] bg-black/40 border border-white/5 rounded-lg p-3 text-sm text-gray-300 font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/30 resize-y"
            />
            <button
              onClick={handleSaveNote}
              className="btn-cyber text-xs mt-2"
            >
              <StickyNote className="h-3 w-3" />
              Save Note
            </button>
            {notes[day] && (
              <span className="text-[10px] font-mono text-matrix-500 ml-3">
                ✓ Saved
              </span>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
        {day > 1 ? (
          <Link href={`/lesson/${day - 1}`} className="btn-cyber text-xs group">
            <ArrowLeft className="h-3 w-3" />
            <span className="hidden sm:inline">Day {day - 1}</span>
            <span className="sm:hidden">Prev</span>
            <kbd className="ml-1 rounded border border-white/10 px-1 text-[8px] text-gray-500 hidden sm:inline">←</kbd>
          </Link>
        ) : (
          <div />
        )}
        {day < 100 && (
          <Link href={`/lesson/${day + 1}`} className="btn-cyber text-xs group">
            <span className="hidden sm:inline">Day {day + 1}</span>
            <span className="sm:hidden">Next</span>
            <kbd className="mr-1 rounded border border-white/10 px-1 text-[8px] text-gray-500 hidden sm:inline">→</kbd>
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
