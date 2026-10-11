import { NextResponse } from "next/server";
import type { UserProfile } from "@shared/types";
import { readProfile, writeProfile } from "@backend/profiles";
import { getBrowserSession, isSameOriginRequest } from "@backend/session";

export const runtime = "nodejs";

function isUserProfile(value: unknown): value is UserProfile {
  if (typeof value !== "object" || value === null) return false;
  const profile = value as Record<string, unknown>;
  return (
    typeof profile.fullName === "string" &&
    profile.fullName.trim().length > 0 &&
    profile.fullName.length <= 100 &&
    typeof profile.username === "string" &&
    profile.username.length <= 40 &&
    typeof profile.email === "string" &&
    profile.email.length <= 254 &&
    typeof profile.bio === "string" &&
    profile.bio.length <= 150 &&
    (profile.avatarImage === null ||
      (typeof profile.avatarImage === "string" && profile.avatarImage.length <= 2048))
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
      NextResponse.json({ profile: readProfile(session.tokenHash) }),
      session.setCookie
    );
  } catch (error) {
    console.error("Could not load the profile from the database.", error);
    return NextResponse.json({ error: "Profile storage is unavailable." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Cross-origin updates are not allowed." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isUserProfile(body)) {
    return NextResponse.json({ error: "Profile data is invalid." }, { status: 400 });
  }

  try {
    const session = getBrowserSession(request);
    const profile = writeProfile(session.tokenHash, {
      ...body,
      fullName: body.fullName.trim(),
      username: body.username.trim(),
      email: body.email.trim(),
      bio: body.bio.trim()
    });
    return addSessionCookie(NextResponse.json({ profile }), session.setCookie);
  } catch (error) {
    console.error("Could not save the profile to the database.", error);
    return NextResponse.json({ error: "Profile could not be saved." }, { status: 500 });
  }
}
