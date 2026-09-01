import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function SectionLabel({
  children,
  className,
  ...props
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 font-sans text-label font-semibold uppercase tracking-label text-muted",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-soft" />
      {children}
    </p>
  );
}
