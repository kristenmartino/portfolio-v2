import type { ContactLink, NavItem } from "@/lib/types";

export const site = {
  domain: "kristenmartino.ai",
  email: "hello@kristenmartino.ai",
  metadata: {
    title:
      "Kristen Martino — Strategy, analytics, and applied AI for enterprise environments.",
    description:
      "Independent work at the intersection of strategy, analytics, and applied AI in enterprise environments. Six years operator-seat experience inside enterprise systems.",
  },
  tagline: "Strategy. Analytics. Applied AI.",
  currentFocus:
    "Forecasting and decision-grade AI for operational environments.",
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
  { label: "Email", href: "mailto:hello@kristenmartino.ai", primary: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/kristenmartino" },
  { label: "GitHub", href: "https://github.com/kristenmartino" },
  { label: "Resume", href: "/resume" },
];
