"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { easeOut, reveal, revealDuration, staggerItem } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : reveal.hidden}
      whileInView={reveal.visible}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduceMotion ? 0 : revealDuration,
        delay: reduceMotion ? 0 : delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of element visible, or `"some"` for any pixel (needed for tall grids). */
  amount?: number | "some" | "all";
  stagger?: number;
};

export function RevealStagger({
  children,
  className,
  amount = "some",
  stagger = 0.1,
}: RevealStaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : stagger,
            delayChildren: reduceMotion ? 0 : 0.06,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
};

export function RevealItem({ children, className }: RevealItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: staggerItem.hidden,
              visible: {
                ...staggerItem.visible,
                transition: { duration: revealDuration, ease: easeOut },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
