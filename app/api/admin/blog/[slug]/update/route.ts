import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { updateDraft } from "@/lib/blog/github";

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
    await updateDraft(filename, content, `chore(blog): update draft ${filename}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Update failed" },
      { status: 500 }
    );
  }
}
