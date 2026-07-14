"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE, DUR } from "@/lib/motion";

type RevealHeadingProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** Section heading with a masked slide-up reveal on first viewport entry. */
export function RevealHeading({
  children,
  className = "",
  style,
}: RevealHeadingProps) {
  const reduced = useReducedMotion();

  return (
    <h2 className={`type-display ${className}`} style={style}>
      <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
        <motion.span
          className="block"
          initial={reduced ? { opacity: 0 } : { y: "110%" }}
          whileInView={reduced ? { opacity: 1 } : { y: "0%" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.slower, ease: EASE.outExpo }}
        >
          {children}
        </motion.span>
      </span>
    </h2>
  );
}
