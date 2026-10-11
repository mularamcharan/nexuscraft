export const navigation = [
  { label: "Overview", href: "/dashboard", icon: "grid" },
  { label: "Learning paths", href: "/learning-paths", icon: "book" },
  { label: "Challenges", href: "/challenges", icon: "flag" },
  { label: "Projects", href: "/projects", icon: "layers" },
  { label: "Portfolio", href: "/portfolio", icon: "briefcase" }
] as const;

export const featureNavigation = [
  { label: "Prompt mastery", tab: "prompt-mastery", icon: "sparkle" },
  { label: "Productivity hub", tab: "productivity-hub", icon: "clock" },
  { label: "Community space", tab: "learner-space", icon: "users" },
  { label: "Messages", tab: "messages", icon: "message" },
  { label: "Notifications", tab: "notifications", icon: "bell" },
  { label: "Learning calendar", tab: "calendar", icon: "clock" }
] as const;

export const dashboardSample = {
  learningPath: {
    title: "Foundations of Generative AI",
    description: "Build a clear mental model of how generative models work.",
    progress: 42,
    lesson: "How language models generate text",
    lessonNumber: 4,
    totalLessons: 9
  },
  activeChallenges: [
    {
      title: "Prompt anatomy",
      category: "Prompt engineering",
      time: "15 min",
      href: "/challenges"
    },
    {
      title: "Spot the hallucination",
      category: "AI literacy",
      time: "10 min",
      href: "/challenges"
    }
  ],
  projects: [
    { title: "Study buddy prompt kit", progress: 60, type: "Prompt collection" },
    { title: "AI output field guide", progress: 25, type: "Research guide" }
  ],
  recentActivity: [
    { title: "Completed: What is a large language model?", date: "Yesterday", type: "Lesson" },
    { title: "Started: Study buddy prompt kit", date: "Oct 8", type: "Project" }
  ],
  skills: ["Prompt design", "AI literacy", "Critical thinking", "Clear communication"]
};
