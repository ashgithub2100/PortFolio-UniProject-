import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal, Cpu, Sparkles, Activity, Layers } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative pt-32 pb-8 md:pt-40 md:pb-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Hero Card Container with Glassmorphic Shimmer */}
        <div className="relative rounded-3xl border border-white/15 bg-black/70 backdrop-blur-2xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-500 hover:border-white/25">
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-25" />

          {/* Hero Content */}
          <div className="relative z-10 flex min-h-[580px] md:min-h-[640px] flex-col items-center justify-between py-12 px-6 text-center">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 animate-float">
              <Badge variant="outline" className="gap-2 py-1.5 px-4 border-white/20 bg-white/5 text-white shadow-md backdrop-blur-md rounded-full">
                <span className="w-2 h-2 rounded-full bg-white beacon-pulse" />
                <span className="tracking-wide">Available for internships &amp; collaborations</span>
              </Badge>
              <div className="hidden sm:inline-flex items-center gap-2 text-xs text-neutral-400 font-mono bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
                <span>Interactive Kinetic Canvas &bull; 60 FPS</span>
              </div>
            </div>

            {/* Headline & Subtitle */}
            <div className="max-w-3xl space-y-6 my-auto">
              <h1 className="text-balance text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Engineering Intelligent Systems with{" "}
                <span className="kinetic-gradient-text">AI &amp; Compute.</span>
              </h1>

              <div className="font-mono text-sm sm:text-base text-neutral-300 flex items-center justify-center gap-2">
                <span className="opacity-40">//</span>
                <span>AI &amp; Data Science (AIDS) / CSE Student — Developer &amp; Technologist</span>
              </div>

              <p className="max-w-2xl mx-auto text-balance text-sm sm:text-base text-neutral-400 leading-relaxed">
                Computer Science student specializing in AI &amp; Data Science, mastering machine learning pipelines, GPU-accelerated computing with CUDA, and architecting high-performance modern software.
              </p>

              {/* CTAs with animated arrows & hover micro-interactions */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a href="#projects">
                  <Button size="lg" className="group gap-2.5 text-base font-semibold bg-white text-black hover:bg-neutral-100 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] transition-all">
                    <span>Explore Projects</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </a>
                <a href="#contact">
                  <Button variant="outline" size="lg" className="text-base border-white/20 bg-white/5 text-white hover:bg-white/15 backdrop-blur-md transition-all">
                    Get In Touch
                  </Button>
                </a>
              </div>
            </div>

            {/* Bottom Quick Telemetry Stats with Card Physics */}
            <div className="w-full max-w-2xl pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 card-interactive cursor-default">
                <div className="font-mono text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-1">
                  CSE <span className="text-neutral-400">AIDS</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Specialization</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 card-interactive cursor-default">
                <div className="font-mono text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-1">
                  CUDA <span className="text-neutral-400">+</span> ML
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Compute Focus</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 card-interactive cursor-default">
                <div className="font-mono text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-1">
                  Python <span className="text-neutral-400">&amp;</span> LLMs
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
