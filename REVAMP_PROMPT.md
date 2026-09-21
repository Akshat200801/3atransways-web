# Three A Transways — Marlin-Style Scroll-Scrubbed Website Revamp Prompt

> **Design reference:** Scrolltide Marlin template — cinematic scroll-driven video where
> `video.currentTime` is directly tied to scroll position. Two video clips share a common
> frame at their junction so the transition is invisible. HTML text and UI layer over the
> video canvas, animating at precise scroll waypoints with GSAP + Lenis.

---

## MANDATORY SKILL INVOCATIONS (invoke in order before writing a single line of code)

1. `/gsap-scrolltrigger-storytelling` — pinned scroll sequences, scrubbed timelines, scene transitions
2. `/cinematic-gsap-lenis-motion-system` — Lenis smooth scroll + GSAP integration pattern
3. `/cinematic-scroll-storytelling` — narrative pacing through scroll
4. `/scroll-world-storytelling` — world-building via scroll position
5. `/scroll-scrubbed-visual-sequence` — exact scrubbed visual timeline architecture (PRIMARY — read carefully)
6. `/scroll-scrubbed-word-reveal` — character/word/line reveal patterns
7. `/staggered-word-reveal` — headline stagger animation specs
8. `/animation-on-scroll` — intersection observer + GSAP patterns
9. `/animation-systems` — animation architecture, easing library, timing system
10. `/scroll-progress-timeline` — scroll progress bar + section indicator
11. `/gsap` — GSAP core (SplitText, Flip, MotionPath, DrawSVG)
12. `/masked-reveal` — clip-path and mask reveal animations
13. `/reveal-hover-effect` — image hover reveal with clip-path
14. `/progressive-blur` — progressive backdrop blur on scroll/hover
15. `/marquee-loop` — infinite marquee for logos/stats
16. `/globe-gl` — interactive globe with arcs and markers (About section)
17. `/cobejs` — Cobe.js globe (lightweight globe alternative)
18. `/vantajs` — Vanta.js background effects (NET/WAVES config) for CTA
19. `/landing-page` — landing page conversion structure
20. `/landing-page-design` — landing page visual design rules
21. `/build-awwwards-quality-sites` — Awwwards quality checklist
22. `/design-first-ui-prompting` — design-first workflow rules
23. `/no-ai-design-slop` — anti-patterns to strictly avoid
24. `/audit-ai-design-slop` — self-audit checklist
25. `/better-ui` — UI quality standards
26. `/better-colors` — color system quality
27. `/better-typography` — typography quality rules
28. `/better-layout` — layout quality rules
29. `/better-accessibility` — accessibility requirements
30. `/better-interface` — interface quality standard
31. `/interface-review` — final review checklist
32. `/dark-glass-clean-layout` — glassmorphism panel architecture
33. `/glass-dark-ui` — dark glass UI component patterns
34. `/mesh-gradient-dark-blue-clean` — animated mesh gradient background
35. `/beam-glow-states` — glow beam accents and emission states
36. `/number-details` — animated counter + number treatment
37. `/beautiful-shadows` — multi-layer shadow system
38. `/improve-animations` — animation quality improvement
39. `/find-animation-opportunities` — where to add motion
40. `/review-animations` — animation audit
41. `/animate` — React animation library patterns (Framer Motion)
42. `/emil-design-eng` — design engineering philosophy
43. `/split-layout-technical` — split-screen layout patterns
44. `/image-first-grid-layout` — image-dominant grid
45. `/editorial-tech` — editorial tech aesthetic
46. `/dark-blue-contrasting-clean` — dark blue contrasting color system
47. `/operational-enterprise-ai` — enterprise operational aesthetic
48. `/tailwindcss` — Tailwind v3/v4 best practices
49. `/css-border-gradient` — animated gradient border CSS
50. `/liquid-metal-border` — liquid metal border effect

---

## PROJECT OVERVIEW

**Client:** Three A Transways Pvt Ltd — Indian multimodal freight forwarder, est. 2012
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS v3 + Framer Motion (current) → **replace with GSAP + Lenis + scroll-scrubbed video**
**Goal:** Transform the current flat-scroll site into a **Marlin-style cinematic scroll experience**. Real video footage plays forward/backward as the user scrolls. Two clips share a seamless transition frame. GSAP SplitText headlines animate over the video. Awwwards-finalist quality. Preserve every word of existing copy verbatim.
**Color palette:**
- `ink-900` = `#0A0E1A` (near-black navy — overlays and footers)
- `ocean-400` = `#38BDF8` (sky blue accent — glows, CTAs, active states)
- `gold-500` = `#F59E0B` (amber — highlights, gradient ends)
- White overlays at various opacity levels over dark video

---

## THE MARLIN TECHNIQUE — UNDERSTAND THIS FIRST

The core of this site is **scroll-scrubbed video**: the `<video>` element's `currentTime` is
driven directly by GSAP ScrollTrigger's `progress` value. The user "plays" the footage by
scrolling. Text, buttons, and UI elements animate over the video at specific scroll positions.

Two video clips are used:
- **Clip A** (`hero-a.mp4`): Aerial drone shot, looking straight down at a container ship
  sailing across gold-tinted open water. Camera slowly pulls back. ~12s clip.
- **Clip B** (`hero-b.mp4`): Continuous from Clip A's final frame — the ship arrives at
  a dense port, containers everywhere, cranes visible, time-lapse energy. ~12s clip.

The last frame of Clip A and the first frame of Clip B must be visually identical (same
composition, no cut). This is achieved by:
1. Shooting one continuous piece of footage and splitting it at the right frame, OR
2. Using stock footage where two clips naturally continue each other.

For stock footage, use: **Pexels / Videvo / Mixkit** — search "aerial container ship ocean",
"drone port timelapse", "cargo ship top view". Download two clips that can be spliced.

**If no video yet:** Use a single `<canvas>` with a animated gradient as placeholder during
development. Mark with `// REPLACE WITH VIDEO` comment.

---

## TECH STACK (exact packages)

```bash
npm install gsap @gsap/react
npm install @studio-freight/lenis
npm install globe.gl          # About section globe
npm install cobe              # Globe fallback
npm install vanta             # CTA section Vanta.js waves
```

Register GSAP plugins:
```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
```

**No Three.js / React Three Fiber required.** The visual weight comes from video + GSAP.

---

## CRITICAL ARCHITECTURE RULES

### 1. Lenis + GSAP ScrollTrigger integration (mandatory)
Initialize Lenis in a root `<SmoothScrollProvider>`. Pipe Lenis RAF into GSAP:
```ts
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### 2. Scroll-scrubbed video is the ONLY way to animate the hero video
Do NOT use `play()` / `pause()` / `requestAnimationFrame` for video playback.
Drive `currentTime` exclusively through GSAP ScrollTrigger's `onUpdate`:
```ts
ScrollTrigger.create({
  trigger: "#hero",
  start: "top top",
  end: "+=400%",        // pin for 4× viewport height
  pin: true,
  scrub: true,
  onUpdate(self) {
    const v1 = videoA.current;
    const v2 = videoB.current;
    const p = self.progress;            // 0 → 1

    if (p <= 0.5) {
      // Drive Clip A (0 → its full duration)
      if (v1 && v1.readyState >= 2) v1.currentTime = (p / 0.5) * v1.duration;
    } else {
      // Drive Clip B (0 → its full duration)
      if (v2 && v2.readyState >= 2) v2.currentTime = ((p - 0.5) / 0.5) * v2.duration;
      // Ensure Clip A is frozen at its last frame
      if (v1 && v1.readyState >= 2) v1.currentTime = v1.duration;
    }
  },
});
```

### 3. Video element requirements
```html
<video
  ref={videoARef}
  src="/video/hero-a.mp4"
  muted
  playsInline
  preload="auto"   <!-- must preload for scrubbing to feel instant -->
  style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;"
/>
```
Both `<video>` elements are absolutely positioned, stacked. Clip B sits on top,
`opacity: 0` until `progress > 0.5`, then `opacity: 1`. The transition is a 20ms
crossfade so the cut is invisible.

### 4. Video must cover the full viewport, behind all HTML
The `.hero` section is `position: fixed; inset: 0; z-index: 0`.
HTML overlay content is `position: relative; z-index: 1`.

### 5. `prefers-reduced-motion` — degrade gracefully
If `matchMedia('(prefers-reduced-motion: reduce)').matches`:
- Skip video scrubbing entirely — show a still poster image
- Skip GSAP SplitText stagger — show text instantly at full opacity

### 6. SplitText all headlines
Every `<h1>` and `<h2>` must be split by `chars` or `words` and animated with
GSAP stagger. Never use plain Framer Motion `opacity: 0 → 1` for hero text.

### 7. Custom cursor (mandatory)
```tsx
// CustomCursor.tsx
// dot: 12px circle, bg ocean-400, mix-blend-mode: difference
// ring: 44px circle, border 1.5px solid ocean-400/60, no fill
// GSAP quickTo: dot x/y duration 0.08, ring duration 0.18
// Hover interactive: ring scale 1 → 1.6, border ocean-400
// Button hover: ring fills ocean-400/20
// cursor: none on *
```

### 8. No placeholder content
Every word used must come from the exact copy section below. Do not invent statistics,
services, or descriptions.

---

## EXACT COPY TO PRESERVE (do not change a single word)

### Site-wide brand
- Company name: **Three A Transways** / **3A Transways**
- Tagline / hero headline: **"Global cargo, moved with precision."**
- Sub-headline: *"Sea, air and road freight backed by warehousing, customs and project-cargo expertise. From the docks of Nhava Sheva to your line-haul carrier, we handle the supply chain — you focus on the business."*
- Est. badge: **Three A Transways · est. 2012**

### Stats (preserve numbers exactly)
- **14+ yrs** — Of operating expertise
- **1,000,000+** — Containers delivered
- **40+** — Countries served
- **99.4%** — On-time clearance rate

### Services (5 services — preserve all bullet points)
1. **Sea Freight** — "FCL & LCL across every major lane. Door-to-door from Nhava Sheva, Mundra, Chennai and beyond."
   - FCL & LCL bookings on weekly sailings
   - Reefer, hazmat & out-of-gauge expertise
   - Customs clearance at JNPT, Mundra, Chennai
   - Pre-alerts, B/L management and free-day monitoring

2. **Air Freight** — "Urgent, temperature-controlled and oversized air cargo with priority handling at every major hub."
   - Door-to-door air with carrier-direct contracts
   - Temperature-controlled & pharma-grade lanes
   - Charter & on-board courier for emergencies
   - Live milestone tracking from origin to destination

3. **Road Freight** — "Pan-India trucking with live tracking, expedited line-haul and dedicated reefer fleets."
   - FTL & part-load across all major industrial corridors
   - Reefer fleet for cold-chain consignments
   - Multi-axle & ODC vehicles for project cargo
   - Real-time GPS tracking on every truck

4. **Warehousing & 3PL** — "Bonded warehouses, vendor management and pick-pack-ship — turn fulfilment into a competitive edge."
   - Bonded & free warehouses near JNPT and ICDs
   - Vendor-managed inventory + supplier scorecards
   - Pick-pack-ship for D2C and B2B brands
   - Inventory dashboards with daily reconciliation

5. **Customs Clearance** — "In-house brokerage at JNPT, Mundra, Nhava Sheva and Mumbai air cargo. Documentation, duty optimisation and exception handling — done."

### About section
- Eyebrow: **"The 3A way"**
- Headline: **"Over a decade of moving what matters."**
- Body: *"Three A Transways began out of a small Jaipur office in 2012 — a single broker, a battered Ambassador, and a notebook full of cargo manifests. Today we're a full-stack logistics partner moving thousands of shipments a year across sea, air, road and warehouse — but the obsession's unchanged: get the customer's cargo on time, every time, however unreasonable the timeline."*
- Bullets:
  - Direct relationships with every major carrier — no middlemen, no markup
  - Customs clearance staff at JNPT, Mundra & Nhava Sheva
  - 24×7 operations desk — you talk to a human, not a ticket
  - Live tracking visibility from booking to delivery

### CTA section
- Headline: **"One quote. Every mode. Every port. Every week."**
- Sub: *"Tell us what's moving and where. We'll come back inside 4 business hours with a comparable rate across sea, air and road."*
- Primary CTA: **"Request a rate"**
- Secondary CTA: **"Call +91 99280 84656"**

### Values (4 cards)
1. **Relationships over transactions** — *"Carriers, customs officers, port authorities, drivers — every link in the chain knows us by name. That's how we get exceptions cleared in hours instead of days."*
2. **Predictable, even when cargo isn't** — *"Weather, strikes, congestion — we plan for it. Customers see updated ETAs the moment the data shifts, not when it's already too late to react."*
3. **Truly multimodal, not multi-vendor** — *"Sea, air, road and warehouse under one roster. One quote, one invoice, one team accountable end-to-end."*
4. **Indian roots, global lanes** — *"Mumbai (head office), Jaipur (registered), Hazira, Gandhidham, Nhava Sheva, Mundra, Chennai — and partnerships across Dubai, Singapore, Rotterdam, Long Beach. Wherever the cargo flows."*

### Timeline
- 2012 — Founded in Jaipur as a customs house brokerage
- 2014 — Registered as a Multimodal Transport Operator (MTO)
- 2016 — Hazira office opens
- 2017 — Gandhidham office opens
- 2024 — Digital platform rollout — live tracking + customer portal
- 2025 — Break-bulk cargo movement executed to Spain
- 2026 — Handled 11 project-cargo shipments of industrial machinery

### Contact
- Mumbai (Thane West) · Jaipur (Shyam Nagar) · Hazira, Gujarat · Gandhidham, Gujarat
- Phone: +91 99280 84656
- Email: ravi@3alogistics.net

---

## SECTION-BY-SECTION ARCHITECTURE

---

### SECTION 1: HERO — Scroll-Scrubbed Video (pinned, 400vh)

**Video layer (full-viewport, `position: fixed; z-index: 0`):**
```tsx
// HeroVideo.tsx
// <video> Clip A: aerial drone looking straight down at container ship on ocean
// <video> Clip B: same ship arriving at a bustling port (continuous from Clip A)
// Both absolutely positioned, full-screen, object-fit: cover
// Clip B: opacity: 0 until progress > 0.48, then crossfade to 1 over 2% scroll
```

Stock footage guidance:
- **Clip A suggestion:** "Aerial container ship ocean gold water top-down drone" — Pexels/Videvo
- **Clip B suggestion:** "Container port aerial timelapse cargo cranes" — Pexels/Videvo
- Both clips must be 1080p minimum, 24fps minimum, ~10–15s duration
- Trim both at a frame where the water/horizon composition matches
- Export as H.264 `.mp4` for browser compatibility
- Include WebM `.webm` as fallback: `<source src="hero-a.webm" type="video/webm">`

**Dark overlay:**
`<div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900/90 z-[1]" />`

**HTML content (z-index: 2, centered, `position: absolute`):**

Phase 1 (scroll 0%–15%) — **Title phase:**
- Eyebrow pill: `Three A Transways · est. 2012` with pulsing `ocean-400` dot. Animate in: `y: 20 → 0, opacity: 0 → 1`. Timing: before scroll starts (on mount), delay 0.3s.
- Headline **"Global cargo, moved with precision."** — SplitText by words.
  Each word: `opacity: 0 → 1`, `y: 80 → 0`, `rotateX: 20deg → 0deg`, transform-origin `0% 50% -50px`. Stagger: 0.09s. Ease: `power3.out`. Duration: 0.9s. "precision." gets gradient text `from-ocean-400 to-gold-500`.
- Sub-headline fades up after headline (delay: `wordCount * 0.09 + 0.4s`).
- CTA buttons slide up last (delay: total + 0.7s).
- Scroll nudge: `ChevronDown` bouncing, fades out as scroll begins (opacity to 0 at progress 0.05).

Phase 2 (scroll 15%–50%) — **Pull-back phase (Clip A scrubbing):**
- Headline text: `opacity: 1 → 0` as scroll progresses from 15% to 35%. Use GSAP `fromTo` tied to the same ScrollTrigger.
- A **floating stat strip** fades IN at 25% progress: 4 stats laid out horizontally in glassmorphism pills. Each animates: `scale: 0.8 → 1, opacity: 0 → 1`, stagger 0.15s.
  - Display: `14+ yrs · 1M+ containers · 40+ countries · 99.4% on-time`
- At 45% progress, the stat strip fades out to prepare for transition.

Phase 3 (scroll 50%–100%) — **Port arrival phase (Clip B scrubbing):**
- A new text block fades IN at 55% progress over the port footage:
  - Eyebrow: "Sea. Air. Road. Warehouse." in ocean-400, tracking-widest
  - Subtext: "One partner. Every mode." large display type
  - "Explore services →" button — glass pill
- At 90% progress, a full-screen ink-900 overlay fades in (opacity 0 → 0.85), transitioning into Section 2.

---

### SECTION 2: STATS — "Track record" (scroll-activated, not pinned)

**Background:** Ink-900 solid. Add a subtle animated mesh gradient using `/mesh-gradient-dark-blue-clean` — very dark, barely visible ocean-400 blobs drifting slowly.

**Entry animation (ScrollTrigger `start: "top 75%"`):**

Section eyebrow "Track record" — SplitText chars, stagger 0.02s, `rotateX: -30 → 0, y: 30 → 0, opacity: 0 → 1`.

**4 stat cards, stagger 0.12s each:**
- Entry: `y: 80 → 0, opacity: 0 → 1, rotateY: -8deg → 0deg`. Parent perspective: `1200px`.
- Card: `bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6`.
- Left accent bar: gradient `from-[tone] to-transparent`, height 60%, absolute left-0, animates height `0 → 60%`.
- Top-right halo: `blur-3xl` colored blob (gold / ocean / emerald / violet per card).
- Counter: **GSAP tween only, no React state.**
  ```ts
  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetNumber,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => { counterRef.current.textContent = formatNumber(obj.val); },
    scrollTrigger: { trigger: cardRef.current, start: "top 80%" },
  });
  ```
  Format: 1,000,000 → `toLocaleString('en-IN')`. 99.4 → `.toFixed(1)`.
- Hover: `translateY: -6px`, shadow intensifies.

---

### SECTION 3: SERVICES — Horizontal Scroll Journey (pinned, 500vh)

Pinned for 500vh. 5 panels, each 100vw wide, horizontal track `width: 500vw`.
Vertical scroll progress `0 → 1` maps to `translateX: 0 → -400vw`.

**Background per panel:** Instead of Three.js scenes, use high-quality **full-bleed still images** (or short looping `.mp4` not scroll-scrubbed) with GSAP-animated overlays.

Panel backgrounds (use stock photos from Unsplash/Pexels):
1. **Sea Freight:** Aerial ocean with container ship. Tinted ink-900/50 overlay.
2. **Air Freight:** Aircraft wing shot over clouds, golden hour. Ink-900/40 overlay.
3. **Road Freight:** Truck convoy on highway at dusk, dramatic sky. Ink-900/50.
4. **Warehousing & 3PL:** Interior of modern distribution warehouse, warm amber lighting. Ink-900/30.
5. **Customs Clearance:** Close-up of cargo documents / official stamps, abstract. Ink-900/60.

As each panel enters, its background image **scales from 1.08 → 1.0** (Ken Burns reverse) over 0.6s with `ease: "power2.out"`. This gives the feel of cinematic focus without video overhead.

**Each ServicePanel HTML:**
- Full 100vw × 100vh, flex column, centered content, dark gradient overlay.
- Service number `01`–`05`: `text-[180px] font-bold text-white/[0.03]`, absolute top-right.
- Icon: 80px glassmorphism circle, ocean-400. Entry: `rotateY: 90deg → 0deg`, 0.6s.
- Title: `text-5xl lg:text-7xl font-bold`. SplitText word reveal, stagger 0.08s.
- Intro line: `text-lg text-white/70`. Fade up, delay 0.4s.
- Bullet list: Each bullet staggered 0.1s, `x: -20 → 0, opacity: 0 → 1`. Ocean-400 dot scales 0→1 before text.
- Progress dots: 5 dots at bottom center. Active = filled ocean-400, others = `bg-white/20`.

---

### SECTION 4: ABOUT / THE 3A WAY

**Background:** Ink-900 with Vanta.js NET effect on left half behind the globe:
```js
VANTA.NET({
  el: "#about-globe-bg",
  color: 0x38bdf8,
  backgroundColor: 0x0a0e1a,
  points: 8,
  maxDistance: 20,
  spacing: 15,
  mouseControls: true,
})
```

**Globe (left 50%):** `globe.gl` with shipping routes. Full spec from original prompt preserved:
```js
Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .atmosphereColor('#38BDF8')
  .atmosphereAltitude(0.15)
  .arcsData([
    { startLat: 19.07, startLng: 72.87, endLat: 25.20, endLng: 55.27 }, // Mumbai → Dubai
    { startLat: 19.07, startLng: 72.87, endLat: 1.35, endLng: 103.82 },  // Mumbai → Singapore
    { startLat: 19.07, startLng: 72.87, endLat: 51.90, endLng: 4.48 },   // Mumbai → Rotterdam
    { startLat: 19.07, startLng: 72.87, endLat: 33.75, endLng: -118.25 }, // Mumbai → Long Beach
    { startLat: 22.99, startLng: 72.60, endLat: 30.06, endLng: 31.24 },  // Mundra → Cairo
    { startLat: 26.92, lng: 75.78, endLat: 19.07, endLng: 72.87 },  // Jaipur → Mumbai
  ])
  .arcColor(() => ['rgba(56,189,248,0.4)', 'rgba(245,158,11,0.6)'])
  .arcDashLength(0.4).arcDashGap(0.2).arcDashAnimateTime(2000).arcStroke(0.5)
  .pointsData([
    { lat: 19.07, lng: 72.87, name: 'Mumbai (HQ)', size: 0.8, color: '#38BDF8' },
    { lat: 26.92, lng: 75.78, name: 'Jaipur', size: 0.5, color: '#F59E0B' },
    { lat: 21.11, lng: 72.83, name: 'Hazira', size: 0.4, color: '#38BDF8' },
    { lat: 23.08, lng: 70.13, name: 'Gandhidham', size: 0.4, color: '#38BDF8' },
  ])
```

Globe scales from 0.6→1, opacity 0→1 on scroll entry. Auto-rotates 0.2deg/frame.
Globe is `dynamic(() => import('./GlobeComponent'), { ssr: false })`.

**Text content (right 50%):**
- Eyebrow "The 3A way" — DrawSVG underline reveals L→R.
- Headline — SplitText, "what matters" gets ocean→gold gradient.
- Body paragraph fades up, delay 0.3s.
- Bullet list: each slides `x: -30 → 0`, stagger 0.12s. Ocean-400 dot pulses.

---

### SECTION 5: CTA BANNER (80vh, parallax)

**Background:** Vanta.js WAVES:
```js
VANTA.WAVES({
  el: "#cta-section",
  color: 0x0a1628,
  shininess: 35,
  waveHeight: 18,
  waveSpeed: 0.6,
  zoom: 0.75
})
```

On scroll through: wave speed 0.6→2.0, waveHeight 18→35. On scroll out: return to base.

**HTML (centered):**
- Headline split into 3 lines, each wipes in: `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)`. Stagger 0.3s. "Every mode." → ocean→gold gradient.
- Sub-paragraph fades up, delay 0.9s.
- Primary button: `/liquid-metal-border` animated gradient border (conic-gradient rotating).
- Phone button: on hover, shake animation `x: [0, -3, 3, -3, 0]`, duration 0.4s.

---

### SECTION 6: FOOTER

**Background:** Ink-900. Top: `border-white/5`. Subtle dither noise texture at 3% opacity.
**Logo:** `brightness-0 invert`, glow `drop-shadow(0 0 20px rgba(56,189,248,0.3))`.
**Offices:** MapPin icons ocean-400. Hover: ripple ring CSS keyframe (scale 1→2, opacity 1→0).
**Back to top:** Lenis: `lenis.scrollTo(0, { duration: 2, easing: (t) => 1 - Math.pow(1-t, 5) })`.
**Copyright:** `© 2026 Three A Transways Pvt Ltd. All rights reserved.`

---

## NAVBAR

Fixed top, full-width. Starts transparent, transitions to `bg-ink-900/80 backdrop-blur-xl border-b border-white/5` after 80px scroll.

Logo + "Three A Transways" text. On scroll, text fades out to save space.
Nav links: Home · Services · About · Contact. Active link: 2px ocean-400 DrawSVG underline.
CTA "Get a quote": gradient pill `from-ocean-500 to-ocean-600`.
Mobile: full-screen dark menu, items stagger in `x: 40 → 0`.

---

## CURSOR SYSTEM

```tsx
// dot: 12px, ocean-400, mix-blend-mode: difference
// ring: 44px, border 1.5px ocean-400/60
// GSAP quickTo: dot 0.08s, ring 0.18s
// Interactive hover: ring scale → 1.6
// Button hover: ring fills ocean-400/20
// cursor: none globally
```

---

## PERFORMANCE REQUIREMENTS

1. Both video files must be `preload="auto"` — scrubbing only works if video is in memory.
2. Add `<link rel="preload" as="video" href="/video/hero-a.mp4">` in `<head>`.
3. Target 60fps — profile in Chrome DevTools during scroll.
4. Lenis `smoothWheel: true`, `lerp: 0.08` for buttery scroll.
5. Vanta.js destroys on unmount: `effect.destroy()`.
6. Globe.gl is dynamically imported, SSR false.
7. `prefers-reduced-motion`: skip all GSAP timelines, show poster image instead of video, show text immediately at full opacity.
8. Video poster images: add `poster="/img/hero-poster.jpg"` to both `<video>` elements.

---

## QUALITY GATES (before marking complete)

From `/build-awwwards-quality-sites`, `/no-ai-design-slop`, `/interface-review`:

- [ ] Scroll-scrubbed video: scrubbing both clips feels instant, no stuttering
- [ ] Clip A → Clip B transition is invisible (shared frame, 20ms crossfade)
- [ ] Both video files preloaded, no buffering during scroll
- [ ] GSAP SplitText on every headline — no plain opacity fade
- [ ] Horizontal services scroll works on trackpad AND touch
- [ ] Stat counters animate via GSAP tween (not React state)
- [ ] Globe shows shipping routes with animated arcs
- [ ] Lenis + ScrollTrigger integrated (NOT raw scroll events)
- [ ] Custom cursor works on all interactive elements
- [ ] CTA Vanta.js wave speed responds to scroll
- [ ] No placeholder/invented copy — all text matches spec above
- [ ] Mobile: video replaced with poster image on `width < 768` (video scrubbing too heavy)
- [ ] `prefers-reduced-motion` respected
- [ ] All images have `alt` text
- [ ] Keyboard navigation works
- [ ] No `console.error` in production
- [ ] TypeScript strict mode — no untyped `any`
- [ ] Footer back-to-top uses Lenis smooth scroll
- [ ] No emojis — Lucide icons only
- [ ] CLS < 0.1 — hero section is fixed, not in document flow

---

## FILE STRUCTURE

```
public/
  video/
    hero-a.mp4       ← Clip A: aerial ship on open ocean (top-down drone)
    hero-a.webm      ← WebM fallback
    hero-b.mp4       ← Clip B: ship arriving at port, continuous from Clip A
    hero-b.webm      ← WebM fallback
  img/
    hero-poster.jpg  ← First frame of hero-a as poster
    services/        ← Background stills for each service panel

app/
  layout.tsx         ← SmoothScrollProvider, CustomCursor, preload links
  page.tsx           ← All section imports
  about/page.tsx     ← Globe + timeline
  contact/page.tsx   ← Contact form

components/
  hero/
    HeroSection.tsx        ← Pinned section, video + GSAP scroll logic
    HeroVideo.tsx          ← Two <video> elements + crossfade logic
    HeroOverlay.tsx        ← Title phase, stat phase, port phase HTML
  layout/
    Navbar.tsx
    CustomCursor.tsx
    ScrollProgressBar.tsx
    SectionIndicator.tsx
    SmoothScrollProvider.tsx
  sections/
    Stats.tsx
    ServicesHorizontal.tsx
    AboutGlobe.tsx
    ParallaxCTA.tsx
  shared/
    GlassCard.tsx
    GradientBorderCard.tsx
    SectionReveal.tsx      ← GSAP-based (no Framer Motion)
```

---

## FINAL INSTRUCTION

Build in this exact order:
1. `SmoothScrollProvider` (Lenis + GSAP ScrollTrigger proxy)
2. `HeroVideo` + scroll scrub logic (test this first — it's the core of the site)
3. `HeroOverlay` (title / stat / port phases over the video)
4. `Navbar`
5. `Stats` section
6. `ServicesHorizontal` (pinned horizontal scroll)
7. `AboutGlobe`
8. `ParallaxCTA`
9. `Footer`
10. `CustomCursor`

After the hero scrub works, every other section is conventional GSAP ScrollTrigger work.
Test Clip A → Clip B transition on real footage before spending time on later sections.

The final site must feel like the Scrolltide Marlin template: the user IS the director,
scrolling plays the film. Three A Transways is moving real cargo across real oceans — the
footage makes that tangible in a way Three.js geometry never quite can.
