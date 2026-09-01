"use client";

import { useTranslations } from "next-intl";
import { Container, SectionLabel } from "@/components/ui";
import { BackIcon } from "@/components/ui/BackIcon";
import { HomeIcon } from "@/components/ui/HomeIcon";
import { SiteHeader } from "@/components/home/SiteHeader";
import { siteNavLinks } from "@/components/home/nav-links";
import { Link } from "@/i18n/navigation";
import { focusRingDark } from "@/lib/a11y";
import { cn } from "@/lib/cn";
import { VehicleGallery } from "./VehicleGallery";
import { InquiryCard } from "./InquiryCard";
import { PriceBlock, SpecsGrid } from "./SpecsGrid";
import { FinancingCalculator } from "./FinancingCalculator";
import { SimilarVehicles } from "./SimilarVehicles";
import type { Vehicle } from "@/data/vehicles";

type VehicleDetailViewProps = {
  vehicle: Vehicle;
  similar: Vehicle[];
};

export function VehicleDetailView({
  vehicle,
  similar,
}: VehicleDetailViewProps) {
  const t = useTranslations("vehicleDetail");
  const tNav = useTranslations("nav");
  const tInv = useTranslations("inventory");
  const tMeta = useTranslations("meta");

  const navLinks = siteNavLinks(tNav);

  const headerIconBtn = cn(
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas shadow-[0_4px_18px_rgba(0,0,0,0.22)] transition-all duration-hover ease-luxury hover:bg-deep",
    focusRingDark,
  );

  const headerActions = (
    <>
      <Link
        href="/collection"
        aria-label={tInv("backToCollection")}
        className={headerIconBtn}
      >
        <BackIcon />
      </Link>
      <Link href="/" aria-label={tMeta("home")} className={headerIconBtn}>
        <HomeIcon />
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader links={navLinks} headerActions={headerActions} />

      <div className="pt-24 pb-8 sm:pt-28">
        <Container>
          <div className="mt-2 sm:mt-0">
            <VehicleGallery
              key={vehicle.slug}
              images={vehicle.gallery}
              alt={`${vehicle.make} ${vehicle.model}`}
            />
          </div>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.7fr)] lg:gap-16">
            <div>
              <SectionLabel>{vehicle.year}</SectionLabel>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl md:text-6xl">
                {vehicle.make}
                <span className="mt-1 block text-muted">{vehicle.model}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-muted sm:text-lg">
                {vehicle.tagline}
              </p>

              <PriceBlock price={vehicle.price} />
              <SpecsGrid vehicle={vehicle} />
            </div>

            <InquiryCard vehicle={vehicle} />
          </div>

          <section className="mt-section border-t border-line pt-section">
            <SectionLabel>{t("description.eyebrow")}</SectionLabel>
            <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold text-ink sm:text-4xl">
              {t("description.title")}
            </h2>
            <div className="mt-10 max-w-3xl space-y-6 text-base font-medium leading-[1.85] text-muted sm:text-lg">
              {vehicle.description.split(/\n+/).map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </section>

          <FinancingCalculator price={vehicle.price} />
          <SimilarVehicles vehicles={similar} />
        </Container>
      </div>
    </div>
  );
}
