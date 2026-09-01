"use client";

import { useTranslations } from "next-intl";
import { Loader } from "./Loader";

export function LoadingView() {
  const t = useTranslations("inventory");

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-canvas">
      <Loader label={t("loading")} />
    </div>
  );
}
