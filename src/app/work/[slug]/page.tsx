import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { DeepDiveDivider } from "@/components/case-study/DeepDiveDivider";
import { ReadingProgress } from "@/components/case-study/ReadingProgress";
import { TranslationArtifact } from "@/components/case-study/TranslationArtifact";
import { Footer } from "@/components/footer/Footer";
import { getStudy, studySlugs } from "@/content/work";

export function generateStaticParams() {
  return studySlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return {};

  const description =
    study.summary.length > 160
      ? `${study.summary.slice(0, 157).trimEnd()}…`
      : study.summary;

  return {
    title: `${study.title} — Kristen Martino`,
    description,
    openGraph: {
      title: `${study.title} — Kristen Martino`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Kristen Martino`,
      description,
    },
  };
}

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
  const study = getStudy(slug);
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
