import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/project-card";
import { CTASection } from "@/components/sections/cta-section";
import { PROJECTS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Portfolio",
  description:
    "See our work: SaaS platforms, monitoring tools, and workflow automation systems built for real businesses.",
  path: "/portfolio",
});

export default function PortfolioPage() {
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
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
            Real platforms built for real businesses. Here&apos;s a look at some of the
            projects we&apos;ve designed, developed, and shipped to production.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map(function (project) {
              return (
                <ProjectCard
                  key={project.slug}
                  name={project.name}
                  category={project.category}
                  tagline={project.tagline}
                  description={project.description}
                  techStack={project.techStack}
                  highlights={project.highlights}
                  link={project.link}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Want to see your project here?"
        subtitle="Let's build something worth showcasing."
      />
    </>
  );
}
