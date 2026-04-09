"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/blog";

interface Props {
  draft: BlogPost;
  filename: string;
}

type Tab = "preview" | "edit";

export function DraftReviewer({ draft, filename }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("preview");
  const [content, setContent] = useState(buildMdxSource(draft));
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/blog/${draft.slug}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, content }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Save failed");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (
      !confirm(
        `Publish "${draft.title}"? It will go live immediately after Vercel redeploys.`
      )
    )
      return;
    setPublishing(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/blog/${draft.slug}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, content }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Publish failed");
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed");
      setPublishing(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${draft.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/blog/${draft.slug}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Delete failed");
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-heading mb-2 tracking-tight">
          {draft.title}
        </h1>
        <div className="flex items-center gap-3 text-muted text-sm">
          <span>{draft.author}</span>
          <span>·</span>
          <span>{draft.publishedAt}</span>
          <span>·</span>
          <span>{draft.readingTime}</span>
        </div>
      </div>

      {/* Tabs + actions */}
      <div className="flex items-center justify-between mb-6 border-b border-surface-200 pb-4 flex-wrap gap-4">
        <div className="flex items-center gap-1 rounded-lg bg-surface-100 border border-surface-200 p-1">
          <button
            onClick={() => setTab("preview")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "preview"
                ? "bg-brand-500 text-white"
                : "text-body hover:text-heading"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("edit")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "edit"
                ? "bg-brand-500 text-white"
                : "text-body hover:text-heading"
            }`}
          >
            Edit
          </button>
        </div>

        <div className="flex items-center gap-3">
          {tab === "edit" && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-surface-100 border border-surface-200 text-heading text-sm font-medium hover:bg-surface-200 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={deleting || publishing}
            className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing || deleting}
            className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            {publishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          {error}
        </div>
      )}

      {tab === "preview" ? (
        <ReviewPreview draft={draft} />
      ) : (
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[600px] p-6 rounded-lg bg-surface-100 border border-surface-200 text-subtle font-mono text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            spellCheck={false}
          />
          <p className="text-muted text-xs mt-2">
            Edit the full MDX source including frontmatter. Click &ldquo;Save
            changes&rdquo; to commit.
          </p>
        </div>
      )}
    </div>
  );
}

function buildMdxSource(draft: BlogPost): string {
  const lines: (string | null)[] = [
    "---",
    `title: "${escapeQuotes(draft.title)}"`,
    `slug: "${draft.slug}"`,
    `description: "${escapeQuotes(draft.description)}"`,
    `publishedAt: "${draft.publishedAt}"`,
    draft.updatedAt ? `updatedAt: "${draft.updatedAt}"` : null,
    `tags: [${(draft.tags ?? []).map((t) => `"${t}"`).join(", ")}]`,
    `author: "${escapeQuotes(draft.author)}"`,
    `featured: ${draft.featured ?? false}`,
    draft.image ? `image: "${draft.image}"` : null,
    "---",
    "",
    draft.content,
  ];
  return lines.filter((line) => line !== null).join("\n");
}

function escapeQuotes(value: string): string {
  return value.replace(/"/g, '\\"');
}

function ReviewPreview({ draft }: { draft: BlogPost }) {
  // We can't use next-mdx-remote inside a client component, so we render
  // the raw markdown in a readable pre block. The reviewer can publish the
  // draft and check the live site for the fully-rendered version.
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-surface-50 border border-surface-200">
        <p className="text-muted text-xs font-medium uppercase tracking-wider mb-2">
          Preview
        </p>
        <h2 className="text-2xl font-bold text-heading mb-2">{draft.title}</h2>
        <p className="text-body text-sm mb-4">{draft.description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          {draft.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-surface-100 border border-surface-200 text-subtle text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <pre className="whitespace-pre-wrap font-sans text-body text-base leading-relaxed p-6 rounded-xl bg-surface-50 border border-surface-200">
        {draft.content}
      </pre>
    </div>
  );
}
