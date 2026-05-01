import { notFound } from "next/navigation";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { ReadingProgress } from "@/components/case-study/ReadingProgress";
import { Footer } from "@/components/footer/Footer";
import { featuredProject } from "@/content/work";

const studies = {
  gridpulse: {
    eyebrow: featuredProject.eyebrow,
    title: featuredProject.title,
    summary: featuredProject.summary,
    metrics: featuredProject.metrics,
    liveHref: featuredProject.liveHref,
    codeHref: featuredProject.codeHref,
  },
} as const;

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = studies[slug as keyof typeof studies];
  if (!study) notFound();

  const { default: Body } = await import(`@/content/work/${slug}.mdx`);

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
      <article className="bg-[var(--color-soot)] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <Body />
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
