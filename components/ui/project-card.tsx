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
    <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-md">
      {/* Gradient placeholder area */}
      <div className="relative h-48 bg-gradient-to-br from-brand-500 to-brand-700 p-6 flex items-end">
        <div>
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {category}
          </span>
          <h3 className="mt-2 text-2xl font-bold text-white">{name}</h3>
          <p className="mt-1 text-sm text-brand-100">{tagline}</p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>

        {/* Tech pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map(function (tech) {
            return (
              <span
                key={tech}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
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
                <div className="text-lg font-bold text-slate-900">
                  {highlight.value}
                </div>
                <div className="text-xs text-slate-500">{highlight.label}</div>
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
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
          >
            Visit Site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
