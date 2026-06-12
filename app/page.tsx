import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ParallaxCTA } from "@/components/ParallaxCTA";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionReveal } from "@/components/SectionReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      <ScrollProgress />
      <Hero />
      <Stats />

      <ServicesGrid />

      {/* About teaser — split layout, image left, text right. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-900 to-ink-800 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <SectionReveal className="relative h-[420px] overflow-hidden rounded-2xl lg:h-auto">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ocean-500/30 to-transparent" />
          </SectionReveal>

          <div className="flex flex-col justify-center">
            <SectionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400">
                The 3A way
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
                Two decades of moving{" "}
                <span className="gradient-text">what matters</span>.
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <p className="mt-6 text-white/70">
                Three A Transways began out of a small Jaipur office in 2012 —
                a single broker, a battered Ambassador, and a notebook
                full of cargo manifests. Today we're a full-stack
                logistics partner moving thousands of shipments a year
                across sea, air, road and warehouse — but the
                obsession's unchanged: get the customer's cargo on time,
                every time, however unreasonable the timeline.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.3}>
              <ul className="mt-8 space-y-3">
                {[
                  "Direct relationships with every major carrier — no middlemen, no markup",
                  "Customs clearance staff at JNPT, Mundra & Nhava Sheva",
                  "24×7 operations desk — you talk to a human, not a ticket",
                  "Live tracking visibility from booking to delivery",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/80">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>
            <SectionReveal delay={0.45}>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ocean-400"
              >
                Our story in detail
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      <ParallaxCTA />
    </main>
  );
}
