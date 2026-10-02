"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TONE, type Tone } from "@/lib/tones";
import {
  RevealText,
  TiltCard,
  MagneticLink,
  FormFieldGlow,
  RippleButton,
} from "@/components/motion";

interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  tone: Tone;
}

interface Partner {
  name: string;
  role: string;
  email: string;
  phone: string;
  tone: Tone;
}

const PARTNERS: Partner[] = [
  {
    name: "Asheesh Chaturvedi",
    role: "Partner · Director",
    email: "chaturvedi.asheesh1@gmail.com",
    phone: "+91 98290 51837",
    tone: "ocean",
  },
  {
    name: "Ravi Sethia",
    role: "Partner · Director",
    email: "ravi@3alogistics.net",
    phone: "+91 99280 84656",
    tone: "gold",
  },
];

const OFFICES: Office[] = [
  {
    city: "Mumbai (Head Office)",
    address: "Thane West, Mumbai, Maharashtra",
    phone: "+91 99280 84656",
    email: "ravi@3alogistics.net",
    tone: "ocean",
  },
  {
    city: "Jaipur (Registered Office)",
    address: "Shyam Nagar, Jaipur, Rajasthan",
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
          <RevealText
            as="h1"
            split="words"
            stagger={0.09}
            y={40}
            rotateX={-20}
            duration={0.9}
            className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl"
          >
            Tell us what&rsquo;s moving.
          </RevealText>
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

      {/* ───── Partners ───── */}
      <section className="pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-400">
              Partners
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Reach the people who run the business.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
              For new business, escalations or anything the operations desk
              can&apos;t resolve — call either partner directly.
            </p>
          </SectionReveal>
          <div
            className="grid gap-6 md:grid-cols-2"
            style={{ perspective: "1200px" }}
          >
            {PARTNERS.map((p, i) => {
              const t = TONE[p.tone];
              return (
                <SectionReveal key={p.name} delay={i * 0.12}>
                  <TiltCard
                    max={5}
                    glare
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 ring-1 ring-inset ${t.ring} ${t.glow}`}
                  >
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full opacity-80 ${t.bar}`}
                    />
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-50 blur-3xl ${t.halo}`}
                    />
                    <div className="relative">
                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.2em] ${t.chipText}`}
                      >
                        {p.role}
                      </p>
                      <h3 className="mt-2 bg-gradient-to-br from-white via-white to-white/70 bg-clip-text font-display text-2xl font-bold text-transparent sm:text-3xl">
                        {p.name}
                      </h3>
                      <ul className="mt-5 space-y-3 text-sm text-white/70">
                        <li>
                          <a
                            href={`mailto:${p.email}`}
                            className="flex items-center gap-2 transition-colors hover:text-white"
                          >
                            <Mail className={`h-4 w-4 shrink-0 ${t.chipText}`} />
                            {p.email}
                          </a>
                        </li>
                        <li>
                          <a
                            href={`tel:${p.phone.replace(/\s+/g, "")}`}
                            className="flex items-center gap-2 transition-colors hover:text-white"
                          >
                            <Phone className={`h-4 w-4 shrink-0 ${t.chipText}`} />
                            {p.phone}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </TiltCard>
                </SectionReveal>
              );
            })}
          </div>
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
                  <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-ocean-500">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">
                    Message sent!
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
                    <div className="mt-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}
                  <MagneticLink strength={0.28} className="mt-7 inline-block">
                    <RippleButton
                      type="submit"
                      disabled={submitting}
                      color="rgba(255,255,255,0.35)"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-ocean-500/30 disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : "Request a quote"}
                      <Send className="h-4 w-4 transition group-hover:translate-x-1" />
                    </RippleButton>
                  </MagneticLink>
                </>
              )}
              </div>
            </form>
          </SectionReveal>

          <div
            className="space-y-6 lg:col-span-2"
            style={{ perspective: "1200px" }}
          >
            {OFFICES.map((o, i) => {
              const t = TONE[o.tone];
              return (
                <SectionReveal key={o.city} delay={i * 0.15}>
                  <TiltCard
                    max={6}
                    glare
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 ring-1 ring-inset ${t.ring} ${t.glow}`}
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
                        <li>
                          <a
                            href={`tel:${o.phone.replace(/\s+/g, "")}`}
                            className="flex items-center gap-2 transition-colors hover:text-white"
                          >
                            <Phone className={`mt-0.5 h-4 w-4 shrink-0 ${t.chipText}`} />
                            {o.phone}
                          </a>
                        </li>
                        <li>
                          <a
                            href={`mailto:${o.email}`}
                            className="flex items-center gap-2 transition-colors hover:text-white"
                          >
                            <Mail className={`mt-0.5 h-4 w-4 shrink-0 ${t.chipText}`} />
                            {o.email}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </TiltCard>
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
      <FormFieldGlow>
        <Component
          name={name}
          type={textarea ? undefined : type}
          required={required}
          placeholder={placeholder}
          rows={textarea ? 4 : undefined}
          className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-ocean-400 focus:ring-1 focus:ring-ocean-400"
        />
      </FormFieldGlow>
    </label>
  );
}
