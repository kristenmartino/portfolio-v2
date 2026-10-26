# Five AI persona-pair comparison — preregistered protocol

Prepared 2026-10-26T19:27:48.714877+00:00. Source revision `d628a13592a5d0f5cc0ca93f6cce5f0c265258ca`.

This is a simulation with fictional identities, not recruitment, customer discovery, human validation or a five-human-pair study. All agents use separate fresh contexts with the inherited model; agents are not independent human participants. The human study remains 0 of 5 pairs.

## Design

Five analyst personas each complete two matched-scope scenarios: one constructed CSV-report workflow and one actual live app-generated brief workflow. Method/scenario assignment and order are fixed in personas-and-assignment.json before outputs are created: three CSV-first, two app-first. Every case compares 2022→2023 for one specialty/HCPCS and checks sales coverage/exposure. Pair 5 tests absent coverage; the other pairs test supplied overdue pipeline.

Each persona first documents its assumed existing workflow using a structured interview. Its answers are generated from a role brief, not an observed or confirmed real-world workflow. Historical preparation time is unknown and must not be invented. The comparator report is constructed from the published fixture and shared benchmark transformations, not a recruited analyst's report.

Agents receive reporting extracts, selected-specialty raw rows, the full sales CSV (for the share denominator), definitions and pinned source links. App-condition agents additionally receive the untouched app-generated draft. The coordinator performs browser capture; this effort is excluded from agent artifact-preparation timing. Each method's actual UTC start/end and checks performed are recorded. Any timing comparison is descriptive AI runtime, not human efficiency or app usability.

Separate reviewer personas receive common-format brief packets with neutral case labels, no method/order labels and no answer key. Content/source links may reveal method cues, so this is label masking rather than guaranteed blinding. Reviewers first state next actions and clarification requests without source browsing or answers. Actual requests are then routed to the analyst and replies logged before a follow-up reviewer decision.

## Prespecified assessment

- Completeness: selected comparison/evidence, observation with limits, open question, and next reviewer with concrete check; at least 4/5 app briefs and at least as many as comparator.
- Interpretation: zero critical errors. Critical errors include synthetic-as-history, specialty-score-as-account-need, ACV-as-revenue/forecast, missing coverage as confirmed zero, unsupported commercial approval, or materially wrong calculations.
- Recipient clarity: at least 4/5 app briefs allow the reviewer to state a next action before clarification, with no more clarification requests overall than comparator.
- Human preparation-time threshold (20% median paired improvement) is NOT assessable in this artifact simulation. Agent runtimes are descriptive only.

The coordinator independently reconciles numeric fields against raw CSVs with Decimal arithmetic (answer key withheld from analyst/reviewer prompts) and checks qualitative claims. Report failures and missing outputs as observed; do not improve briefs before scoring. The coordinator knows the methods, so qualitative adjudication is not blinded. Five simulated pairs cannot establish adoption, stakeholder approval, real-workflow fit or business impact.
