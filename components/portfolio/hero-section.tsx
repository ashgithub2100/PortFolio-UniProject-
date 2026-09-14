import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Terminal,
  Cpu,
  Sparkles,
  Activity,
  Zap,
  Play,
  RefreshCw,
  Sliders,
  CheckCircle2,
  ChevronDown,
  Layers,
} from "lucide-react";
import NeuralCoreCanvas, {
  NeuralCoreCanvasRef,
  VisualizerMode,
} from "@/components/ui/neural-core-canvas";

export function HeroSection() {
  // Visualizer mode & telemetry state
  const [activeMode, setActiveMode] = React.useState<VisualizerMode>("synapse");
  const [fps, setFps] = React.useState<number>(60);
  const canvasRef = React.useRef<NeuralCoreCanvasRef>(null);

  // 3D Card Tilt & Cursor Spotlight state
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [cardTransform, setCardTransform] = React.useState("");
  const [spotlightPos, setSpotlightPos] = React.useState({ x: 50, y: 50 });

  // Interactive AI Inference Playground state
  const [isInferenceOpen, setIsInferenceOpen] = React.useState<boolean>(false);
  const [isRunningInference, setIsRunningInference] = React.useState<boolean>(false);
  const [inferenceStep, setInferenceStep] = React.useState<number>(0);
  const [inferenceMetric, setInferenceMetric] = React.useState({
    latency: "11.2 ms",
    throughput: "94.6 tok/s",
    vram: "3.8 GB",
    utilization: "96.4%",
  });

  // Handle Card 3D tilt on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setCardTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    );
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setCardTransform("perspective(1200px) rotateX(0deg) rotateY(0deg)");
  };

  // Trigger Shockwave in canvas
  const handleTriggerShockwave = () => {
    canvasRef.current?.triggerShockwave();
  };

  // Run simulated AI Forward Pass
  const handleRunInference = () => {
    if (isRunningInference) return;
    setIsRunningInference(true);
    setInferenceStep(1);

    setTimeout(() => setInferenceStep(2), 650);
    setTimeout(() => {
      setInferenceStep(3);
      canvasRef.current?.triggerShockwave();
    }, 1300);
    setTimeout(() => {
      setInferenceStep(4);
      setIsRunningInference(false);
      setInferenceMetric({
        latency: `${(9.5 + Math.random() * 3).toFixed(1)} ms`,
        throughput: `${(88 + Math.random() * 15).toFixed(1)} tok/s`,
        vram: `${(3.6 + Math.random() * 0.5).toFixed(1)} GB`,
        utilization: `${(94 + Math.random() * 5).toFixed(1)}%`,
      });
    }, 2000);
  };

  return (
    <section id="hero" className="relative pt-28 pb-10 md:pt-36 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 hero-card-perspective">
        {/* Main Hero Card Container with 3D Tilt & Cyber Spotlight */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: cardTransform }}
          className="hero-command-card relative rounded-3xl border border-white/20 bg-black/80 backdrop-blur-2xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.98)] overflow-hidden transition-transform duration-200 ease-out"
        >
          {/* Dynamic Cursor-Following Radial Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle 500px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 255, 255, 0.08), transparent 70%)`,
            }}
          />

          {/* Cyber Grid Accent */}
          <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-20" />

          {/* Embedded Interactive 3D Canvas Background Layer */}
          <div className="absolute inset-0 pointer-events-auto opacity-70 hover:opacity-90 transition-opacity duration-700">
            <NeuralCoreCanvas
              ref={canvasRef}
              mode={activeMode}
              onFpsUpdate={setFps}
              interactive={true}
              className="w-full h-full"
            />
          </div>

          {/* Foreground Hero Content Layer */}
          <div className="relative z-10 flex min-h-[620px] md:min-h-[680px] flex-col justify-between py-10 px-5 sm:px-8 md:px-12 text-center pointer-events-none">
            {/* Top Row: Availability Badge & Interactive 3D HUD Dock */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
              {/* Left Availability Pill */}
              <Badge
                variant="outline"
                className="gap-2 py-1.5 px-4 border-white/20 bg-black/60 text-white shadow-lg backdrop-blur-xl rounded-full animate-float"
              >
                <span className="w-2 h-2 rounded-full bg-white beacon-pulse" />
                <span className="tracking-wide text-xs sm:text-sm">
                  Available for internships &amp; collaborations
                </span>
              </Badge>

              {/* Right Interactive Visualizer HUD Dock */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full border border-white/20 bg-black/75 backdrop-blur-xl shadow-md text-xs font-mono">
                <span className="px-2.5 py-1 text-neutral-400 font-semibold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>{fps} FPS</span>
                </span>

                <div className="h-4 w-px bg-white/15" />

                {/* Mode Selector Buttons */}
                <button
                  type="button"
                  onClick={() => setActiveMode("synapse")}
                  className={`hud-pill px-3 py-1 rounded-full border border-transparent cursor-pointer ${
                    activeMode === "synapse" ? "active" : "text-neutral-300"
                  }`}
                  title="Switch to Neural Synapse Mode"
                >
                  Synapse
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("tensor")}
                  className={`hud-pill px-3 py-1 rounded-full border border-transparent cursor-pointer ${
                    activeMode === "tensor" ? "active" : "text-neutral-300"
                  }`}
                  title="Switch to CUDA Tensor Lattice Mode"
                >
                  CUDA Tensor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("vortex")}
                  className={`hud-pill px-3 py-1 rounded-full border border-transparent cursor-pointer ${
                    activeMode === "vortex" ? "active" : "text-neutral-300"
                  }`}
                  title="Switch to Quantum Swarm Mode"
                >
                  Vortex
                </button>

                <div className="h-4 w-px bg-white/15" />

                {/* Shockwave Blast Trigger Button */}
                <button
                  type="button"
                  onClick={handleTriggerShockwave}
                  className="hud-pill px-2.5 py-1 rounded-full text-white hover:text-white border border-white/15 hover:border-white/40 cursor-pointer flex items-center gap-1 bg-white/5 transition-all"
                  title="Trigger Particle Shockwave Impulse"
                >
                  <Zap className="w-3 h-3 text-white" />
                  <span className="hidden md:inline">Shockwave</span>
                </button>
              </div>
            </div>

            {/* Headline & Central Content */}
            <div className="max-w-3xl mx-auto space-y-6 my-auto pt-6 pb-4 pointer-events-auto">
              <h1 className="text-balance text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.06] drop-shadow-md">
                Engineering Intelligent Systems with{" "}
                <span className="kinetic-gradient-text">AI &amp; Compute.</span>
              </h1>

              {/* Specialization Tagline */}
              <div className="font-mono text-xs sm:text-sm text-neutral-300 flex items-center justify-center gap-2">
                <span className="opacity-40">//</span>
                <span className="bg-white/5 border border-white/10 px-3.5 py-1 rounded-full backdrop-blur-md">
                  AI &amp; Data Science (AIDS) / CSE Student — Developer &amp; Technologist
                </span>
              </div>

              {/* Bio Pitch */}
              <p className="max-w-2xl mx-auto text-balance text-xs sm:text-sm md:text-base text-neutral-300/90 leading-relaxed drop-shadow">
                Computer Science student specializing in AI &amp; Data Science, mastering machine learning pipelines, GPU-accelerated computing with CUDA, and architecting high-performance modern software.
              </p>

              {/* Primary Actions & Live Inference Playground Toggle */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <a href="#projects">
                  <Button
                    size="lg"
                    className="btn-animated group gap-2.5 text-sm sm:text-base font-semibold bg-white text-black hover:bg-neutral-100 shadow-[0_0_25px_rgba(255,255,255,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] cursor-pointer"
                  >
                    <span>Explore Projects</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </a>

                <a href="#contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="btn-animated text-sm sm:text-base border-white/25 bg-black/60 text-white hover:bg-white/15 backdrop-blur-md cursor-pointer"
                  >
                    Get In Touch
                  </Button>
                </a>

                {/* Interactive Inference Playground Trigger Button */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsInferenceOpen(!isInferenceOpen)}
                  className={`btn-animated text-sm font-mono gap-2 border-white/20 backdrop-blur-md cursor-pointer ${
                    isInferenceOpen
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: "10s" }} />
                  <span>{isInferenceOpen ? "Close Inference Lab" : "Simulate AI Inference"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isInferenceOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Interactive AI Inference & Compute Simulation Drawer */}
              {isInferenceOpen && (
                <div className="mt-6 text-left max-w-2xl mx-auto rounded-2xl border border-white/20 bg-black/90 backdrop-blur-2xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
                      <Terminal className="w-4 h-4 text-white animate-pulse" />
                      <span>LIVE CUDA &amp; NEURAL FORWARD-PASS BENCHMARK</span>
                    </div>

                    <Button
                      size="sm"
                      onClick={handleRunInference}
                      disabled={isRunningInference}
                      className="bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold h-7 px-3 gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {isRunningInference ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <Play className="w-3 h-3 fill-current" />
                      )}
                      <span>{isRunningInference ? "Executing..." : "Run Pipeline"}</span>
                    </Button>
                  </div>

                  {/* 4-Step Animated Pipeline Progress */}
                  <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
                    <div
                      className={`p-2 rounded-lg border transition-all ${
                        inferenceStep >= 1
                          ? "border-white/40 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-neutral-500"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1">
                        {inferenceStep > 1 && <CheckCircle2 className="w-3 h-3 text-white" />}
                        <span>1. TOKENIZE</span>
                      </div>
                      <div className="text-[9px] text-neutral-400 mt-0.5">BPE Byte-Pair</div>
                    </div>

                    <div
                      className={`p-2 rounded-lg border transition-all ${
                        inferenceStep >= 2
                          ? "border-white/40 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-neutral-500"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1">
                        {inferenceStep > 2 && <CheckCircle2 className="w-3 h-3 text-white" />}
                        <span>2. ATTENTION</span>
                      </div>
                      <div className="text-[9px] text-neutral-400 mt-0.5">Q·K^T / √d</div>
                    </div>

                    <div
                      className={`p-2 rounded-lg border transition-all ${
                        inferenceStep >= 3
                          ? "border-white/40 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-neutral-500"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1">
                        {inferenceStep > 3 && <CheckCircle2 className="w-3 h-3 text-white" />}
                        <span>3. CUDA CORE</span>
                      </div>
                      <div className="text-[9px] text-neutral-400 mt-0.5">GEMM FP16</div>
                    </div>

                    <div
                      className={`p-2 rounded-lg border transition-all ${
                        inferenceStep >= 4
                          ? "border-white/40 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-neutral-500"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1">
                        {inferenceStep >= 4 && <CheckCircle2 className="w-3 h-3 text-white" />}
                        <span>4. OUTPUT</span>
                      </div>
                      <div className="text-[9px] text-neutral-400 mt-0.5">Stream Stream</div>
                    </div>
                  </div>

                  {/* Terminal Execution Log Output */}
                  <div className="bg-black/80 rounded-xl p-3 border border-white/10 font-mono text-xs text-neutral-300 space-y-1">
                    <div className="text-neutral-500 text-[11px]">
                      $ nvcc --ptx -arch=sm_89 attention_kernel.cu &amp;&amp; python3 run_inference.py
                    </div>
                    {inferenceStep === 0 && (
                      <div className="text-neutral-400 italic">
                        // Ready. Click &quot;Run Pipeline&quot; to execute real-time CUDA tensor dispatch.
                      </div>
                    )}
                    {inferenceStep >= 1 && (
                      <div className="text-neutral-300 animate-in fade-in duration-200">
                        [1/4] Embedding 1,024 context tokens into latent vector space (d=4096)...
                      </div>
                    )}
                    {inferenceStep >= 2 && (
                      <div className="text-neutral-200 animate-in fade-in duration-200">
                        [2/4] Multi-head self-attention: 32 heads active with FlashAttention-2 speedup.
                      </div>
                    )}
                    {inferenceStep >= 3 && (
                      <div className="text-white font-semibold animate-in fade-in duration-200 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <span>[3/4] GPU Tensor Core warp tile: 64 SMs computing FP16 GEMM...</span>
                      </div>
                    )}
                    {inferenceStep >= 4 && (
                      <div className="text-white font-bold bg-white/10 p-2 rounded-lg border border-white/20 animate-in fade-in duration-300">
                        [SUCCESS] Forward-pass completed. Pipeline converged with zero memory leaks.
                      </div>
                    )}
                  </div>

                  {/* Live Telemetry Gauges */}
                  <div className="grid grid-cols-4 gap-2 text-center pt-1 border-t border-white/10">
                    <div className="bg-white/5 rounded-lg p-1.5 border border-white/10">
                      <div className="font-mono text-xs font-bold text-white">
                        {inferenceMetric.latency}
                      </div>
                      <div className="text-[10px] text-neutral-400">Latency</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-1.5 border border-white/10">
                      <div className="font-mono text-xs font-bold text-white">
                        {inferenceMetric.throughput}
                      </div>
                      <div className="text-[10px] text-neutral-400">Throughput</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-1.5 border border-white/10">
                      <div className="font-mono text-xs font-bold text-white">
                        {inferenceMetric.vram}
                      </div>
                      <div className="text-[10px] text-neutral-400">VRAM Usage</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-1.5 border border-white/10">
                      <div className="font-mono text-xs font-bold text-white">
                        {inferenceMetric.utilization}
                      </div>
                      <div className="text-[10px] text-neutral-400">GPU SM Load</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Quick Telemetry Stats with Card Physics */}
            <div className="w-full max-w-2xl mx-auto pt-6 border-t border-white/15 grid grid-cols-3 gap-3.5 text-center pointer-events-auto">
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-3.5 border border-white/15 card-interactive cursor-default hover:border-white/35">
                <div className="font-mono text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-1">
                  CSE <span className="text-neutral-400">AIDS</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Specialization</div>
              </div>
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-3.5 border border-white/15 card-interactive cursor-default hover:border-white/35">
                <div className="font-mono text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-1">
                  CUDA <span className="text-neutral-400">+</span> ML
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Compute Focus</div>
              </div>
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-3.5 border border-white/15 card-interactive cursor-default hover:border-white/35">
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

export default HeroSection;
