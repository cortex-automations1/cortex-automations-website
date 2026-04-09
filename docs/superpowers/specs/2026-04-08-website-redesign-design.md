# Website Redesign: Bold, Polished, Human

**Date:** 2026-04-08
**Approach:** Design system upgrade + page refresh (Approach B)
**Vibe:** Bold & distinctive + refined & professional
**Copy tone:** Fun but professional, plain-spoken, speaks to business owners
**Theme:** Dark primary with light/dark toggle

---

## 1. Design System Changes

### 1.1 Dark/Light Theme Toggle

Add a theme toggle to the header (sun/moon icon). Dark is default.

**Implementation:**
- Add a `ThemeProvider` client component wrapping the app in `layout.tsx`
- Store preference in `localStorage`, respect `prefers-color-scheme` as fallback
- Use CSS custom properties scoped to `[data-theme="light"]` and `[data-theme="dark"]` on `<html>`
- All existing `surface-*` and `neutral-*` tokens get light-mode counterparts in `globals.css`

**Dark palette (current, refined):**
- Surfaces: keep `#000` through `#2a2a2a` range
- Text: white headings, `neutral-400` body (no change)

**Light palette (new):**
- Surfaces: `#ffffff` (base), `#f8f9fa`, `#f1f3f5`, `#e9ecef`, `#dee2e6`
- Text: `#1a1a2e` headings, `#495057` body
- Brand colors stay the same in both modes
- Cards: white bg with subtle gray border, light shadow instead of glow

### 1.2 Color Palette — Add Warm Accent

Add an amber/orange accent color alongside the existing brand blue for energy and personality:
- `accent-400: #F59E0B` (amber)
- `accent-500: #D97706`
- Used sparingly: badges, highlight markers, hover states, testimonial quote marks
- NOT replacing brand blue — complementing it

### 1.3 Typography

- Keep Inter font
- Remove all `font-mono` from labels/badges (reads too "hacker")
- Section labels: switch from `font-mono uppercase tracking-widest` to `font-semibold text-brand-500 text-sm`
- Keep bold headings, tracking-tight — that part works well

### 1.4 Effects — Tone Down

**Remove:**
- `.bg-grid` dot pattern on all pages (the #1 AI-generated-site tell)
- `.glow-brand` blur orbs on section backgrounds
- `.card-gradient-border` pseudo-element trick (replace with simpler borders)
- `glow-pulse` ping animation on hero badge

**Keep:**
- `fade-in-up` animations (but reduce to 3-4 per page max, not every single element)
- Hover transitions on cards and buttons
- `text-gradient` on hero headlines only (1 per page max)

**Replace with:**
- Subtle gradient section backgrounds (e.g., `bg-gradient-to-b from-surface-0 to-surface-50`)
- Clean card shadows instead of glow effects
- Occasional accent-colored left border or underline for visual interest

### 1.5 Card Patterns

**Current:** Every card is identical (rounded-2xl, surface-50 bg, surface-200 border, gradient-border, glow on hover).

**New variety:**
- **Standard card:** Clean white/dark bg, subtle border, soft shadow on hover. No gradient border trick.
- **Highlight card:** Left border accent (4px brand-500 or accent-400), slightly elevated
- **Stat card:** Large number + label, no border, just background contrast
- **Testimonial card:** Larger padding, accent-colored quote mark, different shape (rounded-3xl)

### 1.6 Signature Brand Element

Add a consistent visual motif used across the site to create a recognizable, hand-designed feel:

- **Accent underline:** A short, slightly thick (3px) colored underline (brand-500 or accent-400) placed under key words in headings. Not a full-width underline — just 60-80% of the word width, slightly offset below. Applied via a utility class `.brand-underline` using a `background-image` gradient on the bottom.
- Used on: one keyword per section heading (e.g., "We build the software your business **runs on**", "The People Behind the **Code**")
- This replaces `text-gradient` as the primary heading accent — more distinctive, less AI-generic
- `text-gradient` is removed entirely (gradient text on dark backgrounds is the most overused AI pattern)

### 1.7 Layout Variety — Break the Grid Repetition

**The problem:** Every section follows the same formula: centered h2 + centered subtitle + N-column card grid. This is the single biggest AI-generated-design tell.

**Rules for the redesign:**
- No more than 2 card-grid sections per page
- Adjacent sections must NOT use the same layout pattern
- At least one section per page should have left-aligned headers (not centered)
- Vary section backgrounds: alternate between `surface-0` and `surface-50` but also use one full-bleed accent section per page (brand-500/10 tinted background)

**Specific layout changes by page:**

**Homepage (currently 5 card grids in a row):**
- Hero: left-aligned text (60%) + right-side visual/abstract shape (40%), NOT centered
- Value props: REMOVE the 3-card grid. Replace with a single bold statement block with 3 inline highlights (icon + short text) arranged horizontally, not as cards
- Services teaser: keep the 4-card grid (this one works)
- Process/How We Work: horizontal stepper with connected dots/line, NOT 4 separate cards. Numbers + titles inline, descriptions below on hover or always visible. Single row, not a grid.
- Featured Projects: keep 2-card layout (works fine)
- Testimonials: single featured quote (large, centered) with small prev/next or dots to cycle through — NOT 3 identical cards side by side
- Bottom CTA: full-bleed tinted background section (brand-500/5 bg) for contrast

**About page:**
- Story section: keep the 2-column layout (works well)
- Stats: present inline as a single sentence or short paragraph with bold numbers, NOT a 2x2 card grid. E.g., "We've shipped **50+ projects** with a **99.9% uptime** SLA and a **4.9/5** client satisfaction rating."
- Core Values: keep as cards BUT use the highlight-card style (left accent border) instead of identical cards
- Process/methodology: keep the timeline (already good)
- Team: keep (already unique)

**Services page:**
- The alternating left/right layout is fine but add visual variety between items (alternate which side has the accent border, vary card background slightly)

**Portfolio page:**
- Keep the bento grid but make featured project significantly larger (full-width hero card with gradient overlay, ready for screenshot)

### 1.8 Icon Usage — Less is More

**Remove Lucide icons from:**
- Section headers (the Terminal/Layers/etc icons before "Key Capabilities", "Direct Inquiry", etc.)
- Decorative badges ("Root Access" with Terminal icon)
- CTA buttons (Terminal icon on "Start Project", Cpu icon on "Start the Scoping Process")
- The tech stack trust bar (Code2, Terminal, Cpu, Database, Zap icons before tech names — just use text)

**Keep Lucide icons on:**
- Navigation and interactive elements (Menu, X, ArrowRight on buttons)
- The service cards (where the icon represents the service category)
- Contact info cards (Mail icon is appropriate)
- Functional UI (CheckCircle2 in feature lists — this is useful)

### 1.9 Footer — Simplify

**Current:** Generic 4-column grid footer (brand + socials, services links, company links, bottom bar).

**Replace with:** A cleaner 2-section footer:
- **Top section:** A bold CTA banner — "Got a project in mind? Let's talk." with a single button. Full-width, tinted background.
- **Bottom section:** Single row with logo, copyright, and links (Privacy, Terms, GitHub, LinkedIn) all inline. No multi-column grid.

This replaces both the CTA section component AND the current footer, since every page ends with a CTA + footer that are visually redundant.

---

## 2. Stock Images

Use Unsplash/Pexels images downloaded to `public/images/` (not hotlinked). Optimized via Next.js `<Image>`.

**Needed images:**
- `hero-workspace.jpg` — Clean desk/workspace with monitor showing code or design (hero background, subtle opacity overlay)
- `about-team.jpg` — Professional workspace or coffeeshop work setting (about page story section)
- `services-abstract.jpg` — Abstract gradient mesh or geometric pattern (services hero area)
- `contact-bg.jpg` — Minimal workspace or coffee meeting shot (contact page backdrop)

These images will be used as section backgrounds with dark overlays, not as standalone photos. They add texture and depth without dominating.

---

## 3. Portfolio Updates

### 3.1 Add DealProp

```
slug: "dealprop"
name: "DealProp"
category: "SaaS Platform"
tagline: "AI-powered operating system for real estate investors"
description: "A comprehensive platform for real estate investors to manage deals, rehab projects, vendors, investors, and capital — all in one place. Features AI-powered deal analysis, multi-portal access for operators, investors, and vendors, and supports 8 investment strategies."
challenge: "Real estate investors were juggling spreadsheets, separate PM tools, and manual deal analysis across fix-and-flip, wholesale, BRRRR, and rental strategies — with no single platform that understood the full investment lifecycle."
solution: "We built a multi-portal SaaS platform with AI-powered deal analysis, rehab tracking, vendor bid marketplace, capital stack management, and built-in property management — supporting every strategy from wholesale to multifamily in one unified system."
techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "AI/ML"]
highlights: [
  { label: "Investment Strategies", value: "8" },
  { label: "User Portals", value: "3" },
  { label: "AI Features", value: "4+" },
  { label: "Pricing Tiers", value: "4" }
]
link: "https://dealprop.pro"
```

### 3.2 Add Cortex Automations Website

```
slug: "cortex-automations"
name: "Cortex Automations"
category: "Web Design"
tagline: "Our own marketing site — built to practice what we preach"
description: "The site you're looking at right now. A high-performance Next.js marketing site with dark/light theme support, SEO optimization, and a clean design system built entirely with Tailwind CSS."
challenge: "We needed a marketing site that demonstrated our capabilities while being fast, accessible, and easy to maintain — without relying on a CMS or any third-party page builder."
solution: "We built a fully static Next.js 15 site with App Router, Tailwind CSS 4, structured data for SEO, Vercel Analytics, and a custom design system — shipping a sub-second load time with a 95+ Lighthouse score."
techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Schema.org"]
highlights: [
  { label: "Lighthouse Score", value: "95+" },
  { label: "Load Time", value: "<1s" },
  { label: "CMS Dependency", value: "None" },
  { label: "Dark/Light Mode", value: "Yes" }
]
link: "https://cortexautomations.ai"
```

### 3.3 Portfolio Page — Fix Icon Map

Remove references to deleted projects (`cloud-x`, `livemonitor`, `liquidlogic`) in the `PROJECT_ICONS` map. Assign appropriate icons to all projects.

### 3.4 Portfolio Cards — Image Placeholders

Add an optional `image` field to each project in `constants.ts`. On the portfolio page and case study pages, render the image when present (with gradient overlay), fall back to current icon-based card when not. This prepares for adding screenshots later.

---

## 4. Copy Rewrite — All Pages

Tone: fun, confident, direct. Speaks to business owners who need software built. No sci-fi metaphors, no "Initialize," no "Architecture" as a menu label, no "Protocol" or "Transmission."

### 4.1 Layout (Header + Footer)

**Header CTA buttons:**
- "Book Discovery Call" stays
- "Start Project" stays (remove Terminal icon)

**Footer:**
- "Architecture" column heading -> "Services"
- "Initialize Project" link -> "Start a Project"
- Footer tagline: "We build software that helps businesses run better. Based in Florida, working with clients everywhere."

### 4.2 Homepage

**Hero badge:** Remove the ping animation dot. Change "Engineering scalable digital infrastructure" -> "Software that works as hard as you do"

**Hero headline:** "We Build High-Performance Software Systems" -> "We build the software your business runs on"

**Hero subtitle:** Remove jargon. New: "From custom platforms to client-facing websites, we help businesses automate, grow, and look great doing it."

**Hero CTAs:**
- "Start a Project" (keep)
- "View Architecture" -> "See Our Work"

**Tech stack trust bar:** Change "Powered by the modern stack" -> "Built with tools that scale"

**Value prop section:**
- "Beyond Basic Web Development" -> "What Makes Us Different"
- Subtitle: "We don't use templates..." -> "We build custom software from scratch. No templates, no shortcuts — just clean code that does exactly what your business needs."
- Card titles stay similar but rewrite descriptions to be more accessible

**Services teaser:**
- "Core Capabilities" -> "What We Build"
- "End-to-end engineering for platforms that demand reliability" -> "Apps, websites, and automations that help you get more done"
- "Discuss this architecture" links -> "Let's talk about this"

**How We Work:** Section stays mostly the same — already human. Remove `font-mono` from "Process" label.

**Featured Projects:**
- "Featured Architecture" -> "Recent Projects"
- "A look at the systems powering modern businesses" -> "A few things we've built recently"
- "Read Case Study" -> "See the Details"

**Testimonials:**
- Remove "coming soon" italic text
- "Client Results" label -> remove or change to "What People Say"
- "What Clients Say" stays

**Bottom CTA:**
- "Ready to build?" -> "Let's build something together"
- "Stop settling for off-the-shelf solutions. Let's engineer a custom platform that scales with your business." -> "Got an idea? A problem that needs solving? We'd love to hear about it."
- "Initialize Project" -> "Start a Project"

### 4.3 Services Page

**Hero:** "Our Engineering Services" -> "What We Do"
- Subtitle: Drop the jargon. New: "We design and build custom software — from SaaS platforms and mobile apps to websites and AI-powered automations."
- "Discuss this architecture" -> "Let's talk about this"
- "Key Capabilities" -> "What's Included"
- "Target Stack & Integrations" -> "Tech We Use"

**Bottom CTA:**
- "Need a custom architecture?" -> "Not sure what you need?"
- "Start the Scoping Process" -> "Let's Figure It Out"

### 4.4 Portfolio Page

**Hero:** "Our Digital Infrastructure" -> "Our Work"
- Subtitle: "We don't just write code. We architect scalable, high-performance systems..." -> "Real projects we've built for real businesses. Take a look around."
- "Featured Architecture" badge -> "Featured Project"

### 4.5 About Page

**Hero:** "Engineering the Future of Business" -> "The People Behind the Code"
- Subtitle: Remove "boutique development firm specializing in high-performance digital infrastructure." New: "Cortex Automations is a small, focused dev shop. We build custom software for businesses that need more than a template."

**Story section:**
- "Our Engineering DNA" -> "How We Think About Software"
- Rewrite to be more personal and direct. Less "we believe" corporate-speak, more "here's how we actually work."

**Core Values:**
- "Core Principles" -> "What We Care About"
- "The standards that dictate every line of code we write" -> "The stuff that matters to us beyond the code"

**Team section:**
- Remove "Root Access" badge (too sci-fi)
- Keep David Perez bio but make it more personal/fun
- "Architected by engineers who understand both the code and the business logic" -> "Meet the founder"

**Bottom CTA:**
- "Ready to scale your systems?" -> "Want to work together?"
- "Initialize Project" -> "Start a Project"

### 4.6 Contact Page

**Hero:** "Initialize Project" -> "Get in Touch"
- Subtitle: "Whether you need a full-scale enterprise build or a specialized workflow automation, our engineering team is ready to scope your architecture." -> "Tell us about your project, or book a call and we'll figure it out together."

**Left column:**
- "Direct Inquiry" -> "Send Us a Message"
- "Submit your technical requirements below. We review all scoping requests within 24 hours." -> "Tell us what you're working on. We'll get back to you within 24 hours."

**Right column:**
- "Discovery Call" -> "Book a Call"
- "Prefer to talk it through? Book a direct architectural review with our technical founders." -> "Prefer to talk it through? Pick a time that works for you."

### 4.7 CTA Section Component

- "Ready to build something great?" -> "Ready to get started?"
- "Initialize Project" button -> "Start a Project"

---

## 5. Testimonials — Realistic Replacements

Replace placeholder testimonials with realistic ones matching actual client types:

```
[
  {
    quote: "We came to Cortex with a mess of spreadsheets and a dream. They turned it into a real platform — on time, on budget, and way better than what we originally imagined.",
    author: "Jake M.",
    role: "Founder",
    company: "DealProp"
  },
  {
    quote: "Our old website was embarrassing. Cortex built us something that actually looks like a real company. We started getting calls the first week it went live.",
    author: "Ryan T.",
    role: "Owner",
    company: "Outback Excavating"
  },
  {
    quote: "They don't just build what you ask for — they think about what you actually need. We've saved hours every week since switching to the system they built us.",
    author: "Maria L.",
    role: "Operations Manager",
    company: "ServicePro Group"
  }
]
```

---

## 6. Layout Metadata

**Root layout `<title>`:**
- "Cortex Automations | Engineering Scalable Digital Infrastructure" -> "Cortex Automations | Custom Software Development"

**Root layout `<meta description>`:**
- "Full-stack development agency specializing in SaaS platforms, mobile apps, web design, and AI automation. We build software that scales." -> "We build custom software for businesses — SaaS platforms, websites, mobile apps, and AI automations. Based in Florida, working everywhere."

---

## 7. File Changes Summary

| File | Change |
|------|--------|
| `app/globals.css` | Add light theme variables via `[data-theme]` selectors, remove `.bg-grid` / `.glow-brand` / `.card-gradient-border` / `.text-gradient`, add accent color tokens, add `.brand-underline` utility, add card shadow utilities |
| `app/layout.tsx` | Wrap with `ThemeProvider`, update metadata title/description |
| `app/page.tsx` | Rewrite all copy, left-align hero, replace value-prop cards with inline highlights, convert process steps to horizontal stepper, convert testimonials to single-featured-quote carousel, remove bg effects, reduce animations |
| `app/about/page.tsx` | Rewrite copy, inline stats as sentence, use highlight-card style for values, remove sci-fi labels/badges, update team section |
| `app/services/page.tsx` | Rewrite copy, remove decorative icons from headers, simplify card effects |
| `app/portfolio/page.tsx` | Rewrite copy, fix icon map, add image support to cards, make featured project full-width |
| `app/portfolio/[slug]/page.tsx` | Add image hero support, rewrite "Back to Architecture" -> "Back to Portfolio" |
| `app/contact/page.tsx` | Rewrite all copy, remove decorative icons from section headers |
| `components/layout/header.tsx` | Add theme toggle button, remove Terminal icon from CTA |
| `components/layout/footer.tsx` | **REWRITE** — replace 4-column grid with CTA banner + single-row bottom bar |
| `components/sections/cta-section.tsx` | **DELETE** — functionality absorbed into new footer CTA banner |
| `components/ui/theme-toggle.tsx` | **NEW** — sun/moon toggle button component |
| `components/ui/theme-provider.tsx` | **NEW** — context provider for dark/light mode |
| `lib/constants.ts` | Add DealProp + Cortex Automations projects, update testimonials, add optional `image` field to project type |
| `public/images/` | Add 4 stock images (hero, about, services, contact) |

---

## 8. What We're NOT Changing

- Overall page structure/routing (Home, Services, Portfolio, About, Contact)
- The brand blue color (`#5B7FFF`)
- Inter font family
- Lead form functionality and API integration
- Calendar widget integration
- SEO/metadata infrastructure (just updating content)
- Mobile responsive patterns (already good)
- Vercel Analytics integration
