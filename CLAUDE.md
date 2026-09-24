# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git workflow (enforced)

- **Never commit directly to `main`.** Every piece of work happens on its own branch, opened as a PR into `main`.
- Branch names: `<type>/<short-kebab-description>` (e.g. `feat/haven-page`, `fix/footer-spacing`).
- Commits must follow [Conventional Commits](https://www.conventionalcommits.org): `<type>(optional scope): <imperative summary>`, with types `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`. Keep the subject under ~72 chars; put detail in the body, not the subject.
- One logical change per commit; one concern per PR. Don't bundle unrelated work-in-progress into a commit.
- Don't rewrite or force-push shared history (`main`, or any pushed branch) without explicit approval.

## Commands

```bash
bundle install && npm install          # one-time setup
bundle exec jekyll serve --livereload  # dev server at http://localhost:4000
bundle exec jekyll build               # production build into _site/ (also the only "test": it must succeed)
npm run generate-webp [dir]            # create .webp for images in assets/images (run after adding images)
```

There is no test suite or linter. Verify changes with a successful `jekyll build`.

Vercel builds with `npm ci && node scripts/generate-webp.js && bundle exec jekyll build` (`vercel.json`; also sets clean URLs and the `/events/*` → `/our-work/*` and `/our-work/dlc` → `/our-work/census` redirects).

## Architecture

Static Jekyll 4.4.1 site (Ruby) with Bootstrap 5 vendored in `scripts/bootstrap-dist/` (not from npm). Node is only used for image conversion.

- **Pages** are top-level `*.md` plus `our-work/` (programmes and events such as Campfire, Census, Haven) and `news/` (posts with `title`, `layout: post`, `author`, `date`, `cover`, `permalink`). Layouts live in `_layouts/` (`index`, `page`, `post`, `programme`); use only these.
- **Content is data-driven**: nav, programmes, team, partners, values, contact, and events are YAML in `_data/`, rendered by partials in `_includes/` (e.g. `events-upcoming.html` / `events-past.html` read `_data/events.yml`). Change the YAML rather than the HTML where possible.
- **WebP pipeline spans two places**: `scripts/generate-webp.js` writes `.webp` next to each source image (gitignored, never commit them), and `_plugins/webp_hook.rb` post-processes rendered HTML, wrapping `<img>` in `<picture>` and rewriting inline `url(...)` backgrounds when a `.webp` exists. Reference the original `.jpg/.png` path in content, with absolute paths from site root (`/assets/images/...`). Filename case matters on Vercel (Linux), so match the case exactly.
- All custom styling is in the single `assets/style.css`.

`_site/`, `.jekyll-cache/`, and generated `.webp` files are build output; don't edit or commit them.
