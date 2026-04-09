"use client";

import { motion } from "framer-motion";

const TOOLS = [
  { name: "React", icon: "⚛️", size: "lg", x: 10, y: 8 },
  { name: "Next.js", icon: "▲", size: "lg", x: 55, y: 5 },
  { name: "TypeScript", icon: "TS", size: "md", x: 80, y: 20 },
  { name: "Node.js", icon: "⬡", size: "md", x: 5, y: 40 },
  { name: "Python", icon: "🐍", size: "sm", x: 35, y: 30 },
  { name: "PostgreSQL", icon: "🐘", size: "md", x: 70, y: 42 },
  { name: "Tailwind", icon: "🌊", size: "sm", x: 20, y: 65 },
  { name: "Stripe", icon: "💳", size: "sm", x: 50, y: 58 },
  { name: "AI", icon: "🧠", size: "lg", x: 38, y: 78 },
  { name: "Vercel", icon: "▼", size: "sm", x: 75, y: 70 },
  { name: "Docker", icon: "🐳", size: "sm", x: 8, y: 85 },
  { name: "AWS", icon: "☁️", size: "md", x: 65, y: 88 },
  { name: "GitHub", icon: "⚙️", size: "sm", x: 90, y: 55 },
  { name: "Figma", icon: "🎨", size: "sm", x: 88, y: 8 },
  { name: "Redis", icon: "◆", size: "sm", x: 42, y: 48 },
  { name: "OpenAI", icon: "✦", size: "md", x: 15, y: 25 },
];

const sizeClasses = {
  sm: "w-10 h-10 text-xs",
  md: "w-14 h-14 text-sm",
  lg: "w-16 h-16 text-base",
};

export function HeroVisual() {
  return (
    <div className="relative w-full aspect-square">
      {/* Background glow */}
      <div className="absolute inset-0 bg-brand-500/5 rounded-3xl rotate-6" />
      <div className="absolute inset-4 bg-surface-50 rounded-2xl border border-surface-200 overflow-hidden">
        {/* Floating tool icons */}
        {TOOLS.map((tool, i) => (
          <motion.div
            key={tool.name}
            className={`absolute flex flex-col items-center justify-center rounded-xl bg-surface-100 border border-surface-200 hover:border-brand-500/30 transition-colors cursor-default ${sizeClasses[tool.size as keyof typeof sizeClasses]}`}
            style={{ left: `${tool.x}%`, top: `${tool.y}%` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3 + i * 0.08,
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ scale: 1.15, y: -4 }}
          >
            <span className="text-lg leading-none" role="img" aria-label={tool.name}>
              {tool.icon}
            </span>
          </motion.div>
        ))}

        {/* Connecting lines (decorative) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="18%" y1="15%" x2="40%" y2="35%" stroke="var(--color-surface-300)" strokeWidth="1" opacity="0.4" />
          <line x1="60%" y1="10%" x2="42%" y2="35%" stroke="var(--color-surface-300)" strokeWidth="1" opacity="0.3" />
          <line x1="42%" y1="35%" x2="45%" y2="55%" stroke="var(--color-brand-500)" strokeWidth="1" opacity="0.3" />
          <line x1="45%" y1="55%" x2="44%" y2="82%" stroke="var(--color-surface-300)" strokeWidth="1" opacity="0.4" />
          <line x1="75%" y1="47%" x2="45%" y2="55%" stroke="var(--color-surface-300)" strokeWidth="1" opacity="0.3" />
          <line x1="10%" y1="45%" x2="40%" y2="35%" stroke="var(--color-surface-300)" strokeWidth="1" opacity="0.2" />
          <line x1="85%" y1="25%" x2="75%" y2="47%" stroke="var(--color-surface-300)" strokeWidth="1" opacity="0.2" />
        </svg>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-accent-400/5 pointer-events-none" />
      </div>
    </div>
  );
}
