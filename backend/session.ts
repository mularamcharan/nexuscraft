import { createHash, randomBytes } from "node:crypto";
import { database } from "./database";

const cookieName = "nexuscraft.sid";
const sessionLifetimeSeconds = 60 * 60 * 24 * 30;

export interface BrowserSession {
  tokenHash: string;
  setCookie?: string;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function getCookie(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  const encodedValue = cookieHeader
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);

  if (!encodedValue) return undefined;

  try {
    return decodeURIComponent(encodedValue);
  } catch {
    return undefined;
  }
}

export function getBrowserSession(request: Request): BrowserSession {
  const token = getCookie(request);

  if (token && /^[a-f0-9]{64}$/.test(token)) {
    const tokenHash = hashToken(token);
    const existing = database
      .prepare("SELECT expires_at FROM browser_sessions WHERE token_hash = ?")
      .get(tokenHash) as { expires_at: number } | undefined;

    if (existing && existing.expires_at > Math.floor(Date.now() / 1000)) {
      return { tokenHash };
    }

    if (existing) {
      database.prepare("DELETE FROM browser_sessions WHERE token_hash = ?").run(tokenHash);
    }
  }

  const newToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(newToken);
  const expiresAt = Math.floor(Date.now() / 1000) + sessionLifetimeSeconds;

  database
    .prepare("INSERT INTO browser_sessions (token_hash, expires_at) VALUES (?, ?)")
    .run(tokenHash, expiresAt);

  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const setCookie = `${cookieName}=${newToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${sessionLifetimeSeconds}${secure}`;

  return { tokenHash, setCookie };
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}
