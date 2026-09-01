"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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

type VehicleCardProps = {
  vehicle: Vehicle;
  index?: number;
};

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const t = useTranslations("inventory");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const isFa = locale === "fa";

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
      className="group flex flex-col overflow-hidden rounded-[5px] bg-surface"
    >
      {/* Image only — no copy overlaid */}
      <Link
        href={`/collection/${vehicle.slug}`}
        data-cursor="view"
        className={cn(
          "relative aspect-[16/10] overflow-hidden bg-mist",
          focusRing,
        )}
      >
        <Image
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={90}
          className="object-cover transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.04]"
        />
        {vehicle.featured && (
          <span className="absolute start-4 top-4 z-10 bg-ink px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-canvas">
            {t("featured")}
          </span>
        )}
      </Link>

      {/* Specs below the image */}
      <div className="flex flex-1 flex-col border border-t-0 border-line px-5 py-5 sm:px-6 sm:py-6">
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
            <h3 className="mt-1.5 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
              {vehicle.model}
            </h3>
          </div>
          <div className="shrink-0 pt-1 text-end">
            <p className="font-sans text-sm font-bold tracking-tight text-ink sm:text-base">
              {formatPriceToman(vehicle.price, locale)}
            </p>
            <p className="mt-1 font-display text-sm font-semibold text-soft sm:text-[15px]">
              {formatPrice(vehicle.price, locale)}
            </p>
          </div>
        </div>

        <p className="mt-3 font-sans text-[12px] font-semibold text-muted">
          {vehicle.year}
          <span className="mx-2 text-line">|</span>
          {formatMileage(vehicle.mileage, locale)}
          <span className="mx-2 text-line">|</span>
          {vehicle.transmission}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 mt-5">
          <p className="truncate font-sans text-[11px] font-semibold text-soft">
            {vehicle.horsepower} hp · {vehicle.bodyType}
          </p>
          <Link
            href={`/collection/${vehicle.slug}`}
            className={cn(
              "luxa-sweep-btn inline-flex min-h-10 shrink-0 items-center justify-center px-5 py-2.5",
              focusRing,
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
