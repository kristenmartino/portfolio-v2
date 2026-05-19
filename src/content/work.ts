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
    artifact: {
      problem: {
        situation:
          "Automated valuation systems claim to read 10-Ks and produce DCF models. The math is trivial — fifty lines of code — but reliable line-item extraction from filings written for human readers is the actual bottleneck.",
        complication:
          "Most automated-valuation demos work on clean industrial mid-caps without saying so. Filer inconsistency in XBRL tagging is the rule, not the exception — Apple uses one revenue concept, Caterpillar another; some filers don't tag operating income at all. Black-box extraction at this scale produces fair-value estimates a finance reviewer cannot verify against the underlying document.",
        question:
          "Can an extraction agent acknowledge its scope and surface its uncertainty — rather than hiding both?",
      },
      requirements: [
        {
          stakeholder: "Finance reviewer",
          need: "Per-cell source attribution back to the filing — verbatim quotes for each Claude-extracted line item, no bare numbers.",
          evidence: "HITL review surface verifies in one click",
        },
        {
          stakeholder: "Coverage breadth",
          need: "Handle the ~30% of clean-reporting S&P 500 filers with at least one untagged or non-canonical line item — without failing the request.",
          evidence: "3 of 10 hand-picked tickers needed Track B or derivation",
        },
        {
          stakeholder: "Audit trail",
          need: "Persist user overrides as first-class data with source=USER_OVERRIDE so a corrected valuation traces back to who corrected what.",
        },
        {
          stakeholder: "Modeling latency",
          need: "Sliders adjusting growth, margin, terminal growth, WACC must recompute Monte Carlo + sensitivity grid faster than human reaction time.",
          evidence: "Full recompute in under 200 ms",
        },
      ],
      decisions: {
        criteria: [
          "Coverage on clean filers",
          "Verifiability per cell",
          "Failure transparency",
          "Build effort",
        ],
        options: [
          {
            option: "XBRL-only extraction (canonical concepts, fail on missing)",
            scores: ["partial", "met", "unmet", "met"],
          },
          {
            option: "LLM-only over the full 10-K HTML",
            scores: ["partial", "met", "partial", "met"],
          },
          {
            option:
              "Two-track extraction with deterministic derivation backstop and HITL review surface",
            chosen: true,
            scores: ["met", "met", "met", "partial"],
            rationale:
              "XBRL queries first (Track A), Claude over the 10-K HTML where Track A leaves gaps (Track B), accounting-identity derivation as the fallback (operating income from income_before_tax + interest_expense; total liabilities from total_assets − shareholders_equity). Every value carries provenance — XBRL concept, verbatim quote, or formula — and the HITL surface makes verification one click instead of a manual hunt. The 3× build cost is justified by the demand: a fair-value estimate without provenance is not actionable for the finance reviewer who has to defend the number.",
          },
        ],
      },
      solution: {
        summary:
          "An extraction agent that runs XBRL first, Claude over the 10-K HTML for gaps, and accounting-identity derivation as the backstop — with cell-level source attribution and a one-click HITL verification surface.",
        pillars: [
          {
            title: "Track A — XBRL company facts",
            detail:
              "SEC pre-tagged JSON queried for canonical us-gaap concepts. Restatements deduplicated by period-end date (the gotcha: filing-fiscal-year groups three years of comparatives into one slot). Returns whatever it can find and hands the gaps to Track B.",
          },
          {
            title: "Track B — Claude over 10-K HTML",
            detail:
              "Item 8 (Financial Statements) sliced by anchor pattern, sent with a confidence-calibrated prompt, parsed into the same LineItem schema. Every value carries a verbatim 5–30 word source quote. Static prefix marked for prompt caching.",
          },
          {
            title: "Derivation backstop",
            detail:
              "Accounting identities for fields neither track tagged (operating income for filers like JNJ/NKE; total liabilities for filers like NKE/KO). source=DERIVED carries a synthetic quote describing the formula — provenance survives the inference.",
          },
          {
            title: "HITL review + override persistence",
            detail:
              "Low-confidence items (<0.80) and balance-sheet identity violations (>50bps) flagged in the surface. Overrides persist as first-class LineItem entries with source=USER_OVERRIDE and re-trigger validation on each write.",
          },
        ],
      },
      outcome: {
        kind: "metrics",
        items: [
          {
            metric: "Universe",
            after: "10 S&P 500 tickers",
            note: "Clean industrial filers; banks/insurers/E&P intentionally V2",
          },
          {
            metric: "Track-B + derivation",
            after: "3 of 10 needed",
            note: "Even hand-picked filers leave gaps Track A can't fill",
          },
          {
            metric: "Recompute",
            after: "<200 ms",
            note: "10K Monte Carlo + 7×7 sensitivity grid",
          },
          {
            metric: "Provenance",
            after: "Per-cell, every value",
            note: "XBRL concept, verbatim quote, or formula",
          },
        ],
      },
    },
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
    artifact: {
      problem: {
        situation:
          "Product teams use RICE — Reach, Impact, Confidence, Effort — to prioritize roadmap items. The math is trivial: multiply four numbers, divide by effort. The score is only as good as the four guesses that produced it.",
        complication:
          "Most teams are guessing without scaffolding. Confidence ratings cluster at 80% by default — the dimension that should reduce hubris ends up reinforcing it. AI-driven prioritization tools, conversely, produce a score with no defensibility: a recommendation that cannot survive contact with engineering, or the meeting after the workshop.",
        question:
          "Can a prioritization tool make the team's reasoning more legible without taking the judgment away from them?",
      },
      requirements: [
        {
          stakeholder: "Senior PM",
          need: "Each RICE input prompted with the questions a senior PM would ask — concrete reach segments, behavioral impact (not just metric movement), evidence-backed confidence, recently-estimated effort.",
        },
        {
          stakeholder: "Roadmap-meeting attendee",
          need: "The output must reconstruct the assumptions behind the score — not just the number — so a discussion can rebuild the reasoning from the artifact alone.",
          evidence: "Eliminates the \"where did this come from\" failure mode",
        },
        {
          stakeholder: "Engineering",
          need: "Effort estimates must carry their estimator and recency, so the team knows when to rerun the math.",
        },
        {
          stakeholder: "Cross-role",
          need: "A short strategic narrative separate from the score — comparison to other items, sensitivity to uncertain inputs, recommended discovery — generated independently so the math stays auditable.",
        },
      ],
      decisions: {
        criteria: [
          "Defensibility in roadmap meetings",
          "Reduces overclaim on confidence",
          "Preserves team judgment",
          "Build effort",
        ],
        options: [
          {
            option: "Vanilla RICE calculator (four fields → one number)",
            scores: ["partial", "unmet", "met", "met"],
          },
          {
            option:
              "AI-generated RICE score (paste feature description, get score)",
            scores: ["unmet", "partial", "unmet", "met"],
          },
          {
            option:
              "Per-dimension AI coaching with score transparency and separate strategy narrative",
            chosen: true,
            scores: ["met", "met", "met", "partial"],
            rationale:
              "Each RICE dimension gets a dedicated prompting layer that asks the structural questions before letting a number be entered. The output is the four labeled inputs plus the resulting score, so a roadmap discussion rebuilds the reasoning from the artifact itself. AI sits inside the user's process as a thinking partner; the score belongs to the team. The 2–3× build cost over a vanilla calculator is justified because it eliminates the failure mode that kills most prioritization outputs.",
          },
        ],
      },
      solution: {
        summary:
          "RICE as the structural backbone, with per-dimension AI coaching at each input and full transparency on the assumptions behind the score.",
        pillars: [
          {
            title: "Per-dimension AI coaching",
            detail:
              "Each of the four dimensions gets dedicated prompts. Reach asks for concrete segment definition before size. Impact asks what behavior changes (not just whether the metric moves). Confidence asks for evidence and adjusts down when evidence is thin. Effort asks who estimated and how recently. Short, structural, resistant to being skipped.",
          },
          {
            title: "Score transparency",
            detail:
              "The output is the four labeled inputs with their assumptions, plus the resulting score. A roadmap discussion rebuilds the reasoning from the artifact alone — eliminates the \"where did this come from\" failure mode that kills most prioritization outputs.",
          },
          {
            title: "Strategy narrative, separate from scoring",
            detail:
              "A short narrative on what the score means in context — comparison to other items, sensitivity to uncertain inputs, recommended next discovery. Generated independently from the score so the math stays auditable.",
          },
        ],
      },
      outcome: {
        kind: "metrics",
        items: [
          {
            metric: "Coaching coverage",
            after: "4 RICE dimensions",
            note: "Dedicated prompting layer per input",
          },
          {
            metric: "Output shape",
            after: "Inputs + assumptions + score",
            note: "Reconstructable from the artifact alone",
          },
          {
            metric: "Strategy narrative",
            after: "Generated separately",
            note: "Math remains auditable",
          },
          {
            metric: "Access",
            after: "No-login web app",
            note: "Bookmark-and-go, no account friction",
          },
        ],
      },
    },
  },
  {
    index: "03",
    title: "Sift",
    category: "AI News + Civic Literacy",
    summary:
      "A news aggregator with civic footnotes. Reads ~50 outlets across the political spectrum, AI-summarizes today's stories across 10 categories — and on top, every politician, organization, bill, and political term in an article links to a structured dossier sourced from public records.",
    href: "/work/sift",
    slug: "sift",
    liveHref: "https://siftnews.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/sift",
    year: "2024–2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "table",
    metrics: [
      "10 categories · ~50 outlets · AI summaries",
      "Topic search + multi-source compare",
      "Dossiers · primer · inline glossary",
      "FastAPI + LangGraph + Anthropic",
    ],
    artifact: {
      problem: {
        situation:
          "News aggregators optimize for volume — more sources, more headlines, more frequent updates. I started Sift believing the gap was upstream of the reader: that AI-curated summaries across categories, AI-powered topic search, and multi-source comparison could deliver what wire feeds couldn't.",
        complication:
          "Sift shipped the aggregator and the AI features worked, but once it was in real use, the AI-summary layer alone wasn't the differentiator I thought it would be. Most readers can read a wire description and an AI summary and not really tell the difference. The actual bottleneck surfaced underneath: most readers don't know who the players are. They can read five outlets on the same Senate vote and still not know who the senator is, what the bill does, or who funds the relevant lobbying body.",
        question:
          "What can be added on top of a working news aggregator that turns it into a daily-driver people actually learn from?",
      },
      requirements: [
        {
          stakeholder: "Engaged reader",
          need: "Civic scaffolding inside the reading flow — who the senator is, what the bill does, what the lobbying group wants — without leaving the article.",
          evidence: "The bottleneck turned out to be context, not volume",
        },
        {
          stakeholder: "Daily-driver user",
          need: "Sift has to work as a real news app first — 10 categories, summaries, topic search, comparison, bookmarks. The civic layer adds value; it doesn't replace the daily browsing experience.",
        },
        {
          stakeholder: "Methodology defender",
          need: "Every civic claim sourced from public records (OpenSecrets, GovTrack, ProPublica, FARA, FEC, Vote Smart) with citations one click away. AllSides + MBFC surfaced verbatim; no computed bias judgments.",
        },
        {
          stakeholder: "Latency-sensitive UX",
          need: "Browse experience stays ~50ms. Heavier AI work (compare, topic search) lives on its own path and streams, accepting ~10–15s because the user is asking for analysis, not browsing.",
          evidence: "Two-path AI architecture: pre-computed for browse, live for compare/search",
        },
      ],
      decisions: {
        criteria: [
          "Daily-driver fit",
          "Civic context legibility",
          "Live latency on browse",
          "Build effort",
        ],
        options: [
          {
            option: "AI-curated aggregator only — better summaries, topic search, compare; no civic layer",
            scores: ["partial", "unmet", "met", "met"],
          },
          {
            option: "Civic-literacy reader only — dossiers and glossary without the daily news flow",
            scores: ["unmet", "met", "met", "partial"],
          },
          {
            option:
              "AI-powered aggregator with a civic-literacy layer on top — both shipped, AI split by SLA",
            chosen: true,
            scores: ["met", "met", "met", "partial"],
            rationale:
              "The aggregator is the daily-driver experience that builds the habit; the civic layer is what makes the daily reading worth doing. Stacked together, every article comes with the civic context the news assumes the reader already has — politicians, organizations, bills, outlets, terms, comparisons — without losing the categorized-feed UX. AI splits by SLA: browse is pre-computed and served from Postgres in ~50ms; compare and topic search run live and accept ~10–15s. The build is heavier than either layer alone, but the surface is unfakeable: anyone with an API key can build AI summaries; the dossier graph, the public-records sourcing, and the methodology are the part that has to be earned.",
          },
        ],
      },
      solution: {
        summary:
          "Two layers — a working news aggregator (foundation) plus a civic-literacy layer (differentiator) — over a Next.js + FastAPI + LangGraph stack with AI split between a background pipeline and live endpoints.",
        pillars: [
          {
            title: "The reader surface — 10 categories, AI summaries, topic search, multi-source compare",
            detail:
              "News across 10 categories from ~50 vetted outlets. AI-generated summaries on every article (pipeline-side, not click-side). Topic search via Voyage AI vector similarity with SSE streaming and Claude web-search fallback. Multi-source comparison via a LangGraph fan-out workflow that pulls coverage across outlets, extracts claims, and shows the framing side-by-side. Bookmarks (Clerk-synced), dark/light themes, auth.",
          },
          {
            title: "The civic-literacy layer — primer, glossary, dossiers, cross-spectrum framing",
            detail:
              "*'What you should know first'* — an adaptive primer above each story with the key terms and context the article assumes you already have. Inline glossary on every civic term, with chip tooltips and click-through to the full dossier. Civic dossiers for politicians (committees, top industries by PAC contributions, interest-group ratings), organizations (political lean, finances, funders, FARA registration), bills (status, sponsor, cosponsors, lobbying spend), and news outlets (ownership, AllSides + MBFC ratings) — all sourced from public records. Cross-spectrum framing shows how Left / Center / Right outlets covered the same story.",
          },
          {
            title: "AI split by SLA — browse path vs. live path",
            detail:
              "The browse path is pre-computed in a background pipeline (FastAPI + LangGraph + Anthropic on Railway, 10-minute cadence) and served from Neon Postgres in ~50ms. The live AI path — compare and topic search — runs AI on request and accepts ~10–15s because the user is asking for analysis. Ten services run on the pipeline: primer generation, entity extraction, entity linking, summarization, story synthesis, story clustering, civic context, batched API, cross-source comparison, usage tracking.",
          },
          {
            title: "Public-records sourcing, verbatim ratings",
            detail:
              "Every civic claim cites its source — OpenSecrets, GovTrack, ProPublica Nonprofit Explorer, FARA, FEC, Vote Smart. Outlet political-lean and factual-reporting come from AllSides + MBFC, shown verbatim. Sift never computes its own ratings; the methodology is public at /methodology.",
          },
        ],
      },
      outcome: {
        kind: "metrics",
        items: [
          {
            metric: "Reader surface",
            after: "10 categories · ~50 outlets",
            note: "AI summaries · topic search · multi-source compare · bookmarks",
          },
          {
            metric: "Civic-literacy layer",
            after: "Primer + glossary + 4 dossier types",
            note: "Sourced from OpenSecrets, GovTrack, ProPublica, FARA, FEC, Vote Smart",
          },
          {
            metric: "Live latency",
            before: "~15s on every click",
            after: "~50ms (browse) · ~10–15s (compare)",
            note: "AI split by SLA: pre-computed browse, live compare/search",
          },
          {
            metric: "Pipeline",
            after: "10 LangGraph services",
            note: "Primer, entity extraction, linking, synthesis, clustering, compare, usage tracking",
          },
        ],
      },
    },
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
    artifact: {
      problem: {
        situation:
          "Productivity apps externalize discipline — lists, streaks, gamified habit chains, social accountability — adding friction outside the user and expecting it to translate into focus.",
        complication:
          "Streak-based gamification rewards consistency, not focus: a five-minute task done to preserve a streak optimizes the metric and decouples from the underlying goal. External accountability erodes intrinsic motivation. AI productivity coaches handle behavioral data — what you work on, when, for how long — by uploading it to a server, a privacy posture incompatible with the user base most likely to benefit.",
        question:
          "Can a focus tool reward the work itself by translating effort into something the user values intrinsically — without ever uploading their behavioral data?",
      },
      requirements: [
        {
          stakeholder: "Focus user",
          need: "Cosmetic progression must gate on streak days, not total minutes — five minutes of deep work advances the character more than thirty of shallow work.",
          evidence: "Resists the streak-preservation farming behavior",
        },
        {
          stakeholder: "Privacy-conscious user",
          need: "AI coaching must never upload behavioral data; on-device by construction, not by policy.",
        },
        {
          stakeholder: "Streak-rescue moment",
          need: "A nudge near the loss window that surfaces honest reflection, not shame or a dopamine hit.",
        },
        {
          stakeholder: "Accessibility floor",
          need: "WCAG AA contrast on every text token; VoiceOver, Dynamic Type, Reduce Motion alternatives across every animated surface.",
          evidence: "Two FFTheme adjustments raised computed contrast to AA",
        },
      ],
      decisions: {
        criteria: [
          "Resists farming",
          "Preserves intrinsic motivation",
          "Privacy by construction",
          "Build effort",
        ],
        options: [
          {
            option: "Standard streak/badge tracker with server-side LLM coach",
            scores: ["unmet", "unmet", "unmet", "met"],
          },
          {
            option: "Cosmetic progression on streak days, no AI coach",
            scores: ["met", "partial", "met", "met"],
          },
          {
            option:
              "Cosmetic progression on streak days plus on-device template-based AI coach over computed behavior signals",
            chosen: true,
            scores: ["met", "met", "met", "partial"],
            rationale:
              "Cosmetic unlocks gate on streak days rather than total minutes, which eliminates the streak-preservation farming behavior trackers usually create. The AI coach is a deterministic template engine over computed behavior signals (completion rate, abandonment rate, average session length, streak risk), producing structured reflections without sending data to a server. Privacy is structural by construction — inference is on-device. The constraint shrinks coach flexibility; the design philosophy welcomes that. An LLM upgrade is reserved for when on-device models can do the job without uploading.",
          },
        ],
      },
      solution: {
        summary:
          "RPG-style character progression as the meaning layer, with on-device template-based coaching at three behavioral moments — intent framing, post-session reflection, streak rescue.",
        pillars: [
          {
            title: "Character progression as meaning layer",
            detail:
              "Each focus session feeds an RPG-style character with body/hair/eyes plus three equipment slots. Cosmetic items unlock at streak milestones (days 3, 7, 14, 30, 60) or via a coin economy. Rarity tiers visually distinct at thumbnail size — animated rare items shimmer at 72px. Reframes the relationship from \"did I keep my streak\" to \"what does my character become.\"",
          },
          {
            title: "On-device AI coach (template-based)",
            detail:
              "Deterministic template engine over computed behavior signals. Three coach moments: intent framing before a session, post-session reflective tip, streak rescue near the loss window. User can edit, accept, dismiss, or rate every output. Behavioral data never traverses the network.",
          },
          {
            title: "Two-mode design system",
            detail:
              "Focus mode (near-black canvas, minimal UI) and reward mode (deep purple atmosphere, layered glows, particles, dramatic character lighting). Implemented through the FFTheme token system gating colors, type, and spacing. The contrast is load-bearing for the cinematic reward sequence.",
          },
        ],
      },
      outcome: {
        kind: "qualitative",
        statement:
          "Sprints 1–5 functionally complete on main; Sprint 6 (beta runtime, App Store submission, accessibility pass) is the current work. The empirical question — whether character-progression-as-meaning-layer outperforms streak-defending designs on retention — is what comes after beta.",
      },
    },
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
    mode: "Solo build",
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
      "Billing validation workflow for mismatch detection, finance reconciliation, and recovered revenue.",
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
