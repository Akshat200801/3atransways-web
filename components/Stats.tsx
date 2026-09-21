"use client";

import { useRef, useEffect } from "react";
import { gsap, SplitText } from "@/lib/gsap";

type Tone = "gold" | "ocean" | "emerald" | "violet";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  tone: Tone;
}

const TONE: Record<Tone, { bar: string; halo: string; ring: string; glow: string; chip: string }> = {
  gold: {
    bar: "bg-gradient-to-b from-amber-400 to-transparent",
    halo: "bg-amber-400/20",
    ring: "ring-amber-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(251_191_36_/_0.35)]",
    chip: "text-amber-300",
  },
  ocean: {
    bar: "bg-gradient-to-b from-sky-400 to-transparent",
    halo: "bg-sky-400/20",
    ring: "ring-sky-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(56_189_248_/_0.4)]",
    chip: "text-sky-300",
  },
  emerald: {
    bar: "bg-gradient-to-b from-emerald-400 to-transparent",
    halo: "bg-emerald-400/20",
    ring: "ring-emerald-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(52_211_153_/_0.35)]",
    chip: "text-emerald-300",
  },
  violet: {
    bar: "bg-gradient-to-b from-violet-400 to-transparent",
    halo: "bg-violet-400/20",
    ring: "ring-violet-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(167_139_250_/_0.35)]",
    chip: "text-violet-300",
  },
};

const STATS: Stat[] = [
  { value: 14, suffix: "+ yrs", label: "Of operating expertise", tone: "gold" },
  { value: 1000000, suffix: "+", label: "Containers delivered", tone: "ocean" },
  { value: 40, suffix: "+", label: "Countries served", tone: "emerald" },
  { value: 99.4, suffix: "%", label: "On-time clearance rate", tone: "violet" },
];

// en-US grouping, not en-IN: the approved copy reads "1,000,000+", whereas
// Indian lakh grouping would render it "10,00,000+".
function format(value: number, target: number) {
  return Number.isInteger(target)
    ? Math.round(value).toLocaleString("en-US")
    : value.toFixed(1);
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>(".stats-eyebrow");
      let split: SplitText | null = null;

      if (eyebrow && !reduced) {
        split = new SplitText(eyebrow, { type: "chars" });
        gsap.from(split.chars, {
          opacity: 0,
          y: 30,
          rotateX: -30,
          stagger: 0.02,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>(".stat-card");

      cards.forEach((card, i) => {
        if (!reduced) {
          gsap.from(card, {
            opacity: 0,
            y: 80,
            rotateY: -8,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: section, start: "top 75%" },
          });

          gsap.fromTo(
            card.querySelector(".stat-bar"),
            { height: "0%" },
            {
              height: "60%",
              duration: 0.9,
              ease: "power2.out",
              delay: i * 0.12 + 0.2,
              scrollTrigger: { trigger: section, start: "top 75%" },
            }
          );
        }

        const counter = card.querySelector<HTMLElement>(".stat-value");
        const target = Number(card.dataset.value);
        if (!counter || Number.isNaN(target)) return;

        if (reduced) {
          counter.textContent = format(target, target);
          return;
        }

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = format(obj.val, target);
          },
          scrollTrigger: { trigger: card, start: "top 80%" },
        });
      });

      return () => split?.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="track-record"
      className="relative overflow-hidden bg-ink-900 py-24 lg:py-32"
    >
      {/* Mesh gradient — slow ocean blobs, barely there */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-ocean-500/10 blur-[120px] animate-mesh-drift" />
        <div className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-gold-500/[0.07] blur-[120px] animate-mesh-drift-slow" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 text-center">
          <p className="stats-eyebrow text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400">
            Track record
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Numbers that move <span className="gradient-text">cargo</span> — and earn trust.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: "1200px" }}
        >
          {STATS.map((s) => {
            const t = TONE[s.tone];
            return (
              <div
                key={s.label}
                data-value={s.value}
                className={`stat-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 ring-1 ring-inset backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.06] lg:p-7 ${t.ring} ${t.glow}`}
              >
                <div
                  aria-hidden
                  className={`stat-bar pointer-events-none absolute left-0 top-1/2 w-[3px] -translate-y-1/2 rounded-r-full ${t.bar}`}
                />
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-90 ${t.halo}`}
                />
                <p className="relative font-display text-3xl font-bold tabular-nums tracking-tighter text-white sm:text-4xl lg:text-[2rem] xl:text-[2.25rem]">
                  <span className="stat-value">0</span>
                  {s.suffix}
                </p>
                <p
                  className={`relative mt-3 text-xs font-semibold uppercase tracking-[0.12em] ${t.chip}`}
                >
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
