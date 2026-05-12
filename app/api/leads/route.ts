import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyOrigin } from "@/lib/admin-auth";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required").max(200),
  phone: z.string().max(30).optional().default(""),
  service: z.string().min(1, "Service interest is required"),
  message: z.string().min(1, "Message is required").max(5000),
  // Honeypot — must be empty. A non-empty value is bot-filled.
  website: z.string().max(0).optional().default(""),
  // Client-supplied timestamp from useEffect on mount. Used as a
  // soft signal — we reject submits that fire too fast to be human.
  renderedAt: z.number().optional(),
});

// Best-effort in-process rate limit. Vercel cold starts reset this
// per-instance, so this is one layer of defense; the honeypot and
// time-to-submit checks below cover the rest.
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const recent = (submissions.get(ip) || []).filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function getClientIp(request: Request): string {
  // Prefer Vercel's vetted single-IP header. Fall back to the first
  // entry of x-forwarded-for (Vercel always puts the real client IP
  // there, prepending it to anything the client claims). Last resort
  // is "unknown" — still gives us SOME bucket to rate-limit against.
  return (
    request.headers.get("x-real-ip") ||
    request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim() ||
    "unknown"
  );
}

export async function POST(request: Request) {
  try {
    // CSRF / cross-site defense — only honor submits originating
    // from our own domain. Reflects requests that come from anywhere
    // else (curl, embedded forms, attacker pages).
    if (!verifyOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid form data" },
        { status: 400 },
      );
    }

    // Honeypot tripped — silently 200 so bots don't learn to bypass.
    if (parsed.data.website && parsed.data.website.length > 0) {
      console.warn("[leads] honeypot tripped, ip=", ip);
      return NextResponse.json({ success: true });
    }

    // Time-to-submit guard — a real human takes at least 3 seconds to
    // fill the form. Reject obvious bot speed; silently 200 so attackers
    // don't tune around the threshold.
    if (parsed.data.renderedAt) {
      const elapsedMs = Date.now() - parsed.data.renderedAt;
      if (elapsedMs < 3000) {
        console.warn("[leads] suspiciously fast submit ms=", elapsedMs, "ip=", ip);
        return NextResponse.json({ success: true });
      }
    }

    const { name, email, company, phone, service, message } = parsed.data;

    // Forward to SignFlow API if configured
    const apiUrl = process.env.SIGNFLOW_API_URL;
    const apiKey = process.env.SIGNFLOW_API_KEY;

    if (apiUrl && apiKey) {
      try {
        const response = await fetch(`${apiUrl}/clients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            name,
            email,
            company,
            phone: phone || undefined,
            status: "lead",
            notes: `Service Interest: ${service}\n\nMessage: ${message}`,
          }),
        });

        if (!response.ok) {
          console.error(
            "SignFlow API error:",
            response.status,
            await response.text(),
          );
        }
      } catch (apiError) {
        // Log but don't fail the user request
        console.error("Failed to forward lead to SignFlow:", apiError);
      }
    } else {
      // Log to console when SignFlow API is not configured
      console.log("New lead submission (SignFlow API not configured):", {
        name,
        email,
        company,
        phone,
        service,
        message,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
