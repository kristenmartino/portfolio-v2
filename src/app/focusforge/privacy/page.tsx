import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Mono } from "@/components/typography/Mono";

export const metadata: Metadata = {
  title: "FocusForge — Privacy Policy",
  description:
    "How FocusForge stores local progress, sends Firebase analytics and crash diagnostics, and lets you turn product analytics off.",
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
                October 24, 2026
              </span>
            </div>

            {/* Summary */}
            <div className="mt-12 rounded-md border-l-2 border-[var(--color-signal-blue-soft)] bg-[var(--color-graphite-90)]/40 px-6 py-5">
              <Mono variant="label" tone="graphite">The short version</Mono>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-graphite-20)]">FocusForge stores task names and progress on your device, and its template-based coach runs locally. Firebase Analytics is enabled by default and receives usage events, including session durations and progression details. Firebase Crashlytics collects crash diagnostics and can include copies of those usage events. You can turn analytics off in Settings; crash reporting remains enabled.</p>
            </div>

            <div className="legal-content mt-16 space-y-12 text-[var(--color-graphite-20)]">
              <Section title="Who we are">
                <p>
                  FocusForge is built and operated by Kristen Martino, an independent developer.
                  For privacy questions or requests, email{" "}<a className="link"
                  href="mailto:privacy@kristenmartino.ai">privacy@kristenmartino.ai</a>.
                </p>
              </Section>
              <Section title="Local records and coaching">
                <p>
                  The app stores task names, session history, character and inventory state,
                  streaks, quests, timer settings, and coaching preferences locally using
                  SwiftData. It does not require an account.
                </p>
                <p>
                  The AI Coach selects from written templates on your device. It uses task
                  keywords and local signals such as completion rates, session length, and streak
                  risk. It does not send your task to a hosted language model.
                </p>
                <p>
                  The app’s custom analytics events send task-name length, not task-name text or
                  an edited coaching prompt. Some information about your activity is transmitted
                  as described below; local coaching does not make the entire app offline.
                </p>
              </Section>
              <Section title="Product analytics">
                <p>
                  Firebase Analytics, provided by Google, is{" "}<strong>on by
                  default</strong>. We use it to understand feature use, session completion, and
                  progression. The app sends events with the following kinds of information:
                </p>
                <ul>
                  <li>
                    <strong>Sessions:</strong>{" "}focus or break phase, planned duration in
                    seconds, actual duration for completed or abandoned sessions, completion
                    fraction for abandonment, and the character count of the trimmed task name.
                  </li>
                  <li>
                    <strong>Progression:</strong>{" "}XP and coins earned, streak days,
                    whether a level increased, skipped days, streak freezes used or remaining, and
                    milestone identifiers.
                  </li>
                  <li>
                    <strong>Cosmetics:</strong>{" "}item identifier, equipment slot, rarity,
                    and coin cost for purchases.
                  </li>
                  <li>
                    <strong>Coaching:</strong>{" "}prompt type, template identifier or
                    reflection category, whether a suggestion was accepted, edited, or dismissed,
                    reflection feedback, and streak days for rescue nudges. Editing is recorded as a
                    flag; the edited text is not included.
                  </li>
                </ul>
                <p>
                  These are event-level records, not just aggregate counts. Google Analytics also
                  collects SDK-generated information such as app-instance identifiers, device and
                  app information, session statistics, and approximate location. On iOS, its SDK
                  can use the vendor identifier when an advertising identifier is unavailable.
                  See{" "}<a className="link"
                  href="https://support.google.com/analytics/answer/11593727?hl=en">Google’s
                  Analytics data-collection documentation</a>.
                </p>
                <p>
                  Installation and device identifiers can connect activity across sessions. We do
                  not treat this data as fully anonymous simply because the app does not ask for
                  your name or email address.
                </p>
              </Section>
              <Section title="Crash reporting and event logs">
                <p>
                  Firebase Crashlytics collects crash reports automatically. Reports can contain
                  stack traces, app and operating-system versions, device information,
                  installation identifiers, and diagnostic logs. We use these reports to
                  investigate and fix failures.
                </p>
                <p>
                  While analytics is enabled, the app also copies each custom analytics event name
                  and its full parameter dictionary into a Crashlytics log. This means crash
                  reports can include the session durations, reward and streak details, cosmetic
                  identifiers, and coaching interaction metadata listed above. These logs are not
                  limited to screen names.
                </p>
                <p>
                  Turning analytics off blocks new custom events through the app’s analytics
                  wrapper, including these copies into Crashlytics logs.{" "}<strong>It
                  does not disable Crashlytics itself</strong>, erase logs already recorded, or
                  delete data already sent. Crash reports may be stored on the device and uploaded
                  on a later launch. See{" "}<a className="link"
                  href="https://firebase.google.com/docs/crashlytics/ios/customize-crash-reports">Firebase’s
                  crash-reporting documentation</a>.
                </p>
              </Section>
              <Section title="Your analytics control">
                <p>
                  Open{" "}<strong>Settings → Privacy → Send anonymous
                  analytics</strong>{" "}and turn the toggle off. This is the control’s
                  current label; the events use the identifiers described above.
                </p>
                <p>
                  The preference is saved on the device. The app checks it before forwarding
                  custom events and user properties, and applies it to Firebase Analytics
                  collection at launch and when you change the setting.
                </p>
                <p>
                  <strong>There is currently no in-app switch to disable crash
                  reporting.</strong>{" "}iOS advertising or tracking settings are not a
                  control for FocusForge’s Crashlytics collection. Turning analytics off does not
                  remove the app’s other features.
                </p>
              </Section>
              <Section title="Exports and local deletion">
                <p>
                  <strong>Settings → Export My Progress</strong>{" "}creates a JSON file
                  containing local progress, including task names and session history, character
                  and inventory state, unlocks, quests, coaching preferences, and timer settings.
                  It is not an export of Firebase Analytics or Crashlytics records.
                </p>
                <p>
                  If you save or share that file through Files, email, AirDrop, or another
                  destination, its contents leave the app at your direction. Your chosen service
                  and device backup settings may retain copies.
                </p>
                <p>
                  Deleting the app removes its local app data from the device. It does not delete
                  separately saved exports, device or cloud backups, or information already sent
                  to Google. Uninstalling is not a request to delete server-side analytics or
                  crash reports.
                </p>
              </Section>
              <Section title="Service providers and storage">
                <p>
                  Analytics and crash diagnostics are sent to Google’s Firebase and Google
                  Analytics services. Google may process data outside your country, including in
                  the United States. Processing is governed by the applicable Google service and
                  data-processing terms; this policy does not promise a particular storage region.
                </p>
                <p>
                  We use these integrations for product analytics and crash diagnosis. We do not
                  sell your data or use it to serve advertisements in FocusForge.
                  See{" "}<a className="link"
                  href="https://firebase.google.com/support/privacy">Firebase’s privacy and
                  security information</a>{" "}for provider details.
                </p>
              </Section>
              <Section title="Retention">
                <p>
                  Local records remain on the device until the app’s data is removed. Exports and
                  backups have their own lifetimes in the destinations you choose.
                </p>
                <p>
                  Firebase states that Crashlytics retains crash traces and associated
                  installation identifiers for 90 days before beginning removal from live and
                  backup systems.
                </p>
                <p>
                  Google Analytics retention depends on the property’s configured retention
                  controls. Standard aggregate reports are not covered by the same event-level
                  retention limit and may remain longer. Contact us for the current retention
                  period, or read{" "}<a className="link"
                  href="https://support.google.com/analytics/answer/7667196?hl=en">Google’s
                  retention documentation</a>.
                </p>
              </Section>
              <Section title="Privacy requests">
                <p>
                  You can contact{" "}<a className="link"
                  href="mailto:privacy@kristenmartino.ai">privacy@kristenmartino.ai</a>{" "}to
                  ask about access, correction, deletion, or other privacy rights available where
                  you live. We aim to respond within 7 business days.
                </p>
                <p>
                  We may need information to identify the relevant installation or records before
                  handling a request. The app has no account or built-in screen for viewing
                  Firebase identifiers, so an email address alone may not identify your analytics
                  or crash records. Please do not send task contents or exported progress unless
                  needed for your request.
                </p>
              </Section>
              <Section title="Children">
                <p>
                  FocusForge is not intended for children under 13. If you believe a child under
                  13 has provided personal information through the app, contact{" "}<a
                  className="link"
                  href="mailto:privacy@kristenmartino.ai">privacy@kristenmartino.ai</a>{" "}so
                  we can investigate and address the request.
                </p>
              </Section>
              <Section title="Changes to this policy">
                <p>
                  We will update this page and its last-updated date when the policy changes.
                  Material changes will be announced on this page and in the app’s Settings →
                  About screen at least 30 days before taking effect.
                </p>
              </Section>
              <Section title="Source code">
                <p>
                  The event names, payloads, and collection controls can be reviewed in the app
                  source:
                </p>
                <ul>
                  <li>
                    <a className="link"
                    href="https://github.com/kristenmartino/focusforge/blob/main/app/FocusForge/Services/AnalyticsService.swift">Analytics
                    preference and event wrapper</a>
                  </li>
                  <li>
                    <a className="link"
                    href="https://github.com/kristenmartino/focusforge/blob/main/app/FocusForge/Services/SessionLogger.swift">Session
                    event payloads</a>
                  </li>
                  <li>
                    <a className="link"
                    href="https://github.com/kristenmartino/focusforge/blob/main/app/FocusForge/Services/FirebaseAnalyticsBackend.swift">Firebase
                    events and Crashlytics logs</a>
                  </li>
                  <li>
                    <a className="link" href="https://github.com/kristenmartino/focusforge">Full app
                    source</a>
                  </li>
                  <li>
                    <a className="link"
                    href="https://github.com/kristenmartino/focusforge-coach-engine">On-device coach
                    engine</a>
                  </li>
                </ul>
                <p>
                  The source shows app-defined events; Google’s SDKs also collect the service data
                  described above. If you find a mismatch, please contact{" "}<a
                  className="link"
                  href="mailto:privacy@kristenmartino.ai">privacy@kristenmartino.ai</a>.
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
