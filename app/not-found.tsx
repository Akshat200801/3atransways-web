import Link from "next/link";
import { Ship, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-900 px-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-60 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-ocean-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gold-500/5 blur-[100px]" />
      </div>

      <Ship className="mb-6 h-16 w-16 text-ocean-400 opacity-70" />
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400">
        404 — Page not found
      </p>
      <h1 className="mt-4 font-display text-5xl font-bold text-white sm:text-7xl">
        Off course.
      </h1>
      <p className="mx-auto mt-6 max-w-md text-base text-white/60">
        The page you&apos;re looking for has drifted off the manifest. Let&apos;s get you back on route.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-ocean-500/30 transition hover:shadow-ocean-500/50"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back to home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
        >
          Contact us
        </Link>
      </div>
    </main>
  );
}
