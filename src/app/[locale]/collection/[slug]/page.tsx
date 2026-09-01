import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  MOCK_VEHICLES,
  getSimilarVehicles,
  getVehicleBySlug,
} from "@/data/vehicles";
import { VehicleDetailView } from "@/components/vehicle/VehicleDetailView";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return MOCK_VEHICLES.flatMap((v) =>
    routing.locales.map((locale) => ({ locale, slug: v.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle | Luxa" };
  const t = await getTranslations({ locale, namespace: "vehicleDetail" });
  return {
    title: `${vehicle.make} ${vehicle.model} | Luxa`,
    description: vehicle.tagline || t("metaFallback"),
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const similar = getSimilarVehicles(vehicle, 6);

  return <VehicleDetailView vehicle={vehicle} similar={similar} />;
}
