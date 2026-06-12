# Three A Transways — Website

Cinematic Next.js marketing site for Three A Transways. Built with
Next.js 15, Tailwind CSS, Framer Motion and Lucide.

## Run locally

```
cd 3atransways-web
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Push the folder to a GitHub repo, import on Vercel, ship. The site has
no environment variables to configure — it's a static marketing
site. The contact form is currently captured client-side; wire it up
to a webhook (Formspree / Resend / your own /api/contact) when ready.

## Editing content

- Headlines / copy: `app/**/page.tsx`
- Services & values: top-of-file arrays in each page
- Colors: `tailwind.config.ts` → `theme.extend.colors`
- Animations: `tailwind.config.ts` → `keyframes` and `framer-motion`
  components

## Project layout

- `app/` — pages (Home, About, Services, Contact)
- `components/` — Navbar, Footer, Hero, ServicesGrid, ParallaxCTA,
  Stats, SectionReveal, ScrollProgress
- `tailwind.config.ts` — design tokens (colors, font, keyframes)
- `app/globals.css` — base styles + utility classes
