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

/**
 * Build a rich project profile the model can actually pull from.
 * Includes description, challenge, solution, and a compact highlights line.
 */
function buildProjectProfile(
  project: (typeof PROJECTS)[number],
): string {
  const highlights = project.highlights
    .map((h) => `${h.label}: ${h.value}`)
    .join(" · ");
  const link = project.link ? `\n  Live: ${project.link}` : "";

  return `## ${project.name} — ${project.category}

${project.tagline}

**What it does:** ${project.description}

**The problem:** ${project.challenge}

**What we built:** ${project.solution}

**Tech:** ${project.techStack.join(", ")}

**Stats:** ${highlights}${link}`;
}

export function buildSystemPrompt(styleGuide: StyleGuide): string {
  const samplePosts = styleGuide.reference_posts
    .map((slug) => loadSamplePost(slug))
    .filter((p): p is string => p !== null)
    .slice(0, 2);

  const projectProfiles = PROJECTS.map(buildProjectProfile).join("\n\n");

  const serviceSummaries = SERVICES.map(
    (s) => `- ${s.name}: ${s.shortDescription}`,
  ).join("\n");

  return `You are drafting blog posts for Cortex Automations, a small custom software development studio.

# About Cortex Automations

Cortex Automations is a boutique dev shop that builds custom software for businesses — SaaS platforms, mobile apps, websites, and AI automations. The founder is David Perez. The team is small and focused. Clients are mostly small-to-medium businesses that have outgrown templates and need something built specifically for them.

# Services we offer

${serviceSummaries}

# The full project portfolio

Below is every completed project. Use them as a source of real examples, but do NOT tie every post to a single project. Most posts should draw from multiple projects where relevant, or talk about industry/technology patterns that are broader than any single project.

${projectProfiles}

# Scope of posts — VERY IMPORTANT

Posts fall into a few different categories. Match your approach to the category you were given:

1. **Case study** (category: \`case-study\`) — Yes, go deep on ONE project. Reference it by name in the title and throughout. Use real code, real decisions, real trade-offs. This is the one category where single-project focus is correct.

2. **Industry, opinion, cloud, AI, tech-decisions, authority, before-after, cost-transparency, seo-commercial, industry-specific** — These should be BROAD. Do not make them about a single project. Pull examples from MULTIPLE projects where they illustrate a point. It is also OK — and often better — to talk about the industry at large, other companies' decisions, general tech trends, and things Cortex hasn't personally done. You have permission to reference well-known companies (Stripe, Linear, Vercel, Supabase, Anthropic, etc.), well-known tools, and publicly-known industry patterns. Don't pretend Cortex is the only company that exists.

3. For ALL posts, including case studies: the writer (Cortex) has opinions on the broader industry. Express them. Talk about what other people get wrong, what the common advice misses, what's overrated, what's underrated. A blog with no opinion is a blog nobody reads.

# Using the projects

- A case study post about DealProp? Draw from DealProp's details above.
- A post about "how we think about multi-tenant SaaS"? Pull examples from DealProp AND SignFlow AND Spite House (all multi-tenant) — compare and contrast the three.
- A post about "the hidden cost of serverless"? You can mention Vercel deploy patterns from Capital Property Group, from Outback Excavating, from the Cortex site itself — or you can reference industry patterns from other companies' public postmortems that you know about.
- A post about "should you use AI in your SaaS"? Mention where Cortex used it (DealProp's deal analysis), where Cortex chose not to (SignFlow's IRR math — deterministic code only), and broader industry patterns (GitHub Copilot, Cursor, Linear's AI features).
- A post about "how to choose a developer"? This is advice for buyers. Almost no Cortex-specific detail. Talk about the industry, what to look for, red flags, how pricing structures work at other agencies.

# Voice and style

${styleGuide.voice}

Target length: ${styleGuide.length}

# Required in every post

${styleGuide.required.map((r) => `- ${r}`).join("\n")}

# Forbidden patterns (never do these)

${styleGuide.forbidden.map((f) => `- ${f}`).join("\n")}

# Reference posts (match this quality bar)

Below are two published posts that show the voice, structure, and depth you should aim for. Match their specificity, their opinion, their use of real examples. Note how Reference Post 1 is a case study (single-project focus is correct there) while Reference Post 2 is an opinion piece that references multiple projects and broader industry patterns.

${samplePosts
  .map(
    (post, i) => `## Reference Post ${i + 1}

\`\`\`mdx
${post}
\`\`\`
`,
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
  const isCaseStudy = topic.category === "case-study";

  const scopeGuidance = isCaseStudy
    ? `This is a CASE STUDY. Focus on a single project. Go deep on decisions, trade-offs, code, and numbers. If the topic mentions a specific project, center the post on that project.`
    : `This is NOT a case study. Do NOT build the post around a single project. Draw examples from multiple projects in the portfolio when they illustrate a point, AND freely reference broader industry patterns, other companies' decisions (Stripe, Linear, Vercel, Supabase, etc.), and general tech trends. The post should feel like an opinionated industry piece from a studio that has seen a lot of projects — not a thinly-disguised portfolio pitch.`;

  return `Draft a blog post on this topic:

**Title:** ${topic.title}
**Angle:** ${topic.angle}
**Category:** ${topic.category}
**Target audience:** ${topic.audience}
**Target keywords (work into the post naturally):** ${topic.keywords.join(", ")}

**Today's date:** ${today}

**Scope guidance for this specific post:**
${scopeGuidance}

Write the complete MDX file now. Remember: specific numbers, real examples, honest trade-offs, strong opinion. Match the quality of the reference posts. No filler. No marketing fluff.`;
}
