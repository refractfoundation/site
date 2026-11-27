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

Static Jekyll 4.4.1 site (Ruby), no CSS framework. Node is only used for image scripts.

- **Content lives in collections**: `_events/` (Campfire, Haven), `_programmes/` (Census; paused ones have `published: false`), `_posts/` (news), `_institutions/` and `_census_reports/`, plus top-level pages (`about.html`, `contact.html`, policy `*.md`, …) and the `our-work/` and `news/` index pages. Layouts in `_layouts/`: `default`, `home`, `page`, `post`, `event`, `programme`, `institution`, `census-report`. Every page sets an explicit extensionless `permalink` (e.g. `/about`) so canonical URLs and the sitemap match Vercel's `cleanUrls`.
- **Content is data-driven**: nav, home, people, partners, values, involvement, contact and Census data are YAML in `_data/`, rendered by partials in `_includes/`. Change the YAML rather than the HTML where possible.
- **Photos**: `_data/photos.yml` maps a photo key to its file, size and alt text. Pages refer to photos by key (`cover:`, `hero.photo`, `gallery`) and render them with `_includes/picture.html`, which emits a `<picture>` with WebP srcsets. `scripts/generate-webp.js` writes those `.webp` files next to each source image (gitignored, never commit them). Use absolute paths from site root (`/assets/images/...`); filename case matters on Vercel (Linux).
- **SEO**: `jekyll-seo-tag` and `jekyll-sitemap`. Give each page a `description:`. `_plugins/seo_defaults.rb` turns `cover` / `hero.photo` into the share image (falling back to `default_share_photo` in `_config.yml`) and an event's `summary` into its description.
- Styles are Sass: `assets/css/main.scss` built from partials in `_sass/`.

`_site/`, `.jekyll-cache/`, and generated `.webp` files are build output; don't edit or commit them.
