import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sea freight, air freight, road freight, warehousing & 3PL, and customs clearance — every mode, every lane, one partner.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
