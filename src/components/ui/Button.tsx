import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "default" | "sm";
export type ButtonTone = "light" | "dark";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** `dark` = controls on dark cinematic surfaces (inverted sweep). */
  tone?: ButtonTone;
}

export function Button({
  variant = "primary",
  size = "default",
  tone = "light",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  const isSweep = variant === "primary";

  if (isSweep) {
    return (
      <button
        type={type}
        className={cn(
          "luxa-sweep-btn inline-flex items-center justify-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-40",
          size === "default" && "min-h-12 px-[2.4em] py-[0.7em] text-[15px] sm:text-base",
          size === "sm" && "min-h-10 px-5 py-2.5 text-[11px]",
          tone === "light" &&
            "focus-visible:ring-ink/35 focus-visible:ring-offset-canvas",
          tone === "dark" &&
            "luxa-sweep-btn--on-dark focus-visible:ring-canvas/70 focus-visible:ring-offset-deep",
          className,
        )}
        {...props}
      >
        <span className="luxa-sweep-btn__frame" aria-hidden />
        <span className="relative z-10 inline-flex items-center justify-center gap-3 font-sans font-semibold uppercase tracking-label">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 font-sans font-semibold uppercase tracking-label transition-all duration-hover ease-luxury select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-40",
        size === "default" && "px-8 py-4 text-label",
        size === "sm" && "px-5 py-2.5 text-[10px]",
        tone === "light" &&
          "focus-visible:ring-ink/35 focus-visible:ring-offset-canvas border border-ink/25 bg-transparent text-muted hover:border-ink hover:text-ink",
        tone === "dark" &&
          "focus-visible:ring-canvas/70 focus-visible:ring-offset-deep border border-canvas/55 bg-transparent text-canvas hover:bg-canvas/10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
