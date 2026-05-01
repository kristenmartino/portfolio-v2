"use client";

import { useScroll, useSpring } from "framer-motion";

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.4,
  });
  return smooth;
}
