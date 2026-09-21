"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE = "a, button, [role='button'], input, select, textarea";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Pointer-coarse devices (touch) get the native behaviour, no custom cursor.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Only hide the OS pointer once this component is actually alive, so a
    // JS failure never leaves the page with no cursor at all.
    document.body.classList.add("custom-cursor");

    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power2.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
    };

    // Delegated, so links mounted later (mobile menu, dynamic sections) count.
    const onOver = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest?.(INTERACTIVE)) return;
      gsap.to(ring, {
        scale: 1.6,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0.5, duration: 0.2 });
    };

    const onOut = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest?.(INTERACTIVE)) return;
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(56,189,248,0.6)",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-400 mix-blend-difference [body.custom-cursor_&]:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-ocean-400/60 [body.custom-cursor_&]:block"
      />
    </>
  );
}
