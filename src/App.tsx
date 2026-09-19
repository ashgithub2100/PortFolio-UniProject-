import * as React from "react";
import KineticGrid from "@/components/ui/kinetic-grid";
import { Navbar } from "@/components/portfolio/navbar";
import { HeroSection } from "@/components/portfolio/hero-section";

const AboutSection = React.lazy(() =>
  import("@/components/portfolio/about-section").then((m) => ({ default: m.AboutSection }))
);
const SkillsSection = React.lazy(() =>
  import("@/components/portfolio/skills-section").then((m) => ({ default: m.SkillsSection }))
);
const ProjectsSection = React.lazy(() =>
  import("@/components/portfolio/projects-section").then((m) => ({ default: m.ProjectsSection }))
);
const ContactSection = React.lazy(() =>
  import("@/components/portfolio/contact-section").then((m) => ({ default: m.ContactSection }))
);

export default function App() {
  return (
    <KineticGrid
      globalColor="monochrome"
      className="min-h-screen text-foreground selection:bg-white/20 selection:text-white"
    >
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <React.Suspense fallback={null}>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </React.Suspense>
      </main>
    </KineticGrid>
  );
}
