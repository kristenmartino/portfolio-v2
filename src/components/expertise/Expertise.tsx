import { Section } from "@/components/section/Section";
import { Mono } from "@/components/typography/Mono";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { Divider } from "@/components/primitives/Divider";
import { expertise } from "@/content/expertise";

export function Expertise() {
  return (
    <Section id="expertise" index="03" label="Capabilities" variant="paper">
      <div className="grid lg:grid-cols-[0.42fr_0.58fr] gap-10 md:gap-20">
        <div>
          <RevealHeading
            className="text-[var(--color-ink)]"
            style={{
              fontSize: "var(--text-h2)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Capabilities.
          </RevealHeading>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-graphite-60)] max-w-md">
            Where strategy, analytics, and AI meet — under operational
            pressure.
          </p>
        </div>

        <div>
          {expertise.map((item, i) => (
            <div key={item.title}>
              {i === 0 && <Divider />}
              <div className="grid md:grid-cols-[4rem_1fr] gap-4 py-8 md:py-10">
                <Mono variant="index" tone="graphite">
                  {item.number}
                </Mono>
                <div>
                  <h3
                    className="text-xl md:text-2xl font-semibold text-[var(--color-ink)]"
                    style={{ letterSpacing: "var(--tracking-tight)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed max-w-xl text-[var(--color-graphite-60)]">
                    {item.text}
                  </p>
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
