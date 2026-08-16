import CurriculumBrowser from "@/components/CurriculumBrowser";
import { getLessonMetadata } from "@/lib/curriculum";

export default async function CurriculumPage() {
  const lessons = await getLessonMetadata();
  return <CurriculumBrowser lessons={lessons} />;
}
