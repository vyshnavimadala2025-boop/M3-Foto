# Milestone 1 — QA record

Date: 2026-11-05 · Build: `next build` (Next.js 16.4.5, Turbopack) · Server: `next start` (production)
Browser: Playwright Chromium headless shell 156. Real-device testing (iOS Safari, Android Chrome,
Firefox, desktop Safari) has **not** been done yet. See "Not yet verified".

## Static checks

| Check | Result |
|---|---|
| `npm run typecheck` (tsc --noEmit, strict + noUncheckedIndexedAccess) | Pass, 0 errors |
| `npm run lint` (eslint-config-next core-web-vitals + typescript) | Pass, 0 errors, 0 warnings |
| `npm run build` | Pass, 31 static routes, content validated by zod at build |
| Broken image references | Checked at build (`assertReferences`), none |

## Lighthouse (homepage, production server, headless Chromium)

| Profile | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Mobile (simulated slow 4G, 4× CPU) | 90 | 100 | 100 | 100 | 0.9 s | 3.6 s (simulated) | 20 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0.2 s | 0 ms | 0 |

`/about` and `/credits`: accessibility 100.

Mobile LCP is a Lighthouse simulation of the hero photograph over slow 4G. Unthrottled, the
hero image paints at about 0.07 s on a phone. On desktop and tablet first visits, the hero
finishes revealing at about 3.5 s, by design of the opening sequence. Any click, key or scroll
skips the logo moment.

## Responsive and runtime checks (full-page scroll capture)

| Viewport | Console errors | Horizontal overflow | CLS during load + full scroll |
|---|---|---|---|
| 1440×900 desktop | none | none | 0 |
| 1280×720 laptop | none | none | 0 |
| 768×1024 tablet | none | none | 0 |
| 390×844 phone | none | none | 0 |
| 360×740 small phone | none | none | 0 |
| 1440×900 reduced motion | none | none | 0 |

## Interaction checks

| Check | Result |
|---|---|
| Opening sequence: logo slot → letterbox → full bleed → headline (desktop) | Pass, clip-path sampled symmetric over time |
| Phones skip the logo moment and open from the letterbox | Pass |
| Hero slideshow: auto-advance, pause, play | Pass (FR 01 held while paused, advanced to FR 02 after play) |
| Header hides on scroll down, returns on scroll up | Pass |
| Page transition: curtain, route change, scroll reset to top | Pass |
| Return to home: no intro replay within session | Pass |
| Featured collections: pinned horizontal filmstrip (desktop) | Pass |
| Featured collections: native swipe carousel (touch) | Renders correctly; swipe gesture not automated |
| Services: floating preview follows cursor, other rows dim | Pass |
| Creative approach: pinned 4-step sequence with snapping | Pass |
| Custom cursor on fine pointer only | Pass, absent under reduced motion |
| Mobile menu: open, focus moves in, focus trapped, Escape closes, scroll restored | Pass |
| Mobile menu link navigates and closes the menu | Pass |
| Skip link is the first Tab stop and targets `#main` | Pass |
| Reduced motion: no Lenis, no cursor, no intro, slideshow paused | Pass |
| JavaScript disabled: hero and content fully visible | Pass |
| Scroll frame pacing at 1× and 4× CPU | 60 fps median, p99 16.8 ms, no frames >50 ms (headless; see below) |
| `/credits` lists all 47 placeholders with author, licence and source | Pass |
| 404 page | Pass |
| robots.txt, sitemap.xml, Open Graph image | Pass (200) |

## Issues found during QA and fixed

1. Pinned sections registered as layout shift (CLS ≈ 2.0 while scrolling). Fixed with transform pinning. Now 0.
2. Collection captions sat under offset images. Offsets now apply to whole panels.
3. Hero bottom bar and first project caption were cramped at 768px. Multi-column layouts now start at 1024px.
4. Mobile footer content overflowed the fixed reveal panel. Footer is in normal flow on phones; the reveal applies from 768px.
5. Menu took about 1.4 s to close (exit inherited entrance delays). Now about 0.6 s.
6. SplitText added `aria-label` to `<p>` (invalid ARIA). Disabled.
7. Several text colours below WCAG AA: the meta grey token, manifesto start opacity, inactive approach steps and the logo-slot hint. All corrected.
8. Grain texture was a 98 KB PNG at high priority. Now a 17 KB greyscale WebP.
9. Unused Inter Tight weights (300, 600) removed.
10. Clip-path openings animated only one edge because browsers serialise `inset()` in short form. All clip-path tweens now use explicit four-value fromTo.

## Not yet verified

- Real devices and browsers: iOS Safari (including `svh` units and the fixed footer reveal), Android
  Chrome, Firefox and desktop Safari.
- Touch swipe on the collections carousel, and trackpad inertia with Lenis on macOS.
- Frame pacing on low-end phones. Headless measurements do not include GPU compositing cost.
- A vector logo. The site uses artwork extracted from the supplied screenshot (see public/brand/README.md).

## Brand logo integration (2026-11-06)

| Check | Result |
|---|---|
| Logo artwork extracted from the client file without redrawing (brightness → alpha, white fill) | Pass, inspected on grey at 3× |
| Header uses the M3 FOTO mark; opening sequence stages mark → tagline inside a drawn circle | Pass (desktop); phones skip the logo moment by design |
| Footer uses the full lockup; Open Graph image uses the lockup over the hero photograph | Pass |
| Favicon and Apple touch icon generated from the mark | Pass (served at /icon.png, /apple-icon.png) |
| Header and cursor no longer use blend modes, so the logo is never colour-tinted over photographs | Pass |
| Regression: 5 viewports, interactions, keyboard, reduced motion | Pass, no errors, no overflow, CLS 0 |
