"use client";

import { useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Container, SectionLabel } from "@/components/ui";
import { ChevronIcon } from "@/components/ui/DirectionalIcon";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { focusRingDark } from "@/lib/a11y";

const QUOTE_KEYS = ["0", "1", "2", "3"] as const;
const PARTNER_KEYS = ["0", "1", "2", "3", "4"] as const;

function TestimonialsBlock() {
  const t = useTranslations("trust.testimonials");
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % QUOTE_KEYS.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const key = QUOTE_KEYS[index];

  return (
    <section className="border-t border-line bg-deep py-section lg:py-section-lg text-canvas">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel className="justify-center text-canvas/60 [&_span]:bg-canvas/35">
            {t("eyebrow")}
          </SectionLabel>
          <h2 className="mt-8 font-display text-3xl font-semibold text-canvas sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div
          className="relative mx-auto mt-16 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            <button
              type="button"
              aria-label={t("prev")}
              onClick={() =>
                setIndex((i) => (i - 1 + QUOTE_KEYS.length) % QUOTE_KEYS.length)
              }
              className={cn(
                "hidden h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-canvas/20 text-canvas/70 transition-colors duration-hover ease-luxury hover:border-canvas/50 hover:text-canvas sm:flex",
                focusRingDark,
              )}
            >
              <ChevronIcon direction="prev" />
            </button>

            <div className="min-h-[220px] flex-1 text-center sm:min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={key}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                >
                  <p className="font-display text-2xl font-normal italic leading-snug text-canvas sm:text-3xl md:text-4xl">
                    “{t(`quotes.${key}.text`)}”
                  </p>
                  <footer className="mt-10">
                    <cite className="not-italic font-sans text-label font-semibold uppercase tracking-label text-canvas/70">
                      {t(`quotes.${key}.name`)}
                      <span className="mx-2 text-canvas/25">·</span>
                      {t(`quotes.${key}.role`)}
                    </cite>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label={t("next")}
              onClick={() => setIndex((i) => (i + 1) % QUOTE_KEYS.length)}
              className={cn(
                "hidden h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-canvas/20 text-canvas/70 transition-colors duration-hover ease-luxury hover:border-canvas/50 hover:text-canvas sm:flex",
                focusRingDark,
              )}
            >
              <ChevronIcon direction="next" />
            </button>
          </div>

          <div className="mt-10 flex justify-center gap-2 sm:hidden">
            <button
              type="button"
              aria-label={t("prev")}
              onClick={() =>
                setIndex((i) => (i - 1 + QUOTE_KEYS.length) % QUOTE_KEYS.length)
              }
              className={cn(
                "flex h-11 w-11 cursor-pointer items-center justify-center border border-canvas/20 text-canvas/70",
                focusRingDark,
              )}
            >
              <ChevronIcon direction="prev" />
            </button>
            <button
              type="button"
              aria-label={t("next")}
              onClick={() => setIndex((i) => (i + 1) % QUOTE_KEYS.length)}
              className={cn(
                "flex h-11 w-11 cursor-pointer items-center justify-center border border-canvas/20 text-canvas/70",
                focusRingDark,
              )}
            >
              <ChevronIcon direction="next" />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {QUOTE_KEYS.map((k, i) => (
              <button
                key={k}
                type="button"
                aria-label={t("dot", { n: i + 1 })}
                onClick={() => setIndex(i)}
                className={cn(
                  "flex h-11 w-11 cursor-pointer items-center justify-center",
                  focusRingDark,
                )}
              >
                <span
                  className={cn(
                    "h-1 w-6 transition-colors duration-hover ease-luxury",
                    i === index ? "bg-canvas" : "bg-canvas/40 hover:bg-canvas/65",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-canvas/10 pt-14">
          <p className="text-center font-sans text-label font-semibold uppercase tracking-label text-canvas/70">
            {t("partners")}
          </p>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
            {PARTNER_KEYS.map((k) => (
              <li key={k}>
                <span
                  className="inline-block font-display text-xl font-semibold tracking-wide text-canvas/65 transition-all duration-hover ease-luxury hover:text-canvas sm:text-2xl"
                  style={{ letterSpacing: "0.08em" }}
                >
                  {t(`logos.${k}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function TrustSection() {
  return <TestimonialsBlock />;
}
