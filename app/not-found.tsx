import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-surface-0">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-brand opacity-10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 animate-fade-in-up">
        <p className="text-sm font-mono text-brand-400 uppercase tracking-widest mb-4">
          Error 404
        </p>
        <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight">
          <span className="text-gradient">404</span>
        </h1>
        <p className="text-xl text-neutral-400 mb-2">Page not found</p>
        <p className="text-neutral-500 max-w-md mx-auto mb-10">
          The route you requested doesn&apos;t exist or has been moved to a different endpoint.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-100 border border-surface-200 hover:bg-surface-200 text-white font-medium transition-colors"
          >
            <Terminal className="w-4 h-4 text-neutral-400" />
            Initialize Project
          </Link>
        </div>
      </div>
    </div>
  );
}
