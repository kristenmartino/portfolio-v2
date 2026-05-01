import type { ReactNode } from "react";
import { Mono } from "@/components/typography/Mono";

export function Spec({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-4 py-3 border-b border-[var(--color-graphite-90)]">
      <Mono variant="caption" tone="muted" className="min-w-[120px]">
        {label}
      </Mono>
      <span className="text-sm md:text-base text-[var(--color-graphite-20)]">
        {value}
      </span>
    </div>
  );
}

export function Specs({ children }: { children: ReactNode }) {
  return <div className="my-10 border-t border-[var(--color-graphite-90)]">{children}</div>;
}

export function Quote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="my-12 pl-6 border-l-2 border-[var(--color-signal-blue)]">
      <blockquote className="font-mono text-base md:text-lg leading-snug text-[var(--color-bone)] max-w-2xl">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-3">
          <Mono variant="caption" tone="muted">
            — {attribution}
          </Mono>
        </figcaption>
      )}
    </figure>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-xs md:text-sm text-[var(--color-graphite-60)] italic">
      {children}
    </p>
  );
}

export function Diagram({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-12 border border-[var(--color-graphite-90)] bg-[var(--color-soot)]">
      {title && (
        <div className="border-b border-[var(--color-graphite-90)] px-5 py-3">
          <Mono variant="caption" tone="muted">
            {title}
          </Mono>
        </div>
      )}
      <div className="p-8">{children}</div>
    </figure>
  );
}

export function NodeGraph() {
  return (
    <svg viewBox="0 0 480 220" className="w-full h-auto">
      {/* edges */}
      <line x1={70} y1={110} x2={170} y2={60} stroke="var(--color-graphite-80)" strokeWidth={1} />
      <line x1={70} y1={110} x2={170} y2={160} stroke="var(--color-graphite-80)" strokeWidth={1} />
      <line x1={170} y1={60} x2={290} y2={110} stroke="var(--color-signal-blue)" strokeWidth={1.5} />
      <line x1={170} y1={160} x2={290} y2={110} stroke="var(--color-graphite-80)" strokeWidth={1} />
      <line x1={290} y1={110} x2={400} y2={110} stroke="var(--color-signal-teal)" strokeWidth={1.5} />

      {/* nodes */}
      {[
        { cx: 70, cy: 110, label: "Weather", color: "var(--color-graphite-60)" },
        { cx: 170, cy: 60, label: "Forecasts", color: "var(--color-signal-blue)" },
        { cx: 170, cy: 160, label: "Grid state", color: "var(--color-graphite-60)" },
        { cx: 290, cy: 110, label: "Scenarios", color: "var(--color-signal-blue)" },
        { cx: 400, cy: 110, label: "Decision", color: "var(--color-signal-teal)" },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.cx} cy={n.cy} r={14} fill="var(--color-soot)" stroke={n.color} strokeWidth={1.5} />
          <text
            x={n.cx}
            y={n.cy + 32}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize={10}
            letterSpacing={1}
            fill="var(--color-graphite-40)"
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}
