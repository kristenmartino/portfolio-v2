import type {
  Artifact,
  FeaturedProject,
  Project,
  ProjectMode,
} from "@/lib/types";

export const featuredProjectCardCopy = {
  summary:
    "A data app that flags Medicare providers with unusually high costs or service volumes relative to peers in the same specialty and state.",
  description:
    "Uses 2023 Medicare Part B/D data with an April 2026 provider-registry snapshot. Built with Snowflake and dbt, with source and methodology documentation.",
} as const;

export const featuredProject: FeaturedProject = {
  slug: "medicare-provider-outliers",
  title: "Medicare Provider Outliers",
  eyebrow: "Case Study / Medicare Provider Outliers",
  summary:
    "Provider cost and volume comparisons using 2023 Medicare Part B/D data and the April 2026 NPPES registry, modeled in Snowflake/dbt across 43.7M source rows.",
  description:
    "2023 Medicare Part B and D data joined to the April 2026 NPPES registry, modeled in Snowflake with dbt. A public data app supports provider review, with model lineage and tests in the dbt documentation.",
  metrics: [
    "2023 Part B/D · April 2026 NPPES",
    "43.7M rows · 3 CMS sources",
    "59 defined dbt checks",
    "9,490 peer groups · MAD + z-score",
  ],
  liveHref: "https://kristenmartino.github.io/medicare-provider-outliers/app/",
  codeHref: "https://github.com/kristenmartino/medicare-provider-outliers",
  caseStudyHref: "/work/medicare-provider-outliers",
  year: "2026",
  mode: "Solo build",
  image: "/work/medicare-outliers.png",
  imageAlt:
    "Medicare Provider Outliers data app — state choropleth of MAD outlier rates with a ranked state table",
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Cabana",
    category: "Ops Automation + AI",
    shareDescription:
      "Fictional pool-service demo with Stripe test payments. AI can open a $75 test deposit before staff approval; staff assign visit times.",
    summary:
      "A pool-service demo for reporting problems and tracking repairs. AI can route a repair to a fixed $75 test deposit step before staff approval; staff approve work and assign visit times.",
    href: "/work/cabana",
    slug: "cabana",
    liveHref: "https://cabana-kristenmartinos-projects.vercel.app",
    liveLabel: "Try the demo",
    codeHref: "https://github.com/kristenmartino/cabana",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "pipeline",
    image: "/work/cabana-architecture-dark.png",
    imageAlt:
      "Cabana system architecture: Next.js, Supabase Postgres and four edge functions. n8n updates Airtable and calls the private telegram-notify function; Resend supplies operational alert fallback.",
    metrics: [
      "$75 Stripe test deposits",
      "Telegram approval and scheduling",
      "Airtable completion and visit notes",
      "20 evidence checks · one demo run",
    ],
  },
  {
    index: "02",
    title: "SpecialtyPulse Pipeline",
    category: "Healthcare Data Platform",
    shareDescription:
      "A working prototype for healthcare-software sales research, with traceable reimbursement comparisons, fictional account-discovery examples and downloadable briefs.",
    summary:
      "A working prototype for healthcare-software sales research, with traceable reimbursement comparisons, fictional account-discovery examples and downloadable briefs.",
    href: "/work/specialtypulse-pipeline",
    slug: "specialtypulse-pipeline",
    liveHref: "https://specialtypulse.kristenmartino.ai/?view=procedure&specialty=Dermatology&hcpcs=99213&year=2023",
    liveLabel: "Try the worked example",
    codeHref: "https://github.com/kristenmartino/specialtypulse_pipeline",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "pipeline",
    image: "/work/specialtypulse-review-2026-10-26.png",
    imageAlt:
      "SpecialtyPulse Procedure Detail for Dermatology / HCPCS 99213, comparing a generated 2022 scenario with synthetic 2023 records: $104.91 across 3,777 services in 2023.",
    metrics: [
      "Analyst → sales or operations lead",
      "Downloadable review packets",
      "Reproducible payment calculations",
      "870 reconciled rows · synthetic data",
    ],
  },
  {
    index: "03",
    title: "Valuate",
    category: "Financial Analysis",
    summary:
      "Explore company valuations from SEC 10-K filings. Review extracted figures and source details, correct flagged values, and compare estimates under different assumptions.",
    href: "/work/valuate",
    slug: "valuate",
    liveHref: "https://valuate.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/valuate",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "pipeline",
    image: "/work/valuate.png",
    imageAlt:
      "Valuate's current company selector, with a ticker field, sample companies and a note about extraction failures and model fit.",
    metrics: [
      "18 sample tickers · 5 model categories",
      "SEC XBRL + AI fallback",
      "42/43 evaluated fields · May 2026",
      "Source details + flagged-value corrections",
    ],
  },
  {
    index: "04",
    title: "Tenancy",
    category: "Lease Extraction & Review",
    summary:
      "A live lease-review demo that extracts nine sections, puts flagged values beside the source PDF, and keeps extraction status separate from review decisions.",
    href: "/work/tenancy",
    slug: "tenancy",
    liveHref: "https://tenancy.kristenmartino.ai",
    liveLabel: "Open live demo",
    codeHref: "https://github.com/kristenmartino/tenancy-api",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "pipeline",
    image: "/work/tenancy.png",
    imageAlt:
      "Tenancy's live lease review screen with the source PDF beside eight review items, four open blockers, and a separate Extraction complete label.",
    metrics: [
      "9 lease sections",
      "Review queue + saved corrections",
      "Source links + highlights when available",
      "6 MCP tools · shared backend",
    ],
  },
  {
    index: "05",
    title: "Eval Harness",
    category: "Applied LLM Evaluation",
    shareDescription:
      "Development baseline: 79.8% agreement with model-assigned labels on 400 articles. Human review and final held-out comparison are pending.",
    summary:
      "A model-evaluation framework with a first categorization development result on 400 Sift articles. Reports agreement with stored model labels; human label review and the final held-out comparison remain pending.",
    href: "/work/eval-harness",
    slug: "eval-harness",
    liveHref: "https://evals.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/eval-harness",
    year: "2026",
    status: "In progress",
    mode: "Solo build",
    shape: "data-viz",
    image: "/work/eval-harness.png",
    imageAlt:
      "Eval Harness live site, captured October 24, 2026: a 400-article development agreement baseline, model-assigned reference labels, and an unevaluated 100-item holdout.",
    metrics: [
      "400 real development articles",
      "319/400 stored-label matches · 79.8%",
      "Model-assigned labels · human review pending",
      "100 held out · unevaluated",
      "Full model and cost comparison pending",
    ],
  },
  {
    index: "06",
    title: "Quantization Study",
    category: "Applied LLM Research",
    summary:
      "A study comparing 16-bit, 8-bit, and 4-bit versions of Llama 3.1 8B for output quality, token-generation speed, and model footprint. Tests cover knowledge questions and extracting names, organizations, and locations from text.",
    href: "/work/llm-quantization-study",
    slug: "llm-quantization-study",
    codeHref: "https://github.com/kristenmartino/llm-quantization-study",
    year: "2026",
    status: "Completed study",
    mode: "Solo build",
    shape: "data-viz",
    image: "/work/quantization-pareto-4x3.png",
    imageAlt:
      "Plots comparing token-generation speed with MMLU accuracy and custom extraction micro-F1 for FP16, Q8_0 and Q4_K_M, with confidence intervals.",
    metrics: [
      "2,400 recorded outputs; 799 paired test items",
      "Paired comparisons with Holm correction",
      "Q8_0 within ±1pp of FP16 on tested tasks",
      "Q4_K_M extraction micro-F1: −3.2pp vs FP16 (adjusted p=0.032)",
    ],
  },
  {
    index: "07",
    title: "GridPulse",
    category: "Electricity Demand Forecast Review",
    summary:
      "I led product direction and delivery for GridPulse, a live tool for reviewing electricity demand forecasts, observed error, and data quality across 51 US balancing authorities.",
    href: "/work/gridpulse",
    slug: "gridpulse",
    liveHref: "https://gridpulse.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/gridpulse",
    year: "2024",
    status: "Live application",
    shape: "data-viz",
    image: "/work/gridpulse-evidence-2026-10-25.jpg",
    imageAlt:
      "GridPulse Overview for Florida (FPL), showing the published forecast, next demand peak, and source-specific error context.",
    metrics: [
      "51 balancing authorities",
      "Published forecast + observed error",
      "Separate training evaluations",
      "Live dashboard + read-only API",
    ],
  },
  {
    index: "08",
    title: "Tarazu",
    category: "Product + AI",
    summary:
      "Tarazu lets users compare product options and save the evidence, assumptions and reasoning behind a decision. Its fictional Relay demo follows a team proposing a checklist test before building approval reminders.",
    href: "/work/tarazu",
    slug: "tarazu",
    liveHref: "https://tarazu.app/demo",
    liveLabel: "Try the Relay demo",
    codeHref: "https://github.com/kristenmartino/Tarazu",
    year: "2024–2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "decision",
    image: "/work/tarazu-relay.png",
    imageAlt:
      "Tarazu Relay demo on the Evidence step, showing conflicting fictional notes about overlooked approvals and missing documents.",
    metrics: [
      "Fictional Relay walkthrough",
      "Evidence + decision records",
      "Copyable Markdown brief",
      "Guest work · sign-in for AI",
    ],
  },
  {
    index: "09",
    title: "Sift",
    category: "AI News + Civic Literacy",
    summary:
      "A news app with AI summaries and side-by-side coverage comparisons. Readers can open the original reporting, read background explainers and term definitions, and explore sourced reference pages about people, organizations, and legislation mentioned in stories.",
    href: "/work/sift",
    slug: "sift",
    liveHref: "https://siftnews.io/",
    codeHref: "https://github.com/kristenmartino/sift",
    year: "2024–2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "table",
    image: "/work/sift-news-feed-4x3.png",
    imageAlt:
      "Sift news feed with a grouped Top Stories item, links to original articles and attributed outlet ratings.",
    metrics: [
      "10 categories · curated outlet registry",
      "Topic search + multi-source compare",
      "Reference pages · explainers · term definitions",
      "FastAPI + LangGraph + Anthropic",
    ],
    },
  {
    index: "10",
    title: "FocusForge",
    category: "iOS Mobile App",
    summary:
      "An iPhone focus timer with character customization, minutes-based XP and coins, and streak rewards. An on-device template coach offers task prompts and reflections; Firebase analytics can be turned off in Settings.",
    href: "/work/focusforge",
    slug: "focusforge",
    codeHref: "https://github.com/kristenmartino/focusforge",
    year: "2026",
    status: "In progress",
    mode: "Solo build",
    shape: "mobile",
    metrics: [
      "SwiftUI + SwiftData",
      "Minutes-based XP + streak rewards",
      "On-device template coaching",
      "Firebase analytics opt-out",
    ],
  },
  {
    index: "11",
    title: "GTM Healthcare Intelligence",
    category: "Healthcare GTM Analytics",
    summary:
      "Two sales and reporting review workflows, plus five supporting demos. The shipped examples use synthetic records and embedded references; a separate Python pipeline accepts local public-data files.",
    href: "/work/gtm-healthcare",
    slug: "gtm-healthcare",
    liveHref: "https://gtm.kristenmartino.ai",
    liveLabel: "Explore the demos",
    codeHref: "https://github.com/kristenmartino/gtm-healthcare-intel",
    year: "2024",
    status: "Shipped",
    mode: "Solo build",
    shape: "data-viz",
    image: "/work/gtm-hub-4x3.png",
    imageAlt:
      "GTM Healthcare Intelligence hub with entry points for pipeline conversion and metric definitions, plus a note describing the synthetic data.",
    metrics: [
      "Synthetic demo records",
      "Embedded metro references",
      "Optional NPPES/Census files",
    ],
  },
  {
    index: "12",
    title: "Orrery",
    category: "Astrological Timing",
    summary:
      "An astrology-based date-comparison tool that computes planetary positions and ranks windows using fixed astrological rules. Each score is tied to the computed conditions; optional AI selects explanations from server-written facts. The scores describe those conventions, not validated probabilities of success.",
    href: "https://orrery.day",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "decision",
  },
  {
    index: "13",
    title: "Enterprise Billing Migration",
    category: "Cross-Functional Delivery",
    summary:
      "Led billing migrations, coordinating cutover, validation, rollout sequencing and communications across business and technical teams.",
    href: "/work/enterprise-billing-migration",
    slug: "enterprise-billing-migration",
    status: "Shipped",
    mode: "Cross-functional",
    shape: "pipeline",
    metrics: ["Billing cutover", "Migration validation", "Cross-functional delivery"],
  },
  {
    index: "14",
    title: "Billing Recovery and Reconciliation",
    category: "Enterprise Systems",
    summary:
      "Led billing recovery and reconciliation work, defining requirements for corrections and coordinating fixes across Finance, Revenue Operations, Engineering and Data.",
    href: "/work/billing-recovery-and-reconciliation",
    slug: "billing-recovery-and-reconciliation",
    year: "2023",
    status: "Shipped",
    mode: "Cross-functional",
    shape: "table",
    metrics: ["Billing reconciliation", "Recover · correct · prevent", "Finance validation"],
  },
  {
    index: "15",
    title: "Revenue Management System Testing",
    category: "Decision Support",
    summary:
      "Led user acceptance testing for a revenue-management system, defined test scenarios and worked with analysts and the vendor to resolve data-mapping and forecasting defects before launch.",
    href: "/work/revenue-management-system-testing",
    slug: "revenue-management-system-testing",
    status: "Shipped",
    mode: "Cross-functional",
    shape: "decision",
    metrics: ["UAT leadership", "Data validation", "Vendor coordination"],
  },
  {
    index: "16",
    title: "Salesforce CPQ Catalog Simplification",
    category: "Business Systems",
    summary:
      "Led Salesforce CPQ catalog simplification, combining product-usage analysis with input from Sales Operations and Billing. Defined requirements for configurable products and validated quotes, contracts and invoices.",
    href: "/work/salesforce-cpq-catalog-simplification",
    slug: "salesforce-cpq-catalog-simplification",
    status: "Shipped",
    mode: "Cross-functional",
    shape: "decision",
    metrics: ["Catalog analysis", "Configurable products", "Quote-to-invoice validation"],
  },
  {
    index: "17",
    title: "Meridian Healthcare BI",
    category: "Business Intelligence",
    summary:
      "A Power BI reporting project using synthetic healthcare operations data. Compares clinic performance, highlights exceptions, and documents how each metric is calculated. Includes SQL/dbt data models and automated checks that metrics reconcile across clinics and markets.",
    href: "/work/meridian-healthcare-bi",
    slug: "meridian-healthcare-bi",
    status: "In progress",
    mode: "Solo build",
    shape: "data-viz",
    image: "/work/meridian/overview.png",
    imageAlt:
      "Meridian Power BI report overview using synthetic healthcare operations data, with reporting filters and illustrative financial scenarios.",
    metrics: [
      "Power BI · SQL · dbt",
      "Synthetic healthcare operations data",
      "KPI definitions · reconciliation",
    ],
  },
];

export type Study = {
  eyebrow: string;
  title: string;
  summary: string;
  shareDescription?: string;
  metrics: string[];
  liveHref?: string;
  liveLabel?: string;
  codeHref?: string;
  artifact?: Artifact;
  year?: string;
  mode?: ProjectMode;
};

const studies: Record<string, Study> = {
  [featuredProject.slug]: {
    eyebrow: featuredProject.eyebrow,
    title: featuredProject.title,
    summary: featuredProject.summary,
    metrics: [...featuredProject.metrics],
    liveHref: featuredProject.liveHref,
    codeHref: featuredProject.codeHref,
    artifact: featuredProject.artifact,
    year: featuredProject.year,
    mode: featuredProject.mode,
  },
  ...Object.fromEntries(
    projects
      .filter((p): p is typeof p & { slug: string } => Boolean(p.slug))
      .map((p) => [
        p.slug,
        {
          eyebrow: `Case Study / ${p.title}`,
          title: p.title,
          summary: p.summary,
          shareDescription: p.shareDescription,
          metrics: [...(p.metrics ?? [])],
          liveHref: p.liveHref,
          liveLabel: p.liveLabel,
          codeHref: p.codeHref,
          artifact: p.artifact,
          year: p.year,
          mode: p.mode,
        },
      ]),
  ),
};

export const studySlugs = Object.keys(studies);

export function getStudy(slug: string): Study | undefined {
  return studies[slug];
}
