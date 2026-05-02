import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { DeepDiveDivider } from "@/components/case-study/DeepDiveDivider";
import { ReadingProgress } from "@/components/case-study/ReadingProgress";
import { TranslationArtifact } from "@/components/case-study/TranslationArtifact";
import { Footer } from "@/components/footer/Footer";
import { featuredProject, projects } from "@/content/work";
import type { Artifact, ProjectMode } from "@/lib/types";

type Study = {
  eyebrow: string;
  title: string;
  summary: string;
  metrics: string[];
  liveHref?: string;
  codeHref?: string;
  artifact?: Artifact;
  year?: string;
  mode?: ProjectMode;
};

const studies: Record<string, Study> = {
  [featuredProject.slug]: {
    eyebrow: featuredProject.eyebrow,
    title: featuredProject.title,
    summary: featuredProject.summary,
    metrics: featuredProject.metrics,
    liveHref: featuredProject.liveHref,
    codeHref: featuredProject.codeHref,
    artifact: featuredProject.artifact,
    year: featuredProject.year,
    mode: featuredProject.mode,
  },
  ...Object.fromEntries(
    projects
      .filter((p): p is typeof p & { slug: string } => Boolean(p.slug))
      .map((p) => [
        p.slug,
        {
          eyebrow: `Case Study / ${p.title}`,
          title: p.title,
          summary: p.summary,
          metrics: [...(p.metrics ?? [])],
          liveHref: p.liveHref,
          codeHref: p.codeHref,
          artifact: p.artifact,
          year: p.year,
          mode: p.mode,
        },
      ]),
  ),
};

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export const dynamicParams = false;

async function loadBody(
  slug: string,
): Promise<ComponentType | null> {
  try {
    const mod = await import(`@/content/work/${slug}.mdx`);
    return mod.default ?? null;
  } catch {
    return null;
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = studies[slug];
  if (!study) notFound();

  const Body = await loadBody(slug);

  return (
    <>
      <ReadingProgress />
      <CaseStudyHeader
        eyebrow={study.eyebrow}
        title={study.title}
        summary={study.summary}
        metrics={[...study.metrics]}
        liveHref={study.liveHref}
        codeHref={study.codeHref}
        viewTransitionName={`${slug}-card`}
      />
      {study.artifact && (
        <TranslationArtifact
          artifact={study.artifact}
          year={study.year}
          mode={study.mode}
        />
      )}
      {study.artifact && Body && <DeepDiveDivider />}
      {Body && (
        <article className="bg-[var(--color-soot)] py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="max-w-3xl">
              <Body />
            </div>
          </div>
        </article>
      )}
      <Footer />
    </>
  );
}
