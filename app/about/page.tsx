"use client";
import { SectionReveal } from "@/components/SectionReveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { motion } from "framer-motion";
import { Anchor, Handshake, Sparkles, Globe } from "lucide-react";
import { TONE, type Tone } from "@/lib/tones";

interface Value {
  icon: typeof Handshake;
  title: string;
  body: string;
  tone: Tone;
}

const VALUES: Value[] = [
  {
    icon: Handshake,
    title: "Relationships over transactions",
    body: "Carriers, customs officers, port authorities, drivers — every link in the chain knows us by name. That's how we get exceptions cleared in hours instead of days.",
    tone: "ocean",
  },
  {
    icon: Sparkles,
    title: "Predictable, even when cargo isn't",
    body: "Weather, strikes, congestion — we plan for it. Customers see updated ETAs the moment the data shifts, not when it's already too late to react.",
    tone: "gold",
  },
  {
    icon: Globe,
    title: "Truly multimodal, not multi-vendor",
    body: "Sea, air, road and warehouse under one roster. One quote, one invoice, one team accountable end-to-end.",
    tone: "emerald",
  },
  {
    icon: Anchor,
    title: "Indian roots, global lanes",
    body: "Jaipur, Mumbai, Nhava Sheva, Mundra, Chennai — and partnerships across Dubai, Singapore, Rotterdam, Long Beach. Wherever the cargo flows.",
    tone: "violet",
  },
];

const TIMELINE = [
  { year: "2012", event: "Founded in Jaipur as a customs house brokerage" },
  { year: "2008", event: "Expanded into multi-modal freight forwarding" },
  { year: "2014", event: "Mumbai office opens; project cargo division launched" },
  { year: "2019", event: "Crossed 10,000 shipments cleared annually" },
  { year: "2024", event: "Digital platform rollout — live tracking + customer portal" },
];

export default function AboutPage() {
  return (
    <main className="bg-ink-900 pt-32">
      <ScrollProgress />
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?w=2400&q=85&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/50 via-ink-900/65 to-ink-900" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,14,26,0.55)_100%)]" />
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
            Fourteen years of saying <span className="gradient-text">yes</span>{" "}
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
              const t = TONE[v.tone];
              return (
                <SectionReveal
                  key={v.title}
                  delay={i * 0.1}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 ring-1 ring-inset transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] ${t.ring} ${t.glow}`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full opacity-80 transition-opacity duration-200 group-hover:opacity-100 ${t.bar}`}
                  />
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-50 blur-3xl transition-opacity duration-300 group-hover:opacity-80 ${t.halo}`}
                  />
                  <div className="relative">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-xl ring-1 ring-inset ${t.chipBg} ${t.ring}`}
                    >
                      <Icon className={`h-6 w-6 ${t.chipText}`} />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/70">{v.body}</p>
                  </div>
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
          <ol className="relative mt-14 space-y-10 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-sky-400/50 before:via-violet-400/30 before:to-amber-400/30">
            {TIMELINE.map((t, i) => (
              <SectionReveal key={t.year} delay={i * 0.08}>
                <li className="relative flex gap-6 pl-8">
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full bg-ink-900 ring-2 ring-ocean-400 shadow-[0_0_12px_rgb(56_189_248_/_0.5)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-ocean-400" />
                  </span>
                  <div>
                    <p className="bg-gradient-to-br from-sky-300 to-sky-400 bg-clip-text font-display text-2xl font-bold text-transparent">
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
