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
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white section-padding">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-brand-100/40 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Real platforms built for real businesses. Here&apos;s a look at some of the
            projects we&apos;ve designed, developed, and shipped to production.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
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
