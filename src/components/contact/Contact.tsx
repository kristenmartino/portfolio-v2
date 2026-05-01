"use client";

import { Section } from "@/components/section/Section";
import { contactLinks } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact" index="05" label="Contact" variant="ink">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-20 items-end">
        <div>
          <h2
            className="font-semibold text-[var(--color-bone)] max-w-2xl"
            style={{
              fontSize: "var(--text-h2)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            Open to roles, partnerships, and select consulting.
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed max-w-lg text-[var(--color-graphite-40)]">
            Currently exploring senior product roles and consulting work where
            systems thinking, analytics, and applied AI intersect — especially
            in operationally-heavy industries like energy, transportation,
            financial services, and healthcare.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {contactLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className={
                  link.primary
                    ? "px-6 py-3.5 text-sm font-medium bg-[var(--color-signal-blue)] text-[var(--color-bone)] hover:bg-[var(--color-signal-blue-deep)] transition-colors"
                    : "px-6 py-3.5 text-sm border border-[var(--color-graphite-80)] text-[var(--color-graphite-20)] hover:border-[var(--color-graphite-40)] hover:bg-white/5 transition-colors"
                }
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
