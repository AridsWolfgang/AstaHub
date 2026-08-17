"use client";

import { useParams } from "next/navigation";
import LessonView from "@/components/LessonView";

export default function SqlLessonPage() {
  const params = useParams<{ day: string }>();
  const day = Number(params.day);
  return <LessonView track="sql" day={day} />;
}