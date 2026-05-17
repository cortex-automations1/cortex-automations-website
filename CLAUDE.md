# Cortex Automations Website

Marketing website for cortexautomations.ai.

## Tech Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 (`@tailwindcss/postcss`)
- Lucide React (icons), clsx + tailwind-merge (utilities), zod (form validation)

## Commands
- `npm run dev` - Development server (Turbopack)
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npx tsc --noEmit` - Type check

## Architecture
- All content data lives in `lib/constants.ts` - no database, no CMS
- Brand color: `brand-500: #5B7FFF` (cornflower blue from logo)
- Pages: Home, Services, Portfolio, About, Contact
- Lead capture form posts to `/api/leads`, which forwards leads to the Cortex
  Command Center lead intake (`app.cortexautomations.ai/api/leads` — a public,
  CORS-enabled endpoint; no API key required)
- Cal.com embedded on contact page for booking

## Environment Variables
- `CORTEX_LEADS_ENDPOINT` - (optional) override for the Cortex Command Center
  lead-intake URL. Defaults to the production endpoint, so it does not need to
  be set; provide it only to point lead capture at a staging instance.

## Conventions
- Server components by default, `"use client"` only when needed
- `cn()` utility from `lib/utils.ts` for conditional classes
- `createMetadata()` from `lib/metadata.ts` for page-level SEO
- Section components in `components/sections/`
- UI components in `components/ui/`
- Layout components in `components/layout/`
