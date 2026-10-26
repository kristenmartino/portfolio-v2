# Sample specialty-review handoff

Focus: Neurology · CY2023
Prepared for: Riley Park, sales operations manager
Prepared by: Noah Williams, fictional business systems analyst
Status: draft; source/account validation pending

Purpose: Identify a payment pattern to investigate and prepare questions for the next reviewer.
Data: Synthetic CMS-schema records; 2021–2022 are generated comparison scenarios. Sales are synthetic.
Assumed setting: a specialty analyst supports a healthcare-software sales team selling electronic health record (EHR), practice management (PM) and revenue cycle management (RCM) software. The sales or operations lead decides which questions need analyst verification or account discovery before a commercial recommendation.
Demo assumption: amount represents annual contract value (ACV) in USD. Open-stage pipeline sums unweighted opportunity amounts, excluding Closed Won and Closed Lost, and includes overdue open opportunities. Closed-won ACV is a separate stage total, not recognized revenue or a sales forecast.
Static sales fixture: 500 opportunities; created dates 2025-09-02–2026-02-24; close dates 2025-10-11–2026-08-14. All supplied rows are included without a reporting-period filter. Scenario snapshot: 2026-08-31, an invented demo assumption. The source capture date was not recorded; stages are shown as supplied.

## Supporting observations
- Scenario pressure score: 48.2/100. Project-defined and unvalidated against sales outcomes.
- Average procedure-level payment change: 3.1%; a constructed scenario comparison.
- No sales records supplied for Neurology. Sales amounts, deal counts and pipeline share are unavailable. Confirm source coverage before drawing a pipeline conclusion.

## Sales coverage check
Confirm sales source coverage with the sales operations lead before interpreting pipeline or checking overdue opportunities.

## Sales evidence and reproduction
[Synthetic sales CSV snapshot](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_sfdc_pipeline.csv) — repository revision: d628a13592a5d0f5cc0ca93f6cce5f0c265258ca.
Specialty filter: account_specialty = "Neurology". Open-stage filter: exclude stage = "Closed Won" and "Closed Lost". Count the remaining opportunities and sum amount for the specialty open-stage total.
Overdue filter: within those open opportunities, require a valid close_date strictly before 2026-08-31, the invented scenario snapshot date. Count those rows and sum amount for overdue ACV; missing or invalid close dates are excluded from the overdue count.
Open-stage totals retain overdue opportunities. The specialty share denominator is the open-stage amount across all specialties in this CSV. No created-date or close-date reporting-period filter is applied.
[Sales metric definitions](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/METRIC_CERTIFICATION_LOG.md) — amount is assumed annual contract value in USD; these are unweighted scenario amounts, not recognized revenue or a forecast.

## Analyst draft — unverified
Completeness: 4/4 brief elements after analyst completion. This checks presence, not accuracy or approval.

### Selected procedure evidence
- Neurology / HCPCS 99213 / CY2023: Office visit, est patient; average payment per service $96.24; 975 services. Source: synthetic reporting mart.
  Same-procedure comparison: CY2022 $93.29 / 936 services → CY2023 $96.24 / 975 services.
  Payment change: +$2.95 (+3.2%). Service change: +39 (+4.2%).
  Calculation: (CY2023 − CY2022) ÷ CY2022, for this specialty and HCPCS code. Payment differences use displayed mart values rounded to cents. Percentages are unavailable when inputs are missing or the prior value is zero.
  2021–2022 are generated comparison scenarios; 2023 is a synthetic base. These are not historical CMS comparisons.
  [Reopen live comparison](https://specialtypulse.kristenmartino.ai/?view=procedure&specialty=Neurology&hcpcs=99213&year=2023)
  [Reporting mart snapshot](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/mart.csv) — filter provider_specialty=Neurology, hcpcs_code=99213, years=2022,2023.
  Snapshot SHA-256: dc2840f9067b7e6aea512b3c4a581e0c1473adb666815faf9a141425bf9b2fa5. Repository revision: d628a13592a5d0f5cc0ca93f6cce5f0c265258ca.
  [Databricks Spark / Unity Catalog Delta run receipt](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/receipt.json) — recorded execution 2026-10-26T18:12:25.096111+00:00.
  [CY2022 synthetic raw inputs](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2022_puf_10k.csv) — SHA-256 7b3d6572f14560b813092700369be6f8acab6b6b02b6239b1fe69a778c730d9f. Filter provider_type=Neurology, hcpcs_cd=99213, tot_srvcs>=11; payment is weighted by services.
  [CY2023 synthetic raw inputs](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2023_puf_10k.csv) — SHA-256 7ce9441204f55d8a9a9273f9d21d5e862a58ece27a053054ca8d6a950b44f0e5. Filter provider_type=Neurology, hcpcs_cd=99213, tot_srvcs>=11; payment is weighted by services.
  [Reproduction method](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/verification/payment-check.md). The live link uses the current demo; pinned files preserve this evidence snapshot.

Observation: Neurology 99213 weighted payment rises $2.95 (3.16%) and services rise 39 (4.17%) from the 2022 scenario to the 2023 synthetic base; absent Neurology sales coverage leaves exposure and overdue state unknown rather than zero.
Open question: Is Neurology absent because the CRM feed or specialty mapping is incomplete, or can a complete source extract explicitly confirm zero Neurology opportunities?
Next reviewer: CRM/reporting systems owner, with Riley Park, sales operations manager
Requested next check: CRM/reporting systems owner should reconcile Neurology specialty taxonomy, extract filters and feed completeness against the full CRM, document the source capture time, and return covered records or evidence of zero to Riley Park. Riley should then verify stages and valid close dates before interpreting exposure or overdue state. Recheck the procedure calculation against the pinned source snapshot and conduct account discovery before any account-level decision.

## Suggested follow-up checks
- Sales operations lead: Which sales records should cover this specialty?
  Next check: Confirm sales source coverage before interpreting pipeline or checking overdue opportunities.
- Specialty analyst: Do the source records, service mix and calculation explain the payment comparison?
  Next check: Trace a procedure to its inputs and record any unresolved data or interpretation issue.
- Sales operations lead: What do account notes say about the customer’s needs?
  Next check: Confirm account context; a specialty-level score does not establish account need.
- Sales or operations lead: What evidence is needed before a commercial recommendation?
  Next check: Confirm the next reviewer and the evidence to request. Source and account validation remain pending.

This is an example work product. No stakeholder review, account validation, approved shortlist or business outcome is recorded.

## Independent analyst verification
The untouched coordinator-captured app export was the starting artifact; the original input is preserved. This completed copy fills the analyst fields and names Riley as the receiving reviewer. Browser usability is not measured.

Local raw checks reproduce the selected mart comparison: 21 qualifying rows and 936 services with weighted payment $93.2940064103 in 2022, rounded to $93.29; 21 rows and 975 services with weighted payment $96.2430564103 in 2023, rounded to $96.24. Using displayed cents gives +$2.95 (+3.1622%); service change is +39 (+4.1667%). The export's one-decimal changes, +3.2% and +4.2%, agree. Its 3.1% average across procedures is a different summary from this selected procedure.

The supplied sales CSV has 500 records across nine specialties and no Neurology rows. Neurology open count, ACV, share, overdue count/ACV and overdue ages are unavailable, not zero. The all-specialty open denominator is $40,178,200 across 472 open opportunities, which cannot supply the missing Neurology numerator. Establish coverage before checking overdue records. Missing/invalid close dates must be reported separately if covered records are obtained.

The export's 48.2/100 pressure score remains an unvalidated scenario heuristic. Local arithmetic agreement does not validate the pinned snapshot hashes, cloud execution receipt, source provenance or account context. URLs and receipt metadata above are provided references, not independently opened or verified evidence in this exercise. No account recommendation, CRM update, assignment or external message was made.
