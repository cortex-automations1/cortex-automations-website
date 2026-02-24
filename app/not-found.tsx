import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-surface-0 relative overflow-hidden px-6 text-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-brand opacity-10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-100 border border-surface-200 text-brand-500 mb-6 shadow-2xl">
          <Terminal className="w-8 h-8" />
        </div>

        <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Endpoint Not Found</h2>
        <p className="text-neutral-400 text-lg max-w-md mx-auto mb-10">
          The architecture you are looking for has been moved, deleted, or never existed in this
          environment.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface-100 border border-surface-200 text-white font-medium hover:bg-surface-200 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Base
        </Link>
      </div>
    </div>
  );
}
