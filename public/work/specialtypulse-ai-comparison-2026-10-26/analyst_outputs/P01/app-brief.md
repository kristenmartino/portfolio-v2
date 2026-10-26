# Orthopedic Surgery review handoff

To: Jordan Ellis, regional sales director  
From: Maya Chen, fictional revenue operations analyst  
Status: draft; source/account validation pending

The app export gives a useful starting handoff, but the supplied exposure needs sales operations review before planning use. Orthopedic Surgery has 47 open opportunities totaling $6,272,200 assumed annual software contract value: 15.61% of $40,178,200 in all-specialty open ACV. Every one of those 47 is overdue at the invented 2026-08-31 scenario date, by 45–315 days. There are no missing or invalid close dates among the selected open deals; 50 specialty rows are supplied in total.

For HCPCS 27130 (total hip replacement), the synthetic 2022-to-2023 comparison is $222.06 to $213.47 per service (-$8.59; -3.87%) and 2,990 to 3,117 services (+127; +4.25%). I checked the exported comparison against the mart and recalculated both raw weighted payments using specialty, procedure and services >=11 filters. Each year has 67 qualifying rows, and payment rounded to cents and service totals reconcile. The export's one-decimal changes are consistent with those calculations. I also reproduced its open exposure, share and overdue ages from the sales CSV.

Observation: A lower synthetic payment and higher service count coexist with an entirely overdue supplied specialty pipeline. That supports validation work; it does not establish a software buying opportunity.

Open question: Which of the 47 opportunities retain owner-supported open stages and dates, and what account evidence supports their use in planning?

Next reviewer: Sales operations manager, working with opportunity owners.

Requested next check: Have the owners reconcile all 47 stages and close dates in the source system against the scenario date. Sales operations should return a confirmed exposure total and unresolved rows to Jordan before planning use. Account needs require separate discovery before a commercial recommendation. This brief requests no CRM update.

All data are synthetic: 2023 is a synthetic base and 2022 a generated scenario, not historical CMS observations. Reimbursement concerns practices; ACV concerns hypothetical vendor software contracts. Sales totals include all 500 rows without period filtering; source capture time is unknown and stages are as supplied. Overdue rows remain open until reviewed. ACV is neither recognized revenue nor a forecast. The 70.1 pressure score is an unvalidated comparison heuristic, not account need, purchase propensity or outreach priority. Local extract consistency is checked; source and account validation remain pending. The app artifact was captured by the coordinator, so this exercise does not establish browser usability or human preparation time.

Pinned references (supplied in the case; checked through local extracts):

- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2022_puf_10k.csv
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_2023_puf_10k.csv
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/sample_sfdc_pipeline.csv
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/mart.csv
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/data/releases/databricks-527988765998273/receipt.json
- https://github.com/kristenmartino/specialtypulse_pipeline/blob/d628a13592a5d0f5cc0ca93f6cce5f0c265258ca/docs/METRIC_CERTIFICATION_LOG.md
