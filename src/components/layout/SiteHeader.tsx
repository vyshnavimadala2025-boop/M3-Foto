"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import type { BrandLogo } from "@/lib/data/brand";
import type { SiteSettings } from "@/lib/schemas/content";
import { Logo } from "@/components/brand/Logo";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { MenuOverlay } from "./MenuOverlay";
import { cn } from "@/lib/utils";

type Props = { logo: BrandLogo; settings: SiteSettings };

/**
 * Minimal header. Transparent over the hero (legible via the hero's top scrim); once past the
 * hero it gains a solid black bar with a hairline. No blend modes, so the logo is never tinted.
 * Hides while scrolling down, returns on the slightest scroll up.
 */
export function SiteHeader({ logo, settings }: Props) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last.current;
      if (Math.abs(delta) > 6) setHidden(delta > 0 && y > window.innerHeight * 0.4);
      setSolid(y > window.innerHeight * 0.75);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes (state adjusted during render, no effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        data-site-header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] border-b text-paper transition-[transform,background-color,border-color] duration-700 ease-(--ease-expo)",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          solid && !open ? "border-line bg-ink/90" : "border-transparent bg-transparent",
        )}
      >
        <div className="px-gutter flex h-(--header-h) items-center justify-between gap-6">
          <TransitionLink href="/" aria-label={`${settings.name} — home`} className="relative z-10 shrink-0">
            <Logo logo={logo} variant="mark" className="h-8 md:h-9" size={36} preload decorative />
          </TransitionLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {settings.navigation.slice(0, 4).map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-start gap-1.5 text-[0.8125rem] tracking-[0.04em]"
                    >
                      <span className="font-mono text-[0.5625rem] leading-none text-paper/50">{item.index}</span>
                      <span className={cn("link-underline pb-0.5", active && "bg-size-[100%_1px]")}>{item.label}</span>
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <TransitionLink
              href={settings.enquiryCta.href}
              className="hidden items-center gap-2 text-[0.8125rem] tracking-[0.04em] lg:inline-flex"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-paper" />
              <span className="link-underline pb-0.5">{settings.enquiryCta.label}</span>
            </TransitionLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group relative z-10 flex h-10 items-center gap-3 lg:hidden"
            >
              <span className="eyebrow">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-2.5 w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-paper transition-transform duration-500 ease-(--ease-expo)",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-paper transition-transform duration-500 ease-(--ease-expo)",
                    open && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{open ? <MenuOverlay settings={settings} onClose={() => setOpen(false)} /> : null}</AnimatePresence>
    </>
  );
}
