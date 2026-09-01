"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button, Container, Divider, SectionLabel } from "@/components/ui";
import { DirectionalIcon } from "@/components/ui/DirectionalIcon";
import { Hero, HeroStats } from "@/components/home/Hero";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TrustSection } from "@/components/home/TrustSection";
import { useInquiry } from "@/components/forms/InquiryProvider";
import { PageIntro } from "@/components/motion/PageIntro";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { VehicleCard } from "@/components/collection/VehicleCard";
import { MOCK_VEHICLES } from "@/data/vehicles";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const FEATURE_KEYS = ["verified", "seamless", "curated"] as const;

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l8 4v5c0 5.25-3.5 8.75-8 10-4.5-1.25-8-4.75-8-10V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconKey() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="15" r="4" />
      <path d="M12 15h8M16 15v-2M18 15v-1" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function HomePage() {
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tFeatures = useTranslations("features");
  const tCollection = useTranslations("collection");
  const tCta = useTranslations("cta");
  const tFooter = useTranslations("footer");
  const tMeta = useTranslations("meta");
  const { openInquiry } = useInquiry();
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const navLinks = [
    { label: tNav("collection"), href: "/collection" },
    { label: tNav("concierge"), href: "#concierge" },
    { label: tNav("about"), href: "#about" },
    { label: tNav("contact"), href: "/contact" },
  ];

  const heroStats = [
    {
      value: tHero("stats.vehicles.value"),
      label: tHero("stats.vehicles.label"),
    },
    {
      value: tHero("stats.years.value"),
      label: tHero("stats.years.label"),
    },
    {
      value: tHero("stats.continents.value"),
      label: tHero("stats.continents.label"),
    },
  ];

  const featureIcons = {
    verified: <IconShield />,
    seamless: <IconKey />,
    curated: <IconSpark />,
  } as const;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PageIntro />
      <SiteHeader links={navLinks} />

      <Hero
        copy={{
          badge: tHero("badge"),
          title: tHero("title"),
          titleAccent: tHero("titleAccent"),
          subtitle: tHero("subtitle"),
          primary: tHero("primary"),
          secondary: tHero("secondary"),
          scroll: tHero("scroll"),
        }}
        onPrimaryClick={() => router.push("/collection")}
        onSecondaryClick={() => openInquiry()}
      />

      <section
        id="collection"
        className="border-t border-line bg-canvas py-section lg:py-section-lg"
      >
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/section-inventory.png"
                alt={tCollection("label")}
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
              />
              <h2 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
                {tCollection("title")}
              </h2>
              <p className="mt-6 text-base font-medium text-muted">
                {tCollection("subtitle")}
              </p>
            </div>
            <Link
              href="/collection"
              className={cn(
                "luxa-sweep-btn inline-flex min-h-12 shrink-0 items-center justify-center px-[2.4em] py-[0.7em]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
              )}
            >
              <span className="luxa-sweep-btn__frame" aria-hidden />
              <span className="relative z-10 inline-flex items-center justify-center gap-3 font-sans text-[15px] font-semibold uppercase tracking-label">
                {tCollection("viewAll")}
                <DirectionalIcon />
              </span>
            </Link>
          </Reveal>

          <RevealStagger className="mt-16 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {MOCK_VEHICLES.map((vehicle, i) => (
              <RevealItem key={vehicle.id}>
                <VehicleCard vehicle={vehicle} index={i} />
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      <TrustSection />

      <section className="border-t border-line bg-canvas py-section lg:py-section-lg">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionLabel className="justify-center">{tCta("label")}</SectionLabel>
            <h2 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              {tCta("title")}
            </h2>
            <p className="mx-auto mt-8 max-w-lg text-base font-medium text-muted">
              {tCta("subtitle")}
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" onClick={() => openInquiry()}>
                {tCta("primary")}
                <DirectionalIcon />
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/collection")}
              >
                {tCta("secondary")}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section
        id="about"
        className="border-t border-line bg-surface py-section lg:py-section-lg"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>{tFeatures("label")}</SectionLabel>
            <h2 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              {tFeatures("title")}
            </h2>
            <p className="mt-6 max-w-lg text-base font-medium text-muted">
              {tFeatures("subtitle")}
            </p>
          </Reveal>

          <RevealStagger className="mt-20 grid gap-16 sm:grid-cols-3 sm:gap-12">
            {FEATURE_KEYS.map((key, i) => (
              <RevealItem key={key}>
                <article className="border-t border-line pt-10">
                  <div className="mb-8 text-ink">{featureIcons[key]}</div>
                  <p className="mb-4 font-display text-xl font-medium text-soft">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {tFeatures(`items.${key}.title`)}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-muted">
                    {tFeatures(`items.${key}.desc`)}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      <HeroStats stats={heroStats} />

      <footer id="contact" className="border-t border-line bg-mist/60 text-ink">
        <Container className="py-24">
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <span className="font-display text-lg font-semibold tracking-wide text-ink">
                {tMeta("brand")}
              </span>
              <p className="mt-6 max-w-xs text-sm font-medium leading-relaxed text-muted">
                {tFooter("tagline")}
              </p>
            </div>

            <div>
              <h3 className="font-sans text-label font-semibold uppercase tracking-label text-muted">
                {tFooter("product")}
              </h3>
              <ul className="mt-8 space-y-4">
                {[tFooter("cars"), tFooter("sell"), tFooter("pricing")].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors duration-hover ease-luxury hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2"
                      >
                        {link}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-label font-semibold uppercase tracking-label text-muted">
                {tFooter("company")}
              </h3>
              <ul className="mt-8 space-y-4">
                <li>
                  <a
                    href="#about"
                    className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors duration-hover ease-luxury hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2"
                  >
                    {tFooter("about")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors duration-hover ease-luxury hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2"
                  >
                    {tFooter("careers")}
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors duration-hover ease-luxury hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2"
                  >
                    {tFooter("contact")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-label font-semibold uppercase tracking-label text-muted">
                {tFooter("legal")}
              </h3>
              <ul className="mt-8 space-y-4">
                {[tFooter("privacy"), tFooter("terms")].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors duration-hover ease-luxury hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Divider className="mt-20" />

          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-sans text-label font-semibold uppercase tracking-label text-muted">
              {tFooter("rights")}
            </p>
            <p className="font-sans text-label font-semibold uppercase tracking-label text-muted">
              {tMeta("precision")}
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
