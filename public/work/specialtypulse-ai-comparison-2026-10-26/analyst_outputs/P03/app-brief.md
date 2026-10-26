# Completed specialty-review handoff to Morgan Reed — draft

Fictional AI analyst: Avery Brooks. Completed from the coordinator-captured, untouched `app_export.md`. Synthetic scenario; source/account validation pending. Browser usability is not measured.

**Selected procedure evidence:** Pain Management / 64483, transforaminal epidural. CY2022 **$85.79 / 3,609 services** → CY2023 **$84.94 / 3,762 services**. Payment decreased **$0.85 (0.99%)**; services increased **153 (4.24%)**. These more precise percentages reproduce the export’s rounded −1.0% / +4.2%. Raw checks use selected specialty/procedure, `tot_srvcs >= 11`, and service-weighted payment. Each year has 63 qualifying rows and 63 distinct NPIs; no duplicate full qualifying rows were found. Raw weighted amounts round to the mart cents. Changes use displayed cents and prior-year denominators.

**Observation:** The selected synthetic procedure payment fell while service volume rose. Supplied sales coverage includes 58 specialty rows and **57 open deals / $3,211,200 ACV**, **7.99%** of all-specialty open ACV ($40,178,200), reproducing the export’s 8.0% rounding. All 57 are overdue by **52–300 days** at the invented **2026-08-31** scenario date; no selected open close dates are missing/invalid. This is a reconciliation need before planning.

**Limits:** 2023 is a synthetic base; 2022 is a generated comparison, not historical CMS evidence. Practice reimbursement differs from vendor EHR/PM/RCM contract ACV. All 500 sales rows are included without period filtering. Open-stage totals exclude Closed Won/Lost and retain overdue opportunities; stages are supplied and source capture time is unknown. ACV is neither recognized revenue nor a forecast. The export’s **65.2/100 pressure score** is an unvalidated project heuristic, not account need, purchase propensity or a reason to prioritize outreach. Local optional sources reproduce the selected comparison and sales totals; remote pinned snapshots, hashes and execution receipt were not independently verified.

**Open question:** Which of the 57 open opportunities need stage/date correction, and when was their source captured?

**Next reviewer:** Sales operations lead; Morgan Reed receives the evidence memo.

**Requested next check:** Sales operations lead reconciles the 57 IDs to the source snapshot, supplies its capture timestamp, and confirms/corrects stages and close dates for the $3,211,200 overdue ACV before planning. The BI analyst retains calculation evidence and checks pinned snapshot/hash/receipt provenance. Account discovery and validation remain pending. No account recommendation, stakeholder approval, CRM update, or business outcome is recorded.

Source references preserved from the app artifact and supplied link manifest (live comparison can change; repository links pin the supplied revision):

- [raw_2022](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2022_puf_10k.csv)
- [raw_2023](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2023_puf_10k.csv)
- [sales](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_sfdc_pipeline.csv)
- [mart](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/mart.csv)
- [receipt](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/receipt.json)
- [metrics](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/METRIC_CERTIFICATION_LOG.md)
- [live comparison](https://specialtypulse.kristenmartino.ai/?view=procedure&specialty=Pain+Management&hcpcs=64483&year=2023)
- [reproduction method](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/verification/payment-check.md)
