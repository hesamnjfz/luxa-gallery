const svgProps = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
};

export function navIconKey(href: string) {
  const h = href.toLowerCase();
  if (h.includes("featured")) return "featured";
  if (h.includes("collection")) return "collection";
  if (h.includes("financing")) return "financing";
  if (h.includes("concierge")) return "concierge";
  if (h.includes("about")) return "about";
  if (h.includes("contact")) return "contact";
  return "default";
}

type NavIconProps = {
  name: string;
  imgClassName?: string;
  svgClassName?: string;
};

export function NavIcon({ name, imgClassName, svgClassName }: NavIconProps) {
  const imgClass = imgClassName ?? "luxa-nav-icon-link__img";
  const svgClass = svgClassName ?? "luxa-nav-icon-link__svg";

  switch (name) {
    case "featured":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/icons/nav-featured-bolt.png"
          alt=""
          className={imgClass}
          aria-hidden
        />
      );
    case "collection":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/icons/nav-collection.png"
          alt=""
          className={imgClass}
          aria-hidden
        />
      );
    case "financing":
      return (
        <svg {...svgProps} className={svgClass}>
          <path d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m0 0H3m0 0h-.375A1.125 1.125 0 0 1 1.5 7.125v-.375m17.25 0c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125m17.25 0H3.375" />
        </svg>
      );
    case "concierge":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/icons/nav-concierge.png"
          alt=""
          className={imgClass}
          aria-hidden
        />
      );
    case "about":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/icons/nav-about.png"
          alt=""
          className={imgClass}
          aria-hidden
        />
      );
    case "contact":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/icons/nav-contact.png"
          alt=""
          className={imgClass}
          aria-hidden
        />
      );
    default:
      return (
        <svg {...svgProps} className={svgClass}>
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z"
            clipRule="evenodd"
          />
        </svg>
      );
  }
}
