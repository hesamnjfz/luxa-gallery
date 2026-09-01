"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui";
import { focusRing } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const STUDIO = "V COMPANY";
const EMAIL = "vcybertechnology@gmail.com";
const PHONE = "09928781780";
const PHONE_TEL = "+989928781780";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-auto border-t border-line bg-mist/60 text-ink">
      <Container className="flex flex-col items-start justify-between gap-5 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.12em] text-ink">
            {STUDIO}
          </p>
          <p className="mt-2 font-sans text-label font-semibold uppercase tracking-label text-muted">
            {t("getInTouch")}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <a
            href={`tel:${PHONE_TEL}`}
            className={cn(
              "inline-flex min-h-11 items-center text-sm font-medium text-ink transition-colors duration-hover ease-luxury hover:text-muted",
              focusRing,
            )}
          >
            {PHONE}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className={cn(
              "inline-flex min-h-11 items-center text-sm font-medium text-ink transition-colors duration-hover ease-luxury hover:text-muted",
              focusRing,
            )}
          >
            {EMAIL}
          </a>
        </div>
      </Container>
    </footer>
  );
}
