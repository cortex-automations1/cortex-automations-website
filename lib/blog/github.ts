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
