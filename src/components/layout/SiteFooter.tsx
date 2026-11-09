import type { BrandLogo } from "@/lib/data/brand";
import type { SiteSettings } from "@/lib/schemas/content";
import { Logo } from "@/components/brand/Logo";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { BackToTop } from "./BackToTop";

/**
 * Footer revealed from beneath the page: the outer wrapper clips a fixed inner panel,
 * so the page lifts away like a print being drawn off the enlarger.
 */
export function SiteFooter({ logo, settings }: { logo: BrandLogo; settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const socials = settings.social;
  const { email, phone, location } = settings.contact;
  const hasContact = Boolean(email || phone || location);

  return (
    <footer
      className="relative md:h-[min(100svh,56rem)] md:min-h-[40rem]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* Phones: normal flow (content is taller than a screen). md+: fixed panel revealed from beneath. */}
      <div className="relative flex w-full flex-col justify-between gap-16 bg-ink px-gutter pb-8 pt-24 md:fixed md:bottom-0 md:left-0 md:h-[min(100svh,56rem)] md:min-h-[40rem] md:gap-0 md:pt-[calc(var(--header-h)+2rem)]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-x-8">
          <div className="col-span-2 md:col-span-5">
            <Logo logo={logo} variant="lockup" className="h-20 md:h-28" size={112} />
            <p className="mt-8 max-w-sm text-pretty text-[0.9375rem] leading-relaxed text-mist">{settings.description}</p>
          </div>

          <nav aria-label="Footer" className="row-span-2 md:row-span-1 md:col-span-2 md:col-start-7">
            <p className="eyebrow mb-5 text-steel">Navigate</p>
            <ul className="space-y-2.5">
              {settings.navigation.map((n) => (
                <li key={n.href}>
                  <TransitionLink href={n.href} className="link-underline pb-0.5 text-[0.9375rem]">
                    {n.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-steel">Contact</p>
            {hasContact ? (
              <ul className="space-y-2.5 text-[0.9375rem]">
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className="link-underline pb-0.5">{email}</a>
                  </li>
                ) : null}
                {phone ? (
                  <li>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="link-underline pb-0.5">{phone}</a>
                  </li>
                ) : null}
                {location ? <li className="text-mist">{location}</li> : null}
              </ul>
            ) : (
              <TransitionLink href="/contact" className="link-underline pb-0.5 text-[0.9375rem]">
                Send an enquiry
              </TransitionLink>
            )}
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-steel">Follow</p>
            <ul className="space-y-2.5 text-[0.9375rem]">
              {socials.map((s) => (
                <li key={s.platform}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-underline pb-0.5">
                      {s.label}
                    </a>
                  ) : (
                    <span className="text-steel" title="Link not configured yet">{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          {/* Bookends the hero: the page closes on the line it opened with. */}
          <p
            aria-hidden
            className="font-display select-none whitespace-nowrap text-[clamp(1.5rem,8.4vw,11rem)] uppercase leading-[0.82] tracking-[-0.025em] text-paper"
          >
            Every frame has a <em className="italic normal-case text-mist">story.</em>
          </p>
          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-xs text-steel md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {settings.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <TransitionLink href="/credits" className="link-underline pb-0.5">
                Image credits
              </TransitionLink>
              <BackToTop />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
