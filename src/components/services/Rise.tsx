"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { reveal, revealStagger } from "@/lib/motion";

/* Small reusable scroll-reveal wrapper so the services page can stay a server
   component while its static sections still get the site's orchestrated
   whileInView rise. Pass `i` for a staggered variant. Reduced motion is
   honored globally by framer-motion via the CSS reduced-motion rules and the
   `once` viewport. */
export function Rise({
  children,
  i,
  className,
  as = "div",
}: {
  children: ReactNode;
  i?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const MotionTag = as === "li" ? motion.li : motion.div;
  const anim = i == null ? reveal : revealStagger(i);
  return (
    <MotionTag className={className} {...anim}>
      {children}
    </MotionTag>
  );
}
