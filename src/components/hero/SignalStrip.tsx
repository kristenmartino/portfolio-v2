"use client";

import { motion } from "framer-motion";
import { Mono } from "@/components/typography/Mono";
import { EASE, DUR, HERO_T } from "@/lib/motion";

const signals = [
  {
    label: "Clarity in ambiguity",
    sub: "Turning messy problems into structure.",
    accent: "var(--color-signal-blue)",
  },
  {
    label: "Decision-grade analytics",
    sub: "Insight that holds up to interrogation.",
    accent: "var(--color-signal-teal)",
  },
  {
    label: "Auditable AI",
    sub: "Inputs traced. Outputs explainable.",
    accent: "var(--color-signal-magenta)",
  },
];

export function SignalStrip() {
  return (
    <motion.div
      className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.slow, delay: HERO_T.strip, ease: EASE.outExpo }}
    >
      {signals.map((item) => (
        <div
          key={item.label}
          className="py-5 pr-8 group"
          style={{
            borderTop: `1px solid ${item.accent}`,
          }}
        >
          <Mono variant="tag" className="!text-[var(--color-bone)]">
            {item.label}
          </Mono>
          <div
            className="mt-2 text-sm leading-snug max-w-xs"
            style={{ color: "var(--color-graphite-40)" }}
          >
            {item.sub}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
