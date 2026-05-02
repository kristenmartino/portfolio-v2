export type ProjectMode = "Solo build" | "Cross-functional" | "Concept";
export type ProjectStatus = "Shipped" | "In progress" | "Concept";

export type ArtifactDecisionScore = "met" | "partial" | "unmet";

export type ArtifactDecision = {
  option: string;
  scores: readonly ArtifactDecisionScore[];
  chosen?: boolean;
  rationale?: string;
};

export type ArtifactRequirement = {
  stakeholder: string;
  need: string;
  evidence?: string;
};

export type ArtifactOutcomeMetric = {
  metric: string;
  before?: string;
  after: string;
  note?: string;
};

export type ArtifactOutcome =
  | { kind: "metrics"; items: readonly ArtifactOutcomeMetric[] }
  | { kind: "qualitative"; statement: string };

export type ArtifactPillar = {
  title: string;
  detail: string;
};

export type Artifact = {
  problem: {
    situation: string;
    complication: string;
    question: string;
  };
  requirements: readonly ArtifactRequirement[];
  decisions: {
    criteria: readonly string[];
    options: readonly ArtifactDecision[];
  };
  solution: {
    summary: string;
    pillars: readonly ArtifactPillar[];
  };
  outcome: ArtifactOutcome;
};

export type Project = {
  index: string;
  title: string;
  category: string;
  summary: string;
  description?: string;
  href: string;
  year?: string;
  status?: ProjectStatus;
  mode?: ProjectMode;
  shape?: "data-viz" | "pipeline" | "mobile" | "table" | "decision";
  image?: string;
  imageAlt?: string;
  slug?: string;
  liveHref?: string;
  codeHref?: string;
  metrics?: readonly string[];
  artifact?: Artifact;
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
  year?: string;
  mode?: ProjectMode;
  artifact?: Artifact;
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
