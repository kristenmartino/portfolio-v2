"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mono } from "@/components/typography/Mono";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { SchematicResolve } from "./SchematicResolve";
import { ScrollCue } from "./ScrollCue";
import { SignalStrip } from "./SignalStrip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE, DUR, HERO_T } from "@/lib/motion";

/* Manual line split: the staircase indents land on the 16-col grid
   (100 / 16 = 6.25% steps). */
const LINES = [
  { indent: "", body: <>I build <span className="text-[var(--color-signal-blue-soft)]">clarity</span></> },
  { indent: "md:ml-[6.25%]", body: <>into complex</> },
  { indent: "md:ml-[12.5%]", body: <>systems.</> },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.65], [0, -56]);

  const lineInitial = reduced ? { opacity: 0 } : { y: "110%" };
  const lineAnimate = reduced ? { opacity: 1 } : { y: "0%" };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-center bg-[var(--color-soot)]"
    >
      {/* grid overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent)",
          backgroundSize: "calc(100% / 16) 100%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{
          duration: DUR.slow,
          delay: reduced ? 0 : HERO_T.structure,
        }}
      />

      {/* accent line */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-signal-blue), var(--color-signal-teal), transparent 70%)",
        }}
        initial={reduced ? { opacity: 0 } : { scaleX: 0, transformOrigin: "left" }}
        animate={reduced ? { opacity: 1 } : { scaleX: 1 }}
        transition={{ duration: 1.2, ease: EASE.outExpo }}
      />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16 py-20 md:py-24"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.base, delay: reduced ? 0 : HERO_T.label }}
        >
          <Mono variant="label" tone="muted">
            Strategy · Analytics · Applied AI
          </Mono>
        </motion.div>

        <h1
          className="mt-6 type-display text-[var(--color-bone)]"
          style={{
            fontSize: "var(--text-display)",
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
          }}
        >
          {LINES.map((line, i) => (
            <span
              key={i}
              className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${line.indent}`}
            >
              <motion.span
                className="block"
                initial={lineInitial}
                animate={lineAnimate}
                transition={{
                  duration: DUR.slower,
                  delay: reduced ? 0 : HERO_T.line + i * HERO_T.lineStagger,
                  ease: EASE.outExpo,
                }}
              >
                {line.body}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="md:ml-[25%]">
          <motion.p
            className="mt-9 max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--color-graphite-40)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DUR.slow,
              delay: reduced ? 0 : HERO_T.lede,
              ease: EASE.outExpo,
            }}
          >
            Independent product builds — AI in the loop, operator judgment
            in the seat. Informed by a decade across enterprise systems,
            from actuarial analytics to billing, pricing, fare logic, and
            platform migrations.
          </motion.p>
          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DUR.slow,
              delay: reduced ? 0 : HERO_T.cta,
              ease: EASE.outExpo,
            }}
          >
            <MagneticButton
              href="#work"
              className="px-5 md:px-6 py-3.5 text-sm font-medium bg-[var(--color-signal-blue)] text-[var(--color-bone)] hover:bg-[var(--color-signal-blue-deep)] transition-colors"
            >
              View Work
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="px-5 md:px-6 py-3.5 text-sm border border-white/20 text-[var(--color-graphite-20)] hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>
        </div>

        <SignalStrip />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute left-6 md:left-12 lg:left-16 z-10 hidden md:block"
        style={{ opacity, top: "calc(100svh - 5.5rem)" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.slow, delay: reduced ? 0 : HERO_T.strip }}
        >
          <ScrollCue />
        </motion.div>
      </motion.div>

      <SchematicResolve />
    </section>
  );
}
