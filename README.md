# Chifen Portfolio Monorepo

Two applications in one repository:

| App | Directory | Framework | Deploys to |
|-----|-----------|-----------|------------|
| Portfolio | `/` (root) | Astro 7 | Vercel — `chifen.is-a.dev` |
| Admin Studio | `/studio` | Next.js 15 App Router | Vercel — private URL |

---

## Quick start

### Portfolio (Astro)

```bash
# In the repo root
npm install
npm run dev        # http://127.0.0.1:3000
npm run build      # Production build + pagefind index
npm run preview
```

### Admin Studio (Next.js)

```bash
cd studio
npm install
cp .env.local.example .env.local  # Fill in your values
npm run dev        # http://localhost:3001
```

---

## Environment variables

### Portfolio (root — `.env`)

| Variable | Used by |
|----------|---------|
| `PUBLIC_FIREBASE_API_KEY` | Blog likes + comments |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | Blog likes + comments |
| `PUBLIC_FIREBASE_PROJECT_ID` | Blog likes + comments |
| `PUBLIC_FIREBASE_STORAGE_BUCKET` | Blog likes + comments |
| `PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Blog likes + comments |
| `PUBLIC_FIREBASE_APP_ID` | Blog likes + comments |

The blog engagement feature gracefully disables itself if these variables are not set. Nothing breaks in production without them.

### Admin Studio (`studio/.env.local`)

| Variable | Used by | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Auth guard | |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth guard | |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Auth guard | |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Auth guard | |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Auth guard | |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Auth guard | |
| `NEXT_PUBLIC_ADMIN_FIREBASE_UID` | Access control | Get from Firebase Console → Authentication → Users after first sign-in |
| `GEMINI_API_KEY` | Gemini API route | **Server-side only** — never add `NEXT_PUBLIC_` prefix |

---

## Firebase setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → **Google** sign-in provider
3. Enable **Firestore Database** in production mode
4. Copy the config from **Project Settings → Your apps → SDK setup**
5. Add the variables to Vercel's environment variable settings

### Firestore security rules (blog engagement)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts: likes are public reads, public writes (rate-limit in app logic)
    match /posts/{postId} {
      allow read: if true;
      allow write: if true;  // Tighten in production if spam becomes an issue

      // Comments: public reads, public creates (no updates/deletes for commenters)
      match /comments/{commentId} {
        allow read: if true;
        allow create: if request.resource.data.name is string
                      && request.resource.data.body is string
                      && request.resource.data.body.size() <= 1000;
        allow update, delete: if false;
      }
    }
  }
}
```

---

## Vercel monorepo deployment

To deploy both apps from the same repository:

**Portfolio project:**
- Root Directory: `.` (leave empty)
- Framework: Astro
- Build Command: `node scripts/collect-verify.mjs && astro build && pagefind --site dist`
- Output Directory: `dist`

**Studio project (separate Vercel project):**
- Root Directory: `studio`
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

Set environment variables for each project separately in Vercel's dashboard.

---

## Architecture overview

```
chifen-portfolio/
├── src/                          # Astro source
│   ├── components/
│   │   └── blog/
│   │       ├── BlogEngagement.astro   # ← NEW: Firebase likes + comments
│   │       └── DonorMatchSimulator.astro
│   ├── lib/
│   │   ├── firebase.ts               # ← NEW: Firebase client init
│   │   └── site.ts                   # Updated: full name, CV in nav
│   └── pages/
│       ├── index.astro               # Updated: experience unlocked, Fanaka chips
│       ├── about.astro               # Updated: Three-Pillar Fanaka narrative
│       └── cv.astro                  # ← NEW: Public interactive CV
├── studio/                       # Next.js 15 Admin Studio
│   ├── app/
│   │   ├── admin/cv/page.tsx         # Protected Admin AI CV Studio
│   │   └── api/admin/cv-tailor/
│   │       └── route.ts              # Gemini server-side API route
│   ├── components/
│   │   ├── AuthGuard.tsx             # Firebase Google sign-in guard
│   │   └── CvStudioClient.tsx        # Split-panel CV tailoring UI
│   └── lib/
│       ├── firebase.ts               # Studio Firebase auth
│       └── masterCvData.ts           # Single source of truth for AI tailoring
└── CLAUDE.md                     # Updated: Fanaka rules + full env docs
```
