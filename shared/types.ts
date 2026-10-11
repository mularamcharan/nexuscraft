export interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  bio: string;
  avatarImage: string | null;
}

export interface ProjectDiscoveryItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  stars: number;
  isBookmarked: boolean;
  category: "all" | "my";
}

export interface ProjectInput {
  title: string;
  description: string;
  tags: string[];
}

export interface LearningCoachInput {
  role: string;
  outputFormat: string;
  temperature: number;
  learnerDraft: string;
}

export interface LearningCoachResponse {
  strengths: string[];
  hints: string[];
  reflectionQuestion: string;
}

export interface ApiError {
  error: string;
}
