# SpecialtyPulse internal rehearsal — run 02

October 25, 2026. Fixed app release:
`7cd9592e01f24cdfe77612ca97dc0852a5753877`.

**Human participants: 0. Independent reviewers: 0. Planned human study: 0/5 pairs.**
One AI assistant with prior project knowledge prepared and self-checked all four
outputs. The reference comparator was scripted from CSV reports, the answers
were known, and the review was not blinded. This is an artifact and process
rehearsal. It does not establish human time savings, comprehension, preference,
clarification rates, adoption, ROI or sales outcomes.

## Tasks and checks

Two candidate tasks were run through the reference-report comparator and the
live app: Dermatology / HCPCS 99213, and Orthopedic Surgery / HCPCS 27130.
Both compare generated 2022 and synthetic 2023 inputs. The sales scenario date
is an invented August 31, 2026. Raw-input Decimal calculations checked the
payment/service pairs, and a separate sales-CSV calculation reproduced overdue
counts, amounts, shares and ages.

| Scenario | Payment / services, 2022 → 2023 | Changes | Overdue specialty exposure |
|---|---|---|---|
| Dermatology / 99213 | $108.05 / 3,626 → $104.91 / 3,777 | −$3.14 (−2.9%); +151 services (+4.2%) | 53/53 open deals; $4,579,800 assumed USD ACV; 25–291 days overdue |
| Orthopedic Surgery / 27130 | $222.06 / 2,990 → $213.47 / 3,117 | −$8.59 (−3.9%); +127 services (+4.2%) | 47/47 open deals; $6,272,200 assumed USD ACV; 45–315 days overdue |

All four briefs contained the required sections and matched the checked numerical
values. The two actual browser-saved app files matched the generated export text
byte for byte: A was 8,323 bytes; B was 8,135 bytes. These are mechanical checks,
not human completeness or interpretation scores. Tool-session timestamps were not
used as preparation times.

## Finding and fix

Run 01, at release `7b3d18e2298c4b158586a80ac01d28d2811485ed`, found that both
app briefs lacked a direct pinned sales CSV link. The fixed exports include that
link, metric definitions, the selected specialty, open-stage exclusions, overdue
date rule and all-specialty pipeline-share denominator. Both linked files were
retrieved successfully. The input-file hashes were unchanged from run 01.

The pinned sales CSV reproduces Dermatology's 53 overdue deals / $4,579,800 and
Orthopedic Surgery's 47 / $6,272,200. Their shares of the $40,178,200 open-stage
total are 11.4% and 15.6%. **R1 is resolved for both tested exports at the fixed
release.** No additional discrepancy was observed within this defined artifact
audit.

## Saved evidence

- [Reference brief A](reference-A.md) and [reference brief B](reference-B.md)
- [Live app export A](specialtypulse-A.md) and [live app export B](specialtypulse-B.md)
- [Download verification and file hashes](download-verification.json)
- [Artifact observations](observations.json)
- [Sales-source reconciliation](sales-source-verification.json)
- [Raw-input-checked answer key](answer-key.json)
- [Pinned source revision and input hashes](source-manifest.json)

Local computer paths have been removed from this public evidence extract. The
saved brief bytes are unchanged and retain the hashes in the verification files.

## Human validation remains pending

No intended analyst or independent reviewer has participated. The reference
method has not been confirmed as an analyst's actual usual workflow. Similar
generated tasks may cause learning effects, and export formatting or links may
reveal the preparation method.

The proposed five-pair study's completeness, critical-error, preparation-time and
clarification thresholds remain unevaluated. In particular, no 20% human time
reduction has been measured. The next step is to confirm intended users' baseline
workflow and comparable task difficulty, recruit participants, and collect actual
sessions. Passing artifact checks does not establish product usefulness.
