# Ophthalmology comparison — finance planning draft

To: Priya Nair, finance business partner  
Prepared by: Luis Ortega, fictional AI study persona  
Case: P02-app  
Status: draft; source/account validation pending

Completed from the supplied, untouched app_export.md. The app's missing analyst fields are completed below; optional source checks reproduced the selected procedure and sales calculations.

Ophthalmology / HCPCS 92014: CY2022 payment per service $126.46 on 5,805 services → CY2023 $123.97 on 6,046 services. Payment changes −$2.49 (−2.0%); services increase 241 (+4.2%). Filtering each raw input to the specialty, procedure and at least 11 services reproduces the displayed weighted payments, with 62 qualifying rows per year. Percentage changes use rounded mart payments and prior-year denominators.

Sales coverage is supplied. The 48 open opportunities total $5,132,000 assumed annual software ACV, or 12.8% of the $40,178,200 all-specialty open total. All 48 are overdue at the invented 2026-08-31 snapshot: $5,132,000 ACV, 17–271 days overdue. None has a missing or invalid close date. Open totals exclude Closed Won and Closed Lost and retain overdue deals; all 500 supplied rows are used without period filtering.

Observation: Ophthalmology / 92014 payment per service falls $2.49 (2.0%) while services rise 241 (4.2%); all 48 supplied open opportunities are overdue at the assumed 2026-08-31 snapshot, so their $5,132,000 assumed ACV requires stage/date reconciliation before planning.

Open question: Which of the 48 overdue open opportunities have stages or close dates that sales operations can substantiate as current, and what planning treatment will Priya approve after that reconciliation?

Next reviewer: Sales operations lead, followed by Priya Nair, finance business partner

Requested next check: Sales operations lead: reconcile all 48 Ophthalmology open opportunity stages and close dates against the CRM, recording confirmed corrections and evidence; do not remove deals solely because dates are past due. Luis should retain the reproduced procedure calculation, and Priya should review the reconciled ACV separately from any forecast or recognized revenue before monthly planning. No CRM change or account recommendation is authorized by this brief.

Limits: All records are synthetic: 2022 is generated comparison data and 2023 is a synthetic base, not historical CMS evidence. Reimbursement concerns practices; opportunity amount is assumed annual software contract value. Open ACV is unweighted, retains overdue rows, and is neither a forecast nor recognized revenue; Closed Won ACV also is not recognized revenue. All 500 supplied sales rows are used without period filtering; capture timestamp is unknown and stages are supplied values. The unvalidated pressure score does not establish account need or purchase propensity. Account discovery and source validation remain pending. This is a captured-artifact comparison, not browser-usability or human preparation timing.

Pinned evidence (local supplied copies were checked; links were not opened):

- [mart ](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/mart.csv)
- [raw 2022 ](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2022_puf_10k.csv)
- [raw 2023 ](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2023_puf_10k.csv)
- [sales ](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_sfdc_pipeline.csv)
- [receipt ](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/receipt.json)
- [metrics ](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/METRIC_CERTIFICATION_LOG.md)
