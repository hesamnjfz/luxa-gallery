"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { PriceRangeSlider } from "./PriceRangeSlider";
import {
  VEHICLE_BODY_TYPES,
  VEHICLE_BRANDS,
  VEHICLE_YEARS,
  formatPriceToman,
  type VehicleFilters,
  type VehicleSort,
} from "@/data/vehicles";
import { cn } from "@/lib/cn";

type CollectionFiltersProps = {
  filters: VehicleFilters;
  sort: VehicleSort;
  resultCount: number;
  locale: string;
  onFiltersChange: (next: VehicleFilters) => void;
  onSortChange: (sort: VehicleSort) => void;
  onReset: () => void;
  /** When true, omit sticky chrome (used inside mobile sheet). */
  embedded?: boolean;
  className?: string;
};

function SelectField({
  label,
  value,
  onChange,
  active,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={cn("luxa-filter-field", active && "is-active")}
    >
      <span className="luxa-filter-field__label">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="luxa-filter-field__control"
        aria-label={label}
      >
        {children}
      </select>
    </label>
  );
}

export function CollectionFilters({
  filters,
  sort,
  resultCount,
  locale,
  onFiltersChange,
  onSortChange,
  onReset,
  embedded = false,
  className,
}: CollectionFiltersProps) {
  const t = useTranslations("inventory");

  return (
    <div
      className={cn(
        !embedded &&
          "border-b border-line bg-canvas/95 backdrop-blur-md lg:sticky lg:top-16 lg:z-30",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          !embedded && "px-0 py-6 lg:py-5",
        )}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="font-sans text-sm font-semibold text-muted">
            {t("results", { count: resultCount })}
          </p>
          <button
            type="button"
            onClick={onReset}
            className="min-h-11 cursor-pointer px-2 font-sans text-label font-bold uppercase tracking-label text-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            {t("reset")}
          </button>
        </div>

        <div className="luxa-filter-rail">
          <SelectField
            label={t("filters.brand")}
            value={filters.brand}
            active={filters.brand !== "all"}
            onChange={(brand) =>
              onFiltersChange({
                ...filters,
                brand: brand as VehicleFilters["brand"],
              })
            }
          >
            <option value="all">{t("filters.all")}</option>
            {VEHICLE_BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </SelectField>

          <SelectField
            label={t("filters.bodyType")}
            value={filters.bodyType}
            active={filters.bodyType !== "all"}
            onChange={(bodyType) =>
              onFiltersChange({
                ...filters,
                bodyType: bodyType as VehicleFilters["bodyType"],
              })
            }
          >
            <option value="all">{t("filters.all")}</option>
            {VEHICLE_BODY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>

          <SelectField
            label={t("filters.year")}
            value={String(filters.year)}
            active={filters.year !== "all"}
            onChange={(year) =>
              onFiltersChange({
                ...filters,
                year: year === "all" ? "all" : Number(year),
              })
            }
          >
            <option value="all">{t("filters.all")}</option>
            {VEHICLE_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </SelectField>

          <SelectField
            label={t("sort.label")}
            value={sort}
            active={sort !== "popular"}
            onChange={(value) => onSortChange(value as VehicleSort)}
          >
            <option value="price-desc">{t("sort.priceDesc")}</option>
            <option value="price-asc">{t("sort.priceAsc")}</option>
            <option value="newest">{t("sort.newest")}</option>
            <option value="popular">{t("sort.popular")}</option>
          </SelectField>

          <div className="luxa-filter-price">
            <p className="mb-2 text-center font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-soft">
              {t("filters.price")}
            </p>
            <PriceRangeSlider
              min={filters.priceMin}
              max={filters.priceMax}
              onChange={(priceMin, priceMax) =>
                onFiltersChange({ ...filters, priceMin, priceMax })
              }
              formatValue={(v) => formatPriceToman(v, locale)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type MobileFilterTriggerProps = {
  onOpen: () => void;
  resultCount: number;
};

export function MobileFilterTrigger({
  onOpen,
  resultCount,
}: MobileFilterTriggerProps) {
  const t = useTranslations("inventory");

  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-4 lg:hidden">
      <p className="font-sans text-sm font-semibold text-muted">
        {t("results", { count: resultCount })}
      </p>
      <Button type="button" variant="primary" size="sm" onClick={onOpen}>
        {t("filters.open")}
      </Button>
    </div>
  );
}
