import { ArrowRight } from "lucide-react";
import { CAL_LINK } from "@/lib/constants";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Ready to build something great?",
  subtitle = "Book a free discovery call and let's discuss your project.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 section-padding">
      {/* Glow effects */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
          {subtitle}
        </p>
        <div className="mt-8">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-black transition-all hover:bg-neutral-200"
          >
            Book a Discovery Call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
