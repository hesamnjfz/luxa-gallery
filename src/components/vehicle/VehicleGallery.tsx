"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronIcon } from "@/components/ui/DirectionalIcon";
import { cn } from "@/lib/cn";
import { focusRing, focusRingDark } from "@/lib/a11y";

type VehicleGalleryProps = {
  images: string[];
  alt: string;
};

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const t = useTranslations("vehicleDetail");
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Dedupe + keep only this vehicle's set
  const shots = Array.from(new Set(images.filter(Boolean)));

  const go = useCallback(
    (index: number) => {
      const len = shots.length;
      if (!len) return;
      setActive(((index % len) + len) % len);
    },
    [shots.length],
  );

  const activeIndex = shots.length ? Math.min(active, shots.length - 1) : 0;

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      const rtl = document.documentElement.dir === "rtl";
      if (e.key === "ArrowRight") go(activeIndex + (rtl ? -1 : 1));
      if (e.key === "ArrowLeft") go(activeIndex + (rtl ? 1 : -1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, go, activeIndex]);

  if (!shots.length) return null;

  return (
    <div className="mx-auto w-full lg:max-w-3xl xl:max-w-4xl">
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className={cn(
          "group relative aspect-[16/10] w-full overflow-hidden rounded-[8px] bg-mist",
          focusRing,
        )}
        data-cursor="view"
        aria-label={t("gallery.openLightbox")}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={shots[activeIndex]}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              src={shots[activeIndex]}
              alt={`${alt} — ${activeIndex + 1}`}
              fill
              priority
              quality={90}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover transition-transform duration-reveal ease-luxury group-hover:scale-[1.02]"
            />
          </motion.div>
        </AnimatePresence>
        <span className="absolute bottom-4 end-4 bg-deep/70 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-label text-canvas backdrop-blur-sm">
          {activeIndex + 1} / {shots.length}
        </span>
      </button>

      {/* Thumbnails — only this vehicle, tidy strip */}
      <div
        className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]"
        role="tablist"
        aria-label={t("gallery.lightbox")}
      >
        {shots.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            onClick={() => setActive(i)}
            aria-label={t("gallery.thumb", { n: i + 1 })}
            className={cn(
              "relative h-[72px] w-[104px] shrink-0 overflow-hidden border transition-all duration-hover ease-luxury sm:h-20 sm:w-[120px]",
              focusRing,
              i === activeIndex
                ? "border-ink opacity-100"
                : "border-line opacity-55 hover:opacity-90",
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="120px"
              quality={85}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-deep/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t("gallery.lightbox")}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
              <p className="font-sans text-label font-semibold uppercase tracking-label text-canvas/70">
                {activeIndex + 1} / {shots.length}
              </p>
              <button
                type="button"
                onClick={() => setLightbox(false)}
                aria-label={t("gallery.close")}
                className={cn(
                  "relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-canvas/10 text-canvas ring-1 ring-canvas/25 transition-all duration-hover ease-luxury hover:bg-canvas/18 hover:ring-canvas/40",
                  focusRingDark,
                )}
              >
                <span className="sr-only">{t("gallery.close")}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pb-10">
              <button
                type="button"
                onClick={() => go(activeIndex - 1)}
                className={cn(
                  "absolute start-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center text-canvas/70 transition-colors hover:text-canvas sm:start-4",
                  focusRingDark,
                )}
                aria-label={t("gallery.prev")}
              >
                <ChevronIcon direction="prev" />
              </button>

              <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`lb-${shots[activeIndex]}`}
                    className="absolute inset-0"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Image
                      src={shots[activeIndex]}
                      alt={`${alt} — ${activeIndex + 1}`}
                      fill
                      sizes="90vw"
                      quality={92}
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => go(activeIndex + 1)}
                className={cn(
                  "absolute end-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center text-canvas/70 transition-colors hover:text-canvas sm:end-4",
                  focusRingDark,
                )}
                aria-label={t("gallery.next")}
              >
                <ChevronIcon direction="next" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
