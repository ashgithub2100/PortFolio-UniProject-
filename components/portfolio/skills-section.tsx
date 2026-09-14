import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Terminal,
  Database,
  GitBranch,
  ChevronDown,
  Layers,
  Sparkles,
  CheckCircle2,
  Code2,
} from "lucide-react";

interface SkillItem {
  name: string;
  level: string;
}

interface Domain {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  summary: string;
  skills: SkillItem[];
  technologies: string[];
  projectApplication: string;
  terminalSample: string;
  activeLearningFocus?: boolean;
  activeLearningNote?: string;
}

export function SkillsSection() {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    "ai-prompt": true,
    "prog-compute": true,
    "ml-ds": false,
    "dev-workflow": false,
  });

  const domains: Domain[] = [
    {
      id: "prog-compute",
      title: "Programming & Compute",
      subtitle: "High-Performance Systems & GPU Acceleration",
      icon: <Cpu className="w-5 h-5 text-white" />,
      activeLearningFocus: true,
      activeLearningNote:
        "Active learning in more competencies, that are actually tough and harder — mastering GPU warp primitives, shared memory tiling, and low-level C++20 systems.",
      summary:
        "From high-level algorithmic logic in Python to low-level GPU acceleration with NVIDIA CUDA and parallel thread architectures.",
      skills: [
        { name: "CUDA (GPU Parallel Programming & Kernels)", level: "Active Learning" },
        { name: "Low-Level GPU Memory Tiling & Matrix GEMM", level: "Active Learning" },
        { name: "Python (Systems & Numerical Scripting)", level: "Primary Stack" },
        { name: "C / C++20 Systems Foundations", level: "Active Learning" },
        { name: "TypeScript & Modern Web Architecture", level: "Full-Stack" },
      ],
      technologies: ["NVIDIA CUDA 12", "C++20", "Shared Memory Tiling", "Python 3.12+", "Warp Intrinsic Primitives", "AsyncIO", "Multiprocessing"],
      projectApplication:
        "Implemented GPU matrix multiplication kernels with shared memory tiling in CUDA, achieving measurable throughput gains over standard CPU executions.",
      terminalSample: "nvcc -O3 -arch=sm_89 -Xcompiler -Wall kernel.cu -o matrix_cuda",
    },
    {
      id: "ai-prompt",
      title: "AI & Prompt Engineering",
      subtitle: "Large Language Models & Agentic Workflows",
      icon: <Terminal className="w-5 h-5 text-white" />,
      activeLearningFocus: true,
      activeLearningNote:
        "Active learning in more competencies, that are actually tough and harder — diving into local LLM runtimes, KV-cache paging, and TensorRT-LLM.",
      summary:
        "Building production-grade workflows with frontier LLMs, structured prompting, local model runtimes, and programmatic agent orchestration.",
      skills: [
        { name: "Local LLM Runtimes (vLLM, Ollama, TensorRT-LLM)", level: "Active Learning" },
        { name: "Autonomous Agent Tool Calling & Workflows", level: "Active Learning" },
        { name: "ChatGPT & Claude Advanced Prompt Workflows", level: "Production" },
        { name: "Few-Shot Chain-of-Thought & Reasoning", level: "Specialized" },
        { name: "LLM API Integrations (OpenAI, Anthropic)", level: "Production" },
      ],
      technologies: ["GPT-4o", "Claude 3.7 Sonnet", "vLLM", "TensorRT-LLM", "Prompt Chaining", "Structured JSON Outputs"],
      projectApplication:
        "Engineered automated code audit agents that validate AST syntax and suggest security refactorings using structured JSON outputs.",
      terminalSample: "curl -X POST api.anthropic.com/v1/messages -H 'x-api-key: $KEY' ...",
    },
    {
      id: "ml-ds",
      title: "ML & Data Science",
      subtitle: "Statistical Modeling & Feature Engineering",
      icon: <Database className="w-5 h-5 text-white" />,
      activeLearningFocus: true,
      activeLearningNote:
        "Active learning in more competencies, that are actually tough and harder — custom PyTorch autograd tensors and loss landscape optimization.",
      summary:
        "Rigorous exploratory data analysis, mathematical modeling, and training reproducible machine learning pipelines.",
      skills: [
        { name: "PyTorch Custom Tensors & Autograd Mechanics", level: "Active Learning" },
        { name: "ML Math (Linear Algebra, Calculus & Probability)", level: "Academic Core" },
        { name: "Scikit-Learn Classifiers & Regressors", level: "Production" },
        { name: "Pandas & NumPy High-Perf Data Wrangling", level: "Expert" },
        { name: "Data Visualization (Matplotlib, Seaborn)", level: "Advanced" },
      ],
      technologies: ["PyTorch", "NumPy", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn", "JupyterLab"],
      projectApplication:
        "Constructed predictive classification pipelines with automated k-fold cross-validation, hyperparameter tuning via GridSearchCV, and ROC/AUC metric tracking.",
      terminalSample: "python -m sklearn.pipeline --evaluate --cv=5 --dataset=telecom_churn.parquet",
    },
    {
      id: "dev-workflow",
      title: "Developer Workflow & Tools",
      subtitle: "Modern Toolchains, CLI Navigation & Git",
      icon: <GitBranch className="w-5 h-5 text-white" />,
      summary:
        "Robust software development practices, version control hygiene, and containerized development setups.",
      skills: [
        { name: "Git & GitHub Version Control Hygiene", level: "Advanced" },
        { name: "Linux / Bash Terminal Navigation", level: "Proficient" },
        { name: "GPU Profiling with Nsight Systems Basics", level: "Active Learning" },
        { name: "VS Code & Remote SSH Development", level: "Primary IDE" },
        { name: "Vite, Node & Package Management", level: "Full-Stack" },
      ],
      technologies: ["Git CLI", "GitHub Actions", "WSL2 / Ubuntu", "Vite", "pnpm / npm", "Docker Basics"],
      projectApplication:
        "Architected modular repository structures with automated branch protection, pre-commit lint hooks, and reproducible environment configurations.",
      terminalSample: "git log --graph --oneline --decorate --all -n 5",
    },
  ];

  const toggleDomain = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allExpanded = Object.values(expanded).every(Boolean);
  const toggleAll = () => {
    const nextState = !allExpanded;
    setExpanded({
      "ai-prompt": nextState,
      "prog-compute": nextState,
      "ml-ds": nextState,
      "dev-workflow": nextState,
    });
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-white/10 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-xs text-neutral-400 tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>// 02 &bull; Technical Repertoire</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Tools, Runtimes &amp; <span className="kinetic-gradient-text">Competencies.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Interactive competency matrix.{" "}
              <span className="text-neutral-200 font-medium underline decoration-amber-400/50 underline-offset-4">
                Active learning in more competencies, that are actually tough and harder
              </span>{" "}
              — tackling low-level GPU acceleration, custom CUDA memory tiling, and high-performance inference pipelines.
            </p>
          </div>

          {/* Quick Toggle Action with Button Animation */}
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAll}
              className="gap-2 text-xs"
            >
              <Layers className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
              <span>{allExpanded ? "Collapse All Cards" : "Expand All Cards"}</span>
            </Button>
          </div>
        </div>

        {/* Interactive Expandable Competency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((domain) => {
            const isExpanded = !!expanded[domain.id];
            return (
              <div
                key={domain.id}
                className={`rounded-3xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                  isExpanded
                    ? "border-white/35 bg-black/85 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.08)] ring-1 ring-white/20"
                    : "border-white/10 bg-black/60 hover:border-white/30 hover:bg-black/75 shadow-md card-interactive"
                }`}
              >
                {/* Header (Clickable Trigger) */}
                <button
                  type="button"
                  onClick={() => toggleDomain(domain.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`content-${domain.id}`}
                  className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-105 shadow-sm">
                      {domain.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-neutral-200 transition-colors">
                          {domain.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-[10px] border-white/20 bg-white/5 text-neutral-300 py-0.5 px-2.5 rounded-full"
                        >
                          {domain.skills.length} competencies
                        </Badge>
                        {domain.activeLearningFocus && (
                          <Badge
                            variant="outline"
                            className="text-[10px] font-mono border-amber-400/35 bg-amber-400/10 text-amber-300 py-0.5 px-2.5 rounded-full flex items-center gap-1.5 shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span>Active Learning</span>
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">{domain.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline-block">
                      {isExpanded ? "Collapse" : "Expand"}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
                        isExpanded ? "rotate-180 bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.5)]" : "text-white group-hover:border-white/40 group-hover:scale-110"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Active Learning Callout Banner if Domain has Active Learning Focus */}
                {domain.activeLearningNote && (
                  <div className="mx-6 sm:mx-7 mb-3.5 p-3 rounded-2xl bg-amber-400/[0.07] border border-amber-400/25 flex items-start gap-2.5 text-xs text-amber-200/90 font-mono">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                    <span className="leading-relaxed">{domain.activeLearningNote}</span>
                  </div>
                )}

                {/* Card Summary */}
                <div className="px-6 sm:px-7 pb-4 text-xs sm:text-sm text-neutral-400 border-b border-white/5">
                  {domain.summary}
                </div>

                {/* Expandable Content Area */}
                {isExpanded && (
                  <div
                    id={`content-${domain.id}`}
                    className="p-6 sm:p-7 pt-4 space-y-6 animate-in fade-in-50 duration-300"
                  >
                    {/* Skills & Verification Badges (Percentages Removed) */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span>Core Competencies &amp; Status</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {domain.skills.map((skill, j) => (
                          <div
                            key={j}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 hover:border-white/25 hover:bg-white/[0.07] transition-all"
                          >
                            <span className="text-white text-xs font-medium flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                              <span>{skill.name}</span>
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border shrink-0 flex items-center gap-1.5 ${
                                skill.level.includes("Active Learning")
                                  ? "bg-amber-400/10 text-amber-300 border-amber-400/30 font-semibold"
                                  : "bg-white/10 text-neutral-200 border-white/15"
                              }`}
                            >
                              {skill.level.includes("Active Learning") && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                              )}
                              <span>{skill.level}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Associated Technologies & Tags */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                        // Active Toolchain
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {domain.technologies.map((tech, k) => (
                          <span
                            key={k}
                            className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/10 text-neutral-200 border border-white/15 hover:border-white/40 hover:bg-white/15 transition-all duration-200 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Practical Project Deployment */}
                    <div className="p-4 rounded-2xl bg-neutral-950 border border-white/15 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-white">
                        <Code2 className="w-3.5 h-3.5 text-white" />
                        <span>Practical Deployment Note</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {domain.projectApplication}
                      </p>
                    </div>

                    {/* Terminal Commandline Sample */}
                    <div className="p-3.5 rounded-xl bg-black border border-white/15 font-mono text-[11px] text-neutral-400 overflow-x-auto flex items-center gap-2">
                      <span className="text-neutral-600 select-none">$</span>
                      <code className="text-neutral-200">{domain.terminalSample}</code>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
