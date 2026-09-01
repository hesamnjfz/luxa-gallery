"use client";

import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui";
import { VehicleCard } from "@/components/collection/VehicleCard";
import { MOCK_VEHICLES, weeklyPicks } from "@/data/vehicles";

export function WeeklyPicks() {
  const t = useTranslations("collection");
  const picks = weeklyPicks(MOCK_VEHICLES, 3);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/weekly-picks.png"
          alt=""
          width={40}
          height={40}
          aria-hidden
          className="mb-4 h-10 w-10 object-contain"
        />
        <SectionLabel className="justify-center">{t("weeklyLabel")}</SectionLabel>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:mx-auto md:max-w-3xl md:grid-cols-3 md:gap-3">
        {picks.map((vehicle, i) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} compact />
        ))}
      </div>
    </div>
  );
}
