"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui";
import { BackIcon } from "@/components/ui/BackIcon";
import { DirectionalIcon } from "@/components/ui/DirectionalIcon";
import { SiteHeader } from "@/components/home/SiteHeader";
import { siteNavLinks } from "@/components/home/nav-links";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { VehicleCard } from "@/components/collection/VehicleCard";
import { MOCK_VEHICLES, featuredVehicles } from "@/data/vehicles";
import { Link, useRouter } from "@/i18n/navigation";
import { focusRingDark } from "@/lib/a11y";
import { cn } from "@/lib/cn";

export function FeaturedPageView() {
  const tNav = useTranslations("nav");
  const t = useTranslations("collection");
  const tInv = useTranslations("inventory");
  const tMeta = useTranslations("meta");
  const router = useRouter();
  const vehicles = featuredVehicles(MOCK_VEHICLES);

  const headerActions = (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label={tInv("back")}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas shadow-[0_4px_18px_rgba(0,0,0,0.22)] transition-all duration-hover ease-luxury hover:bg-deep",
        focusRingDark,
      )}
    >
      <BackIcon />
    </button>
  );

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader links={siteNavLinks(tNav)} headerActions={headerActions} />

      <div className="relative border-b border-line bg-deep pt-20 pb-8 text-canvas sm:pt-24 sm:pb-12">
        <Link
          href="/"
          className={cn(
            "absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center lg:hidden",
            focusRingDark,
          )}
          aria-label={tMeta("brand")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/header-engine.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain brightness-0 invert"
          />
        </Link>
        <Container>
          <h1 className="max-w-3xl font-display text-2xl font-semibold text-canvas sm:text-3xl md:text-4xl">
            {t("ctaFeatured")}
          </h1>
        </Container>
      </div>

      <Container className="pb-24 pt-12 sm:pt-16">
        <Reveal className="mb-10 flex justify-end">
          <Link
            href="/collection"
            className={cn(
              "luxa-sweep-btn inline-flex min-h-12 shrink-0 items-center justify-center px-[2.4em] py-[0.7em]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
            )}
          >
            <span className="luxa-sweep-btn__frame" aria-hidden />
            <span className="relative z-10 inline-flex items-center justify-center gap-3 font-sans text-[15px] font-semibold uppercase tracking-label">
              {t("viewAll")}
              <DirectionalIcon />
            </span>
          </Link>
        </Reveal>

        <RevealStagger className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {vehicles.map((vehicle, i) => (
            <RevealItem key={vehicle.id}>
              <VehicleCard vehicle={vehicle} index={i} />
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </div>
  );
}
