"use client";

import { useRef, useEffect, useState } from "react";
import { Ship, Plane, Truck, Warehouse, FileCheck } from "lucide-react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

const SERVICES = [
  {
    icon: Ship,
    title: "Sea Freight",
    intro:
      "FCL & LCL across every major lane. Door-to-door from Nhava Sheva, Mundra, Chennai and beyond.",
    bullets: [
      "FCL & LCL bookings on weekly sailings",
      "Reefer, hazmat & out-of-gauge expertise",
      "Customs clearance at JNPT, Mundra, Chennai",
      "Pre-alerts, B/L management and free-day monitoring",
    ],
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80&auto=format&fit=crop",
    overlay: "bg-ink-900/50",
  },
  {
    icon: Plane,
    title: "Air Freight",
    intro:
      "Urgent, temperature-controlled and oversized air cargo with priority handling at every major hub.",
    bullets: [
      "Door-to-door air with carrier-direct contracts",
      "Temperature-controlled & pharma-grade lanes",
      "Charter & on-board courier for emergencies",
      "Live milestone tracking from origin to destination",
    ],
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1920&q=80&auto=format&fit=crop",
    overlay: "bg-ink-900/40",
  },
  {
    icon: Truck,
    title: "Road Freight",
    intro:
      "Pan-India trucking with live tracking, expedited line-haul and dedicated reefer fleets.",
    bullets: [
      "FTL & part-load across all major industrial corridors",
      "Reefer fleet for cold-chain consignments",
      "Multi-axle & ODC vehicles for project cargo",
      "Real-time GPS tracking on every truck",
    ],
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80&auto=format&fit=crop",
    overlay: "bg-ink-900/50",
  },
  {
    icon: Warehouse,
    title: "Warehousing & 3PL",
    intro:
      "Bonded warehouses, vendor management and pick-pack-ship — turn fulfilment into a competitive edge.",
    bullets: [
      "Bonded & free warehouses near JNPT and ICDs",
      "Vendor-managed inventory + supplier scorecards",
      "Pick-pack-ship for D2C and B2B brands",
      "Inventory dashboards with daily reconciliation",
    ],
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80&auto=format&fit=crop",
    overlay: "bg-ink-900/30",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    intro:
      "In-house brokerage at JNPT, Mundra, Nhava Sheva and Mumbai air cargo. Documentation, duty optimisation and exception handling — done.",
    bullets: [],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80&auto=format&fit=crop",
    overlay: "bg-ink-900/60",
  },
];

export function ServicesHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The panel photos are remote and only fetched once a panel first paints,
  // so a panel could slide in as a black rectangle. Warm them up front, then
  // re-measure since decoded images can change layout.
  useEffect(() => {
    let alive = true;
    Promise.all(
      SERVICES.map(
        (s) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = img.onerror = () => resolve();
            img.src = s.image;
          })
      )
    ).then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");

      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // 1.35× the travel distance so each panel lingers long enough to read
          // instead of whipping past.
          end: () => "+=" + (track.scrollWidth - window.innerWidth) * 1.35,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate(self) {
            setActive(Math.round(self.progress * (panels.length - 1)));
          },
        },
      });

      if (reduced) return;

      panels.forEach((panel) => {
        const enter = {
          trigger: panel,
          containerAnimation: scrollTween,
          start: "left 75%",
        } as const;

        gsap.fromTo(
          panel.querySelector(".panel-bg"),
          { scale: 1.08 },
          { scale: 1, duration: 0.6, ease: "power2.out", scrollTrigger: enter }
        );

        gsap.from(panel.querySelector(".panel-icon"), {
          rotateY: 90,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: enter,
        });

        const title = panel.querySelector<HTMLElement>(".panel-title");
        if (title) {
          const split = new SplitText(title, { type: "words" });
          splits.push(split);
          gsap.from(split.words, {
            opacity: 0,
            y: 60,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: enter,
          });
        }

        gsap.from(panel.querySelector(".panel-intro"), {
          opacity: 0,
          y: 24,
          duration: 0.7,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: enter,
        });

        const bullets = panel.querySelectorAll(".panel-bullet");
        if (bullets.length) {
          gsap.from(bullets, {
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.6,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: enter,
          });
          gsap.from(panel.querySelectorAll(".panel-dot"), {
            scale: 0,
            stagger: 0.1,
            duration: 0.4,
            delay: 0.45,
            ease: "back.out(2)",
            scrollTrigger: enter,
          });
        }
      });
    }, section);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative h-[100svh] overflow-hidden"
      aria-label="What we do"
    >
      <div ref={trackRef} className="flex h-full" style={{ width: `${SERVICES.length * 100}vw` }}>
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <article
              key={s.title}
              className="service-panel relative flex h-full w-screen shrink-0 flex-col justify-center overflow-hidden px-6 lg:px-24"
            >
              <div
                className="panel-bg absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${s.image})` }}
                role="img"
                aria-label={`${s.title} — operations photography`}
              />
              <div aria-hidden className={`absolute inset-0 ${s.overlay}`} />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/70"
              />

              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-8 select-none font-display text-[96px] font-bold leading-none text-white/[0.04] sm:text-[140px] lg:right-16 lg:top-10 lg:text-[180px]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative mx-auto w-full max-w-4xl">
                <div className="panel-icon mb-8 grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <Icon className="h-9 w-9 text-ocean-400" />
                </div>

                <h2 className="panel-title font-display text-[2.25rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
                  {s.title}
                </h2>

                <p className="panel-intro mt-5 max-w-2xl text-base text-white/75 sm:mt-6 sm:text-lg">
                  {s.intro}
                </p>

                {s.bullets.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="panel-bullet flex items-start gap-3 text-sm text-white/80 lg:text-base"
                      >
                        <span className="panel-dot mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Panel progress indicator */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {SERVICES.map((s, i) => (
          <span
            key={s.title}
            aria-hidden
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-ocean-400" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
        <span className="sr-only">
          Panel {active + 1} of {SERVICES.length}
        </span>
      </div>
    </section>
  );
}
