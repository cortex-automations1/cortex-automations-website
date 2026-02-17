import Link from "next/link";
import {
  Layers,
  Smartphone,
  Monitor,
  Brain,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Smartphone,
  Monitor,
  Brain,
  MessageSquare,
};

interface ServiceCardProps {
  name: string;
  shortDescription: string;
  icon: string;
  slug: string;
}

export function ServiceCard({ name, shortDescription, icon, slug }: ServiceCardProps) {
  const Icon = ICON_MAP[icon] || Layers;

  return (
    <Link
      href={`/services#${slug}`}
      className="card-gradient-border group p-6 transition-all hover:bg-surface-200"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500/20">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
        {shortDescription}
      </p>
    </Link>
  );
}
