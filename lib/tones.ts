/**
 * Shared tone palette for marketing-site cards. Matches the StatCard
 * tone treatment we landed on the homepage and mirrors the platform
 * dashboard's tone-coded tiles.
 *
 * Each tone provides a vertical accent bar, a corner halo, an inset
 * ring, an outer box-shadow glow, and a label color so labels can pick
 * up the tone without re-querying the map.
 */
export type Tone = "ocean" | "gold" | "emerald" | "violet" | "cyan" | "amber";

export interface ToneStyle {
  /** 3px vertical gradient bar for the left edge */
  bar: string;
  /** Blurred corner halo */
  halo: string;
  /** Tinted inset ring on the card */
  ring: string;
  /** Outer box-shadow tinted glow */
  glow: string;
  /** Small icon-chip background */
  chipBg: string;
  /** Tone-tinted label text */
  chipText: string;
}

export const TONE: Record<Tone, ToneStyle> = {
  ocean: {
    bar: "bg-gradient-to-b from-sky-400 via-sky-400/70 to-sky-400/30",
    halo: "bg-sky-400/20",
    ring: "ring-sky-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(56_189_248_/_0.4)]",
    chipBg: "bg-sky-400/10",
    chipText: "text-sky-300",
  },
  gold: {
    bar: "bg-gradient-to-b from-amber-400 via-amber-400/70 to-amber-400/30",
    halo: "bg-amber-400/20",
    ring: "ring-amber-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(251_191_36_/_0.35)]",
    chipBg: "bg-amber-400/10",
    chipText: "text-amber-300",
  },
  emerald: {
    bar: "bg-gradient-to-b from-emerald-400 via-emerald-400/70 to-emerald-400/30",
    halo: "bg-emerald-400/20",
    ring: "ring-emerald-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(52_211_153_/_0.35)]",
    chipBg: "bg-emerald-400/10",
    chipText: "text-emerald-300",
  },
  violet: {
    bar: "bg-gradient-to-b from-violet-400 via-violet-400/70 to-violet-400/30",
    halo: "bg-violet-400/20",
    ring: "ring-violet-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(167_139_250_/_0.35)]",
    chipBg: "bg-violet-400/10",
    chipText: "text-violet-300",
  },
  cyan: {
    bar: "bg-gradient-to-b from-cyan-400 via-cyan-400/70 to-cyan-400/30",
    halo: "bg-cyan-400/20",
    ring: "ring-cyan-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(34_211_238_/_0.35)]",
    chipBg: "bg-cyan-400/10",
    chipText: "text-cyan-300",
  },
  amber: {
    bar: "bg-gradient-to-b from-orange-400 via-orange-400/70 to-orange-400/30",
    halo: "bg-orange-400/20",
    ring: "ring-orange-400/20",
    glow: "shadow-[0_0_30px_-10px_rgb(251_146_60_/_0.35)]",
    chipBg: "bg-orange-400/10",
    chipText: "text-orange-300",
  },
};
