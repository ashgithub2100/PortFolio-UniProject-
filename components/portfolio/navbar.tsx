import * as React from "react";
import { Sparkles, Menu, X, Terminal, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo with Ambient Glow */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-black border border-white/30 flex items-center justify-center font-mono font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-105 group-hover:border-white group-hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all duration-300">
            AS
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              Aditya Sharma
            </span>
            <span className="font-mono text-[10px] text-neutral-400">
              AI &amp; Data Science
            </span>
          </div>
        </a>

        {/* Desktop Nav Links with Hover Micro-Interactions */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/15 bg-black/70 backdrop-blur-xl px-4 py-1.5 shadow-md">
          <a
            href="#hero"
            className="px-3.5 py-1 text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="px-3.5 py-1 text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            About
          </a>
          <a
            href="#skills"
            className="px-3.5 py-1 text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="px-3.5 py-1 text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="px-3.5 py-1 text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            Contact
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="#contact">
            <Button variant="outline" size="sm" className="border-white/25 text-white hover:bg-white/10 gap-2 bg-white/5">
              <Terminal className="w-3.5 h-3.5" />
              Let's Connect
            </Button>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2.5 rounded-xl bg-black border border-white/20 text-white cursor-pointer hover:bg-white/10 transition-colors"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-white/15 bg-black/95 backdrop-blur-2xl px-6 py-5 flex flex-col gap-3 animate-in slide-in-from-top-4 duration-300">
          <a
            href="#hero"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-white py-2 border-b border-white/10"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-white py-2 border-b border-white/10"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-white py-2 border-b border-white/10"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-white py-2 border-b border-white/10"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-white py-2"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
