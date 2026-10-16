# Project: Chifen Sama Nduma portfolio (Astro 7) + Admin Studio (Next.js 15)

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

## Fanaka principles (applied to all copy)

These come from fanaka.pro and govern every page on this site:

1. **Applicant, Not Supplicant** — eliminate passive, pleading language ("hoping to learn", "eager to assist"). Every sentence presents demonstrable value.
2. **Be Personal, Specific, Concrete** — no vague buzzwords. Ground every claim in a technology, protocol, metric, or regional constraint.
3. **Show the Parts** — detail internal mechanics (schema decisions, caching layers, API handlers) not just high-level claims.
4. **Effort vs. Value** — each experience or project item separates *what was done and with what tools* from *what it achieved in the real world*.
5. **Fitting In While Standing Out** — global baseline standards (sub-500ms, responsive, ATS-parseable CV) plus the real differentiator: clinical domain knowledge, African low-bandwidth resilience, community leadership.

## Where things are

- `src/content/work/` — project case studies
- `src/content/blog/` — posts
- `src/content/research/` — the BSc study
- `src/content.config.ts` — collection schemas
- `src/lib/site.ts` — contact details and nav, single source of truth
- `src/lib/firebase.ts` — Firebase client (Auth + Firestore) for blog engagement
- `src/lib/verify.ts` and `src/lib/remark-verify.mjs` — the VERIFY token system
- `src/pages/cv.astro` — public interactive CV with print-to-PDF
- `src/components/blog/BlogEngagement.astro` — likes + comments per blog post (Firebase)
- `scripts/collect-verify.mjs` — regenerates `VERIFY.md`, runs on every build
- `studio/` — Next.js 15 Admin AI CV Studio (separate Vercel project or monorepo)
- `studio/lib/masterCvData.ts` — single source of truth for AI CV tailoring
- `studio/app/api/admin/cv-tailor/route.ts` — Gemini API route (server-side, key never exposed)
- `studio/app/admin/cv/page.tsx` — protected Admin CV Studio UI

## Design system: "inside the CHIF3N mind" (Oct 2026 rebrand)

- Tokens, textures and component classes live in `src/styles/global.css`. Warm paper (`--paper`), ink, and four fill accents
  (`--lime`, `--cobalt`, `--orange`, `--lavender`). Fills are for folders, notes and highlights, never body text.
- Type: Clash Display (headlines, wordmark), General Sans (body), Caveat via `.hand` (short notes and labels only,
  never paragraphs or navigation), Instrument Serif italic via `.serif-i` (the odd emphasised word).
- Reusable pieces: `.paper`, `.lift`, `.sticky-note`, `.polaroid`, `.tape`, `.pin`, `.window` + `.window-bar`,
  `.folder` (+ `.folder-tab/back/sheet/front`), `.notebook`, `.grid-paper`, `.mark`, `.ink-link`, `.stamp`.
  Do not name a class `.sticky`: it collides with Tailwind's `sticky` utility.
- Component classes sit in `@layer components` so Tailwind utilities (`hidden`, `sm:inline-flex`) can override them.
- Tailwind's zinc/slate/cyan/purple/amber scales are remapped onto the paper palette in `@theme`, so older pages inherit the look.
- Components: `Wordmark.astro`, `StatusStamp.astro`, `CommandPalette.astro` (Ctrl/Cmd+K or "/").
- Motion: CSS only. `[data-reveal]` for scroll reveals, `.enter` / `.enter-drop` with `--d` for load staggers,
  `.draw` for self-drawing SVG strokes, cross-document View Transitions. Everything is off under reduced motion.
- `/experiments` is built from `storyData.ts` chapters and side-build entries in the work collection. No new facts there.
- The social image is `public/og/default.png` (1200x630). Regenerate it by hand if the brand changes.
- Paper effects: `.torn-top` / `.torn-bottom` (ripped edges), `.stack` (sheets underneath; not on elements with
  `overflow: hidden`, wrap them instead), `.creased` (fold lines). Margin doodles come from `Doodles.astro`
  (picked per page in `Base.astro`, shown only at 1380px+); inline marks use `Doodle.astro`. Both share `src/lib/doodles.ts`.
- Blog code: markdown fences are highlighted at build time by Shiki with the paper themes in `src/lib/shiki-paper.mjs`,
  then `CodeIDE.astro` adds the editor chrome (tabs, line numbers, copy, save, wrap, fold, status bar). Name a tab with
  ```ts title="file.ts". Multi-file examples use `CodeWorkbench.astro`. Shared styles: `src/styles/code-ide.css`.
- MDX strips two leading spaces from multi-line code inside component props, so `code:` templates in posts carry
  two extra spaces per line. Keep that when adding new CodeWorkbench files.
- Print: global print rules in `global.css` drop site chrome and force the light theme; `/cv` adds density rules.
- Comments: giscus (GitHub Discussions, "Announcements" category) in `BlogEngagement.astro`, themed by
  `public/giscus/paper-*.css`. Needs the giscus GitHub App installed on the repo.
- Analytics: Vercel Web Analytics script in `Base.astro` (Vercel deployment only). Enable it in the Vercel dashboard.
- Byte, the mascot (`Mascot.astro`), chats through `api/ask.js`, a Vercel Function grounded in `api/_knowledge.json`
  (regenerated by `scripts/build-knowledge.mjs` on every build; commit it). Keys live only in Vercel env vars.

## Commands

### Astro portfolio (root)
```
npm run dev          # Start dev server on port 3000
npm run build        # Collects VERIFY tokens, builds, indexes with pagefind
npm run preview
npm run verify       # Regenerate VERIFY.md without a full build
npm run new:post -- "Title of the post"
npm run new:project -- "Name of the project"
```

### Studio (studio/)
```
cd studio
npm install
npm run dev          # Next.js dev server on port 3001
npm run build
```

## Environment variables

Copy `.env.example` in the root to `.env` for local Astro development.
Copy `studio/.env.local.example` to `studio/.env.local` for the studio.

Required for blog engagement (Astro):
- `PUBLIC_FIREBASE_API_KEY`, `PUBLIC_FIREBASE_AUTH_DOMAIN`, `PUBLIC_FIREBASE_PROJECT_ID`
- `PUBLIC_FIREBASE_STORAGE_BUCKET`, `PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `PUBLIC_FIREBASE_APP_ID`

Required for Byte, the site assistant (set in Vercel → Settings → Environment Variables, never in code):
- `GROQ_API_KEY` (primary), `NVIDIA_API_KEY` (fallback); optional `GROQ_MODEL`, `NVIDIA_MODEL`

Required for Admin Studio (Next.js):
- Same Firebase vars but prefixed with `NEXT_PUBLIC_`
- `NEXT_PUBLIC_ADMIN_FIREBASE_UID` — Chifen's own Google UID (from Firebase Console after first sign-in)
- `GEMINI_API_KEY` — server-side only, **never** add NEXT_PUBLIC_ prefix

## Facts worth not getting wrong

These were checked against source documents and live sites. Do not let a draft
reintroduce the wrong version.

- Ayodah won the Silicon Mountain Challenge in **2022**, not 2023.
- The traction figures are **400+ registered donors** and **310 donations**, which are two different numbers. Three partner hospitals, five or more NGO partners.
- The LifeDrop **website** is live. The **WhatsApp bot is a working prototype**, not a deployed service. Never claim otherwise.
- Donors are never paid for blood. The coordination fee is paid by the requester and never reaches the donor.
- MORIA has **three core flows**, not six.
- The research is **387 respondents** from 419 distributed, a 92.4% response rate.
- CAMIHN and Health Tech for All Foundation are deliberately left off the **public** site. They may appear in the private Admin CV Studio's masterCvData if needed for specific applications.
- The abortion georegistry demo runs on **entirely synthetic data**. That must stay stated wherever it appears.
- Role at Kumba South: **District Data Manager AND PMTCT Head** — these are both held simultaneously, not sequential.
- LifeDrop MTN YaMo result: **third place** (not first, not second).
