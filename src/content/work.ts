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
    "Built with public CMS data, Snowflake, and dbt. Includes provider drill-downs, source documentation, and the outlier-detection methodology.",
} as const;

export const featuredProject: FeaturedProject = {
  slug: "medicare-provider-outliers",
  title: "Medicare Provider Outliers",
  eyebrow: "Case Study / Medicare Provider Outliers",
  summary:
    "Provider cost and volume outlier detection across 43.7M rows of public CMS Medicare data — modeled as a dbt star schema on Snowflake, scored within 9,490 specialty-by-state peer groups, and published as a live interactive data app.",
  description:
    "Three CMS sources from calendar year 2023, modeled in Snowflake with dbt. A public data app supports provider review, and the dbt documentation shows model lineage and tests.",
  metrics: [
    "43.7M rows · 3 CMS sources",
    "dbt star schema · 48/48 tests",
    "9,490 peer groups · MAD + z-score",
    "Live data app + dbt docs",
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
    summary:
      "A pool-service demo for reporting problems, tracking repairs and paying test deposits. AI classifies requests; staff control pricing and scheduling.",
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
      "Cabana system architecture — a member browser to Next.js, Supabase Postgres as the source of truth with three edge functions, and n8n fanning out to Airtable and Telegram through a transactional outbox, with Resend for operational alert fallback.",
    metrics: [
      "8 services · transactional outbox",
      "Webhook-authoritative payments · RLS",
      "Test run: 50/50 Airtable records · no duplicates",
      "Next.js 15 · Supabase · Claude Haiku · n8n",
    ],
  },
  {
    index: "02",
    title: "SpecialtyPulse Pipeline",
    category: "Healthcare Data Platform",
    summary:
      "A Medicare reporting pipeline with specialty rankings, procedure drill-downs and example access policies.",
    href: "/work/specialtypulse-pipeline",
    slug: "specialtypulse-pipeline",
    liveHref: "https://specialtypulse.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/specialtypulse_pipeline",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "pipeline",
    image: "/work/specialtypulse.png",
    imageAlt:
      "SpecialtyPulse procedure view with a specialty selector, service-count ranking, HCPCS codes and average payments",
    metrics: [
      "CMS PUF schema · sample 2021–2023",
      "Databricks PySpark · Airflow",
      "Domo DataFlow · 5-page dashboard",
      "Example access policies · 4 roles",
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
      "Valuate company picker with sample tickers and model labels for banks, insurers, REITs, and energy companies.",
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
      "PDF source links + OCR highlights",
      "6 MCP tools · shared backend",
    ],
  },
  {
    index: "05",
    title: "Eval Harness",
    category: "Applied LLM Evaluation",
    summary:
      "A framework for comparing language models on Sift’s news-processing tasks, covering output quality, cost, and response time. Includes tests for agent tool use and failure handling. Benchmark results are still pending.",
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
      "Eval Harness site with links to the evaluation methodology and pending benchmark results.",
    metrics: [
      "Planned comparison: 9 models · 4 tasks",
      "Categorization and summarization modules",
      "Held-out access gate · SHA-256 checks",
      "Local and API cost comparison planned",
      "Agent replay tests · live corpus run pending",
    ],
  },
  {
    index: "06",
    title: "Quantization Study",
    category: "Applied LLM Research",
    summary:
      "A study comparing 16-bit, 8-bit, and 4-bit versions of Llama 3.1 8B for output quality, processing speed, and memory use. Tests cover knowledge questions and extracting names, organizations, and locations from text.",
    href: "/work/llm-quantization-study",
    slug: "llm-quantization-study",
    codeHref: "https://github.com/kristenmartino/llm-quantization-study",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "data-viz",
    image: "/work/quantization-pareto-4x3.png",
    imageAlt:
      "Quantization Study — paired cost/quality plots for FP16, Q8_0, and Q4_K_M on MMLU accuracy and CoNLL NER micro-F1, with bootstrap confidence intervals.",
    metrics: [
      "3 arms × 800 examples (n=2,400)",
      "Paired bootstrap + Holm correction",
      "Q8_0 within ±1pp on tested measures",
      "Q4_K_M: −3.2pp micro-F1 on NER (p_adj=0.032)",
    ],
    },
  {
    index: "07",
    title: "GridPulse",
    category: "Electricity Demand Forecasting",
    summary:
      "GridPulse forecasts U.S. electricity demand using public grid and weather data. Users can compare forecasts and model performance, review weather alerts, and explore temperature, wind, and solar scenarios.",
    href: "/work/gridpulse",
    slug: "gridpulse",
    liveHref: "https://gridpulse.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/gridpulse",
    year: "2024",
    status: "Shipped",
    mode: "Solo build",
    shape: "data-viz",
    image: "/work/gridpulse.png",
    imageAlt:
      "GridPulse dashboard for Florida (FPL), showing reported electricity demand, forecasts, and model evaluation metrics.",
    metrics: [
      "51 balancing authorities",
      "3 models + weighted ensemble",
      "Holdout and live error tracking",
      "Cloud Run + scheduled jobs",
    ],
  },
  {
    index: "08",
    title: "Tarazu",
    category: "Product + AI",
    summary:
      "A product-decision app that links scoring assumptions, evidence and saved reasoning. Its fictional Relay demo shows why a team chooses a checklist experiment before building approval reminders.",
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
    liveHref: "https://siftnews.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/sift",
    year: "2024–2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "table",
    image: "/work/sift.png",
    imageAlt:
      "Sift — its 'The news, with footnotes' headline beside a summarized story card that links to structured dossiers.",
    metrics: [
      "10 categories · ~50 outlets · AI summaries",
      "Topic search + multi-source compare",
      "Dossiers · primer · inline glossary",
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
      "A collection of seven analytics projects for specialty healthcare sales and marketing, using synthetic and public data. Includes sales-funnel analysis, market comparisons, practice benchmarks, shared metric definitions, and AI tools for asking questions about the data.",
    href: "/work/gtm-healthcare",
    slug: "gtm-healthcare",
    liveHref: "https://gtm.kristenmartino.ai",
    year: "2024",
    status: "Shipped",
    mode: "Solo build",
    shape: "data-viz",
    image: "/work/gtm-healthcare.png",
    imageAlt:
      "GTM Healthcare Intelligence — the analytics maturity model mapping seven GTM sub-projects across governance, descriptive, diagnostic, and prescriptive layers, above the NorthStar and AskGTM project cards.",
    metrics: [
      "7 demos · synthetic and public data",
      "CMS NPPES · Medicare PUF · Census",
      "L2 logistic regression",
      "React · Next.js · Python · Claude API",
    ],
    },
  {
    index: "12",
    title: "Orrery",
    category: "Decision Support + AI",
    summary:
      "An astrology-based planning tool for comparing dates and times for launches, pitches, and other events. Calculates celestial positions, applies published astrological rules, and uses AI to explain its timing scores.",
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
