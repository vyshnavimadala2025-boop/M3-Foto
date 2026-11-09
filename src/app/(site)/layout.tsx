import { getBrandLogo } from "@/lib/data/brand";
import { getSiteSettings } from "@/lib/data/content";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransition } from "@/components/motion/PageTransition";
import { Cursor } from "@/components/motion/Cursor";
import { Grain } from "@/components/motion/Grain";
import { JsonLd } from "@/components/seo/JsonLd";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [logo, settings] = await Promise.all([getBrandLogo(), getSiteSettings()]);

  return (
    <PageTransition>
      <a
        href="#main"
        className="eyebrow fixed left-4 top-4 z-[130] -translate-y-24 bg-paper px-4 py-3 text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <SiteHeader logo={logo} settings={settings} />
      <main id="main" className="relative z-10 bg-graphite">
        {children}
      </main>
      <SiteFooter logo={logo} settings={settings} />
      <Grain />
      <Cursor />
      <JsonLd settings={settings} />
    </PageTransition>
  );
}
