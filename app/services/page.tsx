import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers, Smartphone, Monitor, Brain, MessageSquare, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Full-stack development services: SaaS platforms, mobile apps, web design, AI automation, and technical consulting.",
  path: "/services",
});

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Smartphone,
  Monitor,
  Brain,
  MessageSquare,
};

export default function ServicesPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-surface-0">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-heading mb-6 tracking-tight">
            What We <span className="brand-underline">Do</span>
          </h1>
          <p className="text-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We design and build custom software — from SaaS platforms and mobile apps to websites and AI-powered automations.
          </p>
        </div>
      </section>

      {/* STAGGERED SERVICES LIST */}
      <section className="pb-32 bg-surface-0 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-24 md:gap-32">
          {SERVICES.map(function (service, index) {
            const isReversed = index % 2 === 1;
            const IconComponent = ICON_MAP[service.icon] ?? Layers;

            return (
              <ScrollReveal
                key={service.slug}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={cn(
                    "flex flex-col gap-12 items-center",
                    isReversed ? "md:flex-row-reverse" : "md:flex-row",
                  )}
                >
                  {/* Text & Value Side */}
                  <div className="w-full md:w-1/2 space-y-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-100 border border-surface-200 text-brand-500 mb-2">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-heading">{service.name}</h2>
                    <p className="text-body text-lg leading-relaxed">{service.description}</p>

                    <div className="pt-4 flex items-center gap-6">
                      <Link
                        href={`/contact?scope=${service.slug}`}
                        className="inline-flex items-center text-heading font-medium hover:text-brand-400 transition-colors group"
                      >
                        Let&apos;s talk about this{" "}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-sm text-muted hover:text-subtle transition-colors"
                      >
                        Learn more →
                      </Link>
                    </div>
                  </div>

                  {/* Technical Blueprint Side */}
                  <div className="w-full md:w-1/2">
                    <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200 relative group overflow-hidden shadow-2xl">
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-heading mb-6">
                          What&apos;s Included
                        </h3>
                        <ul className="space-y-4 mb-8">
                          {service.features.map(function (feature) {
                            return (
                              <li key={feature} className="flex items-start gap-3 text-subtle">
                                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            );
                          })}
                        </ul>

                        <div className="border-t border-surface-200 pt-6 mt-6">
                          <p className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
                            Tech We Use
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.techStack.map(function (tech) {
                              return (
                                <span
                                  key={tech}
                                  className="px-3 py-1 rounded-full bg-surface-100 border border-surface-300 text-subtle text-xs font-mono"
                                >
                                  {tech}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="h-0.5 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mt-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
