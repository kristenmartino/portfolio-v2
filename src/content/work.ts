import type { FeaturedProject, Project } from "@/lib/types";

export const featuredProject: FeaturedProject = {
  slug: "gridpulse",
  title: "GridPulse",
  eyebrow: "Case Study / GridPulse",
  summary:
    "An integrated decision platform for power markets — unifying weather forecasts, scenario analysis, and grid telemetry across operating roles.",
  description:
    "An independent build exploring decision-support design for power markets. Weather, forecasts, and scenario analysis consolidated into role-based operating views for traders and grid operators — eight regions, four model classes, deployed on Cloud Run.",
  metrics: ["16 BAs", "4 model classes", "Role-based views", "Cloud Run"],
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
          after: "16 BAs",
          note: "Cloud Run · expanding coverage",
        },
      ],
    },
  },
  // Add image once a screenshot is produced: image: "/work/gridpulse.webp"
};

export const projects: Project[] = [
  {
    index: "01",
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
    index: "02",
    title: "GTM Healthcare Intelligence",
    category: "Analytics Platform",
    summary:
      "Healthcare go-to-market analytics suite combining account scoring, benchmarking, diagnostics, and AI-enabled query tools.",
    href: "https://gtm.kristenmartino.ai",
    year: "2024",
    status: "Shipped",
    mode: "Cross-functional",
    shape: "data-viz",
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
    title: "Sift Intelligence Pipeline",
    category: "AI Backend",
    summary:
      "FastAPI and LangGraph service handling ingestion, summarization, embedding generation, and cross-source comparison.",
    href: "https://github.com/kristenmartino/sift-api",
    year: "2024",
    status: "Shipped",
    mode: "Solo build",
    shape: "pipeline",
  },
  {
    index: "05",
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
    index: "08",
    title: "FocusForge",
    category: "Mobile Product Concept",
    summary:
      "Character-driven productivity application concept integrating progression mechanics with privacy-first AI coaching.",
    href: "/work/focusforge",
    slug: "focusforge",
    codeHref: "https://github.com/kristenmartino/focusforge",
    year: "2024",
    status: "Concept",
    mode: "Solo build",
    shape: "mobile",
    metrics: [
      "Mobile-first concept",
      "On-device AI coaching",
      "Character progression",
      "Privacy-first",
    ],
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
