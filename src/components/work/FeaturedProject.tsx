"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Mono } from "@/components/typography/Mono";
import { featuredProject } from "@/content/work";

export function FeaturedProject() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mouse = useMousePosition(cardRef);

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, { stiffness: 220, damping: 28, mass: 0.6 });
  const y = useSpring(yRaw, { stiffness: 220, damping: 28, mass: 0.6 });
  const scale = useTransform(x, [-12, 12], [1.015, 1.015]);

  useEffect(() => {
    if (reduced) {
      xRaw.set(0);
      yRaw.set(0);
      return;
    }
    xRaw.set(mouse.inside ? mouse.x * 12 : 0);
    yRaw.set(mouse.inside ? mouse.y * 8 : 0);
  }, [mouse, reduced, xRaw, yRaw]);

  return (
    <article
      ref={cardRef}
      className="grid lg:grid-cols-2 gap-0 overflow-hidden bg-[var(--color-soot)]"
      style={{ viewTransitionName: "gridpulse-card" }}
    >
      {/* left: text */}
      <div
        className="p-8 md:p-12 flex flex-col justify-between"
        style={{ borderRight: "1px solid var(--color-graphite-80)" }}
      >
        <div>
          <Mono variant="label" tone="muted">
            {featuredProject.eyebrow}
          </Mono>
          <h3
            className="mt-5 font-semibold text-[var(--color-bone)]"
            style={{
              fontSize: "var(--text-h1)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-display)",
            }}
          >
            {featuredProject.title}
          </h3>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed max-w-md text-[var(--color-graphite-40)]"
          >
            {featuredProject.summary}
          </p>
          <p
            className="mt-4 text-sm leading-relaxed max-w-md text-[var(--color-graphite-60)]"
          >
            {featuredProject.description}
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {featuredProject.metrics.map((m) => (
            <Mono
              key={m}
              variant="meter"
              className="px-3 py-1.5 border !text-[var(--color-graphite-40)]"
              style={{ borderColor: "var(--color-graphite-80)" }}
            >
              {m}
            </Mono>
          ))}
        </div>
      </div>

      {/* right: parallax mockup */}
      <div className="relative p-6 md:p-10 min-h-[360px] md:min-h-[480px] flex flex-col justify-between overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-6 md:inset-10"
          style={{ x, y, scale }}
        >
          {featuredProject.image ? (
            <div className="relative w-full h-full">
              <Image
                src={featuredProject.image}
                alt={featuredProject.imageAlt ?? featuredProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <FeaturedMockup />
          )}
        </motion.div>

        <div className="relative z-10 flex gap-6 mt-auto pt-6 text-sm">
          <a
            href={featuredProject.caseStudyHref}
            className="font-medium text-[var(--color-signal-blue-soft)] hover:text-[var(--color-bone)] transition-colors"
          >
            Read the case study →
          </a>
          <a
            href={featuredProject.liveHref}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
          >
            Open ↗
          </a>
          <a
            href={featuredProject.codeHref}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
          >
            Source ↗
          </a>
        </div>
      </div>
    </article>
  );
}

function FeaturedMockup() {
  return (
    <div className="relative h-full w-full">
      {/* grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent)",
          backgroundSize: "calc(100% / 8) 100%",
        }}
      />
      <div className="relative z-10 grid grid-cols-2 gap-3 h-full">
        <div
          className="border p-5 flex flex-col justify-between"
          style={{ borderColor: "var(--color-graphite-80)" }}
        >
          <Mono variant="caption" tone="graphite">
            Operating View
          </Mono>
          <div className="flex flex-col gap-2">
            <div
              className="h-16 w-full"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-signal-blue), var(--color-signal-teal))",
              }}
            />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-[var(--color-graphite-80)]" />
              <div className="h-8 bg-[var(--color-graphite-80)]" />
              <div className="h-8 bg-[var(--color-graphite-80)]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="border p-5 flex-1"
            style={{ borderColor: "var(--color-graphite-80)" }}
          >
            <Mono variant="caption" tone="graphite">
              Models
            </Mono>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-graphite-40)]">
              Backtesting, confidence, and scenario analysis.
            </p>
          </div>
          <div
            className="border p-5 flex-1"
            style={{ borderColor: "var(--color-graphite-80)" }}
          >
            <Mono variant="caption" tone="graphite">
              Infra
            </Mono>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-graphite-40)]">
              Cloud Run, caching, scheduled compute.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
