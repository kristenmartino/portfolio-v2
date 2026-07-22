"use client";

import { motion } from "framer-motion";
import { Mono } from "@/components/typography/Mono";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE, DUR } from "@/lib/motion";
import { headlines, headlineTail, activeHeadline } from "@/content/services";

/* ── The Reframe ──────────────────────────────────────────────────────────
   Signature moment. On load, a scatter of raw, unranked questions collapses
   into a structured diagnosis — the service, performed. The resolved card is
   decorative (aria-hidden) and generic; it stands in for the deliverable, not
   a real client. Motion is transform/opacity only and fully reduced-motion
   aware (renders the resolved state instantly when motion is reduced).
   ────────────────────────────────────────────────────────────────────────── */

const FINDINGS = [
  { sev: "HIGH", label: "Silent failure on empty retrieval" },
  { sev: "MED", label: "No citation on 12% of answers" },
  { sev: "LOW", label: "Latency spikes under load" },
] as const;

const SEV_COLOR: Record<string, string> = {
  HIGH: "var(--color-signal-magenta)",
  MED: "var(--color-signal-blue-soft)",
  LOW: "var(--color-graphite-40)",
};

/* Raw input, scattered at the corners, that drifts inward and dissolves as the
   card resolves. Positioned as inset corners of the artifact box. */
type Fragment = {
  text: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  r: number;
  dx: number;
  dy: number;
};

const FRAGMENTS: Fragment[] = [
  { text: "it's slow?", top: "2%", left: "0%", r: -7, dx: 34, dy: 26 },
  { text: "users complain", top: "-2%", right: "2%", r: 5, dx: -30, dy: 28 },
  { text: "is the AI wrong??", bottom: "6%", right: "0%", r: 8, dx: -26, dy: -24 },
  { text: "ship date?", bottom: "0%", left: "3%", r: -5, dx: 30, dy: -22 },
];

function DiagnosisArtifact({ reduced }: { reduced: boolean }) {
  // When reduced, initial={false} makes each element mount at its `animate`
  // state with no tween.
  const init = (v: Record<string, number>) => (reduced ? false : v);
  const tween = (delay: number, duration: number = DUR.slow) =>
    reduced ? { duration: 0 } : { duration, delay, ease: EASE.outExpo };

  return (
    <div
      aria-hidden
      className="relative w-full h-[360px] sm:h-[400px] lg:h-[440px]"
      style={{ contain: "paint" }}
    >
      {/* raw input fragments — hidden on small screens and under reduced motion */}
      {!reduced &&
        FRAGMENTS.map((f) => (
          <motion.div
            key={f.text}
            className="hidden md:block absolute font-mono text-[11px] tracking-[0.04em] text-[var(--color-graphite-60)] whitespace-nowrap select-none"
            style={{
              top: f.top,
              left: f.left,
              right: f.right,
              bottom: f.bottom,
            }}
            initial={{ opacity: 0, x: 0, y: 0, rotate: f.r }}
            animate={{
              opacity: [0, 0.85, 0.85, 0],
              x: [0, 0, f.dx, f.dx],
              y: [0, 0, f.dy, f.dy],
              rotate: [f.r, f.r, f.r * 0.3, 0],
            }}
            transition={{
              duration: 1.1,
              times: [0, 0.25, 0.7, 1],
              ease: EASE.outQuart,
            }}
          >
            <span className="text-[var(--color-graphite-80)]">“</span>
            {f.text}
            <span className="text-[var(--color-graphite-80)]">”</span>
          </motion.div>
        ))}

      {/* resolved diagnosis card */}
      <motion.div
        className="absolute inset-x-2 sm:inset-x-6 md:inset-x-10 top-1/2 -translate-y-1/2 border border-white/12 bg-[var(--color-ink)]"
        style={{ boxShadow: "0 24px 60px -30px rgba(0,0,0,0.8)" }}
        initial={init({ opacity: 0, scale: 0.975, y: 0 })}
        animate={{ opacity: 1, scale: 1 }}
        transition={tween(0.08, DUR.base)}
      >
        {/* top accent bar draws in */}
        <motion.div
          className="h-[3px] origin-left"
          style={{
            background:
              "linear-gradient(90deg, var(--color-signal-blue), var(--color-signal-teal), transparent 78%)",
          }}
          initial={init({ scaleX: 0 })}
          animate={{ scaleX: 1 }}
          transition={tween(0.2, DUR.slow)}
        />

        <div className="p-5 sm:p-6 lg:p-7">
          <motion.div
            className="flex items-center justify-between"
            initial={init({ opacity: 0, y: 8 })}
            animate={{ opacity: 1, y: 0 }}
            transition={tween(0.28, DUR.base)}
          >
            <Mono variant="label" tone="muted">
              Diagnosis · reality check
            </Mono>
            <span className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-signal-teal)" }}
              />
              <Mono variant="caption" tone="muted">
                resolved
              </Mono>
            </span>
          </motion.div>

          <motion.p
            className="mt-4 font-semibold text-[var(--color-bone)] text-xl sm:text-2xl tracking-[-0.01em]"
            initial={init({ opacity: 0, y: 10 })}
            animate={{ opacity: 1, y: 0 }}
            transition={tween(0.36)}
          >
            The feature works.{" "}
            <span className="text-[var(--color-signal-blue-soft)]">
              The trust doesn&rsquo;t.
            </span>
          </motion.p>

          <div className="mt-5 border-t border-white/8">
            {FINDINGS.map((f, i) => (
              <motion.div
                key={f.label}
                className="flex items-center gap-3 py-2.5 border-b border-white/8"
                initial={init({ opacity: 0, x: -10 })}
                animate={{ opacity: 1, x: 0 }}
                transition={tween(0.46 + i * 0.09, DUR.base)}
              >
                <span
                  className="shrink-0 px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.14em] uppercase"
                  style={{
                    color: SEV_COLOR[f.sev],
                    border: `1px solid ${SEV_COLOR[f.sev]}`,
                    opacity: 0.9,
                  }}
                >
                  {f.sev}
                </span>
                <span className="text-[13px] sm:text-sm text-[var(--color-graphite-20)]">
                  {f.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-4"
            initial={init({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={tween(0.78, DUR.base)}
          >
            <Mono variant="caption" tone="muted">
              4 findings · ranked · 1 fix first
            </Mono>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function Reframe() {
  const reduced = useReducedMotion();
  const h = headlines[activeHeadline];
  const tail = headlineTail[activeHeadline];

  const init = (v: Record<string, number>) => (reduced ? false : v);
  const tween = (delay: number) =>
    reduced ? { duration: 0 } : { duration: DUR.slow, delay, ease: EASE.outExpo };

  return (
    <section
      id="hero"
      className="relative min-h-[92svh] flex items-center bg-[var(--color-soot)] overflow-hidden"
    >
      {/* 16-col hairline grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent)",
          backgroundSize: "calc(100% / 16) 100%",
        }}
      />

      {/* accent line */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 h-[3px] w-full"
        style={{
          transformOrigin: "left",
          background:
            "linear-gradient(90deg, var(--color-signal-blue), var(--color-signal-teal), transparent 70%)",
        }}
        initial={init({ scaleX: 0 })}
        animate={{ scaleX: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 1.2, ease: EASE.outExpo }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16 py-24 md:py-28 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* headline column */}
        <div>
          <motion.div
            initial={init({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={reduced ? { duration: 0 } : { duration: DUR.base, delay: 0.2 }}
          >
            <Mono variant="label" tone="muted">
              {h.eyebrow}
            </Mono>
          </motion.div>

          <motion.h1
            className="mt-6 font-semibold text-[var(--color-bone)] max-w-[16ch]"
            style={{
              fontSize: "var(--text-display)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
            }}
            initial={init({ opacity: 0, y: 32 })}
            animate={{ opacity: 1, y: 0 }}
            transition={tween(0.3)}
          >
            {h.headlineLead}
            <span className="text-[var(--color-signal-blue-soft)]">
              {h.headlineAccent}
            </span>
            {tail}
          </motion.h1>

          <motion.div
            className="mt-9 max-w-xl"
            initial={init({ opacity: 0, y: 24 })}
            animate={{ opacity: 1, y: 0 }}
            transition={tween(0.5)}
          >
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "var(--color-graphite-40)" }}
            >
              {h.sub}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={h.ctaPrimary.href}
                className="px-5 md:px-6 py-3.5 text-sm font-medium bg-[var(--color-signal-blue)] text-[var(--color-bone)] hover:bg-[var(--color-signal-blue-deep)] transition-colors"
              >
                {h.ctaPrimary.label}
              </a>
              <a
                href={h.ctaSecondary.href}
                className="px-5 md:px-6 py-3.5 text-sm border border-white/20 text-[var(--color-graphite-20)] hover:bg-white/5 hover:border-white/40 transition-colors"
              >
                {h.ctaSecondary.label}
              </a>
            </div>
          </motion.div>
        </div>

        {/* signature artifact */}
        <DiagnosisArtifact reduced={reduced} />
      </div>
    </section>
  );
}
