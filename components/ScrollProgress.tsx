"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar at the very top of the viewport that fills as the
 * user scrolls — gives the cinematic feel an obvious progress signal.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-ocean-400 via-ocean-500 to-gold-500"
    />
  );
}
