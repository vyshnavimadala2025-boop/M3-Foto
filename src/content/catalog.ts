import type { Category, Collection, Project, Service, Testimonial } from "@/lib/schemas/content";

/**
 * Portfolio catalogue — PLACEHOLDER structure built on licensed placeholder photography.
 * Titles describe the placeholder images only; they are not real client projects.
 * Managed from Admin → Portfolio / Services / Testimonials in Milestone 5.
 */

export const categories: Category[] = [
  { id: "weddings", slug: "weddings", title: "Weddings", layout: "editorial", order: 1, visible: true },
  { id: "pre-wedding", slug: "pre-wedding", title: "Pre-Wedding", layout: "diptych", order: 2, visible: true },
  { id: "engagements", slug: "engagements", title: "Engagements", layout: "gallery-wall", order: 3, visible: true },
  { id: "fashion", slug: "fashion", title: "Fashion", layout: "runway", order: 4, visible: true },
  { id: "portraits", slug: "portraits", title: "Portraits", layout: "gallery-wall", order: 5, visible: true },
  { id: "events", slug: "events", title: "Events", layout: "contact-sheet", order: 6, visible: true },
  { id: "commercial", slug: "commercial", title: "Commercial", layout: "editorial", order: 7, visible: true },
  { id: "films", slug: "cinematic-films", title: "Cinematic Films", layout: "cinema", order: 8, visible: true },
  { id: "special", slug: "special-projects", title: "Special Projects", layout: "editorial", order: 9, visible: false },
];

export const collections: Collection[] = [
  { id: "c-weddings", slug: "weddings", title: "Vows in Vermilion", categoryId: "weddings", description: "Ritual, colour and the quiet in between.", coverId: "col-weddings", mediaIds: ["col-weddings", "svc-weddings", "social-02", "social-03", "proj-bride-gold"], featured: true, order: 1, placeholder: true },
  { id: "c-prewedding", slug: "pre-wedding", title: "Where the Wind Goes", categoryId: "pre-wedding", description: "Two people, open land, no script.", coverId: "col-prewedding", mediaIds: ["col-prewedding", "svc-prewedding", "proj-bench"], featured: true, order: 2, placeholder: true },
  { id: "c-fashion", slug: "fashion", title: "Silk & Stillness", categoryId: "fashion", description: "Studio light, tailored lines.", coverId: "col-fashion", mediaIds: ["col-fashion", "svc-fashion", "hero-blindfold"], featured: true, order: 3, placeholder: true },
  { id: "c-engagements", slug: "engagements", title: "The Promise", categoryId: "engagements", description: "Hands, rings and henna.", coverId: "col-engagements", mediaIds: ["col-engagements", "svc-engagements", "social-04"], featured: true, order: 4, placeholder: true },
  { id: "c-portraits", slug: "portraits", title: "Faces in Monochrome", categoryId: "portraits", description: "Character, held in shadow.", coverId: "col-portraits", mediaIds: ["col-portraits", "svc-portraits", "hero-portrait"], featured: true, order: 5, placeholder: true },
  { id: "c-events", slug: "events", title: "After Dark", categoryId: "events", description: "Light, sound and a crowd that moves.", coverId: "col-events", mediaIds: ["col-events", "svc-events"], featured: true, order: 6, placeholder: true },
  { id: "c-films", slug: "cinematic-films", title: "Motion Studies", categoryId: "films", description: "Frames that want to keep moving.", coverId: "col-films", mediaIds: ["col-films", "svc-films"], featured: true, order: 7, placeholder: true },
];

export const projects: Project[] = [
  { id: "p-corridor", slug: "the-golden-corridor", title: "The Golden Corridor", categoryId: "weddings", summary: "A grand entrance, framed in warm timber.", coverId: "proj-corridor", featured: true, order: 1, placeholder: true },
  { id: "p-bride-gold", slug: "marigold", title: "Marigold", categoryId: "weddings", summary: "A bridal portrait in green and gold.", coverId: "proj-bride-gold", featured: true, order: 2, placeholder: true },
  { id: "p-embrace", slug: "a-quiet-yes", title: "A Quiet Yes", categoryId: "weddings", summary: "The pause after the ceremony.", coverId: "proj-embrace", featured: true, order: 3, placeholder: true },
  { id: "p-bench", slug: "the-long-view", title: "The Long View", categoryId: "pre-wedding", summary: "Golden haze and an unhurried afternoon.", coverId: "proj-bench", featured: true, order: 4, placeholder: true },
];

export const services: Service[] = [
  { id: "s-weddings", slug: "weddings", title: "Weddings", short: "Story-led coverage of every ritual, from first light to the last dance.", mediaId: "svc-weddings", order: 1, visible: true },
  { id: "s-prewedding", slug: "pre-wedding", title: "Pre-Wedding", short: "Cinematic sessions on location, styled around the two of you.", mediaId: "svc-prewedding", order: 2, visible: true },
  { id: "s-engagements", slug: "engagements", title: "Engagements", short: "Rings, families and the first promise, photographed with care.", mediaId: "svc-engagements", order: 3, visible: true },
  { id: "s-fashion", slug: "fashion", title: "Fashion & Editorial", short: "Lookbooks, campaigns and editorial stories with a strong point of view.", mediaId: "svc-fashion", order: 4, visible: true },
  { id: "s-portraits", slug: "portraits", title: "Portraits", short: "Personal and professional portraits with character and restraint.", mediaId: "svc-portraits", order: 5, visible: true },
  { id: "s-events", slug: "events", title: "Events", short: "Celebrations, launches and performances, documented as they unfold.", mediaId: "svc-events", order: 6, visible: true },
  { id: "s-commercial", slug: "commercial", title: "Commercial", short: "Brand, product and interiors photography for considered businesses.", mediaId: "svc-commercial", order: 7, visible: true },
  { id: "s-films", slug: "cinematic-films", title: "Cinematic Films", short: "Short films and highlight reels that move like the day felt.", mediaId: "svc-films", order: 8, visible: true },
];

/** SAMPLE ONLY — illustrative copy, not real reviews. Hidden whenever placeholder mode is off. */
export const testimonials: Testimonial[] = [
  { id: "t-sample-1", quote: "Sample testimonial. A real client's words about how the photographs made them feel will appear here.", attribution: "Client name", context: "Wedding", sample: true, published: true },
  { id: "t-sample-2", quote: "Sample testimonial. This space is reserved for a genuine review, shared with the client's permission.", attribution: "Client name", context: "Pre-Wedding", sample: true, published: true },
  { id: "t-sample-3", quote: "Sample testimonial. Replace from Admin → Testimonials once real reviews are collected.", attribution: "Client name", context: "Portraits", sample: true, published: true },
];
