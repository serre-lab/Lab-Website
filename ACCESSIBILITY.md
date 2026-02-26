# WCAG 2.1 AA Accessibility Compliance

Brown University requires full WCAG 2.1 AA compliance by May 2026.

## Ongoing Compliance Checklist

For every future change to this site:

1. **Heading hierarchy** — Single H1 per "page", logical nesting (H1 → H2 → H3)
2. **Images** — Meaningful `alt` text for content images; `alt=""` for decorative images
3. **Links** — Descriptive link text or `aria-label`; avoid "here", "click here", bare URLs
4. **Color contrast** — Text/background meets 4.5:1 (3:1 for large text)
5. **Keyboard accessibility** — All interactive elements focusable with visible focus styles
6. **SPA route changes** — Announce new content to screen readers; manage focus to main content
7. **ARIA** — `aria-label` on icon-only buttons/links; `aria-hidden="true"` on decorative icons
8. **Media** — No auto-playing video/audio without user controls

## Implemented Fixes (Jan 2026)

- Skip-to-main-content link (first focusable element in body)
- `<main id="main-content">` landmark with `tabIndex={-1}` for programmatic focus
- `<header role="banner">`, `<footer role="contentinfo">`
- `lang="en-US"` on `<html>`
- ARIA labels on all `<nav>` elements (Primary navigation, Quick links, Social links, External resources)
- Icon-only links: `aria-label` with "(opens in new tab)"; `aria-hidden="true"` on decorative icons
- `.sr-only` utility; `:focus-visible` styles for keyboard focus
- SPA route announcements: `aria-live="polite"` region announces page title on route change
- Focus management: focus moves to `<main>` when route changes
- External links: `rel="noopener noreferrer"`, `title="Opens in new tab"`
- Fixed external URLs: `Link to="https://..."` → `a href="https://..."` for Carney/CCBS/CCV
