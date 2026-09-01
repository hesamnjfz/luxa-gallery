import { setRequestLocale, getTranslations } from "next-intl/server";
import { FeaturedPageView } from "@/components/home/FeaturedPageView";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collection" });
  return {
    title: `${t("ctaFeatured")} | Luxa`,
    description: t("subtitle"),
  };
}

export default async function FeaturedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FeaturedPageView />;
}
