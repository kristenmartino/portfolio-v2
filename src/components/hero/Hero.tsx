"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mono } from "@/components/typography/Mono";
import { SignalStrip } from "./SignalStrip";
import { EASE, DUR } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.65], [0, -56]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-end bg-[var(--color-soot)]"
    >
      {/* grid overlay */}
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
          background:
            "linear-gradient(90deg, var(--color-signal-blue), var(--color-signal-teal), transparent 70%)",
        }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: EASE.outExpo }}
      />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-36"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.base, delay: 0.2 }}
        >
          <Mono variant="label" tone="muted">
            Strategy · Analytics · Applied AI
          </Mono>
        </motion.div>

        <motion.h1
          className="mt-6 font-semibold text-[var(--color-bone)]"
          style={{
            fontSize: "var(--text-display)",
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, delay: 0.3, ease: EASE.outExpo }}
        >
          Strategy, analytics,
          <br />
          and applied AI for
          <br />
          <span className="text-[var(--color-signal-blue-soft)]">
            complex enterprise environments.
          </span>
        </motion.h1>

        <motion.div
          className="mt-9 grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, delay: 0.5, ease: EASE.outExpo }}
        >
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: "var(--color-graphite-40)" }}
          >
            Independent work at the intersection of strategy, analytics, and
            applied AI — informed by six years inside enterprise systems where
            billing, pricing, fare logic, and platform migrations had to keep
            working under load.
          </p>
          <div className="flex gap-3">
            <a
              href="#work"
              className="px-5 md:px-6 py-3.5 text-sm font-medium bg-[var(--color-signal-blue)] text-[var(--color-bone)] hover:bg-[var(--color-signal-blue-deep)] transition-colors"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-5 md:px-6 py-3.5 text-sm border border-white/20 text-[var(--color-graphite-20)] hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        <SignalStrip />
      </motion.div>
    </section>
  );
}
