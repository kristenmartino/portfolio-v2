# Portfolio demo and evidence review — October 25, 2026

Scope: all 11 externally linked web demos on the portfolio, their portfolio copy,
and repository documentation/implementation. GTM's seven apps and two supporting
pages were included. The portfolio baseline was `c613933602fbcc5281eebd0e7ed8558452188aec`.

This is a representative workflow review, not an exhaustive product test or a new
accuracy benchmark. The four professional case studies have no public demo;
Quantization, FocusForge, and Meridian also have no linked browser demo. They
were not counted as broken demos or tested as native applications.

## Findings and corrections

1. **Medicare percentages lost their meaning.** The outlier table applied integer
   formatting to all metrics. Selecting `brand_cost_share` displayed Joseph
   Jemsek's stored `0.23713651` as `0`, rather than 23.7%. The demo change uses
   percentage, currency, and count formats according to the selected metric.
2. **Medicare's population and denominator were misleading.** The mart contains
   7,062,726 registry providers, including providers without observed Medicare
   activity. The summary has 1,069,017 Part D prescribers and 1,076,323 Part B
   providers; those populations overlap. Both headline flag rates divide by all
   mart rows. The case study and demo now explain the denominator and coverage.
3. **A higher flag rate was presented as validated detection.** The public app
   called MAD's 5.23% rate the correct answer and described genuine anomalies
   without a labeled review. The 2.0 and 3.5 thresholds also differ. The demo,
   repo methodology, and findings now separate descriptive counts from unmeasured
   false-positive rates and actionable-case recall. State differences do not
   isolate a geographic cause. The brand-share gap is an arithmetic comparison,
   not an upper bound on achievable savings.
4. **Public extract limits needed to be prominent.** The table has 1,000 rows per
   metric, and the provider selector has six examples. Search is not a full-mart
   lookup. The case study and demo explain this before the controls.
5. **Sift's access boundary was missing from the case study.** Guests can browse,
   search, and inspect a saved comparison. A new comparison requires sign-in.
   The case study now distinguishes the dated guest example from live processing
   and notes its unverified agreement when source availability is unrecorded.

No source data, warehouse result, or historical evaluation score was regenerated.
The fixes are proposed in separate demo and portfolio PRs; merge and production
verification are separate steps.

## Demo-by-demo observations

| Demo | Browser check and repository comparison | Boundary |
|---|---|---|
| [Medicare](https://kristenmartino.github.io/medicare-provider-outliers/app/) | Overview, methodology, state table, metric selection, six-example drill-down; CSV counts and extraction/model SQL checked | Fixes above; no fresh Snowflake run or labeled evaluation |
| [Cabana](https://cabana-kristenmartinos-projects.vercel.app/) | Entered fictional member portal; active request, separate deposit status, weekly plan day, and service history visible; repo routing and recorded full-flow scope match case study | Did not submit another request, send staff messages, or repeat Stripe/Airtable/Telegram writes |
| [SpecialtyPulse](https://specialtypulse.kristenmartino.ai/) | Opened Dermatology/99213/CY2023 comparison; $104.91 and 3,777 services match case study and recorded source; exercised add-to-brief and inspected handoff | Synthetic/generated scenarios; no Domo, Databricks, or stakeholder-use validation |
| [Valuate](https://valuate.kristenmartino.ai/) | Opened AAPL, JPM, PRU, PLD, and EOG workspaces, covering all five model categories; source labels, FY/accession, assumptions, simulated range, and historical statements render | Waited for asynchronous workspaces; not a new extraction-accuracy study or verification of every filing field |
| [Tenancy](https://tenancy.kristenmartino.ai/) | Lease list and existing sample review render; eight review items/four blockers, source PDF navigation, edit form and cancellation checked | No existing review decision changed; did not rerun extraction or MCP clients |
| [Eval Harness](https://evals.kristenmartino.ai/) | Results show 319/400 stored-label matches, macro-F1 0.7598, model-assigned references, and 100 unevaluated held-out items, matching public run artifacts | Methodology/results site; not an interactive model runner or human-labeled accuracy leaderboard |
| [GridPulse](https://gridpulse.kristenmartino.ai/) | Loaded FPL overview with published seasonal baseline, forecast peak, 24-hour observed-error context and explicit lack of a training holdout for that baseline; repo explains same separation | Observations and scores can change; no new benchmark or validation of all 51 regions |
| [Tarazu](https://tarazu.app/demo) | Opened fictional Relay walkthrough; problem/evidence/decision/next-test structure matches the case study and repo | Prepared read-only story; no cloud save, signed-in AI, or actual checklist experiment |
| [Sift](https://siftnews.io/) | Feed, guest topic search, and stored comparison load; source links and provider ratings visible; sign-in/new-comparison boundary checked in UI and client implementation | New comparison and signed-in saving not exercised; generated claims not independently fact-checked |
| [GTM Healthcare](https://gtm.kristenmartino.ai/) | All seven apps plus QBR/methodology open; live AskGTM and AskPractice sample questions return calculated results and scope disclosures consistent with repo | Separate synthetic fixtures; no CRM or warehouse connection claimed; only representative model requests |
| [Orrery](https://orrery.day/) | Send/pitch preview returns a window, score, factors and timezone-only qualification; private Kairos scoring configuration confirms rule-based calculation | Astrological convention score, not success probability; no email subscription or personal-account flow tested |

## Checked repository revisions

- `medicare-provider-outliers`: `48b862ff6b216187dbad3d418e0911f60389d515`
- `cabana`: `e03157be4cf2ce42cdedeecff463f41a2e311ae3`
- `specialtypulse_pipeline`: `7cd9592e01f24cdfe77612ca97dc0852a5753877`
- `valuate`: `981939b5f3d429456178b9aaf98cd64752559c39`
- `valuate-web`: `4ec994dd59e9101a7f8945045e3517b264f5a951`
- `valuate-api`: `380a4d646eaa4f9383935cd850ee0de8cdc41079`
- `tenancy`: `aee80d4f38b255b00b8a42ce7ef8921d5937725e`
- `tenancy-api`: `fc406e5518eee35b4d6f6e31a18bc47c08ade176`
- `eval-harness`: `312ef96c4e6d8fea32780d6207d7fc96524d665f`
- `gridpulse`: `a6898358efb984fc9594915e0a9ee336b8e22760`
- `Tarazu`: `87f3698af1e7665730e136e91413a961b6f86152`
- `sift`: `6e88dd455d1a241da013965c374e3b5aab4b3dfc`
- `gtm-healthcare-intel`: `d80dd7d22a5eb1922518b37c561c7ca071fe7812`
- Kairos: private source inspected through authenticated access; its public preview was checked separately.

## Evidence and reproduction

Browser observations, snapshots, screenshots, and the Medicare format-bug video
are retained in the local audit directory. The Medicare repository's
`docs/demo_coverage.md` gives standard-library reproduction commands for the
committed extract counts and rate denominators. Its build checks the actual
Evidence pages and bundled CSVs without a warehouse.
