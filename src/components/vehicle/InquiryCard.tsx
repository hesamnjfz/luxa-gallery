"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { useInquiry } from "@/components/forms/InquiryProvider";
import type { Vehicle } from "@/data/vehicles";

type InquiryCardProps = {
  vehicle: Vehicle;
};

const BADGES = ["certified", "delivery", "history"] as const;

export function InquiryCard({ vehicle }: InquiryCardProps) {
  const t = useTranslations("vehicleDetail");
  const { openInquiry } = useInquiry();
  const vehicleLabel = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <aside className="border border-line bg-surface p-7 sm:p-8 lg:sticky lg:top-24">
      <p className="font-sans text-label font-semibold uppercase tracking-label text-soft">
        {t("inquiry.label")}
      </p>
      <p className="mt-3 font-display text-xl font-semibold text-ink">
        {vehicle.make} {vehicle.model}
      </p>
      <p className="mt-2 text-sm font-medium text-muted">{t("inquiry.lead")}</p>

      <div className="mt-8 flex flex-col gap-3">
        <Button
          type="button"
          variant="primary"
          className="w-full [--luxa-sweep-bg:#ffffff]"
          onClick={() => openInquiry({ vehicleLabel })}
        >
          {t("inquiry.request")}
        </Button>
        <a
          href="tel:+989928781780"
          className="inline-flex min-h-11 w-full items-center justify-center gap-3 border border-ink/25 bg-transparent px-8 py-4 text-center font-sans text-label font-semibold uppercase tracking-label text-muted transition-all duration-hover ease-luxury hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2"
        >
          {t("inquiry.call")}
        </a>
        <p className="text-center font-sans text-xs font-medium text-soft">
          {t("inquiry.phone")}
        </p>
      </div>

      <ul className="mt-10 space-y-0 border-t border-line">
        {BADGES.map((key) => (
          <li
            key={key}
            className="flex items-center justify-center gap-3 border-b border-line py-4 font-sans text-base font-semibold text-ink sm:justify-start sm:text-[15px]"
          >
            <span
              aria-hidden
              className="flex h-6 w-6 shrink-0 items-center justify-center border border-ink/25 text-xs font-bold text-ink"
            >
              ✓
            </span>
            {t(`badges.${key}`)}
          </li>
        ))}
      </ul>
    </aside>
  );
}
