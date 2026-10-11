import type {
  ProjectDiscoveryItem,
  ProjectInput,
  LearningCoachInput,
  LearningCoachResponse,
  UserProfile
} from "@shared/types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers
    },
    credentials: "same-origin"
  });

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "string"
        ? body.error
        : `Request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return body as T;
}

export async function getProfile(): Promise<UserProfile> {
  const result = await request<{ profile: UserProfile }>("/api/profile");
  return result.profile;
}

export async function saveProfile(profile: UserProfile): Promise<UserProfile> {
  const result = await request<{ profile: UserProfile }>("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profile)
  });
  return result.profile;
}

export async function getProjects(): Promise<ProjectDiscoveryItem[]> {
  const result = await request<{ projects: ProjectDiscoveryItem[] }>("/api/projects");
  return result.projects;
}

export async function saveProject(input: ProjectInput): Promise<ProjectDiscoveryItem> {
  const result = await request<{ project: ProjectDiscoveryItem }>("/api/projects", {
    method: "POST",
    body: JSON.stringify(input)
  });
  return result.project;
}

export async function getLearningHints(input: LearningCoachInput): Promise<LearningCoachResponse> {
  const result = await request<{ coaching: LearningCoachResponse }>("/api/coach", {
    method: "POST",
    body: JSON.stringify(input)
  });
  return result.coaching;
}
