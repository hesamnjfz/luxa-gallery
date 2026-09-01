"use client";

import { useTranslations } from "next-intl";
import { Loader } from "@/components/ui/Loader";

export function VehicleGridSkeleton() {
  const t = useTranslations("inventory");

  return <Loader block label={t("loading")} />;
}
