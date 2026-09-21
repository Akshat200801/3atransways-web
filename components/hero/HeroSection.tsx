"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HeroVideo, type HeroVideoHandle } from "./HeroVideo";
import { HeroOverlay } from "./HeroOverlay";

/**
 * The pinned hero film. ONE ScrollTrigger owns the whole sequence: its
 * progress scrubs the two clips AND plays the master timeline that pops the
 * three text phases in and out, so copy and footage can never drift apart.
 *
 * Phase map (fraction of the pinned scroll):
 *   0.00–0.08  title holds
 *   0.08–0.16  title pops out
 *   0.16–0.24  stats pop in      ─┐
 *   0.24–0.40  stats hold         │ long enough to actually read
 *   0.40–0.46  stats pop out     ─┘
 *   0.46–0.54  clip A → B crossfade (footage carries this beat)
 *   0.54–0.62  port block pops in
 *   0.62–0.88  port block holds
 *   0.88–0.94  port block pops out
 *   0.90–1.00  ink wash into the next section
 */

const POP_IN_FROM = { opacity: 0, scale: 0.94, y: 48, filter: "blur(12px)" };
const POP_IN_TO = {
  opacity: 1,
  scale: 1,
  y: 0,
  filter: "blur(0px)",
  ease: "power3.out" as const,
};
const POP_OUT = {
  opacity: 0,
  scale: 1.06,
  y: -40,
  filter: "blur(10px)",
  ease: "power2.in" as const,
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HeroVideoHandle>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"scrub" | "still" | null>(null);
  const [compact, setCompact] = useState(false);

  // Resolve before paint so the pin is only ever built once, against a
  // subtree that is already in its final shape. Phones scrub too — they just
  // get the 540p/8s encodes, which stay seekable on a mobile decoder.
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCompact(window.matchMedia("(max-width: 767px)").matches);
    setMode(reduced ? "still" : "scrub");
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || mode === null) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // No pin, no scrub. The three phases occupy the same box, so showing
      // them all would stack the copy — keep the title, drop the rest.
      gsap.set(".hero-phase-2, .hero-phase-3, .hero-cue", { display: "none" });
      return;
    }

    const scrubbing = mode === "scrub";
    // Explicit pixels off the viewport: a percentage string here resolves
    // against the trigger, which silently gave the mobile pin zero runway.
    // Phones get a shorter runway to match their shorter 8s clips.
    const screens = scrubbing ? (compact ? 3 : 4) : 1.8;
    const pinLength = () => "+=" + window.innerHeight * screens;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: pinLength,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          // Earliest pin on the page recalculates first, so everything below
          // it measures against the correct expanded height.
          refreshPriority: 2,
          onUpdate(self) {
            if (scrubbing) videoRef.current?.setProgress(self.progress);
          },
        },
      });

      // Positions below are fractions of the pin, because the timeline's
      // total duration works out to 1.
      tl.to(".hero-cue", { opacity: 0, duration: 0.04 }, 0)
        .to(".hero-phase-1", { ...POP_OUT, duration: 0.08 }, 0.08)
        .fromTo(
          ".hero-phase-2",
          POP_IN_FROM,
          { ...POP_IN_TO, duration: 0.08 },
          0.16
        )
        .fromTo(
          ".hero-stat",
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.03, duration: 0.07, ease: "back.out(1.6)" },
          0.17
        )
        .to(".hero-phase-2", { ...POP_OUT, duration: 0.06 }, 0.4)
        .fromTo(
          ".hero-phase-3",
          POP_IN_FROM,
          { ...POP_IN_TO, duration: 0.08 },
          0.54
        )
        .to(".hero-phase-3", { ...POP_OUT, duration: 0.06 }, 0.88)
        .fromTo(
          inkRef.current,
          { opacity: 0 },
          { opacity: 0.85, ease: "none", duration: 0.1 },
          0.9
        );
    }, section);

    return () => ctx.revert();
  }, [mode, compact]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[100svh] w-full overflow-hidden">
      <HeroVideo
        ref={videoRef}
        scrubbing={mode === "scrub"}
        compact={compact}
        resolved={mode !== null}
      />
      <HeroOverlay />
      <div
        ref={inkRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-ink-900 opacity-0"
      />
    </section>
  );
}
