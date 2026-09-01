import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Short centered rule instead of a full-width line. */
  short?: boolean;
}

export function Divider({ short = false, className, ...props }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-0 bg-line",
        short ? "mx-auto h-px w-16" : "h-px w-full",
        className,
      )}
      {...props}
    />
  );
}
