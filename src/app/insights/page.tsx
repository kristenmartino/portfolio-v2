import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Mono } from "@/components/typography/Mono";
import { notes } from "@/content/insights/index";

export const metadata: Metadata = {
  title: "Insights — Kristen Martino",
  description:
    "Perspectives on enterprise strategy, analytics, and applied AI from current and recent engagements.",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export default function InsightsIndex() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="bg-[var(--color-soot)] min-h-[100svh] pt-32 md:pt-40 pb-20 md:pb-28"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <Mono variant="label" tone="muted">
              Insights
            </Mono>
            <h1
              className="mt-6 font-semibold text-[var(--color-bone)]"
              style={{
                fontSize: "var(--text-h1)",
                letterSpacing: "var(--tracking-display)",
                lineHeight: "var(--leading-tight)",
              }}
            >
              Perspectives on
              <br />
              <span className="text-[var(--color-signal-blue-soft)]">
                enterprise systems.
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed max-w-xl text-[var(--color-graphite-40)]">
              Short pieces on strategy, analytics, and applied AI in
              enterprise environments.
            </p>
          </div>

          <ul className="mt-16 md:mt-20 border-t border-[var(--color-graphite-90)]">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link
                  href={`/insights/${note.slug}`}
                  className="group grid grid-cols-[3rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] items-baseline gap-4 md:gap-8 py-7 md:py-9 border-b border-[var(--color-graphite-90)] hover:border-[var(--color-graphite-60)] transition-colors"
                >
                  <Mono variant="index" tone="muted">
                    {note.index}
                  </Mono>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-bone)] tracking-[-0.01em] group-hover:translate-x-1 transition-transform duration-300">
                      {note.title}
                    </h2>
                    <p className="mt-2 text-sm md:text-base leading-snug text-[var(--color-graphite-40)] max-w-xl">
                      {note.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right">
                    <Mono variant="caption" tone="muted">
                      {dateFormatter.format(new Date(note.date))}
                    </Mono>
                    <Mono variant="caption" tone="muted">
                      {note.readingMinutes} min read
                    </Mono>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
