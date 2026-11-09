import "server-only";
import { z } from "zod";
import {
  categorySchema,
  collectionSchema,
  homeContentSchema,
  mediaSchema,
  projectSchema,
  serviceSchema,
  siteSettingsSchema,
  testimonialSchema,
  type Collection,
  type MediaAsset,
  type Project,
  type Service,
} from "@/lib/schemas/content";
import { env } from "@/lib/env";
import { siteSettings } from "@/content/site";
import { homeContent } from "@/content/home";
import { categories, collections, projects, services, testimonials } from "@/content/catalog";
import { placeholderMedia } from "@/content/media.generated";

/**
 * Content repository — the ONLY module that knows where content comes from.
 * Milestone 1: local typed files, validated with zod at build time.
 * Milestone 5: the same function signatures query Supabase; no component changes.
 */

const media = z.array(mediaSchema).parse(placeholderMedia);
const mediaById = new Map(media.map((m) => [m.id, m]));
const settings = siteSettingsSchema.parse(siteSettings);
const home = homeContentSchema.parse(homeContent);
const cats = z.array(categorySchema).parse(categories);
const cols = z.array(collectionSchema).parse(collections);
const projs = z.array(projectSchema).parse(projects);
const svcs = z.array(serviceSchema).parse(services);
const tests = z.array(testimonialSchema).parse(testimonials);

export function getMedia(id: string): MediaAsset {
  const m = mediaById.get(id);
  if (!m) throw new Error(`Missing media "${id}". Check src/content for a broken reference.`);
  return m;
}

/** Fail the build early if any content references an image that doesn't exist. */
function assertReferences() {
  const refs: string[] = [
    ...home.hero.slides.flatMap((s) => [s.mediaId, ...(s.mobileMediaId ? [s.mobileMediaId] : [])]),
    home.manifesto.mediaId,
    home.pillars.mediaId,
    home.cta.mediaId,
    ...home.approach.steps.map((s) => s.mediaId),
    ...home.social.mediaIds,
    ...cols.flatMap((c) => [c.coverId, ...c.mediaIds]),
    ...projs.map((p) => p.coverId),
    ...svcs.map((s) => s.mediaId),
  ];
  refs.forEach(getMedia);
}
assertReferences();

export async function getSiteSettings() {
  return settings;
}

export async function getHomeContent() {
  return home;
}

export async function getCategories() {
  return cats.filter((c) => c.visible).sort((a, b) => a.order - b.order);
}

export function categoryTitle(id: string) {
  return cats.find((c) => c.id === id)?.title ?? "";
}

export type CollectionCard = Collection & { cover: MediaAsset; category: string; frames: number };
export async function getFeaturedCollections(): Promise<CollectionCard[]> {
  return cols
    .filter((c) => c.featured)
    .sort((a, b) => a.order - b.order)
    .map((c) => ({ ...c, cover: getMedia(c.coverId), category: categoryTitle(c.categoryId), frames: c.mediaIds.length }));
}

export type ProjectCard = Project & { cover: MediaAsset; category: string };
export async function getFeaturedProjects(): Promise<ProjectCard[]> {
  return projs
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({ ...p, cover: getMedia(p.coverId), category: categoryTitle(p.categoryId) }));
}

export type ServiceCard = Service & { media: MediaAsset };
export async function getServices(): Promise<ServiceCard[]> {
  return svcs
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ ...s, media: getMedia(s.mediaId) }));
}

/** Sample testimonials are only shown while placeholder mode is on. */
export async function getTestimonials() {
  return tests.filter((t) => t.published && (!t.sample || env.showPlaceholderBadges));
}

export async function getAllMedia() {
  return media;
}
