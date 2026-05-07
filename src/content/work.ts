import type { FeaturedProject, Project } from "@/lib/types";

export const featuredProject: FeaturedProject = {
  slug: "gridpulse",
  title: "GridPulse",
  eyebrow: "Case Study / GridPulse",
  summary:
    "An integrated decision platform for power markets — unifying weather forecasts, scenario analysis, and grid telemetry across operating roles.",
  description:
    "An independent build exploring decision-support design for power markets. Weather, forecasts, and scenario analysis consolidated into role-based operating views for traders and grid operators — 51 US balancing authorities (~99% of lower-48 demand), four-model ensemble with real holdout metrics, deployed on Cloud Run with scheduled scoring + training jobs.",
  metrics: [
    "51 BAs · ~99% lower-48",
    "XGBoost · Prophet · SARIMAX ensemble",
    "Real holdout metrics",
    "Cloud Run + scheduled jobs",
  ],
  liveHref: "https://gridpulse.kristenmartino.ai",
  codeHref: "https://github.com/kristenmartino/gridpulse",
  caseStudyHref: "/work/gridpulse",
  year: "2024",
  mode: "Solo build",
  artifact: {
    problem: {
      situation:
        "Power traders and grid operators routinely manage decisions across six or more disconnected tools — forecasting models, scheduling systems, weather services, telemetry feeds, and trading platforms.",
      complication:
        "Each function holds a different view of the same underlying data. Reconciliation depends on practitioner expertise rather than process, and by the time a unified picture emerges the trading window has typically closed.",
      question:
        "Can a single integrated operating layer serve the actual decision moment — rather than producing yet another dashboard?",
    },
    requirements: [
      {
        stakeholder: "Power trader",
        need: "Four-hour ramp-risk, congestion risk, and pricing bands at a glance — without context-switching between tools mid-decision.",
        evidence: "Observed across pre-open trading sessions",
      },
      {
        stakeholder: "Grid operator",
        need: "Seven-day curtailment outlooks and reserve margin visibility, with role-appropriate alerting thresholds.",
      },
      {
        stakeholder: "Forecasting team",
        need: "Model spread and confidence intervals surfaced at the operating layer — not buried inside model views.",
        evidence: "Confidence drives sizing, not point estimates",
      },
      {
        stakeholder: "Cross-role",
        need: "On-demand scenario modeling that replaces the weekly cycle, so significant decisions don't wait for Friday.",
      },
    ],
    decisions: {
      criteria: [
        "Decision-moment fit",
        "Cognitive throughput",
        "Adapts by role",
        "Build effort",
      ],
      options: [
        {
          option: "Aggregator dashboard",
          scores: ["partial", "partial", "unmet", "met"],
        },
        {
          option: "Role-based operating layer",
          chosen: true,
          scores: ["met", "met", "met", "partial"],
          rationale:
            "Role-specific interfaces match how decisions are actually made — a trader at 6:30am cannot reasonably evaluate model selection. The 3x build cost (three IAs, three default scenarios, three alerting thresholds) is justified by the documented underperformance of generic interfaces in operations-intensive environments.",
        },
        {
          option: "Configurable power-user workspace",
          scores: ["partial", "unmet", "partial", "partial"],
        },
      ],
    },
    solution: {
      summary:
        "Three planes — integrated, confident, immediate — operating on shared data with role-adapted surfaces.",
      pillars: [
        {
          title: "Operating view",
          detail:
            "Live grid state, weighted forecasts, and the open decisions appropriate to the user's role. Same data, role-adapted presentation.",
        },
        {
          title: "Models",
          detail:
            "Four model classes (physics, statistical, ML, ensemble) with backtests and confidence intervals exposed at the surface. Spread is surfaced when models diverge.",
        },
        {
          title: "Scenarios",
          detail:
            "On-demand modeling replaces the weekly batch. Adjust an input — temperature delta, unit outage, policy assumption — and the cascade is visible immediately.",
        },
      ],
    },
    outcome: {
      kind: "metrics",
      items: [
        {
          metric: "Scenario cycle",
          before: "Weekly batch",
          after: "On-demand",
          note: "Cascade visible immediately",
        },
        {
          metric: "Operating surface",
          before: "3+ tools",
          after: "1 view",
          note: "Role-adaptive",
        },
        {
          metric: "Model coverage",
          after: "4 classes",
          note: "Backtests + CIs surfaced",
        },
        {
          metric: "Regional reach",
          after: "51 BAs",
          note: "~99% of lower-48 demand · Cloud Run",
        },
      ],
    },
  },
  // Add image once a screenshot is produced: image: "/work/gridpulse.webp"
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Valuate",
    category: "AI Financial Agent",
    summary:
      "AI-augmented DCF agent — extracts financial line items from SEC 10-Ks via XBRL and Claude, then runs a Monte Carlo valuation with cell-level source attribution.",
    href: "/work/valuate",
    slug: "valuate",
    liveHref: "https://valuate.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/valuate-api",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "pipeline",
    metrics: [
      "10 S&P 500 tickers",
      "Two-track extraction (XBRL + LLM)",
      "Source quotes + HITL review",
      "10K Monte Carlo iterations",
    ],
  },
  {
    index: "02",
    title: "Tarazu",
    category: "Product + AI",
    summary:
      "AI-assisted prioritization platform applying the RICE framework, with interactive scoring and structured strategic guidance.",
    href: "/work/tarazu",
    slug: "tarazu",
    liveHref: "https://prioritize.kristenmartino.ai",
    year: "2024",
    status: "Shipped",
    mode: "Solo build",
    shape: "decision",
    metrics: [
      "4 RICE dimensions",
      "Per-dimension AI coaching",
      "No-login web app",
      "Solo build",
    ],
  },
  {
    index: "03",
    title: "Sift",
    category: "AI News Product",
    summary:
      "AI-curated news platform aggregating 100+ sources with semantic search and multi-source comparative analysis.",
    href: "/work/sift",
    slug: "sift",
    liveHref: "https://siftnews.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/sift-api",
    year: "2024",
    status: "Shipped",
    mode: "Solo build",
    shape: "table",
    metrics: [
      "100+ sources",
      "Semantic search",
      "Multi-source comparison",
      "FastAPI + LangGraph",
    ],
  },
  {
    index: "04",
    title: "FocusForge",
    category: "iOS Mobile App",
    summary:
      "Character-driven Pomodoro for iOS that translates focus sessions into RPG-style character progression. Template-based on-device AI coach for intent framing, post-session reflection, and streak rescue. Built in SwiftUI; feature-complete and entering beta.",
    href: "/work/focusforge",
    slug: "focusforge",
    codeHref: "https://github.com/kristenmartino/focusforge",
    year: "2026",
    status: "In progress",
    mode: "Solo build",
    shape: "mobile",
    metrics: [
      "SwiftUI + SwiftData",
      "On-device AI coach",
      "Firebase + Crashlytics",
      "WCAG AA + Reduce Motion",
    ],
  },
  {
    index: "05",
    title: "GTM Healthcare Intelligence",
    category: "Healthcare GTM Analytics",
    summary:
      "Specialty-EHR go-to-market analytics architecture organized across four maturity layers — governance, descriptive, diagnostic, prescriptive — so Sales, Marketing, and Finance can share a source of truth without sharing a surface.",
    href: "/work/gtm-healthcare",
    slug: "gtm-healthcare",
    liveHref: "https://gtm.kristenmartino.ai",
    year: "2024",
    status: "Shipped",
    mode: "Cross-functional",
    shape: "data-viz",
    metrics: [
      "7 sub-projects · 4 maturity layers",
      "CMS NPPES · Medicare PUF · Census",
      "L2 logistic regression",
      "React · Next.js · Python · Claude API",
    ],
    artifact: {
      problem: {
        situation:
          "Specialty-EHR vendors run go-to-market with Sales, Marketing, and Finance each maintaining their own pipeline definitions, conversion math, and revenue forecasts — built around the cadences and decision rituals each function actually trusts.",
        complication:
          "When the three functions disagree on inputs, downstream forecasts and territory decisions become negotiations rather than analyses. Centralized BI rollouts under-perform precisely because they ask each function to abandon the surface it knows; standardization stalls when no team will adopt a definition it didn't author.",
        question:
          "Can a single analytics layer serve all three functions without flattening the differences in how each one actually decides?",
      },
      requirements: [
        {
          stakeholder: "Sales leadership",
          need: "Funnel diagnostics by specialty and metro — what's dropping off and where, named — surfaced inside the views the team already uses for pipeline review.",
          evidence: "ConvertPath used in mock pre-QBR sessions",
        },
        {
          stakeholder: "Marketing",
          need: "Account scoring grounded in fit + intent signals from public data, with conversion math that survives quarterly review.",
          evidence: "Anchored to MGMA/HFMA benchmarks and CMS NPPES",
        },
        {
          stakeholder: "Finance",
          need: "A metric registry with conflict resolution and anomaly detection so close-the-books forecasts trace back to a defined source.",
        },
        {
          stakeholder: "Cross-function",
          need: "A natural-language layer where any function can ask 'why are we losing X' and get a structured answer with cited sources — not a black-box recommendation.",
          evidence: "AskGTM returns sourced reasoning, not bare numbers",
        },
      ],
      decisions: {
        criteria: [
          "Multi-stakeholder fit",
          "Adoption friction",
          "Source-of-truth integrity",
          "Build effort",
        ],
        options: [
          {
            option: "Centralized BI dashboard (one surface for all three)",
            scores: ["partial", "unmet", "met", "met"],
          },
          {
            option:
              "Per-function surfaces over a shared metric registry",
            chosen: true,
            scores: ["met", "met", "met", "partial"],
            rationale:
              "Function-specific surfaces match the rituals each team actually uses — Sales lives in funnel views, Finance in close-the-books cycles, Marketing in scoring loops. The registry keeps definitions reconcilable without forcing a uniform interface. The 4× build cost (four maturity layers, multiple consumer surfaces) is justified by the documented failure rate of single-dashboard rollouts in cross-functional GTM contexts.",
          },
          {
            option: "Embedded analytics in the CRM (Salesforce-native only)",
            scores: ["unmet", "partial", "unmet", "met"],
          },
        ],
      },
      solution: {
        summary:
          "A four-layer analytics architecture organized by decision maturity — each function enters at the layer that matches its rituals and crosses into others when needed.",
        pillars: [
          {
            title: "Governance",
            detail:
              "NorthStar — metric registry with conflict resolution, reporting adoption tracker, shadow-spreadsheet monitor, and anomaly detection. The single source of truth for what \"pipeline\" means.",
          },
          {
            title: "Descriptive",
            detail:
              "PracticeFlow + SpecialtyPulse — benchmarking against MGMA/HFMA standards and trend monitoring at practice and specialty level, anchored on CMS NPPES, Medicare PUF, and Census demographics.",
          },
          {
            title: "Diagnostic",
            detail:
              "ConvertPath + SpectrumIQ — funnel-decay analysis showing where deals drop off by specialty, plus metro-level opportunity scoring via L2 logistic regression.",
          },
          {
            title: "Prescriptive",
            detail:
              "AskGTM + AskPractice — natural-language query layer over the same governed data; \"why are we losing Ortho deals?\" returns a structured, sourced answer rather than a hidden inference.",
          },
        ],
      },
      outcome: {
        kind: "metrics",
        items: [
          {
            metric: "Architecture",
            after: "4 maturity layers",
            note: "Governance · Descriptive · Diagnostic · Prescriptive",
          },
          {
            metric: "Sub-projects",
            after: "7 mapped",
            note: "Each tied to a specific decision moment",
          },
          {
            metric: "Public data anchors",
            after: "5 sources",
            note: "CMS NPPES · Medicare PUF · Census · MGMA · HFMA",
          },
          {
            metric: "Build status",
            after: "End-to-end demo",
            note: "Synthetic + public data only · no proprietary or patient data",
          },
        ],
      },
    },
  },
  {
    index: "06",
    title: "Platform Migration + ARR Growth",
    category: "Cross-Functional Delivery",
    summary:
      "Cross-functional migration and revenue expansion program spanning payments, systems, operations, and growth execution.",
    href: "#contact",
    year: "2023",
    status: "Shipped",
    mode: "Cross-functional",
    shape: "pipeline",
  },
  {
    index: "07",
    title: "Revenue Recovery Audit Workflow",
    category: "Enterprise Systems",
    summary:
      "Billing validation workflow for mismatch detection, finance reconciliation, and improved revenue accuracy at scale.",
    href: "#contact",
    year: "2023",
    status: "Shipped",
    mode: "Cross-functional",
    shape: "table",
  },
  {
    index: "08",
    title: "RMS Fare Validation System",
    category: "Decision Support",
    summary:
      "Logic-driven pricing validation model addressing complex fare rules and downstream revenue decisions.",
    href: "#contact",
    year: "2022",
    status: "Shipped",
    mode: "Cross-functional",
    shape: "decision",
  },
  {
    index: "09",
    title: "Flight Disruption Recovery",
    category: "Operational Decision Support",
    summary:
      "Decision-support concept combining predictive signals, real-time data, and recovery visibility for irregular operations.",
    href: "#contact",
    year: "2022",
    status: "Concept",
    mode: "Cross-functional",
    shape: "decision",
  },
];
