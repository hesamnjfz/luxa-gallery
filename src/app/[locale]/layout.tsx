import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Playfair_Display, Vazirmatn } from "next/font/google";
import { routing } from "@/i18n/routing";
import { getDirection, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { InquiryProvider } from "@/components/forms/InquiryProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SiteFooter } from "@/components/home/SiteFooter";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Luxa Gallery | Private Automotive Concierge",
  description:
    "A private marketplace for exceptional automobiles. Discreet acquisition and consignment for collectors and enthusiasts.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  if (!hasLocale(routing.locales, localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = getDirection(locale);
  const isFa = locale === "fa";

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(
        playfair.variable,
        inter.variable,
        isFa && vazirmatn.variable,
        "h-full antialiased",
      )}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "flex min-h-full flex-col bg-canvas text-ink",
          isFa ? "font-persian" : "font-sans",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <InquiryProvider>
            <ScrollProgress />
            <div className="flex min-h-full flex-1 flex-col">
              {children}
              <SiteFooter />
            </div>
          </InquiryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
