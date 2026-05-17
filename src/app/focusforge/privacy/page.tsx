import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Mono } from "@/components/typography/Mono";

export const metadata: Metadata = {
  title: "FocusForge — Privacy Policy",
  description:
    "FocusForge's privacy policy. Your work data never leaves your phone. The AI Coach runs entirely on-device. No cloud LLM, no behavioral profile, no account.",
  robots: { index: true, follow: true },
};

export default function FocusForgePrivacyPolicy() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="bg-[var(--color-soot)] min-h-[100svh] pt-32 md:pt-40 pb-20 md:pb-28"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            {/* Eyebrow + hero */}
            <Mono variant="label" tone="muted">
              FocusForge · Privacy
            </Mono>
            <h1
              className="mt-6 font-semibold text-[var(--color-bone)]"
              style={{
                fontSize: "var(--text-h1)",
                letterSpacing: "var(--tracking-display)",
                lineHeight: "var(--leading-tight)",
              }}
            >
              Privacy Policy
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--color-graphite-40)]">
              <span>
                <span className="font-medium text-[var(--color-graphite-20)]">
                  Effective:
                </span>{" "}
                May 15, 2026
              </span>
              <span>
                <span className="font-medium text-[var(--color-graphite-20)]">
                  Last updated:
                </span>{" "}
                May 17, 2026
              </span>
            </div>

            {/* TL;DR summary box */}
            <div className="mt-12 rounded-md border-l-2 border-[var(--color-signal-blue-soft)] bg-[var(--color-graphite-90)]/40 px-6 py-5">
              <Mono variant="label" tone="graphite">
                The short version
              </Mono>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-graphite-20)]">
                FocusForge is built so the things that matter to you — your
                task names, when you start sessions, what you focus on — never
                leave your phone. The AI Coach runs entirely on-device. There
                is no cloud LLM, no behavioral profile, no account. We use
                Firebase for two narrow things: crash reports (to fix bugs)
                and anonymous product analytics (to know which screens get
                used). Both are per-install only and tied to no identity we
                can map back to you.
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-graphite-40)]">
                The long version follows. If anything below is unclear, email{" "}
                <a
                  href="mailto:privacy@kristenmartino.ai"
                  className="text-[var(--color-signal-blue-soft)] underline-offset-4 hover:underline"
                >
                  privacy@kristenmartino.ai
                </a>{" "}
                and we&apos;ll explain in plain language.
              </p>
            </div>

            {/* Body content */}
            <div className="legal-content mt-16 space-y-12 text-[var(--color-graphite-20)]">
              <Section title="Who we are">
                <p>
                  FocusForge is built by Kristen Martino, an independent
                  developer, as a solo project. &quot;We&quot; / &quot;us&quot; / &quot;our&quot;
                  in this document refers to Kristen Martino, the developer
                  and operator of FocusForge.
                </p>
                <p>
                  You can reach us at{" "}
                  <a
                    href="mailto:privacy@kristenmartino.ai"
                                     >
                    privacy@kristenmartino.ai
                  </a>
                  .
                </p>
              </Section>

              <Section title="What FocusForge collects">
                <p>
                  We separate this carefully because the categories matter
                  under GDPR, CCPA, and Apple&apos;s App Tracking Transparency
                  rules.
                </p>

                <Subsection title="What FocusForge never collects">
                  <p>
                    The following information{" "}
                    <strong>never leaves your iPhone</strong> under any
                    circumstances:
                  </p>
                  <ul>
                    <li>
                      Your task names (&quot;Draft Q3 report,&quot; &quot;Study for biology
                      exam,&quot; etc.)
                    </li>
                    <li>
                      Your focus session content or any text you type into the
                      app
                    </li>
                    <li>
                      Your character customization choices, equipped cosmetics,
                      or inventory
                    </li>
                    <li>
                      Your streak history, completed sessions, or session
                      durations beyond aggregate event counts (see below)
                    </li>
                    <li>
                      Your AI Coach interaction text (the templates the coach
                      shows you, the template you chose, etc.)
                    </li>
                    <li>Anything you&apos;d reasonably call &quot;what you&apos;re working on&quot;</li>
                    <li>
                      Your contacts, calendar, photos, location, or any data
                      outside the app
                    </li>
                    <li>
                      Your email, phone number, name, or other identifying
                      details (we don&apos;t ask for them; the app has no account
                      system)
                    </li>
                    <li>Your biometric data, health data, or device sensor data</li>
                    <li>
                      Your IP address (Firebase strips this before storing for
                      the events we use)
                    </li>
                  </ul>
                </Subsection>

                <Subsection title="What FocusForge does collect">
                  <p>
                    Everything below runs through Firebase (Crashlytics and
                    Analytics) provided by Google. None of it is linked to your
                    identity, and none of it includes the content of what you
                    focus on.
                  </p>
                  <p>
                    <strong>Crash reports</strong> — When the app crashes,
                    Crashlytics records:
                  </p>
                  <ul>
                    <li>The crash stack trace (which lines of code failed)</li>
                    <li>Your iPhone model and iOS version</li>
                    <li>The app version</li>
                    <li>
                      Anonymous breadcrumbs (which screens were visited in the
                      seconds before the crash, by their internal names — e.g.
                      &quot;timer_view_opened,&quot; not the task names you typed)
                    </li>
                  </ul>
                  <p>We use crash reports only to find and fix bugs.</p>

                  <p>
                    <strong>Anonymous product analytics events</strong> — A
                    small set of events that tell us which features get used.
                    Each event is anonymous and attached only to a randomly
                    generated <strong>Firebase App Instance ID</strong> that
                    lives on your device and resets when you uninstall. The
                    events we send are listed in the source code:{" "}
                    <a
                      href="https://github.com/kristenmartino/focusforge/blob/main/app/FocusForge/Services/AnalyticsService.swift"
                                         >
                      AnalyticsService.swift
                    </a>
                    .
                  </p>
                  <p>Examples of events sent:</p>
                  <ul>
                    <li>
                      <code>session_started</code> (with: session type — focus
                      / short break / long break)
                    </li>
                    <li>
                      <code>session_completed</code> (with: duration in
                      minutes, planned duration)
                    </li>
                    <li>
                      <code>session_abandoned</code> (with: actual focus
                      minutes)
                    </li>
                    <li>
                      <code>milestone_unlocked</code> (with: streak day, item
                      rarity)
                    </li>
                    <li>
                      <code>cosmetic_equipped</code> (with: item slot, rarity)
                    </li>
                    <li>
                      <code>streak_lost</code> / <code>streak_freeze_used</code>
                    </li>
                    <li>
                      <code>ai_prompt_shown</code> (with: kind — intent /
                      reflection / nudge; template ID)
                    </li>
                    <li>
                      <code>ai_suggestion_accepted</code> /{" "}
                      <code>ai_suggestion_dismissed</code>
                    </li>
                  </ul>
                  <p>
                    These events tell us, in aggregate, things like &quot;23% of
                    users complete at least one session on day 7.&quot; They cannot
                    be traced back to any individual person.
                  </p>
                  <p>
                    <strong>Performance diagnostics</strong> — Firebase
                    Performance collects non-personal device performance data
                    (e.g. app start time, frame rates). Used to identify
                    slowdowns and crashes.
                  </p>
                </Subsection>

                <Subsection title="What we don't do with Firebase">
                  <p>
                    Apple&apos;s App Tracking Transparency requires us to disclose
                    tracking across apps and websites. FocusForge does{" "}
                    <strong>none</strong> of the following:
                  </p>
                  <ul>
                    <li>
                      We do not link Firebase events with third-party data for
                      advertising
                    </li>
                    <li>We do not share data with data brokers</li>
                    <li>
                      We do not use IDFA (Apple&apos;s advertising identifier). The
                      Firebase SDK module that accesses IDFA
                      (<code>GoogleAppMeasurementIdentitySupport</code>) is
                      intentionally <strong>not included</strong> in our build
                    </li>
                    <li>
                      We do not use Firebase Cloud Messaging for push
                      notifications. All notifications are local-only,
                      generated by <code>UNUserNotificationCenter</code> on your
                      phone
                    </li>
                    <li>
                      We do not use Firebase Remote Config for user-targeted
                      experiences
                    </li>
                    <li>We do not use Google Tag Manager</li>
                    <li>
                      We do not embed third-party SDKs from advertising
                      networks, attribution networks, or social platforms
                    </li>
                  </ul>
                </Subsection>
              </Section>

              <Section title="The AI Coach is on-device">
                <p>
                  The AI Coach in FocusForge is{" "}
                  <strong>template-based</strong>. It runs entirely on your
                  iPhone using a fixed catalog of hand-written templates routed
                  by your behavior. There is{" "}
                  <strong>no cloud language model</strong>. The coach engine is
                  open source and you can read every line a user might see:{" "}
                  <a
                    href="https://github.com/kristenmartino/focusforge-coach-engine"
                                     >
                    github.com/kristenmartino/focusforge-coach-engine
                  </a>
                </p>
                <p>
                  When the coach selects a template, the analytics event we
                  send (e.g. <code>ai_prompt_shown</code>) includes only the
                  template&apos;s internal identifier (like <code>frm_code_01</code>
                  ). It does not include your task name or any other content.
                </p>
              </Section>

              <Section title="Where data goes">
                <ul>
                  <li>
                    Crash reports and analytics events go to Firebase (Google)
                    servers in the United States and the European Union
                    depending on Google&apos;s routing.
                  </li>
                  <li>
                    We do not sell, rent, or share your data with third parties
                    for marketing.
                  </li>
                  <li>We do not use your data for advertising.</li>
                </ul>
              </Section>

              <Section title="How long data is kept">
                <ul>
                  <li>
                    <strong>On your device:</strong> all your local FocusForge
                    data (sessions, streaks, character) is kept until you
                    delete the app. You can export a JSON backup at any time
                    via <strong>Settings → Export My Progress</strong>.
                  </li>
                  <li>
                    <strong>Firebase Crashlytics:</strong> crash reports are
                    retained per Google&apos;s default policy (currently 90 days
                    for raw, longer for aggregated).
                  </li>
                  <li>
                    <strong>Firebase Analytics:</strong> event-level data is
                    retained per the retention setting we configured (currently
                    14 months); aggregated reports are retained indefinitely.
                  </li>
                </ul>
              </Section>

              <Section title="Your rights">
                <p>
                  You have the following rights regardless of where you live:
                </p>

                <Subsection title="Right to access">
                  <p>
                    You can see exactly what data is on your device by exporting
                    it: <strong>Settings → Export My Progress</strong>{" "}
                    generates a complete JSON snapshot.
                  </p>
                  <p>
                    For data on Firebase, email us at{" "}
                    <a href="mailto:privacy@kristenmartino.ai" className="link">
                      privacy@kristenmartino.ai
                    </a>{" "}
                    and we&apos;ll request your data subject access report from
                    Google&apos;s tooling. Since we don&apos;t store any identifiers
                    that link to you, the report will be limited to whatever is
                    associated with your Firebase App Instance ID, which you can
                    find via Apple&apos;s privacy report.
                  </p>
                </Subsection>

                <Subsection title="Right to deletion">
                  <p>
                    Uninstall the app. Your Firebase App Instance ID resets,
                    and any analytics or crash data on Firebase that was tied to
                    that ID becomes unattributable. You can also email us at{" "}
                    <a href="mailto:privacy@kristenmartino.ai" className="link">
                      privacy@kristenmartino.ai
                    </a>{" "}
                    and we&apos;ll request deletion through Google&apos;s tooling.
                  </p>
                </Subsection>

                <Subsection title="Right to opt out of analytics">
                  <p>
                    You can disable product analytics at any time via{" "}
                    <strong>
                      Settings → Privacy → Send anonymous analytics
                    </strong>
                    . When this is off, FocusForge stops sending analytics
                    events to Firebase at both the application layer and the
                    SDK layer (defense in depth). Crash reports remain on so we
                    can still fix bugs that affect you — those don&apos;t contain
                    task names or any content you&apos;d recognize as &quot;what you&apos;re
                    working on.&quot;
                  </p>
                  <p>
                    If you want to disable crash reporting too, enable iOS&apos;s{" "}
                    <strong>&quot;Limit Ad Tracking&quot;</strong> in Settings →
                    Privacy &amp; Security → Advertising. We don&apos;t recommend this
                    because crash data is genuinely how we find and fix
                    problems, but the choice is yours.
                  </p>
                </Subsection>

                <Subsection title="Right to portability">
                  <p>
                    The JSON export from{" "}
                    <strong>Settings → Export My Progress</strong> is a
                    complete, machine-readable copy of all data we store about
                    your usage. You can use it however you want.
                  </p>
                </Subsection>

                <Subsection title="Right to non-discrimination">
                  <p>
                    We do not differentiate the app&apos;s functionality based on
                    whether you exercise your privacy rights.
                  </p>
                </Subsection>
              </Section>

              <Section title="Children">
                <p>
                  FocusForge is not intended for users under 13. We do not
                  knowingly collect any data from children under 13. If you
                  believe we have, email{" "}
                  <a href="mailto:privacy@kristenmartino.ai" className="link">
                    privacy@kristenmartino.ai
                  </a>{" "}
                  and we will delete it.
                </p>
              </Section>

              <Section title="International users">
                <p>
                  If you use FocusForge from outside the United States, your
                  data may be processed in the United States (where Firebase is
                  headquartered). Standard contractual clauses apply for
                  transfers from the European Economic Area, the United
                  Kingdom, and Switzerland.
                </p>
              </Section>

              <Section title="Changes to this policy">
                <p>
                  Material changes to this policy will be announced in the
                  app&apos;s <strong>Settings → About</strong> screen and via a
                  notice on this page at least 30 days before they take effect.
                  The &quot;Last updated&quot; date at the top of this document will
                  reflect the most recent revision.
                </p>
              </Section>

              <Section title="Contact">
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:privacy@kristenmartino.ai" className="link">
                    privacy@kristenmartino.ai
                  </a>
                </p>
                <p>
                  We aim to respond to all privacy inquiries within 7 business
                  days.
                </p>
              </Section>

              <hr className="border-[var(--color-graphite-90)]" />

              <Section title="Apple App Store Privacy Nutrition Label summary">
                <p>For Apple&apos;s required disclosure:</p>
                <ul>
                  <li>
                    <strong>Data Used to Track You:</strong> None
                  </li>
                  <li>
                    <strong>Data Linked to You:</strong> None
                  </li>
                  <li>
                    <strong>Data Not Linked to You:</strong> Device ID
                    (Firebase App Instance ID), Product Interaction (analytics
                    events), Crash Data, Performance Data
                  </li>
                </ul>
                <p>
                  The Device ID is per-install and resets when you uninstall.
                </p>
              </Section>

              <hr className="border-[var(--color-graphite-90)]" />

              <Section title="Source code">
                <p>
                  FocusForge is built in public. You can review the analytics
                  events we send (and confirm we don&apos;t send anything else)
                  here:
                </p>
                <ul>
                  <li>
                    App source:{" "}
                    <a
                      href="https://github.com/kristenmartino/focusforge"
                                         >
                      github.com/kristenmartino/focusforge
                    </a>
                  </li>
                  <li>
                    AI Coach engine (open source):{" "}
                    <a
                      href="https://github.com/kristenmartino/focusforge-coach-engine"
                                         >
                      github.com/kristenmartino/focusforge-coach-engine
                    </a>
                  </li>
                </ul>
                <p>
                  If you find something in the source that contradicts this
                  policy, that is a bug. Email{" "}
                  <a href="mailto:privacy@kristenmartino.ai" className="link">
                    privacy@kristenmartino.ai
                  </a>{" "}
                  and we will fix it.
                </p>
              </Section>
            </div>

            <div className="mt-20 pt-8 border-t border-[var(--color-graphite-90)] flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-graphite-40)]">
              <Link
                href="/focusforge/terms"
                className="hover:text-[var(--color-signal-blue-soft)] transition-colors"
              >
                Terms of Use →
              </Link>
              <a
                href="https://github.com/kristenmartino/focusforge"
                className="hover:text-[var(--color-signal-blue-soft)] transition-colors"
              >
                FocusForge on GitHub →
              </a>
              <Link
                href="/"
                className="hover:text-[var(--color-signal-blue-soft)] transition-colors"
              >
                Back to portfolio →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// MARK: - Section helpers

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="font-semibold text-[var(--color-bone)] mb-4"
        style={{
          fontSize: "var(--text-h3)",
          letterSpacing: "var(--tracking-snug)",
        }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed">{children}</div>
    </section>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-[var(--color-bone)] mb-3">
        {title}
      </h3>
      <div className="space-y-3 text-base leading-relaxed">{children}</div>
    </div>
  );
}
