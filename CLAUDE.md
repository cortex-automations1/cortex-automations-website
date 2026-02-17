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
- Lead capture form posts to `/api/leads` which forwards to SignFlow API
- Cal.com embedded on contact page for booking

## Environment Variables
- `SIGNFLOW_API_URL` - SignFlow API base URL for lead capture
- `SIGNFLOW_API_KEY` - API key for authentication

## Conventions
- Server components by default, `"use client"` only when needed
- `cn()` utility from `lib/utils.ts` for conditional classes
- `createMetadata()` from `lib/metadata.ts` for page-level SEO
- Section components in `components/sections/`
- UI components in `components/ui/`
- Layout components in `components/layout/`
