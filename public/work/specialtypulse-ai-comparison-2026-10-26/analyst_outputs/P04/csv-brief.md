# Podiatry review memo — CSV condition

**To:** Theo Grant, product manager  
**Prepared by:** Samira Patel, fictional AI study persona  
**Status:** Draft; source/account validation pending

For HCPCS 11721 (debridement of six or more nails), average payment falls from **$68.67 to $66.66**, a **$2.01 / 2.9%** decline. Services rise from **4,735 to 4,931**, or **196 / 4.1%**. I reproduced both weighted payments and service counts from the supplied raw files using Podiatry, HCPCS 11721, and at least 11 services per row. Percentage changes use the prior-year denominator and displayed cent-rounded payments.

Sales coverage is supplied: **59 Podiatry rows**, including **54 open deals / $2,451,300 assumed annual contract value**. The open amount is **6.1%** of the **$40,178,200** all-specialty open total. At the invented **2026-08-31** scenario date, **all 54 open deals** are overdue: **$2,451,300**, **38–324 days**. No selected open deal has a missing or invalid close date. Overdue rows remain in the open total.

**Open question:** Which overdue opportunities are still active, and does account discovery identify a specific workflow problem that warrants investigation independently of this synthetic payment decline?

**Next reviewer and check:** Theo should ask the sales operations lead to verify all 54 stages and close dates against current account records and return confirmed active exposure. Retain overdue opportunities until reviewed. The specialty analyst should explain source composition and service mix; Theo then decides which account-discovery questions need more evidence before any product/commercial recommendation.

All records are synthetic; 2022 is generated and 2023 is a synthetic base, not a historical CMS comparison. All 500 sales rows are included without period filtering; capture time is unknown and stages are shown as supplied. Practice reimbursement and vendor software ACV are distinct. Unweighted ACV is neither recognized revenue nor a forecast. Neither the payment decline nor an unvalidated pressure score establishes account need, product demand, purchase propensity, or outreach priority. No recommendation or CRM update is made.

This memo was assembled from the condition's local reporting and raw files. Pinned links identify provenance and were not fetched externally. Runtime describes this AI exercise, not human preparation time.

## Pinned sources

- [mart](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/mart.csv)
- [raw 2022](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2022_puf_10k.csv)
- [raw 2023](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2023_puf_10k.csv)
- [sales](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_sfdc_pipeline.csv)
- [metrics](https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/METRIC_CERTIFICATION_LOG.md)
