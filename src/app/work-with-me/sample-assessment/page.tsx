import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Footer } from "@/components/footer/Footer";
import assessment from "@/content/assessments/gtm-healthcare.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Quota totals and written amounts verified · Kristen Martino",
  description:
    "GTM Healthcare Intelligence: dated quota-total and written-amount checks, with original observations, malformed-input control and supporting evidence.",
};

const narrative = assessment.hiringNarrative;
const quotaFollowUp = assessment.quotaFollowUp;
const writtenAmountFollowUp = assessment.writtenAmountFollowUp;

function findingDisplay(id: string) {
  return assessment.findingDisplay[id as keyof typeof assessment.findingDisplay];
}

const revealEvidenceScript = `(() => {
  const reveal = (hash, scroll) => {
    let target;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
    const support = document.getElementById("supporting-evidence");
    if (!target || !support || !support.contains(target)) return;
    let disclosure = target.closest("details");
    while (disclosure && support.contains(disclosure)) {
      disclosure.open = true;
      disclosure = disclosure.parentElement?.closest("details");
    }
    if (scroll) target.scrollIntoView({ block: "start" });
  };
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[href^="#"]');
    if (link) reveal(link.getAttribute("href"), false);
  });
  window.addEventListener("hashchange", () => reveal(window.location.hash, true));
  if (window.location.hash) reveal(window.location.hash, true);
})();`;

function Status({ state, children }: { state: string; children: React.ReactNode }) {
  return (
    <span className={`${styles.status} ${state === "closed" ? styles.verified : styles.open}`}>
      <span aria-hidden="true" className={styles.statusMark} />
      {children}
    </span>
  );
}

function EvidenceLinks({ ids }: { ids: string[] }) {
  return (
    <ul className={styles.evidenceLinks} aria-label="Supporting evidence">
      {ids.map((id) => {
        const source = assessment.sources.find((item) => item.id === id);
        return source ? <li key={id}><a href={`#${id}`}>{id}<span className={styles.visuallyHidden}>: {source.label}</span></a></li> : null;
      })}
    </ul>
  );
}

function SectionHeading({ number, title, note }: { number: string; title: string; note?: string }) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.sectionNumber} aria-hidden="true">{number}</span>
      <div><h2>{title}</h2>{note && <p>{note}</p>}</div>
    </div>
  );
}

export default function SampleAssessment() {
  return (
    <div className={styles.page}>
      <a href="#main" className={styles.skipLink}>Skip to assessment</a>
      <header className={`${styles.siteChrome} ${styles.documentNav}`}>
        <nav className={styles.documentNavInner} aria-label="Portfolio navigation">
          <Link href="/" className={styles.portfolioBrand}>Kristen Martino</Link>
          <Link href="/work/gtm-healthcare" className={styles.servicesLink}>GTM case study <span aria-hidden="true">→</span></Link>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <header className={`${styles.hero} ${styles.compactHero}`}>
          <div className={styles.readingColumn}>
            <div className={styles.documentLine}>
              <span>{narrative.eyebrow}</span>
            </div>
            <p className={styles.selfLabel}>{narrative.label}</p>
            <h1>{narrative.title}</h1>
            <p className={styles.subtitle}>{narrative.context}</p>
            <p className={styles.byline}>{assessment.author} · {narrative.byline}</p>
          </div>
        </header>

        <div className={styles.paper}>
          <div className={styles.readingColumn}>
            <div className={styles.introduction}>
              <p className={styles.introLead}>{narrative.opening}</p>
              {narrative.role && <p className={styles.role}>{narrative.role}</p>}
              <nav className={styles.readingNav} aria-label="Work sample contents">
                <a href="#decisions">Findings</a>
                <a href="#dated-checks">Checks</a>
                <a href="#supporting-evidence">Full evidence ↓</a>
              </nav>
            </div>

            <section id="decisions" className={styles.decisions} aria-label="Three findings">
              {narrative.decisions.map((decision) => (
                <article key={decision.id} id={decision.id} className={styles.decision}>
                  <div className={styles.decisionHeading}>
                    <span className={styles.decisionNumber} aria-hidden="true">{decision.number}</span>
                    <h2>{decision.title}</h2>
                  </div>
                  <div className={styles.decisionBody}>
                    {decision.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {decision.id === "requested-result" && (
                      <figure className={styles.quotaExample}>
                        <figcaption>Q1 2025 · synthetic records</figcaption>
                        <div className={styles.quotaColumns}>
                          <div>
                            <h3>Original · October 25</h3>
                            <p>Chen: $504,000 / $450,000 · 112.0%</p>
                            <p>Kim: $250,000 / $350,000 · 71.4%</p>
                            <span>Bookings / quota · attainment</span>
                          </div>
                          <div className={`${styles.expectedQuota} ${styles.verifiedQuota}`}>
                            <h3>Verified · October 26</h3>
                            <p>$754,000 ÷ $800,000 = <strong>94.25%</strong></p>
                            <span>Combined bookings ÷ quota · 94.3% displayed</span>
                          </div>
                        </div>
                      </figure>
                    )}
                    <div className={styles.decisionFoot}>
                      {decision.state === "mixed" ? <span className={styles.mixedStatus}>{decision.status}</span> : <Status state={decision.state}>{decision.status}</Status>}
                      <a href={decision.supportHref}>{decision.supportLabel} →</a>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <section id="dated-checks" className={styles.verificationSummary}>
              <h2>Dated checks</h2>
              {narrative.verification.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className={styles.nextStep}>{narrative.next}</p>
            </section>
            <div className={styles.packetLink}>
              <a href={assessment.downloadHref} download>Download original October 25 evidence <span aria-hidden="true">↓</span></a>
              <span>Recorded questions and responses</span>
            </div>
          </div>
          <div className={styles.container}>
            <details id="supporting-evidence" className={`${styles.support} ${styles.details}`}>
              <summary><span>{narrative.supportTitle}</span><small>{narrative.supportDescription}</small></summary>
              <div className={styles.supportBody}>
                <p className={styles.supportContext}>Original review: {assessment.title} — {assessment.subtitle}. The five original requests were checked {assessment.checkedAt}, at app revision <a href={`https://github.com/kristenmartino/gtm-healthcare-intel/tree/${assessment.appRevision}`} target="_blank" rel="noreferrer"><code>{assessment.appRevisionShort}</code> ↗</a>.</p>
                <p className={styles.supportContext}>The separate <a href="#quota-follow-up">October 26 quota follow-up</a> checked three requests at revision <a href={quotaFollowUp.servingSource} target="_blank" rel="noreferrer"><code>{quotaFollowUp.appRevisionShort}</code> ↗</a>. The quota requests did not recheck other findings.</p>
                <p className={styles.supportContext}>The later <a href="#written-amount-follow-up">October 26 written-amount follow-up</a>, at 3:01 p.m. Eastern, checked written and numeric thresholds plus one malformed-input control. Source disclosure, quarterly ranking and no-show controls retain their original October 25 observations.</p>
                <p className={styles.supportContext}>{assessment.provenance}</p>
                <section id="summary" className={styles.section}>
                  <SectionHeading number="01" title="Assessment summary" />
                  <p className={styles.lead}>{assessment.summary}</p>
                  <dl className={styles.counts} aria-label="Assessment counts">
                    <div><dt>Findings</dt><dd>{assessment.counts.findings}</dd></div>
                    <div><dt>Verified corrections</dt><dd>{assessment.counts.verifiedCorrections}</dd></div>
                    <div><dt>Awaiting recheck</dt><dd>{assessment.counts.awaitingRecheck}</dd></div>
                    <div><dt>October 25 requests</dt><dd>{assessment.counts.originalRequests}</dd></div>
                    <div><dt>October 26 quota requests</dt><dd>{assessment.counts.quotaFollowUpRequests}</dd></div>
                    <div><dt>October 26 written-amount requests</dt><dd>{assessment.counts.writtenAmountFollowUpRequests}</dd></div>
                  </dl>
                  <div className={styles.scopeGrid}>
                    <div><h3 className={styles.smallHeading}>Original review scope</h3><ul className={styles.list}>{assessment.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <aside className={styles.priorityKey} aria-label="Priority definitions"><h3 className={styles.smallHeading}>How priorities are used</h3>{assessment.priorities.map((item) => <p key={item.level}><strong>{item.level}</strong> {item.meaning}</p>)}</aside>
                  </div>
                  <div className={styles.resourceLinks}>
                    <a href={assessment.downloadHref} download>Download original October 25 evidence <span aria-hidden="true">↓</span></a>
                    <a href="https://gtm.kristenmartino.ai/" target="_blank" rel="noreferrer">Open the demo ↗</a>
                    <Link href="/work/gtm-healthcare">Read the case study →</Link>
                  </div>
                </section>

                <section id="findings" className={styles.section}>
                  <SectionHeading number="02" title="Findings and evidence" note="All four selected findings have dated verification: source disclosure and quarterly ranking on October 25; combined quota and written amounts in separate October 26 follow-ups. This is not whole-app validation." />
                  <div className={styles.register}>
                    <div className={styles.registerHeader} aria-hidden="true"><span>ID / priority</span><span>Finding</span><span>Status / checked date</span><span>Next action</span></div>
                    {assessment.findings.map((finding) => {
                      const action = finding.id === "F02" ? assessment.plan[0].title : finding.id === "F04" ? assessment.plan[1].title : assessment.plan[2].title;
                      return <div className={styles.registerRow} key={finding.id}>
                        <span className={styles.registerId}>{finding.id}<span>{finding.priority}</span></span>
                        <a className={styles.registerTitle} href={`#${finding.id}`}>{finding.title}</a>
                        <Status state={finding.state}>{findingDisplay(finding.id).status}</Status>
                        <span className={styles.registerAction}>{action}</span>
                      </div>;
                    })}
                  </div>

                  <div className={styles.findingList}>
                    {assessment.findings.map((finding) => (
                      <article id={finding.id} key={finding.id} className={styles.finding}>
                        <header className={styles.findingHeader}>
                          <div className={styles.findingMeta}><span>{finding.id} / {finding.priority}</span><span>{finding.kind}</span></div>
                          <Status state={finding.state}>{findingDisplay(finding.id).status}</Status>
                          <h3>{finding.title}</h3>
                        </header>
                        <p className={styles.supportContext}>{findingDisplay(finding.id).context}</p>
                        <p>{finding.observation}</p>
                        <p className={styles.risk}><strong>Review risk.</strong> {finding.risk}</p>
                        {"question" in finding && <div className={styles.question}><span className={styles.smallHeading}>Question checked</span><blockquote>{finding.question}</blockquote></div>}
                        <div className={styles.comparison} aria-label={`${finding.id} original recorded comparison`}>
                          <div><h4>Recorded before</h4><pre>{finding.before}</pre></div>
                          <div className={finding.id === "F02" || finding.id === "F04" || finding.state !== "closed" ? styles.openPanel : styles.correctedPanel}><h4>{findingDisplay(finding.id).panelLabel}</h4><pre>{finding.after}</pre></div>
                        </div>
                        {finding.id === "F02" && (
                          <div id="quota-follow-up" className={styles.verificationNote} style={{ scrollMarginTop: 88 }}>
                            <h4 className={styles.smallHeading}>October 26 verified recheck</h4>
                            <p>{quotaFollowUp.checkedAt}. Serving revision <a href={quotaFollowUp.servingSource} target="_blank" rel="noreferrer"><code>{quotaFollowUp.appRevisionShort}</code> ↗</a>; <a href={quotaFollowUp.fixSource} target="_blank" rel="noreferrer">existing fix <code>{quotaFollowUp.fixCommit.slice(0, 7)}</code> ↗</a>.</p>
                            <p>{quotaFollowUp.summary}</p>
                            <div className={styles.checks}>
                              {quotaFollowUp.cases.map((check) => <article key={check.id} className={styles.check}>
                                <h4 className={styles.smallHeading}>{check.id === "combined" ? "Combined only" : check.id === "per-rep" ? "Per-rep only" : "Combined and per-rep together"} · verified</h4>
                                <p>{check.question}</p>
                                <details className={styles.details}><summary>October 26 observed response</summary><pre className={styles.response}>{check.observed}</pre></details>
                              </article>)}
                            </div>
                            <p>{quotaFollowUp.perRepNote}</p>
                            <p>{quotaFollowUp.testNote}</p>
                            <p>{quotaFollowUp.scopeNote}</p>
                            <p><a href={quotaFollowUp.downloadHref} download>Download October 26 quota recheck packet ↓</a></p>
                            <EvidenceLinks ids={quotaFollowUp.evidence} />
                          </div>
                        )}
                        {finding.id === "F04" && (
                          <div id="written-amount-follow-up" className={styles.verificationNote} style={{ scrollMarginTop: 88 }}>
                            <h4 className={styles.smallHeading}>October 26 written-amount recheck</h4>
                            <p>{writtenAmountFollowUp.checkedAt}. Serving revision <a href={writtenAmountFollowUp.servingSource} target="_blank" rel="noreferrer"><code>{writtenAmountFollowUp.appRevisionShort}</code> ↗</a>; <a href={writtenAmountFollowUp.fixSource} target="_blank" rel="noreferrer">existing fix <code>{writtenAmountFollowUp.fixCommit.slice(0, 7)}</code> ↗</a>.</p>
                            <p>{writtenAmountFollowUp.summary}</p>
                            <p>{writtenAmountFollowUp.independentExpectation}</p>
                            <div className={styles.checks}>
                              {writtenAmountFollowUp.cases.map((check) => <article key={check.id} className={styles.check}>
                                <h4 className={styles.smallHeading}>{check.id === "written" ? "Written amount · matched" : check.id === "numeric" ? "Numeric amount · matched" : "Malformed amount · clarification, no calculation"}</h4>
                                <p>{check.question}</p>
                                <p>Source: <code>{check.source}</code>. Tool calls: {check.toolCallCount}.</p>
                                <details className={styles.details}><summary>October 26 recorded response</summary><pre className={styles.response}>{check.observed}</pre></details>
                              </article>)}
                            </div>
                            <p>{writtenAmountFollowUp.malformedNote}</p>
                            <p>{writtenAmountFollowUp.testNote}</p>
                            <p>{writtenAmountFollowUp.method}</p>
                            <p>{writtenAmountFollowUp.scopeNote}</p>
                            <p>{writtenAmountFollowUp.unrechecked}</p>
                            <p><a href={writtenAmountFollowUp.downloadHref} download>Download October 26 written-amount recheck packet ↓</a></p>
                            <EvidenceLinks ids={writtenAmountFollowUp.evidence} />
                          </div>
                        )}
                        <div className={styles.fix}><h4 className={styles.smallHeading}>Implemented fix</h4><p>{finding.fix}</p></div>
                        <div className={styles.verificationNote}><h4 className={styles.smallHeading}>Verification and limits</h4><p>{finding.verification}</p></div>
                        <details className={styles.details}><summary>Acceptance checks</summary><ul className={styles.list}>{finding.acceptance.map((item) => <li key={item}>{item}</li>)}</ul></details>
                        <div className={styles.findingSources}><span className={styles.smallHeading}>Evidence</span><EvidenceLinks ids={finding.evidence} /></div>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="action-plan" className={styles.section}>
                  <SectionHeading number="03" title="Prioritized action plan" note="Retain the verified quota, written-amount and invalid-input checks. No app code was changed or deployed for this assessment or either follow-up." />
                  <ol className={styles.plan}>
                    {assessment.plan.map((item) => <li key={item.order}><span className={styles.planNumber}>{item.order}</span><div><p className={styles.planStatus}>{item.status} · {item.finding}</p><h3>{item.title}</h3><p>{item.text}</p></div></li>)}
                  </ol>
                  <aside className={styles.opportunity}><h3>{assessment.futureOpportunity.title}</h3><p>{assessment.futureOpportunity.text}</p></aside>
                </section>

                <section id="verification" className={styles.section}>
                  <SectionHeading number="04" title="Original verification — October 25" note="The five original requests and their results below are retained verbatim. They describe revision d80dd7d, not the later October 26 quota or written-amount results." />
                  <p className={styles.checkedAt}>Original requests began {assessment.checkedAt}. App revision <code>{assessment.appRevisionShort}</code>.</p>
                  <div className={styles.checks}>
                    {assessment.checks.map((check, index) => <article key={check.id} className={styles.check}>
                      <div className={styles.checkHeader}><span className={styles.checkIndex}>Q{String(index + 1).padStart(2, "0")}</span><h3>{check.id.replaceAll("-", " ")}</h3><span className={styles.checkOutcome}>{check.outcome}</span></div>
                      <p><strong>Expected:</strong> {check.expected}</p>
                      <details className={styles.details}><summary>Observed production response</summary><pre className={styles.response}>{check.observed}</pre></details>
                    </article>)}
                  </div>
                  <aside className={styles.safeControl}><h3>{assessment.safeControl.title}</h3><p>{assessment.safeControl.text}</p></aside>
                  <div className={styles.method}><h3>Method and limits</h3><p>{assessment.methodNote}</p><ul className={styles.list}>{assessment.limits.map((item) => <li key={item}>{item}</li>)}</ul></div>
                </section>

                <section id="evidence" className={styles.section}>
                  <SectionHeading number="05" title="Evidence ledger" note="E1–E9 retain the original record; E10–E11 document the earlier quota follow-up; E12–E13 document the later written-amount follow-up and parser source." />
                  <ol className={styles.sourceLedger}>
                    {assessment.sources.map((source) => <li id={source.id} key={source.id}><span className={styles.sourceId}>{source.id}</span><div><a href={source.href} target={source.href.startsWith("https:") ? "_blank" : undefined} rel={source.href.startsWith("https:") ? "noreferrer" : undefined}>{source.label} <span aria-hidden="true">{source.href.startsWith("https:") ? "↗" : "↓"}</span></a><p>{source.note}</p></div></li>)}
                  </ol>
                  <div className={styles.documentEnd}><span>End of assessment</span><span>{assessment.author} / {assessment.date}</span></div>
                </section>
              </div>
            </details>
          </div>
        </div>
      </main>
      <Script id="gtm-assessment-evidence-anchors" strategy="afterInteractive">{revealEvidenceScript}</Script>
      <div className={styles.siteChrome}><Footer /></div>
    </div>
  );
}
