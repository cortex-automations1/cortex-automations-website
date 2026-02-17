import type { Metadata } from "next";
import { Shield, Eye, Heart, Lock, type LucideIcon } from "lucide-react";
import { CTASection } from "@/components/sections/cta-section";
import { VALUES } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Meet the team behind Cortex Automations. Built by engineers, driven by results.",
  path: "/about",
});

const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  Eye,
  Heart,
  Lock,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-500/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Built by Engineers,{" "}
            <span className="text-gradient">Driven by Results</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
            We&apos;re a small, focused team that cares deeply about building
            software that works, scales, and lasts.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Our Story</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-400">
            <p>
              Cortex Automations was founded with a simple belief: businesses deserve
              software that&apos;s built right the first time. Too many companies end up
              with bloated codebases, missed deadlines, and tools that don&apos;t actually
              solve their problems.
            </p>
            <p>
              We take a different approach. Every project starts with deep discovery to
              understand not just what you want to build, but why. We focus on clean
              architecture, automated testing, and continuous deployment so your software
              is production-ready from day one.
            </p>
            <p>
              From SaaS platforms processing thousands of transactions to mobile apps
              serving users worldwide, we bring the same level of craft and attention to
              every engagement. Our clients come back because we deliver what we promise,
              and we stand behind our work long after launch.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5 bg-surface-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What We Stand For
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              The principles that guide every project and decision.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(function (value) {
              const Icon = ICON_MAP[value.icon] || Shield;
              return (
                <div
                  key={value.title}
                  className="card-gradient-border p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The Team
            </h2>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="max-w-sm text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-brand-500/30 bg-surface-100 text-3xl font-bold text-brand-400 glow-brand-sm">
                DP
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                David Perez
              </h3>
              <p className="mt-1 font-medium text-brand-400">
                Founder & Lead Engineer
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                Full-stack engineer with a passion for building scalable systems.
                Background in IT services, cloud infrastructure, and SaaS
                development. Focused on shipping quality software that solves real problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Let's work together"
        subtitle="We'd love to hear about your project and explore how we can help."
      />
    </>
  );
}
