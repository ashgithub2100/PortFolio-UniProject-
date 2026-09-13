import * as React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Copy, Check, Terminal, Sparkles, Send } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function ContactSection() {
  const [copied, setCopied] = React.useState(false);
  const email = "ash76323@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-white/10 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto rounded-3xl bg-black/75 border border-white/15 p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-center relative overflow-hidden backdrop-blur-2xl card-interactive">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mx-auto mb-6 shadow-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black">
            <Terminal className="w-7 h-7" />
          </div>

          <div className="font-mono text-xs text-neutral-400 tracking-wider uppercase mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>// 04 &bull; Initiate Uplink</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Let's Build Something <span className="kinetic-gradient-text">Exceptional.</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
            I'm actively seeking internship opportunities, research collaborations in machine learning and GPU compute, and ambitious engineering teams to build with.
          </p>

          {/* Email Copy Card with Interactive Physics */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2.5 pl-6 rounded-2xl bg-black border border-white/20 shadow-inner mb-8 transition-all hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Mail className="w-4 h-4 text-white animate-pulse" />
            <span className="font-mono text-sm text-white font-medium">{email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2 h-9 border-white/25 bg-white/10 text-white hover:bg-white hover:text-black transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in-50" />
                  <span className="text-xs font-semibold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-xs">Copy Email</span>
                </>
              )}
            </Button>
          </div>

          {/* Social Links with Hover Physics */}
          <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/10">
            <a
              href="https://github.com/ashgithub2100"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white hover:scale-105 transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-white/20">&bull;</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white hover:scale-105 transition-all duration-200"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center text-xs font-mono text-neutral-500">
          &copy; {new Date().getFullYear()} Aditya Sharma &bull; Built with Vite, React, Tailwind CSS, TypeScript &amp; shadcn/ui.
        </div>
      </div>
    </section>
  );
}
