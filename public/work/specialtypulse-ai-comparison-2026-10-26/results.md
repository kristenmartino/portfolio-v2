# SpecialtyPulse: five AI analyst–reviewer pairs

Completed October 26, 2026 (2026-10-26T19:35:37.974557+00:00). Source revision `d628a13592a5d0f5cc0ca93f6cce5f0c265258ca`.

**Result: both methods produced complete, numerically correct handoffs that the simulated reviewers could interpret. This run did not demonstrate an advantage for SpecialtyPulse.**

**This was an AI simulation with fictional identities. Actual intended-user workflows remain unconfirmed, and the planned human study remains 0 of 5 pairs.** No customer adoption, stakeholder approval, human time savings or business impact was measured.

## What ran

Ten fresh-context agents were used: five analysts and five separate receiving reviewers. Each analyst first documented an assumed existing workflow, then prepared two briefs in its assigned order. One used constructed CSV report extracts; the other started from an untouched draft captured from the live app. Both had matching kinds of optional raw inputs, definitions and pinned source references. There were ten completed briefs and ten initial recipient judgments.

The comparison is artifact-based. The coordinator captured the app drafts; analysts did not navigate the browser. The CSV comparator was constructed from the same fixture and reporting transformations, rather than obtained from real users. Different specialty/procedure scenarios were matched in scope, not proven equal in difficulty. Three pairs used CSV first and two used the app artifact first.

Reviewers received common-format packets with neutral labels and no method key or numeric answer key. They stated next actions before any clarification reply. Source/wording cues remained in some packets, including explicit app references and product URLs, so full method blinding was not achieved. No clarification exchanges were triggered because all ten initial reviews requested none.

## Fictional identities and workflow elicitation

The five workflow descriptions were generated before case work from the supplied role contexts. They are persona assumptions, not confirmed customer research. Historical preparation times were left unknown. Agreement with the assigned report-to-memo pattern demonstrates instruction following, not independent evidence that intended users have this workflow.

| Pair | Analyst → receiving reviewer | Assumed existing workflow and context |
|---|---|---|
| P01 | **Maya Chen**, Revenue operations analyst → **Jordan Ellis**, Regional sales director | Midmarket EHR/PM/RCM vendor; weekly specialty pipeline review. Analyst assembles CSV report extracts and a short sales-operations handoff. Reviewer needs an owner and next check before using exposure for planning. [Workflow](analyst_outputs/P01/workflow.md) |
| P02 | **Luis Ortega**, Finance analytics analyst → **Priya Nair**, Finance business partner | Healthcare-software vendor; monthly commercial planning input. Existing assumed workflow joins a reimbursement report with a CRM export in a workbook and writes a planning-data caveat. Reviewer distinguishes assumed ACV, forecasts and recognized revenue. [Workflow](analyst_outputs/P02/workflow.md) |
| P03 | **Avery Brooks**, BI analyst → **Morgan Reed**, Commercial analytics lead | Analytics team at a specialty-software vendor; weekly certified-metric review. Existing assumed workflow verifies the specialty/procedure/year grain in CSV reports, checks source snapshots and sends a concise evidence memo. Reviewer values reproducibility and explicit missing inputs. [Workflow](analyst_outputs/P03/workflow.md) |
| P04 | **Samira Patel**, Market analysis specialist → **Theo Grant**, Product manager | Specialty-software product team; fortnightly market-signal triage. Existing assumed workflow compares a payment report and a sales report, then drafts discovery questions. Reviewer decides which questions need evidence before discussing a product or commercial recommendation. [Workflow](analyst_outputs/P04/workflow.md) |
| P05 | **Noah Williams**, Business systems analyst → **Riley Park**, Sales operations manager | CRM/reporting team at a healthcare-software vendor; weekly data-quality triage. Existing assumed workflow checks a reimbursement extract against CRM CSV coverage, records missing feeds and sends a systems follow-up memo. Reviewer needs to distinguish absent coverage from a measured zero. [Workflow](analyst_outputs/P05/workflow.md) |

All five profiles identify report preparation, calculation/coverage checks and a written handoff as assumed steps. Actual frequency, tools, source access, effort, pain points, ownership, decision authority and usefulness still require confirmation with real intended users.

## Cases and order

| Pair | First method | CSV report case | App-artifact case |
|---|---|---|---|
| P01 | csv | Dermatology / 99213 | Orthopedic Surgery / 27130 |
| P02 | app | Urology / 51798 | Ophthalmology / 92014 |
| P03 | csv | Gastroenterology / 45378 | Pain Management / 64483 |
| P04 | app | Podiatry / 11721 | Plastic Surgery / 19318 |
| P05 | csv | Cardiology / 99213 | Neurology / 99213 |

Each case compared generated CY2022 with the synthetic CY2023 base and checked sales coverage, exposure and overdue status at the invented August 31, 2026 scenario date. Pair 5 tested absent sales coverage; the other pairs tested supplied overdue opportunities.

## Results against the prespecified criteria

| Measure | CSV reports | App artifacts | Interpretation |
|---|---|---|---|
| Four brief elements complete | 5/5 | 5/5 | Both meet the simulated ≥4/5 quality criterion; no completeness advantage observed |
| Structured field reconciliation | 100/100 checks correct | 100/100 checks correct | 200 comparison/sales field checks matched the independent raw-input answer key |
| Critical interpretation errors found | 0 | 0 | Coordinator review and initial reviewer judgments found none; this is not blinded human assessment |
| Recipient can state next action before clarification | 5/5 | 5/5 | Both meet the simulated ≥4/5 clarity criterion |
| Clarification questions required to understand next action | 0 | 0 | No clarification exchanges triggered; business investigation questions remained |
| ≥20% median human preparation-time improvement | Not assessed | Not assessed | Human preparation and browser interaction were not measured |

Completeness required procedure evidence, an observation with limits, an open question, and a next reviewer with a concrete check. Critical errors included synthetic-as-history, score-as-account-need, ACV-as-revenue/forecast, missing coverage as confirmed zero, unsupported commercial approval or materially wrong calculations. All ten authored briefs were also screened by the method-aware coordinator.

Numeric checks used Decimal arithmetic on raw specialty/procedure rows with at least 11 services, service-weighted payment rounded to cents, displayed-cent year changes and prior-year denominators. Sales checks used the full CSV for the all-specialty denominator, excluded closed stages, retained overdue open deals and left missing coverage unavailable. Percentage fields allowed one-decimal display rounding; counts/years/nulls were exact.

## Descriptive AI runtime — not human efficiency

| Pair | CSV artifact work, seconds | App artifact work, seconds |
|---|---:|---:|
| P01 | 33.00 | 30.00 |
| P02 | 22.00 | 32.00 |
| P03 | 30.97 | 31.78 |
| P04 | 29.00 | 40.00 |
| P05 | 31.00 | 20.00 |
| Median across cases | 30.97 | 31.78 |

The app artifact was faster in 2 of 5 pairs and slower in 3. Median paired AI runtime reduction was -2.60% (a small increase in runtime, not a saving). This is descriptive only: runtimes include model generation and tool latency, use different scenarios, and exclude coordinator preparation/app capture, reviewer work and browser interaction. They cannot be used as a human productivity estimate or an assessment of the proposed 20% human threshold.

## What the reviewers still needed

The reviewers understood who should perform the next check. They also consistently distinguished understanding the assignment from having the evidence to complete it:

- Sales and finance reviewers wanted opportunity IDs/owner rosters, supported stage/date changes, capture timestamps and a reconciled exposure result before planning use.
- The BI reviewer wanted the calculation/provenance audit trail and confirmed source timing in addition to readable links.
- The product reviewer wanted source/service-mix explanations and account-level workflow evidence before connecting a payment pattern to a product or commercial question.
- The systems reviewer wanted full-source coverage and mapping/feed-completeness evidence before treating absent specialty rows as a zero.

These were business evidence requests for the next investigation, not clarification barriers in this simulation. A candidate design experiment is an optional recipient packet containing the affected opportunity IDs/owners and a compact calculation audit trail. This is an AI-generated design hypothesis, not validated user demand or a reason to expand the product automatically.

## Limits and conclusion

The personas share an inherited model family/configuration; the collaboration tool did not expose the exact resolved model. Fresh contexts and explicit input scopes reduce conversational carryover but do not create independent human participants or an enforced filesystem sandbox. One analyst completed both methods, so learning/order effects remain. Rich metric notes and required output fields prime correctness in both conditions. Reviewer formatting was normalized, and method cues remained. Qualitative coordinator adjudication was not blinded. Synthetic, highly regular data and five pairs limit generalization.

The useful result is a documented stress test: ten briefs preserved the key metric and coverage distinctions, and ten simulated recipient reviews identified the next check. The quality and clarity outcomes tied. Actual workflow fit, preference, usability, preparation time, clarification burden and business value remain open for the human study.

## Selected audit records

This publication includes the protocol, role assignments, authored briefs and scoring records. Detailed agent timing is descriptive only; it is not a human efficiency result.

- [Protocol](protocol.md) and [fictional identities and assignments](personas-and-assignment.json)
- [Machine-readable summary](summary.json)
- [Numeric and completeness checks](evaluator/numeric-and-completeness-scores.json), [critical-error review](evaluator/critical-error-adjudication.json), [raw-input answer key](evaluator/answer-key.json) and [normalized recipient results](evaluator/normalized-review-results.json)

- P01: [CSV brief](analyst_outputs/P01/csv-brief.md), [app-artifact brief](analyst_outputs/P01/app-brief.md), [recipient review](reviewer_outputs/P01/initial-review.md)
- P02: [CSV brief](analyst_outputs/P02/csv-brief.md), [app-artifact brief](analyst_outputs/P02/app-brief.md), [recipient review](reviewer_outputs/P02/initial-review.md)
- P03: [CSV brief](analyst_outputs/P03/csv-brief.md), [app-artifact brief](analyst_outputs/P03/app-brief.md), [recipient review](reviewer_outputs/P03/initial-review.md)
- P04: [CSV brief](analyst_outputs/P04/csv-brief.md), [app-artifact brief](analyst_outputs/P04/app-brief.md), [recipient review](reviewer_outputs/P04/initial-review.md)
- P05: [CSV brief](analyst_outputs/P05/csv-brief.md), [app-artifact brief](analyst_outputs/P05/app-brief.md), [recipient review](reviewer_outputs/P05/initial-review.md)
