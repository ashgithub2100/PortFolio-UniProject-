import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "emerald";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:pointer-events-none disabled:opacity-50 btn-animated cursor-pointer select-none",
          {
            "bg-white text-black hover:bg-neutral-100 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] font-semibold":
              variant === "default" || variant === "emerald",
            "bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30":
              variant === "destructive",
            "border border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md":
              variant === "outline",
            "bg-neutral-900 text-neutral-200 border border-white/10 hover:bg-neutral-800 hover:text-white":
              variant === "secondary",
            "hover:bg-white/10 hover:text-white": variant === "ghost",
            "text-white underline-offset-4 hover:underline": variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-lg px-3 text-xs": size === "sm",
            "h-12 rounded-xl px-7 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
