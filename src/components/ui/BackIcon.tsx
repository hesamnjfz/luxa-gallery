import { cn } from "@/lib/cn";

export function BackIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/back-arrow.png"
      alt=""
      width={20}
      height={20}
      aria-hidden
      className={cn(
        "h-5 w-5 object-contain brightness-0 invert rtl:-scale-x-100",
        className,
      )}
    />
  );
}
