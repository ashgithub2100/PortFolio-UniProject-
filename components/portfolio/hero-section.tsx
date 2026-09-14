import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Activity,
  Terminal,
  Zap,
  Cpu,
  Sparkles,
} from "lucide-react";

const ROTATING_TERMS = [
  "AI & Compute.",
  "CUDA Kernels.",
  "Neural Networks.",
  "LLM Systems.",
  "High-Perf Code.",
];

export function HeroSection() {
  const [termIndex, setTermIndex] = React.useState(0);
  const [isFading, setIsFading] = React.useState(false);

  // Smooth cyclic term transition
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setTermIndex((prev) => (prev + 1) % ROTATING_TERMS.length);
        setIsFading(false);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-32 pb-14 md:pt-44 md:pb-20 overflow-hidden pointer-events-none"
    >
      {/* Subtle ambient lighting aura that lets the KineticGrid shine through */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-white/[0.035] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-16 max-w-6xl relative z-10 text-left">
        {/* Top Status Strip */}
        <div className="flex flex-wrap items-center justify-start gap-2.5 mb-7 pointer-events-auto">
          {/* Availability Pill */}
          <Badge
            variant="outline"
            className="gap-2.5 py-1.5 px-4 border-white/20 bg-black/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.06)] backdrop-blur-md rounded-full transition-all hover:border-white/40 hover:bg-white/5 cursor-default animate-float"
          >
            <span className="w-2 h-2 rounded-full bg-white beacon-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">
              Available for internships &amp; collaborations
            </span>
          </Badge>

          {/* Interactive Grid Telemetry Pill */}
          <div className="hidden sm:inline-flex items-center gap-2 text-xs text-neutral-400 font-mono bg-black/40 border border-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md hover:border-white/35 transition-all">
            <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Interactive Kinetic Mesh &bull; 60 FPS</span>
          </div>
        </div>

        {/* Main Headline with Smooth Dynamic Rotating Term */}
        <div className="max-w-4xl space-y-6 pointer-events-auto text-left">
          <h1 className="text-left text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.06] drop-shadow-md">
            Engineering Intelligent Systems with{" "}
            <span className="inline-block mt-1 sm:mt-0">
              <span
                className={`kinetic-gradient-text inline-block transition-all duration-300 transform ${isFading
                    ? "opacity-0 -translate-y-3 scale-95"
                    : "opacity-100 translate-y-0 scale-100"
                  }`}
              >
                {ROTATING_TERMS[termIndex]}
              </span>
            </span>
          </h1>

          {/* Specialization Role Tag */}
          <div className="font-mono text-xs sm:text-sm text-neutral-300 flex items-center justify-start gap-2 pt-1">
            <span className="opacity-40">//</span>
            <span className="bg-white/5 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md hover:border-white/30 transition-all">
              AI &amp; Data Science (AIDS) / CSE Student — Developer &amp; Technologist
            </span>
          </div>

          {/* Bio Pitch */}
          <p className="max-w-2xl text-left text-sm sm:text-base md:text-lg text-neutral-300/90 leading-relaxed drop-shadow">
            Computer Science student specializing in AI &amp; Data Science, mastering machine learning pipelines, GPU-accelerated computing with CUDA, and architecting high-performance modern software.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-start gap-4 pt-3">
            <a href="#projects">
              <Button
                size="lg"
                className="btn-animated group gap-2.5 text-sm sm:text-base font-semibold bg-white text-black hover:bg-neutral-100 shadow-[0_0_25px_rgba(255,255,255,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] cursor-pointer transition-all"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </a>

            <a href="#contact">
              <Button
                variant="outline"
                size="lg"
                className="btn-animated text-sm sm:text-base border-white/20 bg-black/40 text-white hover:bg-white/15 hover:border-white/40 backdrop-blur-md cursor-pointer transition-all"
              >
                Get In Touch
              </Button>
            </a>
          </div>

          {/* Floating Translucent Telemetry Chips (Passes grid visibility through completely) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl pt-8">
            <div className="group p-4 rounded-2xl bg-black/30 border border-white/15 backdrop-blur-md hover:border-white/40 hover:bg-white/[0.07] transition-all duration-300 card-interactive cursor-default text-left flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  CSE <span className="text-neutral-400">AIDS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Specialization</div>
              </div>
            </div>

            <div className="group p-4 rounded-2xl bg-black/30 border border-white/15 backdrop-blur-md hover:border-white/40 hover:bg-white/[0.07] transition-all duration-300 card-interactive cursor-default text-left flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  CUDA <span className="text-neutral-400">+</span> ML
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Compute Focus</div>
              </div>
            </div>

            <div className="group p-4 rounded-2xl bg-black/30 border border-white/15 backdrop-blur-md hover:border-white/40 hover:bg-white/[0.07] transition-all duration-300 card-interactive cursor-default text-left flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  Python <span className="text-neutral-400">&amp;</span> LLMs
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Core Tooling</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
