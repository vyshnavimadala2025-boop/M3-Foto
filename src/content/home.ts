import type { HomeContent } from "@/lib/schemas/content";

/**
 * Homepage content. Every string, image and toggle here becomes editable in
 * Admin → Website Content → Homepage (Milestone 5). `*word*` = italic display accent.
 */
export const homeContent: HomeContent = {
  hero: {
    headline: ["Every frame", "has a *story.*"],
    supporting: "We don't just capture moments. We create memories that stay forever.",
    primaryCta: { label: "Explore Our Work", href: "/portfolio" },
    secondaryCta: { label: "Let's Create Something Beautiful", href: "/contact" },
    slides: [
      { mediaId: "hero-bride-red", caption: "Weddings" },
      { mediaId: "hero-couple-arch", caption: "Weddings" },
      { mediaId: "hero-blindfold", caption: "Fashion & Editorial" },
      { mediaId: "hero-fire", caption: "Cinematic" },
      { mediaId: "hero-portrait", caption: "Portraits" },
    ],
    intervalSeconds: 6,
  },
  manifesto: {
    visible: true,
    index: "01",
    label: "The Studio",
    statement:
      "M3 FOTO is a studio for people who feel deeply. We work like filmmakers and finish like editors, so every photograph carries the *weight of the moment* it came from.",
    mediaId: "manifesto-bride",
    note: "Light, patience and an honest eye. The rest is the story you bring.",
  },
  collections: {
    visible: true,
    index: "02",
    label: "Featured collections",
    title: "Stories in *sequence.*",
    intro: "Each collection is edited like a short film: an opening, a turn, and a frame you remember.",
    cta: { label: "View all work", href: "/portfolio" },
  },
  pillars: {
    visible: true,
    index: "03",
    label: "Muse · Moment · Makers",
    mediaId: "pillars-maker",
    items: [
      { word: "Muse", text: "The people in front of the lens. We direct gently, so who you are comes through without effort." },
      { word: "Moment", text: "The fraction of a second that holds the whole story. We read the room, wait for it, and are ready." },
      { word: "Makers", text: "Light, composition, colour and edit. Every image is finished by hand, frame by frame." },
    ],
  },
  services: {
    visible: true,
    index: "04",
    label: "Signature services",
    title: "What we *make.*",
    cta: { label: "Explore services", href: "/services" },
  },
  projects: {
    visible: true,
    index: "05",
    label: "Selected projects",
    title: "Selected *work.*",
    cta: { label: "See the full portfolio", href: "/portfolio" },
  },
  approach: {
    visible: true,
    index: "06",
    label: "Our creative approach",
    title: "How a story *takes shape.*",
    steps: [
      { title: "Discover", text: "We start with a conversation: the people, the places, the feeling you want to keep.", mediaId: "step-discover" },
      { title: "Direct", text: "A shot plan built around light and rhythm, so the day flows and nobody feels posed.", mediaId: "step-direct" },
      { title: "Capture", text: "Quiet, attentive and present. Moments are found, never forced.", mediaId: "step-capture" },
      { title: "Craft", text: "A considered edit and a consistent grade, delivered as a finished story.", mediaId: "step-craft" },
    ],
  },
  testimonials: {
    visible: true,
    index: "07",
    label: "Kind words",
  },
  social: {
    visible: true,
    index: "08",
    label: "From the journal",
    title: "Follow the *journey.*",
    mediaIds: [
      "social-01", "social-02", "social-03", "social-04", "social-05", "social-06", "social-07",
      "social-08", "social-09", "social-10", "social-11", "social-12", "social-13", "social-14",
    ],
  },
  cta: {
    visible: true,
    index: "09",
    label: "Begin",
    headline: ["Let's create", "something *beautiful.*"],
    supporting: "Tell us about your day, your idea or your brand. We'll reply personally.",
    button: { label: "Start an enquiry", href: "/contact" },
    mediaId: "cta-clouds",
  },
};
