"use client";

import { useEffect, useState, useTransition, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { NavIconLink } from "@/components/home/NavIconLink";
import { NavIcon, navIconKey } from "@/components/home/nav-icons";
import { type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { focusRingDark } from "@/lib/a11y";

export type NavLink = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  links: NavLink[];
  headerActions?: ReactNode;
};

const ease = [0.25, 0.1, 0.25, 1] as const;

function LanguagePill({ layoutId }: { layoutId: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: Locale) => {
    if (next === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={cn("luxa-lang-pill", isPending && "is-pending")}
      role="group"
      aria-label={t("language")}
      aria-busy={isPending}
    >
      {(["en", "fa"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            disabled={isPending}
            onClick={() => switchLocale(code)}
            className={cn(
              "luxa-lang-pill__btn",
              focusRingDark,
              active && "is-active",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="luxa-lang-pill__indicator"
                transition={{ type: "spring", stiffness: 480, damping: 34 }}
              />
            )}
            <span className="luxa-lang-pill__label">{code.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SiteHeader({ links, headerActions }: SiteHeaderProps) {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed top-0 z-50 w-full transition-all duration-300 ease-out",
          /* Mobile scrolled: fully transparent — only hamburger shows */
          scrolled
            ? "bg-transparent shadow-none lg:bg-[#141414]/95 lg:shadow-[0_8px_30px_rgba(0,0,0,0.28)] lg:backdrop-blur-md"
            : "bg-transparent sm:bg-gradient-to-b sm:from-black/50 sm:to-transparent",
        )}
      >
        <Container
          className={cn(
            "relative transition-[height] duration-300 ease-out",
            scrolled ? "h-16" : "h-[4.5rem]",
          )}
        >
          <div className="pointer-events-auto absolute inset-y-0 start-[7px] z-[61] flex items-center gap-2 sm:start-8 sm:gap-3 lg:start-16 [&_a]:ring-1 [&_a]:ring-black/15 [&_button]:ring-1 [&_button]:ring-black/15">
            {headerActions}
            <Link
              href="/"
              className={cn(
                "hidden font-display text-lg font-semibold tracking-wide text-canvas transition-opacity duration-hover ease-luxury hover:opacity-80 lg:block",
                focusRingDark,
              )}
              onClick={() => setMenuOpen(false)}
            >
              LUXA
            </Link>
          </div>

          <nav
            className="pointer-events-auto hidden h-full items-center justify-center lg:flex"
            aria-label={t("primaryNav")}
          >
            <ul className="luxa-nav-rail">
              {links.map((link) => (
                <li key={link.href + link.label} className="luxa-nav-icon-item">
                  <NavIconLink label={link.label} href={link.href} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="pointer-events-auto absolute inset-y-0 end-[7px] z-[61] flex items-center gap-2 sm:end-8 sm:gap-3 lg:end-16">
            <div className="hidden md:block">
              <LanguagePill layoutId="lang-pill-desktop" />
            </div>

            <button
              type="button"
              className={cn(
                "relative z-[60] flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full lg:hidden",
                focusRingDark,
                scrolled
                  ? "bg-ink shadow-[0_4px_20px_rgba(0,0,0,0.35)] ring-1 ring-black/20"
                  : "bg-ink shadow-[0_4px_18px_rgba(0,0,0,0.22)] ring-1 ring-black/15",
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">
                {menuOpen ? t("closeMenu") : t("openMenu")}
              </span>
              <span className="relative block h-5 w-5 overflow-visible">
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 bg-canvas transition-all duration-300 ease-out",
                    menuOpen ? "-translate-y-1/2 rotate-45" : "-translate-y-[7px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 -translate-y-1/2 bg-canvas transition-all duration-300 ease-out",
                    menuOpen && "scale-x-0 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 bg-canvas transition-all duration-300 ease-out",
                    menuOpen ? "-translate-y-1/2 -rotate-45" : "translate-y-[5.5px]",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-40 flex flex-col bg-[#121212] lg:hidden"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="h-[4.5rem] shrink-0" aria-hidden />

            <nav className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href + link.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                    transition={{
                      duration: 0.45,
                      delay: reduceMotion ? 0 : 0.06 + i * 0.07,
                      ease,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex min-h-11 items-center justify-between gap-5 border-b border-canvas/10 py-4 font-display text-3xl font-semibold text-canvas transition-colors duration-hover ease-luxury hover:text-canvas/70 sm:text-4xl",
                        focusRingDark,
                      )}
                    >
                      <span>{link.label}</span>
                      <NavIcon
                        name={navIconKey(link.href)}
                        imgClassName={cn(
                          "luxa-mobile-nav-icon",
                          navIconKey(link.href) === "collection" &&
                            "luxa-mobile-nav-icon--collection",
                          navIconKey(link.href) === "featured" &&
                            "luxa-mobile-nav-icon--featured",
                        )}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="flex flex-col gap-5 border-t border-canvas/10 px-8 py-8 md:hidden"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : 0.35,
                ease,
              }}
            >
              <div className="flex justify-center">
                <LanguagePill layoutId="lang-pill-mobile" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
