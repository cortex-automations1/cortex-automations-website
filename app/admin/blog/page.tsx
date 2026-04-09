import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Clock } from "lucide-react";
import { isAuthenticated } from "@/lib/admin-auth";
import { getAllDrafts } from "@/lib/blog";

export const metadata = {
  title: "Blog Drafts — Admin",
  robots: { index: false, follow: false },
};

// Drafts are committed via the GitHub API so we need to opt out of the
// full-route cache — otherwise the list page would be static at build time.
export const dynamic = "force-dynamic";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ generated?: string; error?: string }>;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const { generated, error } = await searchParams;
  const drafts = getAllDrafts();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-heading mb-2 tracking-tight">
            Blog Drafts
          </h1>
          <p className="text-body">
            {drafts.length} {drafts.length === 1 ? "draft" : "drafts"} waiting for review.
          </p>
        </div>
        <form action="/api/admin/blog/generate-new" method="POST">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Generate new draft
          </button>
        </form>
      </div>

      {generated && (
        <div className="mb-6 p-4 rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm">
          Generation kicked off. The new draft will appear here after the deploy completes.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          {error === "no-topics"
            ? "No topics left in the queue. Add more to content/blog/topics.json."
            : `Generation failed: ${error}`}
        </div>
      )}

      {drafts.length === 0 ? (
        <div className="p-12 rounded-2xl bg-surface-50 border border-surface-200 text-center">
          <p className="text-body mb-4">No drafts yet.</p>
          <p className="text-muted text-sm">
            Click &ldquo;Generate new draft&rdquo; to have Claude draft a post based on the next topic in the queue.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {drafts.map((draft) => (
            <Link
              key={draft.slug}
              href={`/admin/blog/${draft.slug}`}
              className="block p-6 rounded-2xl bg-surface-50 border border-surface-200 hover:border-brand-500/30 transition-colors group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {draft.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-surface-100 border border-surface-200 text-subtle text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-heading mb-2 group-hover:text-brand-400 transition-colors">
                    {draft.title}
                  </h2>
                  <p className="text-body text-sm leading-relaxed mb-3 line-clamp-2">
                    {draft.description}
                  </p>
                  <div className="flex items-center gap-3 text-muted text-xs">
                    <span>{draft.author}</span>
                    <span>·</span>
                    <span>{formatDate(draft.publishedAt)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {draft.readingTime}
                    </span>
                  </div>
                </div>
                <div className="text-brand-400 text-sm font-medium whitespace-nowrap">
                  Review →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
