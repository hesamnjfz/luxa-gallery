import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactPageView } from "@/components/forms/ContactPageView";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "forms.contactPage" });
  return {
    title: `${t("title")} | Luxa`,
    description: t("subtitle"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPageView />;
}
