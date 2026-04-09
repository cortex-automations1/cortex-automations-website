import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — Cortex Automations",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-0 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-surface-200">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blog"
              className="text-lg font-bold text-heading tracking-tight"
            >
              Admin
            </Link>
            <span className="text-muted text-sm">·</span>
            <Link
              href="/admin/blog"
              className="text-sm text-body hover:text-brand-400 transition-colors"
            >
              Blog Drafts
            </Link>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-sm text-muted hover:text-brand-400 transition-colors"
            >
              Log out
            </button>
          </form>
        </div>
        {children}
      </div>
    </div>
  );
}
