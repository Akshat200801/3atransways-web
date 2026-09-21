"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HeroVideo, type HeroVideoHandle } from "@/components/hero/HeroVideo";
import { HeroOverlay } from "@/components/hero/HeroOverlay";

/**
 * Marlin-style scroll-scrubbed hero.
 *
 * The outer wrapper is 400vh tall. The inner "stage" is position:sticky so
 * it occupies the viewport while the user scrolls through that 400vh. As
 * they scroll, GSAP ScrollTrigger drives video.currentTime via HeroVideo.
 *
 * On mobile (< 768px) the video is replaced with the poster image — video
 * currentTime scrubbing is too heavy for most mobile GPUs.
 */
export function Hero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HeroVideoHandle>(null);
  const [videoReady, setVideoReady] = useState(false);

  useGSAP(() => {
    // Drive video currentTime from scroll progress
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self: { progress: number }) {
        videoRef.current?.setProgress(self.progress);
      },
    });
  }, { scope: wrapperRef, dependencies: [videoReady] });

  return (
    // 400vh outer wrapper — gives the sticky stage its scroll range
    <section ref={wrapperRef} className="relative h-[400vh]" aria-label="Hero">

      {/* Sticky stage — stays at the top while wrapper scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Poster shown while video is loading (or always on mobile) */}
        {!videoReady && (
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/img/hero-poster.jpg')" }}
          />
        )}

        {/* Scroll-scrubbed video — hidden on small screens */}
        <div className={`absolute inset-0 transition-opacity duration-700 max-md:hidden ${videoReady ? "opacity-100" : "opacity-0"}`}>
          <HeroVideo ref={videoRef} onReady={() => setVideoReady(true)} />
        </div>

        {/* Mobile: static poster image + overlay */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-cover bg-center max-md:block"
          style={{ backgroundImage: "url('/img/hero-poster.jpg')" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/20 to-ink-900/90 md:hidden"
        />

        {/* Text overlay — always visible */}
        <HeroOverlay />
      </div>
    </section>
  );
}
