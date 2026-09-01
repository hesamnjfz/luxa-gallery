"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  FINANCE_APR,
  estimateMonthlyPayment,
  formatPrice,
  formatPriceToman,
} from "@/data/vehicles";
import { SectionLabel } from "@/components/ui";

type FinancingCalculatorProps = {
  price: number;
};

export function FinancingCalculator({ price }: FinancingCalculatorProps) {
  const t = useTranslations("vehicleDetail");
  const locale = useLocale();

  const maxDown = Math.round(price * 0.6);
  const minDown = Math.round(price * 0.1);
  const [down, setDown] = useState(Math.round(price * 0.2));
  const [term, setTerm] = useState(60);

  const monthly = useMemo(
    () => estimateMonthlyPayment(price, down, term),
    [price, down, term],
  );

  return (
    <section id="financing" className="border-t border-line py-section">
      <SectionLabel>{t("finance.eyebrow")}</SectionLabel>
      <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
        {t("finance.title")}
      </h2>
      <p className="mt-4 max-w-lg text-sm font-medium text-muted sm:text-base">
        {t("finance.subtitle", { apr: (FINANCE_APR * 100).toFixed(1) })}
      </p>

      <div className="mt-12 grid gap-10 border border-line bg-surface p-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:p-12">
        <div className="space-y-10">
          <label className="block">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="font-sans text-label font-semibold uppercase tracking-label text-soft">
                {t("finance.down")}
              </span>
              <span className="text-end font-sans text-sm font-semibold text-ink">
                <span className="block">{formatPrice(down, locale)}</span>
                <span className="mt-0.5 block text-[11px] text-soft">
                  {formatPriceToman(down, locale)}
                </span>
              </span>
            </div>
            <input
              type="range"
              min={minDown}
              max={maxDown}
              step={1000}
              value={down}
              onChange={(e) => setDown(Number(e.target.value))}
              className="finance-range w-full cursor-pointer appearance-none bg-transparent"
            />
          </label>

          <label className="block">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="font-sans text-label font-semibold uppercase tracking-label text-soft">
                {t("finance.term")}
              </span>
              <span className="font-sans text-sm font-semibold text-ink">
                {t("finance.months", { count: term })}
              </span>
            </div>
            <input
              type="range"
              min={24}
              max={84}
              step={12}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="finance-range w-full cursor-pointer appearance-none bg-transparent"
            />
          </label>
        </div>

        <div className="flex flex-col justify-center border-t border-line pt-8 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-12">
          <p className="font-sans text-label font-semibold uppercase tracking-label text-soft">
            {t("finance.monthly")}
          </p>
          <p className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            {formatPrice(Math.round(monthly), locale)}
          </p>
          <p className="mt-2 font-sans text-sm font-semibold text-muted">
            {formatPriceToman(Math.round(monthly), locale)}
          </p>
          <p className="mt-4 text-xs font-medium leading-relaxed text-muted">
            {t("finance.disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}
