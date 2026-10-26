# Evidence memo to Morgan Reed — draft

Fictional AI analyst: Avery Brooks. Synthetic scenario; source/account validation pending.

Gastroenterology, diagnostic colonoscopy (45378), 2022 → 2023: service-weighted payment increased from **$178.42 to $183.96**, up **$5.54 (3.11%)**; services increased from **2,845 to 2,963**, up **118 (4.15%)**. Raw filtering used the selected specialty/procedure and `tot_srvcs >= 11`. Each year has 58 qualifying rows and 58 distinct NPIs; no duplicate full qualifying rows were found. Weighted raw payments round to the mart amounts. Changes use displayed payment cents and prior-year denominators.

Sales coverage is supplied: 47 specialty rows, including **44 open opportunities totaling $4,983,000 ACV**, or **12.40%** of all-specialty open ACV ($40,178,200). All 44 are overdue by **35–323 days** at the invented **2026-08-31** scenario date. No selected open close dates are missing/invalid. Open totals exclude Closed Won/Lost and retain overdue opportunities. All 500 supplied rows are included without period filtering.

The 2023 specialty pressure score is 59.0 (“Elevated pressure”), an unvalidated project heuristic. It establishes neither account need nor purchase propensity or outreach priority. The 2023 base is synthetic and 2022 is a generated comparison, not historical CMS evidence. Practice reimbursement differs from vendor software contract ACV; ACV is neither recognized revenue nor a forecast. Source capture time is unknown, so stages and dates cannot establish current exposure.

**Open question:** Are those 44 stages/dates still valid, and when was the source captured?

**Next reviewer/check:** Sales operations owner should reconcile the 44 opportunity IDs to the source snapshot, obtain its capture timestamp, and confirm/correct stages and close dates for the $4,983,000 overdue ACV. Morgan receives that reconciliation; the BI analyst retains these calculations and checks pinned snapshot provenance. Account discovery and validation remain pending; no account recommendation or CRM update is requested.

Pinned references are supplied provenance pointers; remote contents were not fetched:

- [raw_2022](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2022_puf_10k.csv)
- [raw_2023](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2023_puf_10k.csv)
- [sales](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_sfdc_pipeline.csv)
- [mart](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/mart.csv)
- [receipt](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/receipt.json)
- [metrics](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/METRIC_CERTIFICATION_LOG.md)
