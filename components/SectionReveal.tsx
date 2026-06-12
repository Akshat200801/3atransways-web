"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Wrap any block of content with SectionReveal and it'll fade + slide
 * up the first time it scrolls into view. Stagger children by passing
 * a `delay` to nested reveals.
 */
export function SectionReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
