"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { usePageTransition } from "./PageTransition";
import { isExternal } from "@/lib/utils";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<LinkProps, "href"> & { href: string; children: ReactNode };

/** next/link that plays the page transition for plain left-clicks on internal routes. */
export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const transition = usePageTransition();
  const pathname = usePathname();

  if (isExternal(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} {...rest} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !transition) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    const [path, hash] = href.split("#");
    if (hash !== undefined && (path === "" || path === pathname)) return; // in-page anchor
    if (path === pathname) return;
    e.preventDefault();
    transition.navigate(href);
  };

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
