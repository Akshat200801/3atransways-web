"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Tone = "gold" | "ocean" | "emerald" | "violet";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  tone: Tone;
}

/** Tone palette borrowed from the platform's StatCards — left accent
 *  bar, corner halo, idle ring, hover glow shadow. */
const TONE: Record<
  Tone,
  { bar: string; halo: string; ring: string; glow: string; chip: string }
> = {
  gold: {
    bar: "bg-gradient-to-b from-amber-400 via-amber-400/70 to-amber-400/30",
    halo: "bg-amber-400/20",
    ring: "ring-amber-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(251_191_36_/_0.35)]",
    chip: "text-amber-300",
  },
  ocean: {
    bar: "bg-gradient-to-b from-sky-400 via-sky-400/70 to-sky-400/30",
    halo: "bg-sky-400/20",
    ring: "ring-sky-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(56_189_248_/_0.4)]",
    chip: "text-sky-300",
  },
  emerald: {
    bar: "bg-gradient-to-b from-emerald-400 via-emerald-400/70 to-emerald-400/30",
    halo: "bg-emerald-400/20",
    ring: "ring-emerald-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(52_211_153_/_0.35)]",
    chip: "text-emerald-300",
  },
  violet: {
    bar: "bg-gradient-to-b from-violet-400 via-violet-400/70 to-violet-400/30",
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

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // Ease-out cubic — fast start, gentle finish, feels classy.
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  const isFloat = !Number.isInteger(to);
  const display = isFloat ? n.toFixed(1) : Math.round(n).toLocaleString("en-IN");
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400">
            Track record
          </p>
          <h2 className="mt-3 bg-gradient-to-br from-white via-white to-white/70 bg-clip-text font-display text-3xl font-bold text-transparent sm:text-5xl">
            Numbers that move <span className="gradient-text">cargo</span> —
            and earn trust.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => {
            const t = TONE[s.tone];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 ring-1 ring-inset transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] lg:p-7 ${t.ring} ${t.glow}`}
              >
                {/* Left accent bar */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full opacity-80 transition-opacity duration-200 group-hover:opacity-100 ${t.bar}`}
                />
                {/* Top-right halo */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-90 ${t.halo}`}
                />
                <div className="relative pl-3">
                  <p className="font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl lg:text-[2.5rem] xl:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p
                    className={`mt-3 text-xs font-semibold uppercase tracking-[0.12em] ${t.chip}`}
                  >
                    {s.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
