import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-900 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4 lg:px-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-ocean-500 to-gold-500 text-ink-900">
              3A
            </span>
            Three A <span className="text-ocean-400">Transways</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/60">
            Global logistics, engineered for trust. Sea, air and road
            freight backed by warehousing and project cargo expertise
            across India and beyond.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
            Visit
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" />
              Shyam Nagar, Jaipur
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" />
              Thane West, Mumbai
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" />
              <a href="tel:+919928084656" className="hover:text-white">
                +91 99280 84656
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" />
              <a
                href="mailto:ravi@3alogistics.net"
                className="hover:text-white"
              >
                ravi@3alogistics.net
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 px-6 pt-6 text-xs text-white/40 lg:px-12">
        © {new Date().getFullYear()} Three A Transways Pvt Ltd. All rights
        reserved.{" "}
        <Link href="/" className="ml-2 hover:text-white">
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
