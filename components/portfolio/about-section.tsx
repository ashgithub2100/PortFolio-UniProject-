import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Zap, GraduationCap, Terminal, Rocket, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="pt-10 pb-16 md:pt-14 md:pb-24 border-t border-white/10 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="font-mono text-xs text-neutral-400 tracking-wider uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>// 01 &bull; Background &amp; Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Driven by Curiosity, <span className="kinetic-gradient-text">Powered by Code.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            A glimpse into my technical journey, engineering mindset, and the emerging technologies I'm mastering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Bio & Vision */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-black/65 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all duration-300 shadow-lg backdrop-blur-xl card-interactive">
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black shadow-sm">
                <Rocket className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="border-white/20 bg-white/5 text-white rounded-full px-3 py-0.5">
                Vision &amp; Ambition
              </Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-neutral-200 transition-colors">
              Building Practical AI for Real-World Impact
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              I'm a Computer Science undergraduate specializing in Artificial Intelligence and Data Science. I believe AI is most compelling when it moves beyond benchmarks to directly solve workflow bottlenecks and empower users.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              My goal is to master low-level systems computing fundamentals (CUDA, C++) alongside modern LLM API orchestration—laying the foundation to launch high-impact tech ventures.
            </p>
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
              <span className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-neutral-300 hover:bg-white/15 hover:border-white/30 transition-all cursor-default">
                Machine Learning
              </span>
              <span className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-neutral-300 hover:bg-white/15 hover:border-white/30 transition-all cursor-default">
                GPU Acceleration
              </span>
              <span className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-neutral-300 hover:bg-white/15 hover:border-white/30 transition-all cursor-default">
                AI Startups
              </span>
            </div>
          </div>

          {/* Card 2: Academic Track */}
          <div className="p-6 sm:p-8 rounded-3xl bg-black/65 border border-white/10 flex flex-col justify-between group hover:border-white/30 transition-all duration-300 shadow-lg backdrop-blur-xl card-interactive">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black shadow-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-white/20 bg-white/5 text-white rounded-full px-3 py-0.5">
                  Degree Track
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors">
                CSE &bull; AI &amp; Data Science
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Undergraduate program integrating core computer science fundamentals—data structures, algorithms, systems—with deep dives into probabilistic modeling and data pipelines.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-white/10">
              <div className="font-mono text-[11px] text-neutral-500 mb-1">CORE EMPHASIS:</div>
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                <span>Algorithms &bull; Math for ML &bull; GPU Compute</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
