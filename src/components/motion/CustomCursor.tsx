"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

/**
 * Desktop-only soft ring cursor. Expands with "View" label over
 * elements marked `[data-cursor="view"]`.
 */
export function CustomCursor() {
  const t = useTranslations("motion");
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 380, damping: 32, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 380, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;

    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement | null)?.closest?.(
        '[data-cursor="view"]',
      );
      setActive(Boolean(el));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, rawX, rawY]);

  if (!enabled || reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed start-0 top-0 z-[110] mix-blend-difference"
      style={{ x, y }}
      aria-hidden
    >
      <motion.div
        className={cn(
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-canvas/80",
          active ? "bg-canvas/10" : "bg-transparent",
        )}
        animate={{
          width: active ? 72 : 12,
          height: active ? 72 : 12,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: easeOut }}
      >
        <motion.span
          className="font-sans text-[10px] font-semibold uppercase tracking-label text-canvas"
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85 }}
          transition={{ duration: 0.22, ease: easeOut }}
        >
          {t("view")}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
