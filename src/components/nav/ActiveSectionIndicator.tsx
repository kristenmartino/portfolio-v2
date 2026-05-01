"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { Mono } from "@/components/typography/Mono";
import { sectionOrder } from "@/content/site";

const sectionIds: readonly string[] = sectionOrder.map((s) => s.id);
const totalLabel = String(sectionOrder.length).padStart(2, "0");

export function ActiveSectionIndicator() {
  const active = useActiveSection(sectionIds);
  const idx = sectionIds.indexOf(active);
  const safeIdx = idx === -1 ? 0 : idx;
  const current = sectionOrder[safeIdx]!;
  const indexLabel = String(safeIdx + 1).padStart(2, "0");

  return (
    <Mono variant="caption" tone="muted" aria-live="polite">
      {current.label.toUpperCase()} · {indexLabel} / {totalLabel}
    </Mono>
  );
}
