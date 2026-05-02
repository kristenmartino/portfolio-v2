import { Mono } from "@/components/typography/Mono";

export function DeepDiveDivider({ label = "Deep dive" }: { label?: string }) {
  return (
    <div
      role="separator"
      aria-label={label}
      className="bg-[var(--color-soot)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center gap-4 py-8">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-[var(--color-graphite-80)]"
          />
          <Mono variant="label" tone="muted">
            {label}
          </Mono>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--color-graphite-80)]"
          />
        </div>
      </div>
    </div>
  );
}
