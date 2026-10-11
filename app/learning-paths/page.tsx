import { LearningPathsWorkspace } from "@/components/learning-paths-workspace";

export default async function LearningPaths({
  searchParams
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  return <LearningPathsWorkspace initialSection={section === "quizzes" ? "quizzes" : "path"} />;
}