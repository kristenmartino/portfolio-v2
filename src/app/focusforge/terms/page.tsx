import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Mono } from "@/components/typography/Mono";

export const metadata: Metadata = {
  title: "FocusForge — Terms of Use",
  description:
    "FocusForge's terms of use. Personal use license, honest limits on what the app does, fair liability terms. Built solo by Kristen Martino.",
  robots: { index: true, follow: true },
};

export default function FocusForgeTermsOfUse() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="bg-[var(--color-soot)] min-h-[100svh] pt-32 md:pt-40 pb-20 md:pb-28"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <Mono variant="label" tone="muted">
              FocusForge · Terms
            </Mono>
            <h1
              className="mt-6 font-semibold text-[var(--color-bone)]"
              style={{
                fontSize: "var(--text-h1)",
                letterSpacing: "var(--tracking-display)",
                lineHeight: "var(--leading-tight)",
              }}
            >
              Terms of Use
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

            <div className="mt-12 rounded-md border-l-2 border-[var(--color-signal-blue-soft)] bg-[var(--color-graphite-90)]/40 px-6 py-5">
              <Mono variant="label" tone="graphite">
                The short version
              </Mono>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-graphite-20)]">
                You can use FocusForge to do your work. We make no warranty
                that the app is perfect or that your data is invulnerable —
                back up via <strong>Settings → Export My Progress</strong> if
                losing your streak would actually upset you. Don&apos;t try to
                break the app for fun. If you do something illegal with the
                app, that&apos;s between you and the law. If FocusForge genuinely
                harms you, our liability is capped at what you paid for the
                app (currently $0).
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-graphite-40)]">
                The long version follows. If anything is unclear, email{" "}
                <a
                  href="mailto:legal@kristenmartino.ai"
                  className="text-[var(--color-signal-blue-soft)] underline-offset-4 hover:underline"
                >
                  legal@kristenmartino.ai
                </a>{" "}
                before agreeing.
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-bone)]">
                <strong>
                  By installing or using FocusForge, you agree to these Terms.
                  If you don&apos;t, uninstall the app.
                </strong>
              </p>
            </div>

            <div className="legal-content mt-16 space-y-12 text-[var(--color-graphite-20)]">
              <Section title="1. Who these terms are between">
                <p>
                  These Terms of Use are an agreement between you (the person
                  using FocusForge) and Kristen Martino, an independent
                  developer based in the United States, operating FocusForge
                  as a solo project. Throughout this document we say
                  &quot;we&quot; / &quot;us&quot; / &quot;our&quot; to mean Kristen Martino.
                </p>
                <p>
                  Contact:{" "}
                  <a href="mailto:legal@kristenmartino.ai">
                    legal@kristenmartino.ai
                  </a>
                </p>
              </Section>

              <Section title="2. License to use the app">
                <p>
                  We grant you a personal, non-exclusive, non-transferable,
                  revocable license to download and use FocusForge on iOS
                  devices you own or control, for your personal,
                  non-commercial use.
                </p>
                <p>You may not:</p>
                <ul>
                  <li>
                    Copy, modify, or create derivative works of the compiled
                    app
                  </li>
                  <li>
                    Reverse-engineer, decompile, or disassemble the app,
                    except to the extent this restriction is unenforceable
                    under your local law (for EU users: yes, you have the
                    rights granted by Directive 2009/24/EC)
                  </li>
                  <li>Sell, sublicense, rent, lease, or redistribute the app</li>
                  <li>
                    Use the app to facilitate illegal activity, harass others,
                    or violate anyone else&apos;s rights
                  </li>
                  <li>
                    Bypass, disable, or otherwise interfere with security or
                    authentication features of the app or iOS
                  </li>
                </ul>
                <p>
                  Note that the <strong>AI Coach engine</strong> is a
                  separately-licensed open-source component under the MIT
                  License. You can use it however that license allows — see{" "}
                  <a href="https://github.com/kristenmartino/focusforge-coach-engine">
                    github.com/kristenmartino/focusforge-coach-engine
                  </a>
                  . These Terms govern your use of the compiled FocusForge
                  iPhone app itself.
                </p>
              </Section>

              <Section title="3. Your data and content">
                <p>
                  You own everything you input into the app: your task names,
                  your character customizations, your streak history, your AI
                  Coach feedback. The app stores all of this on your device.
                  You can export a complete JSON snapshot at any time via{" "}
                  <strong>Settings → Export My Progress</strong>.
                </p>
                <p>
                  How we handle the small amount of data that does leave the
                  device (crash reports, anonymous analytics) is described in
                  detail in our <Link href="/focusforge/privacy">Privacy Policy</Link>. Read it.
                </p>
                <p>
                  We make no promises about preserving your local data. If
                  your phone is damaged, lost, stolen, restored from a
                  backup, or wiped, your FocusForge data may be lost. Cloud
                  sync is planned for v1.1 but is not in v1.0.{" "}
                  <strong>
                    Back up via the export feature if your streak or character
                    matters to you.
                  </strong>
                </p>
              </Section>

              <Section title="4. Honest limits on what FocusForge does">
                <p>
                  FocusForge is a focus timer and gamified habit tool. It is
                  not:
                </p>
                <ul>
                  <li>
                    A medical device. It does not diagnose, treat, or prevent
                    any condition, including attention-related conditions.
                  </li>
                  <li>
                    A productivity guarantee. We make no claim that using
                    FocusForge will cause you to get more done. (Spoiler:
                    actually doing the work is the thing that gets the work
                    done.)
                  </li>
                  <li>
                    Therapeutic advice. The AI Coach&apos;s templates are
                    encouragement, not guidance from a mental-health
                    professional.
                  </li>
                  <li>
                    A safe space for sensitive information. The task names
                    you enter are stored locally but are not encrypted at
                    rest beyond iOS&apos;s standard device encryption.
                  </li>
                </ul>
                <p>
                  If you are dealing with attention, focus, or mental-health
                  issues that are causing you serious problems, please talk
                  to a qualified professional. FocusForge is a tool, not a
                  substitute for care.
                </p>
              </Section>

              <Section title="5. The AI Coach">
                <p>
                  The &quot;AI Coach&quot; inside FocusForge is a hand-written catalog
                  of templates routed by your local behavior. It is not a
                  language model, it does not generate text dynamically, and
                  it does not learn from you. It will surface one of a fixed
                  set of pre-written sentences based on your task category
                  and recent session pattern.
                </p>
                <p>
                  The coach&apos;s suggestions are general. They may not apply to
                  your specific situation, your specific job, or your specific
                  day. Use your judgment. Skip any suggestion that doesn&apos;t
                  fit.
                </p>
              </Section>

              <Section title="6. Streaks, milestones, and cosmetics">
                <p>
                  The streaks, XP, coins, level system, and cosmetic items in
                  FocusForge exist purely for personal motivation. They have
                  no monetary value. They are not redeemable, transferable,
                  or exchangeable for anything in the real world.
                </p>
                <p>
                  Streak freezes are earned automatically at milestone days
                  (3, 7, 14, 30, 60). If you miss a day, an available freeze
                  is consumed automatically to protect your streak. We do not
                  sell streak freezes. We do not sell cosmetics. v1.0 has no
                  in-app purchases of any kind.
                </p>
                <p>
                  A future version may introduce an optional subscription
                  called <strong>FocusForge+</strong>. If we add it, the
                  terms will be updated and you will be notified before any
                  payment can occur. The current v1.0 will remain free.
                </p>
              </Section>

              <Section title="7. Updates and changes to the app">
                <p>
                  We may release updates to FocusForge at any time. Updates
                  may add, change, or remove features. We do not guarantee
                  that any specific feature will continue to exist in future
                  versions.
                </p>
                <p>
                  For material changes to features that affect your data
                  (e.g. changes to how export works, or to streak
                  calculations), we will note the change in the in-app{" "}
                  <strong>Settings → About</strong> screen.
                </p>
              </Section>

              <Section title="8. Service availability">
                <p>
                  FocusForge is provided &quot;as is&quot; and &quot;as available.&quot; We make
                  no promises about uptime, since the app runs entirely on
                  your device and does not depend on a backend service.
                  However:
                </p>
                <ul>
                  <li>
                    The Firebase services we use for crash reporting and
                    analytics may occasionally be unavailable. The app should
                    continue to function normally when this happens.
                  </li>
                  <li>
                    Apple&apos;s App Store may sometimes prevent new downloads or
                    updates. This is outside our control.
                  </li>
                </ul>
              </Section>

              <Section title="9. Disclaimer of warranties">
                <p>
                  EXCEPT WHERE LIMITED BY APPLICABLE CONSUMER PROTECTION LAW,
                  FOCUSFORGE IS PROVIDED WITHOUT WARRANTY OF ANY KIND,
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  We do not warrant that the app will be uninterrupted,
                  error-free, or free from harmful components. We do not
                  warrant that any specific result will be achieved through
                  use of the app.
                </p>
                <p>
                  For users in the European Union, United Kingdom, Australia,
                  or other jurisdictions with non-waivable consumer protection
                  laws: nothing in these Terms is intended to exclude,
                  restrict, or modify rights you have under those laws that
                  cannot be excluded.
                </p>
              </Section>

              <Section title="10. Limitation of liability">
                <p>
                  To the maximum extent permitted by applicable law, our total
                  liability to you arising out of or related to your use of
                  FocusForge is limited to the greater of:
                </p>
                <p>
                  (a) the amount you paid us for the app in the twelve months
                  preceding the claim (currently $0 for v1.0); or
                  <br />
                  (b) ten US dollars (USD 10.00).
                </p>
                <p>
                  We are not liable for indirect, incidental, consequential,
                  special, exemplary, or punitive damages, including loss of
                  profits, lost streaks, lost focus minutes, missed deadlines,
                  lost data, or reputational harm, even if we have been
                  advised of the possibility of such damages.
                </p>
                <p>
                  Some jurisdictions don&apos;t allow these limitations, in which
                  case they apply to the maximum extent permitted by your
                  local law.
                </p>
              </Section>

              <Section title="11. Indemnification">
                <p>
                  You agree to indemnify and hold harmless Kristen Martino
                  against any claims, liabilities, damages, losses, and
                  expenses (including legal fees) arising from:
                </p>
                <ul>
                  <li>Your violation of these Terms</li>
                  <li>
                    Your violation of any third-party right, including any
                    copyright, property, or privacy right
                  </li>
                  <li>
                    Your use of the app in a way that violates applicable law
                  </li>
                </ul>
              </Section>

              <Section title="12. Termination">
                <p>
                  You can stop using the app at any time by uninstalling it.
                </p>
                <p>
                  We can terminate your license to use the app at any time,
                  with or without cause, by notice through the App Store or
                  via{" "}
                  <a href="mailto:legal@kristenmartino.ai">
                    legal@kristenmartino.ai
                  </a>
                  . If we terminate your license, you must stop using the
                  app and may delete it.
                </p>
                <p>
                  Provisions of these Terms that by their nature should
                  survive termination — including disclaimers, limitations of
                  liability, indemnification, and dispute resolution — will
                  survive.
                </p>
              </Section>

              <Section title="13. Governing law and disputes">
                <p>
                  These Terms are governed by the laws of the{" "}
                  <strong>State of Florida, United States</strong>, without
                  regard to its conflict of laws principles.
                </p>
                <p>
                  Any dispute arising out of or related to these Terms or
                  your use of FocusForge will be resolved through binding
                  arbitration administered by JAMS under its Streamlined
                  Arbitration Rules. The arbitration will take place in{" "}
                  <strong>Palm Beach County, Florida</strong>, or by
                  videoconference if you prefer. You and we both waive the
                  right to a jury trial and the right to participate in any
                  class action.
                </p>
                <p>
                  <strong>Exception for small claims:</strong> Either party
                  may bring an individual action in small claims court for
                  disputes within that court&apos;s jurisdiction.
                </p>
                <p>
                  <strong>Exception for EU consumers:</strong> Notwithstanding
                  the above, if you are a consumer in the European Union or
                  United Kingdom, you may bring proceedings in the courts of
                  your country of residence, and the mandatory consumer
                  protections of that country apply.
                </p>
              </Section>

              <Section title="14. Apple-specific terms">
                <p>
                  These additional terms apply because FocusForge is
                  distributed through Apple&apos;s App Store and are required by
                  Apple&apos;s developer agreement:
                </p>
                <ul>
                  <li>
                    These Terms are between you and Kristen Martino, not
                    between you and Apple. Apple is not responsible for the
                    app or its content.
                  </li>
                  <li>
                    Apple has no obligation to provide maintenance or support
                    for the app.
                  </li>
                  <li>
                    In the event of any failure of the app to conform to any
                    applicable warranty, you may notify Apple, and Apple will
                    refund the purchase price (if any) for the app. To the
                    maximum extent permitted by law, Apple has no other
                    warranty obligation with respect to the app.
                  </li>
                  <li>
                    Apple is a third-party beneficiary of these Terms and may
                    enforce them against you.
                  </li>
                </ul>
              </Section>

              <Section title="15. Changes to these Terms">
                <p>
                  We may update these Terms from time to time. Material
                  changes will be announced in the app&apos;s{" "}
                  <strong>Settings → About</strong> screen and via a notice
                  on this page at least 30 days before they take effect. The
                  &quot;Last updated&quot; date at the top of this document reflects
                  the most recent revision.
                </p>
                <p>
                  If you don&apos;t agree to updated Terms, your option is to
                  stop using the app.
                </p>
              </Section>

              <Section title="16. Miscellaneous">
                <ul>
                  <li>
                    <strong>Entire agreement.</strong> These Terms plus our{" "}
                    <Link href="/focusforge/privacy">Privacy Policy</Link> are
                    the entire agreement between you and us regarding the app.
                    They supersede any prior agreements.
                  </li>
                  <li>
                    <strong>Severability.</strong> If any provision is found
                    unenforceable, the rest remains in effect.
                  </li>
                  <li>
                    <strong>No waiver.</strong> Our failure to enforce any
                    right is not a waiver of that right.
                  </li>
                  <li>
                    <strong>Assignment.</strong> You may not assign these
                    Terms. We may assign them to a successor in connection
                    with a sale of the project.
                  </li>
                  <li>
                    <strong>No agency.</strong> No partnership, agency, or
                    employment relationship is created by these Terms.
                  </li>
                </ul>
              </Section>

              <Section title="Contact">
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:legal@kristenmartino.ai">
                    legal@kristenmartino.ai
                  </a>
                </p>
                <p>
                  We aim to respond to all legal inquiries within 7 business
                  days.
                </p>
              </Section>
            </div>

            <div className="mt-20 pt-8 border-t border-[var(--color-graphite-90)] flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-graphite-40)]">
              <Link
                href="/focusforge/privacy"
                className="hover:text-[var(--color-signal-blue-soft)] transition-colors"
              >
                ← Privacy Policy
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
