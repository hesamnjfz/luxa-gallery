import { cn } from "@/lib/cn";

export type LoaderProps = {
  className?: string;
  label?: string;
  /** Tall centered block — collection grids, route loading */
  block?: boolean;
};

export function Loader({ className, label, block = false }: LoaderProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-5",
        block && "min-h-[min(50vh,28rem)] w-full py-16",
        className,
      )}
    >
      <span className="luxa-loader" aria-hidden />
      {label ? (
        <p className="font-sans text-sm font-semibold text-muted">{label}</p>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  );
}
