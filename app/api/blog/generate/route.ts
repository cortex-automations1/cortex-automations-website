import { NextResponse } from "next/server";
import { getNextTopic } from "@/lib/blog/topics";
import { generateBlogPost } from "@/lib/blog/generate";
import { commitDraft } from "@/lib/blog/github";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes — Claude generation can take a bit

/**
 * POST /api/blog/generate
 *
 * Auth: Bearer token matching CRON_SECRET env var
 * Body: { topicId?: string } — optional specific topic, otherwise picks next unused
 *
 * Generates a blog post draft via Claude and commits it to
 * content/blog/drafts/ via GitHub API. The commit triggers a Vercel
 * deploy, after which the draft will appear in /admin/blog for review.
 */
export async function POST(request: Request) {
  // Auth check
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }

  const expectedAuth = `Bearer ${cronSecret}`;
  if (authHeader !== expectedAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse body (topicId is optional)
  let topicId: string | undefined;
  try {
    const body = await request.json();
    topicId = body?.topicId;
  } catch {
    // No body is fine — fall back to next unused topic
  }

  // Pick a topic
  const topic = getNextTopic(topicId);
  if (!topic) {
    return NextResponse.json(
      { error: "No topics available. Add more to content/blog/topics.json." },
      { status: 404 }
    );
  }

  try {
    // Generate the post
    const post = await generateBlogPost(topic);

    // Commit to drafts
    const today = new Date().toISOString().split("T")[0];
    const filename = `${today}-${post.slug}.mdx`;

    const result = await commitDraft(
      filename,
      post.mdx,
      `feat(blog): AI draft — ${post.title}`
    );

    return NextResponse.json({
      success: true,
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
    console.error("Blog generation failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Generation failed",
        message,
        topic: topic.title,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/blog/generate
 *
 * Diagnostic endpoint — returns info about the system without generating.
 * Also gated by CRON_SECRET.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const nextTopic = getNextTopic();

  return NextResponse.json({
    status: "ready",
    has_anthropic_key: !!process.env.ANTHROPIC_API_KEY,
    has_github_token: !!process.env.GITHUB_TOKEN,
    next_topic: nextTopic
      ? { id: nextTopic.id, title: nextTopic.title, category: nextTopic.category }
      : null,
  });
}
