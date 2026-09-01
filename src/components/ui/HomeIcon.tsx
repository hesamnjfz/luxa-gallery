import { cn } from "@/lib/cn";

export function HomeIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/home.png"
      alt=""
      width={20}
      height={20}
      aria-hidden
      className={cn("h-5 w-5 object-contain brightness-0 invert", className)}
    />
  );
}
