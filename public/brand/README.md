# Brand assets — M3 FOTO original logo

`source/m3-foto-logo-original.jpg` is the logo exactly as supplied by the client (white artwork on a
black circular badge). It is kept unmodified.

`npm run logo` (scripts/process-logo.mjs) extracts the artwork from it without redrawing anything:
pixel brightness becomes transparency, colour becomes pure white.

| File | Content | Used in |
|---|---|---|
| `logo.png` | Full lockup: M3 FOTO + MUSE MOMENT MAKERS | Footer, Open Graph image, structured data |
| `logo-mark.png` | M3 FOTO only | Header, opening sequence, favicon / app icon |
| `logo-tagline.png` | MUSE MOMENT MAKERS only | Opening sequence (revealed after the mark) |
| `../../src/app/icon.png`, `apple-icon.png` | Mark centred on black | Browser tab, home-screen icon |

The source is a 1179×726 screenshot, so the extracted artwork is about 470px wide at native size
(saved at 3× with smooth resampling). It is sharp at every size used on the site.
**Please supply a vector file (SVG, AI or PDF)** for print and very large uses. Drop it in as
`logo.svg`, `logo-mark.svg` and `logo-tagline.svg`, and those files take priority automatically.
