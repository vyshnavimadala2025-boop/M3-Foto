import { getBrandLogo } from "@/lib/data/brand";
import {
  getFeaturedCollections,
  getFeaturedProjects,
  getHomeContent,
  getMedia,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/data/content";
import { Hero } from "@/components/sections/home/Hero";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { FeaturedCollections } from "@/components/sections/home/FeaturedCollections";
import { Pillars } from "@/components/sections/home/Pillars";
import { Services } from "@/components/sections/home/Services";
import { SelectedProjects } from "@/components/sections/home/SelectedProjects";
import { Approach } from "@/components/sections/home/Approach";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { SocialWall } from "@/components/sections/home/SocialWall";
import { InquiryCta } from "@/components/sections/home/InquiryCta";

export default async function HomePage() {
  const [home, settings, logo, collections, projects, services, testimonials] = await Promise.all([
    getHomeContent(),
    getSiteSettings(),
    getBrandLogo(),
    getFeaturedCollections(),
    getFeaturedProjects(),
    getServices(),
    getTestimonials(),
  ]);
  const { hero, manifesto, pillars, approach, social, cta } = home;
  const instagram = settings.social.find((s) => s.platform === "instagram");

  return (
    <>
      <Hero
        logo={logo}
        tagline={settings.tagline}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        slides={hero.slides.map((s) => ({ media: getMedia(s.mediaId), caption: s.caption }))}
        intervalSeconds={hero.intervalSeconds}
      />
      {manifesto.visible ? (
        <Manifesto index={manifesto.index} label={manifesto.label} statement={manifesto.statement} note={manifesto.note} media={getMedia(manifesto.mediaId)} />
      ) : null}
      {home.collections.visible && collections.length ? (
        <FeaturedCollections {...home.collections} items={collections} />
      ) : null}
      {pillars.visible ? <Pillars index={pillars.index} label={pillars.label} media={getMedia(pillars.mediaId)} items={pillars.items} /> : null}
      {home.services.visible && services.length ? <Services {...home.services} items={services} /> : null}
      {home.projects.visible && projects.length ? <SelectedProjects {...home.projects} items={projects} /> : null}
      {approach.visible ? (
        <Approach
          index={approach.index}
          label={approach.label}
          title={approach.title}
          steps={approach.steps.map((s) => ({ ...s, media: getMedia(s.mediaId) }))}
        />
      ) : null}
      {home.testimonials.visible && testimonials.length ? (
        <Testimonials index={home.testimonials.index} label={home.testimonials.label} items={testimonials} />
      ) : null}
      {social.visible ? (
        <SocialWall
          index={social.index}
          label={social.label}
          title={social.title}
          media={social.mediaIds.map(getMedia)}
          instagram={instagram ? { label: instagram.label, url: instagram.url } : undefined}
        />
      ) : null}
      {cta.visible ? (
        <InquiryCta index={cta.index} label={cta.label} headline={cta.headline} supporting={cta.supporting} button={cta.button} media={getMedia(cta.mediaId)} />
      ) : null}
    </>
  );
}
