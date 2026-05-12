import { NextResponse } from "next/server";
import { isAuthenticated, verifyOrigin } from "@/lib/admin-auth";
import { publishOrUpdateBodySchema } from "@/lib/admin-validation";
import { updateDraft } from "@/lib/blog/github";

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
    await updateDraft(filename, content, `chore(blog): update draft ${filename}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
