import type { Note } from "@/lib/types";

export const notes: Note[] = [
  {
    slug: "make-extraction-failures-visible",
    index: "01",
    title: "Make extracted values easy to check.",
    date: "2026-05-07",
    excerpt:
      "A document-review interface needs a clear path from each extracted value back to its source.",
    readingMinutes: 1,
  },
  {
    slug: "ai-as-thinking-aid",
    index: "02",
    title: "Keep prioritization inputs open to review.",
    date: "2026-05-07",
    excerpt:
      "How I separate AI suggestions from the inputs and calculations behind a product ranking.",
    readingMinutes: 1,
  },
  {
    slug: "what-aggregators-dedupe-away",
    index: "03",
    title: "Comparing coverage while keeping the sources.",
    date: "2026-05-07",
    excerpt:
      "The tradeoff between grouping related reporting and preserving differences between individual articles.",
    readingMinutes: 1,
  },
  {
    slug: "why-most-dashboards-fail",
    index: "04",
    title: "Start a dashboard with a review question.",
    date: "2026-04-22",
    excerpt:
      "A worked example of choosing views around a question, plus why daily usage is not a universal success measure.",
    readingMinutes: 1,
  },
  {
    slug: "decompose-ambiguity",
    index: "05",
    title: "Write down the observation before choosing a fix.",
    date: "2026-03-14",
    excerpt:
      "A hypothetical example of separating an observation, a question and a proposed intervention.",
    readingMinutes: 1,
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
