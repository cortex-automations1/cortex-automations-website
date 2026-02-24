import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, Shield, Eye, Heart, Lock, type LucideIcon } from "lucide-react";
import { VALUES, PROCESS_STEPS, STATS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Meet the team behind Cortex Automations. Built by engineers, driven by results.",
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
      {/* PAGE HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-surface-0 border-b border-surface-200">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] glow-brand opacity-20 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl leading-tight">
            Engineering the <span className="text-gradient">Future of Business</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Cortex Automations is a boutique development firm specializing in high-performance
            digital infrastructure, complex workflow automation, and enterprise-grade web
            applications.
          </p>
        </div>
      </section>

      {/* THE DNA / STORY SECTION */}
      <section className="py-24 bg-surface-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Engineering DNA</h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                We believe that powerful backend infrastructure means nothing if the frontend is
                difficult to use. That is why our core philosophy sits at the intersection of
                robust architecture and premium UI/UX.
              </p>
              <p className="text-neutral-400 leading-relaxed text-lg">
                Whether we are engineering specialized Electronic Health Record (EHR) platforms
                for the eye care industry, architecting multi-tenant operational CRMs, or building
                secure admin portals, our goal remains the same: transforming complex business
                logic into frictionless digital experiences.
              </p>
            </div>

            {/* Stats Grid */}
            <div
              className="grid grid-cols-2 gap-6 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              {STATS.map(function (stat) {
                return (
                  <div
                    key={stat.label}
                    className="p-8 rounded-2xl bg-surface-100 border border-surface-200 card-gradient-border text-center"
                  >
                    <div className="text-4xl font-bold text-brand-400 mb-2">{stat.value}</div>
                    <div className="text-sm font-mono text-neutral-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-surface-0 relative z-10 border-t border-surface-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Principles</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              The standards that dictate every line of code we write.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map(function (value, index) {
              const IconComponent = ICON_MAP[value.icon] ?? Shield;
              return (
                <div
                  key={value.title}
                  className="p-8 rounded-2xl bg-surface-50 border border-surface-200 card-gradient-border relative group overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 glow-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <IconComponent className="w-8 h-8 text-brand-500 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* METHODOLOGY / PROCESS */}
      <section className="py-24 bg-surface-50 relative z-10 border-y border-surface-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              The Cortex Methodology
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl">
              A systematic approach to building resilient software.
            </p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-300 before:to-transparent">
            {PROCESS_STEPS.map(function (step, index) {
              return (
                <div
                  key={step.number}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-50 bg-surface-200 text-brand-400 font-mono text-sm font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    {step.number}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-surface-100 border border-surface-200 card-gradient-border shadow-lg">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-surface-0 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Leadership</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Architected by engineers who understand both the code and the business logic.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative group w-full max-w-3xl">
              {/* Glow effect on hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-brand-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8 md:p-12 rounded-3xl bg-surface-50 border border-surface-200 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
                {/* Avatar Node */}
                <div className="shrink-0 relative">
                  <div className="absolute inset-0 bg-brand-500/20 blur-2xl rounded-full" />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border border-brand-500/30 bg-surface-100/80 backdrop-blur-sm text-4xl font-bold text-brand-400 shadow-xl shadow-surface-0/50 -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    DP
                  </div>
                </div>

                {/* Bio Content */}
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100 border border-surface-200 text-brand-400 text-xs font-mono uppercase tracking-wider mb-5">
                    <Terminal className="w-3 h-3" /> Root Access
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">David Perez</h3>
                  <p className="text-brand-400 font-medium mb-6">Founder &amp; Lead Engineer</p>
                  <p className="text-neutral-400 leading-relaxed text-lg mb-8">
                    Full-stack engineer with a passion for building scalable systems and premium
                    UI/UX. Background in IT services, cloud infrastructure, and complex SaaS
                    development—including multi-tenant platforms like SignFlow and specialized
                    healthcare tools like Claro EHR. Focused on shipping quality software that
                    solves real problems.
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100 border border-surface-200 text-neutral-300 text-xs font-medium">
                      <Terminal className="w-3.5 h-3.5 text-brand-500" /> Full-Stack Architecture
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100 border border-surface-200 text-neutral-300 text-xs font-medium">
                      <Eye className="w-3.5 h-3.5 text-brand-500" /> UI/UX Design
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-surface-50 border-t border-surface-200 relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] glow-brand opacity-10 blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to scale your systems?
          </h2>
          <p className="text-neutral-400 text-lg mb-8">
            Partner with an engineering team that understands your business logic as well as your
            codebase.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors items-center gap-2"
          >
            <Terminal className="w-5 h-5" /> Initialize Project
          </Link>
        </div>
      </section>
    </>
  );
}
