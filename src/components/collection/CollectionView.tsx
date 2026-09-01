"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Button, Container } from "@/components/ui";
import { BackIcon } from "@/components/ui/BackIcon";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Link, useRouter } from "@/i18n/navigation";
import { focusRingDark } from "@/lib/a11y";
import { cn } from "@/lib/cn";
import {
  CollectionFilters,
  MobileFilterTrigger,
} from "./CollectionFilters";
import { VehicleCard } from "./VehicleCard";
import { VehicleGridSkeleton } from "./VehicleCardSkeleton";
import {
  MOCK_VEHICLES,
  defaultFilters,
  queryVehicles,
  type VehicleFilters,
  type VehicleSort,
} from "@/data/vehicles";

const PAGE_SIZE = 6;

export function CollectionView() {
  const t = useTranslations("inventory");
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const locale = useLocale();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [filters, setFiltersState] = useState<VehicleFilters>(defaultFilters);
  const [sort, setSortState] = useState<VehicleSort>("popular");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  const setFilters = (next: VehicleFilters) => {
    setFiltersState(next);
    setVisible(PAGE_SIZE);
  };

  const setSort = (next: VehicleSort) => {
    setSortState(next);
    setVisible(PAGE_SIZE);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const results = useMemo(
    () => queryVehicles(MOCK_VEHICLES, filters, sort),
    [filters, sort],
  );

  const shown = results.slice(0, visible);
  const hasMore = visible < results.length;

  const navLinks = [
    { label: tNav("collection"), href: "/collection" },
    { label: tNav("concierge"), href: "/#concierge" },
    { label: tNav("about"), href: "/#about" },
    { label: tNav("contact"), href: "/contact" },
  ];

  const reset = () => {
    setFiltersState(defaultFilters());
    setSortState("popular");
    setVisible(PAGE_SIZE);
  };

  const headerIconBtn = cn(
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas shadow-[0_4px_18px_rgba(0,0,0,0.22)] transition-all duration-hover ease-luxury hover:bg-deep",
    focusRingDark,
  );

  const headerActions = (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label={t("back")}
      className={headerIconBtn}
    >
      <BackIcon />
    </button>
  );

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader links={navLinks} headerActions={headerActions} />

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
            src="/icons/header-cars.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain brightness-0 invert"
          />
        </Link>
        <Container>
          <h1 className="max-w-3xl font-display text-2xl font-semibold text-canvas sm:text-3xl md:text-4xl">
            {t("title")}
          </h1>
        </Container>
      </div>

      <Container className="pb-24 pt-2">
        <MobileFilterTrigger
          resultCount={results.length}
          onOpen={() => setSheetOpen(true)}
        />

        <div className="hidden lg:block">
          <CollectionFilters
            filters={filters}
            sort={sort}
            resultCount={results.length}
            locale={locale}
            onFiltersChange={setFilters}
            onSortChange={setSort}
            onReset={reset}
          />
        </div>

        <div className="mt-10">
          {loading ? (
            <VehicleGridSkeleton />
          ) : results.length === 0 ? (
            <div className="border border-line bg-surface px-8 py-20 text-center">
              <p className="font-display text-2xl font-semibold text-ink">
                {t("emptyTitle")}
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm font-medium text-muted">
                {t("emptyBody")}
              </p>
              <Button
                type="button"
                variant="primary"
                className="mt-8"
                onClick={reset}
              >
                {t("reset")}
              </Button>
            </div>
          ) : (
            <>
              <h2 className="sr-only">{t("resultsHeading")}</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((vehicle, i) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-14 flex justify-center">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => setVisible((n) => n + PAGE_SIZE)}
                  >
                    {t("loadMore")}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.button
              type="button"
              aria-label={t("filters.close")}
              className="fixed inset-0 z-40 bg-deep/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t("filters.panel")}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[88dvh] overflow-y-auto rounded-t-2xl border-t border-line bg-canvas px-6 pb-8 pt-4 lg:hidden"
              initial={
                reduceMotion ? { y: 0 } : { y: "100%" }
              }
              animate={{ y: 0 }}
              exit={reduceMotion ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line" />
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {t("filters.open")}
                </h2>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label={t("filters.close")}
                  className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/remove.png"
                    alt=""
                    width={22}
                    height={22}
                    aria-hidden
                    className="h-[22px] w-[22px] object-contain"
                  />
                </button>
              </div>

              <CollectionFilters
                embedded
                filters={filters}
                sort={sort}
                resultCount={results.length}
                locale={locale}
                onFiltersChange={setFilters}
                onSortChange={setSort}
                onReset={reset}
              />

              <Button
                type="button"
                variant="primary"
                className="mt-8 w-full"
                onClick={() => setSheetOpen(false)}
              >
                {t("filters.apply")}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
