# portfolio-v2

Personal portfolio site for Kristen Martino — **Strategy. Analytics. Applied AI.**

Live at **[kristenmartino.ai](https://kristenmartino.ai)**.

A single-page overview with longer-form case studies, built as a static-first Next.js
app. Content is data- and MDX-driven, so most updates are edits to `src/content/`
rather than to components.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router) with **React 19**
- **TypeScript** + **[Tailwind CSS 4](https://tailwindcss.com)**
- **[MDX](https://mdxjs.com)** for case studies (`@next/mdx`)
- **[Framer Motion](https://www.framer.com/motion/)** for animation
- **[IBM Plex](https://www.ibm.com/plex/)** (Sans + Mono) via `@fontsource`
- Deployed on **[Vercel](https://vercel.com)**

## Getting started

Requires **Node.js 20+**.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the local development server   |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Lint with ESLint                     |

## Project structure

```
src/
  app/          App Router pages, layout, and global styles
  components/   Reusable UI components
  content/      Site copy and case-study data (edit this for most updates)
    site.ts       Domain, tagline, nav, and contact links
    about.ts      About section
    expertise.ts  Capabilities section
    work.ts       Case-study index and metadata
    work/         Case studies authored in MDX
    insights/     Insights / writing
  hooks/        React hooks
  lib/          Shared types and utilities
public/         Static assets
```

## Authoring content

Each case study is a typed entry in [`src/content/work.ts`](src/content/work.ts) — its
`slug`, title, summary, metrics, and ordering — paired with a long-form
[`src/content/work/<slug>.mdx`](src/content/work/) body. The `/work/[slug]` route reads
the entry and dynamically imports the matching MDX by slug, so adding a case study means
adding an entry to `work.ts` and creating `src/content/work/<slug>.mdx` with the same slug.

Site-wide copy (tagline, navigation, contact links) lives in
[`src/content/site.ts`](src/content/site.ts).

> **Note:** This project tracks Next.js 16, whose App Router and config differ from
> earlier versions. See [`AGENTS.md`](AGENTS.md) before making framework-level changes.

## License

Personal project — all rights reserved. Not licensed for reuse.
