import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFeaturedCollections, getFeaturedProjects } from "@/lib/data/content";
import { InProduction } from "@/components/layout/InProduction";

async function find(slug: string) {
  const [cols, projs] = await Promise.all([getFeaturedCollections(), getFeaturedProjects()]);
  return cols.find((c) => c.slug === slug) ?? projs.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  const [cols, projs] = await Promise.all([getFeaturedCollections(), getFeaturedProjects()]);
  return [...cols, ...projs].map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const item = await find((await params).slug);
  return { title: item?.title ?? "Work", robots: { index: false } };
}

export default async function Page({ params }: PageProps<"/portfolio/[slug]">) {
  const item = await find((await params).slug);
  if (!item) notFound();
  return <InProduction index={item.category} title={item.title} media={item.cover} note="Full-screen project galleries with keyboard navigation arrive in Milestone 2." />;
}
