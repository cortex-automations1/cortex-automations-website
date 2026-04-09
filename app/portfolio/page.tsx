import type { Metadata } from "next";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = createMetadata({
  title: "Portfolio",
  description:
    "See our work: SaaS platforms, monitoring tools, and workflow automation systems built for real businesses.",
  path: "/portfolio",
});

const PROJECT_ICONS: Record<string, LucideIcon> = {
  "signflow-pro": Layers,
};

export default function PortfolioPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-surface-0 section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Our <span className="brand-underline">Work</span>
            </h1>
            <p className="text-neutral-400 text-xl max-w-2xl leading-relaxed">
              Real projects we&apos;ve built for real businesses. Take a look around.
            </p>
          </header>

          {/* Bento Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map(function (project, index) {
              const Icon = PROJECT_ICONS[project.slug] ?? Sparkles;
              const isFeatured = index === 0;
              const href = project.link ?? "#";

              return (
                <StaggerItem
                  key={project.slug}
                  className={cn(
                    isFeatured && "md:col-span-3",
                  )}
                >
                  <a
                    href={href}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    className={cn(
                      "group relative p-8 rounded-2xl border border-surface-200 bg-surface-50 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col justify-between min-h-[280px]",
                      isFeatured && "bg-surface-100",
                    )}
                  >
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="p-3 bg-surface-200 rounded-xl border border-surface-300">
                        <Icon className="w-6 h-6 text-brand-500" />
                      </div>
                      {isFeatured && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-mono uppercase tracking-wider border border-brand-500/20">
                          <Sparkles className="w-3 h-3" /> Featured Project
                        </span>
                      )}
                    </div>

                    <div className="relative z-10 mt-auto pt-8">
                      <p className="text-brand-400 text-sm font-mono mb-2 uppercase tracking-wider">
                        {project.category}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {project.name}
                      </h3>
                      <p className="text-neutral-400 max-w-md">{project.tagline}</p>

                      <div className="mt-6 flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Project <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </>
  );
}
