"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useCoarsePointer } from "@/hooks/useCoarsePointer";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SPRING_MAGNETIC } from "@/lib/motion";

const MAX_PULL = 6;

type MagneticButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
};

/** Anchor with a subtle magnetic pull toward the cursor. The anchor itself
    stays static (focus ring intact); only the inner span translates. Inert
    under reduced motion and on coarse pointers. */
export function MagneticButton({
  href,
  className,
  children,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const mouse = useMousePosition(ref);

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, SPRING_MAGNETIC);
  const y = useSpring(yRaw, SPRING_MAGNETIC);

  useEffect(() => {
    if (reduced || coarse || !mouse.inside) {
      xRaw.set(0);
      yRaw.set(0);
      return;
    }
    xRaw.set(mouse.x * MAX_PULL);
    yRaw.set(mouse.y * MAX_PULL);
  }, [mouse, reduced, coarse, xRaw, yRaw]);

  return (
    <a ref={ref} href={href} className={className} target={target} rel={rel}>
      <motion.span className="block" style={{ x, y }}>
        {children}
      </motion.span>
    </a>
  );
}
