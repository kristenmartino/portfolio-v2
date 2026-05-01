"use client";

import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Mono } from "@/components/typography/Mono";
import { sectionOrder } from "@/content/site";

const sectionIds: readonly string[] = sectionOrder.map((s) => s.id);
const totalLabel = String(sectionOrder.length).padStart(2, "0");

function routeLabel(pathname: string): string | null {
  if (pathname === "/" || pathname === "") return null;
  if (pathname.startsWith("/insights")) return "INSIGHTS";
  if (pathname.startsWith("/work/")) return "CASE STUDY";
  if (pathname === "/work") return "WORK";
  return pathname.replace(/^\//, "").toUpperCase();
}

export function ActiveSectionIndicator() {
  const pathname = usePathname() ?? "/";
  const active = useActiveSection(pathname === "/" ? sectionIds : []);

  const offRouteLabel = routeLabel(pathname);
  if (offRouteLabel) {
    return (
      <Mono variant="caption" tone="muted" aria-live="polite">
        {offRouteLabel}
      </Mono>
    );
  }

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
