"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container, SectionLabel } from "@/components/ui";
import { HomeIcon } from "@/components/ui/HomeIcon";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TrustSection } from "@/components/home/TrustSection";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { siteNavLinks } from "@/components/home/nav-links";
import { Link } from "@/i18n/navigation";
import { focusRingDark } from "@/lib/a11y";
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

const featureIcons = {
  verified: <IconShield />,
  seamless: <IconKey />,
  curated: <IconSpark />,
} as const;

export function AboutPageView() {
  const tNav = useTranslations("nav");
  const tFeatures = useTranslations("features");
  const tMeta = useTranslations("meta");

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "auto" });
  }, []);

  const headerActions = (
    <Link
      href="/"
      aria-label={tMeta("home")}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas shadow-[0_4px_18px_rgba(0,0,0,0.22)] transition-all duration-hover ease-luxury hover:bg-deep",
        focusRingDark,
      )}
    >
      <HomeIcon />
    </Link>
  );

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader links={siteNavLinks(tNav)} headerActions={headerActions} />

      <div className="pt-20 sm:pt-24">
        <TrustSection />
      </div>

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
    </div>
  );
}
