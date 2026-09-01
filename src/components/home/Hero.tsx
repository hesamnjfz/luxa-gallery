"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Button, Container } from "@/components/ui";
import { DirectionalIcon } from "@/components/ui/DirectionalIcon";
import { SweepMorphCta } from "@/components/home/SweepMorphCta";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { easeOut } from "@/lib/motion";
import { focusRing, focusRingDark } from "@/lib/a11y";
import { cn } from "@/lib/cn";
import { type Locale } from "@/i18n/config";
import { HERO_SLIDES } from "./hero-media";

export type HeroCopy = {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  primary: string;
  secondary: string;
  scroll: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

type HeroProps = {
  copy: HeroCopy;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

function scrollToFeatured(smooth: boolean) {
  const el = document.getElementById("featured");
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
}

function ScrollArrow({
  label,
  className,
  reduceMotion,
  tone = "light",
}: {
  label: string;
  className?: string;
  reduceMotion: boolean | null;
  /** `light` = arrow on dark surfaces; `dark` = arrow on light surfaces */
  tone?: "light" | "dark";
}) {
  return (
    <motion.a
      href="#featured"
      onClick={(e) => {
        e.preventDefault();
        scrollToFeatured(!reduceMotion);
      }}
      className={cn(
        "group flex h-12 w-12 items-center justify-center transition-opacity duration-hover ease-luxury",
        tone === "light" ? focusRingDark : focusRing,
        className,
      )}
      aria-label={label}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.6 }}
    >
      <motion.span
        aria-hidden
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/scroll-arrow.png"
          alt=""
          width={22}
          height={22}
          className={cn(
            "h-[22px] w-[22px] object-contain transition-opacity duration-hover ease-luxury",
            tone === "light" && "brightness-0 invert opacity-75 group-hover:opacity-100",
            tone === "dark" && "opacity-45 group-hover:opacity-100",
          )}
        />
      </motion.span>
    </motion.a>
  );
}

export function Hero({
  copy,
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  const locale = useLocale() as Locale;
  const isRtl = locale === "fa";
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", "18%"],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduceMotion ? [1, 1] : [1, 0],
  );

  /* Page must open at the top — no restored scroll / hash jump */
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      const { pathname, search } = window.location;
      history.replaceState(null, "", `${pathname}${search}`);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setSlide((i) => (i + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const fadeUp = (delay: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: easeOut },
        };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-[#ECECEA] text-ink sm:bg-black sm:text-canvas"
      >
        {/* Desktop cinematic media */}
        <motion.div
          className="absolute inset-0 z-0 hidden sm:block"
          style={{ y: mediaY }}
          aria-hidden
        >
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={HERO_SLIDES[slide].src}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={HERO_SLIDES[slide].src}
                  alt=""
                  fill
                  priority={slide === 0}
                  sizes="100vw"
                  quality={90}
                  className="object-cover"
                  style={{ objectPosition: HERO_SLIDES[slide].position }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent rtl:bg-gradient-to-l rtl:from-black/70 rtl:via-black/25 rtl:to-transparent"
            aria-hidden
          />
        </motion.div>

        {/* ——— Mobile: truly centered brand + CTA; arrow pinned bottom ——— */}
        <div className="relative z-10 flex flex-1 flex-col sm:hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div className="flex w-full flex-col items-center">
              <motion.h1
                {...fadeUp(0.15)}
                className="text-center font-display text-5xl font-semibold tracking-[0.28em] text-ink -mr-[0.28em]"
              >
                LUXA
              </motion.h1>
              <motion.p
                {...fadeUp(0.28)}
                className="mt-3 text-center font-sans text-base font-bold tracking-[0.42em] text-[#8A8A88] -mr-[0.42em]"
              >
                GALLERY
              </motion.p>
            </div>

            <div className="mt-12 flex w-full justify-center">
              <SweepMorphCta
                label={copy.primary}
                onClick={onPrimaryClick}
                isRtl={isRtl}
              />
            </div>
          </div>

          <ScrollArrow
            label={copy.scroll}
            reduceMotion={reduceMotion}
            tone="dark"
            className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          />
        </div>

        {/* ——— Desktop content ——— */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 hidden flex-1 flex-col justify-end pb-32 pt-32 sm:flex"
        >
          <Container>
            <div className="max-w-xl lg:max-w-2xl">
              <motion.p
                {...fadeUp(0.1)}
                className="font-sans text-label font-semibold uppercase tracking-label text-canvas/80"
              >
                {copy.badge}
              </motion.p>

              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-canvas md:text-6xl lg:text-7xl">
                <motion.span className="block" {...fadeUp(0.22)}>
                  {copy.title}
                </motion.span>
                <motion.span
                  className="mt-1 block font-medium text-canvas/75"
                  {...fadeUp(0.36)}
                >
                  {copy.titleAccent}
                </motion.span>
              </h1>

              <motion.p
                {...fadeUp(0.5)}
                className="mt-8 max-w-lg text-base font-medium leading-relaxed text-canvas/85 sm:text-lg"
              >
                {copy.subtitle}
              </motion.p>

              <motion.div
                {...fadeUp(0.62)}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Button
                  tone="dark"
                  variant="primary"
                  onClick={onPrimaryClick}
                >
                  {copy.primary}
                  <DirectionalIcon />
                </Button>
                <Button
                  tone="dark"
                  variant="secondary"
                  onClick={onSecondaryClick}
                >
                  {copy.secondary}
                </Button>
              </motion.div>
            </div>
          </Container>
        </motion.div>

        <ScrollArrow
          label={copy.scroll}
          reduceMotion={reduceMotion}
          className="absolute bottom-8 start-1/2 z-10 hidden -translate-x-1/2 sm:flex"
        />
      </section>
    </>
  );
}

export function HeroStats({ stats }: { stats: HeroStat[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero-stats"
      className="border-t border-line bg-canvas py-10 sm:py-12"
    >
      <Container>
        <motion.div
          className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-2 px-6 py-6 text-center sm:py-2"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : 0.12 * i,
                ease: easeOut,
              }}
            >
              <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="font-sans text-label font-semibold uppercase tracking-label text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
