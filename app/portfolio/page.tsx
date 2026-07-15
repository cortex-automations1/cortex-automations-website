import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = createMetadata({
  title: "Portfolio",
  description:
    "Real projects we've built for real businesses — SaaS platforms, websites, and custom software.",
  path: "/portfolio",
});

const PROJECT_ICONS: Record<string, LucideIcon> = {
  quotehq: Layers,
};

const SAAS_CATEGORIES = new Set(["SaaS Platform", "Web App"]);

type Project = (typeof PROJECTS)[number];

function ProjectCard({
  project,
  isFeatured,
}: {
  project: Project;
  isFeatured: boolean;
}) {
  const Icon = PROJECT_ICONS[project.slug] ?? Sparkles;
  const href = project.link ?? "#";
  const status = (project as { status?: string }).status;

  return (
    <a
      href={href}
      target={project.link ? "_blank" : undefined}
      rel={project.link ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative rounded-2xl border border-surface-200 bg-surface-50 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col h-full",
        isFeatured && "bg-surface-100",
      )}
    >
      {project.image ? (
        <div className={cn(
          "relative w-full overflow-hidden bg-surface-200",
          isFeatured ? "aspect-[2.4/1]" : "aspect-[1.9/1]",
        )}>
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            sizes={isFeatured ? "100vw" : "(min-width: 768px) 33vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={isFeatured}
          />
          {isFeatured && (
            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-0/90 backdrop-blur text-brand-500 text-xs font-mono uppercase tracking-wider border border-brand-500/20">
              <Sparkles className="w-3 h-3" /> Featured Project
            </span>
          )}
        </div>
      ) : (
        <div className="relative flex justify-between items-start p-8 pb-0">
          <div className="p-3 bg-surface-200 rounded-xl border border-surface-300">
            <Icon className="w-6 h-6 text-brand-500" />
          </div>
          {isFeatured && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-mono uppercase tracking-wider border border-brand-500/20">
              <Sparkles className="w-3 h-3" /> Featured Project
            </span>
          )}
        </div>
      )}

      <div className="relative z-10 p-8 flex-1 flex flex-col justify-end">
        {status ? (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-amber-400">
            {status}
          </span>
        ) : null}
        <p className="text-brand-400 text-sm font-mono mb-2 uppercase tracking-wider">
          {project.category}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-heading mb-2">
          {project.name}
        </h3>
        <p className="text-body max-w-md">{project.tagline}</p>

        <div className="mt-6 flex items-center text-heading text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          View Project <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </div>
    </a>
  );
}

function ProjectSection({
  id,
  title,
  description,
  projects,
  featureFirst = false,
}: {
  id: string;
  title: string;
  description: string;
  projects: Project[];
  featureFirst?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-heading mb-3 tracking-tight">
          {title}
        </h2>
        <p className="text-body max-w-2xl leading-relaxed">{description}</p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(function (project, index) {
          const isFeatured = featureFirst && index === 0;

          return (
            <StaggerItem
              key={project.slug}
              className={cn(isFeatured && "md:col-span-3")}
            >
              <ProjectCard project={project} isFeatured={isFeatured} />
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}

export default function PortfolioPage() {
  const saasProjects = PROJECTS.filter((p) => SAAS_CATEGORIES.has(p.category));
  const websiteProjects = PROJECTS.filter(
    (p) => !SAAS_CATEGORIES.has(p.category),
  );

  return (
    <>
      <div className="relative overflow-hidden bg-surface-0 section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <h1 className="text-5xl md:text-7xl font-bold text-heading mb-6 tracking-tight">
              Our <span className="brand-underline">Work</span>
            </h1>
            <p className="text-body text-xl max-w-2xl leading-relaxed">
              Real projects we&apos;ve built for real businesses. Take a look around.
            </p>
          </header>

          <div className="space-y-20 md:space-y-28">
            <ProjectSection
              id="saas"
              title="SaaS Apps"
              description="Products we're building and operating — multi-tenant platforms that run entire businesses."
              projects={saasProjects}
              featureFirst
            />

            <ProjectSection
              id="websites"
              title="Websites"
              description="Fast, conversion-focused marketing sites we've designed and built for clients."
              projects={websiteProjects}
            />
          </div>
        </div>
      </div>
    </>
  );
}
