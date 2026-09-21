# Three A Transways — Landing Page Hero Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, v0, Bolt, etc.). Paste this entire file as a single prompt. It contains the exact, complete source of every file needed — follow it literally and the output will match the original pixel-for-pixel (aside from the background video, noted below).

## What this project is

"Three A Transways" is a premium Indian multimodal freight-forwarder landing page. Dark background video hero (cargo port / container ship at night), bottom-left-anchored content (not centered), a warm off-white **"Global Cargo, Moved with Precision."** headline in Plus Jakarta Sans, a trusted-by avatar badge, a dark "Get a Quote" pill + circular play button, and a row of social icons pinned to the bottom-left corner. Accent color is ocean blue (`#38BDF8` → `#0369A1` gradient) used sparingly in the avatar stack and background glow. The navbar has a white line-art container-ship logo (not a dot/circle mark) and a white "Contact Us" pill on a transparent nav bar.

## Tech stack (required — do not substitute)

- Vite + React 19 + TypeScript
- Tailwind CSS **v4**, wired through the `@tailwindcss/vite` plugin (NOT a `tailwind.config.js` v3 setup) — CSS is pulled in with a single `@import "tailwindcss";` at the top of `src/index.css`
- `framer-motion` for every animation (fade/slide-in on mount, hover/tap scale on buttons)
- All typography inline via the `style` prop on JSX elements (no CSS modules, no Tailwind utility classes for typography) — reproduce styles exactly as given below
- Google Fonts loaded via `<link>` tags in `index.html`, no local font files

### package.json
```json
{
  "name": "three-a-transways",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@tailwindcss/vite": "^4.2.2",
    "@types/node": "^24.12.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "framer-motion": "^12.38.0",
    "globals": "^17.4.0",
    "tailwindcss": "^4.2.2",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.57.0",
    "vite": "^8.0.1"
  }
}
```

### vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

## Steps to build

1. Scaffold a new Vite React-TS project named `three-a-transways`. Install the dependencies listed above.
2. Overwrite `index.html`, `src/index.css`, `src/App.tsx`, `src/main.tsx` with the exact contents given below.
3. Create `src/components/Navbar.tsx` and `src/components/Hero.tsx` with the exact contents given below.
4. There is **no** `TrustedBy.tsx` component in this project — the trusted-by badge is inline inside `Hero.tsx`.
5. Fetch the hero background video: download a free cargo port / container ship night footage video from Pexels (search: **"cargo ship port night"** or **"container port aerial"**) and save it as `public/hero.mp4`. The video should be dark, cinematic, and show large container vessels or a busy port at dusk/night — this maximises contrast with the light text overlaid on top. Alternatively use: `curl -L "https://videos.pexels.com/video-files/3255394/3255394-hd_1920_1080_25fps.mp4" -o public/hero.mp4`
6. Add a favicon at `public/favicon.svg` — use the ship SVG path below (same as the navbar logo mark) as the favicon content.
7. Add the Three A Transways logo image at `public/logo.png` if available. The navbar falls back to the inline ship SVG if the image is absent — do not break the build if `logo.png` is missing.

## File: `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Three A Transways — Global Cargo, Moved with Precision</title>
    <meta name="description" content="Sea, air and road freight backed by warehousing, customs and project-cargo expertise. From the docks of Nhava Sheva to your line-haul carrier." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: `src/index.css`
```css
@import "tailwindcss";

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background: #000;
    color: #fff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #root { width: 100%; min-height: 100svh; }
}
```

## File: `src/main.tsx`
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## File: `src/App.tsx`
```tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
```

## File: `src/components/Navbar.tsx`
```tsx
import { motion } from 'framer-motion'

const navLinks = ["About", "Services", "Track", "Contact"]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '26px 44px',
      }}
    >
      {/* Logo mark + nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '44px' }}>
        {/* White line-art container ship icon */}
        <svg
          width="34" height="34" viewBox="0 0 24 24"
          fill="none" stroke="#fff" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hull */}
          <path d="M3 17h18l-1.5-5.5H4.5L3 17z" />
          {/* Containers on deck */}
          <rect x="6.5" y="8.5" width="2.5" height="3" rx="0.3" />
          <rect x="10.75" y="8.5" width="2.5" height="3" rx="0.3" />
          <rect x="15" y="8.5" width="2.5" height="3" rx="0.3" />
          {/* Bridge / wheelhouse */}
          <path d="M10.5 8.5V6H13.5V8.5" />
          {/* Waterline */}
          <path d="M1 20.5h22" />
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontSize: '14px', fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(255,255,255,0.82)',
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* CTA pill */}
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: '11px 24px',
          borderRadius: '999px',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          color: '#111',
          textDecoration: 'none',
          background: '#fff',
          boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
        }}
      >
        Contact Us
      </motion.a>
    </motion.nav>
  )
}
```

## File: `src/components/Hero.tsx`
```tsx
import { motion } from 'framer-motion'

const socials = [
  {
    label: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
]

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

      {/* Background video — cargo port / container ship footage */}
      <video
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay layers — kept intentionally light so footage reads through */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 22%, transparent 55%, rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 25%, transparent 80%, rgba(0,0,0,0.08) 100%)' }} />

      {/* Ocean-blue radial glow — top-center, replaces Aurora's emerald glow */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '1100px', height: '680px',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(3,105,161,0.16) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />

      {/* ── Main content — bottom-left anchored ─────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingTop: '24vh',
        paddingLeft: '64px',
        paddingRight: '24px',
      }}>

        {/* Trusted-by badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            borderRadius: '999px', padding: '6px 16px 6px 6px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.16)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            width: 'fit-content',
          }}
        >
          {/* Avatar stack — ocean-blue gradient */}
          <div style={{ display: 'flex' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '22px', height: '22px', borderRadius: '999px',
                  background: 'linear-gradient(135deg, #38BDF8, #0369A1)',
                  border: '2px solid rgba(5,15,30,0.9)',
                  marginLeft: i === 0 ? 0 : '-8px',
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.75)', fontFamily: "'Inter', sans-serif" }}>
            Trusted by <strong style={{ color: '#fff', fontWeight: 600 }}>exporters & importers worldwide</strong>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(2.4rem, 4.6vw, 4.1rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginTop: '22px',
            maxWidth: '600px',
          }}
        >
          Global Cargo,<br />Moved with Precision.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
          style={{
            marginTop: '16px',
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.6)',
            fontFamily: "'Inter', sans-serif",
            maxWidth: '360px',
          }}
        >
          Sea, air and road freight backed by warehousing, customs and project-cargo expertise — from Nhava Sheva to your door.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '30px' }}
        >
          {/* Primary pill */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '14px 26px',
              borderRadius: '999px',
              background: '#0a0e1a',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            Get a Quote
          </motion.a>

          {/* Circular play button */}
          <motion.a
            href="#services"
            aria-label="See our services"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            style={{
              width: '44px', height: '44px', borderRadius: '999px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.a>
        </motion.div>

        {/* est. badge — appears below CTAs, fades in last */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
          style={{
            marginTop: '28px',
            fontSize: '11px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Three A Transways · est. 2012 · Mumbai · Jaipur · Hazira · Gandhidham
        </motion.p>
      </div>

      {/* ── Social icons — bottom-left ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        style={{ position: 'absolute', bottom: '34px', left: '64px', zIndex: 10, display: 'flex', gap: '10px' }}
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href="#"
            aria-label={s.label}
            style={{
              width: '34px', height: '34px', borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d={s.path} />
            </svg>
          </a>
        ))}
      </motion.div>

      {/* ── Scroll nudge — bottom-center ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        style={{
          position: 'absolute', bottom: '36px',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontFamily: "'Inter', sans-serif" }}>
          Scroll
        </span>
        {/* Animated scroll line */}
        <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(56,189,248,0.7), transparent)', animation: 'pulse 2s ease-in-out infinite' }} />
      </motion.div>

    </section>
  )
}
```

## Design notes (context, not instructions to change anything)

- Layout is **not** centered — content is anchored to the top-left, starting at `24vh` from the top and `64px` from the left. This matches premium B2B freight and operations brands (Flexport, Maersk digital) who anchor content left rather than centering.
- The logo in the navbar is a white line-art **container ship** icon — specifically a hull with three container boxes on deck and a wheelhouse bridge. It is intentional and must not be replaced with a circle, dot, or generic brand mark.
- Overlay opacities are kept light (`0.18` base, `0.15`/`0.55` gradient) — the footage must read through. Use dark/dusk/night port footage so text is legible without heavy darkening. If the video is too bright, increase the base overlay to `rgba(0,0,0,0.35)`.
- The accent glow is **ocean blue** (`rgba(3,105,161,0.16)`) not green — it matches the freight/maritime brand identity.
- The est. strip (`Three A Transways · est. 2012 · Mumbai · Jaipur · Hazira · Gandhidham`) fades in last at delay 1.1s. It is intentionally subtle (`opacity: 0.28`) — a quiet confidence signal, not a billboard.
- The scroll indicator line at bottom-center uses a CSS `pulse` animation. Add the keyframe to `src/index.css` inside `@layer base`: `@keyframes pulse { 0%, 100% { opacity: 0.4; transform: scaleY(0.8); } 50% { opacity: 1; transform: scaleY(1); } }`
- The hero background video should be **dark, cinematic, slow-moving** footage — aerial of a container port at golden hour/dusk, or a time-lapse of Nhava Sheva / Mundra / JNPT terminals. Avoid fast cuts, bright daylight, or footage with visible faces.
- Phone: +91 99280 84656 · Email: ravi@3alogistics.net — wire these in the Contact section (not in scope for this hero-only build, but do not hardcode placeholder emails).
