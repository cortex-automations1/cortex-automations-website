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

    // Forward the lead to Cortex Command Center's public lead intake
    // (app.cortexautomations.ai/api/leads). That endpoint is public and
    // CORS-enabled by design for website forms — no API key required.
    // Overridable via env for staging; defaults to production so a missing
    // env var can never silently drop leads.
    const leadsEndpoint =
      process.env.CORTEX_LEADS_ENDPOINT ??
      "https://app.cortexautomations.ai/api/leads";

    // Command Center's lead schema accepts `phone` only as a US number that
    // normalizes to exactly 10 digits — anything else 400s the whole request.
    // Send a structured phone only when it qualifies; otherwise keep whatever
    // the visitor typed in the notes so it is never lost.
    const phoneDigits = (phone ?? "").replace(/\D/g, "");
    const normalizedPhone =
      phoneDigits.length === 11 && phoneDigits.startsWith("1")
        ? phoneDigits.slice(1)
        : phoneDigits;
    const structuredPhone =
      normalizedPhone.length === 10 ? normalizedPhone : undefined;

    let notes = `Service Interest: ${service}\n\nMessage: ${message}`;
    if (phone && !structuredPhone) {
      notes += `\n\nPhone (as entered): ${phone}`;
    }
    // Command Center caps notes at 2000 chars; our message field allows more.
    if (notes.length > 2000) {
      notes = notes.slice(0, 1999) + "…";
    }

    try {
      const response = await fetch(leadsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          phone: structuredPhone,
          source: "website",
          notes,
        }),
      });

      if (!response.ok) {
        // Log but don't fail the visitor's request — the form still
        // succeeds for them; the miss is visible in logs.
        console.error(
          "Cortex Command Center lead intake error:",
          response.status,
          await response.text().catch(() => ""),
        );
      }
    } catch (apiError) {
      console.error(
        "Failed to forward lead to Cortex Command Center:",
        apiError,
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
