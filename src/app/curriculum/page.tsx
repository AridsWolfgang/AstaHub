"use client";
import { useEffect, useState } from "react";
import CurriculumBrowser from "@/components/CurriculumBrowser";
import { getLessonMetadata, type LessonMeta } from "@/lib/curriculum";

export default function CurriculumPage() {
  const [lessons, setLessons] = useState<LessonMeta[] | null>(null);
  useEffect(() => {
    getLessonMetadata().then(setLessons);
  }, []);
  if (!lessons) return <div className="mx-auto max-w-6xl px-4 py-14 text-center font-mono text-sm text-gray-500">Loading curriculum…</div>;
  return <CurriculumBrowser lessons={lessons} />;
}
