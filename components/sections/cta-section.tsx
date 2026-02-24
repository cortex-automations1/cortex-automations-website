import { ArrowRight, Terminal } from "lucide-react";
import { CAL_LINK } from "@/lib/constants";
import Link from "next/link";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Ready to build something great?",
  subtitle = "Book a free discovery call and let's discuss your project.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-surface-200 bg-surface-50 py-24 z-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] glow-brand opacity-10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          {title}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-neutral-400">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-brand-600 shadow-lg shadow-brand-500/20 group"
          >
            Book Discovery Call
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-surface-100 border border-surface-300 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-surface-200"
          >
            <Terminal className="h-4 w-4 text-neutral-400" />
            Initialize Project
          </Link>
        </div>
      </div>
    </section>
  );
}
