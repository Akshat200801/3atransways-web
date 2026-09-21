"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";

const GlobeComponent = dynamic(() => import("./GlobeComponent"), { ssr: false });

const BULLETS = [
  "Direct relationships with every major carrier — no middlemen, no markup",
  "Customs clearance staff at JNPT, Mundra & Nhava Sheva",
  "24×7 operations desk — you talk to a human, not a ticket",
  "Live tracking visibility from booking to delivery",
];

export function AboutGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const vantaHostRef = useRef<HTMLDivElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const [showGlobe, setShowGlobe] = useState(false);

  // globe.gl pulls in three.js — a few hundred KB plus a live WebGL canvas.
  // Phones get the copy instead; the chunk is never requested.
  useLayoutEffect(() => {
    setShowGlobe(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  // Vanta NET behind the globe half.
  useEffect(() => {
    const host = vantaHostRef.current;
    if (!host) return;
    // Skip the WebGL layer where it costs most and shows least.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let effect: any;

    (async () => {
      const [THREE, NET] = await Promise.all([
        import("three"),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — vanta ships no types
        import("vanta/dist/vanta.net.min"),
      ]);
      if (cancelled || !vantaHostRef.current) return;

      effect = (NET.default ?? NET)({
        el: vantaHostRef.current,
        THREE,
        color: 0x38bdf8,
        backgroundColor: 0x0a0e1a,
        points: 8,
        maxDistance: 20,
        spacing: 15,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
      });
    })();

    return () => {
      cancelled = true;
      effect?.destroy?.();
    };
  }, []);

  // Entry animations.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      const trigger = { trigger: section, start: "top 70%" } as const;

      gsap.fromTo(
        globeWrapRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: trigger }
      );

      gsap.fromTo(
        ".about-underline",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.8, ease: "power2.out", scrollTrigger: trigger }
      );

      const heading = section.querySelector<HTMLElement>(".about-heading");
      if (heading) {
        const split = new SplitText(heading, { type: "words" });
        splits.push(split);
        gsap.from(split.words, {
          opacity: 0,
          y: 40,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: trigger,
        });
      }

      gsap.from(".about-body", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: trigger,
      });

      gsap.from(".about-bullet", {
        opacity: 0,
        x: -30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: trigger,
      });
    }, section);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-ink-900 py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Globe half — desktop and tablet only */}
        <div className="relative hidden md:block">
          <div
            ref={vantaHostRef}
            aria-hidden
            className="absolute inset-0 -m-8 rounded-3xl opacity-50"
          />
          <div ref={globeWrapRef} className="relative">
            {showGlobe && <GlobeComponent />}
          </div>
        </div>

        {/* Text half */}
        <div className="relative flex flex-col justify-center">
          <p className="relative inline-block self-start text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400">
            The 3A way
            <svg
              aria-hidden
              className="absolute -bottom-2 left-0 w-full"
              height="2"
              viewBox="0 0 120 2"
              preserveAspectRatio="none"
            >
              <line
                className="about-underline"
                x1="0"
                y1="1"
                x2="120"
                y2="1"
                stroke="#38bdf8"
                strokeWidth="2"
              />
            </svg>
          </p>

          <h2 className="about-heading mt-6 font-display text-3xl font-bold sm:text-5xl">
            Over a decade of moving <span className="gradient-text">what matters</span>.
          </h2>

          <p className="about-body mt-6 text-white/70">
            Three A Transways began out of a small Jaipur office in 2012 — a single
            broker, a battered Ambassador, and a notebook full of cargo manifests. Today
            we&apos;re a full-stack logistics partner moving thousands of shipments a year
            across sea, air, road and warehouse — but the obsession&apos;s unchanged: get the
            customer&apos;s cargo on time, every time, however unreasonable the timeline.
          </p>

          <ul className="mt-8 space-y-3">
            {BULLETS.map((item) => (
              <li key={item} className="about-bullet flex gap-3 text-sm text-white/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-400 shadow-[0_0_10px] shadow-ocean-400" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="group mt-10 inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-semibold text-ocean-400"
          >
            Our story in detail
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
