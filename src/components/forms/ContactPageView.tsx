"use client";

import { useTranslations } from "next-intl";
import { Container, SectionLabel } from "@/components/ui";
import { SiteHeader } from "@/components/home/SiteHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export function ContactPageView() {
  const t = useTranslations("forms.contactPage");
  const tNav = useTranslations("nav");

  const navLinks = [
    { label: tNav("collection"), href: "/collection" },
    { label: tNav("concierge"), href: "/#concierge" },
    { label: tNav("about"), href: "/#about" },
    { label: tNav("contact"), href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader links={navLinks} />

      <div className="border-b border-line bg-deep pt-28 pb-16 text-canvas sm:pt-32 sm:pb-20">
        <Container>
          <SectionLabel className="text-canvas/70">{t("eyebrow")}</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold text-canvas sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-base font-medium text-canvas/70 sm:text-lg">
            {t("subtitle")}
          </p>
        </Container>
      </div>

      <Container className="py-section">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {t("formTitle")}
            </h2>
            <p className="mt-3 text-sm font-medium text-muted">{t("formLead")}</p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <aside className="border border-line bg-surface p-8">
              <p className="font-sans text-label font-semibold uppercase tracking-label text-soft">
                {t("infoLabel")}
              </p>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="font-sans text-label font-semibold uppercase tracking-label text-soft">
                    {t("addressLabel")}
                  </dt>
                  <dd className="mt-2 whitespace-pre-line text-sm font-medium leading-relaxed text-ink">
                    {t("address")}
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-label font-semibold uppercase tracking-label text-soft">
                    {t("phoneLabel")}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href="tel:+989928781780"
                      className="text-sm font-medium text-ink transition-colors duration-hover ease-luxury hover:text-muted"
                    >
                      {t("phone")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-label font-semibold uppercase tracking-label text-soft">
                    {t("emailLabel")}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href="mailto:vcybertechnology@gmail.com"
                      className="text-sm font-medium text-ink transition-colors duration-hover ease-luxury hover:text-muted"
                    >
                      {t("email")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-label font-semibold uppercase tracking-label text-soft">
                    {t("hoursLabel")}
                  </dt>
                  <dd className="mt-2 whitespace-pre-line text-sm font-medium leading-relaxed text-ink">
                    {t("hours")}
                  </dd>
                </div>
              </dl>
            </aside>

            {/* Dark map placeholder — swap for real map later */}
            <div
              className="relative min-h-[280px] overflow-hidden border border-line bg-[#1A1A1A]"
              aria-label={t("mapLabel")}
              role="img"
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(245,245,243,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,243,0.06) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent" />
              <div className="relative z-10 flex h-full min-h-[280px] flex-col items-center justify-center px-6 text-center">
                <span className="flex h-10 w-10 items-center justify-center border border-canvas/30 text-canvas">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"
                      stroke="currentColor"
                      strokeWidth="1.25"
                    />
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </span>
                <p className="mt-4 font-sans text-label font-semibold uppercase tracking-label text-canvas/55">
                  {t("mapLabel")}
                </p>
                <p className="mt-2 max-w-xs text-xs font-medium text-canvas/70">
                  {t("mapHint")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
