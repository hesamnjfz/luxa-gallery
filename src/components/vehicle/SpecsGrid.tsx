"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  formatMileage,
  formatPrice,
  formatPriceToman,
  type Vehicle,
} from "@/data/vehicles";

type SpecsGridProps = {
  vehicle: Vehicle;
};

export function SpecsGrid({ vehicle }: SpecsGridProps) {
  const t = useTranslations("vehicleDetail");
  const locale = useLocale();

  const rows: { label: string; value: string }[] = [
    { label: t("specs.year"), value: String(vehicle.year) },
    {
      label: t("specs.mileage"),
      value: formatMileage(vehicle.mileage, locale),
    },
    { label: t("specs.engine"), value: vehicle.engine },
    {
      label: t("specs.horsepower"),
      value: `${vehicle.horsepower} hp`,
    },
    { label: t("specs.transmission"), value: vehicle.transmission },
    { label: t("specs.drivetrain"), value: vehicle.drivetrain },
    { label: t("specs.exterior"), value: vehicle.exteriorColor },
    { label: t("specs.interior"), value: vehicle.interiorColor },
    { label: t("specs.vin"), value: vehicle.vin },
  ];

  return (
    <dl className="mt-10 border-t border-line">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 gap-1.5 border-b border-line py-4 text-center sm:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] sm:gap-6 sm:text-start"
        >
          <dt className="font-sans text-xs font-bold uppercase tracking-label text-soft sm:text-sm">
            {row.label}
          </dt>
          <dd className="font-sans text-base font-semibold text-ink sm:text-lg">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

type PriceBlockProps = {
  price: number;
};

export function PriceBlock({ price }: PriceBlockProps) {
  const locale = useLocale();

  return (
    <div className="mt-8 text-center sm:text-start">
      <p className="font-display text-3xl font-bold text-ink sm:text-4xl md:text-5xl">
        {formatPriceToman(price, locale)}
      </p>
      <p className="mt-2 font-sans text-base font-semibold text-muted sm:text-lg">
        {formatPrice(price, locale)}
      </p>
    </div>
  );
}
