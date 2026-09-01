"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader } from "@/components/ui/Loader";
import { easeOut } from "@/lib/motion";

const SESSION_KEY = "luxedrive-intro-seen";

/**
 * Brief logo reveal + curtain wipe (~0.8–1s) on first homepage visit
 * per browser session. Skipped entirely when reduced-motion is on.
 * Always shows "LUXA" in both EN and FA.
 */
export function PageIntro() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (reduceMotion) {
        setReady(true);
        return;
      }
      try {
        if (sessionStorage.getItem(SESSION_KEY)) {
          setReady(true);
          return;
        }
      } catch {
        /* private mode */
      }
      setShow(true);
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion]);

  useEffect(() => {
    if (!show) return;

    const finish = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 980);

    return () => window.clearTimeout(finish);
  }, [show]);

  if (!ready) {
    return (
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-deep"
        aria-hidden
      >
        <Loader />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-deep"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.05 }}
          aria-hidden
        >
          <motion.span
            className="font-display text-4xl font-semibold tracking-[0.28em] text-canvas -mr-[0.28em] sm:text-5xl"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            LUXA
          </motion.span>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-px bg-canvas/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.15 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
