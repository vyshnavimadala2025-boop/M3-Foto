import type { Metadata } from "next";
import { getMedia } from "@/lib/data/content";
import { InProduction } from "@/components/layout/InProduction";

export const metadata: Metadata = { title: "Studio", robots: { index: false } };

export default function Page() {
  return <InProduction index="02" title="Studio" media={getMedia("pillars-maker")} note="The studio story, philosophy and team are being crafted in Milestone 2." />;
}
