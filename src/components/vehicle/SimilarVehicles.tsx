"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui";
import { ChevronIcon } from "@/components/ui/DirectionalIcon";
import { VehicleCard } from "@/components/collection/VehicleCard";
import { focusRing } from "@/lib/a11y";
import { cn } from "@/lib/cn";
import type { Vehicle } from "@/data/vehicles";

type SimilarVehiclesProps = {
  vehicles: Vehicle[];
};

export function SimilarVehicles({ vehicles }: SimilarVehiclesProps) {
  const t = useTranslations("vehicleDetail");
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!vehicles.length) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 420);
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * amount * (rtl ? -1 : 1), behavior: "smooth" });
  };

  return (
    <section className="border-t border-line py-section">
      <div className="flex items-end justify-between gap-6">
        <div>
          <SectionLabel>{t("similar.eyebrow")}</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {t("similar.title")}
          </h2>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={t("similar.prev")}
            className={cn(
              "flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-ink transition-colors duration-hover ease-luxury hover:border-ink",
              focusRing,
            )}
          >
            <ChevronIcon direction="prev" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={t("similar.next")}
            className={cn(
              "flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-ink transition-colors duration-hover ease-luxury hover:border-ink",
              focusRing,
            )}
          >
            <ChevronIcon direction="next" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-12 flex gap-6 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:thin]"
      >
        {vehicles.map((vehicle, i) => (
          <div
            key={vehicle.id}
            className="w-[min(100%,320px)] shrink-0 sm:w-[340px]"
          >
            <VehicleCard vehicle={vehicle} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
