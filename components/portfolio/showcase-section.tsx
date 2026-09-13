import * as React from "react";
import DemoOne from "@/components/ui/demo";
import { Layers, Box, Code2 } from "lucide-react";

export function ShowcaseSection() {
  return (
    <section id="showcase" className="py-16 md:py-24 border-t border-white/10 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-xs font-mono text-neutral-300 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>// 3D Visual Corridor &bull; shadcn/ui Component</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Infinite <span className="kinetic-gradient-text">Image Stream Corridor</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Engineered with geometric perspective projection, dual mirrored conveyor rails, and container query width units (<code className="text-white font-mono text-xs">cqw</code>).
          </p>
        </div>

        {/* The 3D Corridor Demo Component */}
        <div className="max-w-5xl mx-auto shadow-[0_25px_80px_-15px_rgba(0,0,0,0.98)] rounded-2xl overflow-hidden">
          <DemoOne />
        </div>

        {/* Technical Architecture Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          <div className="p-6 rounded-3xl bg-black/65 border border-white/10 space-y-3 card-interactive backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Dual Conveyor Rails</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Two parallel conveyor rails open aggressively at birth and rotate outward toward the viewport edge, creating continuous kinetic motion without vanishing point seams.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-black/65 border border-white/10 space-y-3 card-interactive backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Container Query Units (cqw)</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every length and offset is computed as a percentage of the parent container width, ensuring resolution-independent proportions across any device size.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-black/65 border border-white/10 space-y-3 card-interactive backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">shadcn CLI Compatible</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Stored in <code className="text-white font-mono">/components/ui/image-stream-hero.tsx</code> with typed props, accessibility landmarks, and zero external framework lock-in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
