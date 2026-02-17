import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  name: string;
  category: string;
  tagline: string;
  description: string;
  techStack: string[];
  highlights: { label: string; value: string }[];
  link?: string;
}

export function ProjectCard({
  name,
  category,
  tagline,
  description,
  techStack,
  highlights,
  link,
}: ProjectCardProps) {
  return (
    <div className="card-gradient-border group overflow-hidden transition-all hover:bg-surface-200">
      {/* Gradient header area */}
      <div className="relative h-48 bg-gradient-to-br from-brand-600/40 via-brand-500/20 to-purple-500/10 p-6 flex items-end">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {category}
          </span>
          <h3 className="mt-2 text-2xl font-bold text-white">{name}</h3>
          <p className="mt-1 text-sm text-neutral-300">{tagline}</p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-relaxed text-neutral-400">{description}</p>

        {/* Tech pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map(function (tech) {
            return (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
              >
                {tech}
              </span>
            );
          })}
        </div>

        {/* Highlights grid */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {highlights.map(function (highlight) {
            return (
              <div key={highlight.label}>
                <div className="text-lg font-bold text-white">
                  {highlight.value}
                </div>
                <div className="text-xs text-neutral-500">{highlight.label}</div>
              </div>
            );
          })}
        </div>

        {/* Link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
          >
            Visit Site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
