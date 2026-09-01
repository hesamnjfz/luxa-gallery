import { setRequestLocale, getTranslations } from "next-intl/server";
import { ConciergePageView } from "@/components/home/ConciergePageView";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "conciergePage" });
  return {
    title: `${t("heroTitle")} | Luxa`,
    description: t("heroSubtitle"),
  };
}

export default async function ConciergePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ConciergePageView />;
}
