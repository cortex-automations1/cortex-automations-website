import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  await clearAuthCookie();
  return NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
}
