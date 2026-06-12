"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

/**
 * Cinematic hero: fullscreen Unsplash image with a slow Ken-Burns
 * zoom, a gradient darken layer, headline that fades in word by word,
 * and a parallax-shifted overlay tied to scroll progress.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: background moves slower than the headline as the user
  // scrolls past the hero — fakes depth without expensive 3D.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = "Global cargo, moved with precision.";
  const words = headline.split(" ");

  return (
    <section
      ref={ref}
      className="relative flex h-screen min-h-[680px] items-center justify-center overflow-hidden"
    >
      {/* Background image with Ken-Burns + parallax. */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="hero-bg absolute inset-0 animate-ken-burns"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=2000&q=80&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/60 to-ink-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,14,26,0.6)_100%)]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ocean-400 shadow-[0_0_10px] shadow-ocean-400" />
          Three A Transways · est. 2003
        </motion.p>

        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.08,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className="inline-block"
            >
              {w === "precision." ? (
                <span className="gradient-text">{w}</span>
              ) : (
                w
              )}
              {i < words.length - 1 && " "}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto mt-8 max-w-2xl text-base text-white/70 sm:text-lg"
        >
          Sea, air and road freight backed by warehousing, customs and
          project-cargo expertise. From the docks of Nhava Sheva to your
          line-haul carrier, we handle the supply chain — you focus on
          the business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-ocean-500/30 transition hover:shadow-ocean-500/50"
          >
            Get a quote
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Explore services
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.div>
    </section>
  );
}
