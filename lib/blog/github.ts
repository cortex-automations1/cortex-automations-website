import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostFrontmatter } from "@/lib/blog";

const [owner, repo] = (process.env.GITHUB_REPO ?? "cortex-automations1/cortex-automations-website").split("/");

function octokitClient(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");
  return new Octokit({ auth: token });
}

/**
 * Parses a raw MDX file (frontmatter + body) into the same BlogPost
 * shape that lib/blog.ts produces from filesystem reads. Keeps the
 * two data sources interchangeable for the admin UI.
 */
function parsePost(
  raw: string,
  status: "published" | "draft",
): BlogPost {
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;
  return {
    ...frontmatter,
    content,
    readingTime: readingTime(content).text,
    status,
  };
}

/**
 * Commits a new MDX draft to content/blog/drafts/ via GitHub API.
 * Triggers a Vercel deploy so the draft shows up in /admin/blog.
 */
export async function commitDraft(
  filename: string,
  content: string,
  commitMessage: string
): Promise<{ url: string; sha: string }> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN not set");
  }

  const octokit = new Octokit({ auth: token });
  const filePath = `content/blog/drafts/${filename}`;

  // Check if file exists (to get SHA for update, or create if not)
  let existingSha: string | undefined;
  try {
    const existing = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
    });
    if (!Array.isArray(existing.data) && "sha" in existing.data) {
      existingSha = existing.data.sha;
    }
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status;
    if (status !== 404) throw err;
    // 404 means the file doesn't exist, which is expected for new drafts
  }

  const response = await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: commitMessage,
    content: Buffer.from(content, "utf-8").toString("base64"),
    sha: existingSha,
    committer: {
      name: "Cortex Blog Bot",
      email: "bot@cortexautomations.ai",
    },
    author: {
      name: "Cortex Blog Bot",
      email: "bot@cortexautomations.ai",
    },
  });

  return {
    url: response.data.content?.html_url ?? "",
    sha: response.data.content?.sha ?? "",
  };
}

/**
 * Fetches the raw content of a draft file from GitHub.
 * We use this for the edit form — the source of truth for drafts is
 * the git repo, not the local filesystem (which is read-only on Vercel).
 */
export async function getDraftContent(
  filename: string
): Promise<{ content: string; sha: string }> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");

  const octokit = new Octokit({ auth: token });
  const filePath = `content/blog/drafts/${filename}`;

  const response = await octokit.repos.getContent({
    owner,
    repo,
    path: filePath,
  });

  if (Array.isArray(response.data) || response.data.type !== "file") {
    throw new Error(`${filePath} is not a file`);
  }

  const content = Buffer.from(response.data.content, "base64").toString("utf-8");
  return { content, sha: response.data.sha };
}

/**
 * Updates an existing draft file with new content.
 */
export async function updateDraft(
  filename: string,
  content: string,
  commitMessage: string
): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");

  const octokit = new Octokit({ auth: token });
  const filePath = `content/blog/drafts/${filename}`;

  // Get current SHA
  const existing = await octokit.repos.getContent({ owner, repo, path: filePath });
  if (Array.isArray(existing.data) || existing.data.type !== "file") {
    throw new Error(`${filePath} is not a file`);
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: commitMessage,
    content: Buffer.from(content, "utf-8").toString("base64"),
    sha: existing.data.sha,
    committer: { name: "Cortex Blog Bot", email: "bot@cortexautomations.ai" },
    author: { name: "Cortex Blog Bot", email: "bot@cortexautomations.ai" },
  });
}

/**
 * Deletes a draft file from the repo.
 */
export async function deleteDraft(
  filename: string,
  commitMessage: string
): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");

  const octokit = new Octokit({ auth: token });
  const filePath = `content/blog/drafts/${filename}`;

  const existing = await octokit.repos.getContent({ owner, repo, path: filePath });
  if (Array.isArray(existing.data) || existing.data.type !== "file") {
    throw new Error(`${filePath} is not a file`);
  }

  await octokit.repos.deleteFile({
    owner,
    repo,
    path: filePath,
    message: commitMessage,
    sha: existing.data.sha,
    committer: { name: "Cortex Blog Bot", email: "bot@cortexautomations.ai" },
    author: { name: "Cortex Blog Bot", email: "bot@cortexautomations.ai" },
  });
}

/**
 * Lists all drafts directly from GitHub, bypassing the local filesystem.
 *
 * Why: content/blog/drafts/ on Vercel is frozen at deploy time. After a
 * draft is committed/deleted via the GitHub API, the local filesystem
 * doesn't reflect that change until a new deployment propagates. Reading
 * from GitHub gives us the real-time state so the admin UI updates
 * immediately after actions.
 */
export async function listDraftsFromGitHub(): Promise<BlogPost[]> {
  const octokit = octokitClient();

  let files: Array<{ name: string; path: string }>;
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: "content/blog/drafts",
    });
    if (!Array.isArray(response.data)) {
      return [];
    }
    files = response.data
      .filter((item) => item.type === "file" && item.name.endsWith(".mdx"))
      .map((item) => ({ name: item.name, path: item.path }));
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status;
    if (status === 404) return [];
    throw err;
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const fileResponse = await octokit.repos.getContent({
        owner,
        repo,
        path: file.path,
      });
      if (Array.isArray(fileResponse.data) || fileResponse.data.type !== "file") {
        return null;
      }
      const raw = Buffer.from(fileResponse.data.content, "base64").toString("utf-8");
      return parsePost(raw, "draft");
    }),
  );

  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Fetches a single draft by slug, directly from GitHub. Returns null
 * if no draft with that slug exists.
 */
export async function getDraftFromGitHub(slug: string): Promise<BlogPost | null> {
  const drafts = await listDraftsFromGitHub();
  return drafts.find((d) => d.slug === slug) ?? null;
}

/**
 * Publishes a draft: creates the file under published/ and deletes it
 * from drafts/. Done as two separate commits because the GitHub API
 * doesn't support atomic multi-file moves via the contents endpoint.
 */
export async function publishDraft(
  filename: string,
  content: string
): Promise<{ publishedUrl: string }> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");

  const octokit = new Octokit({ auth: token });

  // Create in published/
  const publishedPath = `content/blog/published/${filename}`;
  const publishResponse = await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: publishedPath,
    message: `feat(blog): publish ${filename}`,
    content: Buffer.from(content, "utf-8").toString("base64"),
    committer: { name: "Cortex Blog Bot", email: "bot@cortexautomations.ai" },
    author: { name: "Cortex Blog Bot", email: "bot@cortexautomations.ai" },
  });

  // Delete from drafts/
  await deleteDraft(filename, `feat(blog): remove published draft ${filename}`);

  return {
    publishedUrl: publishResponse.data.content?.html_url ?? "",
  };
}
