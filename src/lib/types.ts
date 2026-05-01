export type ProjectMode = "Solo build" | "Cross-functional" | "Concept";
export type ProjectStatus = "Shipped" | "In progress" | "Concept";

export type Project = {
  index: string;
  title: string;
  category: string;
  summary: string;
  href: string;
  year?: string;
  status?: ProjectStatus;
  mode?: ProjectMode;
  shape?: "data-viz" | "pipeline" | "mobile" | "table" | "decision";
  image?: string;
  imageAlt?: string;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  metrics: string[];
  liveHref: string;
  codeHref: string;
  caseStudyHref: string;
  image?: string;
  imageAlt?: string;
};

export type Expertise = {
  number: string;
  title: string;
  text: string;
};

export type Pillar = {
  title: string;
  text: string;
};

export type Note = {
  slug: string;
  index: string;
  title: string;
  date: string;
  excerpt: string;
  readingMinutes: number;
};

export type NavItem = {
  label: string;
  href: string;
};

export type ContactLink = {
  label: string;
  href: string;
  primary?: boolean;
};

export type SectionVariant = "ink" | "soot" | "paper";
