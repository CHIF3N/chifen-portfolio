## Development

### Astro portfolio (root of repo)

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

### Admin Studio (studio/ subfolder)

The Next.js studio is a separate application in the `studio/` directory.

```
cd studio
npm install
npm run dev    # Starts on port 3001
```

It deploys as a separate Vercel project pointing to the `studio/` subdirectory.

Environment variables for the studio go in `studio/.env.local` (see `studio/.env.local.example`).

## Fanaka Copy Rules

All text on this site follows the Fanaka engineering profile principles (fanaka.pro):
- Eliminate subservient language. No "hoping to", "eager to learn", "passionate beginner".
- Be concrete. Every claim cites a technology, metric, or regional constraint.
- Effort vs. Value: separate *what was done* from *what it achieved*.
- Proof bar: every visible credential must be verifiable (PyCon 2026, MTN YaMo 3rd place, 387-respondent study).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
