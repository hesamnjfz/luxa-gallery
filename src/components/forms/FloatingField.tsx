"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

function FieldShell({ id, label, error, className, children }: FieldShellProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute start-3 top-1/2 origin-[0] -translate-y-1/2 px-1 font-sans text-sm font-medium text-soft transition-all duration-200 rtl:origin-[100%]",
          "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-surface peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-label peer-focus:text-ink",
          "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:bg-surface peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-label peer-[:not(:placeholder-shown)]:text-muted",
          error && "peer-focus:text-red-800",
        )}
      >
        {label}
      </label>
      {error ? (
        <p className="mt-1.5 font-sans text-xs font-medium text-red-800/90" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FloatingInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function FloatingInput({
  id,
  label,
  error,
  className,
  ...props
}: FloatingInputProps) {
  const fieldId = id ?? props.name;
  return (
    <FieldShell id={fieldId!} label={label} error={error}>
      <input
        id={fieldId}
        placeholder=" "
        className={cn(
          "peer w-full border bg-transparent px-4 pb-2.5 pt-5 font-sans text-sm font-medium text-ink outline-none transition-colors duration-200",
          "border-line focus:border-ink focus:ring-1 focus:ring-ink/25",
          error && "border-red-800/45 bg-red-50/40 focus:border-red-800/60 focus:ring-red-800/20",
          className,
        )}
        {...props}
      />
    </FieldShell>
  );
}

type FloatingTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function FloatingTextarea({
  id,
  label,
  error,
  className,
  ...props
}: FloatingTextareaProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="relative">
      <textarea
        id={fieldId}
        placeholder=" "
        className={cn(
          "peer min-h-[120px] w-full resize-y border bg-transparent px-4 pb-3 pt-6 font-sans text-sm font-medium text-ink outline-none transition-colors duration-200",
          "border-line focus:border-ink focus:ring-1 focus:ring-ink/25",
          error && "border-red-800/45 bg-red-50/40 focus:border-red-800/60 focus:ring-red-800/20",
          className,
        )}
        {...props}
      />
      <label
        htmlFor={fieldId}
        className={cn(
          "pointer-events-none absolute start-3 top-5 origin-[0] px-1 font-sans text-sm font-medium text-soft transition-all duration-200 rtl:origin-[100%]",
          "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-surface peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-label peer-focus:text-ink",
          "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:bg-surface peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-label peer-[:not(:placeholder-shown)]:text-muted",
        )}
      >
        {label}
      </label>
      {error ? (
        <p className="mt-1.5 font-sans text-xs font-medium text-red-800/90" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FloatingSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  children: ReactNode;
};

export function FloatingSelect({
  id,
  label,
  error,
  className,
  children,
  ...props
}: FloatingSelectProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="relative">
      <select
        id={fieldId}
        defaultValue={props.value === undefined ? "" : undefined}
        className={cn(
          "peer w-full appearance-none border bg-transparent px-4 pb-2.5 pt-5 font-sans text-sm font-medium text-ink outline-none transition-colors duration-200",
          "border-line focus:border-ink focus:ring-1 focus:ring-ink/25",
          error && "border-red-800/45 bg-red-50/40 focus:border-red-800/60 focus:ring-red-800/20",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <label
        htmlFor={fieldId}
        className={cn(
          "pointer-events-none absolute start-3 top-0 z-10 -translate-y-1/2 bg-surface px-1 font-sans text-[10px] font-medium uppercase tracking-label text-muted transition-colors",
          "peer-focus:text-ink",
          error && "text-red-800",
        )}
      >
        {label}
      </label>
      {error ? (
        <p className="mt-1.5 font-sans text-xs font-medium text-red-800/90" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
