"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { gsap } from "@/lib/gsap";

/**
 * Closing banner over a Vanta WAVES surface. Scrolling through the section
 * drives the wave speed and height up, then back to base on the way out.
 */
export function ParallaxCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneIconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let effect: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let waveTrigger: any;

    const mobile = window.matchMedia("(max-width: 767px)").matches;

    (async () => {
      if (reduced || mobile) return;
      const [THREE, WAVES] = await Promise.all([
        import("three"),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — vanta ships no types
        import("vanta/dist/vanta.waves.min"),
      ]);
      if (cancelled || !sectionRef.current) return;

      effect = (WAVES.default ?? WAVES)({
        el: sectionRef.current,
        THREE,
        color: 0x0a1628,
        shininess: 35,
        waveHeight: 18,
        waveSpeed: 0.6,
        zoom: 0.75,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
      });

      const { ScrollTrigger } = await import("@/lib/gsap");
      waveTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          if (!effect?.setOptions) return;
          // Peak in the middle of the pass-through, base at either edge.
          const intensity = 1 - Math.abs(self.progress - 0.5) * 2;
          effect.setOptions({
            waveSpeed: 0.6 + intensity * 1.4,
            waveHeight: 18 + intensity * 17,
          });
        },
      });
    })();

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".cta-line", {
        clipPath: "inset(0 100% 0 0)",
        stagger: 0.3,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });
      gsap.from(".cta-sub", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        delay: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });
      gsap.from(".cta-buttons", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        delay: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });
    }, section);

    return () => {
      cancelled = true;
      waveTrigger?.kill();
      effect?.destroy?.();
      ctx.revert();
    };
  }, []);

  function shakePhone() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      phoneIconRef.current,
      { x: 0 },
      { keyframes: { x: [0, -3, 3, -3, 0] }, duration: 0.4, ease: "power2.out" }
    );
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[520px] items-center justify-center overflow-hidden py-24 md:h-[80vh] md:py-0"
    >
      {/* Standing in for Vanta where it doesn't run (mobile, reduced motion). */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(14,165,233,0.25),transparent_60%),linear-gradient(to_bottom,#0a0e1a,#0a1628)] md:bg-none"
      />
      <div aria-hidden className="absolute inset-0 bg-ink-900/40" />

      <div className="relative max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          <span className="cta-line block">One quote.</span>
          <span className="cta-line block gradient-text">Every mode.</span>
          <span className="cta-line block">Every port. Every week.</span>
        </h2>

        <p className="cta-sub mx-auto mt-6 max-w-xl text-base text-white/70">
          Tell us what&apos;s moving and where. We&apos;ll come back inside 4 business hours
          with a comparable rate across sea, air and road.
        </p>

        <div className="cta-buttons mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="liquid-border group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white"
          >
            Request a rate
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+919928084656"
            onMouseEnter={shakePhone}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            <span ref={phoneIconRef} className="inline-flex">
              <Phone className="h-4 w-4" />
            </span>
            Call +91 99280 84656
          </a>
        </div>
      </div>
    </section>
  );
}
