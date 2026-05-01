import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MonoVariant = "label" | "index" | "status" | "meter" | "tag" | "caption";

type MonoProps = {
  children: ReactNode;
  variant?: MonoVariant;
  tone?: "graphite" | "muted" | "ink";
} & Omit<ComponentPropsWithoutRef<"span">, "children">;

const variantClasses: Record<MonoVariant, string> = {
  label: "text-[11px] font-medium tracking-[0.22em] uppercase",
  index: "text-[11px] font-medium tracking-[0.18em] tabular-nums",
  status: "text-[10.5px] font-medium tracking-[0.18em] uppercase",
  meter: "text-xs font-medium tracking-[0.06em] tabular-nums",
  tag: "text-[10.5px] font-medium tracking-[0.18em] uppercase",
  caption: "text-[10.5px] tracking-[0.16em] uppercase",
};

const toneClasses = {
  graphite: "text-[var(--color-graphite-60)]",
  muted: "text-[rgba(255,255,255,0.44)]",
  ink: "text-[var(--color-ink)]",
};

export function Mono({
  children,
  variant = "label",
  tone = "graphite",
  className = "",
  ...rest
}: MonoProps) {
  return (
    <span
      className={`inline-block font-mono ${variantClasses[variant]} ${toneClasses[tone]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
