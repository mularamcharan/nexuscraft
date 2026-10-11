import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { ActiveTab } from "@/src/types";
import FeatureClient from "./feature-client";

export const metadata: Metadata = {
  title: "Learning tools — NexusCraft",
  description: "Practice prompts, take quizzes, collaborate with learners, and manage your learning in NexusCraft."
};

const defaultTab: ActiveTab = "prompt-mastery";

export default async function FeaturesPage({
  searchParams
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const { tab } = await searchParams;
  if (tab === "projects") redirect("/projects");
  if (tab === "search") redirect("/dashboard?search=1");
  if (tab === "quizzes") redirect("/learning-paths?section=quizzes");
  if (tab === "profile-creation") redirect("/features?tab=public-profile");
  const requestedTab = tab === undefined ? defaultTab : tab === "user-preferences" ? "settings" : tab;

  if (typeof requestedTab !== "string") notFound();

  const normalizedTab = requestedTab === "profile" ? "public-profile" : requestedTab;
  const validTabs: ActiveTab[] = [
    "prompt-mastery",
    "productivity-hub",
    "learner-space",
    "portfolio",
    "calendar",
    "messages",
    "settings",
    "notifications",
    "public-profile",
  ];

  if (!validTabs.includes(normalizedTab as ActiveTab)) {
    notFound();
  }

  return <FeatureClient initialTab={normalizedTab as ActiveTab} />;
}
