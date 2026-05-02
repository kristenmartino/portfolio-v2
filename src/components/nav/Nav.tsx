"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollProgress } from "./ScrollProgress";
import { ActiveSectionIndicator } from "./ActiveSectionIndicator";
import { navItems, site } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(10,10,10,0.78)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-4 md:py-5 flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
          <Link
            href="/"
            className="text-sm tracking-[0.18em] font-mono font-medium text-[var(--color-graphite-20)] hover:text-[var(--color-bone)] transition-colors whitespace-nowrap"
          >
            {site.domain}
          </Link>
          <span
            aria-hidden
            className="hidden lg:inline-block h-3 w-px bg-white/10"
          />
          <div className="hidden lg:block min-w-0 truncate">
            <ActiveSectionIndicator />
          </div>
        </div>

        <nav
          className="hidden md:flex items-center gap-5 md:gap-8 text-sm text-[var(--color-graphite-40)]"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-[var(--color-bone)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden text-[11px] font-mono font-medium tracking-[0.22em] uppercase text-[var(--color-graphite-20)] hover:text-[var(--color-bone)] transition-colors px-1 py-1"
        >
          {open ? "Close" : "Menu"}
        </button>

        <ScrollProgress />
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-white/5 transition-[max-height] duration-300 ease-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
        aria-hidden={!open}
      >
        <nav
          className="px-6 py-5 flex flex-col gap-4 text-base text-[var(--color-graphite-20)] bg-[var(--color-ink)]"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-[var(--color-bone)] transition-colors"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
