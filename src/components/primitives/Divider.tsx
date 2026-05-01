type DividerProps = {
  light?: boolean;
  className?: string;
};

export function Divider({ light, className = "" }: DividerProps) {
  return (
    <div
      className={`w-full h-px ${className}`}
      style={{
        backgroundColor: light ? "rgba(255,255,255,0.1)" : "var(--color-graphite-10)",
      }}
    />
  );
}
