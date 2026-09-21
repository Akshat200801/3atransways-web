"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "./SmoothScrollProvider";

const SECTIONS = [
  { id: "hero", label: "Top" },
  { id: "track-record", label: "Track record" },
  { id: "services", label: "Services" },
  { id: "about", label: "The 3A way" },
  { id: "contact", label: "Get a quote" },
];

export function SectionIndicator() {
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const triggers = SECTIONS.map((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => self.isActive && setActive(i),
      });
    });
    return () => triggers.forEach((t) => t?.kill());
  }, []);

  function go(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => go(s.id)}
          aria-label={`Jump to ${s.label}`}
          aria-current={i === active ? "true" : undefined}
          className="group grid h-6 w-6 place-items-center"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              i === active
                ? "h-2.5 w-2.5 bg-ocean-400 shadow-[0_0_12px] shadow-ocean-400"
                : "h-1.5 w-1.5 bg-white/25 group-hover:bg-white/60"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
