import { NextResponse } from "next/server";
import { setAuthCookie, verifyOrigin } from "@/lib/admin-auth";

export const runtime = "nodejs";

// Best-effort per-IP rate limit on the login endpoint. In-process so it
// resets on Vercel cold starts — that's fine here, the goal is making
// online password-guessing slow, not impossible. Combined with the
// fixed-time response delay below, this makes brute force impractical
// while remaining stateless.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_ATTEMPTS = 10;

function tooManyAttempts(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(request: Request) {
  if (!verifyOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = getClientIp(request);
  if (tooManyAttempts(ip)) {
    // Constant-time-ish response so attackers can't fingerprint the
    // rate-limit branch via timing.
    await delay(400);
    return NextResponse.redirect(
      new URL("/admin/login?error=rate-limit", request.url),
      { status: 303 },
    );
  }

  const formData = await request.formData();
  const password = formData.get("password")?.toString() ?? "";

  const success = await setAuthCookie(password);
  if (!success) {
    // Fixed 400 ms penalty on failure: caps brute-force throughput at
    // ~2.5 guesses/sec/IP and masks any internal timing variance in
    // the password comparison path.
    await delay(400);
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", request.url),
      { status: 303 },
    );
  }

  return NextResponse.redirect(new URL("/admin/blog", request.url), {
    status: 303,
  });
}
