import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  author: string;
  featured?: boolean;
  image?: string;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
  readingTime: string;
  status: "published" | "draft";
}

function readPostsFromDir(dir: string, status: "published" | "draft"): BlogPost[] {
  const fullDir = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const filePath = path.join(fullDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as BlogPostFrontmatter;
    return {
      ...frontmatter,
      content,
      readingTime: readingTime(content).text,
      status,
    };
  });
}

export function getAllPublishedPosts(): BlogPost[] {
  return readPostsFromDir("published", "published").sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getAllDrafts(): BlogPost[] {
  return readPostsFromDir("drafts", "draft").sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getPublishedPostBySlug(slug: string): BlogPost | null {
  return getAllPublishedPosts().find((p) => p.slug === slug) ?? null;
}

export function getDraftBySlug(slug: string): BlogPost | null {
  return getAllDrafts().find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const posts = getAllPublishedPosts().filter((p) => p.slug !== currentSlug);
  return posts.slice(0, limit);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPublishedPosts().forEach((p) => p.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
