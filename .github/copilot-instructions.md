# Copilot instructions for `refractfoundation/site`

## Repository overview
- This is a **Jekyll static site** for The Refract Foundation.
- Primary stack: Markdown pages with front matter + HTML layouts/includes + CSS.
- Key dependency: `jekyll 4.4.1` (see `Gemfile`).

## Key paths to know
- `/_config.yml`: Jekyll site configuration.
- `/*.md`: top-level pages (`index.md`, `about.md`, `contact.md`).
- `/events/*.md`: event content pages.
- `/dlc-land/**.md`: event landing pages.
- `/_layouts/*.html`: page templates.
- `/_includes/*.html`: shared partials (head, header, footer, event cards, donate block).
- `/_data/*.yml`: structured data consumed by Liquid templates.
- `/assets/style.css`: global styling.
- `/scripts/`: vendored frontend libraries (Bootstrap, Splide).
- `/img/`, `/vid/`: static assets.

## Local setup and validation workflow
Run all commands from repository root (`/home/runner/work/site/site`).

1. Install Bundler (user-local if system gems are not writable):
   - `gem install --user-install bundler -v 2.6.9`
2. Configure local gem install path and install dependencies:
   - `~/.local/share/gem/ruby/3.2.0/bin/bundle config set path vendor/bundle`
   - `~/.local/share/gem/ruby/3.2.0/bin/bundle install`
3. Validate site builds:
   - `~/.local/share/gem/ruby/3.2.0/bin/bundle exec jekyll build`

If `bundle` is on PATH in your environment, the standard command is:
- `bundle exec jekyll build`

## Errors encountered during onboarding (and workarounds)
- Error: `bundle: command not found`
  - Workaround: install Bundler with `gem install --user-install bundler -v 2.6.9`.
- Error: `Gem::FilePermissionError` writing to `/var/lib/gems/...`
  - Workaround: use `--user-install` for gems instead of system-level install.
- Error: `bundler: command not found: jekyll`
  - Workaround: run `bundle install` first to install project gems locally.
- Error: `.github` directory did not exist yet
  - Workaround: create it with `mkdir -p .github` before adding repo agent docs.

## Editing guidance
- Keep existing Liquid/front-matter patterns intact.
- For new pages, use existing layouts (`page`, `index`, `campfire`, `dlc`, `eventdlc`) and define required front-matter keys used by that layout.
- Prefer editing content in Markdown files; only touch layout/include HTML when structure changes are needed.
- Keep styles centralized in `/assets/style.css` unless there is a clear reason to inline style.
- Reuse existing assets under `/img` and `/vid` and keep paths absolute from site root (e.g., `/img/...`).

## Quality checks before finishing changes
- Re-run `bundle exec jekyll build` (or full path Bundler command above) and confirm successful generation.
- If build fails, fix Liquid/front-matter/path issues first; these are common break points in this repo.
