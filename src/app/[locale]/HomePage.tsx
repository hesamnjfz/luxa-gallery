"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Container, Divider, SectionLabel } from "@/components/ui";
import { DirectionalIcon } from "@/components/ui/DirectionalIcon";
import { Hero, HeroStats } from "@/components/home/Hero";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SweepMorphCta } from "@/components/home/SweepMorphCta";
import { WeeklyPicks } from "@/components/home/WeeklyPicks";
import { useInquiry } from "@/components/forms/InquiryProvider";
import { PageIntro } from "@/components/motion/PageIntro";
import { Reveal } from "@/components/motion/Reveal";
import { Link, useRouter } from "@/i18n/navigation";
import { siteNavLinks } from "@/components/home/nav-links";
import { type Locale } from "@/i18n/config";

export default function HomePage() {
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tCollection = useTranslations("collection");
  const tCta = useTranslations("cta");
  const tFooter = useTranslations("footer");
  const tMeta = useTranslations("meta");
  const locale = useLocale() as Locale;
  const isRtl = locale === "fa";
  const { openInquiry } = useInquiry();
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const navLinks = siteNavLinks(tNav);

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
        id="featured"
        className="relative flex min-h-[100svh] w-full flex-col items-center bg-[#ECECEA] pb-16 pt-[12svh] sm:pt-[14svh]"
      >
        <SweepMorphCta
          label={tCollection("ctaFeatured")}
          onClick={() => router.push("/featured")}
          isRtl={isRtl}
          delay={0.12}
          iconSrc="/icons/nav-featured-bolt.png"
        />
        <Container className="mt-12 w-full sm:mt-16">
          <WeeklyPicks />
        </Container>
      </section>

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
                  <Link
                    href="/about"
                    className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors duration-hover ease-luxury hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2"
                  >
                    {tFooter("about")}
                  </Link>
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
