import { NextResponse } from "next/server";
import { getNextTopic } from "@/lib/blog/topics";
import { generateBlogPost } from "@/lib/blog/generate";
import { commitDraft } from "@/lib/blog/github";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * GET /api/cron/blog-generate
 *
 * Scheduled endpoint hit by Vercel Cron on a weekly schedule
 * (see vercel.json).
 *
 * Vercel Cron sends the request with `Authorization: Bearer $CRON_SECRET`,
 * which this route verifies before proceeding. A GET request is required
 * because Vercel Cron only supports GET.
 *
 * On success:
 *   - Picks the next unused topic from content/blog/topics.json
 *   - Generates a complete MDX draft via Claude
 *   - Commits the draft to content/blog/drafts/ via the GitHub API
 *   - The commit triggers a Vercel deploy; the new draft then appears in
 *     /admin/blog for human review and publishing.
 *
 * This route never publishes directly — all AI output lands in drafts/
 * and requires manual approval through the admin UI.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 },
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const topic = getNextTopic();
  if (!topic) {
    return NextResponse.json(
      { error: "No topics available. Add more to content/blog/topics.json." },
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
      source: "cron",
      topic: {
        id: topic.id,
        title: topic.title,
      },
      post: {
        title: post.title,
        slug: post.slug,
        filename,
        tokens: post.estimatedTokens,
      },
      commit: {
        url: result.url,
        sha: result.sha,
      },
      review_url: `/admin/blog/${post.slug}`,
    });
  } catch (err: unknown) {
    console.error("Cron blog generation failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Generation failed",
        message,
        topic: topic.title,
      },
      { status: 500 },
    );
  }
}
