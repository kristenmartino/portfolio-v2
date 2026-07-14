"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAV_OFFSET = -76;

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      stopInertiaOnNavigate: true,
    });

    let raf = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    // Same-page hash links scroll through Lenis. Capture phase +
    // preventDefault stops both the browser jump and Next Link's router
    // handling (Link bails when defaultPrevented). The skip link opts out
    // via data-no-smooth so focus lands on #main natively.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("data-no-smooth")) return;

      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        !url.hash
      ) {
        return;
      }
      const target = document.querySelector(decodeURIComponent(url.hash));
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", url.hash);
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
    };
    window.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("click", onClick, true);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
