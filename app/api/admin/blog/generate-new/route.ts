import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getNextTopic } from "@/lib/blog/topics";
import { generateBlogPost } from "@/lib/blog/generate";
import { commitDraft } from "@/lib/blog/github";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * POST /api/admin/blog/generate-new
 *
 * Triggered from the admin UI's "Generate New Blog" button. Returns JSON
 * so the client can show proper loading/success/error feedback instead of
 * a full page redirect.
 */
export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const topic = getNextTopic();
  if (!topic) {
    return NextResponse.json(
      { error: "No topics left in the queue. Add more to content/blog/topics.json." },
      { status: 404 },
    );
  }

  try {
    const post = await generateBlogPost(topic);
    const today = new Date().toISOString().split("T")[0];
    const filename = `${today}-${post.slug}.mdx`;

    const result = await commitDraft(
      filename,
      post.mdx,
      `feat(blog): AI draft — ${post.title}`,
    );

    return NextResponse.json({
      success: true,
      topic: { id: topic.id, title: topic.title },
      post: {
        title: post.title,
        slug: post.slug,
        filename,
        tokens: post.estimatedTokens,
      },
      commit: { url: result.url, sha: result.sha },
    });
  } catch (err) {
    console.error("Admin generation failed:", err);
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
