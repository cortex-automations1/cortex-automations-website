import { cookies } from "next/headers";

const COOKIE_NAME = "admin_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Checks whether the current request carries a valid admin auth cookie.
 * The cookie value is compared against ADMIN_PASSWORD.
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return cookie.value === adminPassword;
}

/**
 * Validates the submitted password against ADMIN_PASSWORD and, if correct,
 * sets an HTTP-only auth cookie. Returns true on success.
 */
export async function setAuthCookie(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) return false;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return true;
}

/**
 * Clears the admin auth cookie.
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
