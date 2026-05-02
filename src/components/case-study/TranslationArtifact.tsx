"use client";

import { motion } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { Mono } from "@/components/typography/Mono";
import { DUR, EASE } from "@/lib/motion";
import type {
  Artifact,
  ArtifactDecision,
  ArtifactDecisionScore,
  ArtifactOutcome,
  ArtifactPillar,
  ArtifactRequirement,
  ProjectMode,
} from "@/lib/types";

const SECTION_REVEAL = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const stagger = (i: number) => ({
  ...SECTION_REVEAL,
  transition: { duration: DUR.slow, delay: 0.05 + i * 0.06, ease: EASE.outExpo },
});

type Span = "full" | "major" | "minor";

function spanClass(span: Span) {
  switch (span) {
    case "full":
      return "lg:col-span-12";
    case "major":
      return "lg:col-span-7";
    case "minor":
      return "lg:col-span-5";
  }
}

function ArtifactSection({
  index,
  number,
  label,
  span,
  children,
}: {
  index: number;
  number: string;
  label: string;
  span: Span;
  children: ReactNode;
}) {
  return (
    <motion.section
      {...stagger(index)}
      className={`col-span-12 ${spanClass(span)} flex flex-col`}
    >
      <div className="flex items-baseline gap-3 pb-3 mb-5 border-b border-[var(--color-graphite-90)]">
        <Mono variant="index" tone="muted" className="!tracking-[0.18em]">
          {number}
        </Mono>
        <Mono variant="label" tone="graphite">
          {label}
        </Mono>
      </div>
      <div className="flex-1">{children}</div>
    </motion.section>
  );
}

function ProblemFrame({
  situation,
  complication,
  question,
}: Artifact["problem"]) {
  const rows: { label: string; text: string; emphasis?: boolean }[] = [
    { label: "S", text: situation },
    { label: "C", text: complication },
    { label: "Q", text: question, emphasis: true },
  ];
  return (
    <dl className="space-y-4">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[1.5rem_1fr] gap-3">
          <dt
            aria-hidden="true"
            className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[var(--color-graphite-60)] pt-1"
          >
            {row.label}
          </dt>
          <dd
            className={
              row.emphasis
                ? "text-[var(--color-bone)] text-sm md:text-base leading-snug"
                : "text-[var(--color-graphite-20)] text-sm md:text-base leading-snug"
            }
          >
            <span className="sr-only">
              {row.label === "S"
                ? "Situation: "
                : row.label === "C"
                  ? "Complication: "
                  : "Question: "}
            </span>
            {row.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function RequirementGrid({
  items,
}: {
  items: readonly ArtifactRequirement[];
}) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item.stakeholder + item.need}
          className="border-l border-[var(--color-graphite-90)] pl-4"
        >
          <Mono
            variant="caption"
            tone="muted"
            className="!text-[var(--color-graphite-40)]"
          >
            {item.stakeholder}
          </Mono>
          <p className="mt-1.5 text-sm leading-snug text-[var(--color-graphite-20)]">
            {item.need}
          </p>
          {item.evidence && (
            <p className="mt-1 text-xs italic leading-snug text-[var(--color-graphite-60)]">
              {item.evidence}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

const SCORE_GLYPH: Record<ArtifactDecisionScore, string> = {
  met: "●",
  partial: "◐",
  unmet: "—",
};

const SCORE_LABEL: Record<ArtifactDecisionScore, string> = {
  met: "meets criterion",
  partial: "partially meets criterion",
  unmet: "does not meet criterion",
};

function DecisionMatrix({
  criteria,
  options,
}: {
  criteria: readonly string[];
  options: readonly ArtifactDecision[];
}) {
  return (
    <>
      {/* Desktop: table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-graphite-90)]">
              <th className="text-left py-2.5 pr-4 align-bottom">
                <Mono variant="caption" tone="muted">
                  Option
                </Mono>
              </th>
              {criteria.map((crit) => (
                <th
                  key={crit}
                  className="text-center py-2.5 px-3 align-bottom"
                >
                  <Mono variant="caption" tone="muted">
                    {crit}
                  </Mono>
                </th>
              ))}
              <th className="text-left py-2.5 pl-4 align-bottom w-[28%]">
                <Mono variant="caption" tone="muted">
                  Verdict
                </Mono>
              </th>
            </tr>
          </thead>
          <tbody>
            {options.map((opt) => (
              <tr
                key={opt.option}
                className={`border-b border-[var(--color-graphite-90)] ${
                  opt.chosen
                    ? "bg-[rgba(15,98,254,0.04)]"
                    : ""
                }`}
              >
                <td
                  className={`py-3 pr-4 align-top text-sm ${
                    opt.chosen
                      ? "text-[var(--color-bone)] font-medium"
                      : "text-[var(--color-graphite-40)]"
                  }`}
                >
                  <span className="flex items-stretch gap-3">
                    <span
                      aria-hidden="true"
                      className={`w-[2px] -my-3 ${
                        opt.chosen
                          ? "bg-[var(--color-signal-blue)]"
                          : "bg-transparent"
                      }`}
                    />
                    {opt.option}
                  </span>
                </td>
                {opt.scores.map((score, i) => (
                  <td
                    key={criteria[i] ?? i}
                    className="py-3 px-3 text-center"
                  >
                    <span
                      aria-label={`${criteria[i]}: ${SCORE_LABEL[score]}`}
                      className={`inline-block text-base ${
                        score === "met"
                          ? opt.chosen
                            ? "text-[var(--color-signal-blue)]"
                            : "text-[var(--color-graphite-20)]"
                          : score === "partial"
                            ? "text-[var(--color-graphite-40)]"
                            : "text-[var(--color-graphite-80)]"
                      }`}
                    >
                      {SCORE_GLYPH[score]}
                    </span>
                  </td>
                ))}
                <td className="py-3 pl-4 align-top">
                  {opt.chosen ? (
                    <div>
                      <Mono
                        variant="status"
                        className="!text-[var(--color-signal-blue)] !tracking-[0.2em]"
                      >
                        ← chosen
                      </Mono>
                      {opt.rationale && (
                        <p className="mt-1.5 text-xs leading-snug text-[var(--color-graphite-40)]">
                          {opt.rationale}
                        </p>
                      )}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards, chosen first */}
      <div className="md:hidden space-y-4">
        {[...options]
          .sort((a, b) => Number(Boolean(b.chosen)) - Number(Boolean(a.chosen)))
          .map((opt) => (
            <div
              key={opt.option}
              className={`pl-4 border-l ${
                opt.chosen
                  ? "border-[var(--color-signal-blue)]"
                  : "border-[var(--color-graphite-90)]"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p
                  className={`text-sm ${
                    opt.chosen
                      ? "text-[var(--color-bone)] font-medium"
                      : "text-[var(--color-graphite-40)]"
                  }`}
                >
                  {opt.option}
                </p>
                {opt.chosen && (
                  <Mono
                    variant="status"
                    className="!text-[var(--color-signal-blue)]"
                  >
                    chosen
                  </Mono>
                )}
              </div>
              <ul className="mt-2 space-y-1">
                {opt.scores.map((score, i) => (
                  <li
                    key={criteria[i] ?? i}
                    className="flex items-baseline gap-2 text-xs"
                  >
                    <span
                      aria-hidden="true"
                      className={
                        score === "met"
                          ? "text-[var(--color-graphite-20)]"
                          : score === "partial"
                            ? "text-[var(--color-graphite-40)]"
                            : "text-[var(--color-graphite-80)]"
                      }
                    >
                      {SCORE_GLYPH[score]}
                    </span>
                    <span className="text-[var(--color-graphite-40)]">
                      <span className="sr-only">{SCORE_LABEL[score]}: </span>
                      {criteria[i]}
                    </span>
                  </li>
                ))}
              </ul>
              {opt.chosen && opt.rationale && (
                <p className="mt-2 text-xs leading-snug text-[var(--color-graphite-40)]">
                  {opt.rationale}
                </p>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

function SolutionPillars({
  summary,
  pillars,
}: {
  summary: string;
  pillars: readonly ArtifactPillar[];
}) {
  return (
    <div>
      <p className="text-sm md:text-base font-medium leading-snug text-[var(--color-bone)]">
        {summary}
      </p>
      <dl className="mt-5 grid grid-cols-[max-content_1fr] gap-x-5 gap-y-3 items-baseline">
        {pillars.map((pillar) => (
          <Fragment key={pillar.title}>
            <dt className="whitespace-nowrap">
              <Mono variant="caption" tone="muted">
                {pillar.title}
              </Mono>
            </dt>
            <dd className="text-sm leading-snug text-[var(--color-graphite-20)]">
              {pillar.detail}
            </dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
}

function OutcomeMetrics({ outcome }: { outcome: ArtifactOutcome }) {
  if (outcome.kind === "qualitative") {
    return (
      <p className="text-sm md:text-base italic leading-snug text-[var(--color-graphite-20)]">
        {outcome.statement}
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-6">
      {outcome.items.map((item) => (
        <li key={item.metric} className="flex flex-col">
          <Mono variant="caption" tone="muted" className="!text-[var(--color-graphite-40)]">
            {item.metric}
          </Mono>
          <p className="mt-2 text-2xl md:text-3xl font-semibold tabular-nums tracking-tight text-[var(--color-signal-blue-soft)] leading-tight">
            {item.after}
          </p>
          {item.before && (
            <p className="mt-1 text-xs text-[var(--color-graphite-60)] leading-snug">
              <span className="line-through">{item.before}</span>
              <span className="mx-1.5">→</span>
              <span>{item.after}</span>
            </p>
          )}
          {item.note && (
            <p className="mt-1 text-xs italic text-[var(--color-graphite-60)] leading-snug">
              {item.note}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export type TranslationArtifactProps = {
  artifact: Artifact;
  year?: string;
  mode?: ProjectMode;
};

export function TranslationArtifact({
  artifact,
  year,
  mode,
}: TranslationArtifactProps) {
  return (
    <section
      aria-label="Translation artifact"
      className="bg-[var(--color-soot)] border-b border-[var(--color-graphite-90)] py-12 md:py-16"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.base, ease: EASE.outExpo }}
          className="flex items-baseline justify-between gap-4 pb-4 mb-10 border-b border-[var(--color-graphite-80)]"
        >
          <Mono variant="label" tone="muted">
            Translation artifact
          </Mono>
          <div className="flex items-baseline gap-3 flex-wrap justify-end">
            {year && (
              <Mono variant="meter" tone="graphite">
                {year}
              </Mono>
            )}
            {year && mode && (
              <span
                aria-hidden="true"
                className="text-[var(--color-graphite-80)]"
              >
                ·
              </span>
            )}
            {mode && (
              <Mono variant="meter" tone="graphite">
                {mode}
              </Mono>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-x-12 gap-y-12">
          <ArtifactSection index={0} number="01" label="Problem" span="major">
            <ProblemFrame {...artifact.problem} />
          </ArtifactSection>

          <ArtifactSection
            index={1}
            number="02"
            label="Requirements"
            span="minor"
          >
            <RequirementGrid items={artifact.requirements} />
          </ArtifactSection>

          <ArtifactSection index={2} number="03" label="Decision" span="full">
            <DecisionMatrix
              criteria={artifact.decisions.criteria}
              options={artifact.decisions.options}
            />
          </ArtifactSection>

          <ArtifactSection index={3} number="04" label="Solution" span="major">
            <SolutionPillars
              summary={artifact.solution.summary}
              pillars={artifact.solution.pillars}
            />
          </ArtifactSection>

          <ArtifactSection index={4} number="05" label="Outcome" span="minor">
            <OutcomeMetrics outcome={artifact.outcome} />
          </ArtifactSection>
        </div>
      </div>
    </section>
  );
}
