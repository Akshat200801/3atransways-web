"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Mid-page banner that anchors the visual narrative. Background image
 * shifts upward as the user scrolls past — classic parallax — with a
 * pinned headline + dual CTA.
 */
export function ParallaxCTA() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[480px] overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 bg-cover bg-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=2000&q=80&auto=format&fit=crop')",
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-ink-900/70" />
      </motion.div>

      <div className="relative flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            One quote.{" "}
            <span className="gradient-text">Every mode.</span>
            <br />
            Every port. Every week.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
            Tell us what's moving and where. We'll come back inside 4
            business hours with a comparable rate across sea, air and
            road.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ocean-500 to-gold-500 px-8 py-4 text-sm font-semibold text-ink-900 shadow-xl shadow-ocean-500/30"
            >
              Request a rate
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+919928084656"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Call +91 99280 84656
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
