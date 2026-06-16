// Capture real product screenshots of the live project sites for the Work
// hover-preview tooltips (src/components/work/ProjectPreview.tsx). Frames are
// captured at an exact 4:3 viewport so `object-cover` does no destructive crop,
// matching the existing public/work/tenancy.png (1280x960).
//
// Usage:
//   npm run shots                 # capture every site below
//   npm run shots -- --only sift  # capture one site (repeatable: --only a --only b)
//   npm run shots -- --headed     # watch the browser while tuning selectors
//
// Output: public/work/{slug}.png  (1280x960 PNG)

import { chromium } from "playwright";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "work");

// 4:3 capture box. deviceScaleFactor:2 captures at 2560x1920 then downsamples
// to 1280x960 — crisper on retina than a native 1x grab.
const WIDTH = 1280;
const HEIGHT = 960;
const SCALE = 2;

// One entry per live site that still needs a tooltip image. Selectors are
// best-effort: a miss logs a warning and falls back to generic readiness, so a
// site redesign degrades gracefully instead of throwing.
const SITES = [
  {
    slug: "valuate",
    url: "https://valuate.kristenmartino.ai",
    // Landing = grid of ~18 ticker cards. Distinctive and reliably rendered;
    // the ~15s Monte Carlo result is opt-in via prep() if a richer frame is wanted.
    settleMs: 2500,
  },
  {
    slug: "eval-harness",
    url: "https://evals.kristenmartino.ai",
    settleMs: 1500,
  },
  {
    slug: "gridpulse",
    url: "https://gridpulse.kristenmartino.ai",
    // Client-rendered: first paint is just "Loading…". Wait for real content.
    minTextLen: 300,
    settleMs: 3000,
  },
  {
    slug: "tarazu",
    url: "https://prioritize.kristenmartino.ai",
    // App is behind /sign-in (no creds) — capture the public marketing page only.
    settleMs: 1800,
  },
  {
    slug: "sift",
    url: "https://siftnews.kristenmartino.ai",
    settleMs: 1800,
  },
  {
    slug: "gtm-healthcare",
    url: "https://gtm.kristenmartino.ai",
    settleMs: 2000,
  },
];

function parseArgs(argv) {
  const only = [];
  let headed = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--headed") headed = true;
    else if (a === "--only") only.push(argv[++i]);
    else if (a.startsWith("--only=")) only.push(a.slice("--only=".length));
  }
  return { only, headed };
}

// Wait until the SPA has mounted real content (not just a loading shell).
async function waitForContent(page, { minTextLen = 200, timeout = 45000 } = {}) {
  await page
    .waitForFunction(
      (min) => {
        const text = document.body?.innerText?.trim().length ?? 0;
        const hasViz = !!document.querySelector("canvas, svg, table, main img");
        return text > min || hasViz;
      },
      minTextLen,
      { timeout },
    )
    .catch(() => {
      console.warn("    ! content-readiness wait timed out; capturing anyway");
    });
}

// Best-effort dismissal of cookie/consent/intro overlays. No-op when absent.
async function dismissOverlays(page) {
  const labels = /^(accept|accept all|agree|i agree|got it|dismiss|close|ok|okay|continue)$/i;
  try {
    const btn = page.getByRole("button", { name: labels });
    if (await btn.first().isVisible({ timeout: 1200 }).catch(() => false)) {
      await btn.first().click({ timeout: 1200 }).catch(() => {});
    }
  } catch {
    /* ignore */
  }
}

// Trigger lazy-loaded media, then return to the top for a clean hero frame.
async function nudgeLazyMedia(page) {
  await page
    .evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 350));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 150));
    })
    .catch(() => {});
}

async function captureSite(context, site) {
  const page = await context.newPage();
  try {
    console.log(`[${site.slug}] → ${site.url}`);
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 60000 }).catch(async (e) => {
      console.warn(`    ! networkidle timed out (${e.message}); falling back to 'load'`);
      await page.goto(site.url, { waitUntil: "load", timeout: 60000 });
    });

    if (site.readySelector) {
      await page
        .waitForSelector(site.readySelector, { state: "visible", timeout: 30000 })
        .catch(() => console.warn(`    ! readySelector '${site.readySelector}' not found`));
    }
    await waitForContent(page, { minTextLen: site.minTextLen, timeout: 45000 });
    await dismissOverlays(page);

    if (typeof site.prep === "function") {
      await site.prep(page).catch((e) => console.warn(`    ! prep() failed: ${e.message}`));
    }

    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await nudgeLazyMedia(page);
    await page.waitForTimeout(site.settleMs ?? 1500);

    // Either a targeted element/clip (resized cover→4:3) or the 4:3 viewport.
    let raw;
    if (site.selector) {
      raw = await page.locator(site.selector).first().screenshot({ type: "png" });
    } else {
      raw = await page.screenshot({ type: "png", fullPage: false, clip: site.clip });
    }

    const out = join(OUT_DIR, `${site.slug}.png`);
    await sharp(raw)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: site.position ?? "top" })
      .png({ compressionLevel: 9 })
      .toFile(out);

    console.log(`    ✓ wrote public/work/${site.slug}.png`);
    return { slug: site.slug, ok: true };
  } catch (e) {
    console.error(`    ✗ ${site.slug} failed: ${e.message}`);
    return { slug: site.slug, ok: false, error: e.message };
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  const { only, headed } = parseArgs(process.argv.slice(2));
  const sites = only.length ? SITES.filter((s) => only.includes(s.slug)) : SITES;
  if (!sites.length) {
    console.error(`No sites matched --only ${only.join(", ")}. Known: ${SITES.map((s) => s.slug).join(", ")}`);
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: !headed });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });

  const results = [];
  for (const site of sites) {
    results.push(await captureSite(context, site));
  }

  await context.close();
  await browser.close();

  const ok = results.filter((r) => r.ok).map((r) => r.slug);
  const failed = results.filter((r) => !r.ok);
  console.log(`\nDone. ${ok.length}/${results.length} captured: ${ok.join(", ") || "none"}`);
  if (failed.length) {
    console.log(`Failed: ${failed.map((f) => `${f.slug} (${f.error})`).join("; ")}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
