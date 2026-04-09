"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TOOLS = [
  { name: "React", file: "react.svg", color: "#61DAFB" },
  { name: "Next.js", file: "nextjs.svg", color: "#ffffff" },
  { name: "Vercel", file: "vercel.svg", color: "#ffffff" },
  { name: "TypeScript", file: "typescript.svg", color: "#3178C6" },
  { name: "Tailwind CSS", file: "tailwindcss.svg", color: "#06B6D4" },
  { name: "Supabase", file: "supabase.svg", color: "#3ECF8E" },
  { name: "Stripe", file: "stripe.svg", color: "#635BFF" },
  { name: "OpenAI", file: "openai.svg", color: "#10A37F" },
  { name: "Anthropic", file: "anthropic.svg", color: "#D4A574" },
  { name: "Railway", file: "railway.svg", color: "#ffffff" },
  { name: "Neon", file: "neon.svg", color: "#00E599" },
  { name: "Telnyx", file: "telnyx.svg", color: "#00C08B" },
  { name: "PostgreSQL", file: "postgresql.svg", color: "#4169E1" },
  { name: "Python", file: "python.svg", color: "#3776AB" },
  { name: "Node.js", file: "nodejs.svg", color: "#5FA04E" },
  { name: "Docker", file: "docker.svg", color: "#2496ED" },
];

export function HeroVisual() {
  return (
    <div className="relative w-full aspect-square">
      {/* Background glow */}
      <div className="absolute inset-0 bg-brand-500/5 rounded-3xl rotate-6" />

      {/* Main container */}
      <div className="absolute inset-4 bg-surface-50 rounded-2xl border border-surface-200 overflow-hidden p-5">
        {/* Logo grid */}
        <div className="grid grid-cols-4 gap-3 h-full content-center">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-surface-100 border border-surface-200 hover:border-brand-500/30 transition-colors cursor-default aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4 + i * 0.05,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ scale: 1.08, y: -2 }}
            >
              <div className="w-7 h-7 relative" style={{ color: tool.color }}>
                <Image
                  src={`/images/logos/${tool.file}`}
                  alt={tool.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-muted text-[9px] font-medium leading-none text-center truncate w-full">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/3 via-transparent to-accent-400/3 pointer-events-none rounded-2xl" />
      </div>
    </div>
  );
}
