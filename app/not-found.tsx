import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-surface-0 px-6 text-center">
      <div>
        <h1 className="text-7xl md:text-9xl font-bold text-heading mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-heading mb-6">
          Oops, this page doesn&apos;t exist
        </h2>
        <p className="text-body text-lg max-w-md mx-auto mb-10">
          Looks like you took a wrong turn. No worries &mdash; let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface-100 border border-surface-200 text-heading font-medium hover:bg-surface-200 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
