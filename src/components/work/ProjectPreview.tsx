"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AbstractMockup } from "./AbstractMockup";
import { Mono } from "@/components/typography/Mono";
import { EASE, DUR } from "@/lib/motion";
import type { Project } from "@/lib/types";

type ProjectPreviewProps = {
  project: Project | null;
};

export function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <div className="hidden lg:block sticky top-32">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden border"
        style={{ borderColor: "var(--color-graphite-10)" }}
      >
        <AnimatePresence mode="wait">
          {project ? (
            <motion.div
              key={project.index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.fast, ease: EASE.outQuart }}
              className="absolute inset-0"
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              ) : (
                <AbstractMockup
                  shape={project.shape ?? "table"}
                  category={project.category}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.fast, ease: EASE.outQuart }}
              className="absolute inset-0 flex items-center justify-center bg-[var(--color-paper)]"
            >
              <Mono variant="caption" tone="graphite">
                Hover a row.
              </Mono>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-baseline justify-between min-h-[20px]">
        <AnimatePresence mode="wait">
          {project && (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: DUR.fast, ease: EASE.outQuart }}
              className="flex items-baseline justify-between w-full gap-4"
            >
              <Mono variant="caption" tone="graphite">
                {project.category}
              </Mono>
              <Mono variant="caption" tone="graphite">
                {project.year ?? ""} · {project.status?.toUpperCase() ?? ""}
              </Mono>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
