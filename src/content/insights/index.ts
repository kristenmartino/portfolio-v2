import type { Note } from "@/lib/types";

export const notes: Note[] = [
  {
    slug: "llm-app-wrong-question",
    index: "01",
    title: "Your AI app can do the math correctly and still answer the wrong question",
    date: "2026-10-26",
    updated: "2026-10-26",
    excerpt:
      "A small test for checking which records and inputs an LLM app actually uses, with manual steps, optional coding-assistant prompts, and a saved query example.",
    readingMinutes: 6,
  },
  {
    slug: "make-extraction-failures-visible",
    index: "02",
    title: "Check the value and its source separately.",
    date: "2026-05-07",
    updated: "2026-10-24",
    excerpt:
      "Tenancy's optional source spans and model-supplied citations show why a working link is only one part of extraction review.",
    readingMinutes: 1,
  },
  {
    slug: "ai-as-thinking-aid",
    index: "03",
    title: "Show what a prioritization score measures.",
    date: "2026-05-07",
    updated: "2026-10-24",
    excerpt:
      "A worked Tarazu calculation: relative 1–100 inputs, an editable confidence assumption, and the fictional Relay decision.",
    readingMinutes: 1,
  },
  {
    slug: "what-aggregators-dedupe-away",
    index: "04",
    title: "Compare the retrieved reporting.",
    date: "2026-05-07",
    updated: "2026-10-24",
    excerpt:
      "How Sift's index and web-search paths shape a coverage comparison, and what an agreement label can establish.",
    readingMinutes: 1,
  },
  {
    slug: "why-most-dashboards-fail",
    index: "05",
    title: "Trace a dashboard value to its denominator.",
    date: "2026-04-22",
    updated: "2026-10-24",
    excerpt:
      "Follow SpecialtyPulse's $104.91 payment from 57 synthetic source rows through service weighting to the displayed result.",
    readingMinutes: 1,
  },
  {
    slug: "decompose-ambiguity",
    index: "06",
    title: "Turn a billing exception into a requirement.",
    date: "2026-03-14",
    updated: "2026-10-24",
    excerpt:
      "How missing order matches and inconsistent identifiers became mapping, validation and reconciliation requirements at RealPage.",
    readingMinutes: 1,
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
