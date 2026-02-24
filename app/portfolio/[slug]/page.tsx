import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Terminal, CheckCircle2, LayoutGrid } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

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
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] glow-brand opacity-10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Back Navigation */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-neutral-400 hover:text-white transition-colors text-sm font-medium mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Architecture
        </Link>

        {/* Case Study Hero */}
        <header className="mb-16 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {project.name}
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </header>

        {/* Highlights Metrics Grid */}
        {project.highlights.length > 0 && (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            {project.highlights.map(function (highlight) {
              return (
                <div
                  key={highlight.label}
                  className="p-6 rounded-xl bg-surface-50 border border-surface-200 card-gradient-border"
                >
                  <div className="text-2xl font-bold text-brand-400 mb-1">{highlight.value}</div>
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    {highlight.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Deep Dive Content */}
        <div className="space-y-16 animate-fade-in-up" style={{ animationDelay: "200ms" }}>

          {/* Executive Summary */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <LayoutGrid className="w-6 h-6 text-brand-500" /> Executive Summary
            </h2>
            <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200 card-gradient-border text-neutral-300 leading-relaxed text-lg">
              {project.description}
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-brand-500" /> Technical Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map(function (tech) {
                return (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-100 border border-surface-200 text-neutral-300 font-mono text-sm"
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
              <h3 className="text-lg font-bold text-white mb-1">
                Require a similar architecture?
              </h3>
              <p className="text-sm text-neutral-400">
                Let&apos;s scope out your technical requirements.
              </p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 rounded-lg bg-surface-100 border border-surface-200 text-white font-medium hover:bg-surface-200 transition-colors group"
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
      </div>
    </div>
  );
}
