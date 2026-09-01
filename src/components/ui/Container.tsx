import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
}

export function Container({
  as: Tag = "div",
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-container px-6 sm:px-8 lg:px-16",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
