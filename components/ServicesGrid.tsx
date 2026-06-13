"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Ship, Plane, Truck, Warehouse, FileCheck, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    icon: Ship,
    title: "Sea Freight",
    blurb:
      "FCL & LCL across every major lane. Door-to-door from Nhava Sheva, Mundra, Chennai and beyond.",
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&q=80&auto=format&fit=crop",
  },
  {
    icon: Plane,
    title: "Air Freight",
    blurb:
      "Urgent, temperature-controlled and oversized air cargo with priority handling at every major hub.",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    icon: Truck,
    title: "Road Freight",
    blurb:
      "Pan-India trucking with live tracking, expedited line-haul and dedicated reefer fleets.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    icon: Warehouse,
    title: "Warehousing & 3PL",
    blurb:
      "Bonded warehouses, vendor management and pick-pack-ship — turn fulfilment into a competitive edge.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    blurb:
      "In-house brokerage at JNPT, Mundra, Nhava Sheva and Mumbai air cargo. Documentation, duty optimisation and exception handling — done.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&auto=format&fit=crop",
  },
];

export function ServicesGrid() {
  return (
    <section
      id="services"
      className="relative bg-ink-900 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400">
            What we do
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Freight, fulfilment and{" "}
            <span className="gradient-text">everything between</span>.
          </h2>
          <p className="mt-5 text-white/60">
            One partner from origin pick-up to last-mile delivery —
            backed by 14+ years of moving the impossible.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isLastOdd = i === SERVICES.length - 1 && SERVICES.length % 2 === 1;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                  isLastOdd ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${s.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-transparent" />
                <div className="relative p-8 lg:p-10">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-ocean-500/30 to-gold-500/30 backdrop-blur">
                    <Icon className="h-6 w-6 text-ocean-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70">{s.blurb}</p>
                  <Link
                    href="/services"
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ocean-400 transition group-hover:gap-2"
                  >
                    Learn more
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
