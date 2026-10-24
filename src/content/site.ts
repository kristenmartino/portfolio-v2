import type { ContactLink, NavItem } from "@/lib/types";

export const site = {
  domain: "kristenmartino.ai",
  email: "kristen@kristenmartino.ai",
  metadata: {
    title:
      "Kristen Martino — Strategy, analytics, and applied AI, informed by enterprise systems work.",
    description:
      "Software projects in document review, forecasting and product prioritization, informed by experience in actuarial analytics, billing, pricing and platform migrations.",
  },
  tagline: "Strategy. Analytics. Applied AI.",
  currentFocus:
    "Forecasting and applied AI for operations-heavy environments.",
  builtWith: ["Next.js 16", "IBM Plex", "Framer Motion", "Vercel"],
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "#contact" },
];

export const sectionOrder = [
  { id: "hero", label: "Overview" },
  { id: "work", label: "Selected Work" },
  { id: "expertise", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:kristen@kristenmartino.ai", primary: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/kristenmartino" },
  { label: "GitHub", href: "https://github.com/kristenmartino" },
];
