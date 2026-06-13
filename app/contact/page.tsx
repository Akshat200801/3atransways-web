"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TONE, type Tone } from "@/lib/tones";

interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  tone: Tone;
}

const OFFICES: Office[] = [
  {
    city: "Jaipur (HQ)",
    address: "Shyam Nagar, Jaipur, Rajasthan",
    phone: "+91 99280 84656",
    email: "ravi@3alogistics.net",
    tone: "ocean",
  },
  {
    city: "Mumbai",
    address: "Thane West, Mumbai, Maharashtra",
    phone: "+91 99280 84656",
    email: "ravi@3alogistics.net",
    tone: "gold",
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !body.ok) {
        throw new Error(body.error ?? "Send failed");
      }
      setSent(true);
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-ink-900 pt-32">
      <ScrollProgress />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400"
          >
            Get in touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl"
          >
            Tell us what's <span className="gradient-text">moving</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-base text-white/70"
          >
            We respond inside 4 business hours, every time.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5 lg:gap-16 lg:px-12">
          <SectionReveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 ring-1 ring-inset ring-sky-400/20 shadow-[0_0_40px_-12px_rgb(56_189_248_/_0.3)] lg:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-8 bottom-8 w-[3px] rounded-r-full bg-gradient-to-b from-sky-400 via-sky-400/70 to-sky-400/30 opacity-80"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/20 opacity-50 blur-3xl"
              />
              <div className="relative">
              {sent ? (
                <div className="grid place-items-center py-16 text-center">
                  <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-ocean-500 to-gold-500">
                    <Send className="h-6 w-6 text-ink-900" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">
                    Got it.
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    We&apos;ll be in touch within 4 business hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name" name="name" required />
                    <Field label="Company" name="company" />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                    />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <Field
                    className="mt-5"
                    label="Origin → destination"
                    name="route"
                    placeholder="e.g. Mumbai → Hamburg, FCL 40HC"
                  />
                  <Field
                    className="mt-5"
                    label="Tell us more"
                    name="message"
                    textarea
                  />
                  {errorMsg && (
                    <p className="mt-5 text-sm text-red-400">{errorMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-ocean-500/30 disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Request a quote"}
                    <Send className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </>
              )}
              </div>
            </form>
          </SectionReveal>

          <div className="space-y-6 lg:col-span-2">
            {OFFICES.map((o, i) => {
              const t = TONE[o.tone];
              return (
                <SectionReveal
                  key={o.city}
                  delay={i * 0.15}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 ring-1 ring-inset transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] ${t.ring} ${t.glow}`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full opacity-80 transition-opacity duration-200 group-hover:opacity-100 ${t.bar}`}
                  />
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-50 blur-3xl transition-opacity duration-300 group-hover:opacity-80 ${t.halo}`}
                  />
                  <div className="relative">
                    <h3 className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text font-display text-xl font-bold text-transparent">
                      {o.city}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-white/70">
                      <li className="flex gap-2">
                        <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${t.chipText}`} />
                        {o.address}
                      </li>
                      <li className="flex gap-2">
                        <Phone className={`mt-0.5 h-4 w-4 shrink-0 ${t.chipText}`} />
                        <a
                          href={`tel:${o.phone.replace(/\s+/g, "")}`}
                          className="hover:text-white"
                        >
                          {o.phone}
                        </a>
                      </li>
                      <li className="flex gap-2">
                        <Mail className={`mt-0.5 h-4 w-4 shrink-0 ${t.chipText}`} />
                        <a
                          href={`mailto:${o.email}`}
                          className="hover:text-white"
                        >
                          {o.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  textarea,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  className?: string;
}) {
  const Component = textarea ? "textarea" : "input";
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60">
        {label}
        {required && <span className="text-ocean-400"> *</span>}
      </span>
      <Component
        name={name}
        type={textarea ? undefined : type}
        required={required}
        placeholder={placeholder}
        rows={textarea ? 4 : undefined}
        className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-ocean-400 focus:ring-1 focus:ring-ocean-400"
      />
    </label>
  );
}
