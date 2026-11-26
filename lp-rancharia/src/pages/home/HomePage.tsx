import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { AboutSection } from "./sections/AboutSection";
import { AccommodationsSection } from "./sections/AccommodationsSection";
import { HeroSection } from "./sections/HeroSection";
import { LocationSection } from "./sections/LocationSection";

export function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  return (
    <main id="conteudo" ref={mainRef}>
      <HeroSection />
      <AboutSection />
      <AccommodationsSection />
      <LocationSection />
    </main>
  );
}
