import { Section } from "@/components/section/Section";
import { Mono } from "@/components/typography/Mono";
import { Tag } from "@/components/primitives/Tag";
import { about } from "@/content/about";

export function About() {
  return (
    <Section id="about" index="04" label="About" variant="soot">
      <div className="max-w-3xl">
        <div>
          <h2
            className="font-semibold text-[var(--color-bone)] max-w-xl"
            style={{
              fontSize: "var(--text-h2)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            {about.heading}
          </h2>
          <p className="mt-6 whitespace-pre-line text-base md:text-lg leading-relaxed max-w-lg text-[var(--color-graphite-40)]">
            {about.bio}
          </p>

          <div
            className="mt-10 pl-5 border-l-2 max-w-md"
            style={{ borderColor: "var(--color-signal-blue)" }}
          >
            <Mono
              variant="caption"
              className="!text-[var(--color-bone)]"
            >
              Operating principle
            </Mono>
            <p className="mt-2 font-mono text-sm md:text-base leading-snug text-[var(--color-bone)]">
              {about.pullQuote}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {about.tags.map((tag) => (
              <Tag key={tag} light>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
