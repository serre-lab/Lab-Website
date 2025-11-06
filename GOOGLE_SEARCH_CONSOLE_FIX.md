# Google Search Console Indexing Issue - Fixed

## Problem Identified

Google Search Console was only tracking **1 page** out of **29 total pages** on the lab website.

### Root Causes:

1. **Incomplete Sitemap**: The sitemap.xml only contained 6 URLs (home + 5 main pages), missing 23 markdown resource pages
2. **Hash Routing Limitation**: The site uses hash routing (`#/`), which can make indexing more challenging for search engines
3. **Missing Dynamic Meta Tags**: All pages share the same meta tags from index.html, making it harder for Google to distinguish pages

## Solution Implemented

### ✅ Fixed Sitemap (Primary Fix)

- Created `scripts/generate-sitemap.cjs` to automatically generate a complete sitemap
- Updated sitemap from **6 URLs** to **29 URLs** (all pages now included)
- Added npm script: `npm run generate-sitemap` for easy regeneration

**Pages now in sitemap:**
- Home page (priority 1.0)
- 5 main pages: Research, Publications, People, Resources, Media (priority 0.7-0.9)
- 23 markdown resource pages (priority 0.6)

### Next Steps for Google Search Console

1. **Submit Updated Sitemap**:
   - Go to Google Search Console → Sitemaps
   - Submit: `https://serre.lab.brown.edu/sitemap.xml`
   - Google will crawl all 29 pages

2. **Request Indexing** (Optional):
   - Use "URL Inspection" tool in Search Console
   - Request indexing for key pages manually

3. **Monitor Progress**:
   - Check "Coverage" report in Search Console
   - Should see all 29 pages being discovered over the next few days/weeks

## Hash Routing Consideration

**Current Setup**: The site uses hash routing (`#/`), which means URLs look like:
- `https://serre.lab.brown.edu/#/research`
- `https://serre.lab.brown.edu/#/publications`

**Impact**: Google can index hash URLs, but it requires:
- Proper sitemap (✅ now fixed)
- Googlebot executing JavaScript (✅ React app should handle this)
- Time for Google to crawl and index

**Future Consideration**: If indexing issues persist, consider migrating from hash routing to browser history routing (requires server configuration for SPA routing).

## Files Changed

- ✅ `public/sitemap.xml` - Regenerated with all 29 pages
- ✅ `scripts/generate-sitemap.cjs` - New script to auto-generate sitemap
- ✅ `package.json` - Added `generate-sitemap` script

## Maintenance

Run `npm run generate-sitemap` whenever you:
- Add new markdown pages
- Add new routes
- Want to update the sitemap with current date

The script automatically discovers all markdown files and includes them in the sitemap.

