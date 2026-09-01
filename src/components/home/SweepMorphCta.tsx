"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import { focusRing } from "@/lib/a11y";
import { cn } from "@/lib/cn";

type SweepMorphCtaProps = {
  label: string;
  onClick?: () => void;
  isRtl?: boolean;
  delay?: number;
  className?: string;
  iconSrc?: string;
};

export function SweepMorphCta({
  label,
  onClick,
  isRtl = false,
  delay = 0.32,
  className,
  iconSrc = "/icons/mobile-collection-cta.png",
}: SweepMorphCtaProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const navigating = useRef(false);

  const handleClick = () => {
    if (navigating.current || !onClick) return;
    navigating.current = true;
    setActive(true);

    const wait = reduceMotion ? 0 : 1500;
    window.setTimeout(() => {
      onClick();
    }, wait);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={active}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay: reduceMotion ? 0 : delay, ease: easeOut }}
      className={cn(
        "luxa-sweep-btn luxa-mobile-collection-cta min-h-12 min-w-[13.5rem] shrink-0 items-center justify-center px-[2.4em] py-[0.7em] [--luxa-sweep-bg:#ffffff]",
        focusRing,
        active && "is-active",
        className,
      )}
    >
      <span className="luxa-sweep-btn__frame" aria-hidden />
      <span className="luxa-mobile-collection-cta__content">
        <span
          className={cn(
            "luxa-mobile-collection-cta__label",
            isRtl ? "tracking-normal" : "uppercase tracking-[0.14em]",
          )}
        >
          {label}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          alt=""
          className="luxa-mobile-collection-cta__icon"
          aria-hidden
        />
      </span>
    </motion.button>
  );
}
