import type { Note } from "@/lib/types";

export const notes: Note[] = [
  {
    slug: "why-most-dashboards-fail",
    index: "01",
    title: "Why analytics dashboards fail to drive decisions.",
    date: "2026-04-22",
    excerpt:
      "The cause is rarely the underlying data. It is the absence of a clearly defined decision the dashboard is intended to support.",
    readingMinutes: 3,
  },
  {
    slug: "decompose-ambiguity",
    index: "02",
    title: "Structured discovery in ambiguous engagements.",
    date: "2026-03-14",
    excerpt:
      "Engagements that begin in ambiguity benefit from a discipline most teams skip: structured discovery before hypothesis formation.",
    readingMinutes: 4,
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
