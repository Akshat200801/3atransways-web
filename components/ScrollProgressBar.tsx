"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate(self: { progress: number }) {
        gsap.set(bar, { scaleX: self.progress, transformOrigin: "left center" });
      },
    });
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9997] h-[2px] w-full origin-left bg-gradient-to-r from-ocean-400 to-gold-500 opacity-80"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
