import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { CollectionView } from "@/components/collection/CollectionView";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "inventory" });
  return {
    title: `${t("title")} | Luxa`,
    description: t("subtitle"),
  };
}

export default async function CollectionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CollectionView />;
}
