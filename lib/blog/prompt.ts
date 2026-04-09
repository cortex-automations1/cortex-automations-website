import fs from "node:fs";
import path from "node:path";
import type { BlogTopic, StyleGuide } from "./topics";
import { PROJECTS, SERVICES } from "@/lib/constants";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog", "published");

function loadSamplePost(slug: string): string | null {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const file = files.find((f) => f.includes(slug));
  if (!file) return null;
  return fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
}

export function buildSystemPrompt(styleGuide: StyleGuide): string {
  const samplePosts = styleGuide.reference_posts
    .map((slug) => loadSamplePost(slug))
    .filter((p): p is string => p !== null)
    .slice(0, 2); // Use top 2 samples to keep context reasonable

  const projectSummaries = PROJECTS.map(
    (p) => `- ${p.name}: ${p.tagline}. Tech: ${p.techStack.join(", ")}.`
  ).join("\n");

  const serviceSummaries = SERVICES.map(
    (s) => `- ${s.name}: ${s.shortDescription}`
  ).join("\n");

  return `You are drafting blog posts for Cortex Automations, a small custom software development studio.

# About Cortex Automations

Cortex Automations is a boutique dev shop that builds custom software for businesses — SaaS platforms, mobile apps, websites, and AI automations. The founder is David Perez. The team is small and focused. Clients are mostly small-to-medium businesses that have outgrown templates and need something built specifically for them.

# Services we offer

${serviceSummaries}

# Real client projects (reference these by name where relevant)

${projectSummaries}

# Voice and style

${styleGuide.voice}

Target length: ${styleGuide.length}

# Required in every post

${styleGuide.required.map((r) => `- ${r}`).join("\n")}

# Forbidden patterns (never do these)

${styleGuide.forbidden.map((f) => `- ${f}`).join("\n")}

# Reference posts (match this quality bar)

Below are two published posts that show the voice, structure, and depth you should aim for. Match their specificity, their opinion, their use of real examples.

${samplePosts
  .map(
    (post, i) => `## Reference Post ${i + 1}

\`\`\`mdx
${post}
\`\`\`
`
  )
  .join("\n\n")}

# Output format

Your output must be a complete MDX file with valid YAML frontmatter at the top. Frontmatter schema:

\`\`\`yaml
---
title: "Post title"
slug: "url-slug-with-dashes"
description: "One sentence, ~160 characters max, compelling for SEO"
publishedAt: "YYYY-MM-DD"
tags: ["tag1", "tag2", "tag3"]
author: "David Perez"
featured: false
---
\`\`\`

After the frontmatter, write the post content as markdown/MDX. Use ## for section headings (not #, since the title is h1). Use code blocks with language hints (\`\`\`typescript, \`\`\`tsx, etc.) where appropriate.

Do not wrap your output in \`\`\`mdx code fences. Output the raw MDX file content directly, starting with the frontmatter.`;
}

export function buildUserPrompt(topic: BlogTopic, today: string): string {
  return `Draft a blog post on this topic:

**Title:** ${topic.title}
**Angle:** ${topic.angle}
**Category:** ${topic.category}
**Target audience:** ${topic.audience}
**Target keywords (work into the post naturally):** ${topic.keywords.join(", ")}

**Today's date:** ${today}

Write the complete MDX file now. Remember: specific numbers, real examples, honest trade-offs, strong opinion. Match the quality of the reference posts. No filler. No marketing fluff.`;
}
