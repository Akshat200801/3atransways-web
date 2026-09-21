import { HeroSection } from "@/components/hero/HeroSection";
import { Stats } from "@/components/Stats";
import { ServicesHorizontal } from "@/components/sections/ServicesHorizontal";
import { AboutGlobe } from "@/components/sections/AboutGlobe";
import { ParallaxCTA } from "@/components/ParallaxCTA";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Stats />
      <ServicesHorizontal />
      <AboutGlobe />
      <ParallaxCTA />
    </main>
  );
}
