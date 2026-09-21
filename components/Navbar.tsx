"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGLineElement>(null);
  const pathname = usePathname();

  // Glass state — driven by ScrollTrigger, not a raw scroll listener.
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "80px top",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => trigger.kill();
  }, []);

  // Wordmark makes way for the links once scrolled.
  useEffect(() => {
    gsap.to(wordmarkRef.current, {
      opacity: scrolled ? 0 : 1,
      x: scrolled ? -10 : 0,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [scrolled]);

  // Active-link underline draws in on route change.
  useEffect(() => {
    if (!underlineRef.current) return;
    gsap.fromTo(
      underlineRef.current,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.5, ease: "power2.out" }
    );
  }, [pathname]);

  // Mobile menu items stagger in from the right.
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".mobile-link", {
        x: 40,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: "power3.out",
      });
    }, menuRef);
    return () => ctx.revert();
  }, [open]);

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-ink-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="Three A Transways — Home">
          <Image
            src="/logo.png"
            alt=""
            width={180}
            height={160}
            priority
            className="h-12 w-auto object-contain brightness-0 invert"
          />
          <span
            ref={wordmarkRef}
            className="font-display text-lg font-bold tracking-tight text-ocean-400"
          >
            Three A Transways
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className="relative px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white"
              >
                {l.label}
                {active && (
                  // The wrapper owns the width: an <svg> sizes from its own
                  // viewBox, so inset-x-4 alone left it a fixed 100px.
                  <span aria-hidden className="absolute inset-x-4 -bottom-0.5 block h-0.5">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 2"
                      preserveAspectRatio="none"
                      className="block"
                    >
                      <line
                        ref={underlineRef}
                        x1="0"
                        y1="1"
                        x2="100"
                        y2="1"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-ocean-500/20 transition hover:shadow-ocean-500/40"
          >
            Get a quote
          </Link>
        </nav>

        <button
          className="grid h-11 w-11 place-items-center rounded-md text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-ink-900/95 backdrop-blur-2xl md:hidden"
        >
          <nav className="flex h-full flex-col justify-center gap-2 px-8" aria-label="Mobile">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="mobile-link py-4 font-display text-3xl font-bold text-white/90"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mobile-link mt-6 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 px-6 py-4 text-center text-sm font-semibold text-white"
            >
              Get a quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
