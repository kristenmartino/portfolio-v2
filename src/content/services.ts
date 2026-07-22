/* ─────────────────────────────────────────────────────────────────────────
   /work-with-me — client-facing offer (Contra channel)
   Single source of truth for all copy on the services page. Components read
   from here; changing a headline, a price, or a symptom never touches a
   component. Mirrors the site.ts / work.ts content conventions.

   TWO THINGS TO CONFIRM BEFORE LAUNCH:
   1. activeHeadline — "A" (legible entry) or "B" (positioning-first). Both are
      written below; the choice is this one field.
   2. Prices in `engagements[].anchor` are "starting at" placeholders reasoned
      from ~$150/hr. Set the real figures.
   3. CONTRA_URL — set to the real Contra profile URL.
   ──────────────────────────────────────────────────────────────────────── */

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
  /** "starting at" anchor — placeholder, confirm before launch. */
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
  /** Reframed one-liner: what this proves about the offer. */
  claim: string;
  detail: string;
  metric: string;
  caseStudyHref: string;
  liveHref: string;
  liveLabel: string;
};

export type ProcessStep = { index: string; title: string; text: string };
export type Faq = { q: string; a: string };

/* ── headline (both framings; pick with activeHeadline) ──────────────────── */

export const activeHeadline: HeadlineKey = "B";

export const headlines: Record<HeadlineKey, ServiceHeadline> = {
  // A — Legible entry, positioned copy. A buyer approves it on sight.
  A: {
    eyebrow: "Product diagnosis · Applied AI · Independent",
    headlineLead: "Find out ",
    headlineAccent: "what's actually wrong",
    sub: "A scoped diagnosis of the AI feature, product decision, or tangled system nobody wants to touch — taken apart and handed back as a plan you can act on.",
    ctaPrimary: { label: "See the engagements", href: "#engagements" },
    ctaSecondary: { label: "Start a diagnosis", href: "#start" },
  },
  // B — Positioning-first. Differentiated, stronger AI-PM signal, sells slower cold.
  B: {
    eyebrow: "AI product judgment · Independent",
    headlineLead: "You shipped AI. ",
    headlineAccent: "Can you prove it works?",
    sub: "Most teams ship an AI feature and cross their fingers. I take it apart — what it does, where it breaks, whether users can trust the output — and hand you a defensible plan.",
    ctaPrimary: { label: "Book a reality check", href: "#engagements" },
    ctaSecondary: { label: "See the proof", href: "#proof" },
  },
};

/* Second clause of A's headline needs a trailing line so the accent wraps
   cleanly under the lead on the hero. Kept as a suffix rather than baked in
   so the accent span stays isolatable. */
export const headlineTail: Record<HeadlineKey, string> = {
  A: " before you build the fix.",
  B: "",
};

/* ── symptom router — "Which of these is you?" ───────────────────────────── */

export const routerHeading = "Which of these is you?";
export const routerSub =
  "Pick the one that stings. It points to where I'd start.";

export const symptoms: readonly Symptom[] = [
  {
    key: "shipped-unsure",
    index: "A",
    statement:
      "We shipped an AI feature and can't tell if it's actually working.",
    routesTo: "reality-check",
    tag: "Shipped, unsure",
  },
  {
    key: "pre-build",
    index: "B",
    statement:
      "We're about to build with AI and aren't sure it's the right thing.",
    routesTo: "full-diagnosis",
    tag: "Pre-build",
  },
  {
    key: "stuck-decision",
    index: "C",
    statement:
      "We have a hard product call to make and can't get to a defensible answer.",
    routesTo: "full-diagnosis",
    tag: "Stuck decision",
  },
] as const;

/* ── engagements ─────────────────────────────────────────────────────────── */

export const engagementsHeading = "Two ways in.";
export const engagementsSub =
  "Both end in a written diagnosis — findings ranked, reasoning shown, a plan you can act on without me in the room.";

export const engagements: readonly Engagement[] = [
  {
    id: "reality-check",
    index: "01",
    name: "Reality Check",
    anchor: "from $1,500",
    timeline: "~1 week",
    cadence: "Mostly async",
    forWho:
      "You've shipped an AI feature and need to know, fast, whether it holds up.",
    scope: [
      "A structured teardown of one AI feature or model-driven decision",
      "Where it breaks — failure modes, silent errors, the inputs that make it lie",
      "Whether users can trust the output, and whether you can defend it",
      "A prioritized fix list you can hand to engineering Monday",
    ],
    deliverable: {
      title: "Diagnosis memo",
      items: [
        "Findings ranked by severity",
        "Root causes, not symptoms",
        "Concrete next actions",
        "What I'd fix first — and what I'd leave",
      ],
    },
    cta: "Start a Reality Check",
  },
  {
    id: "full-diagnosis",
    index: "02",
    name: "Full Diagnosis + Roadmap",
    anchor: "from $6,000",
    timeline: "~2 weeks",
    cadence: "Interviews + async",
    forWho:
      "You're about to build — or rebuild — and want the problem framed right before the spend.",
    scope: [
      "Stakeholder interviews and a first-principles read of the system",
      "The actual problem, separated from the one you were handed",
      "Options weighed against explicit criteria — decision intelligence on your problem",
      "A sequenced roadmap engineering and leadership can both act on",
    ],
    deliverable: {
      title: "Diagnosis + roadmap",
      items: [
        "The problem, reframed and evidenced",
        "Decision criteria made explicit",
        "A sequenced build plan",
        "The one-pager for your leadership",
      ],
    },
    cta: "Scope a Full Diagnosis",
  },
] as const;

/* ── proof — real, linkable case studies reframed as evidence of judgment ── */

export const proofHeading = "Why trust my read.";
export const proofSub =
  "I sell judgment about AI systems because I've built the hard version myself — and shipped it with the receipts public.";

export const proof: readonly ProofItem[] = [
  {
    slug: "eval-harness",
    name: "Eval Harness",
    claim: "Proving an AI is good enough to ship.",
    detail:
      "A defensible framework for routing LLM calls between open-weight and frontier models — cross-vendor judging, a verifiable held-out lock, cost measured per quality point.",
    metric: "9 models · 4 real tasks · held-out lock",
    caseStudyHref: "/work/eval-harness",
    liveHref: "https://evals.kristenmartino.ai",
    liveLabel: "evals.kristenmartino.ai",
  },
  {
    slug: "cabana",
    name: "Cabana",
    claim: "AI that drafts, never commits.",
    detail:
      "A field-service ops system where Claude triages free-text requests but never promises a price or a time — chaos-tested to zero lost and zero duplicated under injected failure.",
    metric: "0 lost / 0 duplicated · webhook-authoritative",
    caseStudyHref: "/work/cabana",
    liveHref: "https://cabana-kristenmartinos-projects.vercel.app",
    liveLabel: "Try the demo",
  },
  {
    slug: "tarazu",
    name: "Tarazu",
    claim: "Judgment made legible, not automated.",
    detail:
      "A prioritization tool that makes a team's reasoning defensible instead of taking the decision away from them — the method behind the Full Diagnosis.",
    metric: "RICE · per-dimension AI coaching",
    caseStudyHref: "/work/tarazu",
    liveHref: "https://prioritize.kristenmartino.ai",
    liveLabel: "prioritize.kristenmartino.ai",
  },
] as const;

/* ── how it works ────────────────────────────────────────────────────────── */

export const processHeading = "How it works.";

export const processSteps: readonly ProcessStep[] = [
  {
    index: "01",
    title: "Diagnose",
    text: "I take the thing apart — the feature, the decision, the system — and find where it actually breaks. Interviews, code, data, whatever the truth is in.",
  },
  {
    index: "02",
    title: "Document",
    text: "You get a written artifact, not a meeting you have to remember. Findings ranked, reasoning shown, every claim something you can defend.",
  },
  {
    index: "03",
    title: "Decide",
    text: "You leave with a prioritized plan and a clear first move. Build it yourself, hand it to your team, or bring me back for the next layer.",
  },
] as const;

/* ── questions / objections ──────────────────────────────────────────────── */

export const faqHeading = "Fair questions.";

export const faqs: readonly Faq[] = [
  {
    q: "What do I actually get?",
    a: "A written diagnosis — findings ranked by severity, root causes, and a prioritized plan your team can act on without me in the room. A document, not a slide deck and a vibe.",
  },
  {
    q: "You don't have client reviews yet.",
    a: "True — I'm early on Contra, so early clients get an honest discount and my full attention. What I do have is a shelf of shipped systems with the receipts public: eval harnesses, fail-closed AI, real holdout metrics. You're not betting on a promise.",
  },
  {
    q: "Do we need to meet?",
    a: "A Reality Check runs mostly async — you send access and context, I send back the diagnosis. A Full Diagnosis includes interviews. Either way the deliverable is written, so nothing lives only in someone's memory.",
  },
  {
    q: "What if it's not really an AI problem?",
    a: "Then I'll tell you that. Half of “our AI is broken” is a product or data problem wearing an AI costume. Finding that out is the point.",
  },
  {
    q: "Is my code and data safe?",
    a: "Read-only by default, scoped access, nothing retained after the engagement. I diagnose; I don't exfiltrate.",
  },
] as const;

/* ── final CTA (buyers only — no “open to roles” here) ───────────────────── */

export const startHeading = "Tell me what's breaking.";
export const startSub =
  "One AI feature, one hard decision, one tangled system. Send me the messy version — I'll tell you what I see.";

export const startLinks = {
  contra: { label: "Start on Contra", href: CONTRA_URL, primary: true },
  email: { label: "kristen@kristenmartino.ai", href: "mailto:kristen@kristenmartino.ai?subject=Diagnosis%20inquiry" },
} as const;

/* ── page metadata ───────────────────────────────────────────────────────── */

export const servicesMeta = {
  title: "Work with me — AI product diagnosis · Kristen Martino",
  description:
    "A scoped diagnosis of your AI feature, product decision, or tangled system — taken apart and handed back as a plan you can act on. Independent, applied-AI product judgment.",
} as const;
