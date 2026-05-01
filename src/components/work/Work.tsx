"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "@/components/section/Section";
import { Mono } from "@/components/typography/Mono";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectRow } from "./ProjectRow";
import { ProjectPreview } from "./ProjectPreview";
import { projects } from "@/content/work";
import { EASE, DUR } from "@/lib/motion";
import type { Project } from "@/lib/types";

export function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section id="work" index="02" label="Selected Work" variant="paper">
      <div className="flex items-end justify-between gap-8 mb-10 md:mb-14">
        <div className="max-w-2xl">
          <h2
            className="font-semibold text-[var(--color-ink)]"
            style={{
              fontSize: "var(--text-h2)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Selected projects.
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-graphite-60)] max-w-xl">
            Independent builds exploring strategy, analytics, and applied AI in
            enterprise and operational contexts.
          </p>
        </div>
      </div>

      <FeaturedProject />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: DUR.slow, ease: EASE.outExpo }}
        className="mt-16 md:mt-24 grid lg:grid-cols-[1fr_minmax(280px,420px)] gap-12 lg:gap-16"
      >
        <div>
          <div className="flex items-baseline justify-between border-b pb-3 mb-1" style={{ borderColor: "var(--color-graphite-20)" }}>
            <Mono variant="caption" tone="graphite">
              All Work
            </Mono>
            <Mono variant="caption" tone="graphite">
              {String(projects.length).padStart(2, "0")} projects
            </Mono>
          </div>
          <div onMouseLeave={() => setActive(null)}>
            {projects.map((project, i) => (
              <ProjectRow
                key={project.title}
                project={project}
                i={i}
                active={active?.index === project.index}
                onActivate={setActive}
                onDeactivate={() => setActive(null)}
              />
            ))}
          </div>
        </div>
        <ProjectPreview project={active} />
      </motion.div>
    </Section>
  );
}
