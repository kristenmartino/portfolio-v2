import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  light?: boolean;
};

export function Tag({ children, light }: TagProps) {
  return (
    <span
      className="px-3 py-1.5 text-[10.5px] font-mono tracking-[0.18em] uppercase border"
      style={{
        borderColor: light ? "var(--color-graphite-80)" : "var(--color-graphite-20)",
        color: light ? "var(--color-graphite-40)" : "var(--color-graphite-60)",
      }}
    >
      {children}
    </span>
  );
}
