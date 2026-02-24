import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Terminal, CheckCircle2, Cpu, Layers, Smartphone, Monitor, Brain, MessageSquare, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

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
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-gradient">Engineering Services</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We don&apos;t build standard websites. We architect custom digital infrastructure designed
            to automate workflows, capture leads, and scale enterprise operations.
          </p>
        </div>
      </section>

      {/* STAGGERED SERVICES LIST */}
      <section className="pb-32 bg-surface-0 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-24 md:gap-32">
          {SERVICES.map(function (service, index) {
            const isReversed = index % 2 === 1;
            const IconComponent = ICON_MAP[service.icon] ?? Terminal;

            return (
              <div
                key={service.slug}
                className={cn(
                  "flex flex-col gap-12 items-center",
                  isReversed ? "md:flex-row-reverse" : "md:flex-row",
                )}
              >
                {/* Text & Value Side */}
                <div
                  className="w-full md:w-1/2 space-y-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-100 border border-surface-200 text-brand-500 mb-2">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{service.name}</h2>
                  <p className="text-neutral-400 text-lg leading-relaxed">{service.description}</p>

                  <div className="pt-4">
                    <Link
                      href={`/contact?scope=${service.slug}`}
                      className="inline-flex items-center text-white font-medium hover:text-brand-400 transition-colors group"
                    >
                      Discuss this architecture{" "}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Technical Blueprint Side */}
                <div
                  className="w-full md:w-1/2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100 + 100}ms` }}
                >
                  <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200 card-gradient-border relative group overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 glow-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-brand-500" /> Key Capabilities
                      </h3>
                      <ul className="space-y-4 mb-8">
                        {service.features.map(function (feature) {
                          return (
                            <li key={feature} className="flex items-start gap-3 text-neutral-300">
                              <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="border-t border-surface-200 pt-6 mt-6">
                        <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-4">
                          Target Stack &amp; Integrations
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.techStack.map(function (tech) {
                            return (
                              <span
                                key={tech}
                                className="px-3 py-1 rounded-full bg-surface-100 border border-surface-300 text-neutral-300 text-xs font-mono"
                              >
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-surface-50 border-t border-surface-200 relative overflow-hidden z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] glow-brand opacity-10 blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Need a custom architecture?
          </h2>
          <p className="text-neutral-400 text-lg mb-8">
            Whether you need a full-stack rebuild or a complex API integration, we have the
            engineering depth to execute it flawlessly.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors items-center gap-2"
          >
            <Cpu className="w-5 h-5" /> Start the Scoping Process
          </Link>
        </div>
      </section>
    </>
  );
}
