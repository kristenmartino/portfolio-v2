"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Mono } from "@/components/typography/Mono";
import { EASE, DUR } from "@/lib/motion";
import type { SectionVariant } from "@/lib/types";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  variant?: SectionVariant;
  children: ReactNode;
  withSeam?: boolean;
};

const surfaceClasses: Record<SectionVariant, string> = {
  ink: "bg-[var(--color-ink)] text-[var(--color-bone)]",
  soot: "bg-[var(--color-soot)] text-[var(--color-bone)]",
  paper: "bg-[var(--color-bone)] text-[var(--color-ink)]",
};

const seamColor: Record<SectionVariant, string> = {
  ink: "rgba(255,255,255,0.08)",
  soot: "rgba(255,255,255,0.08)",
  paper: "rgba(0,0,0,0.06)",
};

export function Section({
  id,
  index,
  label,
  variant = "paper",
  children,
  withSeam = true,
}: SectionProps) {
  const isLight = variant === "paper";

  return (
    <section id={id} className={`relative ${surfaceClasses[variant]}`}>
      {withSeam && (
        <div className="relative">
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ backgroundColor: seamColor[variant] }}
          />
          <motion.div
            className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6 md:pt-8 flex items-baseline gap-4"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: DUR.base, ease: EASE.outExpo }}
          >
            <Mono variant="index" tone={isLight ? "graphite" : "muted"}>
              §&nbsp;{index}
            </Mono>
            <span
              className="h-px flex-1"
              style={{ backgroundColor: seamColor[variant] }}
            />
            <Mono variant="label" tone={isLight ? "graphite" : "muted"}>
              {label}
            </Mono>
          </motion.div>
        </div>
      )}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-28">
        {children}
      </div>
    </section>
  );
}
