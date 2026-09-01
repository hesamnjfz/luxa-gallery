"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import {
  formatMileage,
  formatPrice,
  formatPriceToman,
  type Vehicle,
} from "@/data/vehicles";
import { easeOut, revealDuration } from "@/lib/motion";
import { focusRing } from "@/lib/a11y";
import { cn } from "@/lib/cn";
import { DirectionalIcon } from "@/components/ui/DirectionalIcon";

const MOBILE_SWEEP_MS = 1000;

type VehicleCardProps = {
  vehicle: Vehicle;
  index?: number;
  compact?: boolean;
};

export function VehicleCard({
  vehicle,
  index = 0,
  compact = false,
}: VehicleCardProps) {
  const t = useTranslations("inventory");
  const locale = useLocale();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isFa = locale === "fa";
  const [sweeping, setSweeping] = useState(false);
  const sweepTimer = useRef<number | null>(null);
  const href = `/collection/${vehicle.slug}`;

  useEffect(() => {
    return () => {
      if (sweepTimer.current !== null) window.clearTimeout(sweepTimer.current);
    };
  }, []);

  const onDetailsClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    e.preventDefault();
    if (sweeping) return;
    setSweeping(true);
    sweepTimer.current = window.setTimeout(() => {
      router.push(href);
    }, MOBILE_SWEEP_MS);
  };

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        duration: reduceMotion ? 0 : revealDuration,
        delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.36),
        ease: easeOut,
      }}
      className="group flex flex-col overflow-hidden rounded-[10px] bg-surface"
    >
      {/* Image only — no copy overlaid */}
      <Link
        href={`/collection/${vehicle.slug}`}
        data-cursor="view"
        className={cn(
          "relative overflow-hidden bg-mist",
          compact ? "aspect-[16/9]" : "aspect-[16/10]",
          focusRing,
        )}
      >
        <Image
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          sizes={
            compact
              ? "(max-width: 768px) 100vw, 280px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          quality={90}
          className="object-cover transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.04]"
        />
        {vehicle.featured && (
          <span
            className={cn(
              "absolute z-10 bg-ink font-sans font-semibold uppercase tracking-[0.16em] text-canvas",
              compact
                ? "start-3 top-3 px-2.5 py-1 text-[9px]"
                : "start-4 top-4 px-3 py-1.5 text-[10px]",
            )}
          >
            {t("featured")}
          </span>
        )}
      </Link>

      {/* Specs below the image */}
      <div
        className={cn(
          "flex flex-1 flex-col border border-t-0 border-line",
          compact
            ? "px-4 py-4"
            : "px-5 py-5 sm:px-6 sm:py-6",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p
              className={cn(
                "font-sans text-[11px] font-bold text-soft",
                !isFa && "uppercase tracking-[0.18em]",
              )}
            >
              {vehicle.make}
            </p>
            <h3
              className={cn(
                "mt-1.5 font-display font-bold leading-snug text-ink",
                compact ? "text-lg" : "text-xl sm:text-2xl",
              )}
            >
              {vehicle.model}
            </h3>
          </div>
          <div className="shrink-0 pt-1 text-end">
            <p
              className={cn(
                "font-sans font-bold tracking-tight text-ink",
                compact ? "text-xs" : "text-sm sm:text-base",
              )}
            >
              {formatPriceToman(vehicle.price, locale)}
            </p>
            <p
              className={cn(
                "mt-1 font-display font-semibold text-soft",
                compact ? "text-xs" : "text-sm sm:text-[15px]",
              )}
            >
              {formatPrice(vehicle.price, locale)}
            </p>
          </div>
        </div>

        <p
          className={cn(
            "mt-3 font-sans font-semibold text-muted",
            compact ? "text-[11px]" : "text-[12px]",
          )}
        >
          {vehicle.year}
          <span className="mx-2 text-line">|</span>
          {formatMileage(vehicle.mileage, locale)}
          <span className="mx-2 text-line">|</span>
          {vehicle.transmission}
        </p>

        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-3 border-t border-line",
            compact ? "mt-4 pt-3" : "mt-5 pt-4",
          )}
        >
          <p className="truncate font-sans text-[11px] font-semibold text-soft">
            {vehicle.horsepower} hp · {vehicle.bodyType}
          </p>
          <Link
            href={href}
            onClick={onDetailsClick}
            className={cn(
              "luxa-sweep-btn luxa-sweep-btn--card inline-flex shrink-0 items-center justify-center",
              compact ? "min-h-9 px-4 py-2" : "min-h-10 px-5 py-2.5",
              focusRing,
              sweeping && "is-active",
            )}
          >
            <span className="luxa-sweep-btn__frame" aria-hidden />
            <span className="relative z-10 inline-flex items-center justify-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-label">
              {t("viewDetails")}
              <DirectionalIcon className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
