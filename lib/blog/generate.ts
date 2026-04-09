import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { buildSystemPrompt, buildUserPrompt } from "./prompt";
import { getStyleGuide, type BlogTopic } from "./topics";

export interface GeneratedPost {
  mdx: string;
  slug: string;
  title: string;
  estimatedTokens: number;
}

/**
 * Extracts the slug from the frontmatter of generated MDX.
 */
function extractSlug(mdx: string): string {
  const match = mdx.match(/^slug:\s*["']?([^"'\n]+)["']?/m);
  return match?.[1]?.trim() ?? "untitled-post";
}

function extractTitle(mdx: string): string {
  const match = mdx.match(/^title:\s*["']?([^"'\n]+)["']?/m);
  return match?.[1]?.trim() ?? "Untitled Post";
}

/**
 * Generates a complete MDX blog post using Claude.
 */
export async function generateBlogPost(topic: BlogTopic): Promise<GeneratedPost> {
  const styleGuide = getStyleGuide();
  const today = new Date().toISOString().split("T")[0];

  const systemPrompt = buildSystemPrompt(styleGuide);
  const userPrompt = buildUserPrompt(topic, today);

  const result = await generateText({
    model: anthropic("claude-opus-4-5"),
    system: systemPrompt,
    prompt: userPrompt,
    maxOutputTokens: 8000,
    temperature: 0.7,
  });

  const mdx = result.text.trim();
  const slug = extractSlug(mdx);
  const title = extractTitle(mdx);

  return {
    mdx,
    slug,
    title,
    estimatedTokens: result.usage?.totalTokens ?? 0,
  };
}
