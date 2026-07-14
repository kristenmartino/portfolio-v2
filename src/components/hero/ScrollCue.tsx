import { Mono } from "@/components/typography/Mono";

/** Bottom-left scroll indicator: mono label + pulsing hairline. */
export function ScrollCue() {
  return (
    <div className="flex flex-col items-start gap-3">
      <Mono variant="caption" tone="muted">
        scroll · 01 / 05
      </Mono>
      <span
        aria-hidden
        className="scroll-cue-line block w-px h-6 bg-[var(--color-graphite-40)]"
      />
    </div>
  );
}
