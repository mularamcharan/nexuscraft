import { NextResponse } from "next/server";
import type { ProjectInput } from "@shared/types";
import { createProject, readProjects } from "@backend/projects";
import { getBrowserSession, isSameOriginRequest } from "@backend/session";

export const runtime = "nodejs";

function isProjectInput(value: unknown): value is ProjectInput {
  if (typeof value !== "object" || value === null) return false;
  const project = value as Record<string, unknown>;
  return (
    typeof project.title === "string" &&
    project.title.trim().length > 0 &&
    project.title.length <= 120 &&
    typeof project.description === "string" &&
    project.description.trim().length > 0 &&
    project.description.length <= 2000 &&
    Array.isArray(project.tags) &&
    project.tags.length <= 12 &&
    project.tags.every((tag) => typeof tag === "string" && tag.trim().length <= 40)
  );
}

function addSessionCookie(response: NextResponse, setCookie?: string): NextResponse {
  if (setCookie) response.headers.set("Set-Cookie", setCookie);
  return response;
}

export async function GET(request: Request) {
  try {
    const session = getBrowserSession(request);
    return addSessionCookie(
      NextResponse.json({ projects: readProjects(session.tokenHash) }),
      session.setCookie
    );
  } catch (error) {
    console.error("Could not load projects from the database.", error);
    return NextResponse.json({ error: "Project storage is unavailable." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Cross-origin updates are not allowed." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isProjectInput(body)) {
    return NextResponse.json({ error: "Project data is invalid." }, { status: 400 });
  }

  try {
    const session = getBrowserSession(request);
    const project = createProject(
      {
        title: body.title.trim(),
        description: body.description.trim(),
        tags: body.tags.map((tag) => tag.trim()).filter(Boolean)
      },
      session.tokenHash
    );
    return addSessionCookie(NextResponse.json({ project }, { status: 201 }), session.setCookie);
  } catch (error) {
    console.error("Could not save the project to the database.", error);
    return NextResponse.json({ error: "Project could not be saved." }, { status: 500 });
  }
}
