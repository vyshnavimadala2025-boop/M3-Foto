import type { SiteSettings } from "@/lib/schemas/content";

/**
 * Global site settings. In Milestone 5 this moves to the `site_settings` table and is edited
 * from Admin → Website Content. Empty strings mean "not yet supplied by the client" and are
 * hidden in the UI rather than shown as fake data.
 */
export const siteSettings: SiteSettings = {
  name: "M3 FOTO",
  tagline: "Muse Moment Makers",
  description:
    "M3 FOTO is a premium photography studio crafting cinematic wedding, portrait, fashion and event photography. Every frame has a story.",
  logo: {
    // Original client artwork (extracted by scripts/process-logo.mjs). A vector logo.svg, when supplied, takes priority.
    lockup: ["/brand/logo.svg", "/brand/logo.png"],
    mark: ["/brand/logo-mark.svg", "/brand/logo-mark.png"],
    tagline: ["/brand/logo-tagline.svg", "/brand/logo-tagline.png"],
    alt: "M3 FOTO — Muse Moment Makers",
    invertOnDark: false,
  },
  contact: {
    email: "",
    phone: "",
    location: "",
  },
  social: [
    { platform: "instagram", label: "Instagram", url: "" },
    { platform: "youtube", label: "YouTube", url: "" },
    { platform: "facebook", label: "Facebook", url: "" },
  ],
  navigation: [
    { index: "01", label: "Work", href: "/portfolio" },
    { index: "02", label: "Studio", href: "/about" },
    { index: "03", label: "Services", href: "/services" },
    { index: "04", label: "Packages", href: "/packages" },
    { index: "05", label: "Contact", href: "/contact" },
  ],
  enquiryCta: { label: "Enquire", href: "/contact" },
};
