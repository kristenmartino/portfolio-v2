"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section/Section";
import { Mono } from "@/components/typography/Mono";
import { Tag } from "@/components/primitives/Tag";
import { about, pillars } from "@/content/about";
import { EASE, DUR } from "@/lib/motion";

const pillarAccents = [
  "var(--color-signal-blue)",
  "var(--color-signal-teal)",
  "var(--color-signal-magenta)",
];

export function About() {
  return (
    <Section id="about" index="04" label="About" variant="soot">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
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
          <p className="mt-6 text-base md:text-lg leading-relaxed max-w-lg text-[var(--color-graphite-40)]">
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

        <div className="flex flex-col gap-px">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: DUR.slow, delay: i * 0.08, ease: EASE.outExpo }}
              className="p-6 md:p-8 border-l-2 bg-[var(--color-graphite-90)]"
              style={{ borderLeftColor: pillarAccents[i] }}
            >
              <Mono variant="label" tone="muted">
                {String(i + 1).padStart(2, "0")}
              </Mono>
              <h3 className="mt-3 text-lg md:text-xl font-semibold text-[var(--color-bone)] tracking-[-0.01em]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-[var(--color-graphite-40)]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
