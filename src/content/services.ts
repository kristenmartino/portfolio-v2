// Services copy. Prices and engagement terms are maintained here.
export const CONTRA_URL = "https://contra.com/kristen_martino_wvu5dgef/";

export type HeadlineKey = "A" | "B";

export type ServiceHeadline = {
  eyebrow: string;
  /** Split so the second clause can take the accent color. */
  headlineLead: string;
  headlineAccent: string;
  sub: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

export type Symptom = {
  key: string;
  index: string;
  /** The "is this you?" statement. */
  statement: string;
  /** Engagement id this symptom routes to. */
  routesTo: string;
  /** Short tag shown on the card. */
  tag: string;
};

export type Engagement = {
  id: string;
  index: string;
  name: string;
  /** Starting price displayed on the engagement card. */
  anchor: string;
  timeline: string;
  cadence: string;
  forWho: string;
  scope: readonly string[];
  deliverable: { title: string; items: readonly string[] };
  cta: string;
};

export type ProofItem = {
  slug: string;
  name: string;
  /** The implementation example illustrated by this project. */
  claim: string;
  detail: string;
  metric: string;
  caseStudyHref: string;
  liveHref: string;
  liveLabel: string;
};

export type ProcessStep = { index: string; title: string; text: string };
export type Faq = { q: string; a: string };

export const activeHeadline: HeadlineKey = "B";
export const headlines: Record<HeadlineKey, ServiceHeadline> = {
  A: {
    eyebrow: "Product and systems review",
    headlineLead: "Review the problem. ", headlineAccent: "Plan the next step.",
    sub: "I review a product workflow, its data and its technical constraints, then write up the findings and recommended changes.",
    ctaPrimary: { label: "See the engagements", href: "#engagements" },
    ctaSecondary: { label: "Discuss a review", href: "#start" },
  },
  B: {
    eyebrow: "Independent product and AI review",
    headlineLead: "Find where your AI feature ", headlineAccent: "needs work.",
    sub: "I review its inputs, outputs and failure handling, then give your team a written assessment with examples and recommended fixes.",
    ctaPrimary: { label: "See the engagements", href: "#engagements" },
    ctaSecondary: { label: "View project examples", href: "#proof" },
  },
};
export const headlineTail: Record<HeadlineKey, string> = { A: "", B: "" };
export const routerHeading = "Where would you start?";
export const routerSub = "Choose the situation closest to yours to highlight a suggested engagement.";
export const symptoms: readonly Symptom[] = [
  { key: "shipped-unsure", index: "A", statement: "We need to review an AI feature that is already running.", routesTo: "reality-check", tag: "Existing feature" },
  { key: "pre-build", index: "B", statement: "We need to assess an AI feature before building it.", routesTo: "full-diagnosis", tag: "Before the build" },
  { key: "stuck-decision", index: "C", statement: "We need to compare options for a product or systems change.", routesTo: "full-diagnosis", tag: "Product decision" },
];
export const engagementsHeading = "Two review scopes.";
export const engagementsSub = "Each includes a written assessment. We agree on the questions, access and scope before work begins.";
export const engagements: readonly Engagement[] = [
  {
    id: "reality-check", index: "01", name: "Reality Check", anchor: "from $1,500", timeline: "~1 week", cadence: "Mostly async",
    forWho: "For a team that wants a focused review of one existing AI feature.",
    scope: ["Review one feature's inputs, outputs and user workflow", "Exercise agreed failure cases and document examples", "Check how users verify or correct the output", "Rank recommended fixes by impact and effort"],
    deliverable: { title: "Feature assessment", items: ["Findings with supporting examples", "Observed failures and likely causes", "Prioritized fixes", "Open questions and testing limits"] },
    cta: "Discuss a Reality Check",
  },
  {
    id: "full-diagnosis", index: "02", name: "Full Diagnosis + Roadmap", anchor: "from $6,000", timeline: "~2 weeks", cadence: "Interviews + async",
    forWho: "For a team deciding what to build or change across a product workflow.",
    scope: ["Interview stakeholders and map the current workflow", "Document requirements, constraints and unresolved questions", "Compare options against agreed criteria", "Sequence the recommended work and dependencies"],
    deliverable: { title: "Assessment and roadmap", items: ["Problem statement and supporting evidence", "Options and tradeoffs", "Proposed implementation sequence", "Summary for the decision owner"] },
    cta: "Discuss a Full Diagnosis",
  },
];
export const proofHeading = "Related projects.";
export const proofSub = "These independent projects show the kind of implementation and review work I do. Each case study states what is built, tested or still pending.";
export const proof: readonly ProofItem[] = [
  { slug: "eval-harness", name: "Eval Harness", claim: "Building a model-comparison framework.", detail: "Python adapters, task modules, held-out data checks and agent replay tests. The benchmark on Sift's real corpus is pending; no model rankings are claimed.", metric: "Harness implemented · corpus benchmark pending", caseStudyHref: "/work/eval-harness", liveHref: "https://evals.kristenmartino.ai", liveLabel: "View the methodology" },
  {
    slug: "cabana",
    name: "Cabana",
    claim: "Request triage with staff approval.",
    detail:
      "A demo pool-service portal where AI classifies requests, staff approve work, and Stripe records test deposits. One failure-injection run produced 50 Airtable records for 50 bookings with no duplicates.",
    metric: "Recorded test: 50/50 Airtable records · no duplicates",
    caseStudyHref: "/work/cabana",
    liveHref: "https://cabana-kristenmartinos-projects.vercel.app",
    liveLabel: "Try the demo",
  },
  { slug: "tarazu", name: "Tarazu", claim: "Relative scores and saved decision reasons.", detail: "The fictional Relay walkthrough links editable scores, supporting and conflicting notes, and a draft decision. Users can copy the reasoning into a decision brief.", metric: "Fictional walkthrough · editable scores", caseStudyHref: "/work/tarazu", liveHref: "https://tarazu.app/demo", liveLabel: "Try the Relay demo" },
];
export const processHeading = "How the review works.";
export const processSteps: readonly ProcessStep[] = [
  { index: "01", title: "Agree on scope", text: "We define the questions, available evidence and access needed for the review." },
  { index: "02", title: "Review and test", text: "I inspect the workflow and supporting code or data, test agreed cases and record what I find." },
  { index: "03", title: "Review the findings", text: "You receive the assessment and recommended next steps, including questions the review could not resolve." },
];
export const faqHeading = "Practical details.";
export const faqs: readonly Faq[] = [
  { q: "What do I receive?", a: "A written assessment with supporting examples, prioritized recommendations and any testing limits. The broader engagement also includes an options comparison and proposed roadmap." },
  { q: "What experience can I review?", a: "The linked projects include source code, demos and implementation notes. They are independent work; test results and pending work are identified in each case study." },
  { q: "Do we need to meet?", a: "A Reality Check is mostly asynchronous. A Full Diagnosis includes stakeholder interviews. We agree on meetings and review time when setting the scope." },
  { q: "What if the issue is in the workflow or data?", a: "I include those findings in the assessment and explain how they affect the feature. Recommendations can include data or process changes." },
  { q: "How do we handle access and data?", a: "We agree on access, permitted tools and data handling before work begins. Read-only access is the starting point; a sample or redacted dataset may be enough for the review." },
];
export const startHeading = "Describe what you need reviewed.";
export const startSub = "Send a brief description of the feature or decision, the problem you are seeing and your timeline.";
export const startLinks = {
  contra: { label: "Start on Contra", href: CONTRA_URL, primary: true },
  email: { label: "kristen@kristenmartino.ai", href: "mailto:kristen@kristenmartino.ai?subject=Diagnosis%20inquiry" },
} as const;
export const servicesMeta = { title: "Work with me — Product and AI review · Kristen Martino", description: "Scoped reviews of AI features and product workflows, with supporting examples, prioritized fixes and implementation plans." } as const;
