import { cookies } from "next/headers";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "admin_session";
const LEGACY_COOKIE_NAME = "admin_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string | null {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) return null;
  return s;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function constantTimeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function passwordMatches(submitted: string, expected: string): boolean {
  // SHA-256 both sides to a fixed-length buffer so length is never leaked.
  const a = createHash("sha256").update(submitted).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const secret = getSessionSecret();
  if (!secret) return false;
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie?.value) return false;

  const [payload, sig] = cookie.value.split(".");
  if (!payload || !sig) return false;

  const expected = sign(payload, secret);
  if (!constantTimeEqual(sig, expected)) return false;

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8"),
    ) as { exp?: unknown };
    if (typeof decoded.exp !== "number") return false;
    return decoded.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function setAuthCookie(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = getSessionSecret();
  if (!adminPassword || !secret) return false;
  if (!passwordMatches(password, adminPassword)) return false;

  const exp = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE;
  const payload = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  const value = `${payload}.${sign(payload, secret)}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  // Best-effort cleanup of any leftover plaintext-password cookie from the
  // pre-session-token implementation.
  cookieStore.delete(LEGACY_COOKIE_NAME);
  return true;
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  cookieStore.delete(LEGACY_COOKIE_NAME);
}

/**
 * CSRF defense: confirm the request originated from this site. Returns false
 * if Origin/Referer is missing or points elsewhere. Call on every
 * state-changing admin endpoint before honoring the request.
 */
export function verifyOrigin(request: Request): boolean {
  const host = request.headers.get("host")?.toLowerCase();
  if (!host) return false;

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host.toLowerCase() === host;
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host.toLowerCase() === host;
    } catch {
      return false;
    }
  }

  return false;
}
