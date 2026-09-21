"use client";

import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** Access the page's Lenis instance (null until it mounts). */
export const useLenis = () => useContext(LenisContext);

/**
 * Initialises Lenis smooth scroll and wires it into GSAP ScrollTrigger
 * so that all scroll-driven GSAP animations stay in sync with Lenis RAF.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Honour reduced motion: no smoothing layer, native scrolling only.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    instance.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    // Fonts, the lazy globe and the panel photos all land after the triggers
    // first measure the page. Without a refresh their start points stay stale,
    // reveals never fire, and gsap.from() leaves that content invisible.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(ticker);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
