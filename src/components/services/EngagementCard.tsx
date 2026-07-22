"use client";

import { motion } from "framer-motion";
import { Mono } from "@/components/typography/Mono";
import { reveal } from "@/lib/motion";
import type { Engagement } from "@/content/services";

/* ── Engagement card ──────────────────────────────────────────────────────
   Lives on the paper (light) surface. Scoped offer + a "starting at" anchor +
   a preview of the actual deliverable — the tangible artifact that answers the
   #1 objection to buying advisory ("what do I actually get?").
   ────────────────────────────────────────────────────────────────────────── */

export function EngagementCard({ engagement }: { engagement: Engagement }) {
  const e = engagement;
  return (
    <motion.article
      id={e.id}
      {...reveal}
      className="scroll-mt-28 flex flex-col h-full border border-[var(--color-graphite-20)] bg-[var(--color-bone)]"
    >
      {/* header */}
      <div className="p-6 md:p-8 border-b border-[var(--color-graphite-20)]">
        <div className="flex items-center justify-between">
          <Mono variant="index" tone="ink">
            {e.index}
          </Mono>
          <div className="flex items-center gap-2">
            <Mono variant="caption">{e.timeline}</Mono>
            <span className="h-3 w-px bg-[var(--color-graphite-20)]" />
            <Mono variant="caption">{e.cadence}</Mono>
          </div>
        </div>

        <h3 className="mt-5 font-semibold text-[var(--color-ink)] text-2xl md:text-[1.75rem] tracking-[-0.02em]">
          {e.name}
        </h3>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-mono text-lg tabular-nums font-medium text-[var(--color-signal-blue-deep)]">
            {e.anchor}
          </span>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-graphite-80)] max-w-md">
          {e.forWho}
        </p>
      </div>

      {/* scope */}
      <div className="p-6 md:p-8 flex-1">
        <Mono variant="label" tone="ink">
          What I do
        </Mono>
        <ul className="mt-4 space-y-3">
          {e.scope.map((line) => (
            <li key={line} className="flex gap-3 text-[15px] leading-snug text-[var(--color-graphite-90)]">
              <span
                aria-hidden
                className="mt-2 h-px w-3 shrink-0"
                style={{ backgroundColor: "var(--color-signal-blue)" }}
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {/* deliverable preview — the tangible artifact */}
        <div className="mt-7 border border-[var(--color-graphite-20)] bg-[var(--color-paper)]">
          <div className="px-4 py-2.5 border-b border-[var(--color-graphite-20)] flex items-center justify-between">
            <Mono variant="caption">What lands in your inbox</Mono>
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-signal-teal)" }}
            />
          </div>
          <div className="px-4 py-4">
            <p className="font-semibold text-[var(--color-ink)] text-sm">
              {e.deliverable.title}
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {e.deliverable.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[13px] leading-snug text-[var(--color-graphite-80)]"
                >
                  <span className="font-mono text-[var(--color-graphite-40)]">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* cta */}
      <div className="p-6 md:p-8 pt-0">
        <a
          href="#start"
          className="block w-full text-center px-6 py-3.5 text-sm font-medium bg-[var(--color-ink)] text-[var(--color-bone)] hover:bg-[var(--color-graphite-90)] transition-colors"
        >
          {e.cta}
        </a>
      </div>
    </motion.article>
  );
}
