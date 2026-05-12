import { NextResponse } from "next/server";
import { clearAuthCookie, verifyOrigin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!verifyOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await clearAuthCookie();
  return NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 303,
  });
}
