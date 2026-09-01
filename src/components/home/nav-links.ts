export function siteNavLinks(t: (key: string) => string) {
  return [
    { label: t("collection"), href: "/collection" },
    { label: t("featured"), href: "/featured" },
    { label: t("concierge"), href: "/concierge" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];
}
