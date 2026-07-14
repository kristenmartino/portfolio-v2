import type {
  Artifact,
  FeaturedProject,
  Project,
  ProjectMode,
} from "@/lib/types";

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
      "Member portal and operations layer for a field-service company — free-text repair requests triaged by Claude Haiku, deposits taken through webhook-authoritative Stripe, and a transactional outbox that guarantees no side effect is ever silently dropped; chaos-tested to zero lost and zero duplicated under injected failure.",
    href: "/work/cabana",
    slug: "cabana",
    codeHref: "https://github.com/kristenmartino/cabana",
    year: "2026",
    status: "In progress",
    mode: "Solo build",
    shape: "pipeline",
    image: "/work/cabana-architecture-dark.png",
    imageAlt:
      "Cabana system architecture — a member browser to Next.js, Supabase Postgres as the source of truth with three edge functions, and n8n fanning out to Airtable, Telegram, and email through a transactional outbox.",
    metrics: [
      "8 services · transactional outbox",
      "Webhook-authoritative payments · RLS",
      "Chaos-tested: 0 lost / 0 duplicated · 50 bookings",
      "Next.js 15 · Supabase · Claude Haiku · n8n",
    ],
    artifact: {
      problem: {
        situation:
          "Sailfish Pool Care — a fictional three-tech residential pool company — runs like many real ones: repair requests arrive as free text across call, text, and Messenger; the owner approves work from his truck; the office lives in a spreadsheet. Requests get lost, customer data is retyped into four places, and deposits go uncollected because asking is awkward.",
        complication:
          "The obvious build drops data in the places that matter most. Fire-and-forget notifications vanish when a downstream service blinks; trusting Stripe's success redirect double-books on replay; two-way sync between the app and Airtable drifts; and an AI that can promise a price or a time turns a confident misread into a commitment the company has to honor.",
        question:
          "Can a solo build hold an SMB ops system to a distributed-systems correctness bar — every integration with a named failure, detection, and handling path — without over-building past what three techs actually need?",
      },
      requirements: [
        {
          stakeholder: "Member",
          need: "Describe a problem in plain words and get a real acknowledgment in seconds — no form shaped like the company's database, and no promise the business can't keep.",
          evidence: "Free-text intake to Haiku triage; drafts only, never commits a price or time",
        },
        {
          stakeholder: "Dana (owner)",
          need: "Approve or decline work in one tap from the field, with an audit trail of who acted and how.",
          evidence: "Telegram inline Approve · idempotent · one booking_transitions row per decision",
        },
        {
          stakeholder: "Marie (office)",
          need: "Run the week from a familiar console she can actually edit — without it becoming a second source of truth.",
          evidence: "Airtable projection + two-field whitelisted write-back through a guarded edge function",
        },
        {
          stakeholder: "The system itself",
          need: "No status change, payment, or notification may ever be silently lost, and every failure must be detectable.",
          evidence: "Transactional outbox + stripe_events ledger + RLS · a failure-modes table with a Detection column per integration",
        },
      ],
      decisions: {
        criteria: [
          "No side effect silently lost",
          "Recovers after downtime",
          "Operator-inspectable",
          "Build effort",
        ],
        options: [
          {
            option: "Call Airtable / Telegram / email inline from app code",
            scores: ["unmet", "unmet", "unmet", "met"],
          },
          {
            option: "Fire-and-forget: DB triggers call n8n directly",
            scores: ["unmet", "unmet", "partial", "met"],
          },
          {
            option: "Transactional outbox committed with the state change, consumed by n8n",
            chosen: true,
            scores: ["met", "met", "met", "partial"],
            rationale:
              "The event commits in the same transaction as the status change, so it exists if and only if the state change did — the failure the requirement names (a notification that silently vanishes when a downstream service blinks) becomes unrepresentable. n8n consumes at-least-once with a dedupe key, retries to a dead-letter queue, alerts, and a nightly reconciliation backstops it; a webhook nudge handles latency while a 60-second sweep handles the guarantee, so no single channel is asked to do both. Fire-and-forget triggers are the amateur default — if n8n is down at that instant, the event is gone — and inline calls also couple the member's request latency to three third-party APIs. The cost is a consumer and a queue to operate; n8n on Railway keeps that inspectable by a non-engineer.",
          },
        ],
      },
      solution: {
        summary:
          "A Supabase-Postgres core as the single source of truth, fronted by a Next.js member portal and three inbound webhook edge functions, with every outbound side effect delivered through a transactional outbox and n8n — retries, dead-lettering, alerting, nightly reconciliation. Claude Haiku triages intake as a bounded subsystem that can draft but never commit.",
        pillars: [
          {
            title: "AI that drafts, never commits",
            detail:
              "Haiku classifies free-text intake against a zod schema and drafts an acknowledgment. No code path lets model output set a price, a time, or a status past awaiting_deposit / needs_review; timeout or bad output routes to a human, and the member flow can never throw on a model failure. The golden set enforces 100% prompt-injection containment in CI, deterministically at temperature 0.",
          },
          {
            title: "Payment truth is the webhook",
            detail:
              "Hosted Stripe Checkout; payment state changes only from signature-verified events, recorded in a stripe_events idempotency ledger tolerant of replay and out-of-order delivery. The success redirect is cosmetic — the page polls until the database says paid, so a member who pays and closes the tab still lands on Scheduled.",
          },
          {
            title: "The transactional outbox",
            detail:
              "Every status change commits its side-effect event in the same transaction; n8n consumes at-least-once with a dedupe key, retries to a dead-letter queue, alerts, and reconciles nightly. Orchestration lives where a non-engineer operator can open it and see the flow.",
          },
          {
            title: "Isolation and audit in the database",
            detail:
              "RLS is the security boundary — enforced in Postgres, not UI filters, and probed by an adversarial test suite (cross-member reads through join paths; browsers get 42501 on writes). Every status write goes through one RPC so the actor and the write share a transaction, and the audit records who acted via which channel.",
          },
        ],
      },
      outcome: {
        kind: "metrics",
        items: [
          {
            metric: "Delivery under chaos",
            after: "0 lost / 0 duplicated",
            note: "50 bookings through a live pipeline while n8n was killed, Airtable auth broken, and Stripe events replayed — one committed run, demo volume",
          },
          {
            metric: "Payment truth",
            after: "Webhook-authoritative + idempotent",
            note: "State changes only from signature-verified Stripe events, recorded once in a stripe_events ledger",
          },
          {
            metric: "Member isolation",
            after: "RLS, adversarially tested",
            note: "18-test suite probes cross-member reads through join paths; the database is the boundary, not UI filters",
          },
          {
            metric: "AI safety",
            after: "Structural, not prompted",
            note: "No path lets triage commit price/time/status; golden set: 100% injection containment in CI at temperature 0",
          },
          {
            metric: "What chaos found",
            after: "A real DLQ bug (#23)",
            note: "Dead-lettering wasn't terminal — the test surfaced it; nothing lost, louder than intended; fix scoped as migration 0016",
          },
        ],
      },
    },
  },
  {
    index: "02",
    title: "SpecialtyPulse Pipeline",
    category: "Healthcare Data Platform",
    summary:
      "Production-style healthcare BI pipeline — CMS Medicare reimbursement data through Databricks raw → staging → mart layers on Delta Lake, orchestrated by Airflow, delivered to a five-page executive dashboard behind verified row-level security and certified metric definitions.",
    href: "/work/specialtypulse-pipeline",
    slug: "specialtypulse-pipeline",
    liveHref: "https://specialtypulse.vercel.app",
    codeHref: "https://github.com/kristenmartino/specialtypulse_pipeline",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "pipeline",
    image: "/work/specialtypulse.png",
    imageAlt:
      "SpecialtyPulse dashboard — Market Intelligence page with pressure index by specialty, reimbursement compression trend, and volume-versus-compression views",
    metrics: [
      "CMS PUF 2021–2023 · Delta Lake",
      "Databricks PySpark · Airflow",
      "Domo DataFlow · 5-page dashboard",
      "Row-level security · CI-verified",
    ],
    artifact: {
      problem: {
        situation:
          "Specialty-healthcare GTM teams set territory and outreach priorities off Medicare reimbursement trends, and CMS publishes the data that answers the question — the Physician & Other Practitioners PUF, released annually as multi-gigabyte CSVs with no types, no benchmarks, and no access model.",
        complication:
          "The failure point in stacks like this is rarely the transformation — it is governance at the delivery layer. \"Average Medicare payment\" supports several defensible definitions that diverge exactly when leadership compares numbers at a QBR. And Domo's row-level security has a documented trap: PDP applied to a DataFlow input is silently stripped at execution, so the dashboard reads as governed while serving every row to every user.",
        question:
          "Can one pipeline land certified, role-filtered Medicare market intelligence in the executive reporting layer — with the governance verified by CI rather than asserted in a wiki?",
      },
      requirements: [
        {
          stakeholder: "RevOps leadership",
          need: "Metrics that match board reporting and survive challenge — one certified definition per metric, with competing definitions resolved on the record.",
          evidence: "Certification log records rationale, approver, and impact-if-wrong",
        },
        {
          stakeholder: "Regional sales manager",
          need: "Monday-morning territory signals scoped to their own states — same dashboard, different rows.",
          evidence: "PDP regional role filters provider_state",
        },
        {
          stakeholder: "Specialty analyst",
          need: "Procedure-level depth for their vertical only, benchmarked across specialties.",
          evidence: "PDP specialty filter · 5 specialty analysts scoped",
        },
        {
          stakeholder: "Security & compliance",
          need: "Proof the row-level policies hold on the surface users actually query — not just at setup time.",
          evidence: "pdp_verify script + a dedicated CI governance job",
        },
      ],
      decisions: {
        criteria: [
          "Rows filtered at render",
          "Survives DataFlow runs",
          "Verifiable in CI",
          "Build effort",
        ],
        options: [
          {
            option: "PDP on the mart (the DataFlow input)",
            scores: ["unmet", "unmet", "unmet", "met"],
          },
          {
            option: "Per-role duplicate DataSets and dashboards",
            scores: ["met", "partial", "partial", "unmet"],
          },
          {
            option: "PDP on the DataFlow output — zero policies on input, anti-pattern checked in CI",
            chosen: true,
            scores: ["met", "met", "met", "partial"],
            rationale:
              "PDP-on-input is the classic enterprise Domo mistake: input policies are stripped during DataFlow execution and the output ships unfiltered — worse than no security, because it reads as governed. Here policies apply exclusively to the DataFlow output — four roles across two filter dimensions, with all-rows policies for finance and executive — and a verification script fails if any policy ever appears on the input. A React governance app renders the live role-policy matrix inside the dashboard so the security model is inspectable by the people it governs, and a dedicated CI job re-runs the verification on every push.",
          },
        ],
      },
      solution: {
        summary:
          "A Databricks → Airflow → Domo pipeline: PySpark raw → staging → mart layers on Delta Lake, orchestrated as an Airflow DAG with an explicit data contract, feeding a SQL DataFlow and certified metrics into a five-page executive dashboard behind verified row-level security.",
        pillars: [
          {
            title: "Medallion transform with honest ingestion",
            detail:
              "Raw CMS CSVs land all-strings — schema inference off — because sentinel formatting causes silent cast failures; staging does explicit casts, handles the CMS taxonomy shift across release years, and honors the under-11-services suppression rule. Marts write, validate, then rename, so a failed run never corrupts the served table.",
          },
          {
            title: "Orchestration with an explicit contract",
            detail:
              "An Airflow DAG runs the four PySpark notebooks with per-task retries; a schema contract file is the agreed boundary between the BI side and Data Engineering, and a stakeholder map records who owns, approves, and is consulted on every component.",
          },
          {
            title: "Certified metrics, not just calculated ones",
            detail:
              "Five certified metric definitions enforced in the mart and the Domo SQL DataFlow; every certification logs the competing definitions, the rationale, the approver, and what goes wrong if the other definition wins. Changes require a version bump and a log entry.",
          },
          {
            title: "Governance that proves itself",
            detail:
              "Row-level security on the DataFlow output across four roles and two filter dimensions; a React 18 verification app surfacing the live role-policy matrix; CI that lints, validates the DAG, builds the app, and fails on the PDP anti-pattern.",
          },
        ],
      },
      outcome: {
        kind: "metrics",
        items: [
          {
            metric: "Pipeline",
            after: "raw → staging → mart → Domo",
            note: "4 PySpark notebooks · Delta Lake · Airflow-orchestrated",
          },
          {
            metric: "Coverage",
            after: "CMS PUF 2021–2023",
            note: "Provider × procedure × year grain → specialty-level mart",
          },
          {
            metric: "Governance",
            after: "4 PDP roles · 2 filter dimensions",
            note: "Policies on output only · anti-pattern check fails CI",
          },
          {
            metric: "Certified metrics",
            after: "5 definitions",
            note: "Competing definitions resolved on the record, with approver",
          },
          {
            metric: "Delivery",
            after: "5-page dashboard",
            note: "Market Intelligence · Procedure Detail · Pipeline · Adoption · PDP Governance",
          },
        ],
      },
    },
  },
  {
    index: "03",
    title: "Valuate",
    category: "AI Financial Agent",
    summary:
      "AI-augmented DCF agent — extracts financial line items from SEC 10-Ks via XBRL and Claude, then runs a Monte Carlo valuation with cell-level source attribution.",
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
      "Valuate landing — the ticker picker, each card tagged with its valuation route (bank DDM, REIT FFO, energy NAV-DCF) before running a Monte Carlo DCF on the company's latest 10-K.",
    metrics: [
      "18 tickers, 5 industries",
      "Two-track extraction (XBRL + LLM)",
      "97.7% extraction-eval baseline",
      "Source quotes + HITL review",
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
    index: "04",
    title: "Tenancy",
    category: "AI Document Agent",
    summary:
      "Lease abstraction agent for multifamily operators — extracts nine structured sections from residential lease PDFs with per-field source citations, click-to-highlight overlays anchored to OCR coordinates, a human-review exception queue, and grounded Q&A. The same agent is exposed as an MCP server.",
    href: "/work/tenancy",
    slug: "tenancy",
    liveHref: "https://tenancy.kristenmartino.ai",
    codeHref: "https://github.com/kristenmartino/tenancy-api",
    year: "2026",
    status: "Shipped",
    mode: "Solo build",
    shape: "pipeline",
    image: "/work/tenancy.png",
    imageAlt:
      "Tenancy lease detail view — a page-one residential lease with a source highlight on the resident-name field, beside the structured extraction panel showing per-field confidence scores and source citations.",
    metrics: [
      "9 lease sections · per-field citations",
      "OCR-anchored highlight overlays (pdfplumber)",
      "Approve / edit / reject review queue",
      "FastAPI · LangGraph · Claude · MCP",
    ],
    artifact: {
      problem: {
        situation:
          "Multifamily operators turn lease PDFs into structured data at portfolio scale — during acquisitions, audits, and renewals. An LLM can read a lease and emit the fields; that part is close to free. The schema was never the hard part.",
        complication:
          "The hard part is trust. A reviewer will not accept an extracted field — a rent amount, a deposit, a term date — without seeing where in the document it came from. Building that \"click a field, highlight the source\" link is where the system actually broke: twelve-plus iterations of fuzzy text matching produced confident, wrong-place highlights; a strict exact-match fixed wrong-place by failing silently; and asking the model to emit bounding boxes drifted three to eight percent and boxed entire section headers when the field was a blank template placeholder.",
        question:
          "Can the highlight be anchored to the document — trustworthy enough that a reviewer relies on it — given that a wrong highlight erodes trust faster than no highlight at all?",
      },
      requirements: [
        {
          stakeholder: "Property-management reviewer",
          need: "Every extracted field traceable to its page with a visible highlight on the source line. A highlight in the wrong place is worse than none — it teaches the reviewer to distrust the tool.",
          evidence: "Design rule: a silent miss beats a confident wrong-place highlight",
        },
        {
          stakeholder: "Risk / compliance",
          need: "Nothing reaches the system of record until a human approves, edits, or rejects each flagged exception; a rejected blocker keeps the lease out of the ready state.",
          evidence: "ready_to_proceed derived per lease, gated on unresolved blockers",
        },
        {
          stakeholder: "Extraction honesty",
          need: "When a field is genuinely blank in the lease, report a null value at high confidence rather than inventing a plausible one.",
          evidence: "match_type ∈ filled / blank / inferred / checkbox / absent",
        },
        {
          stakeholder: "Engineer maintaining it",
          need: "The highlight's coordinate source must be swappable — model vision, OCR alignment, AWS Textract — without rewriting the renderer.",
          evidence: "Frontend consumes bboxes: BoundingBox[]; the source stays backend-internal",
        },
      ],
      decisions: {
        criteria: [
          "Positional accuracy",
          "Honest failure mode",
          "Works on blank + scanned fields",
          "Build effort",
        ],
        options: [
          {
            option: "Fuzzy text-layer matching (heuristic, 12+ iterations)",
            scores: ["partial", "unmet", "unmet", "unmet"],
          },
          {
            option: "Strict exact-normalized text match (silent miss on no match)",
            scores: ["partial", "met", "unmet", "met"],
          },
          {
            option: "Model-emitted bounding boxes (Claude vision)",
            scores: ["partial", "partial", "partial", "met"],
          },
          {
            option:
              "OCR-anchored bboxes — pdfplumber word positions + rapidfuzz snippet alignment, one rect per line",
            chosen: true,
            scores: ["met", "met", "met", "partial"],
            rationale:
              "The model returns {value, snippet, match_type, section_label} and never coordinates; the backend aligns the snippet against pdfplumber's word-level positions in the OCR'd PDF and emits one bounding box per line, following the PDF spec's QuadPoints highlight model. The pattern I found across the OCR and document-layout tooling I looked at was consistent enough to commit to: let OCR own geometry, let the model own semantics, and never ask the model to emit coordinates from a raster — that is exactly where model-estimated boxes drift. The renderer consumes a bbox array and is agnostic to where the boxes came from, so the production-grade upgrade (Textract SELECTION_ELEMENT for checkbox and signature geometry) is a backend swap, not a rewrite. The build cost is higher than letting the model emit coordinates — but that option fails exactly where it matters, on the blank and scanned fields a reviewer most needs to verify.",
          },
        ],
      },
      solution: {
        summary:
          "A lease abstraction agent that extracts nine structured sections with per-field provenance, anchors every highlight to OCR coordinates rather than model estimation, gates output behind a human-review exception queue, and answers grounded questions over the result — exposed as both a SaaS UI and an MCP server over the same backend.",
        pillars: [
          {
            title: "Page-image-grounded extraction",
            detail:
              "Claude Sonnet extracts nine sections (parties, property, term, rent, deposits, utilities, pets, special clauses, compliance) over OCR'd text plus a rendered PNG of each page. The image is ground truth for visual fields — checkboxes, signatures, hand-fill — and the OCR text is ground truth for dense prose. That split fixed a class of false-positive checkbox reads where OCR noise looked like a mark.",
          },
          {
            title: "OCR-anchored highlight overlays",
            detail:
              "The backend aligns each field's source snippet against pdfplumber word positions and emits one bounding box per line; the frontend draws absolutely-positioned overlays scaled to the rendered page. Filled values land tight, multi-line values render as stacked rectangles, and blank template fields anchor on the labeled blank line rather than the section header above it.",
          },
          {
            title: "Exception queue with real resolve semantics",
            detail:
              "Validation rules (required-field presence, date order, confidence thresholds) flag exceptions as blocking or warning. Approve accepts the current value; edit rewrites the extraction at the field path and bumps confidence to 1.0; reject closes the row for audit but keeps the blocker material. A derived ready_to_proceed flag gates the lease.",
          },
          {
            title: "Grounded Q&A + MCP surface",
            detail:
              "Claude Haiku answers questions over the stored extraction — every answer cites field path, page, and snippet, and the citation clicks through to the same highlight. The whole agent is also a six-tool MCP server (list, get, extract, query, list-exceptions, resolve), so it runs inside Claude Desktop against the same Railway backend.",
          },
        ],
      },
      outcome: {
        kind: "metrics",
        items: [
          {
            metric: "Extraction",
            after: "9 sections, per-field citations",
            note: "Page, snippet, and confidence on every value; honest null on blank fields",
          },
          {
            metric: "Highlight",
            after: "OCR-anchored, not model-estimated",
            note: "Filled tight · multi-line stacked · blank fields on the blank line · verified end-to-end on a fresh lease",
          },
          {
            metric: "Coverage, stated honestly",
            after: "Checkboxes / signatures not highlighted",
            note: "Deferred to a Textract follow-up — a silent miss beats a wrong-place box",
          },
          {
            metric: "Surfaces",
            after: "SaaS UI + 6-tool MCP server",
            note: "One FastAPI / LangGraph backend · Sonnet extract · Haiku Q&A",
          },
        ],
      },
    },
  },
  {
    index: "05",
    title: "Eval Harness",
    category: "Applied LLM Evaluation",
    summary:
      "Defensible cost/quality eval comparing 9 LLMs (5 open-weight on DGX Spark via Ollama, 4 closed-weight via API) across 4 real production tasks from Sift. Cross-vendor judging, hardware-amortized cost, verifiable held-out lock. Routing-decision framework, not a benchmark. A v0.3 track extends the same substrate to agentic trajectory evaluation — grading an agent's tool-use path, not just a model's answer — with an adversarial guardrail suite and a two-tier CI regression gate, built and tested key-free (165 tests).",
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
      "Eval Harness — the study landing framing an open-weight-versus-frontier LLM evaluation on a real production workload, with methodology, leaderboard, and executive-summary entry points.",
    metrics: [
      "9 models · 4 tasks · planned n=870 across eval sets",
      "Cross-vendor judging · Bradley-Terry MM ranking",
      "Verifiable held-out lock (SHA-256 + git)",
      "Hardware-amortized cost on DGX Spark",
      "v0.3: agentic trajectory eval — agent loop + 6 scorers + adversarial guardrails + 2-tier CI gate (165 tests)",
    ],
    artifact: {
      problem: {
        situation:
          "Public LLM leaderboards (MMLU, HumanEval, BIG-bench) measure general capability on synthetic tasks. They tell an applied team whether a model is competent in the abstract.",
        complication:
          "They do not answer the question that actually drives a production routing decision: for this specific pipeline stage, on this specific corpus, can this specific open-weight model replace the frontier API I'm paying for, and at what cost-per-quality-point trade-off? The only honest way to answer that is to run the actual workload through both and measure with a methodology that holds up under reviewer pressure.",
        question:
          "What does an eval need to look like for an applied team to defensibly route LLM calls between local open-weight and frontier APIs — and what does the methodology have to do to survive scrutiny when the conclusions land?",
      },
      requirements: [
        {
          stakeholder: "Applied team making a routing decision",
          need: "Per-task cost/quality framing, not a single composite score. The decision is per pipeline stage — categorization may route differently from summarization.",
          evidence:
            "Four tasks (categorization, summarization, extraction, RAG), each scored on its own quality + cost frontier; modules A/B implemented, C/D specified and pending",
        },
        {
          stakeholder: "Skeptical reviewer",
          need: "LLM-as-judge architecture that controls for self-preference bias — Sonnet scoring Sonnet's outputs is unfalsifiable.",
          evidence:
            "Cross-vendor judging: Sonnet 4.6 judges non-Anthropic-containing pairs (21 of 36); GPT-4o judges Anthropic-containing pairs (15 of 36). 50-pair overlap with inter-judge Cohen's κ reported.",
        },
        {
          stakeholder: "Reproducibility-first reader",
          need: "Held-out discipline that survives the obvious 'how do I know you didn't peek' question.",
          evidence:
            "Runner enforces held-out access behind an explicit --include-held-out flag and verifies the set against a committed SHA-256 manifest (implemented in eval-harness); the real 20% Set-1 lock is committed to git before any prompt iteration, at corpus pull. Proof is in the commit history.",
        },
        {
          stakeholder: "Procurement / cost-side reader",
          need: "Hardware-amortized cost methodology comparable to published API rates — not a hand-wave.",
          evidence:
            "DGX Spark capex / 3-year useful life + measured wall-clock × FL kWh rate. All assumptions stated; a dual production-scale view is scoped for a later benchmark pass.",
        },
      ],
      decisions: {
        criteria: [
          "Methodological defensibility under reviewer pressure",
          "Per-task actionability for routing decisions",
          "Reproducibility from commit history alone",
          "Reusability across other production systems",
        ],
        options: [
          {
            option:
              "Extend a public benchmark suite (MMLU + HumanEval + BIG-bench) with cost-per-1M-tokens columns",
            scores: ["partial", "unmet", "partial", "partial"],
          },
          {
            option:
              "Run Sift's pipeline through each model and report aggregate accuracy / cost without cross-vendor judging or held-out controls",
            scores: ["unmet", "partial", "unmet", "partial"],
          },
          {
            option:
              "Production-workload eval with cross-vendor judging architecture, verifiable held-out lock, hardware-amortized cost methodology, Bradley-Terry MM pairwise ranking, and a v0.2 spec critique round before any code was written",
            chosen: true,
            scores: ["met", "met", "met", "met"],
            rationale:
              "The methodology IS the deliverable; the leaderboard is the worked example. Cross-vendor judging eliminates self-preference bias on the pairwise summarization task — the single most common LLM-eval methodology failure. Bradley-Terry MM (Hunter 2004) over all 36 model pairs yields a global strength ranking rather than the asymmetric everyone-vs-Haiku design, which would leave Haiku itself unrankable. Hardware-amortized cost lets local compute be compared to API token pricing on a single axis. The held-out lock — enforced in the runner, which refuses held-out access without an explicit flag and verifies the set against a committed SHA-256 manifest — moves 'I held out 20%' from a vibes claim to a verifiable one. The v0.2 critique round caught nine real methodology issues (judge contamination, scoring conflation on JSON, sample-size power, 70B-on-Task-A throughput infeasibility) before any number was computed, applied them as a tracked diff, and deferred three as post-data-collection decisions.",
          },
        ],
      },
      solution: {
        summary:
          "A reusable harness (adapter Protocol + task modules + runner) plus a publication-quality methodology page plus a routing-decision framework — with the leaderboard as the worked example, not the primary artifact.",
        pillars: [
          {
            title: "Cross-vendor judging on pairwise summarization",
            detail:
              "Sonnet 4.6 judges 21 of 36 model pairs (non-Anthropic-containing); GPT-4o judges 15 of 36 (Anthropic-containing). A 50-pair overlap subset is judged by both with inter-judge Cohen's κ reported (caveat triggered if κ < 0.6). Bradley-Terry MM fits a global strength ranking from the full pairwise matrix.",
          },
          {
            title: "Verifiable held-out lock",
            detail:
              "Held-out items live in data/holdout/ separately from data/dev/. The runner refuses held-out access without an explicit --include-held-out flag and verifies the set against a committed SHA-256 manifest before scoring, with tamper-detection tests (implemented in eval-harness). The real Set-1 holdout.sha256 is committed before any prompt tuning begins, at corpus pull; the final-scoring run then lets any reviewer verify the hash never moved and that the held-out flag appears only on the final run.",
          },
          {
            title: "Hardware-amortized cost methodology",
            detail:
              "Local compute cost = DGX Spark capex / (3 years × 365 × 24 hours) × wall-clock + measured power draw × FL residential kWh rate. API models priced at posted token rates as of run date. Per-task tier split: 70B Q4 reported as quality ceiling but excluded from the deployment cost view because expected DGX Spark throughput is infeasible at Sift's daily article volume.",
          },
          {
            title: "Reusable adapter + task abstractions",
            detail:
              "ModelAdapter is a Protocol with one method (complete(prompt, params) → Completion). Tasks are self-contained modules exporting a prompt template, a parser, and a scorer. Swapping the tasks/ directory and pointing at a new dataset is what makes the harness reusable for GridPulse, Tarazu, or any other ML product without re-engineering the runner.",
          },
          {
            title: "Agentic trajectory evaluation (v0.3, Phase 2)",
            detail:
              "A distinct track extends the same substrate from 'which model do we ship' to 'is the agent reliable enough to deploy, and will we catch it when it regresses' — agent evaluation plus observability, not a benchmark. It grades a whole run (plan → tool call → observe → critic → retry → answer): a four-role agent loop (router / planner / executor / critic) over a ToolRegistry seam that mirrors the adapter Protocol, six trajectory scorers (deterministic tool-selection, arg-schema-validity, error-recovery, and citations-cover-gold-id, plus judged answer-correctness and citation-faithfulness), an adversarial guardrail suite (a conjunctive OWASP-LLM01 injection verdict with a planted canary for deterministic disclosure detection, plus a broad stdlib fault-injection set), and a two-tier CI regression gate — a per-PR Tier-A gate that replays recorded trajectories key-free (a prompt edit trips a replay miss, so a regression can't land silently) and a judged Tier-B nightly. Built and tested (165 tests, zero runtime deps); the scorer and statistics choices are grounded in current agent-eval practice (τ-bench pass^k, RAGAS, AgentDojo, SWE-bench Pro). The live run over the real corpus is corpus-gated, same as the Phase-1 leaderboard numbers.",
          },
        ],
      },
      outcome: {
        kind: "metrics",
        items: [
          {
            metric: "Methodology page",
            after:
              "Shipped publication-quality at evals.kristenmartino.ai/methodology",
            note: "Cross-vendor judging, hardware-amortized cost, contamination acknowledgement, 10 sections, 9 cited refs (incl. Hunter 2004 BT MM, Panickssery 2024 self-preference)",
          },
          {
            metric: "Harness infrastructure",
            after: "End-to-end, 78 tests passing (v0.2 substrate)",
            note: "Adapter Protocol (Ollama + Anthropic + OpenAI + Mock) · task modules (categorization + summarization) · runner with JSONL reproducibility headers + resumability + enforced held-out gate + CLI · Bradley-Terry MM",
          },
          {
            metric: "Pre-flight scripts",
            after: "5 stdlib-only",
            note: "Timing benchmark · length-stratified sampler · category distribution check · API cost estimator · annotation validator",
          },
          {
            metric: "v0.2 spec critique",
            after: "9 of 11 items applied",
            note: "Cross-judge calibration overlap, JSON-validity vs F1 split, 70B tier split, held-out lock mechanism, sample-size power statement; 3 items deferred as post-Task-A decisions",
          },
          {
            metric: "v0.3 trajectory-eval harness",
            after: "Built + CI-gated, 165 tests passing",
            note: "Agent loop (router / planner / executor / critic over a ToolRegistry) · 6 trajectory scorers · adversarial guardrail suite (conjunctive injection channels + planted canary + broad stdlib fault injection) · Tier-A cassette-replay regression gate (a prompt edit trips a replay miss) + Tier-B judged nightly · zero runtime deps",
          },
          {
            metric: "v0.3 spec review + remediation",
            after: "Grounded critique shipped",
            note: "Every reuse claim ground-truthed against the code, overstatements corrected, each fix sourced to real agent-eval practice (τ-bench, RAGAS/TREC, AgentDojo/InjecAgent, SWE-bench Pro); shipped as spec-v0.3-diff.md plus a step-7 runbook for the corpus-gated live run",
          },
          {
            metric: "Projected v0.2 API spend",
            after: "$99.96",
            note: "4 closed-weight × 4 tasks + safety + cross-judge overlap, ~3 hours wall-clock at 50 RPM rate limit; Sonnet 4.6 = 69% (candidate + primary judge)",
          },
          {
            metric: "Phase 1 leaderboard numbers",
            after: "Pending",
            note: "Execution begins once Sift corpus is pulled + 70B timing benchmark runs on DGX Spark",
          },
        ],
      },
    },
  },
  {
    index: "06",
    title: "Quantization Study",
    category: "Applied LLM Research",
    summary:
      "Controlled experiment on Llama 3.1 8B at FP16 / Q8_0 / Q4_K_M — paired design across MMLU and CoNLL-2003 NER (n=2,400). Decision framework, not a leaderboard.",
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
    category: "Energy Decision Platform",
    summary:
      "An integrated decision platform for power markets — unifying weather forecasts, scenario analysis, and grid telemetry across operating roles.",
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
      "GridPulse operating view — the Grid Operations Manager dashboard for Florida (FPL), with live demand, a seven-day forecast chart and forecast band, and XGBoost model metrics (MAPE 1.5%, R² 0.991).",
    metrics: [
      "51 BAs · ~99% lower-48",
      "XGBoost · Prophet · SARIMAX ensemble",
      "Real holdout metrics",
      "Cloud Run + scheduled jobs",
    ],
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
  },
  {
    index: "08",
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
      "A news aggregator with civic footnotes. Reads ~50 outlets across the political spectrum, AI-summarizes today's stories across 10 categories — and on top, every politician, organization, bill, and political term in an article links to a structured dossier sourced from public records.",
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
    index: "11",
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
              "PracticeFlow + SpecialtyPulse — benchmarking against MGMA/HFMA standards and trend monitoring at practice and specialty level, anchored on CMS NPPES, Medicare PUF, and Census demographics. SpecialtyPulse is built to production depth in its own case study — SpecialtyPulse Pipeline.",
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
    index: "13",
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
    index: "14",
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
    index: "15",
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

export type Study = {
  eyebrow: string;
  title: string;
  summary: string;
  metrics: string[];
  liveHref?: string;
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
