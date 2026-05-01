"use client";

import Link from "next/link";
import { ScrollProgress } from "./ScrollProgress";
import { ActiveSectionIndicator } from "./ActiveSectionIndicator";
import { navItems, site } from "@/content/site";

export function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(10,10,10,0.78)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-4 md:py-5 flex items-center justify-between gap-6">
        <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
          <Link
            href="/"
            className="text-sm tracking-[0.18em] font-mono font-medium text-[var(--color-graphite-20)] hover:text-[var(--color-bone)] transition-colors whitespace-nowrap"
          >
            {site.domain}
          </Link>
          <span
            aria-hidden
            className="hidden md:inline-block h-3 w-px bg-white/10"
          />
          <div className="hidden md:block min-w-0 truncate">
            <ActiveSectionIndicator />
          </div>
        </div>
        <nav
          className="flex items-center gap-5 md:gap-8 text-sm text-[var(--color-graphite-40)]"
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
        <ScrollProgress />
      </div>
    </header>
  );
}
