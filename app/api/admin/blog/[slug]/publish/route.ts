import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { publishDraft } from "@/lib/blog/github";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename, content } = await request.json();
  if (!filename || !content) {
    return NextResponse.json(
      { error: "Missing filename or content" },
      { status: 400 }
    );
  }

  try {
    const result = await publishDraft(filename, content);
    return NextResponse.json({ success: true, publishedUrl: result.publishedUrl });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Publish failed" },
      { status: 500 }
    );
  }
}
