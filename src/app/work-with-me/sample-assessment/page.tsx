import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Footer } from "@/components/footer/Footer";
import assessment from "@/content/assessments/gtm-healthcare.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Correct figures, missing combined total · Kristen Martino",
  description:
    "GTM Healthcare Intelligence: a missing combined total, corrected source labels and dated query checks, with full supporting evidence.",
};

const narrative = assessment.hiringNarrative;

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
            <p className={styles.byline}>{assessment.author} · {assessment.date}</p>
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
                            <h3>Observed: separate reps</h3>
                            <p>Chen: $504,000 / $450,000 · 112.0%</p>
                            <p>Kim: $250,000 / $350,000 · 71.4%</p>
                            <span>Bookings / quota · attainment</span>
                          </div>
                          <div className={styles.expectedQuota}>
                            <h3>Expected combined result · not shipped</h3>
                            <p>$754,000 ÷ $800,000 = <strong>94.25%</strong></p>
                            <span>Combined bookings ÷ combined quota</span>
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
              <a href={assessment.downloadHref} download>Download verification packet <span aria-hidden="true">↓</span></a>
              <span>Recorded questions and responses</span>
            </div>
          </div>
          <div className={styles.container}>
            <details id="supporting-evidence" className={`${styles.support} ${styles.details}`}>
              <summary><span>{narrative.supportTitle}</span><small>{narrative.supportDescription}</small></summary>
              <div className={styles.supportBody}>
                <p className={styles.supportContext}>Supporting record: {assessment.title} — {assessment.subtitle}. Observations below are from {assessment.checkedAt}, at app revision <a href={`https://github.com/kristenmartino/gtm-healthcare-intel/tree/${assessment.appRevision}`} target="_blank" rel="noreferrer"><code>{assessment.appRevisionShort}</code> ↗</a>.</p>
                <p className={styles.supportContext}>{assessment.provenance}</p>
                <section id="summary" className={styles.section}>
                  <SectionHeading number="01" title="Assessment summary" />
                  <p className={styles.lead}>{assessment.summary}</p>
                  <dl className={styles.counts} aria-label="Assessment counts">
                    <div><dt>Findings</dt><dd>{assessment.counts.findings}</dd></div>
                    <div><dt>Verified corrections</dt><dd>{assessment.counts.verifiedCorrections}</dd></div>
                    <div><dt>Open findings</dt><dd>{assessment.counts.openFindings}</dd></div>
                    <div><dt>Fresh query requests</dt><dd>{assessment.counts.freshRequests}</dd></div>
                  </dl>
                  <div className={styles.scopeGrid}>
                    <div><h3 className={styles.smallHeading}>Review scope</h3><ul className={styles.list}>{assessment.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <aside className={styles.priorityKey} aria-label="Priority definitions"><h3 className={styles.smallHeading}>How priorities are used</h3>{assessment.priorities.map((item) => <p key={item.level}><strong>{item.level}</strong> {item.meaning}</p>)}</aside>
                  </div>
                  <div className={styles.resourceLinks}>
                    <a href={assessment.downloadHref} download>Download verification packet <span aria-hidden="true">↓</span></a>
                    <a href="https://gtm.kristenmartino.ai/" target="_blank" rel="noreferrer">Open the demo ↗</a>
                    <Link href="/work/gtm-healthcare">Read the case study →</Link>
                  </div>
                </section>

                <section id="findings" className={styles.section}>
                  <SectionHeading number="02" title="Findings and evidence" note="Two corrections were already implemented and rechecked. Two findings remain open at the tested revision." />
                  <div className={styles.register}>
                    <div className={styles.registerHeader} aria-hidden="true"><span>ID / priority</span><span>Finding</span><span>Current status</span><span>Next action</span></div>
                    {assessment.findings.map((finding) => {
                      const action = finding.id === "F02" ? assessment.plan[0].title : finding.id === "F04" ? assessment.plan[1].title : assessment.plan[2].title;
                      return <div className={styles.registerRow} key={finding.id}>
                        <span className={styles.registerId}>{finding.id}<span>{finding.priority}</span></span>
                        <a className={styles.registerTitle} href={`#${finding.id}`}>{finding.title}</a>
                        <Status state={finding.state}>{finding.status}</Status>
                        <span className={styles.registerAction}>{action}</span>
                      </div>;
                    })}
                  </div>

                  <div className={styles.findingList}>
                    {assessment.findings.map((finding) => (
                      <article id={finding.id} key={finding.id} className={styles.finding}>
                        <header className={styles.findingHeader}>
                          <div className={styles.findingMeta}><span>{finding.id} / {finding.priority}</span><span>{finding.kind}</span></div>
                          <Status state={finding.state}>{finding.status}</Status>
                          <h3>{finding.title}</h3>
                        </header>
                        <p>{finding.observation}</p>
                        <p className={styles.risk}><strong>Review risk.</strong> {finding.risk}</p>
                        {"question" in finding && <div className={styles.question}><span className={styles.smallHeading}>Question checked</span><blockquote>{finding.question}</blockquote></div>}
                        <div className={styles.comparison} aria-label={`${finding.id} before and current comparison`}>
                          <div><h4>Recorded before</h4><pre>{finding.before}</pre></div>
                          <div className={finding.state === "closed" ? styles.correctedPanel : styles.openPanel}><h4>Current recheck · {finding.state === "closed" ? "verified" : "still open"}</h4><pre>{finding.after}</pre></div>
                        </div>
                        <div className={styles.fix}><h4 className={styles.smallHeading}>{finding.state === "closed" ? "Implemented fix" : "Recommended fix"}</h4><p>{finding.fix}</p></div>
                        <div className={styles.verificationNote}><h4 className={styles.smallHeading}>Verification and limits</h4><p>{finding.verification}</p></div>
                        <details className={styles.details}><summary>Acceptance checks</summary><ul className={styles.list}>{finding.acceptance.map((item) => <li key={item}>{item}</li>)}</ul></details>
                        <div className={styles.findingSources}><span className={styles.smallHeading}>Evidence</span><EvidenceLinks ids={finding.evidence} /></div>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="action-plan" className={styles.section}>
                  <SectionHeading number="03" title="Prioritized action plan" note="Recommendations are separated from changes already implemented. No app changes were made for this assessment." />
                  <ol className={styles.plan}>
                    {assessment.plan.map((item) => <li key={item.order}><span className={styles.planNumber}>{item.order}</span><div><p className={styles.planStatus}>{item.status} · {item.finding}</p><h3>{item.title}</h3><p>{item.text}</p></div></li>)}
                  </ol>
                  <aside className={styles.opportunity}><h3>{assessment.futureOpportunity.title}</h3><p>{assessment.futureOpportunity.text}</p></aside>
                </section>

                <section id="verification" className={styles.section}>
                  <SectionHeading number="04" title="Before / after verification" note="Five purpose-selected requests, not a benchmark success rate. Historical responses are distinguished from the fresh recheck." />
                  <p className={styles.checkedAt}>Fresh requests began {assessment.checkedAt}. App revision <code>{assessment.appRevisionShort}</code>.</p>
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
                  <SectionHeading number="05" title="Evidence ledger" note="Source snapshots, recorded responses and fresh checks supporting the findings above." />
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
