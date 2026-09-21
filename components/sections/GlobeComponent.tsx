"use client";

import { useEffect, useRef } from "react";

/** Office and partner-port coordinates, per the lane list in the brief. */
const ARCS = [
  { startLat: 19.07, startLng: 72.87, endLat: 25.2, endLng: 55.27 }, // Mumbai → Dubai
  { startLat: 19.07, startLng: 72.87, endLat: 1.35, endLng: 103.82 }, // Mumbai → Singapore
  { startLat: 19.07, startLng: 72.87, endLat: 51.9, endLng: 4.48 }, // Mumbai → Rotterdam
  { startLat: 19.07, startLng: 72.87, endLat: 33.75, endLng: -118.25 }, // Mumbai → Long Beach
  { startLat: 22.99, startLng: 72.6, endLat: 30.06, endLng: 31.24 }, // Mundra → Cairo
  { startLat: 26.92, startLng: 75.78, endLat: 19.07, endLng: 72.87 }, // Jaipur → Mumbai
];

const POINTS = [
  { lat: 19.07, lng: 72.87, name: "Mumbai (HQ)", size: 0.8, color: "#38BDF8" },
  { lat: 26.92, lng: 75.78, name: "Jaipur", size: 0.5, color: "#F59E0B" },
  { lat: 21.11, lng: 72.83, name: "Hazira", size: 0.4, color: "#38BDF8" },
  { lat: 23.08, lng: 70.13, name: "Gandhidham", size: 0.4, color: "#38BDF8" },
];

type PointDatum = (typeof POINTS)[number];

export default function GlobeComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let globe: any;

    (async () => {
      const Globe = (await import("globe.gl")).default;
      if (cancelled || !containerRef.current) return;

      const size = Math.min(containerRef.current.clientWidth || 520, 560);

      // globe.gl exposes a constructor in current versions (the brief's
      // `Globe()(el)` factory form is the pre-2.x API).
      globe = new Globe(containerRef.current)
        .width(size)
        .height(size)
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .atmosphereColor("#38BDF8")
        .atmosphereAltitude(0.15)
        .arcsData(ARCS)
        .arcColor(() => ["rgba(56,189,248,0.4)", "rgba(245,158,11,0.6)"])
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(2000)
        .arcStroke(0.5)
        .pointsData(POINTS)
        // globe.gl accessors are typed as (obj: object) => T, so narrow inside.
        .pointColor((d: object) => (d as PointDatum).color)
        .pointAltitude((d: object) => (d as PointDatum).size * 0.08)
        .pointRadius(0.4)
        .pointLabel((d: object) => (d as PointDatum).name);

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.35;
      globe.controls().enableZoom = false;
      globe.pointOfView({ lat: 20, lng: 70, altitude: 2.4 });

      // This component is dynamically imported, so it lands after the page's
      // ScrollTriggers have measured. Its canvas changes the About section's
      // height, which shifts everything below it.
      const { ScrollTrigger } = await import("@/lib/gsap");
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      try {
        globe?._destructor?.();
      } catch {
        // globe.gl versions without _destructor — clearing the node is enough
      }
      if (el) el.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="grid place-items-center" aria-hidden />;
}
