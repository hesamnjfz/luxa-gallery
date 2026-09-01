"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, SectionLabel } from "@/components/ui";
import { HomeIcon } from "@/components/ui/HomeIcon";
import { SiteHeader } from "@/components/home/SiteHeader";
import { siteNavLinks } from "@/components/home/nav-links";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { focusRingDark } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const SERVICE_KEYS = ["delivery", "tradein", "financing"] as const;
const PILLAR_KEYS = ["0", "1", "2"] as const;

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop",
] as const;

export function ConciergePageView() {
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const t = useTranslations("conciergePage");
  const tServices = useTranslations("trust.concierge");

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

      <section
        id="desk"
        className="bg-canvas pt-28 pb-section sm:pt-32 lg:pb-section-lg"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>{tServices("eyebrow")}</SectionLabel>
            <h1 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              {tServices("title")}
            </h1>
            <p className="mt-6 text-base font-medium text-muted">
              {tServices("subtitle")}
            </p>
          </Reveal>

          <RevealStagger className="mt-16 grid gap-6 md:grid-cols-3">
            {SERVICE_KEYS.map((key, i) => (
              <RevealItem key={key}>
                <article className="group relative aspect-[3/4] min-h-[320px] overflow-hidden rounded-[10px] transition-[transform,box-shadow] duration-hover ease-luxury hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] sm:aspect-auto sm:min-h-[360px]">
                  <Image
                    src={SERVICE_IMAGES[i]}
                    alt={tServices(`items.${key}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-reveal ease-luxury group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-deep/35" />
                  <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-8 sm:min-h-[360px]">
                    <p className="font-sans text-label font-semibold uppercase tracking-label text-canvas/60">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-canvas">
                      {tServices(`items.${key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-canvas/75">
                      {tServices(`items.${key}.desc`)}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-section lg:py-section-lg">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel className="justify-center">{t("pillarsLabel")}</SectionLabel>
            <h2 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl">
              {t("pillarsTitle")}
            </h2>
          </Reveal>
          <RevealStagger className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-12">
            {PILLAR_KEYS.map((key) => (
              <RevealItem key={key}>
                <article className="border-t border-line pt-8">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {t(`pillars.${key}.title`)}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-muted">
                    {t(`pillars.${key}.desc`)}
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
