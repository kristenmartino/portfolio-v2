"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ─── palette ─── */
const c = {
  black: "#0a0a0a",
  dark: "#161616",
  gray90: "#262626",
  gray80: "#393939",
  gray60: "#6f6f6f",
  gray40: "#a8a8a8",
  gray20: "#d1d1d1",
  gray10: "#e8e8e8",
  white: "#f4f4f4",
  pureWhite: "#ffffff",
  blue: "#0f62fe",
  blueDark: "#0043ce",
  blueLight: "#a6c8ff",
  teal: "#08bdba",
  magenta: "#ee5396",
};

/* ─── data ─── */
const featuredProject = {
  title: "GridPulse",
  eyebrow: "Featured Case Study",
  summary:
    "Energy intelligence platform combining forecasting, scenario analysis, and role-based decision views.",
  description:
    "A weather-aware operating layer for power markets, built to unify live grid context, forecasting models, and scenario analysis in one decision-ready product.",
  metrics: ["8 regions", "4 model types", "Role-based views", "Cloud Run deployment"],
  liveHref: "https://gridpulse.kristenmartino.ai",
  codeHref: "https://github.com/kristenmartino/gridpulse",
};

const projectCards = [
  {
    title: "Tarazu",
    category: "Product + AI",
    summary:
      "AI-assisted prioritization product using the RICE framework, interactive scoring, and strategy guidance.",
    href: "https://prioritize.kristenmartino.ai",
    index: "01",
  },
  {
    title: "GTM Healthcare Intelligence",
    category: "Analytics Platform",
    summary:
      "Healthcare GTM analytics suite with scoring, benchmarking, diagnostics, and AI query tools.",
    href: "https://gtm.kristenmartino.ai",
    index: "02",
  },
  {
    title: "Sift",
    category: "AI News Product",
    summary:
      "AI-curated news product with 100+ RSS sources, semantic search, and multi-source comparison.",
    href: "https://siftnews.kristenmartino.ai",
    index: "03",
  },
  {
    title: "Sift Intelligence Pipeline",
    category: "AI Backend + Pipeline",
    summary:
      "FastAPI + LangGraph service for ingestion, summarization, embeddings, and multi-source comparison.",
    href: "https://github.com/kristenmartino/sift-api",
    index: "04",
  },
  {
    title: "Revenue Recovery Audit Workflow",
    category: "Enterprise Systems",
    summary:
      "Billing validation workflow for mismatch detection, finance corrections, and stronger revenue accuracy.",
    href: "#contact",
    index: "05",
  },
  {
    title: "Platform Migration + ARR Growth",
    category: "Cross-Functional Delivery",
    summary:
      "Migration and cross-sell initiative spanning payments, systems, operations, and growth execution.",
    href: "#contact",
    index: "06",
  },
  {
    title: "RMS Fare Validation System",
    category: "Decision Support",
    summary:
      "Logic-driven pricing validation model covering complex fare rules and downstream revenue decisions.",
    href: "#contact",
    index: "07",
  },
  {
    title: "FocusForge",
    category: "Mobile Product Concept",
    summary:
      "Character-driven productivity app concept blending progression mechanics and privacy-first AI coaching.",
    href: "https://github.com/kristenmartino/focusforge",
    index: "08",
  },
  {
    title: "Flight Disruption Recovery",
    category: "Operational Decision Support",
    summary:
      "Decision-support concept for disruption response, combining predictive signals, real-time data, and recovery visibility.",
    href: "#contact",
    index: "09",
  },
];

const expertise = [
  {
    number: "01",
    title: "Product Strategy",
    text: "Turning complex problems into sharper product direction, usable workflows, and better decisions.",
  },
  {
    number: "02",
    title: "Business Analysis",
    text: "Structuring messy systems, requirements, and operations into something teams can execute with confidence.",
  },
  {
    number: "03",
    title: "Applied AI + Data",
    text: "Designing practical systems across forecasting, analytics, automation, and AI-enabled decision support.",
  },
];

const aboutPillars = [
  {
    title: "Clarify the problem",
    text: "I reduce ambiguity early so teams can move with more confidence and less noise.",
  },
  {
    title: "Design for trust",
    text: "The work has to be understandable, credible, and grounded enough that people actually use it.",
  },
  {
    title: "Make it operational",
    text: "I care about workflow, execution, and outcomes — not just ideas, decks, or prototypes.",
  },
];

/* ─── reusable pieces ─── */
const Label = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <span
    className="inline-block text-[11px] uppercase tracking-[0.22em] font-medium"
    style={{ color: light ? "rgba(255,255,255,0.44)" : c.gray60, fontFamily: "'IBM Plex Mono', monospace" }}
  >
    {children}
  </span>
);

const Divider = ({ light }: { light?: boolean }) => (
  <div className="w-full h-px" style={{ backgroundColor: light ? "rgba(255,255,255,0.1)" : c.gray10 }} />
);

/* ─── scroll-linked hero ─── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex flex-col justify-end" style={{ backgroundColor: c.dark }}>
      {/* grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent)`, backgroundSize: "calc(100% / 16) 100%" }} />

      {/* accent line */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${c.blue}, ${c.teal}, transparent 70%)` }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Label light>Product · Data · Applied AI</Label>
        </motion.div>

        <motion.h1
          className="mt-6 font-semibold leading-[0.92] tracking-[-0.04em]"
          style={{ color: c.pureWhite, fontSize: "clamp(2.8rem, 7vw, 6rem)", fontFamily: "'IBM Plex Sans', sans-serif" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          I design clear,
          <br />
          usable systems.
        </motion.h1>

        <motion.div
          className="mt-10 grid md:grid-cols-[1fr_1fr] gap-8 md:gap-16 items-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-base md:text-lg leading-relaxed max-w-lg" style={{ color: c.gray40, fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Systems-oriented leader across product strategy, business analysis, and applied AI — turning fragmented workflows and complex decisions into products people trust and use.
          </p>
          <div className="flex gap-4">
            <a
              href="#work"
              className="px-6 py-3.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: c.blue, color: c.pureWhite, fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 text-sm border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: c.gray20, fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Start a Conversation
            </a>
          </div>
        </motion.div>

        {/* signal strip */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {[
            { label: "Clarity in ambiguity", sub: "Turning messy problems into structure" },
            { label: "Systems people trust", sub: "Products, analytics, and AI people use" },
            { label: "High-leverage execution", sub: "Connecting strategy, data, and delivery" },
          ].map((item, i) => (
            <div key={item.label} className="py-5 pr-8" style={{ borderTop: `1px solid ${i === 0 ? c.blue : "rgba(255,255,255,0.1)"}` }}>
              <div className="text-sm font-medium" style={{ color: c.pureWhite, fontFamily: "'IBM Plex Sans', sans-serif" }}>{item.label}</div>
              <div className="mt-1 text-sm" style={{ color: c.gray60, fontFamily: "'IBM Plex Sans', sans-serif" }}>{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── main component ─── */
export default function KristenPortfolio() {
  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* ── Nav ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 backdrop-blur-md"
        style={{ backgroundColor: "rgba(10,10,10,0.82)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <a
          href="/"
          className="text-sm tracking-[0.18em] font-medium"
          style={{ color: c.gray20, fontFamily: "'IBM Plex Mono', monospace" }}
        >
          kristenmartino.ai
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: c.gray40 }}>
          {["Work", "Expertise", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Featured Project ── */}
      <section id="work" style={{ backgroundColor: c.pureWhite }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
          <div className="flex items-baseline justify-between mb-12 md:mb-16">
            <div>
              <Label>Selected Work</Label>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: c.black }}>
                A sharper edit of the work.
              </h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-0 overflow-hidden"
            style={{ backgroundColor: c.dark }}
          >
            {/* left */}
            <div className="p-8 md:p-12 flex flex-col justify-between" style={{ borderRight: `1px solid ${c.gray80}` }}>
              <div>
                <Label light>{featuredProject.eyebrow}</Label>
                <h3 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight" style={{ color: c.pureWhite }}>
                  {featuredProject.title}
                </h3>
                <p className="mt-6 text-base leading-relaxed max-w-md" style={{ color: c.gray40 }}>
                  {featuredProject.summary}
                </p>
                <p className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: c.gray60 }}>
                  {featuredProject.description}
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {featuredProject.metrics.map((m) => (
                  <span key={m} className="px-3 py-1.5 text-xs tracking-wide border" style={{ borderColor: c.gray80, color: c.gray40, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* right — abstract visualization */}
            <div className="relative p-8 md:p-12 min-h-[400px] md:min-h-[480px] flex flex-col justify-between">
              {/* grid lines */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent)`, backgroundSize: "calc(100% / 8) 100%" }} />

              <div className="relative z-10 grid grid-cols-2 gap-3 flex-1">
                <div className="border p-5 flex flex-col justify-between" style={{ borderColor: c.gray80 }}>
                  <div className="text-xs uppercase tracking-widest" style={{ color: c.gray60, fontFamily: "'IBM Plex Mono', monospace" }}>Operating View</div>
                  <div className="mt-4">
                    <div className="h-16 w-full" style={{ background: `linear-gradient(135deg, ${c.blue}, ${c.teal})` }} />
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div className="h-8" style={{ backgroundColor: c.gray80 }} />
                      <div className="h-8" style={{ backgroundColor: c.gray80 }} />
                      <div className="h-8" style={{ backgroundColor: c.gray80 }} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="border p-5 flex-1" style={{ borderColor: c.gray80 }}>
                    <div className="text-xs uppercase tracking-widest" style={{ color: c.gray60, fontFamily: "'IBM Plex Mono', monospace" }}>Models</div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: c.gray40 }}>Backtesting, confidence, and scenario analysis.</p>
                  </div>
                  <div className="border p-5 flex-1" style={{ borderColor: c.gray80 }}>
                    <div className="text-xs uppercase tracking-widest" style={{ color: c.gray60, fontFamily: "'IBM Plex Mono', monospace" }}>Infra</div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: c.gray40 }}>Cloud Run, caching, scheduled compute.</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex gap-6 mt-8 text-sm" style={{ color: c.gray40 }}>
                <a href={featuredProject.liveHref} target="_blank" rel="noreferrer" className="font-medium hover:text-white transition-colors" style={{ color: c.blue }}>
                  Live Site ↗
                </a>
                <a href={featuredProject.codeHref} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  GitHub ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Project grid ── */}
          <div className="mt-1">
            {projectCards.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="group grid grid-cols-[3rem_1fr_1fr_auto] md:grid-cols-[4rem_1.2fr_1fr_auto] items-baseline gap-4 md:gap-8 py-5 md:py-6 border-b transition-colors hover:bg-gray-50"
                style={{ borderColor: c.gray10 }}
              >
                <span className="text-xs" style={{ color: c.gray40, fontFamily: "'IBM Plex Mono', monospace" }}>{project.index}</span>
                <span className="text-base md:text-lg font-medium group-hover:translate-x-1 transition-transform" style={{ color: c.black }}>
                  {project.title}
                </span>
                <span className="text-sm hidden md:block" style={{ color: c.gray60 }}>{project.summary}</span>
                <span className="text-xs uppercase tracking-wider" style={{ color: c.gray60, fontFamily: "'IBM Plex Mono', monospace" }}>{project.category}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise ── */}
      <section id="expertise" style={{ backgroundColor: c.white }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
          <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-12 md:gap-20">
            <div>
              <Label>Expertise</Label>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: c.black }}>
                Broad range.
                <br />
                Strong point of view.
              </h2>
            </div>

            <div>
              {expertise.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  {i === 0 && <Divider />}
                  <div className="grid md:grid-cols-[4rem_1fr] gap-4 py-8 md:py-10">
                    <span className="text-xs" style={{ color: c.gray40, fontFamily: "'IBM Plex Mono', monospace" }}>{item.number}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight" style={{ color: c.black }}>{item.title}</h3>
                      <p className="mt-3 text-base leading-relaxed max-w-lg" style={{ color: c.gray60 }}>{item.text}</p>
                    </div>
                  </div>
                  <Divider />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ backgroundColor: c.dark }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <Label light>About</Label>
              <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight leading-snug" style={{ color: c.pureWhite }}>
                I'm most at home in ambiguity, in the space before the structure exists.
              </h2>
              <p className="mt-6 text-base leading-relaxed max-w-lg" style={{ color: c.gray40 }}>
                I'll take the messy thing nobody wants to touch, break it apart, and make it work.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Product strategy", "Business analysis", "Applied AI"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-xs tracking-wide border" style={{ borderColor: c.gray80, color: c.gray40, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-px">
              {aboutPillars.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="p-6 md:p-8 border-l-2 transition-colors"
                  style={{
                    borderLeftColor: i === 0 ? c.blue : i === 1 ? c.teal : c.magenta,
                    backgroundColor: c.gray90,
                  }}
                >
                  <Label light>0{i + 1}</Label>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight" style={{ color: c.pureWhite }}>{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: c.gray40 }}>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ backgroundColor: c.black }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-20 items-end">
            <div>
              <Label light>Contact</Label>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: c.pureWhite }}>
                If something here resonated, I'd love to hear from you.
              </h2>
              <p className="mt-5 text-base leading-relaxed max-w-lg" style={{ color: c.gray40 }}>
                Open to roles, consulting, and the occasional great conversation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:hello@kristenmartino.ai"
                className="px-6 py-3.5 text-sm font-medium transition-colors"
                style={{ backgroundColor: c.blue, color: c.pureWhite }}
              >
                Email
              </a>
              {[
                { label: "LinkedIn", href: "https://linkedin.com/in/kristenmartino" },
                { label: "GitHub", href: "https://github.com/kristenmartino" },
                { label: "Resume", href: "/resume" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="px-6 py-3.5 text-sm border transition-colors hover:bg-white/5"
                  style={{ borderColor: c.gray80, color: c.gray20 }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* bottom rule */}
          <div className="mt-20 md:mt-32 pt-6 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${c.gray80}`, color: c.gray60 }}>
            <span>© {new Date().getFullYear()} Kristen Martino</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.16em" }}>kristenmartino.ai</span>
          </div>
        </div>
      </section>
    </div>
  );
}
