"use client";

import type { Project } from "@/lib/types";
import { Mono } from "@/components/typography/Mono";

type ProjectRowProps = {
  project: Project;
  i: number;
  active: boolean;
  onActivate: (project: Project) => void;
  onDeactivate: () => void;
};

export function ProjectRow({
  project,
  active,
  onActivate,
  onDeactivate,
}: ProjectRowProps) {
  const isExternal = project.href.startsWith("http");

  return (
    <a
      href={project.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      onMouseEnter={() => onActivate(project)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(project)}
      onBlur={onDeactivate}
      className="group relative grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3.5rem_1.4fr_1fr_auto] items-baseline gap-4 md:gap-8 py-5 md:py-7 border-b transition-colors"
      style={{
        borderColor: active
          ? "var(--color-graphite-20)"
          : "var(--color-graphite-10)",
      }}
    >
      <span
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-0 bg-[var(--color-signal-blue)] transition-all duration-300 group-hover:h-[calc(100%-1.5rem)]"
      />
      <Mono variant="index" tone="graphite">
        {project.index}
      </Mono>
      <span className="flex items-baseline gap-3 min-w-0">
        <span className="text-base md:text-xl font-medium tracking-[-0.01em] text-[var(--color-ink)] transition-transform duration-300 group-hover:translate-x-1 truncate">
          {project.title}
        </span>
      </span>
      <span className="hidden md:block text-sm leading-snug text-[var(--color-graphite-60)] max-w-md">
        {project.summary}
      </span>
      <span className="flex items-center gap-3">
        <Mono variant="caption" tone="graphite">
          {project.category}
        </Mono>
        <span
          aria-hidden
          className="hidden md:inline-block text-[var(--color-graphite-60)] transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </a>
  );
}
