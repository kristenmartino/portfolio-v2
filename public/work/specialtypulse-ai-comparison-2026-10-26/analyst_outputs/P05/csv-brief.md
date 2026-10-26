# Draft systems follow-up memo — P05 CSV

To: Riley Park, sales operations manager  
From: Noah Williams, fictional business systems analyst  
Status: draft; source/account validation pending

Cardiology / HCPCS 99213 shows weighted payment of $154.67 in the generated 2022 scenario and $157.90 in the 2023 synthetic base: +$3.23 (+2.09%). Services increase from 528 to 548: +20 (+3.79%). Independent raw calculations, using the selected specialty/procedure and at least 11 services per row, reproduce both mart totals and rounded payments. Each year has 13 qualifying rows.

Cardiology has no rows in the supplied nine-specialty, 500-row sales extract. Its open deal count, ACV, open share, overdue count/ACV and overdue age range are unavailable, not zero. The all-specialty open-stage denominator is $40,178,200 across 472 opportunities; that known denominator does not make the missing Cardiology numerator zero. A supplied specialty with no open deals would be a different state.

Please route the coverage question to the CRM/reporting systems owner: reconcile Cardiology specialty mappings, extraction filters and feed completeness against the full CRM, establish a capture timestamp, and return either the covered records or explicit evidence of zero. Riley should then verify stages and valid close dates using the invented 2026-08-31 scenario date. Open excludes Closed Won/Lost; overdue means a valid close date strictly before that date, and overdue deals stay open until reviewed. Missing or invalid dates must be reported separately if covered records are obtained. No CRM update, account recommendation or message has been sent.

All data is synthetic; 2022 is generated, not a historical CMS observation. All sales rows are used without period filtering and the source capture timestamp is unknown. Software contract ACV and practice reimbursement are different measures; closed-won ACV is not recognized revenue or a forecast. The pressure heuristic is unvalidated and cannot establish account need, purchase propensity or outreach priority. Verify source calculations and conduct account discovery before account-level use.

Open question: does Cardiology's absence arise from a missing feed or mapping, or does a complete source extract confirm no opportunities?

Pinned source references (provided locally; external URLs were not opened):
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2022_puf_10k.csv
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2023_puf_10k.csv
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/mart.csv
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_sfdc_pipeline.csv
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/METRIC_CERTIFICATION_LOG.md
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/receipt.json
