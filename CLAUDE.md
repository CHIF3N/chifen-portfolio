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
