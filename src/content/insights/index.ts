import type { Note } from "@/lib/types";

export const notes: Note[] = [
  {
    slug: "make-extraction-failures-visible",
    index: "01",
    title: "Make extraction failures visible.",
    date: "2026-05-07",
    excerpt:
      "Most \"AI extracts X from documents\" demos quietly hide their failures. The design move that turns an extraction agent into something a domain reviewer would trust is per-cell source attribution.",
    readingMinutes: 3,
  },
  {
    slug: "ai-as-thinking-aid",
    index: "02",
    title: "AI as thinking aid, not calculator.",
    date: "2026-05-07",
    excerpt:
      "Two failure modes dominate AI-augmented decision tools — the calculator that produces output the user cannot defend, and the vanilla tool that doesn't improve on guessing. The middle path is AI inside the user's reasoning.",
    readingMinutes: 3,
  },
  {
    slug: "what-aggregators-dedupe-away",
    index: "03",
    title: "What aggregators dedupe away.",
    date: "2026-05-07",
    excerpt:
      "News aggregators optimize for volume. What the serious reader actually wants is what each source emphasizes that the others omit — exactly what aggregators dedupe away as duplication.",
    readingMinutes: 3,
  },
  {
    slug: "why-most-dashboards-fail",
    index: "04",
    title: "Why analytics dashboards fail to drive decisions.",
    date: "2026-04-22",
    excerpt:
      "The cause is rarely the underlying data. It is the absence of a clearly defined decision the dashboard is intended to support.",
    readingMinutes: 3,
  },
  {
    slug: "decompose-ambiguity",
    index: "05",
    title: "Structured discovery in ambiguous projects.",
    date: "2026-03-14",
    excerpt:
      "Projects that begin in ambiguity benefit from a discipline most teams skip: structured discovery before hypothesis formation.",
    readingMinutes: 4,
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
