"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      aria-hidden
      className="absolute bottom-0 left-0 right-0 h-px origin-left"
      style={{
        scaleX: progress,
        background:
          "linear-gradient(90deg, var(--color-signal-blue), var(--color-signal-teal))",
      }}
    />
  );
}
