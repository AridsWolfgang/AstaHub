"use client";

import { useParams } from "react-router-dom";
import LessonView from "@/components/LessonView";

export default function TrackLessonPage() {
  const params = useParams<{ day: string }>();
  const day = Number(params.day);
  return <LessonView track="python" day={day} />;
}
