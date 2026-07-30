# Project: Chifen Sama N. portfolio (Astro 7)

## Rules

- Content is markdown in `src/content/`. Adding work is adding a file. Never hardcode project or post data into a component.
- Never render a section that has no real content. Empty sections live in `CONTENT-BACKLOG.md`.
- Real, confirmed numbers only. No unverified figures, and no lorem in anything that ships.
- Any figure that is not confirmed goes in as `{{VERIFY: what the number is for}}`. It renders highlighted on the page and is collected into `VERIFY.md` on every build. Never quietly invent a plausible number instead.
- Zero JS by default. Add an interactive island only when there is no other way.
- Voice: no em-dashes, no forced triplets, varied rhythm, plain language, no filler AI vocabulary. It should read like him talking.
- Before marking a page done, load it at mobile and desktop and check it actually looks intentional.
- New posts default to `draft: true`.
- Case study spine: every project page in `src/content/work/` should work through Problem, Why it matters,
  My role, Stack, Challenges, Screenshots, Architecture, Outcome, Lessons learned, as `##` headings in that
  order. Use `{{VERIFY: ...}}` for any section with no real content yet (stack, screenshots, architecture are
  the ones most likely to be unconfirmed) rather than skipping the heading or inventing detail.
- Research entries in `src/content/research/` use a `kind` enum: Dissertation, Published article, Ongoing
  work, Conference presentation, Poster, Literature review. Optional `pdfUrl` and `abstractUrl` render as
  PDF/Abstract links on the card and the deep page; omit them rather than linking to something that doesn't
  exist yet.

## Where things are

- `src/content/work/` — project case studies
- `src/content/blog/` — posts
- `src/content/research/` — the BSc study
- `src/content.config.ts` — collection schemas
- `src/lib/site.ts` — contact details and nav, single source of truth
- `src/lib/verify.ts` and `src/lib/remark-verify.mjs` — the VERIFY token system
- `scripts/collect-verify.mjs` — regenerates `VERIFY.md`, runs on every build

## Commands

```
npm run dev
npm run build          # collects VERIFY tokens, builds, then indexes with pagefind
npm run preview
npm run verify         # regenerate VERIFY.md without a full build
npm run new:post -- "Title of the post"
npm run new:project -- "Name of the project"
```

## Facts worth not getting wrong

These were checked against source documents and live sites. Do not let a draft
reintroduce the wrong version.

- Ayodah won the Silicon Mountain Challenge in **2022**, not 2023.
- The traction figures are **400+ registered donors** and **310 donations**, which are two different numbers. Three partner hospitals, five or more NGO partners.
- The LifeDrop **website** is live. The **WhatsApp bot is a working prototype**, not a deployed service. Never claim otherwise.
- Donors are never paid for blood. The coordination fee is paid by the requester and never reaches the donor.
- MORIA has **three core flows**, not six.
- The research is **387 respondents** from 419 distributed, a 92.4% response rate.
- CAMIHN and Health Tech for All Foundation are deliberately left off the site.
- The abortion georegistry demo runs on **entirely synthetic data**. That must stay stated wherever it appears.
