export type ActiveTab = 
  | 'prompt-mastery'
  | 'productivity-hub'
  | 'learner-space'
  | 'quizzes'
  | 'portfolio'
  | 'calendar'
  | 'messages'
  | 'settings'
  | 'projects'
  | 'search'
  | 'notifications'
  | 'public-profile'
  | 'user-preferences';

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    body: string;
    codeSnippet?: string;
    keyConcept?: string;
  }[];
  prerequisites?: string[]; // Array of module IDs required before unlocking
  category?: 'AI' | 'Environmental' | 'Cross-Disciplinary';
  tier?: number; // 1: Foundation, 2: Core, 3: Advanced, 4: Capstone
  completed?: boolean;
}

export interface Track {
  id: 'aiTrack' | 'envTrack';
  name: string;
  tagline: string;
  iconName: string;
  badge: string;
  description: string;
  modules: Module[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: 'AI' | 'Environmental' | 'Ethics & Practice';
  questions: QuizQuestion[];
  badgeEarned: string;
}

export interface CommunityProject {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  likes: number;
  description: string;
  tags: string[];
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  trackCompleted: string;
  badges: string[];
}

export interface UserState {
  completedModules: string[];
  completedQuizzes: Record<string, number>; // quizId -> score
  earnedBadges: string[];
  totalPoints: number;
  userName: string;
  activePlan?: 'Basic' | 'Pro' | 'Pro+';
  sparks?: number;
  streak?: number;
  selectedRole?: string;
  proficiencyLevel?: string;
  dailyCommitment?: number;
  remindersEnabled?: boolean;
  currentCourseId?: string;
  currentLessonId?: string;
  lastAccessedModuleTitle?: string;
}
