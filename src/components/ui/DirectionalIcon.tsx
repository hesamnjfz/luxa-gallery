import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/** Arrow/chevron that flips automatically in RTL via CSS logical transform. */
export function DirectionalIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("rtl:-scale-x-100", className)}
      {...props}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

type ChevronIconProps = SVGProps<SVGSVGElement> & {
  /** prev = toward start, next = toward end (RTL-aware) */
  direction: "prev" | "next";
};

/** Carousel / gallery chevron — mirrors correctly in RTL. */
export function ChevronIcon({
  direction,
  className,
  ...props
}: ChevronIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(
        "rtl:-scale-x-100",
        direction === "prev" && "rotate-180",
        className,
      )}
      {...props}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
