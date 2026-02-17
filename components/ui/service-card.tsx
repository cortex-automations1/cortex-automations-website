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
      className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-200"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {shortDescription}
      </p>
    </Link>
  );
}
