import { z } from "zod";

/**
 * Content schemas — the single source of truth for every piece of editable content.
 * Milestone 1 validates the local content files against these at build time.
 * Milestone 5 reuses them for admin forms and for validating Supabase `page_content` JSON.
 */

const id = z.string().min(1);
const href = z
  .string()
  .min(1)
  .refine((v) => v.startsWith("/") || v.startsWith("#") || /^https?:\/\//.test(v) || v.startsWith("mailto:") || v.startsWith("tel:"), {
    message: "Links must be relative (/…), anchors (#…), http(s), mailto: or tel:",
  });

export const creditSchema = z.object({
  author: z.string(),
  license: z.string(),
  licenseUrl: z.string().url().optional(),
  sourceUrl: z.string().url(),
  title: z.string().optional(),
});

export const mediaSchema = z.object({
  id,
  src: z.string().startsWith("/"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  blurDataURL: z.string().startsWith("data:image/"),
  alt: z.string().min(1, "Every image needs alt text"),
  /** CSS object-position, e.g. "50% 30%", so crops keep faces in frame */
  focal: z.string().default("50% 50%"),
  placeholder: z.boolean(),
  credit: creditSchema.optional(),
});

export const categorySchema = z.object({
  id,
  slug: z.string(),
  title: z.string(),
  /** Each category gets its own composition on the portfolio pages (Milestone 2). */
  layout: z.enum(["editorial", "diptych", "cinema", "contact-sheet", "gallery-wall", "runway"]),
  order: z.number().int(),
  visible: z.boolean(),
});

export const collectionSchema = z.object({
  id,
  slug: z.string(),
  title: z.string(),
  categoryId: id,
  description: z.string(),
  coverId: id,
  mediaIds: z.array(id),
  featured: z.boolean(),
  order: z.number().int(),
  placeholder: z.boolean(),
});

export const projectSchema = z.object({
  id,
  slug: z.string(),
  title: z.string(),
  categoryId: id,
  summary: z.string(),
  location: z.string().optional(),
  year: z.number().int().optional(),
  coverId: id,
  featured: z.boolean(),
  order: z.number().int(),
  placeholder: z.boolean(),
});

export const serviceSchema = z.object({
  id,
  slug: z.string(),
  title: z.string(),
  short: z.string(),
  mediaId: id,
  order: z.number().int(),
  visible: z.boolean(),
});

export const testimonialSchema = z.object({
  id,
  quote: z.string(),
  attribution: z.string(),
  context: z.string(),
  /** Sample testimonials are never shown in production builds. */
  sample: z.boolean(),
  published: z.boolean(),
});

export const ctaSchema = z.object({ label: z.string(), href });

export const socialLinkSchema = z.object({
  platform: z.enum(["instagram", "youtube", "facebook", "pinterest", "vimeo", "x", "linkedin", "whatsapp"]),
  label: z.string(),
  /** Empty until the client confirms the handle — rendered as text, not a link. */
  url: z.string().url().or(z.literal("")),
});

export const siteSettingsSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  logo: z.object({
    /**
     * Paths under /public/brand, first existing file wins. Files are the client's original artwork,
     * never redrawn. `lockup` = mark + tagline, `mark` = M3 FOTO only, `tagline` = MUSE MOMENT MAKERS only.
     */
    lockup: z.array(z.string().startsWith("/brand/")),
    mark: z.array(z.string().startsWith("/brand/")),
    tagline: z.array(z.string().startsWith("/brand/")),
    alt: z.string(),
    /** Set true if the supplied logo is dark artwork and must be inverted on the black UI. */
    invertOnDark: z.boolean(),
  }),
  contact: z.object({
    email: z.string().email().or(z.literal("")),
    phone: z.string(),
    location: z.string(),
  }),
  social: z.array(socialLinkSchema),
  navigation: z.array(z.object({ label: z.string(), href, index: z.string() })),
  enquiryCta: ctaSchema,
});

/** Rich-ish text: `*word*` renders as the italic display accent. */
const accentText = z.string();

const sectionBase = z.object({
  visible: z.boolean(),
  index: z.string(),
  label: z.string(),
});

export const homeContentSchema = z.object({
  hero: z.object({
    headline: z.array(accentText).min(1).max(3),
    supporting: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    slides: z.array(z.object({ mediaId: id, mobileMediaId: id.optional(), caption: z.string() })).min(1),
    intervalSeconds: z.number().min(3).max(15),
  }),
  manifesto: sectionBase.extend({ statement: accentText, mediaId: id, note: z.string() }),
  collections: sectionBase.extend({ title: accentText, intro: z.string(), cta: ctaSchema }),
  pillars: sectionBase.extend({
    mediaId: id,
    items: z.array(z.object({ word: z.string(), text: z.string() })).length(3),
  }),
  services: sectionBase.extend({ title: accentText, cta: ctaSchema }),
  projects: sectionBase.extend({ title: accentText, cta: ctaSchema }),
  approach: sectionBase.extend({
    title: accentText,
    steps: z.array(z.object({ title: z.string(), text: z.string(), mediaId: id })).min(2).max(6),
  }),
  testimonials: sectionBase,
  social: sectionBase.extend({ title: accentText, mediaIds: z.array(id).min(6) }),
  cta: sectionBase.extend({ headline: z.array(accentText).min(1), supporting: z.string(), button: ctaSchema, mediaId: id }),
});

export type Credit = z.infer<typeof creditSchema>;
export type MediaAsset = z.infer<typeof mediaSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Cta = z.infer<typeof ctaSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type HomeContent = z.infer<typeof homeContentSchema>;
