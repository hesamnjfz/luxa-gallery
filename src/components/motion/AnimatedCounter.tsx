"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { parseStatValue } from "@/lib/motion";
import { cn } from "@/lib/cn";

type AnimatedCounterProps = {
  value: string;
  className?: string;
};

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const { prefix, number, suffix } = parseStatValue(value);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 55,
    damping: 20,
    mass: 0.7,
  });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    motionValue.set(number);
  }, [inView, motionValue, number, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    return spring.on("change", (v) => {
      setDisplay(Math.round(v));
    });
  }, [spring, reduceMotion]);

  const shown = reduceMotion ? number : display;

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={value}
    >
      {prefix}
      {shown}
      {suffix}
    </motion.span>
  );
}
