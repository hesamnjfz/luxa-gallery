"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Slim top-of-viewport scroll progress indicator.
 * Uses ink (theme lock) — not gold.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 400 : 120,
    damping: reduceMotion ? 50 : 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] origin-start bg-ink rtl:origin-end"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
