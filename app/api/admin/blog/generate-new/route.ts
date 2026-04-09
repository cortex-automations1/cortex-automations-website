import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getNextTopic } from "@/lib/blog/topics";
import { generateBlogPost } from "@/lib/blog/generate";
import { commitDraft } from "@/lib/blog/github";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
  }

  const topic = getNextTopic();
  if (!topic) {
    return NextResponse.redirect(
      new URL("/admin/blog?error=no-topics", request.url),
      { status: 303 }
    );
  }

  try {
    const post = await generateBlogPost(topic);
    const today = new Date().toISOString().split("T")[0];
    const filename = `${today}-${post.slug}.mdx`;

    await commitDraft(filename, post.mdx, `feat(blog): AI draft — ${post.title}`);

    return NextResponse.redirect(
      new URL("/admin/blog?generated=true", request.url),
      { status: 303 }
    );
  } catch (err) {
    console.error("Admin generation failed:", err);
    const message = err instanceof Error ? err.message : "generation failed";
    return NextResponse.redirect(
      new URL(`/admin/blog?error=${encodeURIComponent(message)}`, request.url),
      { status: 303 }
    );
  }
}
