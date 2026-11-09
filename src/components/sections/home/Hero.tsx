"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BrandLogo } from "@/lib/data/brand";
import type { Cta, MediaAsset } from "@/lib/schemas/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { Frame } from "@/components/media/Frame";
import { Logo } from "@/components/brand/Logo";
import { AccentText } from "@/components/ui/AccentText";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { pad } from "@/lib/utils";

type Slide = { media: MediaAsset; caption: string };
type Props = {
  logo: BrandLogo;
  tagline: string;
  headline: string[];
  supporting: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  slides: Slide[];
  intervalSeconds: number;
};

export function Hero({ logo, tagline, headline, supporting, primaryCta, secondaryCta, slides, intervalSeconds }: Props) {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const progress = useRef<gsap.core.Tween | null>(null);
  const prev = useRef(0);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState<number[]>([0]);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [reduce, setReduce] = useState(false);
  const count = slides.length;

  /* ── Opening sequence ─────────────────────────────────────────────── */
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const html = document.documentElement;
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setReduce(reduced);

      const frame = el.querySelector("[data-hero-frame]");
      const firstInner = el.querySelector("[data-slide='0'] [data-slide-inner]");
      const lines = el.querySelectorAll("[data-hero-line]");
      const fades = el.querySelectorAll("[data-hero-fade]");
      const intro = el.querySelector<HTMLElement>("[data-hero-intro]");

      if (reduced) {
        html.classList.add("hero-ready");
        setReady(true);
        setPaused(true);
        return;
      }

      const full = !html.classList.contains("intro-seen");
      try {
        sessionStorage.setItem("m3-intro", "1");
      } catch {}

      // Hand over from the CSS pre-paint state to inline GSAP state, same values.
      gsap.set(frame, { clipPath: full ? "inset(50% 0% 50% 0%)" : "inset(37% 0% 37% 0%)" });
      gsap.set(firstInner, { scale: 1.35 });
      gsap.set(lines, { y: 0, yPercent: 110 });
      gsap.set(fades, { autoAlpha: 0, y: 14, yPercent: 0 });
      if (header) gsap.set(header, { autoAlpha: 0 });
      html.classList.add("hero-ready", "intro-seen");

      const tl = gsap.timeline({ delay: 0.1, onComplete: () => setReady(true) });

      if (full && intro) {
        gsap.set(intro, { display: "flex", autoAlpha: 1 });
        const counter = intro.querySelector("[data-intro-count]");
        const mark = intro.querySelector("[data-intro-logo]");
        const tagline = intro.querySelector("[data-intro-tagline]");
        const ring = intro.querySelector("[data-intro-ring] circle");
        const ringWrap = intro.querySelector("[data-intro-ring]");
        const n = { v: 0 };
        tl.to(n, {
          v: 100,
          duration: 1.45,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter) counter.textContent = pad(Math.round(n.v), 3);
          },
        }, 0)
          .fromTo(ring, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 0)
          .fromTo(mark, { yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: "expo" }, 0.15)
          .fromTo(tagline, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "film" }, 0.55)
          .to(ringWrap, { scale: 1.12, autoAlpha: 0, duration: 0.6, ease: "power3.in" }, 1.35)
          .to([mark, tagline], { yPercent: -40, autoAlpha: 0, duration: 0.5, ease: "power3.in", stagger: 0.05 }, 1.4)
          .to(intro, { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, 1.75)
          .set(intro, { display: "none" });

        // Any input fast-forwards the logo moment.
        const skip = () => {
          if (tl.time() < 1.5) tl.seek(1.5);
        };
        const opts = { once: true, passive: true } as const;
        window.addEventListener("pointerdown", skip, opts);
        window.addEventListener("keydown", skip, opts);
        window.addEventListener("wheel", skip, opts);
        window.addEventListener("touchstart", skip, opts);
      } else if (intro) {
        gsap.set(intro, { display: "none" });
      }

      const at = full ? 1.6 : -0.6;
      // Explicit four-value fromTo: browsers serialise inset() in shortened form, which breaks
      // GSAP's positional string interpolation if the start value is read back from the DOM.
      if (full) tl.fromTo(frame, { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(37% 0% 37% 0%)", duration: 0.9, ease: "film" }, at);
      tl.fromTo(
        frame,
        { clipPath: "inset(37% 0% 37% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "expo.inOut", immediateRender: false },
        Math.max(0, at + 0.75),
      )
        .to(firstInner, { scale: 1.06, duration: 2.2, ease: "expo.inOut" }, Math.max(0, at))
        .to(lines, { yPercent: 0, duration: 1.3, stagger: 0.09, ease: "expo" }, at + 1.2)
        .to(fades, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06, ease: "power3.out" }, at + 1.45);
      if (header) tl.to(header, { autoAlpha: 1, duration: 0.9, ease: "power2.out" }, at + 1.45);
      tl.add(() => {
        if (header) gsap.set(header, { clearProps: "opacity,visibility" });
      });

      // Scroll hand-off: image sinks, type lifts and fades, a veil darkens the frame.
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to("[data-hero-parallax]", { yPercent: 22, ease: "none" }, 0)
        .to("[data-hero-content]", { yPercent: -18, autoAlpha: 0, ease: "none" }, 0)
        .to("[data-hero-veil]", { opacity: 0.7, ease: "none" }, 0);
    },
    { scope: root },
  );

  /* ── Pause autoplay off-screen / hidden tab ───────────────────────── */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(Boolean(e?.isIntersecting)), { threshold: 0.15 });
    io.observe(el);
    const vis = () => setInView(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  const go = useCallback(
    (next: number) => {
      const i = ((next % count) + count) % count;
      setMounted((m) => Array.from(new Set([...m, i, (i + 1) % count])));
      setActive(i);
    },
    [count],
  );

  /* ── Progress bar drives autoplay ─────────────────────────────────── */
  useEffect(() => {
    if (!ready || !bar.current || count < 2) return;
    // Preload the next frame while this one plays.
    setMounted((m) => Array.from(new Set([...m, (active + 1) % count])));
    progress.current?.kill();
    progress.current = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, duration: intervalSeconds, ease: "none", onComplete: () => go(active + 1) },
    );
    return () => {
      progress.current?.kill();
    };
  }, [active, ready, intervalSeconds, go, count]);

  useEffect(() => {
    progress.current?.paused(paused || !inView);
  }, [paused, inView, active, ready]);

  /* ── Film-advance transition ──────────────────────────────────────── */
  useEffect(() => {
    const el = root.current;
    const from = prev.current;
    if (!el || from === active) return;
    prev.current = active;
    const inc = el.querySelector<HTMLElement>(`[data-slide='${active}']`);
    const out = el.querySelector<HTMLElement>(`[data-slide='${from}']`);
    if (!inc || !out) return;
    const incInner = inc.querySelector("[data-slide-inner]");
    const outInner = out.querySelector("[data-slide-inner]");
    el.querySelectorAll<HTMLElement>("[data-slide]").forEach((s) => {
      if (s !== inc && s !== out) gsap.set(s, { zIndex: 0 });
    });

    if (reduce) {
      gsap.set(inc, { zIndex: 2, clipPath: "none", autoAlpha: 0 });
      gsap.set(out, { zIndex: 1 });
      gsap.to(inc, { autoAlpha: 1, duration: 0.6, ease: "none" });
      return;
    }

    gsap.set(out, { zIndex: 1 });
    gsap.set(inc, { zIndex: 2, autoAlpha: 1 });
    gsap
      .timeline()
      .fromTo(inc, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "film" }, 0)
      .fromTo(incInner, { scale: 1.22, xPercent: 8 }, { scale: 1.06, xPercent: 0, duration: 2, ease: "expo" }, 0)
      .to(outInner, { xPercent: -10, duration: 1.5, ease: "film" }, 0)
      .add(() => {
        gsap.set(outInner, { xPercent: 0 });
        gsap.set(out, { zIndex: 0 });
      })
      .to(incInner, { scale: 1, duration: intervalSeconds, ease: "none" });
  }, [active, reduce, intervalSeconds]);

  const current = slides[active];

  return (
    <section
      ref={root}
      data-hero
      aria-label="Introduction"
      className="relative h-svh min-h-[34rem] overflow-hidden bg-ink"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
    >
      {/* Photography */}
      <div data-hero-parallax className="absolute inset-0 will-change-transform">
        <div data-hero-frame className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={s.media.id}
              data-slide={i}
              aria-hidden={i !== active}
              className="absolute inset-0 overflow-hidden"
              style={{ zIndex: i === 0 ? 2 : 0 }}
            >
              <div data-slide-inner className="absolute inset-0 will-change-transform">
                {mounted.includes(i) ? (
                  <Frame media={s.media} sizes="100vw" preload={i === 0} quality={75} badge={false} className="h-full w-full" />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legibility scrims (functional, not decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-b from-ink/65 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-linear-to-t from-ink/85 via-ink/35 to-transparent" />
      <div data-hero-veil aria-hidden className="pointer-events-none absolute inset-0 bg-ink opacity-0" />

      {/* Film-edge detail */}
      <p
        data-hero-fade
        aria-hidden
        className="eyebrow pointer-events-none absolute right-[calc(var(--spacing-gutter)*0.5)] top-1/2 hidden origin-center -translate-y-1/2 translate-x-1/2 rotate-90 whitespace-nowrap text-paper/55 xl:block"
      >
        {tagline} — Photography Studio
      </p>

      {/* Copy */}
      <div data-hero-content className="px-gutter absolute inset-x-0 bottom-0 z-10 pb-6 md:pb-8">
        <h1 className="display-xl uppercase" aria-label={headline.join(" ").replace(/\*/g, "")}>
          {headline.map((line, i) => (
            <span key={i} aria-hidden className="line-mask block">
              <span data-hero-line className="block will-change-transform">
                <AccentText text={line} />
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-6 border-t border-paper/20 pt-5 md:mt-10 md:grid-cols-2 md:items-end md:gap-8 lg:grid-cols-12">
          <p data-hero-fade className="max-w-[34ch] text-pretty text-[0.9375rem] leading-relaxed text-paper/80 lg:col-span-4">
            {supporting}
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-end lg:col-span-5 lg:justify-start">
            <Button href={primaryCta.href} variant="solid">
              {primaryCta.label}
            </Button>
            <ArrowLink href={secondaryCta.href}>{secondaryCta.label}</ArrowLink>
          </div>

          <div data-hero-fade className="flex items-end justify-between gap-6 md:col-span-2 lg:col-span-3 lg:justify-end">
            <div className="w-full md:max-w-72 lg:max-w-56">
              <div className="eyebrow flex items-center justify-between gap-4 text-paper/70">
                <span className="font-mono tracking-[0.12em]">
                  <span className="text-paper">FR {pad(active + 1)}</span> / {pad(count)}
                </span>
                <span className="block overflow-hidden" aria-live="polite">
                  <span key={active} className="caption-in block">
                    {current?.caption}
                  </span>
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="relative block h-px flex-1 bg-paper/20">
                  <span ref={bar} className="absolute inset-0 block origin-left scale-x-0 bg-paper" />
                </span>
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  className="grid size-6 place-items-center text-paper/80 hover:text-paper"
                >
                  {paused ? (
                    <svg aria-hidden viewBox="0 0 12 12" className="size-2.5 fill-current"><path d="M2 1l9 5-9 5z" /></svg>
                  ) : (
                    <svg aria-hidden viewBox="0 0 12 12" className="size-2.5 fill-current"><path d="M2 1h3v10H2zM7 1h3v10H7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            <div className="hidden flex-col items-center gap-3 md:flex" aria-hidden>
              <span className="eyebrow text-paper/60 [writing-mode:vertical-rl]">Scroll</span>
              <span className="scroll-cue relative block h-14 w-px overflow-hidden bg-paper/20" />
            </div>
          </div>
        </div>
      </div>

      {current?.media.placeholder ? (
        <PlaceholderBadge className="absolute right-[var(--spacing-gutter)] top-[calc(var(--header-h)+0.75rem)] z-10" />
      ) : null}

      {/* Opening: the original logo, staged — circle draws, mark rises, tagline develops */}
      <div data-hero-intro aria-hidden className="absolute inset-0 z-30 flex-col items-center justify-center bg-ink">
        <div className="relative grid place-items-center">
          <svg
            data-intro-ring
            viewBox="0 0 100 100"
            className="pointer-events-none absolute size-[min(78vw,30rem)] -rotate-90 overflow-visible"
          >
            <circle cx="50" cy="50" r="49.6" fill="none" stroke="currentColor" strokeWidth="0.25" className="text-paper/25" pathLength={1} strokeDasharray="1" strokeDashoffset="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="flex flex-col items-center gap-[1.1rem] md:gap-6">
            <div className="overflow-hidden px-1 pt-1">
              <div data-intro-logo>
                <Logo logo={logo} variant="mark" className="h-24 md:h-32" size={128} preload decorative />
              </div>
            </div>
            <div data-intro-tagline style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
              <Logo logo={logo} variant="tagline" className="h-[0.9rem] md:h-[1.15rem]" size={19} preload decorative />
            </div>
          </div>
        </div>
        <span data-intro-count className="eyebrow absolute bottom-8 left-[var(--spacing-gutter)] font-mono text-mist">
          000
        </span>
        <span className="eyebrow absolute bottom-8 right-[var(--spacing-gutter)] text-steel">Every frame has a story</span>
      </div>
    </section>
  );
}
