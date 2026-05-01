"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ReadingProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-px origin-left z-[60]"
      style={{
        scaleX: progress,
        background:
          "linear-gradient(90deg, var(--color-signal-blue), var(--color-signal-teal))",
      }}
    />
  );
}
