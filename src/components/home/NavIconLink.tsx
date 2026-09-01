"use client";

import { NavIcon, navIconKey } from "@/components/home/nav-icons";

type NavIconLinkProps = {
  label: string;
  href: string;
};

export function NavIconLink({ label, href }: NavIconLinkProps) {
  const icon = navIconKey(href);

  return (
    <>
      <a
        href={href}
        className="luxa-nav-icon-link"
        aria-label={label}
        data-nav={icon}
      >
        <span className="luxa-nav-icon-link__filled" aria-hidden />
        <NavIcon name={icon} />
      </a>
      <div className="luxa-nav-icon-item__tooltip">{label}</div>
    </>
  );
}
