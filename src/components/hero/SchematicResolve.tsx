"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Mono } from "@/components/typography/Mono";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* Six lines untangle into orthogonal runs as you scroll from the hero into
   Work — the thesis ("clarity into complex systems") drawn in the site's
   schematic vocabulary. Tangled and resolved states share an identical
   command structure (M + 4×C) so framer-motion can interpolate the `d`
   strings. Resolved verticals land on 16-col gridlines (x = k·100 in the
   1600-wide viewBox) and exit through the bottom edge toward § 02. */

const PATHS = [
  {
    tangled:
      "M -20 290 C 150 80 320 480 480 240 C 600 60 760 420 900 180 C 1020 30 1150 350 1280 200 C 1380 120 1480 260 1560 190",
    resolved:
      "M -20 70 C 60 70 120 70 150 70 C 178 70 200 92 200 120 C 200 310 200 480 200 500 C 200 505 200 512 200 520",
    color: "var(--color-graphite-80)",
    range: [0.1, 0.62],
  },
  {
    tangled:
      "M -20 70 C 200 320 380 -20 560 260 C 700 460 860 90 1000 300 C 1120 470 1240 140 1350 320 C 1440 440 1520 280 1580 360",
    resolved:
      "M -20 125 C 180 125 360 125 450 125 C 478 125 500 147 500 175 C 500 340 500 480 500 500 C 500 505 500 512 500 520",
    color: "var(--color-graphite-80)",
    range: [0.13, 0.66],
  },
  {
    tangled:
      "M -20 345 C 180 180 360 400 540 120 C 680 -30 840 330 980 90 C 1100 -10 1230 280 1340 150 C 1430 60 1510 200 1570 130",
    resolved:
      "M -20 180 C 250 180 500 180 650 180 C 678 180 700 202 700 230 C 700 370 700 480 700 500 C 700 505 700 512 700 520",
    color: "var(--color-signal-teal)",
    range: [0.16, 0.7],
  },
  {
    tangled:
      "M -20 125 C 220 400 420 200 600 380 C 740 500 900 240 1040 400 C 1160 520 1280 300 1390 430 C 1470 510 1540 400 1590 460",
    resolved:
      "M -20 235 C 350 235 700 235 950 235 C 978 235 1000 257 1000 285 C 1000 400 1000 480 1000 500 C 1000 505 1000 512 1000 520",
    color: "var(--color-graphite-80)",
    range: [0.19, 0.74],
  },
  {
    tangled:
      "M -20 235 C 160 40 340 300 520 60 C 660 -60 820 200 960 40 C 1090 -80 1210 180 1330 60 C 1420 -20 1500 120 1570 40",
    resolved:
      "M -20 290 C 450 290 900 290 1250 290 C 1278 290 1300 312 1300 340 C 1300 430 1300 480 1300 500 C 1300 505 1300 512 1300 520",
    color: "var(--color-graphite-80)",
    range: [0.22, 0.78],
  },
  {
    tangled:
      "M -20 180 C 240 460 440 40 640 320 C 790 520 950 130 1090 350 C 1210 530 1330 220 1430 390 C 1500 500 1560 330 1600 430",
    resolved:
      "M -20 345 C 520 345 1040 345 1450 345 C 1478 345 1500 367 1500 395 C 1500 450 1500 480 1500 500 C 1500 505 1500 512 1500 520",
    color: "var(--color-signal-blue)",
    range: [0.28, 0.85],
  },
] as const;

function ScrubPath({
  progress,
  path,
}: {
  progress: MotionValue<number>;
  path: (typeof PATHS)[number];
}) {
  const d = useTransform(progress, path.range as unknown as number[], [
    path.tangled,
    path.resolved,
  ]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={path.color}
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
    />
  );
}

export function SchematicResolve() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isStatic, setIsStatic] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsStatic(reduced || mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const captionInOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const captionOutOpacity = useTransform(scrollYProgress, [0.15, 0.45], [1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full h-[36svh] min-h-[240px]"
      style={{ contain: "paint" }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 500"
        preserveAspectRatio="none"
      >
        {isStatic
          ? PATHS.map((p, i) => (
              <path
                key={i}
                d={p.resolved}
                fill="none"
                stroke={p.color}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))
          : PATHS.map((p, i) => (
              <ScrubPath key={i} progress={scrollYProgress} path={p} />
            ))}
      </svg>

      <motion.div
        className="absolute left-6 md:left-12 lg:left-16 bottom-6"
        style={isStatic ? { opacity: 0 } : { opacity: captionOutOpacity }}
      >
        <Mono variant="caption" tone="muted">
          input / unstructured
        </Mono>
      </motion.div>
      <motion.div
        className="absolute right-6 md:right-12 lg:right-16 bottom-6"
        style={isStatic ? { opacity: 1 } : { opacity: captionInOpacity }}
      >
        <Mono variant="caption" tone="muted">
          output / system
        </Mono>
      </motion.div>
    </div>
  );
}
