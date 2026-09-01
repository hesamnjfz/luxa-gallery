"use client";

import { useCallback, useId } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { PRICE_BOUNDS } from "@/data/vehicles";

type PriceRangeSliderProps = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
  formatValue: (value: number) => string;
  className?: string;
};

export function PriceRangeSlider({
  min,
  max,
  onChange,
  formatValue,
  className,
}: PriceRangeSliderProps) {
  const id = useId();
  const t = useTranslations("inventory.filters");
  const span = PRICE_BOUNDS.max - PRICE_BOUNDS.min;
  const startPct = ((min - PRICE_BOUNDS.min) / span) * 100;
  const endPct = ((max - PRICE_BOUNDS.min) / span) * 100;

  const clampPair = useCallback(
    (nextMin: number, nextMax: number) => {
      const lo = Math.min(nextMin, nextMax - 1000);
      const hi = Math.max(nextMax, nextMin + 1000);
      onChange(
        Math.max(PRICE_BOUNDS.min, Math.min(lo, PRICE_BOUNDS.max)),
        Math.min(PRICE_BOUNDS.max, Math.max(hi, PRICE_BOUNDS.min)),
      );
    },
    [onChange],
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4 flex items-center justify-between gap-4 font-sans text-xs font-semibold text-muted">
        <span>{formatValue(min)}</span>
        <span className="text-soft">—</span>
        <span>{formatValue(max)}</span>
      </div>

      <div className="relative h-11">
        <div className="absolute start-0 end-0 top-1/2 h-px -translate-y-1/2 bg-line" />
        <div
          className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-ink"
          style={{
            insetInlineStart: `${startPct}%`,
            width: `${Math.max(0, endPct - startPct)}%`,
          }}
        />

        <label className="sr-only" htmlFor={`${id}-min`}>
          {t("minPrice")}
        </label>
        <input
          id={`${id}-min`}
          type="range"
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={1000}
          value={min}
          onChange={(e) => clampPair(Number(e.target.value), max)}
          className="price-range-thumb absolute inset-0 z-20 w-full appearance-none bg-transparent"
        />

        <label className="sr-only" htmlFor={`${id}-max`}>
          {t("maxPrice")}
        </label>
        <input
          id={`${id}-max`}
          type="range"
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={1000}
          value={max}
          onChange={(e) => clampPair(min, Number(e.target.value))}
          className="price-range-thumb absolute inset-0 z-30 w-full appearance-none bg-transparent"
        />
      </div>
    </div>
  );
}
