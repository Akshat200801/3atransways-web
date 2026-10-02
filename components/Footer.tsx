"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useLenis } from "./SmoothScrollProvider";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MarqueeStrip, MagneticLink } from "@/components/motion";

const OFFICES = [
  "Thane West, Mumbai",
  "Shyam Nagar, Jaipur",
  "Hazira, Gujarat",
  "Gandhidham, Gujarat",
];

// Marquee ticker of ports and lanes — reads as network reach without a
// map. Same visual weight across desktop and mobile.
const PORTS = [
  "Nhava Sheva",
  "Mundra",
  "Chennai",
  "Kolkata",
  "Cochin",
  "Hazira",
  "Kandla",
  "Vizag",
  "Ennore",
  "JNPT",
  "Dubai",
  "Singapore",
  "Rotterdam",
  "Hamburg",
  "Long Beach",
  "Shanghai",
];

export function Footer() {
  const lenis = useLenis();
  const footerRef = useRef<HTMLElement>(null);

  function backToTop(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!lenis) return; // no Lenis (reduced motion) — let the anchor do its job
    e.preventDefault();
    lenis.scrollTo(0, {
      duration: 2,
      easing: (t: number) => 1 - Math.pow(1 - t, 5),
    });
  }

  // Staggered reveal of the four columns + logo entrance as the footer
  // scrolls into view. Uses ScrollTrigger so it plays with Lenis.
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-logo", {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: footer, start: "top 85%" },
      });
      gsap.from(".footer-col", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: footer, start: "top 85%" },
      });
      gsap.from(".footer-item", {
        opacity: 0,
        x: -12,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: footer, start: "top 78%" },
      });
      gsap.from(".footer-marquee", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: { trigger: footer, start: "top 85%" },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/5 bg-ink-900 py-16"
    >
      {/* Dither noise for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient drifting ocean orb, matches Stats section palette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/3 h-[420px] w-[420px] rounded-full bg-ocean-500/[0.08] blur-[110px] animate-mesh-drift-slow"
      />

      {/* Ports & lanes marquee — reads as network reach. */}
      <div className="footer-marquee relative mb-12 border-y border-white/5 py-4">
        <MarqueeStrip
          items={PORTS.map((p) => (
            <span
              key={p}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ocean-400" />
              {p}
            </span>
          ))}
          speed={30}
          gap={48}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4 lg:px-12">
        <div className="footer-col md:col-span-2">
          <Link href="/" className="footer-logo group inline-flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Three A Transways"
              width={200}
              height={180}
              className="h-14 w-auto object-contain brightness-0 invert transition-[filter] duration-300 group-hover:[filter:brightness(0)_invert(1)_drop-shadow(0_0_20px_rgba(56,189,248,0.5))]"
              style={{ filter: "brightness(0) invert(1) drop-shadow(0 0 20px rgba(56,189,248,0.3))" }}
            />
            <span className="font-display text-lg font-bold tracking-tight text-ocean-400">
              Three A Transways
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm text-white/60">
            Global logistics, engineered for trust. Sea, air and road freight backed by
            warehousing and project cargo expertise across India and beyond.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
            Visit
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            {OFFICES.map((office) => (
              <li key={office} className="footer-item group flex gap-2">
                <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0">
                  <MapPin className="h-4 w-4 text-ocean-400" />
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-ocean-400/60 opacity-0 group-hover:animate-ripple"
                  />
                </span>
                {office}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
            Partners
          </h4>
          <ul className="mt-4 space-y-5 text-sm text-white/60">
            <li className="footer-item">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ocean-400">
                Asheesh Chaturvedi
              </p>
              <MagneticLink
                as="a"
                href="tel:+919829051837"
                strength={0.3}
                className="mt-1 flex min-h-[32px] items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-ocean-400/80" />
                +91 98290 51837
              </MagneticLink>
              <MagneticLink
                as="a"
                href="mailto:chaturvedi.asheesh1@gmail.com"
                strength={0.3}
                className="flex min-h-[32px] items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-ocean-400/80" />
                chaturvedi.asheesh1@gmail.com
              </MagneticLink>
            </li>
            <li className="footer-item">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ocean-400">
                Ravi Sethia
              </p>
              <MagneticLink
                as="a"
                href="tel:+919928084656"
                strength={0.3}
                className="mt-1 flex min-h-[32px] items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-ocean-400/80" />
                +91 99280 84656
              </MagneticLink>
              <MagneticLink
                as="a"
                href="mailto:ravi@3alogistics.net"
                strength={0.3}
                className="flex min-h-[32px] items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-ocean-400/80" />
                ravi@3alogistics.net
              </MagneticLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/5 px-6 pt-6 text-xs text-white/40 lg:px-12">
        <span>
          © {new Date().getFullYear()} Three A Transways Pvt Ltd. All rights reserved.
        </span>
        <MagneticLink
          as="a"
          href="#top"
          onClick={() => {}}
          strength={0.4}
          ariaLabel="Back to top"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-white/60 transition-colors hover:border-ocean-400/50 hover:text-white"
        >
          <span
            onClick={backToTop as unknown as React.MouseEventHandler<HTMLSpanElement>}
            className="inline-flex items-center gap-1.5"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </span>
        </MagneticLink>
      </div>
    </footer>
  );
}
