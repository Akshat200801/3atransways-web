import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Three A Transways — Global Logistics, Engineered for Trust",
    template: "%s | Three A Transways",
  },
  description:
    "Sea, air and road freight, customs clearance and warehousing across India and beyond. Three A Transways turns supply chain complexity into a competitive edge.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body id="top" className="bg-ink-900 text-white overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
