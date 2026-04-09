import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isAuthenticated } from "@/lib/admin-auth";
import { getDraftBySlug } from "@/lib/blog";
import { DraftReviewer } from "./draft-reviewer";

export const metadata = {
  title: "Review Draft — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminDraftPage({ params }: Props) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const { slug } = await params;
  const draft = getDraftBySlug(slug);
  if (!draft) {
    notFound();
  }

  // The filesystem layout is YYYY-MM-DD-slug.mdx; we reconstruct the
  // filename from publishedAt + slug so the API routes can target it.
  const filename = `${draft.publishedAt}-${draft.slug}.mdx`;

  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center text-muted hover:text-heading transition-colors text-sm font-medium mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to drafts
      </Link>

      <DraftReviewer draft={draft} filename={filename} />
    </div>
  );
}
