"use client";

import { useParams } from "next/navigation";
import LessonView from "@/components/LessonView";

export default function RustLessonPage() {
  const params = useParams<{ day: string }>();
  const day = Number(params.day);
  return <LessonView track="rust" day={day} />;
}