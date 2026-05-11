import type { Pillar } from "@/lib/types";

export const about = {
  heading:
    "I'm most at home in ambiguity, in the space before the structure exists.",
  bio: "A decade inside enterprise systems — three years actuarial analytics, then operator seats covering billing, pricing, fare logic, and platform migrations, where systems had to keep working under load. Recent independent work — Valuate, Tarazu, Sift, FocusForge, GridPulse — applies that approach to AI products.",
  pullQuote:
    "I'll take the messy thing nobody wants to touch, break it apart, and make it work.",
  tags: ["Product strategy", "Business analysis", "Applied AI"],
} as const;

export const pillars: Pillar[] = [
  {
    title: "Diagnose first.",
    text: "I reduce ambiguity early so teams can move with more confidence and less noise.",
  },
  {
    title: "Design for trust.",
    text: "If people don't actually use it, the work isn't done.",
  },
  {
    title: "Ship the proof.",
    text: "I care about what people actually use. The demo isn't the deliverable.",
  },
];
