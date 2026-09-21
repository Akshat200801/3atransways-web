"use client";

import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

export interface HeroVideoHandle {
  setProgress(p: number): void;
}

interface HeroVideoProps {
  /** False under prefers-reduced-motion — poster only. */
  scrubbing?: boolean;
  /** Phone-sized encodes: 540p, small enough that seeking stays responsive. */
  compact?: boolean;
  /** Null until the viewport check resolves — keeps src unset so the wrong
   *  encode is never fetched. */
  resolved?: boolean;
  /** Called once both clips can play through. */
  onReady?: () => void;
}

/**
 * Two stacked full-screen <video> elements with the poster above them.
 *
 * Every node here renders unconditionally: ScrollTrigger's pin moves this
 * subtree into a pin-spacer, so swapping children out afterwards makes React
 * and GSAP disagree about the tree (NotFoundError on removeChild). Mode
 * changes are therefore attribute-only — src, preload and opacity.
 */
export const HeroVideo = forwardRef<HeroVideoHandle, HeroVideoProps>(
  function HeroVideo({ scrubbing = true, compact = false, resolved = false, onReady }, ref) {
    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);
    const posterRef = useRef<HTMLImageElement>(null);
    const readyCountRef = useRef(0);
    const pendingSeek = useRef(new WeakMap<HTMLVideoElement, number>());

    const srcA = compact ? "/video/hero-a-mobile.mp4" : "/video/hero-a.mp4";
    const srcB = compact ? "/video/hero-b-mobile.mp4" : "/video/hero-b.mp4";

    useEffect(() => {
      if (posterRef.current) posterRef.current.style.opacity = scrubbing ? "0" : "1";
      if (videoARef.current) videoARef.current.style.opacity = "1";
      if (videoBRef.current) videoBRef.current.style.opacity = "0";
    }, [scrubbing]);

    // iOS gives a <video> no decoder until it has actually played, so
    // assigning currentTime updates the property but paints nothing — the
    // frame just sits there looking like a broken scrub. A muted play()
    // immediately followed by pause() wakes the decoder. Safari often wants a
    // real gesture first, so retry on the first touch too.
    useEffect(() => {
      if (!resolved || !scrubbing) return;

      const prime = () => {
        [videoARef.current, videoBRef.current].forEach((v) => {
          if (!v) return;
          const played = v.play();
          if (played && typeof played.then === "function") {
            played.then(() => v.pause()).catch(() => {});
          } else {
            v.pause();
          }
        });
      };

      prime();
      window.addEventListener("touchstart", prime, { once: true, passive: true });
      window.addEventListener("pointerdown", prime, { once: true });
      return () => {
        window.removeEventListener("touchstart", prime);
        window.removeEventListener("pointerdown", prime);
      };
    }, [resolved, scrubbing]);

    // Mobile decoders drop a seek requested while another is still running.
    // Hold the newest target and apply it when the in-flight seek lands, so
    // the last scroll position always wins instead of being lost.
    useEffect(() => {
      const vids = [videoARef.current, videoBRef.current].filter(Boolean) as HTMLVideoElement[];
      const onSeeked = (e: Event) => {
        const v = e.currentTarget as HTMLVideoElement;
        const queued = pendingSeek.current.get(v);
        if (queued !== undefined) {
          pendingSeek.current.delete(v);
          v.currentTime = queued;
        }
      };
      vids.forEach((v) => v.addEventListener("seeked", onSeeked));
      return () => vids.forEach((v) => v.removeEventListener("seeked", onSeeked));
    }, []);

    function seek(v: HTMLVideoElement | null, time: number) {
      if (!v || v.readyState < 2 || !Number.isFinite(time)) return;
      if (v.seeking) {
        pendingSeek.current.set(v, time);
        return;
      }
      v.currentTime = time;
    }

    useImperativeHandle(ref, () => ({
      setProgress(p: number) {
        const vA = videoARef.current;
        const vB = videoBRef.current;
        if (!vA || !vB) return;

        const fadeStart = 0.46;
        const fadeEnd = 0.54;

        if (p <= fadeStart) {
          seek(vA, (p / fadeStart) * vA.duration);
          vA.style.opacity = "1";
          vB.style.opacity = "0";
        } else if (p >= fadeEnd) {
          seek(vB, ((p - fadeEnd) / (1 - fadeEnd)) * vB.duration);
          seek(vA, vA.duration);
          vA.style.opacity = "0";
          vB.style.opacity = "1";
        } else {
          const t = (p - fadeStart) / (fadeEnd - fadeStart);
          seek(vA, vA.duration);
          seek(vB, 0);
          vA.style.opacity = String(1 - t);
          vB.style.opacity = String(t);
        }
      },
    }));

    function markReady() {
      readyCountRef.current += 1;
      if (readyCountRef.current >= 2) onReady?.();
    }

    return (
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoARef}
          src={resolved ? srcA : undefined}
          muted
          playsInline
          preload={scrubbing ? "auto" : "none"}
          poster="/img/hero-poster.jpg"
          onCanPlayThrough={markReady}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 1 }}
        />

        <video
          ref={videoBRef}
          src={resolved ? srcB : undefined}
          muted
          playsInline
          preload={scrubbing ? "auto" : "none"}
          poster="/img/hero-poster.jpg"
          onCanPlayThrough={markReady}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
        />

        {/* Sits above the clips and covers them wherever scrubbing is off. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={posterRef}
          src="/img/hero-poster.jpg"
          alt="Aerial view of a container ship under way on open water"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
        />

        {/* Two scrims: a vertical one for the chrome, and a centre vignette so
            white copy stays readable over bright containers mid-frame. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/35 to-ink-900/95"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,rgba(10,14,26,0.7),rgba(10,14,26,0.3)_55%,transparent_80%)]"
        />
      </div>
    );
  }
);
