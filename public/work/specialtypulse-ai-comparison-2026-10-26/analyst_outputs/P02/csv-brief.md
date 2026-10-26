# Urology comparison — monthly finance memo

To: Priya Nair, finance business partner  
Prepared by: Luis Ortega, fictional AI study persona  
Case: P02-csv  
Status: draft; source/account validation pending

Urology / HCPCS 51798 (post-void residual ultrasound): CY2022 weighted payment per service is $136.32 on 3,733 services; CY2023 is $133.66 on 3,886 services. Payment decreases $2.66 (2.0%); services increase 153 (4.1%). Both raw inputs reproduce the displayed mart results using provider_type=Urology, hcpcs_cd=51798 and tot_srvcs>=11, weighting payment by services. There are 71 qualifying rows per year. Percentage changes use rounded mart payment amounts and prior-year denominators.

Sales coverage is supplied: 61 Urology rows include 57 open opportunities totaling $5,004,100 assumed annual software ACV. This is 12.5% of $40,178,200 all-specialty open ACV. All 57 open deals are overdue at the invented 2026-08-31 scenario date: $5,004,100 ACV, 39–291 days overdue; none has a missing or invalid close date. Open-stage totals exclude Closed Won and Closed Lost and retain overdue rows. All 500 supplied sales rows are used without period filtering.

Observation: Urology / 51798 payment per service decreases $2.66 (2.0%) while services increase 153 (4.1%); all 57 supplied open opportunities are overdue at the assumed 2026-08-31 snapshot, leaving $5,004,100 assumed ACV to reconcile before monthly planning.

Open question: Which of the 57 overdue Urology open opportunities have CRM-supported current stages and close dates, and what treatment should Priya apply to the reconciled amounts in commercial planning?

Next reviewer: Sales operations lead, followed by Priya Nair, finance business partner

Requested next check: Sales operations lead: check all 57 open Urology opportunities against CRM evidence and document confirmed stage/date corrections without excluding deals solely for overdue dates. Luis should preserve the reproduced procedure calculations; Priya should then review the reconciled assumed ACV separately from forecasts and recognized revenue. Validate account context before a commercial recommendation; this brief requests no CRM update.

Limits: All records are synthetic: 2022 is a generated comparison and 2023 a synthetic base, not historical CMS evidence. Practice reimbursement is separate from hypothetical vendor software ACV. Open ACV is unweighted and includes overdue opportunities; neither open nor Closed Won ACV is recognized revenue or a forecast. All 500 supplied sales rows are included without period filtering, capture timestamp is unknown, and stages are as supplied. A specialty-level pattern or unvalidated pressure heuristic does not demonstrate account need or purchase propensity. Source and account validation remain pending. Timing reflects AI agent execution, not human preparation.

Pinned evidence (local supplied copies were checked; links were not opened):

- [mart](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/mart.csv)
- [raw 2022](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2022_puf_10k.csv)
- [raw 2023](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2023_puf_10k.csv)
- [sales](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_sfdc_pipeline.csv)
- [receipt](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/receipt.json)
- [metrics](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/METRIC_CERTIFICATION_LOG.md)
