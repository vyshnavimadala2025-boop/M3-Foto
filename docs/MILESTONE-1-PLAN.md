# M3 FOTO — Milestone 1 Plan: Foundation & Homepage

Status: approved in principle by the client, refined per their 10 points.
Scope: design system, global experience layer, complete homepage, typed content layer.
Out of scope for M1: Supabase, auth, admin UI, email, any external account or database change.

---

## 1. Homepage wireframe and section hierarchy

Desktop composition (12-column grid, 24px gutters, 4vw outer margin). Mobile notes in italics.

```
┌──────────────────────────────────────────────────────────────────────┐
│ 00  INTRO (first visit only, ≤ 2.4s, skippable)                      │
│     black · LOGO reveal · MUSE MOMENT MAKERS · frame counter 000→100 │
├──────────────────────────────────────────────────────────────────────┤
│ 01  HERO  100svh                                                     │
│  [LOGO]                    Work  Studio  Services  Packages   Enquire│
│                                                                      │
│      full-bleed image sequence (5 frames, film-advance transition)   │
│                                                                      │
│  EVERY FRAME                                                         │
│  HAS A  Story.            ← Instrument Serif, 13vw, line masks      │
│  ────────────────────────────────────────────────────────────────    │
│  We don't just capture…   [Explore Our Work] [Let's Create…]  ↓Scroll│
│  FR 01/05 · Weddings ▬▬▬▬▬▬░░░ (progress)                PLACEHOLDER │
├──────────────────────────────────────────────────────────────────────┤
│ 02  MANIFESTO  (01) The Studio                                       │
│     cols 1–9: oversized serif statement, words light up on scroll    │
│     cols 10–12, offset down: small portrait, clip reveal             │
├──────────────────────────────────────────────────────────────────────┤
│ 03  FEATURED COLLECTIONS  — pinned horizontal filmstrip               │
│     panels alternate portrait / landscape / square, index + title    │
│     + frame count; sprocket-style rule above and below               │
│     *mobile: native swipe carousel with scroll-snap, no pin*         │
├──────────────────────────────────────────────────────────────────────┤
│ 04  MUSE · MOMENT · MAKERS  — the tagline as brand pillars            │
│     split screen: left tall image (sticky, parallax)                 │
│     right: three huge words, each with a 2-line description          │
├──────────────────────────────────────────────────────────────────────┤
│ 05  SIGNATURE SERVICES  — editorial index list                       │
│     01  Weddings ─────────────────────────────── Story-led coverage →│
│     02  Pre-Wedding … (rows, hairline dividers)                      │
│     hover: image floats with cursor, clip reveal                     │
│     *mobile: each row carries its own thumbnail*                     │
├──────────────────────────────────────────────────────────────────────┤
│ 06  SELECTED PROJECTS — asymmetric editorial grid                    │
│     [ wide 8 cols            ]   [caption 3 cols]                    │
│        [portrait 4]   [portrait 5, offset +20vh]                     │
│     [caption]  [ full-bleed cinema 2.39:1                         ]  │
├──────────────────────────────────────────────────────────────────────┤
│ 07  CREATIVE APPROACH — pinned scroll story (4 steps)                │
│     left: giant numeral 01→04 rolling   right: image crossfade       │
│     Discover · Direct · Capture · Craft                              │
│     *mobile: stacked steps, no pin*                                  │
├──────────────────────────────────────────────────────────────────────┤
│ 08  TESTIMONIAL — one quote, large serif, crossfade, prev/next       │
│     (renders only content flagged as real; samples carry a badge)    │
├──────────────────────────────────────────────────────────────────────┤
│ 09  SOCIAL WALL — two rows of drifting frames, opposite directions   │
├──────────────────────────────────────────────────────────────────────┤
│ 10  INQUIRY CTA — 100svh black; "Let's create something beautiful."  │
│     magnetic circular button "Start an enquiry"                      │
├──────────────────────────────────────────────────────────────────────┤
│ 11  FOOTER — revealed from beneath the page                          │
│     logo (large) · contact · social · nav · © · credits              │
└──────────────────────────────────────────────────────────────────────┘
```

Hierarchy rule: every section has exactly one dominant element (an image or a line of type),
one supporting element, and one action at most.

## 2. Typography

All three families are free (SIL Open Font License), self-hosted at build time by `next/font`,
so there are no runtime requests to Google.

| Role | Family | Use |
|---|---|---|
| Display | **Instrument Serif** (Regular, Italic) | Hero, section statements, project titles, quotes. Uppercase for headlines, italic for the single emotional word. |
| Text / UI | **Inter Tight** (400, 500) | Body, navigation, buttons, captions. Swiss, compact, neutral against the serif. |
| Technical | **JetBrains Mono** (400) | Frame counters, indices and placeholder badges only. The "film edge" voice. |
| Labels | Inter Tight 500, uppercase, 0.26em tracking | Section labels and micro-copy, echoing the logo's letterspaced "F O T O" and tagline. |

Scale (fluid, clamp-based): display-xl 13vw cap 220px · display-l 8vw · display-m 4.5rem · h3 2rem ·
body-l 1.25rem · body 1rem · caption 0.8125rem · micro 0.6875rem uppercase, tracking 0.18em.
Display line-height 0.88, tracking −0.02em. Body line-height 1.55, max 62ch.

If the client licenses a commercial face later (e.g. Canela, PP Editorial New, Neue Montreal), only
`src/app/fonts.ts` changes.

## 3. Animation sequence

Libraries: GSAP + ScrollTrigger + SplitText (scroll and timeline work), Motion (mount/unmount UI:
menu, testimonial crossfade), Lenis (smooth scroll, synced to the GSAP ticker). No Three.js in M1.

### Opening (first visit in a session)
| t (s) | Event | Ease |
|---|---|---|
| 0.00 | Black screen. Mono counter 000 starts bottom-left | — |
| 0.15 | Logo reveals upward through a mask (y 100% → 0) | expo.out 1.0 |
| 0.45 | MUSE MOMENT MAKERS letters fade in, staggered 0.03 | power2.out |
| 1.40 | Logo + tagline lift and fade | power3.in 0.5 |
| 1.55 | Cinemascope slit opens: clip inset 50% → 38% (2.39:1 letterbox), image scale 1.35 | expo.inOut 0.9 |
| 2.10 | Letterbox expands to full bleed, image scale → 1.08 | expo.inOut 1.1 |
| 2.50 | Headline lines rise from masks, stagger 0.08 | expo.out 1.2 |
| 2.70 | Nav, supporting copy, CTAs, scroll cue fade up 12px | power3.out 0.8 |

Return visits within the session, and all phones (<768px), skip the logo moment and open directly from the cinemascope slit (≈1.4s total). This keeps mobile motion light and lets the photograph paint immediately. Any key, click or scroll skips
the intro instantly. `prefers-reduced-motion`: no intro, everything simply fades in over 0.4s.

### Hero, after the opening
- Frames advance every 6s with a **film-advance wipe**: the next image enters via clip-path from
  right to left while the outgoing one drifts −6% horizontally. A hairline progress bar fills
  under the frame counter. Pauses when the tab is hidden or the hero is off-screen.
- On scroll: image parallax (yPercent +18), headline drifts up faster than the image, a black veil
  rises to 60% so the hero hands over cleanly to the manifesto.

### Through the page
| Section | Motion | Mobile |
|---|---|---|
| Manifesto | Words go from 18% to 100% opacity, scrubbed to scroll | Same, lighter scrub |
| Collections | Pinned; track translates horizontally; images counter-parallax inside frames | Native swipe |
| Pillars | Left image sticky with slow zoom; each word reveals by line mask | Stacked, simple reveal |
| Services | Rows reveal in sequence; hover image follows cursor (gsap.quickTo), clip in/out | Inline thumbnails |
| Projects | Image clip reveal (inset 100% → 0 from bottom) with inner scale 1.25 → 1 | Same, shorter |
| Approach | Pinned 4 steps; numeral rolls; images crossfade | Stacked |
| Testimonial | Crossfade + line mask | Same |
| Social wall | CSS marquee, opposite directions, pause on hover | Same, slower |
| CTA | Headline mask reveal; magnetic button (desktop, pointer:fine) | Static button |
| Footer | Revealed from beneath (clip-path + fixed inner) | Same |

### Global
- Custom cursor (desktop, fine pointer only): 6px dot + ring; ring grows with a label on
  `data-cursor="view|drag|enquire"` targets. Hidden on touch and reduced motion.
- Page transitions: black curtain covers (0.5s, expo.inOut), route changes, curtain lifts.
  Modifier-clicks and new-tab clicks are never intercepted.
- Navigation: hides on scroll down, returns on scroll up; turns solid after the hero.
- Film grain: tiled 256px noise texture, opacity 0.05, stepped background-position animation.
  Static under reduced motion.
- Only `transform`, `opacity` and `clip-path` are animated. All media has reserved dimensions.

## 4. Component architecture

```
RootLayout (fonts, metadata, html/body)
└── SiteLayout (route group "(site)")
    ├── MotionProvider        gsap registration, reduced-motion + device context
    ├── SmoothScroll          Lenis ↔ ScrollTrigger sync
    ├── PageTransition        curtain + TransitionLink context
    ├── Cursor · Grain · SkipLink
    ├── SiteHeader → Logo, NavLinks, MenuToggle → MenuOverlay
    ├── <main> page content
    └── FooterReveal → SiteFooter
```

Layers:
- **brand/** — `Logo` (reads the client file from `public/brand/`, never redrawn).
- **motion/** — `Intro`, `RevealText`, `RevealImage`, `Parallax`, `Magnetic`, `Cursor`,
  `SmoothScroll`, `PageTransition`, `TransitionLink`, `Grain`, `Marquee`.
- **media/** — `Frame` (next/image wrapper: aspect ratio, blur placeholder, sizes, placeholder
  badge, credit data).
- **ui/** — `Button`, `ArrowLink`, `Eyebrow`, `SectionIndex`, `PlaceholderBadge`.
- **layout/** — `SiteHeader`, `MenuOverlay`, `SiteFooter`, `FooterReveal`.
- **sections/home/** — one component per homepage section, each receiving typed props only.

Data flow: `page.tsx` (server) → `lib/data/*` repository functions (async) → typed props →
section components. In M1 the repository reads `src/content/*`; in M5 the same functions read
Supabase. No section component imports content directly, so the admin swap needs no UI changes.

## 5. Project folder structure

```
.
├── docs/                    plans, architecture, database design, placeholder register
├── public/
│   ├── brand/               ← client logo goes here (logo.svg preferred, logo.png accepted)
│   ├── placeholders/        ph-*.jpg licensed placeholder photography
│   └── textures/            grain.png
├── scripts/                 process-placeholders.mjs (resize, blur hashes, register)
└── src/
    ├── app/
    │   ├── layout.tsx, globals.css, fonts.ts, robots.ts, sitemap.ts, not-found.tsx
    │   └── (site)/          layout.tsx, page.tsx, credits/, + route shells for M2 pages
    ├── components/          brand/ layout/ media/ motion/ sections/home/ ui/
    ├── content/             site.ts, home.ts, collections.ts, projects.ts, services.ts,
    │                        testimonials.ts, media.generated.ts   (M1 data source)
    ├── lib/
    │   ├── data/            repository functions (the admin swap point)
    │   ├── schemas/         zod schemas = single source of truth for content shape
    │   ├── gsap.ts, utils.ts, env.ts, seo.ts
    └── types/
```

## 6. Content management readiness (point 6)

Every visible string, image, link and section toggle on the homepage comes from typed content
validated by zod schemas in `src/lib/schemas`. Those schemas become the admin forms and the
Supabase `page_content` JSON validation in M5. Section order and visibility are data, not code.

## 7. Future-ready client galleries (point 7)

Media is modelled once (`media` with storage path, dimensions, blur, alt, credit) and referenced
by projects today. Private galleries, selections and delivery will reference the same media table
through `galleries`, `gallery_media`, `gallery_access`, `selections` and `downloads`, with
originals in a private bucket and signed URLs. See `docs/ARCHITECTURE.md`.

## 8. Asset requirements

| Asset | Format | Spec |
|---|---|---|
| Logo, light-on-dark | SVG (preferred) or PNG with transparency | ≥ 2000px wide if PNG |
| Logo, dark-on-light | same | for print/OG/light contexts |
| Logo mark only (if one exists) | SVG | favicon, app icon |
| Hero sequence | JPEG/TIFF originals | 5 landscape ≥ 3840px wide + 5 portrait crops ≥ 2160px wide |
| Hero film (optional) | MP4 H.264 + WebM | 1920×1080, 8–15s loop, ≤ 8MB, no audio |
| Collections | originals | 6–9 collections, 12–40 images each, with titles/locations/years |
| Selected projects | originals + story | 4–6 projects |
| Team & studio | portraits, BTS | consistent lighting, ≥ 2400px long edge |
| Testimonials | text + client permission | name or initials, event, year |
| Business data | text | services list, contact, service area, socials, enquiry email |

Images are optimised automatically (AVIF/WebP, responsive sizes); send the highest quality you have.

## 9. Placeholders (point 9)

- Sources: Wikimedia Commons (CC BY / CC BY-SA / CC0), downloaded once and now processed from the local
  cache with Commons downloads disabled, and Unsplash images served via Picsum (Unsplash License). No editorial-only, NC or ND licences.
- Every file is prefixed `ph-`, recorded in `docs/PLACEHOLDERS.md` and `src/content/media.generated.ts`
  with author, licence and source URL, and credited on `/credits` as the licences require.
- Every placeholder renders a small mono **PLACEHOLDER** badge while
  `NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGES` is not `false`.
- Sample testimonials are labelled **SAMPLE** and are excluded from production unless replaced.

## 10. Definition of done for M1

- `npm run build`, `npm run lint`, `npm run typecheck` pass.
- Homepage verified in a real browser at 1440, 1024, 768, 390 and 360 widths: no horizontal
  overflow, no layout shift, reduced motion respected, keyboard navigable.
- Lighthouse run recorded in `docs/QA-M1.md`.
