import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Cpu, BookOpen, Compass, Layers, Sparkles } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function ProjectsSection() {
  const projects = [
    {
      num: "01",
      title: "AI Study Buddy",
      category: "LLM &bull; NLP",
      desc: "A Python-powered assistant that ingests technical research papers and notes, automatically synthesizing concise revision cheat sheets and test prompts using frontier LLM APIs.",
      tags: ["Python", "OpenAI / Claude API", "PDF Parsing", "NLP"],
      icon: <BookOpen className="w-5 h-5 text-white" />,
      github: "https://github.com/ashgithub2100",
    },
    {
      num: "02",
      title: "CUDA Matrix Acceleration Lab",
      category: "GPU Compute &bull; Parallel Systems",
      desc: "High-performance parallel computing benchmark suite comparing GPU-accelerated matrix multiplication against CPU routines using raw CUDA kernels with shared memory tiling.",
      tags: ["CUDA", "C++", "NVIDIA GPU", "Performance Tuning"],
      icon: <Cpu className="w-5 h-5 text-white" />,
      github: "https://github.com/ashgithub2100",
    },
    {
      num: "03",
      title: "Kinetic Grid & Glyph Engine",
      category: "Interactive Graphics &bull; Typography",
      desc: "Mathematical canvas physics and scroll-driven typographic camera exploring live vector ink geometries, smoothstep warp fields, and dynamic clipPath coordinate transformations.",
      tags: ["React", "TypeScript", "Canvas API", "SVG ClipPath", "Tailwind"],
      icon: <Compass className="w-5 h-5 text-white" />,
      github: "https://github.com/ashgithub2100",
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-white/10 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="font-mono text-xs text-neutral-400 tracking-wider uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>// 03 &bull; Featured Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineered to <span className="kinetic-gradient-text">Perform.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Curated projects combining language model agents, GPU acceleration algorithms, and interactive modern web architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-3xl bg-black/65 border border-white/10 hover:border-white/35 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-[0_20px_45px_-10px_rgba(255,255,255,0.08)] flex flex-col justify-between group backdrop-blur-xl card-interactive"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black shadow-sm">
                    {proj.icon}
                  </div>
                  <span className="font-mono text-xs text-neutral-400 font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                    {proj.num}
                  </span>
                </div>

                <div
                  className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5"
                  dangerouslySetInnerHTML={{ __html: proj.category }}
                />

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neutral-200 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {proj.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/10">
                  {proj.tags.map((t, j) => (
                    <span
                      key={j}
                      className="text-[11px] font-mono bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md text-neutral-300 hover:bg-white/15 hover:border-white/25 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" size="sm" className="w-full gap-2 border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/40 group/btn transition-all">
                      <GithubIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
                      <span>View Source</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-auto transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
