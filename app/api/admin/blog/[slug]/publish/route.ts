import { NextResponse } from "next/server";
import { isAuthenticated, verifyOrigin } from "@/lib/admin-auth";
import { publishOrUpdateBodySchema } from "@/lib/admin-validation";
import { publishDraft } from "@/lib/blog/github";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!verifyOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = publishOrUpdateBodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { filename, content } = parsed.data;

  try {
    const result = await publishDraft(filename, content);
    return NextResponse.json({
      success: true,
      publishedUrl: result.publishedUrl,
    });
  } catch (err) {
    console.error("Publish failed:", err);
    return NextResponse.json({ error: "Publish failed" }, { status: 500 });
  }
}
