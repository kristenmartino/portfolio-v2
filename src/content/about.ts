import type { Pillar } from "@/lib/types";

export const about = {
  heading: "An operator's approach.",
  bio: "Six years embedded in enterprise teams — billing, pricing, fare logic, platform migrations — where systems had to keep working under load. Recent independent work brings the same operational rigor to applied AI and decision-support products.",
  pullQuote:
    "Durable systems are systems stakeholders can explain, audit, and operate with confidence.",
  tags: ["Product strategy", "Business analysis", "Applied AI"],
} as const;

export const pillars: Pillar[] = [
  {
    title: "Diagnose first.",
    text: "Work begins with structured discovery — defining the actual question before solutioning.",
  },
  {
    title: "Design for trust.",
    text: "Systems endure when stakeholders can explain, audit, and operate them with confidence.",
  },
  {
    title: "Ship the proof.",
    text: "The deliverable is the operational result — not the deck, not the prototype.",
  },
];
