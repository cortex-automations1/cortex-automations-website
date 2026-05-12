import { NextResponse } from "next/server";
import { setAuthCookie, verifyOrigin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!verifyOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const password = formData.get("password")?.toString() ?? "";

  const success = await setAuthCookie(password);
  if (!success) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", request.url),
      { status: 303 },
    );
  }

  return NextResponse.redirect(new URL("/admin/blog", request.url), {
    status: 303,
  });
}
