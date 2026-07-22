"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mono } from "@/components/typography/Mono";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE, DUR } from "@/lib/motion";
import {
  symptoms,
  engagements,
  routerHeading,
  routerSub,
} from "@/content/services";

/* ── Symptom router ───────────────────────────────────────────────────────
   The interactive qualifier — decision-intelligence routing. The buyer picks
   the symptom that stings; it resolves to the engagement I'd start them with
   and drops a link to that card. Keyboard-operable, aria-pressed, reduced-
   motion aware.
   ────────────────────────────────────────────────────────────────────────── */

const byId = (id: string) => engagements.find((e) => e.id === id);

export function SymptomRouter() {
  const reduced = useReducedMotion();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const active = symptoms.find((s) => s.key === activeKey) ?? null;
  const routed = active ? byId(active.routesTo) : null;

  return (
    <div className="max-w-5xl">
      <h2
        className="font-semibold text-[var(--color-bone)]"
        style={{
          fontSize: "var(--text-h2)",
          letterSpacing: "var(--tracking-tight)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        {routerHeading}
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed max-w-xl text-[var(--color-graphite-40)]">
        {routerSub}
      </p>

      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {symptoms.map((s) => {
          const isActive = s.key === activeKey;
          return (
            <button
              key={s.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveKey(isActive ? null : s.key)}
              className="group text-left p-5 md:p-6 border transition-colors duration-300 focus-visible:outline-2"
              style={{
                borderColor: isActive
                  ? "var(--color-signal-blue)"
                  : "rgba(255,255,255,0.12)",
                backgroundColor: isActive
                  ? "rgba(15,98,254,0.08)"
                  : "transparent",
              }}
            >
              <div className="flex items-center justify-between">
                <Mono variant="index" tone="muted">
                  {s.index}
                </Mono>
                <Mono variant="caption" tone="muted">
                  {s.tag}
                </Mono>
              </div>
              <p
                className="mt-4 text-[15px] md:text-base leading-snug transition-colors duration-300"
                style={{
                  color: isActive
                    ? "var(--color-bone)"
                    : "var(--color-graphite-20)",
                }}
              >
                {s.statement}
              </p>
              <span
                className="mt-4 inline-block font-mono text-[10.5px] tracking-[0.18em] uppercase transition-opacity duration-300"
                style={{
                  color: "var(--color-signal-blue-soft)",
                  opacity: isActive ? 1 : 0,
                }}
              >
                Selected →
              </span>
            </button>
          );
        })}
      </div>

      {/* routed result */}
      <div aria-live="polite" className="mt-4 min-h-[1px]">
        <AnimatePresence mode="wait">
          {routed && active && (
            <motion.div
              key={active.key}
              initial={reduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={reduced ? { duration: 0 } : { duration: DUR.base, ease: EASE.outExpo }}
              className="flex flex-wrap items-center gap-x-5 gap-y-3 p-5 md:px-6 border border-white/12 bg-[var(--color-ink)]"
            >
              <Mono variant="label" tone="muted">
                I&rsquo;d start you with
              </Mono>
              <span className="text-[var(--color-bone)] font-semibold text-lg tracking-[-0.01em]">
                {routed.name}
              </span>
              <span className="font-mono text-sm tabular-nums text-[var(--color-signal-blue-soft)]">
                {routed.anchor}
              </span>
              <a
                href={`#${routed.id}`}
                className="ml-auto px-5 py-3 text-sm font-medium bg-[var(--color-signal-blue)] text-[var(--color-bone)] hover:bg-[var(--color-signal-blue-deep)] transition-colors"
              >
                See what&rsquo;s included →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
