import { Octokit } from "@octokit/rest";

const [owner, repo] = (process.env.GITHUB_REPO ?? "cortex-automations1/cortex-automations-website").split("/");

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
