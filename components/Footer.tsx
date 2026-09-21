"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLenis } from "./SmoothScrollProvider";

const OFFICES = [
  "Thane West, Mumbai",
  "Shyam Nagar, Jaipur",
  "Hazira, Gujarat",
  "Gandhidham, Gujarat",
];

export function Footer() {
  const lenis = useLenis();

  function backToTop(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!lenis) return; // no Lenis (reduced motion) — let the anchor do its job
    e.preventDefault();
    lenis.scrollTo(0, {
      duration: 2,
      easing: (t: number) => 1 - Math.pow(1 - t, 5),
    });
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink-900 py-16">
      {/* Dither noise for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4 lg:px-12">
        <div className="md:col-span-2">
          <Link href="/" className="group inline-flex items-center gap-3">
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

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
            Visit
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            {OFFICES.map((office) => (
              <li key={office} className="group flex gap-2">
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

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <a
                href="tel:+919928084656"
                className="flex min-h-[44px] items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-ocean-400" />
                +91 99280 84656
              </a>
            </li>
            <li>
              <a
                href="mailto:ravi@3alogistics.net"
                className="flex min-h-[44px] items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-ocean-400" />
                ravi@3alogistics.net
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl border-t border-white/5 px-6 pt-6 text-xs text-white/40 lg:px-12">
        © {new Date().getFullYear()} Three A Transways Pvt Ltd. All rights reserved.{" "}
        <a
          href="#top"
          onClick={backToTop}
          className="ml-2 inline-flex min-h-[44px] items-center transition-colors hover:text-white"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
