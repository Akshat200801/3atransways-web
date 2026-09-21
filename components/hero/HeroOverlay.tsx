"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { n: "14+ yrs", l: "Expertise" },
  { n: "1M+", l: "Containers" },
  { n: "40+", l: "Countries" },
  { n: "99.4%", l: "On-time" },
];

/**
 * Markup and the on-mount intro only. Every scroll-driven phase transition
 * lives on the master timeline in HeroSection, so the text and the footage
 * share one progress value.
 */
export function HeroOverlay() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" })
        .from(
          ".hero-word",
          {
            opacity: 0,
            y: 80,
            rotateX: 20,
            transformOrigin: "0% 50% -50px",
            stagger: 0.09,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(".hero-sub", { opacity: 0, y: 24, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .from(".hero-ctas", { opacity: 0, y: 24, duration: 0.7, ease: "power2.out" }, "-=0.45")
        .from(".hero-cue", { opacity: 0, duration: 0.6 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 z-10" aria-label="Hero content">
      {/* ── Phase 1: Title ─────────────────────────────────────────────── */}
      <div className="hero-phase-1 absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-6">
        <p className="hero-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur sm:mb-6 sm:px-4 sm:text-xs sm:tracking-[0.3em]">
          <span className="h-1.5 w-1.5 rounded-full bg-ocean-400 shadow-[0_0_10px] shadow-ocean-400" />
          Three A Transways · est. 2012
        </p>

        <h1
          className="perspective-[1000px] max-w-[22ch] font-display text-[2rem] font-bold leading-[1.06] tracking-tight text-white [text-wrap:balance] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          style={{ textShadow: "0 2px 30px rgba(10,14,26,0.85), 0 1px 6px rgba(10,14,26,0.7)" }}
        >
          {/* The separating space is a real text node BETWEEN the spans. Put it
              inside an inline-block and the browser trims it, which both ran the
              words together visually and broke the copied/announced text. */}
          {"Global cargo, moved with precision.".split(" ").flatMap((word, i, arr) => {
            const el = (
              <span
                key={word + i}
                className="hero-word inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word === "precision." ? (
                  // text-shadow smears through background-clipped text; a
                  // drop-shadow filter follows the glyph alpha instead.
                  <span
                    className="bg-gradient-to-r from-ocean-400 to-gold-500 bg-clip-text text-transparent"
                    style={{
                      textShadow: "none",
                      filter: "drop-shadow(0 2px 14px rgba(10,14,26,0.9))",
                    }}
                  >
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            );
            return i < arr.length - 1 ? [el, " "] : [el];
          })}
        </h1>

        <p
          className="hero-sub mx-auto mt-5 max-w-[34ch] text-sm text-white/85 sm:mt-8 sm:max-w-2xl sm:text-base lg:text-lg"
          style={{ textShadow: "0 1px 16px rgba(10,14,26,0.9)" }}
        >
          Sea, air and road freight backed by warehousing, customs and project-cargo
          expertise. From the docks of Nhava Sheva to your line-haul carrier, we handle the
          supply chain — you focus on the business.
        </p>

        <div className="hero-ctas mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/contact"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-ocean-500/30 transition hover:shadow-ocean-500/50"
          >
            Request a rate
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Explore services
          </Link>
        </div>
      </div>

      {/* ── Phase 2: Stat strip ────────────────────────────────────────── */}
      <div className="hero-phase-2 absolute inset-0 flex items-center justify-center px-5 opacity-0 sm:px-6">
        <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-none sm:grid-cols-4 sm:gap-5">
          {STATS.map(({ n, l }) => (
            <div
              key={l}
              className="hero-stat flex flex-col items-center rounded-2xl border border-white/20 bg-ink-900/65 px-4 py-5 text-center shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-7 sm:py-6"
            >
              <span className="font-display text-2xl font-bold text-white sm:text-4xl">{n}</span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Phase 3: Port arrival ──────────────────────────────────────── */}
      <div className="hero-phase-3 absolute inset-0 flex flex-col items-center justify-center px-5 text-center opacity-0 sm:px-6">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-ocean-400 sm:text-xs sm:tracking-[0.4em]">
          Sea · Air · Road · Warehouse
        </p>
        <p
          className="max-w-[16ch] font-display text-[2rem] font-bold leading-[1.08] text-white [text-wrap:balance] sm:max-w-none sm:text-5xl lg:text-7xl"
          style={{ textShadow: "0 2px 30px rgba(10,14,26,0.85), 0 1px 6px rgba(10,14,26,0.7)" }}
        >
          One partner.{" "}
          <span
            className="bg-gradient-to-r from-ocean-400 to-gold-500 bg-clip-text text-transparent"
            style={{ textShadow: "none", filter: "drop-shadow(0 2px 14px rgba(10,14,26,0.9))" }}
          >
            Every mode.
          </span>
        </p>
        <Link
          href="/services"
          className="group mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
        >
          Explore services
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="hero-cue absolute bottom-7 left-1/2 -translate-x-1/2 text-white/45"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </div>
  );
}
