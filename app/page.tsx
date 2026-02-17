import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { CTASection } from "@/components/sections/cta-section";
import {
  SERVICES,
  PROJECTS,
  PROCESS_STEPS,
  TECH_STACK,
  STATS,
  CAL_LINK,
} from "@/lib/constants";

export default function HomePage() {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        {/* Background effects */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-brand-500/8 blur-[120px]" />
          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
            Design With Intelligence
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            We Build Software{" "}
            <span className="text-gradient">That Scales</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 sm:text-xl">
            Full-stack development agency specializing in SaaS platforms, mobile apps,
            web design, and AI automation. From concept to production, we ship.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200"
            >
              Book a Discovery Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/15 px-8 text-base font-semibold text-neutral-300 transition-all hover:border-white/30 hover:text-white hover:bg-white/5"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Build"
            subtitle="End-to-end development services for businesses that need reliable, scalable software."
          />
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(function (service) {
              return (
                <ServiceCard
                  key={service.slug}
                  name={service.name}
                  shortDescription={service.shortDescription}
                  icon={service.icon}
                  slug={service.slug}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5 bg-surface-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <SectionHeading
              title="Featured Projects"
              subtitle="A selection of platforms we've designed, built, and shipped."
              centered={false}
            />
            <Link
              href="/portfolio"
              className="hidden items-center gap-1 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map(function (project) {
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
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-400"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How We Work"
            subtitle="A proven process that keeps projects on track and stakeholders aligned."
          />
          <div className="relative mt-16">
            {/* Connecting line (desktop) */}
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent lg:block" />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map(function (step) {
                return (
                  <div key={step.number} className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand-500/30 bg-surface-100 text-xl font-bold text-brand-400 glow-brand-sm">
                      {step.number}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5 bg-surface-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Tech Stack"
            subtitle="We use modern, battle-tested technologies to build reliable software."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map(function (group) {
              return (
                <div key={group.category}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                    {group.category}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map(function (item) {
                      return (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-300"
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative border-y border-white/5 py-16 lg:py-20">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[600px] rounded-full bg-brand-500/5 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map(function (stat) {
              return (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-white sm:text-5xl">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
