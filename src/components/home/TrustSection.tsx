"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Container, SectionLabel } from "@/components/ui";
import { ChevronIcon } from "@/components/ui/DirectionalIcon";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { focusRingDark } from "@/lib/a11y";

const STEP_KEYS = ["browse", "viewing", "financing", "delivery"] as const;
const SERVICE_KEYS = ["delivery", "tradein", "financing"] as const;
const QUOTE_KEYS = ["0", "1", "2", "3"] as const;
const PARTNER_KEYS = ["0", "1", "2", "3", "4"] as const;

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop",
] as const;

function ProcessTimeline() {
  const t = useTranslations("trust.process");

  return (
    <section id="process" className="border-t border-line bg-canvas py-section lg:py-section-lg">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionLabel>{t("eyebrow")}</SectionLabel>
            <h2 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-md text-base font-medium leading-relaxed text-muted lg:ms-auto lg:text-end">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 border-t border-line sm:mt-20">
          {STEP_KEYS.map((key, i) => (
            <li
              key={key}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-b border-line py-7 sm:gap-x-8 sm:py-9 lg:grid-cols-[6.5rem_minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-x-10 lg:py-10"
            >
              <span className="font-display text-2xl font-medium tabular-nums tracking-tight text-soft transition-colors duration-hover ease-luxury group-hover:text-ink sm:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="col-start-2 max-w-md text-sm font-medium leading-relaxed text-muted lg:col-start-3 lg:max-w-none lg:justify-self-end lg:text-end">
                {t(`steps.${key}.desc`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function ConciergeServices() {
  const t = useTranslations("trust.concierge");

  return (
    <section id="concierge" className="border-t border-line bg-canvas py-section lg:py-section-lg">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel>{t("eyebrow")}</SectionLabel>
          <h2 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-base font-medium text-muted">{t("subtitle")}</p>
        </Reveal>

        <RevealStagger className="mt-16 grid gap-6 md:grid-cols-3">
          {SERVICE_KEYS.map((key, i) => (
            <RevealItem key={key}>
              <article className="group relative aspect-[3/4] min-h-[320px] overflow-hidden transition-[transform,box-shadow] duration-hover ease-luxury hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] sm:aspect-auto sm:min-h-[360px]">
                <Image
                  src={SERVICE_IMAGES[i]}
                  alt={t(`items.${key}.title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-reveal ease-luxury group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-deep/35" />
                <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-8 sm:min-h-[360px]">
                  <p className="font-sans text-label font-semibold uppercase tracking-label text-canvas/60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-canvas">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-canvas/75">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}

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
  return (
    <>
      <ProcessTimeline />
      <ConciergeServices />
      <TestimonialsBlock />
    </>
  );
}
