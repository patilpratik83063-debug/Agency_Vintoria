# Vintoria — Digital Product Studio

Marketing site for Vintoria: strategy, design, engineering, AI, automation and growth
under one roof. Built with Next.js 15 (App Router), React 19, Tailwind CSS v4 and
TypeScript.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Cinematic scroll-video hero + chapter deep-links |
| `/about` | Story, founders, philosophy |
| `/capabilities` | 12-pillar service catalog with live search |
| `/work` | Capability builds & architecture specs |
| `/ai-automation` | AI + automation spotlight, tech stack |
| `/estimator` | Interactive scope / spec generator |
| `/process` | Six-phase methodology, industries, FAQ |
| `/contact` | Brief form + social channels |
| `/legal` | Privacy, NDA and engagement terms |

## Development

```bash
npm install
cp .env.example .env.local   # fill in what you have (all keys optional)
npm run dev
```

Environment variables (see `.env.example`):

- `GEMINI_API_KEY` — optional; enables AI-generated spec narratives in `/api/estimator`.
  Falls back to a deterministic engine without it.
- `RESEND_API_KEY` — optional; when set, project briefs from `/api/inquiry` are emailed
  to the founders via Resend. Without it, briefs still succeed and the UI offers a
  pre-filled WhatsApp fast-track link.
- `INQUIRY_TO_EMAIL` / `INQUIRY_FROM_EMAIL` — delivery target and verified Resend sender.
- `APP_URL` — canonical URL for metadata, sitemap and robots (Vercel auto-detects).

## Design system

The visual language lives in three places — change it there, not per-component:

1. `app/globals.css` — `@theme` tokens: `--color-base/surface/elevated`, the three
   overlay steps (`--color-overlay-*`), hairline borders (`--color-hairline-*`),
   `--ease-smooth`, glass shadows.
2. `components/ui/*` — primitives built with `cva`: `Button`, `Badge`, `GlassCard`,
   `Field` (Input/Select/Textarea/FieldLabel), `SectionHeader`/`Eyebrow`.
3. Fonts — Inter (`--font-sans`), JetBrains Mono (`--font-mono`, the engineering voice),
   Instrument Serif (`--font-serif`, editorial accents), loaded in `app/layout.tsx`.

Motion: `Reveal` (IntersectionObserver + CSS transition, reduced-motion aware),
`tw-animate-css` for enter animations (`animate-in fade-in ...`), and the scroll-scrubbed
`ScrollVideo` backdrop which pauses entirely under `prefers-reduced-motion`.

## Deploy

Vercel-ready — import the repo, add env vars, done. `app/sitemap.ts` and
`app/robots.ts` generate themselves from `APP_URL`/`VERCEL_URL`.
