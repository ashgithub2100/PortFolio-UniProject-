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
      id: "ai-prompt",
      title: "AI & Prompt Engineering",
      subtitle: "Large Language Models & Agentic Workflows",
      icon: <Terminal className="w-5 h-5 text-white" />,
      summary:
        "Building production-grade workflows with frontier LLMs, structured prompting, and programmatic orchestration.",
      skills: [
        { name: "ChatGPT & Claude Advanced Workflows", level: "Production" },
        { name: "Few-Shot Prompt Engineering & CoT", level: "Specialized" },
        { name: "LLM API Integrations (OpenAI, Anthropic)", level: "Production" },
        { name: "Local LLM Runtimes (Ollama, vLLM)", level: "Active Learning" },
      ],
      technologies: ["GPT-4o", "Claude 3.7 Sonnet", "Prompt Chaining", "Structured Outputs", "Context Window Optimization"],
      projectApplication:
        "Engineered automated code audit agents that validate AST syntax and suggest security refactorings using structured JSON outputs.",
      terminalSample: "curl -X POST api.anthropic.com/v1/messages -H 'x-api-key: $KEY' ...",
    },
    {
      id: "prog-compute",
      title: "Programming & Compute",
      subtitle: "High-Performance Systems & GPU Acceleration",
      icon: <Cpu className="w-5 h-5 text-white" />,
      summary:
        "From high-level algorithmic logic in Python to low-level GPU acceleration with NVIDIA CUDA.",
      skills: [
        { name: "Python (Systems & Scripting)", level: "Primary Stack" },
        { name: "CUDA (GPU Parallel Programming)", level: "Active Learning" },
        { name: "C / C++ Foundations", level: "Systems" },
        { name: "TypeScript & React Architecture", level: "Full-Stack" },
      ],
      technologies: ["Python 3.12+", "NVIDIA CUDA 12", "C++20", "TypeScript", "AsyncIO", "Multiprocessing"],
      projectApplication:
        "Implemented GPU matrix multiplication kernels with shared memory tiling in CUDA, achieving measurable throughput gains over standard CPU executions.",
      terminalSample: "nvcc -O3 -arch=sm_86 -Xcompiler -Wall kernel.cu -o matrix_cuda",
    },
    {
      id: "ml-ds",
      title: "ML & Data Science",
      subtitle: "Statistical Modeling & Feature Engineering",
      icon: <Database className="w-5 h-5 text-white" />,
      summary:
        "Rigorous exploratory data analysis, mathematical modeling, and training reproducible machine learning pipelines.",
      skills: [
        { name: "Pandas & NumPy Data Wrangling", level: "Expert" },
        { name: "Scikit-Learn Classifiers & Regressors", level: "Production" },
        { name: "ML Math (Linear Algebra & Probability)", level: "Academic Core" },
        { name: "Data Visualization (Matplotlib, Seaborn)", level: "Advanced" },
      ],
      technologies: ["Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn", "JupyterLab", "Statsmodels"],
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
        { name: "Git & GitHub Version Control", level: "Advanced" },
        { name: "Linux / Bash Terminal Navigation", level: "Proficient" },
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
            <p className="text-sm sm:text-base text-neutral-400">
              Interactive competency matrix. Click each card to expand deep toolchains, verification status, and real-world project deployments.
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
                              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border shrink-0 ${
                                skill.level === "Active Learning"
                                  ? "bg-amber-400/10 text-amber-300 border-amber-400/30"
                                  : "bg-white/10 text-neutral-200 border-white/15"
                              }`}
                            >
                              {skill.level}
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
