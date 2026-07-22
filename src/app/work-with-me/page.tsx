import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Section } from "@/components/section/Section";
import { Mono } from "@/components/typography/Mono";
import { Reframe } from "@/components/services/Reframe";
import { SymptomRouter } from "@/components/services/SymptomRouter";
import { EngagementCard } from "@/components/services/EngagementCard";
import { Rise } from "@/components/services/Rise";
import {
  servicesMeta,
  engagements,
  engagementsHeading,
  engagementsSub,
  proof,
  proofHeading,
  proofSub,
  processHeading,
  processSteps,
  faqHeading,
  faqs,
  startHeading,
  startSub,
  startLinks,
} from "@/content/services";

export const metadata: Metadata = {
  title: servicesMeta.title,
  description: servicesMeta.description,
  // Reached by direct link from Contra; kept out of search so it doesn't
  // compete with the homepage's role-search positioning.
  robots: { index: false, follow: true },
  openGraph: {
    title: servicesMeta.title,
    description: servicesMeta.description,
    url: "https://kristenmartino.ai/work-with-me",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: servicesMeta.title,
    description: servicesMeta.description,
  },
};

export default function WorkWithMe() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        {/* §00 — signature hero */}
        <Reframe />

        {/* §01 — symptom router */}
        <Section id="router" index="01" label="Start Here" variant="ink">
          <SymptomRouter />
        </Section>

        {/* §02 — engagements */}
        <Section id="engagements" index="02" label="Engagements" variant="paper">
          <div className="max-w-2xl">
            <h2
              className="font-semibold text-[var(--color-ink)]"
              style={{
                fontSize: "var(--text-h2)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: "var(--leading-snug)",
              }}
            >
              {engagementsHeading}
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-graphite-80)]">
              {engagementsSub}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:gap-6 lg:grid-cols-2">
            {engagements.map((e) => (
              <EngagementCard key={e.id} engagement={e} />
            ))}
          </div>

          <p className="mt-6 text-sm text-[var(--color-graphite-60)] max-w-2xl">
            Fixed scope, fixed price agreed up front. Bigger or ongoing work is
            quoted from there — the diagnosis is how we both find out if it&rsquo;s
            worth it.
          </p>
        </Section>

        {/* §03 — proof */}
        <Section id="proof" index="03" label="Proof" variant="soot">
          <div className="max-w-2xl">
            <h2
              className="font-semibold text-[var(--color-bone)]"
              style={{
                fontSize: "var(--text-h2)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: "var(--leading-snug)",
              }}
            >
              {proofHeading}
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-graphite-40)]">
              {proofSub}
            </p>
          </div>

          <ul className="mt-12 border-t border-[var(--color-graphite-90)]">
            {proof.map((p, i) => (
              <Rise
                as="li"
                i={i}
                key={p.slug}
                className="grid md:grid-cols-[1fr_1.4fr] gap-4 md:gap-10 py-8 md:py-10 border-b border-[var(--color-graphite-90)]"
              >
                <div>
                  <Mono variant="label" tone="muted">
                    {p.name}
                  </Mono>
                  <p className="mt-3 text-xl md:text-2xl font-semibold text-[var(--color-bone)] tracking-[-0.01em] max-w-xs">
                    {p.claim}
                  </p>
                </div>
                <div>
                  <p className="text-[15px] md:text-base leading-relaxed text-[var(--color-graphite-20)] max-w-xl">
                    {p.detail}
                  </p>
                  <div className="mt-4">
                    <Mono variant="meter" tone="muted">
                      {p.metric}
                    </Mono>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    <Link
                      href={p.caseStudyHref}
                      className="text-sm text-[var(--color-signal-blue-soft)] hover:text-[var(--color-bone)] transition-colors"
                    >
                      Read the case study →
                    </Link>
                    <a
                      href={p.liveHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[var(--color-graphite-40)] hover:text-[var(--color-bone)] transition-colors"
                    >
                      {p.liveLabel} ↗
                    </a>
                  </div>
                </div>
              </Rise>
            ))}
          </ul>
        </Section>

        {/* §04 — process */}
        <Section id="process" index="04" label="Process" variant="paper">
          <div className="max-w-2xl">
            <h2
              className="font-semibold text-[var(--color-ink)]"
              style={{
                fontSize: "var(--text-h2)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: "var(--leading-snug)",
              }}
            >
              {processHeading}
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:gap-6 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <Rise i={i} key={step.index} className="border-t border-[var(--color-ink)] pt-5">
                <div className="flex items-baseline gap-3">
                  <Mono variant="index" tone="ink">
                    {step.index}
                  </Mono>
                  <h3 className="text-lg font-semibold text-[var(--color-ink)] tracking-[-0.01em]">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-graphite-80)]">
                  {step.text}
                </p>
              </Rise>
            ))}
          </div>
        </Section>

        {/* §05 — questions */}
        <Section id="questions" index="05" label="Questions" variant="soot">
          <div className="max-w-3xl">
            <h2
              className="font-semibold text-[var(--color-bone)]"
              style={{
                fontSize: "var(--text-h2)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: "var(--leading-snug)",
              }}
            >
              {faqHeading}
            </h2>

            <dl className="mt-10 border-t border-[var(--color-graphite-90)]">
              {faqs.map((f, i) => (
                <Rise
                  i={i}
                  key={f.q}
                  className="grid md:grid-cols-[1fr_1.6fr] gap-2 md:gap-10 py-7 border-b border-[var(--color-graphite-90)]"
                >
                  <dt className="text-base md:text-lg font-medium text-[var(--color-bone)] tracking-[-0.01em]">
                    {f.q}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-[var(--color-graphite-40)]">
                    {f.a}
                  </dd>
                </Rise>
              ))}
            </dl>
          </div>
        </Section>

        {/* §06 — start */}
        <Section id="start" index="06" label="Start" variant="ink" withSeam={false}>
          <div className="max-w-3xl">
            <Mono variant="label" tone="muted">
              Start here
            </Mono>
            <h2
              className="mt-6 font-semibold text-[var(--color-bone)]"
              style={{
                fontSize: "var(--text-h1)",
                letterSpacing: "var(--tracking-display)",
                lineHeight: "var(--leading-tight)",
              }}
            >
              {startHeading}
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed max-w-2xl text-[var(--color-graphite-40)]">
              {startSub}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={startLinks.contra.href}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 text-sm font-medium bg-[var(--color-signal-blue)] text-[var(--color-bone)] hover:bg-[var(--color-signal-blue-deep)] transition-colors"
              >
                {startLinks.contra.label}
              </a>
              <a
                href={startLinks.email.href}
                className="px-6 py-3.5 text-sm border border-[var(--color-graphite-80)] text-[var(--color-graphite-20)] hover:border-[var(--color-graphite-40)] hover:bg-white/5 transition-colors"
              >
                {startLinks.email.label}
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
