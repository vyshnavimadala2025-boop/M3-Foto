import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServices } from "@/lib/data/content";
import { InProduction } from "@/components/layout/InProduction";

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = (await getServices()).find((x) => x.slug === slug);
  return { title: s?.title ?? "Services", robots: { index: false } };
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = (await getServices()).find((x) => x.slug === slug);
  if (!s) notFound();
  return <InProduction index="03" title={s.title} media={s.media} note={`${s.short} The full service page arrives in Milestone 2.`} />;
}
