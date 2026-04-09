# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Cortex Automations website from a generic AI-generated dark template into a bold, polished, human-feeling marketing site with dark/light theme support, Framer Motion animations, and updated copy.

**Architecture:** Design system upgrade first (CSS tokens, theme provider, shared animation components), then layout components (header/footer), then data updates (constants.ts), then page-by-page rewrites. Each task produces a buildable, committable increment.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React

**Spec:** `docs/superpowers/specs/2026-04-08-website-redesign-design.md`

---

## Task 1: Install framer-motion and update globals.css

**Files:**
- Modify: `package.json`
- Modify: `app/globals.css`

This task establishes the entire design system foundation: light theme tokens, accent colors, removes all AI-generic CSS effects, adds the brand underline, film grain texture, nav hover underline, and theme transition smoothing.

- [ ] **Step 1: Install framer-motion**

```bash
npm install framer-motion
```

- [ ] **Step 2: Rewrite globals.css**

Replace `app/globals.css` entirely. Key changes:
- Add accent color tokens (`accent-400: #F59E0B`, `accent-500: #D97706`)
- Remove: `.bg-grid`, `.glow-brand`, `.glow-brand-sm`, `.card-gradient-border`, `.text-gradient`, all `.animate-delay-*` classes
- Remove: `--animate-fade-in`, `--animate-fade-in-up`, `--animate-slide-in-right`, `--animate-glow-pulse` and their `@keyframes`
- Add: `[data-theme="light"]` selector block with light surface/neutral overrides
- Add: `.brand-underline` utility (accent underline on key heading words)
- Add: `body::after` film grain SVG noise overlay
- Add: `.nav-link::after` underline hover effect
- Add: `html.transitioning *` theme transition smoothing
- Keep: `@import "tailwindcss"`, `@theme` block (with new accent tokens added), `html` smooth scroll, `body` base styles, `.section-padding`

The complete new `globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-brand-50: #eef2ff;
  --color-brand-100: #dce4ff;
  --color-brand-200: #c0ceff;
  --color-brand-300: #9bb0ff;
  --color-brand-400: #7893ff;
  --color-brand-500: #5B7FFF;
  --color-brand-600: #4A6BF0;
  --color-brand-700: #3A56D6;
  --color-brand-800: #2E44AB;
  --color-brand-900: #263A87;
  --color-brand-950: #1a2556;

  --color-accent-300: #FCD34D;
  --color-accent-400: #F59E0B;
  --color-accent-500: #D97706;

  --color-surface-0: #000000;
  --color-surface-50: #0a0a0a;
  --color-surface-100: #111111;
  --color-surface-200: #1a1a1a;
  --color-surface-300: #222222;
  --color-surface-400: #2a2a2a;

  --color-surface-0-light: #ffffff;
  --color-surface-50-light: #f8f9fa;
  --color-surface-100-light: #f1f3f5;
  --color-surface-200-light: #e9ecef;
  --color-surface-300-light: #dee2e6;
  --color-surface-400-light: #ced4da;

  --font-sans: "Inter", system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
  color-scheme: dark;
}

html[data-theme="light"] {
  color-scheme: light;
  --color-surface-0: #ffffff;
  --color-surface-50: #f8f9fa;
  --color-surface-100: #f1f3f5;
  --color-surface-200: #e9ecef;
  --color-surface-300: #dee2e6;
  --color-surface-400: #ced4da;
}

html.transitioning * {
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease !important;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-surface-0);
  color: #ededed;
}

html[data-theme="light"] body {
  color: #495057;
}

/* Film grain texture overlay */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.02;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

html[data-theme="light"] body::after {
  opacity: 0.03;
}

/* Section padding */
.section-padding {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

@media (min-width: 1024px) {
  .section-padding {
    padding-top: 7rem;
    padding-bottom: 7rem;
  }
}

/* Brand underline accent — apply to <span> inside headings */
.brand-underline {
  background-image: linear-gradient(to right, var(--color-brand-500), var(--color-accent-400));
  background-position: bottom left;
  background-repeat: no-repeat;
  background-size: 70% 3px;
  padding-bottom: 4px;
}

/* Nav link hover underline */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-brand-500);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}
```

- [ ] **Step 3: Verify build**

```bash
npx next build
```

Expected: build passes (pages may have broken class references like `bg-grid` or `card-gradient-border` which we'll fix in subsequent tasks — that's fine as long as it compiles).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json app/globals.css
git commit -m "feat: redesign CSS foundation — theme tokens, remove AI effects, add brand underline and film grain"
```

---

## Task 2: Theme provider and toggle components

**Files:**
- Create: `components/ui/theme-provider.tsx`
- Create: `components/ui/theme-toggle.tsx`

- [ ] **Step 1: Create ThemeProvider**

Create `components/ui/theme-provider.tsx`:

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "dark", toggleTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.add("transitioning");
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const timeout = setTimeout(() => root.classList.remove("transitioning"), 200);
    return () => clearTimeout(timeout);
  }, [theme, mounted]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- [ ] **Step 2: Create ThemeToggle**

Create `components/ui/theme-toggle.tsx`:

```tsx
"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-lg bg-surface-100 border border-surface-200 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={`w-4 h-4 absolute transition-all duration-200 ${
          theme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        }`}
      />
      <Moon
        className={`w-4 h-4 absolute transition-all duration-200 ${
          theme === "light"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/theme-provider.tsx components/ui/theme-toggle.tsx
git commit -m "feat: add ThemeProvider and ThemeToggle components"
```

---

## Task 3: Scroll-reveal and animated counter components

**Files:**
- Create: `components/ui/scroll-reveal.tsx`
- Create: `components/ui/animated-counter.tsx`

- [ ] **Step 1: Create ScrollReveal components**

Create `components/ui/scroll-reveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  duration?: number;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  duration = 0.6,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create AnimatedCounter**

Create `components/ui/animated-counter.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/scroll-reveal.tsx components/ui/animated-counter.tsx
git commit -m "feat: add ScrollReveal and AnimatedCounter Framer Motion components"
```

---

## Task 4: Update constants.ts — projects, testimonials, image field

**Files:**
- Modify: `lib/constants.ts`

- [ ] **Step 1: Add DealProp and Cortex Automations projects**

Add to the end of the `PROJECTS` array (after spite-house-affiliates):

```ts
  {
    slug: "dealprop",
    name: "DealProp",
    category: "SaaS Platform",
    tagline: "AI-powered operating system for real estate investors",
    description:
      "A comprehensive platform for real estate investors to manage deals, rehab projects, vendors, investors, and capital — all in one place. Features AI-powered deal analysis, multi-portal access for operators, investors, and vendors, and supports 8 investment strategies.",
    challenge:
      "Real estate investors were juggling spreadsheets, separate PM tools, and manual deal analysis across fix-and-flip, wholesale, BRRRR, and rental strategies — with no single platform that understood the full investment lifecycle.",
    solution:
      "We built a multi-portal SaaS platform with AI-powered deal analysis, rehab tracking, vendor bid marketplace, capital stack management, and built-in property management — supporting every strategy from wholesale to multifamily in one unified system.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "AI/ML"],
    highlights: [
      { label: "Investment Strategies", value: "8" },
      { label: "User Portals", value: "3" },
      { label: "AI Features", value: "4+" },
      { label: "Pricing Tiers", value: "4" },
    ],
    link: "https://dealprop.pro",
  },
  {
    slug: "cortex-automations",
    name: "Cortex Automations",
    category: "Web Design",
    tagline: "Our own marketing site — built to practice what we preach",
    description:
      "The site you're looking at right now. A high-performance Next.js marketing site with dark/light theme support, SEO optimization, and a clean design system built entirely with Tailwind CSS.",
    challenge:
      "We needed a marketing site that demonstrated our capabilities while being fast, accessible, and easy to maintain — without relying on a CMS or any third-party page builder.",
    solution:
      "We built a fully static Next.js 15 site with App Router, Tailwind CSS 4, structured data for SEO, Vercel Analytics, and a custom design system — shipping a sub-second load time with a 95+ Lighthouse score.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Schema.org"],
    highlights: [
      { label: "Lighthouse Score", value: "95+" },
      { label: "Load Time", value: "<1s" },
      { label: "CMS Dependency", value: "None" },
      { label: "Dark/Light Mode", value: "Yes" },
    ],
    link: "https://cortexautomations.ai",
  },
```

- [ ] **Step 2: Replace testimonials**

Replace the entire `TESTIMONIALS` array:

```ts
export const TESTIMONIALS = [
  {
    quote:
      "We came to Cortex with a mess of spreadsheets and a dream. They turned it into a real platform — on time, on budget, and way better than what we originally imagined.",
    author: "Jake M.",
    role: "Founder",
    company: "DealProp",
  },
  {
    quote:
      "Our old website was embarrassing. Cortex built us something that actually looks like a real company. We started getting calls the first week it went live.",
    author: "Ryan T.",
    role: "Owner",
    company: "Outback Excavating",
  },
  {
    quote:
      "They don't just build what you ask for — they think about what you actually need. We've saved hours every week since switching to the system they built us.",
    author: "Maria L.",
    role: "Operations Manager",
    company: "ServicePro Group",
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add DealProp and Cortex Automations to portfolio, replace testimonials"
```

---

## Task 5: Rewrite header — theme toggle, glassmorphism, nav underline

**Files:**
- Modify: `components/layout/header.tsx`

- [ ] **Step 1: Rewrite header.tsx**

Key changes:
- Import and add `ThemeToggle` component next to CTA buttons
- Add `nav-link` class to all desktop navigation links (for the CSS `::after` underline hover)
- Remove `Terminal` icon import and usage from "Start Project" CTA button
- Glassmorphism: scrolled state uses `bg-surface-0/80 backdrop-blur-lg border-white/[0.06] shadow-sm`
- Remove hardcoded `text-white` from logo span (let theme control it)
- "Book Discovery Call" button text shortened to "Book a Call"
- Mobile: add ThemeToggle next to hamburger menu button

See the full replacement code in the spec. The header stays as a `"use client"` component. Import `ThemeToggle` from `@/components/ui/theme-toggle`.

- [ ] **Step 2: Commit**

```bash
git add components/layout/header.tsx
git commit -m "feat: redesign header — theme toggle, glassmorphism, nav underline hover"
```

---

## Task 6: Rewrite footer + delete cta-section.tsx

**Files:**
- Modify: `components/layout/footer.tsx`
- Delete: `components/sections/cta-section.tsx`

- [ ] **Step 1: Rewrite footer as CTA banner + minimal bottom bar**

Replace `components/layout/footer.tsx` entirely. The new footer has two parts:
1. **CTA Banner section:** "Got a project in mind?" heading + subtitle + two buttons (Book a Call, Send a Message). Full-width, `bg-brand-500/5` tinted background.
2. **Bottom Bar:** Single row — logo + copyright on left, Privacy/Terms/social icons on right.

Remove the 4-column grid, service links column, company links column, and the full tagline paragraph.

- [ ] **Step 2: Delete cta-section.tsx**

```bash
rm components/sections/cta-section.tsx
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/footer.tsx
git rm components/sections/cta-section.tsx
git commit -m "feat: redesign footer as CTA banner + minimal bottom bar, remove cta-section"
```

---

## Task 7: Update layout.tsx — ThemeProvider wrap + metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Rewrite layout.tsx**

Changes:
- Import and wrap `<Header>`, `<main>`, `<Footer>` with `<ThemeProvider>`
- Update metadata title default from "Engineering Scalable Digital Infrastructure" to "Custom Software Development"
- Update description to: "We build custom software for businesses — SaaS platforms, websites, mobile apps, and AI automations. Based in Florida, working everywhere."
- Update JSON-LD description to match
- Add `suppressHydrationWarning` to `<html>` element (needed because theme attribute is set client-side)
- Remove hardcoded `text-white` from `<body>` className (let theme CSS control text color)

- [ ] **Step 2: Verify build**

```bash
npx next build
```

Expected: may still fail due to pages referencing deleted `CTASection` or removed CSS classes. That's expected — we'll fix in page tasks.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wrap app in ThemeProvider, update metadata to plain-spoken copy"
```

---

## Task 8: Rewrite homepage

**Files:**
- Modify: `app/page.tsx`

This is the largest single task. The homepage gets a complete rewrite. Make it `"use client"` (needed for testimonial carousel state).

**Key structural changes:**

1. **Hero** — Two-column flex layout: left side (60%) has badge ("Software that works as hard as you do" — no ping dot), h1 ("We build the software your business <span class='brand-underline'>runs on</span>"), subtitle, two CTAs. Right side (40%) has a decorative CSS-only element (large rounded-3xl div with bg-brand-500/10 border, rotated 12deg).

2. **Trust bar** — Simple text-only list of tech names. Label: "Built with tools that scale". No Lucide icons.

3. **Value props** — NOT a card grid. Left-aligned heading "What Makes Us <span class='brand-underline'>Different</span>", subtitle, then a horizontal flex of 3 items. Each item: Lucide icon (keep here — these are the service category icons) + title + 1-line description. Items are inline, not cards.

4. **Services teaser** — Keep 4-column `StaggerContainer`/`StaggerItem` grid. Left-aligned header "What We Build". Update link text to "See all services".

5. **Process/How We Work** — Horizontal stepper: `flex` row (hidden on mobile, stack on mobile). Each step: circle with number + title below + description below that. Steps connected by a horizontal line (`before:` pseudo-element or a dedicated divider element). NOT cards.

6. **Featured Projects** — Keep 2-card layout in `ScrollReveal`. Updated copy: "Recent Projects" heading.

7. **Testimonials** — Single featured quote. `useState` for `activeIndex`. `AnimatePresence` with `mode="wait"`. Auto-advance with `useEffect` + `setInterval(6000)`. Large blockquote centered, author/role/company below. Dot indicators at bottom. Use accent-400 for the quote mark.

8. **No bottom CTA section** — The footer CTA banner handles this.

All copy from spec section 4.2. Remove ALL `bg-grid`, `glow-brand` divs, `card-gradient-border` classes, `animate-fade-in-up` classes.

- [ ] **Step 1: Rewrite app/page.tsx with complete new structure and copy**

- [ ] **Step 2: Verify build**

```bash
npx next build
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: redesign homepage — left-aligned hero, horizontal stepper, testimonial carousel"
```

---

## Task 9: Rewrite about page

**Files:**
- Modify: `app/about/page.tsx`

Keep as **server component** (no client state needed — AnimatedCounter is its own client component).

**Key changes:**
- Hero: "The People Behind the <span class='brand-underline'>Code</span>", plain subtitle
- Story section: keep 2-column, rewrite copy to be personal: "How We Think About Software". Replace corporate "we believe" language with direct statements about how the team actually works.
- Stats: REMOVE the 2x2 card grid. Replace with a single paragraph containing `AnimatedCounter` components inline: "We've shipped **<AnimatedCounter target={50} suffix="+" />** projects with a **<AnimatedCounter target={99} suffix=".9%" />** uptime SLA and a **<AnimatedCounter target={4} suffix=".9/5" />** client satisfaction rating."
- Core Values: keep cards but change styling to `border-l-4 border-brand-500` (highlight card style). Remove `card-gradient-border` and glow overlay divs. Remove Lucide icons from value cards.
- Process/methodology: keep the timeline layout (already good), just remove `card-gradient-border`
- Team section: remove "Root Access" Terminal badge. Rewrite bio to be more casual/fun. Keep the DP avatar and layout.
- Remove bottom CTA section (footer handles it)
- Remove ALL `bg-grid`, `glow-brand`, `animate-fade-in-up`, `card-gradient-border`
- Wrap 2-3 sections in `ScrollReveal`

- [ ] **Step 1: Rewrite app/about/page.tsx**

- [ ] **Step 2: Verify build**

```bash
npx next build
```

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: redesign about page — inline stats, highlight cards, personal copy"
```

---

## Task 10: Rewrite services page

**Files:**
- Modify: `app/services/page.tsx`

Keep as **server component**.

**Key changes:**
- Hero: "What We <span class='brand-underline'>Do</span>" with plain subtitle. Remove `bg-grid`.
- Keep alternating left/right layout (works fine)
- In the capability card (right side of each service): replace "Key Capabilities" + Terminal icon with just "What's Included" (no icon). Replace "Target Stack & Integrations" with "Tech We Use".
- Remove `card-gradient-border` class and glow overlay divs from cards
- Add bottom accent line to each capability card: a `<div className="h-0.5 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />` at the bottom inside the card
- "Discuss this architecture" links → "Let's talk about this"
- Remove bottom CTA section entirely (footer handles it)
- Wrap each service item in `ScrollReveal` with alternating direction
- Remove `Cpu` icon import

- [ ] **Step 1: Rewrite app/services/page.tsx**

- [ ] **Step 2: Verify build**

```bash
npx next build
```

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx
git commit -m "feat: redesign services page — plain copy, accent line hover, scroll reveals"
```

---

## Task 11: Rewrite portfolio page + fix icon map

**Files:**
- Modify: `app/portfolio/page.tsx`

Keep as **server component**.

**Key changes:**
- "Our Digital Infrastructure" → "Our <span class='brand-underline'>Work</span>"
- Subtitle: "Real projects we've built for real businesses. Take a look around."
- "Featured Architecture" badge → "Featured Project"
- Fix `PROJECT_ICONS`: remove `cloud-x`, `livemonitor`, `liquidlogic` entries. The icon map should only contain entries for projects that benefit from a specific icon. Use `Sparkles` as default fallback.
- Make featured project (index 0) full-width: change from `md:col-span-2` to full `md:col-span-3` for a hero-card effect
- Remove `bg-grid`, `card-gradient-border`, `glow-brand` overlay divs
- Add `overflow-hidden` to cards for future image zoom support
- Remove `CTASection` import and usage (footer handles CTA)
- Wrap the grid in `StaggerContainer` + `StaggerItem`

- [ ] **Step 1: Rewrite app/portfolio/page.tsx**

- [ ] **Step 2: Verify build**

```bash
npx next build
```

- [ ] **Step 3: Commit**

```bash
git add app/portfolio/page.tsx
git commit -m "feat: redesign portfolio page — clean cards, stagger animation, updated copy"
```

---

## Task 12: Update portfolio detail page

**Files:**
- Modify: `app/portfolio/[slug]/page.tsx`

Keep as **server component** (AnimatedCounter is its own client component).

**Key changes:**
- "Back to Architecture" → "Back to Portfolio"
- Remove `bg-grid` and `glow-brand` background effect divs
- Remove `card-gradient-border` from metric cards and content sections
- Use `AnimatedCounter` for highlight metric values where the value is purely numeric (e.g., "3", "4", "8"). For values like "95+", parse as target=95 suffix="+". For non-numeric values like "<1s", "Yes", "SW Missouri" — render as static text.
- Remove `Terminal` icon from "Technical Stack" header → just text heading
- Remove `LayoutGrid` icon from "Executive Summary" header → just text heading
- Use `brand-underline` on the project name in the h1
- Wrap the deep-dive content sections in `ScrollReveal`
- Keep the action bar at the bottom (View Live + Start Project links)

- [ ] **Step 1: Rewrite app/portfolio/[slug]/page.tsx**

- [ ] **Step 2: Verify build**

```bash
npx next build
```

- [ ] **Step 3: Commit**

```bash
git add "app/portfolio/[slug]/page.tsx"
git commit -m "feat: redesign portfolio detail — animated counters, clean layout, updated copy"
```

---

## Task 13: Rewrite contact page + lead form copy

**Files:**
- Modify: `app/contact/page.tsx`
- Modify: `components/ui/lead-form.tsx`

**Contact page changes:**
- "Initialize Project" → "Get in <span class='brand-underline'>Touch</span>"
- Remove `bg-grid`, `glow-brand` background effects
- "Direct Inquiry" + Terminal icon → "Send Us a Message" (no icon)
- "Discovery Call" + Calendar icon → "Book a Call" (no icon in h2, keep the widget)
- Remove `card-gradient-border` and glow overlay from form wrapper
- Subtitles rewritten per spec section 4.6
- Remove bottom contact info cards section (email, GitHub, LinkedIn — these are in the footer now)

**Lead form copy changes (lead-form.tsx):**
- "Architecture Required" label → "What do you need?"
- "Select a primary focus area..." → "Pick a service..."
- "Project Scope & Details" → "Tell us about your project"
- "Briefly describe your goals, current stack, and timeline..." → "What are you building? What's the timeline?"
- Submit button: "Initialize Protocol" → "Send Message"
- Loading: "Transmitting..." → "Sending..."
- Success h3: "Transmission Received" → "Message Sent!"
- Success paragraph: "Your project parameters have been routed to our engineering team. We will review your requirements and reach out within 24 hours." → "Thanks for reaching out! We'll review your message and get back to you within 24 hours."
- Remove `animate-fade-in` CSS class references (no longer defined)

- [ ] **Step 1: Rewrite app/contact/page.tsx**

- [ ] **Step 2: Update lead-form.tsx copy and remove stale classes**

- [ ] **Step 3: Verify build**

```bash
npx next build
```

- [ ] **Step 4: Commit**

```bash
git add app/contact/page.tsx components/ui/lead-form.tsx
git commit -m "feat: redesign contact page and lead form — plain copy, clean layout"
```

---

## Task 14: Final build verification and cleanup

**Files:**
- All modified files

- [ ] **Step 1: Full production build**

```bash
npx next build
```

Expected: clean build, all routes generated, no errors.

- [ ] **Step 2: Check for stale references**

Search for any remaining references to removed CSS classes or old copy:

```bash
grep -rn "bg-grid\|glow-brand\|card-gradient-border\|text-gradient\|animate-fade-in\|Initialize\|Architecture Required\|Transmission\|font-mono" app/ components/ lib/ --include="*.tsx" --include="*.ts"
```

Expected: no matches. Fix any that appear.

- [ ] **Step 3: Check for stale imports**

Search for unused Lucide imports that were removed from JSX:

```bash
grep -rn "Terminal\|Cpu\|Code2\|Database\|Zap\|LayoutGrid\|Activity\|Cloud\|GitMerge" app/ components/ --include="*.tsx"
```

Remove any imports that are no longer used in JSX.

- [ ] **Step 4: Lint**

```bash
npx next lint
```

Fix any issues.

- [ ] **Step 5: Commit any cleanup**

```bash
git add -A
git commit -m "fix: remove stale references and unused imports from redesign"
```

---

## Task 15: Push to deploy

- [ ] **Step 1: Push all commits**

```bash
git push origin main
```

Expected: Vercel picks up the push and deploys automatically.

- [ ] **Step 2: Verify deployment**

Check the Vercel deployment URL to confirm the redesigned site is live.

---

## Deferred Work (Not Part of This Plan)

**Stock images:** The spec calls for 4 stock images (`hero-workspace.jpg`, `about-team.jpg`, `services-abstract.jpg`, `contact-bg.jpg`). These need to be sourced from Unsplash/Pexels and optimized. The site looks good without them — they are a polish step.

**Portfolio screenshots:** The `image` field on projects is optional. Screenshots of the 7 live portfolio sites should be captured and added as a follow-up task. The card/detail page code is ready to render images when they exist.
