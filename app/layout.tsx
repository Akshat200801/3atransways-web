import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { SectionIndicator } from "@/components/SectionIndicator";

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
      <head>
        {/* Preload hero videos so scrubbing feels instant */}
        <link rel="preload" as="video" href="/video/hero-a.mp4" />
        <link rel="preload" as="video" href="/video/hero-b.mp4" />
      </head>
      <body id="top" className="bg-ink-900 text-white overflow-x-hidden cursor-none">
        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollProgressBar />
          <SectionIndicator />
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
