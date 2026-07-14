"use client";

import { useState } from "react";
import { Section } from "@/components/section/Section";
import { Mono } from "@/components/typography/Mono";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectRow } from "./ProjectRow";
import { ProjectPreview } from "./ProjectPreview";
import { projects } from "@/content/work";
import type { Project } from "@/lib/types";

export function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section id="work" index="02" label="Selected Work" variant="paper">
      <div className="flex items-end justify-between gap-8 mb-10 md:mb-14">
        <div className="max-w-2xl">
          <RevealHeading
            className="text-[var(--color-ink)]"
            style={{
              fontSize: "var(--text-h2)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Selected projects.
          </RevealHeading>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-graphite-60)] max-w-xl">
            Independent builds in strategy, analytics, and applied AI for
            enterprise and operational contexts.
          </p>
        </div>
      </div>

      {/* deliberate frame break: the dark card bleeds to the viewport edge on lg+ */}
      <div className="lg:-mr-16 min-[1440px]:mr-[calc((1440px-100vw)/2-4rem)]">
        <FeaturedProject />
      </div>

      <div className="mt-16 md:mt-24 grid lg:grid-cols-[1fr_minmax(280px,420px)] gap-12 lg:gap-16">
        <div>
          <div
            className="flex items-baseline justify-between border-b pb-3 mb-1"
            style={{ borderColor: "var(--color-graphite-20)" }}
          >
            <Mono variant="caption" tone="graphite">
              All Work
            </Mono>
            <Mono variant="caption" tone="graphite">
              {String(projects.length).padStart(2, "0")} projects
            </Mono>
          </div>
          <div
            onMouseLeave={() => setActive(null)}
            className="grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3.5rem_minmax(0,1.4fr)_minmax(0,1fr)_auto] gap-x-4 md:gap-x-6"
          >
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
      </div>
    </Section>
  );
}
