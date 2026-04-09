import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type Props = { params: Promise<{ slug: string }> };

/**
 * Parse a highlight value and return either an AnimatedCounter config
 * (when numeric) or null (when non-numeric / should render as static text).
 *
 * Examples:
 *   "3"      → { target: 3 }
 *   "95+"    → { target: 95, suffix: "+" }
 *   "$200K+" → { target: 200, prefix: "$", suffix: "K+" }
 *   "<1s"    → null
 *   "Yes"    → null
 */
function parseHighlightValue(
  value: string
): { target: number; prefix?: string; suffix?: string } | null {
  // Strip leading non-digit characters as prefix (e.g. "$")
  const prefixMatch = value.match(/^([^0-9]*)(\d[\d,.]*)(.*)$/);
  if (!prefixMatch) return null;

  const prefix = prefixMatch[1];
  const numStr = prefixMatch[2].replace(/,/g, "");
  const suffix = prefixMatch[3];

  const target = parseFloat(numStr);
  if (isNaN(target)) return null;

  return {
    target,
    ...(prefix ? { prefix } : {}),
    ...(suffix ? { suffix } : {}),
  };
}

export function generateStaticParams() {
  return PROJECTS.map(function (project) {
    return { slug: project.slug };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find(function (p) { return p.slug === slug; });
  if (!project) return {};
  return createMetadata({
    title: project.name,
    description: project.tagline,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find(function (p) { return p.slug === slug; });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface-0 pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Back Navigation */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-body hover:text-heading transition-colors text-sm font-medium mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Case Study Hero */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-heading mb-6 tracking-tight">
            <span className="brand-underline">{project.name}</span>
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </header>

        {/* Highlights Metrics Grid */}
        {project.highlights.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {project.highlights.map(function (highlight) {
              const parsed = parseHighlightValue(highlight.value);
              return (
                <div
                  key={highlight.label}
                  className="p-6 rounded-xl bg-surface-50 border border-surface-200"
                >
                  <div className="text-2xl font-bold text-brand-400 mb-1">
                    {parsed ? (
                      <AnimatedCounter
                        target={parsed.target}
                        prefix={parsed.prefix}
                        suffix={parsed.suffix}
                      />
                    ) : (
                      highlight.value
                    )}
                  </div>
                  <div className="text-xs font-mono text-muted uppercase tracking-wider">
                    {highlight.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Deep Dive Content */}
        <ScrollReveal>
          <div className="space-y-16">

            {/* Executive Summary */}
            <section>
              <h2 className="text-2xl font-bold text-heading mb-6">
                Executive Summary
              </h2>
              <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200 text-subtle leading-relaxed text-lg">
                {project.description}
              </div>
            </section>

            {/* Challenge & Solution */}
            {(project.challenge || project.solution) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.challenge && (
                  <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200">
                    <h2 className="text-lg font-bold text-heading mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> The Challenge
                    </h2>
                    <p className="text-body leading-relaxed">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200">
                    <h2 className="text-lg font-bold text-heading mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-400 inline-block" /> The Solution
                    </h2>
                    <p className="text-body leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </section>
            )}

            {/* Tech Stack */}
            <section>
              <h2 className="text-2xl font-bold text-heading mb-6">
                Technical Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map(function (tech) {
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-100 border border-surface-200 text-subtle font-mono text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-500" />
                      {tech}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Action Bar */}
            <section className="pt-12 border-t border-surface-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-heading mb-1">
                  Like what you see?
                </h3>
                <p className="text-sm text-body">
                  Let&apos;s scope out your technical requirements.
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 rounded-lg bg-surface-100 border border-surface-200 text-heading font-medium hover:bg-surface-200 transition-colors group"
                  >
                    View Live{" "}
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
                <Link
                  href={`/contact?scope=portfolio&ref=${project.slug}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
                >
                  Start Project
                </Link>
              </div>
            </section>

          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
