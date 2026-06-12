"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 14, suffix: "+ yrs", label: "Of operating expertise" },
  { value: 40, suffix: "+", label: "Countries served" },
  { value: 1000000, suffix: "+", label: "Containers delivered" },
  { value: 99.4, suffix: "%", label: "On-time clearance rate" },
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
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900 py-24 lg:py-32">
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
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Numbers that move <span className="gradient-text">cargo</span> —
            and earn trust.
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-ink-900 p-8 lg:p-10"
            >
              <p className="font-display text-4xl font-bold text-white lg:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
