import { NextResponse } from "next/server";
import { isAuthenticated, verifyOrigin } from "@/lib/admin-auth";
import { deleteBodySchema } from "@/lib/admin-validation";
import { deleteDraft } from "@/lib/blog/github";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!verifyOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = deleteBodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { filename } = parsed.data;

  try {
    await deleteDraft(filename, `chore(blog): delete draft ${filename}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
