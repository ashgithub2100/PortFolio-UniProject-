// This is a file with a demo for your component
// That's what users will see in the preview
// Create new files in this directory to add more demos

import * as React from "react";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

// Curated high-resolution Unsplash stock assets for tech & 3D creative showcases
export const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    alt: "Abstract 3D curved fluid forms in deep indigo and violet",
  },
  {
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    alt: "Prismatic colorful geometric shapes in motion",
  },
  {
    src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
    alt: "Luminous neon holographic gradient wave",
  },
  {
    src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    alt: "Deep space digital light lattice and neural nodes",
  },
  {
    src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80",
    alt: "Vibrant chromatic distortion and abstract spectrum",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    alt: "Retro cybernetic hardware and circuits",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    alt: "Detailed macro view of high-performance silicon processor",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    alt: "Futuristic digital matrix stream",
  },
  {
    src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
    alt: "Ultra-clean liquid gradient backdrop",
  },
  {
    src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80",
    alt: "Smooth monochromatic liquid topography",
  },
];

// ONLY DEFAULT EXPORT WILL BE TREATED AS A DEMO
export default function DemoOne() {
  return (
    <ImageStreamHero
      images={IMAGES}
      className="h-[560px] w-full rounded-2xl border border-white/20 bg-black shadow-2xl"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
        {/* Top Feature Pill Badge with Lucide Icon */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-md shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-white animate-pulse" />
          <span>Interactive 3D Corridor Showcase</span>
        </div>

        {/* Center Main Copy */}
        <div className="px-6 space-y-4 max-w-2xl">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Your work,
            <br />
            front and centre.
          </h1>
          <p className="mx-auto max-w-md text-balance text-sm text-neutral-400">
            A hero that leads with the images instead of describing them. Swap in
            your own and the corridor rebuilds around them in true 3D perspective.
          </p>
        </div>

        {/* Bottom Action CTA with Lucide Icon */}
        <div className="px-6">
          <a href="#projects">
            <Button
              size="lg"
              className="group gap-2 text-sm font-semibold bg-white text-black hover:bg-neutral-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </ImageStreamHero>
  );
}
