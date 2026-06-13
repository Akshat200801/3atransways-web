"use client";
import { motion } from "framer-motion";
import { Ship, Plane, Truck, Warehouse, FileCheck, Check } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TONE, type Tone } from "@/lib/tones";

interface Service {
  icon: typeof Ship;
  title: string;
  intro: string;
  image: string;
  bullets: string[];
  tone: Tone;
}

const SERVICES: Service[] = [
  {
    icon: Ship,
    title: "Sea Freight",
    intro:
      "FCL, LCL, RoRo and break-bulk across every major trade lane. Direct contracts with Maersk, MSC, CMA-CGM, ONE, Hapag-Lloyd and more.",
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1600&q=80&auto=format&fit=crop",
    bullets: [
      "FCL & LCL bookings on weekly sailings",
      "Reefer, hazmat & out-of-gauge expertise",
      "Customs clearance at JNPT, Mundra, Chennai",
      "Pre-alerts, B/L management and free-day monitoring",
    ],
    tone: "ocean",
  },
  {
    icon: Plane,
    title: "Air Freight",
    intro:
      "Priority, deferred and consolidated air cargo with priority handling at every major hub — Mumbai, Delhi, Bangalore and beyond.",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1600&q=80&auto=format&fit=crop",
    bullets: [
      "Door-to-door air with carrier-direct contracts",
      "Temperature-controlled & pharma-grade lanes",
      "Charter & on-board courier for emergencies",
      "Live milestone tracking from origin to destination",
    ],
    tone: "cyan",
  },
  {
    icon: Truck,
    title: "Road Freight",
    intro:
      "Pan-India trucking — FTL, PTL, expedited line-haul and last-mile fulfilment with carrier-grade visibility.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80&auto=format&fit=crop",
    bullets: [
      "FTL & part-load across all major industrial corridors",
      "Reefer fleet for cold-chain consignments",
      "Multi-axle & ODC vehicles for project cargo",
      "Real-time GPS tracking on every truck",
    ],
    tone: "amber",
  },
  {
    icon: Warehouse,
    title: "Warehousing & 3PL",
    intro:
      "Bonded and general warehousing, vendor-managed inventory, pick-pack-ship and fulfilment under one roof.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&q=80&auto=format&fit=crop",
    bullets: [
      "Bonded & free warehouses near JNPT and ICDs",
      "Vendor-managed inventory + supplier scorecards",
      "Pick-pack-ship for D2C and B2B brands",
      "Inventory dashboards with daily reconciliation",
    ],
    tone: "emerald",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    intro:
      "In-house Customs House Agents (CHA) at every major Indian gateway. We handle documentation, classification, duty optimisation and exceptions so your cargo never sits idle.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format&fit=crop",
    bullets: [
      "Licensed CHA at JNPT, Mundra, Nhava Sheva and Mumbai air cargo",
      "Bill of Entry, Shipping Bill and IGM filing",
      "HS code classification + duty drawback advisory",
      "Exception handling: examinations, valuations, query responses",
      "Real-time clearance status visible on your Cargoflow dashboard",
    ],
    tone: "violet",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-ink-900 pt-32">
      <ScrollProgress />

      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400"
          >
            Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl"
          >
            <span className="gradient-text">Every mode.</span> Every lane.
            One partner.
          </motion.h1>
        </div>
      </section>

      {SERVICES.map((s, i) => {
        const Icon = s.icon;
        const reversed = i % 2 === 1;
        const t = TONE[s.tone];
        return (
          <section
            key={s.title}
            className={`relative overflow-hidden py-20 lg:py-28 ${
              i % 2 === 0 ? "bg-ink-900" : "bg-ink-800"
            }`}
          >
            {/* Section-wide ambient halo in the service tone */}
            <div
              aria-hidden
              className={`pointer-events-none absolute ${
                reversed ? "right-[5%]" : "left-[5%]"
              } top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full opacity-20 blur-3xl ${t.halo}`}
            />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  reversed ? "lg:[direction:rtl]" : ""
                }`}
              >
                <SectionReveal
                  className={`group relative h-[420px] overflow-hidden rounded-2xl ring-1 ring-inset transition-all duration-500 hover:scale-[1.01] lg:h-[520px] lg:[direction:ltr] ${t.ring} ${t.glow}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/70 via-ink-900/20 to-transparent" />
                  {/* Bottom-edge tone gradient bar */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-1 ${t.bar}`}
                  />
                </SectionReveal>
                <SectionReveal
                  delay={0.1}
                  className="relative lg:[direction:ltr]"
                >
                  {/* Left accent bar — anchors the text column with the
                      same tab-marker treatment as the platform cards. */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -left-4 top-2 bottom-2 hidden w-[3px] rounded-full opacity-80 lg:block ${t.bar}`}
                  />
                  <div
                    className={`mb-5 grid h-12 w-12 place-items-center rounded-xl ring-1 ring-inset ${t.chipBg} ${t.ring}`}
                  >
                    <Icon className={`h-6 w-6 ${t.chipText}`} />
                  </div>
                  <p
                    className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${t.chipText}`}
                  >
                    0{i + 1} · {s.tone === "amber" ? "Surface" : s.tone === "ocean" ? "Maritime" : s.tone === "cyan" ? "Aviation" : s.tone === "emerald" ? "Fulfilment" : "Compliance"}
                  </p>
                  <h2 className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text font-display text-3xl font-bold text-transparent sm:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-white/70">{s.intro}</p>
                  <ul className="mt-8 space-y-3">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-sm text-white/80"
                      >
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.chipText}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </SectionReveal>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
