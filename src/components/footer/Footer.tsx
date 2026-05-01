import Link from "next/link";
import { Mono } from "@/components/typography/Mono";
import { contactLinks, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-ink)] border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
          <div>
            <Mono variant="caption" tone="muted">
              Contact
            </Mono>
            <ul className="mt-4 space-y-2">
              {contactLinks.map((l) => {
                const isExternal = l.href.startsWith("http");
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="text-sm text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <Mono variant="caption" tone="muted">
              Built with
            </Mono>
            <ul className="mt-4 space-y-2">
              {site.builtWith.map((b) => (
                <li
                  key={b}
                  className="text-sm text-[var(--color-graphite-40)]"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <Mono variant="caption" tone="muted">
              Current focus
            </Mono>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-graphite-40)] max-w-xs">
              {site.currentFocus}
            </p>
          </div>

          <div className="col-span-2 md:col-span-1">
            <Mono variant="caption" tone="muted">
              Resources
            </Mono>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/insights"
                  className="text-sm text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/work/gridpulse"
                  className="text-sm text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
                >
                  GridPulse case study
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-6 flex flex-wrap items-baseline justify-between gap-4 border-t"
          style={{ borderColor: "var(--color-graphite-90)" }}
        >
          <Mono variant="caption" tone="muted">
            {site.tagline}
          </Mono>
          <div className="flex items-baseline gap-6">
            <span className="text-xs text-[var(--color-graphite-60)]">
              © {year} Kristen Martino
            </span>
            <Mono variant="caption" tone="muted">
              {site.domain}
            </Mono>
          </div>
        </div>
      </div>
    </footer>
  );
}
