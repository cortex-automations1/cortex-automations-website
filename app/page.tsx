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
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white section-padding">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-brand-100/40 blur-3xl" />
          <div className="absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-brand-50/60 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Design With Intelligence
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            We Build Software{" "}
            <span className="text-gradient">That Scales</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Full-stack development agency specializing in SaaS platforms, mobile apps,
            web design, and AI automation. From concept to production, we ship.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-600 px-8 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
            >
              Book a Discovery Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-slate-300 px-8 text-base font-semibold text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-600"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Build"
            subtitle="End-to-end development services for businesses that need reliable, scalable software."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <SectionHeading
              title="Featured Projects"
              subtitle="A selection of platforms we've designed, built, and shipped."
              centered={false}
            />
            <Link
              href="/portfolio"
              className="hidden items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
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
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How We Work"
            subtitle="A proven process that keeps projects on track and stakeholders aligned."
          />
          <div className="relative mt-16">
            {/* Connecting line (desktop) */}
            <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 lg:block" />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map(function (step) {
                return (
                  <div key={step.number} className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white shadow-lg shadow-brand-600/25">
                      {step.number}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
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
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Tech Stack"
            subtitle="We use modern, battle-tested technologies to build reliable software."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map(function (group) {
              return (
                <div key={group.category}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    {group.category}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map(function (item) {
                      return (
                        <span
                          key={item}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
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
      <section className="bg-navy-900 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map(function (stat) {
              return (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-white sm:text-5xl">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
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
