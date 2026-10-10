# Lab website

# Accessibility: WCAG 2.1 AA Compliance (Brown University Policy)

All HTML output from this project must comply with WCAG 2.1 AA.
Brown University requires full digital accessibility compliance by May 2026.
Reference: https://digital-accessibility.brown.edu/

## Visual style (Thomas, October 10, 2026)

Use the existing site style for every change. Reuse `src/styles/typography.css` and established component sizes: body text 1rem, secondary text 0.95rem, section headings 1.75rem. Native lists and status text must use an explicit shared text class rather than inheriting the oversized body default. Keep the original homepage banner.

Reduce unnecessary boxes: prefer headings, whitespace, and subtle dividers for prose, resource entries, and publication lists. Retain cards where grouping helps, such as people profiles and the featured keynote. Avoid decorative shadows, gradient stripes, and hover lifts on ordinary content. Check the actual desktop and mobile appearance; passing accessibility tests alone does not establish visual consistency.

The homepage “Selected publications” is a curated selection, separate from recent papers and preprints. Use open publication entries with subtle dividers instead of enclosed boxes. Preserve its chosen papers and equal-size entries across rows; do not replace selected papers just because newer work appears.

## Research writing

Write the public Research page for an external audience: explain scientific questions, methods, and findings. Project rosters, individual assignments, Slack channels, and participation instructions belong in the internal lab handbook. Name people only when identifying a significant scientific collaboration or a grant PI, not to enumerate who works on a project. Do not turn the handbook project inventory into the public research narrative.

Explain the scientific question, the data or task, and what the method measures before naming projects or technical terms. Brevity must not remove the information a reader needs to understand the work. Use concrete examples, expand unfamiliar acronyms, and distinguish ongoing research aims from demonstrated results. Clinical descriptions should identify the actual research question and modality using public sources.

Public research highlights should reflect the maturity and significance of the work. Do not promote early exploratory projects to major research directions or public resources merely because they have an internal channel or project website. EpiSelect is early-stage and should not currently be featured on the public site (Thomas, October 10, 2026).

## Mandatory Checks for Every Change

### Headings
- Single <h1> per page/route
- Headings nest logically: h1 > h2 > h3, never skip levels
- Publication titles are NEVER <h1> — use <h3> under year <h2> headings

### Structure
- Landmark elements present: <header>, <nav>, <main>, <footer>
- All <nav> elements have aria-label to distinguish them
- Skip-to-content link is the first focusable element
- lang="en-US" on <html> element

### Images & Media
- Every <img> has alt text (descriptive for meaningful, alt="" for decorative)
- Decorative images also get aria-hidden="true"
- No auto-playing audio or video without user controls
- <iframe> elements (embedded videos) must have a title attribute

### Color & Contrast
- Text-to-background contrast ratio >= 4.5:1 (>= 3:1 for large text)
- Information is never conveyed by color alone

### Interactive Elements
- All interactive elements reachable via keyboard
- Visible :focus-visible styles on all focusable elements
- Icon-only buttons/links have aria-label or visually-hidden text

### Links
- Link text is descriptive (no bare "click here")
- External links indicate this via aria-label (e.g., "opens in new tab")

### SPA Behavior
- Route changes update document.title
- Route changes announce new content via aria-live region
- Focus moves to new content heading after navigation

### PDFs
- Do not host local PDFs unless they are tagged (PDF/UA compliant)
- Prefer linking to publisher DOI for publications
- Any locally hosted PDF must have title, author, and lang metadata

## Testing
- `npm run dev` — local preview at http://localhost:5173
- `npm run lint`
- `npm test` — Playwright (`tests/`). The config builds the site and previews it; do not start that build while other edits are in progress.
- `npm run build` — regenerates `public/sitemap.xml`, then typechecks and builds
- Run a Lighthouse accessibility audit before each deploy
- Test keyboard navigation (Tab, Shift+Tab, Enter, Escape)

## Routing and sitemap

The app uses hash routing (`createHashRouter` in `src/App.tsx`). In-app pages live at `https://serre.lab.brown.edu/#/research` and similar fragments. Crawlers often ignore URL fragments. The sitemap records those hash routes and does not add server rewrites or path-routing fallbacks. Standalone dataset HTML (`/hmdb51.html`, `/breakfast-actions-dataset.html`) is listed as a real path. `lastmod` is omitted. `/resources/joining-the-lab` stays unlisted. Markdown files are included only when `src/utils/loadMarkdownFiles.ts` registers them.

## Publications data

- **Edit only:** `~/Work/personal/cv/data/publications_central.json`.
- **Generated:** `~/Work/personal/cv/data/publications_structured.json` is written by the CV sync. Do not edit it.
- **Lab copy:** `src/data/publications_by_year.json` is generated. Do not edit it by hand.
- **Style:** `~/Work/personal/cv/memory/procedures/publication-style.md` — sentence-case titles, author lines; never arXiv title case.
- **Sync** with the configured Python environment (the uv env at `~/Work/agents/claude/.venv/`, via `source ~/Work/agents/claude/scripts/activate-env.sh`):
  1. `cd ~/Work/personal/cv && python scripts/sync_from_central.py` — regenerates `publications_structured.json` from central. This script also overwrites the lab JSON from central, copying `pdf_path` when central has one.
  2. `cd ~/Work/research/lab-website && python scripts/sync_from_central_publications.py` — rebuilds `src/data/publications_by_year.json` from the generated structured file. It keeps a local `pdfPath` only when that path is still on the lab file it reads. A path that existed only in the previous lab file, and not in central, is already gone after step 1.
- **Links:** a usable `url` on the publication record is the public link. `src/data/officialPublicationUrls.js` is only a fallback when that URL is missing, blank, a PDF, or a `/papers/` path.
- **Home highlights:** `src/pages/Home/Home.tsx` cards are manual; update journal/year labels when featuring a paper.
