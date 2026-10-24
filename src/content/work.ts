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
    "An independent build of the full analytics path: three CMS sources (Part D prescribers, Part B physician services, the NPPES registry — calendar year 2023) loaded to Snowflake, an 11-model dbt star schema with 48 passing tests and ~982 lines of schema documentation, robust MAD + classical z-score detection with peer-group floors, and two public credential-free surfaces — an Evidence data app and the dbt docs lineage site.",
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
  artifact: {
    problem: {
      situation:
        "CMS publishes provider-level Medicare utilization as open data — 43.7M rows across Part D prescribers, Part B physician services, and the NPPES registry for calendar year 2023. Payer integrity teams, policy researchers, and journalists all want the same thing from it: which providers' cost and volume sit outside normal variation for their specialty and market.",
      complication:
        "Naive approaches fail before the statistics start. CMS embeds suppression sentinels that silently corrupt typed ingestion. The obvious peer-group key — CMS's own specialty text — lumps 116k providers under \"Internal Medicine\" and produced a 45% flag rate on the first iteration. And the classical z-score is dragged by the same right-skewed tails it is trying to detect, so it under-flags the providers most worth reviewing.",
      question:
        "Can public CMS data support a defensible outlier triage — where every flag traces to a peer group, a denominator, and a stated method a reviewer can audit?",
    },
    requirements: [
      {
        stakeholder: "Program-integrity analyst",
        need: "A triage list, not an adjudication — per-metric flags with deviation magnitude and an auditable denominator behind every flag.",
        evidence: "Per-metric peer-coverage counts exposed in the mart",
      },
      {
        stakeholder: "Methodology reviewer",
        need: "Peer groups that compare like with like — subspecialists benchmarked against subspecialists, within the market they practice in.",
        evidence: "Taxonomy × state peers · IM flag rate 45% → 31.8%",
      },
      {
        stakeholder: "Public consumer",
        need: "An explorable surface with no warehouse credentials, plus model-level documentation and lineage.",
        evidence: "Evidence app + dbt docs live on GitHub Pages",
      },
      {
        stakeholder: "Data quality",
        need: "Suppression sentinels and CMS formatting quirks must never silently corrupt a metric; business invariants enforced as tests.",
        evidence: "48 dbt tests · ~982 lines of schema YAML",
      },
    ],
    decisions: {
      criteria: [
        "Compares like with like",
        "Robust to right-skew",
        "Auditable denominator",
        "Build effort",
      ],
      options: [
        {
          option: "Global thresholds, no peer groups",
          scores: ["unmet", "unmet", "partial", "met"],
        },
        {
          option: "CMS specialty text peers + classical z-score",
          scores: ["partial", "unmet", "partial", "met"],
        },
        {
          option: "NPPES taxonomy × state peers, MAD + z-score both computed",
          chosen: true,
          scores: ["met", "met", "met", "partial"],
          rationale:
            "The peer-group key does more work than the statistic. Switching from CMS specialty text to NPPES primary taxonomy split Internal Medicine into 28 subspecialties whose median Part D cost spans $5k (Sports Medicine) to $1.1M (Hematology & Oncology) — populations that should never share a baseline — and dropped the IM flag rate from 45% to 31.8%. On honest peers, both statistics ship per metric: the MAD modified z-score is the workhorse because medians resist the mega-prescriber tail; the classical z-score is the conservative contrast — 5.23% vs 2.01% flagged. An n ≥ 30 floor means no provider is ever flagged against a thin median.",
        },
      ],
    },
    solution: {
      summary:
        "A dbt star schema on Snowflake — a provider dimension, two provider-year facts, and an outlier mart — scored within 9,490 peer groups by two detection statistics, tested 48 ways, and published as two live credential-free surfaces.",
      pillars: [
        {
          title: "Load that respects the source",
          detail:
            "DuckDB pre-filters NPPES from 11.4 GB to 647 MB before COPY INTO; every raw column lands as VARCHAR because CMS embeds suppression sentinels — staging strips and casts once, visibly, instead of letting type inference fail silently.",
        },
        {
          title: "Star schema with tests as contract",
          detail:
            "Staging views → intermediate peer-group stats → dim_provider, two provider-year facts, and mart_provider_outliers. 48 tests (45 schema + 3 singular business invariants), ~982 lines of schema YAML, and CI that parses the DAG offline on every push.",
        },
        {
          title: "Peer-grouped robust detection",
          detail:
            "Six metrics scored within NPPES taxonomy × state groups with an n ≥ 30 floor and per-metric coverage gates. The MAD modified z-score (3.5) is the workhorse; the classical z-score (2.0) is the conservative counterpart — both exposed per metric.",
        },
        {
          title: "BI-as-code delivery",
          detail:
            "An Evidence data app — KPIs, a metric-parameterized ranked outlier table, provider drill-down, state choropleth, methodology — served static from committed extracts, plus the dbt docs lineage site. A five-tab Hex notebook spec documents the warehouse-native version.",
        },
      ],
    },
    outcome: {
      kind: "metrics",
      items: [
        {
          metric: "Source data",
          after: "43.7M rows",
          note: "Part D 26.8M · Part B 9.7M · NPPES 7.2M (CY 2023)",
        },
        {
          metric: "Providers scored",
          after: "7.06M",
          note: "9,490 taxonomy × state peer groups · n ≥ 30 floor",
        },
        {
          metric: "Internal Medicine flag rate",
          before: "45%",
          after: "31.8%",
          note: "CMS specialty text → NPPES taxonomy peers",
        },
        {
          metric: "Detection contrast",
          after: "MAD 5.23% vs z 2.01%",
          note: "369,200 vs 141,766 flagged — the robust statistic is the workhorse",
        },
        {
          metric: "Quality + delivery",
          after: "48/48 tests · 2 live surfaces",
          note: "Evidence app + dbt docs on GitHub Pages, credential-free",
        },
      ],
    },
  },
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Cabana",
    category: "Ops Automation + AI",
    summary:
      "A demo portal for a fictional pool-service company. Customers report problems, track repairs, and pay test deposits. AI classifies requests and drafts acknowledgments for staff; staff control pricing and scheduling.",
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
      "Q8_0 ≡ FP16 (TOST, ±1pp margin)",
      "Q4_K_M: −3.2pp micro-F1 on NER (p_adj=0.032)",
    ],
    artifact: {
      problem: {
        situation:
          "Model quantization is a routine production decision: ship at FP16 and pay for the GPU memory, or ship at Q4 and absorb some quality loss for cheaper, faster inference. Most teams pick by feel.",
        complication:
          "Published quantization evaluations report whole-benchmark scores (\"Q4 retains 96% of FP16's MMLU\") — not actionable for a PM choosing what precision to ship for a specific workload. The published intuition that \"Q4 is fine for pattern-matching, hurts on reasoning\" turned out to be wrong in this study's data.",
        question:
          "Can a single-model, paired-design experiment produce a decision framework that picks the right precision per workload — and characterize how quantization fails, not just whether it does?",
      },
      requirements: [
        {
          stakeholder: "PM choosing a quantization level",
          need: "Cost/quality framing per workload, not a leaderboard. \"Ship Q8_0 unless you have a specific reason not to\" beats a four-decimal benchmark score.",
          evidence: "The deliverable is a decision framework with explicit pick-Q8 / pick-Q4 / stay-at-FP16 conditions.",
        },
        {
          stakeholder: "Skeptical reviewer",
          need: "Paired CIs, multiple-comparison correction, and real effect sizes — not point estimates that hide the variance.",
          evidence: "Wilson + paired bootstrap + McNemar + Holm-Bonferroni; CIs reported on every effect size.",
        },
        {
          stakeholder: "Anyone reproducing the result",
          need: "Deterministic sampling, fixed seed, single-machine reruns; per-example raw outputs shipped alongside summary stats.",
          evidence: "n=2,400 raw JSONL outputs committed; temperature=0; round-robin schedule debiases tok/sec.",
        },
        {
          stakeholder: "Failure-mode characterization",
          need: "Not just \"Q4 is worse\" but how it fails — so downstream teams know what to guard against.",
          evidence: "Q4 emits well-formed JSON at a slightly higher parse rate than FP16, but over-extracts — the NER hit is a precision loss (−4.1pp), not recall, concentrated on entity-free sentences.",
        },
      ],
      decisions: {
        criteria: [
          "Statistical rigor on paired data",
          "Decision-making utility for PMs",
          "Reproducibility on commodity hardware",
          "Scope honesty",
        ],
        options: [
          {
            option: "Single benchmark (MMLU only), one summary number per arm",
            scores: ["partial", "unmet", "met", "partial"],
          },
          {
            option: "Two benchmarks, independent-sample CIs across arms",
            scores: ["partial", "partial", "met", "met"],
          },
          {
            option:
              "Paired design across two contrasting tasks, paired bootstrap + Holm-corrected pairwise effects, cluster-bootstrap on subjects, decision framework as deliverable",
            chosen: true,
            scores: ["met", "met", "met", "met"],
            rationale:
              "Pairing same items across arms exploits the within-example correlation that independent-sample tests discard — n=499 paired with σ_diff=0.30 detects ≥3.8pp at 80% power, materially tighter than the same n unpaired. Two tasks (MMLU = reasoning/classification; CoNLL-2003 NER = structured extraction) catch the failure mode that a single benchmark hides: Q4's NER regression isn't visible in MMLU. Holm-Bonferroni per task (3 pairwise tests each) controls family-wise error without the over-correction of cross-task Bonferroni. Cluster-bootstrap on subjects for the MMLU overall CI accounts for within-subject correlation that the iid bootstrap underestimates. The decision framework — pick Q8 by default, pick Q4 under specified constraints, stay at FP16 in other specified cases — is what a PM actually needs from this kind of study; leaderboard numbers are not.",
          },
        ],
      },
      solution: {
        summary:
          "Three-arm paired controlled experiment with round-robin scheduling, statistical methodology built for paired data, and a decision framework — not a benchmark leaderboard — as the deliverable.",
        pillars: [
          {
            title: "Paired design with round-robin scheduling",
            detail:
              "Every example scored across all three arms before moving to the next. Warmups for all arms precede the timed loop; arm order interleaves per example. Debiases tok/sec against thermal and daemon drift that sequential-arm execution silently bakes in. Same items, same prompts, same seed (42).",
          },
          {
            title: "Two tasks chosen for contrast",
            detail:
              "MMLU (knowledge/reasoning, four-way multiple choice, stratified across 10 subjects, mechanically scored from the first A–D character) and CoNLL-2003 NER (structured extraction, span-F1 with type-match required, malformed JSON scored as 0). The contrast is the point: one classification task and one structured-extraction task surface different failure modes.",
          },
          {
            title: "Statistical methodology built for the paired design",
            detail:
              "Wilson 95% CI for MMLU accuracy; corpus micro-F1 (the canonical CoNLL metric) as the primary NER number, with per-sentence macro-F1 reported alongside as a brittleness view. Pairwise differences via paired bootstrap; p-values via McNemar (binary) or paired bootstrap centered under H0. Holm-Bonferroni per task. Cluster-bootstrap on subjects for the MMLU overall CI. Equivalence (Q8≈FP16) stated as a TOST result against a specified ±1pp practical-equivalence margin, not as the absence of a significant difference.",
          },
          {
            title: "Decision framework as deliverable",
            detail:
              "The output is not \"Q8 = 0.587 accuracy.\" The output is \"pick Q8_0 as the default; pick Q4_K_M when memory or latency is binding and the workload doesn't include structured information extraction; stay at FP16 when accuracy is the binding constraint.\" Each pick condition tied to a specific finding with a CI and a corrected p-value.",
          },
        ],
      },
      outcome: {
        kind: "metrics",
        items: [
          {
            metric: "Sample size",
            after: "n=2,400 raw outputs",
            note: "3 arms × (500 MMLU + 300 NER) examples · committed alongside summary stats",
          },
          {
            metric: "Q8_0 vs FP16",
            after: "Practically equivalent (TOST, ±1pp)",
            note: "MMLU p_TOST=0.019 · NER macro p_TOST=0.002 · a positive equivalence claim, not non-significance",
          },
          {
            metric: "Q4_K_M vs FP16 on NER",
            after: "−3.2pp micro-F1 (significant)",
            note: "canonical CoNLL micro-F1, 95% CI [0.7, 5.7pp], p_adj=0.032 · −5.0pp on per-sentence macro-F1 (p_adj=0.003)",
          },
          {
            metric: "Throughput / memory at Q8_0",
            after: "1.8× FP16 / 0.53× memory",
            note: "Q4_K_M: 2.5× throughput / 0.31× memory · MacBook M4 Max",
          },
        ],
      },
    },
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
      "An AI-assisted tool for ranking product ideas by reach, impact, confidence, and effort. Users can review and adjust suggested scores, compare options, and record the reasons for their decisions.",
    href: "/work/tarazu",
    slug: "tarazu",
    liveHref: "https://prioritize.kristenmartino.ai",
    year: "2024",
    status: "Shipped",
    mode: "Solo build",
    shape: "decision",
    image: "/work/tarazu.png",
    imageAlt:
      "Tarazu marketing hero — the 'Weigh what to build next' headline over the balance motif, above the five-step decision lifecycle.",
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
            title: "The reader surface",
            detail:
              "News across 10 categories from ~50 vetted outlets. AI-generated summaries on every article (pipeline-side, not click-side). Topic search via Voyage AI vector similarity with SSE streaming and Claude web-search fallback. Multi-source comparison via a LangGraph fan-out workflow that pulls coverage across outlets, extracts claims, and shows the framing side-by-side. Bookmarks (Clerk-synced), dark/light themes, auth.",
          },
          {
            title: "The civic-literacy layer",
            detail:
              "*'What you should know first'* — an adaptive primer above each story with the key terms and context the article assumes you already have. Inline glossary on every civic term, with chip tooltips and click-through to the full dossier. Civic dossiers for politicians (committees, top industries by PAC contributions, interest-group ratings), organizations (political lean, finances, funders, FARA registration), bills (status, sponsor, cosponsors, lobbying spend), and news outlets (ownership, AllSides + MBFC ratings) — all sourced from public records. Cross-spectrum framing shows how Left / Center / Right outlets covered the same story.",
          },
          {
            title: "AI split by SLA",
            detail:
              "The browse path is pre-computed in a background pipeline (FastAPI + LangGraph + Anthropic on Railway, 10-minute cadence) and served from Neon Postgres in ~50ms. The live AI path — compare and topic search — runs AI on request and accepts ~10–15s because the user is asking for analysis. Ten services run on the pipeline: primer generation, entity extraction, entity linking, summarization, story synthesis, story clustering, civic context, batched API, cross-source comparison, usage tracking.",
          },
          {
            title: "Public-records sourcing",
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
            note: "AI summaries · topic search · multi-source compare",
          },
          {
            metric: "Civic-literacy layer",
            after: "Primer + glossary + 4 dossier types",
            note: "OpenSecrets · GovTrack · ProPublica · FARA · FEC",
          },
          {
            metric: "Browse latency",
            before: "~15s",
            after: "~50ms",
            note: "AI moved to background; compare/search on a separate live path",
          },
          {
            metric: "Pipeline",
            after: "10 LangGraph services",
            note: "Primer · entity extraction · linking · synthesis · compare",
          },
        ],
      },
    },
  },
  {
    index: "10",
    title: "FocusForge",
    category: "iOS Mobile App",
    summary:
      "An iOS focus timer that turns completed sessions into character progression and cosmetic rewards. Its on-device coach selects written prompts for setting session goals, reflecting afterward, and maintaining a streak.",
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
              "PracticeFlow + SpecialtyPulse — benchmarking against MGMA/HFMA standards and trend monitoring at practice and specialty level, anchored on CMS NPPES, Medicare PUF, and Census demographics. SpecialtyPulse Pipeline documents the pipeline code, example policies and limits of the public demo.",
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
