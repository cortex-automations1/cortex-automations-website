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
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-600 to-brand-700 section-padding">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-20 right-20 h-[300px] w-[300px] rounded-full bg-brand-500/30 blur-3xl" />
        <div className="absolute -bottom-20 left-20 h-[250px] w-[250px] rounded-full bg-brand-400/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
          {subtitle}
        </p>
        <div className="mt-8">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50 hover:shadow-xl"
          >
            Book a Discovery Call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
