# M3 FOTO — Muse Moment Makers

Premium photography platform. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
GSAP (ScrollTrigger, SplitText) · Motion · Lenis.

Current stage: **Milestone 1 — Foundation & Homepage.** No backend, no external services.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

## Where things live

| What | Where |
|---|---|
| Original logo (source + extracted lockup, mark, tagline) | `public/brand/` (see README inside), regenerate with `npm run logo` |
| Homepage text, images, section order/visibility | `src/content/home.ts` |
| Contact details, social links, navigation | `src/content/site.ts` |
| Collections, projects, services, testimonials | `src/content/catalog.ts` |
| Content schemas (future admin forms) | `src/lib/schemas/content.ts` |
| Data access (future Supabase swap point) | `src/lib/data/` |
| Design tokens | `src/app/globals.css` (`@theme`) |
| Fonts | `src/app/fonts.ts` |

## Placeholders

All photography is licensed placeholder material, prefixed `ph-`, badged in the UI and credited on
`/credits`. See `docs/PLACEHOLDERS.md`. Set `NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGES=false` only for
review screenshots; it also hides sample testimonials.

## Docs

- `docs/MILESTONE-1-PLAN.md` — wireframe, typography, motion sequence, components, assets
- `docs/ARCHITECTURE.md` — data model, planned Supabase schema, client-gallery design, security
- `docs/PLACEHOLDERS.md` — placeholder register and replacement procedure
- `docs/QA-M1.md` — verification results for this milestone
