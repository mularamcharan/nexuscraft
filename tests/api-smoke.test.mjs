import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import test from "node:test";

const baseUrl = process.env.NEXUSCRAFT_TEST_URL ?? "http://localhost:3000";

test("profile and projects use the same-origin server API and preserve session data", async () => {
  const sessionTokens = [];
  try {
    const profileResponse = await fetch(`${baseUrl}/api/profile`);
    assert.equal(profileResponse.status, 200);
    const cookieHeader = profileResponse.headers.get("set-cookie");
    assert.ok(cookieHeader, "profile GET should issue an anonymous session cookie");
    const cookie = cookieHeader.split(";")[0];
    sessionTokens.push(cookie.split("=")[1]);
    assert.match(cookieHeader, /HttpOnly/);
    assert.match(cookieHeader, /SameSite=Strict/);

    const profile = {
      fullName: "API Smoke Test",
      username: "api-smoke-test",
      email: "smoke@example.test",
      bio: "Verifying browser-to-server profile persistence.",
      avatarImage: null
    };
    const saveProfileResponse = await fetch(`${baseUrl}/api/profile`, {
      method: "PUT",
      headers: {
        cookie,
        origin: baseUrl,
        "content-type": "application/json"
      },
      body: JSON.stringify(profile)
    });
    assert.equal(saveProfileResponse.status, 200);
    assert.deepEqual((await saveProfileResponse.json()).profile, profile);

    const savedProfileResponse = await fetch(`${baseUrl}/api/profile`, {
      headers: { cookie }
    });
    assert.deepEqual((await savedProfileResponse.json()).profile, profile);

    const crossOriginResponse = await fetch(`${baseUrl}/api/profile`, {
      method: "PUT",
      headers: {
        cookie,
        origin: "https://untrusted.example",
        "content-type": "application/json"
      },
      body: JSON.stringify(profile)
    });
    assert.equal(crossOriginResponse.status, 403);

    const crossOriginCoachResponse = await fetch(`${baseUrl}/api/coach`, {
      method: "POST",
      headers: {
        origin: "https://untrusted.example",
        "content-type": "application/json"
      },
      body: JSON.stringify({ role: "coach", outputFormat: "bullets", temperature: 0.4, learnerDraft: "Help me learn." })
    });
    assert.equal(crossOriginCoachResponse.status, 403);

    const invalidCoachResponse = await fetch(`${baseUrl}/api/coach`, {
      method: "POST",
      headers: {
        origin: baseUrl,
        "content-type": "application/json"
      },
      body: JSON.stringify({ role: "coach", outputFormat: "bullets", learnerDraft: "" })
    });
    assert.equal(invalidCoachResponse.status, 400);

    const projectsResponse = await fetch(`${baseUrl}/api/projects`, { headers: { cookie } });
    assert.equal(projectsResponse.status, 200);
    const initialProjects = (await projectsResponse.json()).projects;
    assert.ok(initialProjects.length >= 4, "sample projects should be seeded by the database");

    const projectInput = {
      title: `API Smoke Project ${Date.now()}`,
      description: "A temporary project created by the API smoke test.",
      tags: ["Node.js", "SQLite"]
    };
    const createProjectResponse = await fetch(`${baseUrl}/api/projects`, {
      method: "POST",
      headers: {
        cookie,
        origin: baseUrl,
        "content-type": "application/json"
      },
      body: JSON.stringify(projectInput)
    });
    assert.equal(createProjectResponse.status, 201);
    const createdProject = (await createProjectResponse.json()).project;

    const refreshedProjects = await fetch(`${baseUrl}/api/projects`, { headers: { cookie } });
    assert.ok(
      (await refreshedProjects.json()).projects.some((project) => project.id === createdProject.id),
      "created project should persist in the database"
    );

    const anotherSessionProjects = await fetch(`${baseUrl}/api/projects`);
    const anotherSessionCookie = anotherSessionProjects.headers.get("set-cookie");
    assert.ok(anotherSessionCookie, "a separate browser session should be issued");
    sessionTokens.push(anotherSessionCookie.split(";")[0].split("=")[1]);
    assert.ok(
      !(await anotherSessionProjects.json()).projects.some((project) => project.id === createdProject.id),
      "a different browser session should not see the private project"
    );

    const projectsWorkspace = await fetch(`${baseUrl}/projects`);
    assert.equal(projectsWorkspace.status, 200);
    const oldDiscoveryLink = await fetch(`${baseUrl}/features?tab=projects`, { redirect: "manual" });
    assert.equal(oldDiscoveryLink.status, 307);
    assert.equal(new URL(oldDiscoveryLink.headers.get("location"), baseUrl).href, `${baseUrl}/projects`);

    const featureTabs = [
      "prompt-mastery",
      "productivity-hub",
      "learner-space",
      "portfolio",
      "messages",
      "notifications",
      "public-profile",
      "calendar",
      "settings",
      "user-preferences"
    ];
    for (const tab of featureTabs) {
      const featureResponse = await fetch(`${baseUrl}/features?tab=${tab}`);
      assert.equal(featureResponse.status, 200, `learning tool route "${tab}" should load`);
    }

    const quizzesLink = await fetch(`${baseUrl}/features?tab=quizzes`, { redirect: "manual" });
    assert.equal(quizzesLink.status, 307);
    assert.equal(new URL(quizzesLink.headers.get("location"), baseUrl).href, `${baseUrl}/learning-paths?section=quizzes`);
    const quizzesPage = await fetch(`${baseUrl}/learning-paths?section=quizzes`);
    assert.equal(quizzesPage.status, 200);

    const oldProfileBuilderLink = await fetch(`${baseUrl}/features?tab=profile-creation`, { redirect: "manual" });
    assert.equal(oldProfileBuilderLink.status, 307);
    assert.equal(
      new URL(oldProfileBuilderLink.headers.get("location"), baseUrl).href,
      `${baseUrl}/features?tab=public-profile`
    );

    const oldPlannerLink = await fetch(`${baseUrl}/planner`, { redirect: "manual" });
    assert.equal(oldPlannerLink.status, 307);
    assert.equal(
      new URL(oldPlannerLink.headers.get("location"), baseUrl).href,
      `${baseUrl}/features?tab=productivity-hub`
    );

    const oldSearchLink = await fetch(`${baseUrl}/features?tab=search`, { redirect: "manual" });
    assert.equal(oldSearchLink.status, 307);
    const searchDestination = new URL(oldSearchLink.headers.get("location"), baseUrl);
    assert.equal(searchDestination.pathname, "/dashboard");
    assert.equal(searchDestination.searchParams.get("search"), "1");
  } finally {
    const databasePath = fileURLToPath(new URL("../database/nexuscraft.sqlite", import.meta.url));
    const database = new DatabaseSync(databasePath);
    database.exec("PRAGMA foreign_keys = ON");
    const deleteSession = database.prepare("DELETE FROM browser_sessions WHERE token_hash = ?");
    for (const token of sessionTokens) {
      const tokenHash = createHash("sha256").update(token).digest("hex");
      deleteSession.run(tokenHash);
    }
    database.close();
  }
});
