"use client";
import { SectionReveal } from "@/components/SectionReveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { motion } from "framer-motion";
import { Anchor, Handshake, Sparkles, Globe } from "lucide-react";

const VALUES = [
  {
    icon: Handshake,
    title: "Relationships over transactions",
    body: "Carriers, customs officers, port authorities, drivers — every link in the chain knows us by name. That's how we get exceptions cleared in hours instead of days.",
  },
  {
    icon: Sparkles,
    title: "Predictable, even when cargo isn't",
    body: "Weather, strikes, congestion — we plan for it. Customers see updated ETAs the moment the data shifts, not when it's already too late to react.",
  },
  {
    icon: Globe,
    title: "Truly multimodal, not multi-vendor",
    body: "Sea, air, road and warehouse under one roster. One quote, one invoice, one team accountable end-to-end.",
  },
  {
    icon: Anchor,
    title: "Indian roots, global lanes",
    body: "Mumbai, Jaipur, Nhava Sheva, Mundra, Chennai — and partnerships across Dubai, Singapore, Rotterdam, Long Beach. Wherever the cargo flows.",
  },
];

const TIMELINE = [
  { year: "2003", event: "Founded in Mumbai as a customs house brokerage" },
  { year: "2008", event: "Expanded into multi-modal freight forwarding" },
  { year: "2014", event: "Jaipur office opens; project cargo division launched" },
  { year: "2019", event: "Crossed 10,000 shipments cleared annually" },
  { year: "2024", event: "Digital platform rollout — live tracking + customer portal" },
];

export default function AboutPage() {
  return (
    <main className="bg-ink-900 pt-32">
      <ScrollProgress />
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=2000&q=80&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/80 to-ink-900" />
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400"
          >
            Our story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl"
          >
            Twenty-two years of saying <span className="gradient-text">yes</span>{" "}
            to impossible cargo.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-8 max-w-2xl text-base text-white/70 sm:text-lg"
          >
            We started with one customer and one shipping line. Today,
            we're trusted by importers, exporters and global brands to
            move what matters — quietly, on time, every time.
          </motion.p>
        </div>
      </section>

      <section className="bg-ink-800 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400">
              What we believe
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
              Four ideas that shape every move.
            </h2>
          </SectionReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <SectionReveal
                  key={v.title}
                  delay={i * 0.1}
                  className="glass rounded-2xl p-8"
                >
                  <Icon className="h-7 w-7 text-ocean-400" />
                  <h3 className="mt-5 font-display text-xl font-bold">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70">{v.body}</p>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <SectionReveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400">
              Timeline
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
              How we got here.
            </h2>
          </SectionReveal>
          <ol className="mt-14 space-y-8">
            {TIMELINE.map((t, i) => (
              <SectionReveal key={t.year} delay={i * 0.08}>
                <li className="flex gap-6 border-l-2 border-ocean-500/30 pl-6">
                  <div>
                    <p className="font-display text-2xl font-bold text-ocean-400">
                      {t.year}
                    </p>
                    <p className="mt-1 text-white/80">{t.event}</p>
                  </div>
                </li>
              </SectionReveal>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
