"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mono } from "@/components/typography/Mono";
import { EASE, DUR } from "@/lib/motion";

type CaseStudyHeaderProps = {
  eyebrow: string;
  title: string;
  summary: string;
  metrics: string[];
  liveHref?: string;
  codeHref?: string;
  viewTransitionName?: string;
};

export function CaseStudyHeader({
  eyebrow,
  title,
  summary,
  metrics,
  liveHref,
  codeHref,
  viewTransitionName,
}: CaseStudyHeaderProps) {
  return (
    <header
      className="relative bg-[var(--color-soot)] pt-32 md:pt-40 pb-16 md:pb-20 border-b border-[var(--color-graphite-90)]"
      style={viewTransitionName ? { viewTransitionName } : undefined}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <Link
          href="/#work"
          className="inline-block text-sm text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
        >
          ← Back to work
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, delay: 0.1, ease: EASE.outExpo }}
          className="mt-10"
        >
          <Mono variant="label" tone="muted">
            {eyebrow}
          </Mono>
          <h1
            className="mt-5 font-semibold text-[var(--color-bone)] max-w-3xl"
            style={{
              fontSize: "var(--text-display)",
              letterSpacing: "var(--tracking-display)",
              lineHeight: "var(--leading-display)",
            }}
          >
            {title}
          </h1>
          <p className="mt-7 text-lg md:text-xl leading-relaxed max-w-2xl text-[var(--color-graphite-40)]">
            {summary}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, delay: 0.25, ease: EASE.outExpo }}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          {metrics.map((m) => (
            <Mono
              key={m}
              variant="meter"
              className="px-3 py-1.5 border !text-[var(--color-graphite-40)]"
              style={{ borderColor: "var(--color-graphite-80)" }}
            >
              {m}
            </Mono>
          ))}
          <span className="grow" />
          {liveHref && (
            <a
              href={liveHref}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-[var(--color-signal-blue-soft)] hover:text-[var(--color-bone)] transition-colors"
            >
              Open ↗
            </a>
          )}
          {codeHref && (
            <a
              href={codeHref}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
            >
              Source ↗
            </a>
          )}
        </motion.div>
      </div>
    </header>
  );
}
