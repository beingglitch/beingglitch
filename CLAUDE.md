# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Suraj Shukla, built on the [Once UI](https://once-ui.com) "Magic Portfolio" template. Next.js 16 App Router + React 19, TypeScript, SCSS modules, MDX content. Deployed on Vercel.

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run start        # serve production build
npm run lint         # biome check .
npm run biome-write  # format everything with Biome
```

Biome is the only formatter/linter (ESLint was removed) for source files: 2-space indent, double quotes, 100-char lines. `lint-staged` runs `biome check --write` + `biome format --write` on staged JS/TS/JSON.

There is no test suite.

## Architecture

### Content and config live in `src/resources/`, not in components
This is the key thing to understand. Almost all site text, structure, and behavior is data:

- `src/resources/content.tsx` — the person, social links, newsletter, and the page-level content objects (`home`, `about`, `blog`, `work`, `gallery`). Contains JSX, hence `.tsx`.
- `src/resources/once-ui.config.ts` — `baseURL` (used for SEO/schema/OG), `routes` (per-route on/off toggles), `protectedRoutes` (password gating), `display` flags, fonts, `style`/`effects`/`dataStyle` theme tokens, `schema`/`sameAs`/`socialSharing`.
- `src/resources/index.ts` — the single barrel both files are consumed through; import from `@/resources`.
- `src/types/` (`config.types.ts`, `content.types.ts`) types every one of those objects. When adding a config field, add it to the type first.

Editing site copy or toggling a section usually means touching `src/resources/`, **not** the page components.

### Routing and gating
`src/components/RouteGuard.tsx` wraps all children in `app/layout.tsx`. It is client-side: it checks `routes` (rendering `NotFound` for disabled routes, matching `/blog` and `/work` as dynamic prefixes) and `protectedRoutes` (rendering a password prompt). Password flow is `POST /api/authenticate` → validates against `PAGE_ACCESS_PASSWORD` → sets an httpOnly `authToken` cookie (1h); `GET /api/check-auth` verifies it. This is presentation-level gating only — MDX under a protected route is still statically built and reachable.

### MDX content
Posts live as `.mdx` files colocated with their route: `src/app/blog/posts/*.mdx` and `src/app/work/projects/*.mdx`. `src/utils/utils.ts` reads those directories with `fs` + `gray-matter` at build time and returns `{ metadata, slug, content }`; frontmatter keys are fixed by the `Metadata` type there (`title`, `subtitle`, `publishedAt`, `summary`, `image`, `images`, `tag`, `team`, `link`). `next.config.mjs` sets `pageExtensions` to include `md`/`mdx`. `src/components/mdx.tsx` maps MDX elements onto Once UI components (headings get anchor links via `HeadingLink`). Adding a post = adding a file; no index to update.

### UI layer
`@once-ui-system/core` supplies the layout/design primitives (`Column`, `Row`, `Flex`, `Heading`, `Meta`, `Schema`, …) and its CSS/token stylesheets are imported in `app/layout.tsx` before `src/resources/custom.css`. Prefer composing these primitives over raw HTML + custom CSS; reach for a `.module.scss` only for what the system can't express. `src/components/index.ts` is the barrel — import components from `@/components`.

### SEO
`Meta.generate()` in each page's `generateMetadata` and `Schema` components drive metadata; `baseURL` must be correct for these. OG images are generated at `/api/og/generate`, plus `app/sitemap.ts`, `app/robots.ts`, and `/api/rss`.

## Environment

`PAGE_ACCESS_PASSWORD` is the only variable (see `.env.example`). Without it, `/api/authenticate` returns 500 and protected routes cannot be unlocked.

No remote image hosts are allowed. Add an `images.remotePatterns` entry in `next.config.mjs` before referencing external images.
