import type { Project } from "@/lib/types";
import { Mono } from "@/components/typography/Mono";

type ShapeProps = {
  shape: NonNullable<Project["shape"]>;
  category?: string;
};

export function AbstractMockup({ shape, category }: ShapeProps) {
  return (
    <div className="relative h-full w-full bg-[var(--color-soot)] overflow-hidden">
      {/* grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent)",
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />

      <div className="absolute top-4 left-4 right-4 flex items-baseline justify-between">
        <Mono variant="caption" tone="muted">
          {category ?? shape.toUpperCase()}
        </Mono>
        <Mono variant="caption" tone="muted">
          {shape.toUpperCase()}
        </Mono>
      </div>

      <div className="absolute inset-0 p-10 pt-12 flex items-center justify-center">
        {shape === "data-viz" && <DataViz />}
        {shape === "pipeline" && <Pipeline />}
        {shape === "mobile" && <Mobile />}
        {shape === "table" && <Table />}
        {shape === "decision" && <Decision />}
      </div>
    </div>
  );
}

function DataViz() {
  const bars = [38, 56, 42, 78, 64, 90, 72, 84, 60];
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <g>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={8 + i * 21}
            y={120 - h}
            width={14}
            height={h}
            fill={i === 5 ? "var(--color-signal-blue)" : "var(--color-graphite-80)"}
          />
        ))}
      </g>
      <polyline
        fill="none"
        stroke="var(--color-signal-teal)"
        strokeWidth={1.5}
        points="14,80 35,68 56,72 77,52 98,58 119,30 140,40 161,28 182,46"
      />
      {[80, 68, 72, 52, 58, 30, 40, 28, 46].map((y, i) => (
        <circle
          key={i}
          cx={14 + i * 21}
          cy={y}
          r={2}
          fill="var(--color-signal-teal)"
        />
      ))}
    </svg>
  );
}

function Pipeline() {
  return (
    <svg viewBox="0 0 220 120" className="w-full h-full">
      {/* nodes */}
      {[
        { x: 18, label: "INGEST" },
        { x: 84, label: "TRANSFORM" },
        { x: 150, label: "INDEX" },
      ].map((n, i) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y={48}
            width={56}
            height={24}
            fill="none"
            stroke={i === 1 ? "var(--color-signal-blue)" : "var(--color-graphite-80)"}
            strokeWidth={1}
          />
          <text
            x={n.x + 28}
            y={62}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize={6}
            letterSpacing={0.5}
            fill="var(--color-graphite-40)"
          >
            {n.label}
          </text>
        </g>
      ))}
      {/* connectors */}
      <line x1={74} y1={60} x2={84} y2={60} stroke="var(--color-graphite-80)" strokeWidth={1} />
      <line x1={140} y1={60} x2={150} y2={60} stroke="var(--color-graphite-80)" strokeWidth={1} />
      {/* output */}
      <circle cx={210} cy={60} r={4} fill="var(--color-signal-teal)" />
      <line x1={206} y1={60} x2={206} y2={60} />
      <line x1={196} y1={60} x2={206} y2={60} stroke="var(--color-signal-teal)" strokeWidth={1} />
      {/* fan-in lines */}
      <line x1={6} y1={36} x2={18} y2={54} stroke="var(--color-graphite-80)" strokeWidth={0.5} />
      <line x1={6} y1={60} x2={18} y2={60} stroke="var(--color-graphite-80)" strokeWidth={0.5} />
      <line x1={6} y1={84} x2={18} y2={66} stroke="var(--color-graphite-80)" strokeWidth={0.5} />
    </svg>
  );
}

function Mobile() {
  return (
    <svg viewBox="0 0 120 200" className="h-full">
      <rect
        x={6}
        y={6}
        width={108}
        height={188}
        rx={14}
        fill="var(--color-graphite-90)"
        stroke="var(--color-graphite-80)"
        strokeWidth={1}
      />
      <rect x={48} y={12} width={24} height={4} rx={2} fill="var(--color-graphite-80)" />
      {/* hero card */}
      <rect x={16} y={28} width={88} height={48} fill="var(--color-soot)" />
      <rect x={20} y={34} width={32} height={3} fill="var(--color-signal-blue)" />
      <rect x={20} y={42} width={56} height={2} fill="var(--color-graphite-80)" />
      <rect x={20} y={47} width={40} height={2} fill="var(--color-graphite-80)" />
      <circle cx={92} cy={64} r={6} fill="none" stroke="var(--color-signal-teal)" strokeWidth={1} />
      {/* list rows */}
      {[88, 104, 120, 136, 152, 168].map((y) => (
        <g key={y}>
          <rect x={16} y={y} width={88} height={10} fill="none" stroke="var(--color-graphite-80)" strokeWidth={0.5} />
          <rect x={20} y={y + 3} width={28} height={2} fill="var(--color-graphite-60)" />
          <rect x={86} y={y + 3} width={14} height={2} fill="var(--color-graphite-80)" />
        </g>
      ))}
    </svg>
  );
}

function Table() {
  const rows = 6;
  const cols = 4;
  const accentRow = 2;
  return (
    <svg viewBox="0 0 220 120" className="w-full h-full">
      {/* header */}
      <rect x={0} y={0} width={220} height={14} fill="none" stroke="var(--color-graphite-80)" strokeWidth={0.5} />
      {Array.from({ length: cols }).map((_, c) => (
        <rect
          key={`h${c}`}
          x={4 + c * 54}
          y={4}
          width={20}
          height={2}
          fill="var(--color-graphite-60)"
        />
      ))}
      {Array.from({ length: rows }).map((_, r) => (
        <g key={r}>
          <line
            x1={0}
            x2={220}
            y1={14 + (r + 1) * 16}
            y2={14 + (r + 1) * 16}
            stroke="var(--color-graphite-80)"
            strokeWidth={0.4}
          />
          {Array.from({ length: cols }).map((_, c) => (
            <rect
              key={`r${r}c${c}`}
              x={4 + c * 54}
              y={20 + r * 16}
              width={28 + ((r + c) % 3) * 8}
              height={2}
              fill={
                r === accentRow && c === 1
                  ? "var(--color-signal-blue)"
                  : "var(--color-graphite-80)"
              }
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function Decision() {
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      {/* edges */}
      <line x1={40} y1={70} x2={100} y2={36} stroke="var(--color-graphite-80)" strokeWidth={0.6} />
      <line x1={40} y1={70} x2={100} y2={104} stroke="var(--color-graphite-80)" strokeWidth={0.6} />
      <line x1={100} y1={36} x2={170} y2={70} stroke="var(--color-signal-blue)" strokeWidth={1} />
      <line x1={100} y1={104} x2={170} y2={70} stroke="var(--color-graphite-80)" strokeWidth={0.6} />
      <line x1={100} y1={36} x2={100} y2={104} stroke="var(--color-graphite-80)" strokeWidth={0.4} strokeDasharray="2 3" />

      {/* nodes */}
      {[
        { cx: 40, cy: 70, fill: "var(--color-graphite-60)" },
        { cx: 100, cy: 36, fill: "var(--color-signal-blue)" },
        { cx: 100, cy: 104, fill: "var(--color-graphite-60)" },
        { cx: 170, cy: 70, fill: "var(--color-signal-teal)" },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={8} fill="var(--color-soot)" stroke={n.fill} strokeWidth={1.2} />
          <circle cx={n.cx} cy={n.cy} r={2} fill={n.fill} />
        </g>
      ))}
    </svg>
  );
}
