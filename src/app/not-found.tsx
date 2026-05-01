import Link from "next/link";
import { Mono } from "@/components/typography/Mono";

export default function NotFound() {
  return (
    <main
      id="main"
      className="min-h-[100svh] flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto w-full"
    >
      <Mono variant="label" tone="muted">
        404 / Page Not Found
      </Mono>
      <h1
        className="mt-6 font-semibold text-[var(--color-bone)]"
        style={{
          fontSize: "var(--text-h1)",
          letterSpacing: "var(--tracking-display)",
          lineHeight: "var(--leading-tight)",
        }}
      >
        The page you requested
        <br />
        <span className="text-[var(--color-signal-blue-soft)]">
          is unavailable.
        </span>
      </h1>
      <p className="mt-6 text-base md:text-lg leading-relaxed max-w-md text-[var(--color-graphite-40)]">
        Please return to the homepage, or use the contact form if you believe
        this link should resolve.
      </p>
      <div className="mt-10 flex gap-3">
        <Link
          href="/"
          className="px-6 py-3.5 text-sm font-medium bg-[var(--color-signal-blue)] text-[var(--color-bone)] hover:bg-[var(--color-signal-blue-deep)] transition-colors"
        >
          Return home
        </Link>
        <Link
          href="/#contact"
          className="px-6 py-3.5 text-sm border border-white/20 text-[var(--color-graphite-20)] hover:bg-white/5 hover:border-white/40 transition-colors"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
