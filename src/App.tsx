import * as React from "react";
import KineticGrid from "@/components/ui/kinetic-grid";
import { Navbar } from "@/components/portfolio/navbar";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ContactSection } from "@/components/portfolio/contact-section";

export default function App() {
  return (
    <KineticGrid
      globalColor="monochrome"
      className="min-h-screen text-foreground selection:bg-white/20 selection:text-white"
    >
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </KineticGrid>
  );
}
