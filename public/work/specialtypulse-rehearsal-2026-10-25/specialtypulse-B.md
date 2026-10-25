# Sample specialty-review handoff

Focus: Orthopedic Surgery · CY2023
Prepared for: Sales or operations lead
Status: Sample only — source and account validation pending.

Purpose: Identify a payment pattern to investigate and prepare questions for the next reviewer.
Data: Synthetic CMS-schema records; 2021–2022 are generated comparison scenarios. Sales are synthetic.
Assumed setting: a specialty analyst supports a healthcare-software sales team selling electronic health record (EHR), practice management (PM) and revenue cycle management (RCM) software. The sales or operations lead decides which questions need analyst verification or account discovery before a commercial recommendation.
Demo assumption: amount represents annual contract value (ACV) in USD. Open-stage pipeline sums unweighted opportunity amounts, excluding Closed Won and Closed Lost, and includes overdue open opportunities. Closed-won ACV is a separate stage total, not recognized revenue or a sales forecast.
Static sales fixture: 500 opportunities; created dates 2025-09-02–2026-02-24; close dates 2025-10-11–2026-08-14. All supplied rows are included without a reporting-period filter. Scenario snapshot: 2026-08-31, an invented demo assumption. The source capture date was not recorded; stages are shown as supplied.

## Supporting observations
- Scenario pressure score: 70.1/100. Project-defined and unvalidated against sales outcomes.
- Average procedure-level payment change: -3.9%; a constructed scenario comparison.
- Synthetic open-stage pipeline: $6,272,200 across 47 deals (15.6% of open-stage pipeline). Includes overdue open opportunities.

## Sales follow-up first
At the invented 2026-08-31 scenario snapshot, 47 of 47 open deals (100.0% of open deals) have close dates before the snapshot: $6,272,200.00 in assumed USD ACV; 45–315 days overdue. The open-stage total includes these overdue opportunities.
First sales follow-up: reconcile opportunity stages and close dates with the sales operations lead before using the open-stage total for planning. Record confirmed changes; past-due dates alone do not close or remove opportunities.

## Sales evidence and reproduction
[Synthetic sales CSV snapshot](https://github.com/kristenmartino/specialtypulse_pipeline/blob/7cd9592e01f24cdfe77612ca97dc0852a5753877/data/sample_sfdc_pipeline.csv) — repository revision: 7cd9592e01f24cdfe77612ca97dc0852a5753877.
Specialty filter: account_specialty = "Orthopedic Surgery". Open-stage filter: exclude stage = "Closed Won" and "Closed Lost". Count the remaining opportunities and sum amount for the specialty open-stage total.
Overdue filter: within those open opportunities, require a valid close_date strictly before 2026-08-31, the invented scenario snapshot date. Count those rows and sum amount for overdue ACV; missing or invalid close dates are excluded from the overdue count.
Open-stage totals retain overdue opportunities. The specialty share denominator is the open-stage amount across all specialties in this CSV. No created-date or close-date reporting-period filter is applied.
[Sales metric definitions](https://github.com/kristenmartino/specialtypulse_pipeline/blob/7cd9592e01f24cdfe77612ca97dc0852a5753877/docs/METRIC_CERTIFICATION_LOG.md) — amount is assumed annual contract value in USD; these are unweighted scenario amounts, not recognized revenue or a forecast.

## Analyst draft — unverified
Completeness: 4/4 brief elements. This checks presence, not accuracy or approval.

### Selected procedure evidence
- Orthopedic Surgery / HCPCS 27130 / CY2023: Total hip replacement; average payment per service $213.47; 3,117 services. Source: synthetic reporting mart.
  Same-procedure comparison: CY2022 $222.06 / 2,990 services → CY2023 $213.47 / 3,117 services.
  Payment change: −$8.59 (−3.9%). Service change: +127 (+4.2%).
  Calculation: (CY2023 − CY2022) ÷ CY2022, for this specialty and HCPCS code. Payment differences use displayed mart values rounded to cents. Percentages are unavailable when inputs are missing or the prior value is zero.
  2021–2022 are generated comparison scenarios; 2023 is a synthetic base. These are not historical CMS comparisons.
  [Reopen live comparison](https://specialtypulse.kristenmartino.ai/?view=procedure&specialty=Orthopedic+Surgery&hcpcs=27130&year=2023)
  [Reporting mart snapshot](https://github.com/kristenmartino/specialtypulse_pipeline/blob/7cd9592e01f24cdfe77612ca97dc0852a5753877/data/sample_mart_reimbursement_trends.csv) — filter provider_specialty=Orthopedic Surgery, hcpcs_code=27130, years=2022,2023.
  Snapshot SHA-256: 98c53448e2d18a842a40167517300f4ad83bf51d640ba6432bfd71761be7c893. Repository revision: 7cd9592e01f24cdfe77612ca97dc0852a5753877.
  [Local Spark run receipt](https://github.com/kristenmartino/specialtypulse_pipeline/blob/7cd9592e01f24cdfe77612ca97dc0852a5753877/data/pipeline_run.json) — recorded execution 2026-10-24T16:33:01.946977+00:00.
  [CY2022 synthetic raw inputs](https://github.com/kristenmartino/specialtypulse_pipeline/blob/7cd9592e01f24cdfe77612ca97dc0852a5753877/data/sample_2022_puf_10k.csv) — SHA-256 7b3d6572f14560b813092700369be6f8acab6b6b02b6239b1fe69a778c730d9f. Filter provider_type=Orthopedic Surgery, hcpcs_cd=27130, tot_srvcs>=11; payment is weighted by services.
  [CY2023 synthetic raw inputs](https://github.com/kristenmartino/specialtypulse_pipeline/blob/7cd9592e01f24cdfe77612ca97dc0852a5753877/data/sample_2023_puf_10k.csv) — SHA-256 7ce9441204f55d8a9a9273f9d21d5e862a58ece27a053054ca8d6a950b44f0e5. Filter provider_type=Orthopedic Surgery, hcpcs_cd=27130, tot_srvcs>=11; payment is weighted by services.
  [Reproduction method](https://github.com/kristenmartino/specialtypulse_pipeline/blob/7cd9592e01f24cdfe77612ca97dc0852a5753877/docs/verification/payment-check.md). The live link uses the current demo; pinned files preserve this evidence snapshot.

Observation: INTERNAL REHEARSAL RUN 02 B — no human participant. In the constructed Orthopedic Surgery / HCPCS 27130 comparison, payment per service falls $8.59 (3.9%) while services rise by 127 (4.2%). The 2022 scenario is generated and 2023 is synthetic. These figures do not establish observed history, cause, practice profitability or account need. The pressure score is unvalidated against sales outcomes.
Open question: Which source rows explain this constructed comparison, and which supplied opportunity stages and close dates need confirmation before planning?
Next reviewer: Sales operations lead; specialty analyst — internal rehearsal roles only
Requested next check: First reconcile the 47 Orthopedic Surgery open opportunities and their close dates with sales operations before planning. Keep overdue deals in the supplied unweighted open-stage balance until reviewed; assumed USD ACV is not recognized revenue or a forecast. Then reproduce the CY2022/CY2023 HCPCS 27130 values from pinned inputs and record unresolved issues. Establish customer needs through account discovery before a commercial recommendation.

## Suggested follow-up checks
- Sales operations lead: Which open opportunities need their stages and close dates corrected before planning?
  Next check: First sales follow-up: reconcile opportunity stages and close dates with the sales operations lead before using the open-stage total for planning. Record confirmed changes; past-due dates alone do not close or remove opportunities.
- Specialty analyst: Do the source records, service mix and calculation explain the payment comparison?
  Next check: Trace a procedure to its inputs and record any unresolved data or interpretation issue.
- Sales operations lead: What do account notes say about the customer’s needs?
  Next check: Confirm account context; a specialty-level score does not establish account need.
- Sales or operations lead: What evidence is needed before a commercial recommendation?
  Next check: Confirm the next reviewer and the evidence to request. Source and account validation remain pending.

This is an example work product. No stakeholder review, account validation, approved shortlist or business outcome is recorded.
