import { randomUUID } from "node:crypto";
import type { ProjectDiscoveryItem, ProjectInput } from "@shared/types";
import { database } from "./database";

export function readProjects(sessionHash: string): ProjectDiscoveryItem[] {
  const rows = database
    .prepare(`
      SELECT id, title, description, tags_json, stars, is_bookmarked, category
      FROM projects
      WHERE owner_session_hash IS NULL OR owner_session_hash = ?
      ORDER BY created_at DESC, rowid DESC
    `)
    .all(sessionHash) as Array<{
      id: string;
      title: string;
      description: string;
      tags_json: string;
      stars: number;
      is_bookmarked: number;
      category: "all" | "my";
    }>;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    tags: JSON.parse(row.tags_json) as string[],
    stars: row.stars,
    isBookmarked: Boolean(row.is_bookmarked),
    category: row.category
  }));
}

export function createProject(input: ProjectInput, sessionHash: string): ProjectDiscoveryItem {
  const project: ProjectDiscoveryItem = {
    id: randomUUID(),
    ...input,
    stars: 0,
    isBookmarked: false,
    category: "my"
  };

  database
    .prepare(`
      INSERT INTO projects (id, owner_session_hash, title, description, tags_json, category)
      VALUES (?, ?, ?, ?, ?, 'my')
    `)
    .run(
      project.id,
      sessionHash,
      project.title,
      project.description,
      JSON.stringify(project.tags)
    );

  return project;
}
