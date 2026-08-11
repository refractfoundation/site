# The Refract Foundation — Website

This repository contains the source code for [The Refract Foundation's](https://refractfoundation.org) public website.

The Refract Foundation is a youth-led, West Midlands–based initiative working to improve digital literacy and access to opportunity in schools. Our programmes — **Census**, **RAISE**, **Revise** and **Futures** — along with events like **Campfire**, help young people build the confidence, skills and opportunities to thrive in a digital world.

The site is a static site built with [Jekyll](https://jekyllrb.com), styled with Bootstrap, and deployed on Vercel.

## Features

- 📄 Static pages for our mission, programmes, news and policies
- 🗞️ Markdown-based news posts with author, date and cover image support
- 📊 Data-driven content (programmes, partners, team, values) via `_data/*.yml`
- 🔍 SEO support through `jekyll-seo-tag` and auto-generated sitemaps

## Tech Stack

| Component     | Technology                                            |
| ------------- | ----------------------------------------------------- |
| Static site   | Jekyll 4.4.1 (Ruby)                                   |
| CSS framework | Bootstrap 5 (vendored in `scripts/bootstrap-dist/`)   |
| Styling       | Custom CSS in `assets/style.css`                      |
| Build helpers | Node.js ≥ 20 + [sharp](https://sharp.pixelplumbing.com) |
| Deployment    | Vercel                                                |

## Getting Started

### Prerequisites

- **Ruby** (2.7+) with [Bundler](https://bundler.io)
- **Node.js** ≥ 20 (for the image optimisation script)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd site

# Install Ruby dependencies
bundle install

# Install Node dependencies
npm install
```

### Local Development

```bash
bundle exec jekyll serve --livereload
```

The site will be available at <http://localhost:4000>, with live reload enabled.

### Building

```bash
bundle exec jekyll build
```

The generated site is written to `_site/`.

## Image Optimisation

Source images (`.jpg`, `.jpeg`, `.png`) live in `assets/images/`. The build pipeline serves WebP versions automatically:

1. **`npm run generate-webp`** converts every image in `assets/images/` to `.webp` (quality 75) using sharp. Conversions are skipped when the `.webp` is already newer than the source. You can target a specific directory: `npm run generate-webp assets/images/campfire`.
2. **`_plugins/webp_hook.rb`** post-processes the rendered HTML: it wraps `<img>` tags in `<picture>` elements with a WebP `<source>` when one exists, and rewrites `url()` references in inline styles (used for hero slides and event-card backgrounds).

> ⚠️ Run `npm run generate-webp` after adding new images so the optimised versions exist before building.

## Project Structure

```
.
├── _config.yml              # Jekyll configuration
├── _data/                   # Site data (nav, programmes, team, partners, values…)
├── _includes/               # Reusable partials (header, footer, donate, news…)
├── _layouts/                # Page templates (index, page, post, programme)
├── _plugins/                # Custom Jekyll plugins (WebP HTML hook)
├── assets/
│   ├── images/              # All site imagery (JPG/PNG sources + generated WebP)
│   └── style.css            # Global styles
├── news/                    # News posts (Markdown + front matter)
├── our-work/                # Programme & campaign pages
├── scripts/
│   ├── generate-webp.js     # Node WebP conversion script
│   └── bootstrap-dist/      # Vendored Bootstrap CSS/JS
├── Gemfile                  # Ruby dependencies
├── package.json             # Node dependencies & scripts
└── vercel.json              # Vercel build & redirect configuration
```

## Adding Content

### News Posts

Create a Markdown file in `news/` with the following front matter:

```yaml
---
title: My Post Title
layout: post
author: Your Name
date: 2026-01-01
cover: /assets/images/example.jpg
permalink: /news/my-post-title
---

Post content in Markdown…
```

### Programmes

Programme cards on the homepage are driven by `_data/programmes.yml`. Each entry includes a name, logo, description, background image, colour and URL.

### Other Data

Navigation, partners, team members, values and contact details are all managed as YAML in `_data/` — no HTML changes required.

## Deployment

Deployment is handled by Vercel using the configuration in `vercel.json`:

```json
{
  "buildCommand": "npm ci && node scripts/generate-webp.js && bundle exec jekyll build",
  "cleanUrls": true,
  "redirects": []
}
```

The build pipeline installs dependencies, generates WebP assets, then builds the site. Clean URLs strip `.html` extensions, and a couple of permanent redirects keep old URLs working:

- `/events/:path*` → `/our-work/:path*`
- `/our-work/dlc` → `/our-work/census`

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).
