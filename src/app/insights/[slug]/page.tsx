import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Mono } from "@/components/typography/Mono";
import { ReadingProgress } from "@/components/case-study/ReadingProgress";
import { notes, getNote } from "@/content/insights/index";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: `${note.title} — Kristen Martino`,
    description: note.excerpt,
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const { default: Body } = await import(`@/content/insights/${slug}.mdx`);

  return (
    <>
      <ReadingProgress />
      <Nav />
      <main
        id="main"
        className="bg-[var(--color-soot)] min-h-[100svh] pt-32 md:pt-40 pb-20 md:pb-28"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <Link
            href="/insights"
            className="inline-block text-sm text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
          >
            ← All insights
          </Link>

          <header className="mt-10 max-w-3xl">
            <div className="flex items-baseline gap-4">
              <Mono variant="index" tone="muted">
                Insight / {note.index}
              </Mono>
              <Mono variant="caption" tone="muted">
                {dateFormatter.format(new Date(note.date))} · {note.readingMinutes} min read
              </Mono>
            </div>
            <h1
              className="mt-6 font-semibold text-[var(--color-bone)]"
              style={{
                fontSize: "var(--text-h1)",
                letterSpacing: "var(--tracking-display)",
                lineHeight: "var(--leading-tight)",
              }}
            >
              {note.title}
            </h1>
          </header>

          <article className="mt-12 max-w-3xl">
            <Body />
          </article>

          <div className="mt-20 pt-8 border-t border-[var(--color-graphite-90)] max-w-3xl flex items-baseline justify-between">
            <Mono variant="caption" tone="muted">
              End of insight
            </Mono>
            <Link
              href="/insights"
              className="text-sm text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
            >
              All insights →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
