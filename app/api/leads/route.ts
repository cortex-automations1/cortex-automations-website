import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required").max(200),
  phone: z.string().max(30).optional().default(""),
  service: z.string().min(1, "Service interest is required"),
  message: z.string().min(1, "Message is required").max(5000),
});

// Simple in-memory rate limiting
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const timestamps = submissions.get(ip) || [];
  const recent = timestamps.filter(function (t) {
    return now - t < windowMs;
  });

  if (recent.length >= maxRequests) {
    return true;
  }

  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

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
