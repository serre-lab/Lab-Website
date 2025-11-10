# Google Search Console Canonical Tag Fix

## Date: November 10, 2025

## Problem

Google Search Console reported pages as **"Alternate page with proper canonical tag"** and wasn't indexing them.

### Root Cause

There was a **URL mismatch** between:
- **Actual page URLs**: `https://serre.lab.brown.edu/#/research` (with `/` before `#`)
- **Canonical tag URLs**: `https://serre.lab.brown.edu#/research` (missing `/` before `#`)
- **Sitemap URLs**: `https://serre.lab.brown.edu#/research` (missing `/` before `#`)

Google correctly respected the canonical tags and treated the actual pages as "alternates" that shouldn't be indexed, since they pointed to different URLs.

## Solution Applied

### ✅ Fixed SEOHead Component

**File**: `src/components/SEOHead.tsx` (Line 76)

**Before**:
```typescript
const canonicalUrl = path === '/' 
    ? `${BASE_URL}/` 
    : `${BASE_URL}#${path}`; // Missing slash!
```

**After**:
```typescript
const canonicalUrl = path === '/' 
    ? `${BASE_URL}/` 
    : `${BASE_URL}/#${path}`; // Fixed with slash!
```

### ✅ Fixed Sitemap Generator

**File**: `scripts/generate-sitemap.cjs` (Line 74)

**Before**:
```javascript
const url = route.path === '/' 
    ? `${BASE_URL}/` 
    : `${BASE_URL}#${route.path}`; // Missing slash!
```

**After**:
```javascript
const url = route.path === '/' 
    ? `${BASE_URL}/` 
    : `${BASE_URL}/#${route.path}`; // Fixed with slash!
```

### ✅ Regenerated Sitemap

**File**: `public/sitemap.xml` and `dist/sitemap.xml`

All 29 URLs now have the correct format:
- ✅ `https://serre.lab.brown.edu/#/research`
- ✅ `https://serre.lab.brown.edu/#/publications`
- ✅ `https://serre.lab.brown.edu/#/people`
- etc.

### ✅ Rebuilt Application

The application has been rebuilt with the corrected canonical tag logic, ensuring all pages now have matching canonical URLs.

## Next Steps

### 1. Deploy the Fix

Deploy the updated `dist/` folder to your production server. The fix includes:
- Updated canonical tag logic in the JavaScript bundle
- Corrected sitemap.xml with proper URLs
- All 29 pages with matching canonical tags

### 2. Submit Updated Sitemap to Google

1. Go to **Google Search Console** → **Sitemaps**
2. Remove the old sitemap if present (optional)
3. Submit: `https://serre.lab.brown.edu/sitemap.xml`
4. Google will recrawl all pages with the corrected URLs

### 3. Request Indexing (Optional, for faster results)

For immediate results on key pages:
1. Go to **Google Search Console** → **URL Inspection**
2. Enter a page URL (e.g., `https://serre.lab.brown.edu/#/research`)
3. Click **"Request Indexing"**
4. Repeat for important pages

### 4. Monitor Progress

1. Check **Google Search Console** → **Coverage** report
2. Watch for pages moving from "Alternate page with proper canonical tag" to "Indexed"
3. Expected timeline:
   - **Immediate**: Canonical tags are fixed on all pages
   - **1-3 days**: Google may recrawl some pages
   - **1-2 weeks**: Most pages should be indexed
   - **Ongoing**: Google continues to discover and index content

## Verification

After deployment, you can verify the fix by:

1. **View Source** on any page (e.g., `https://serre.lab.brown.edu/#/research`)
2. Look for the canonical tag in the HTML:
   ```html
   <link rel="canonical" href="https://serre.lab.brown.edu/#/research">
   ```
3. Confirm it matches the actual URL in the browser address bar

## Why This Happened

Hash routing URLs can be tricky because:
- The hash fragment (`#`) is technically not sent to the server
- URLs with hash routing should include a slash before the hash for consistency
- The canonical tag must **exactly match** the actual page URL
- Any mismatch causes Google to treat pages as duplicates/alternates

## Technical Details

### Files Changed
1. ✅ `src/components/SEOHead.tsx` - Fixed canonical URL construction
2. ✅ `scripts/generate-sitemap.cjs` - Fixed sitemap URL generation
3. ✅ `public/sitemap.xml` - Regenerated with correct URLs
4. ✅ `dist/sitemap.xml` - Built with correct URLs
5. ✅ `dist/assets/index-[hash].js` - Built with fixed SEOHead logic

### How Canonical Tags Work

Canonical tags tell search engines which URL is the "primary" version of a page:
```html
<link rel="canonical" href="https://example.com/page">
```

If a page's canonical tag points to a **different URL**, search engines will:
1. Not index the current page
2. Treat it as an "alternate" version
3. Index the canonical URL instead (if it exists)

In your case:
- **Before**: Pages pointed to non-existent URLs (without slash)
- **After**: Pages point to themselves (with slash)

## Summary

✅ **Fixed**: Canonical tag URLs now match actual page URLs  
✅ **Fixed**: Sitemap URLs now match actual page URLs  
✅ **Fixed**: All 29 pages have consistent URL formatting  
✅ **Deployed**: Changes are built and ready for production  

The "Alternate page with proper canonical tag" issue should resolve once you deploy and Google recrawls your site.

## Maintenance

When adding new pages in the future:
1. Ensure canonical URLs use `${BASE_URL}/#${path}` format (with slash)
2. Run `npm run generate-sitemap` to update the sitemap
3. Deploy both the updated sitemap and application code
4. Submit the updated sitemap to Google Search Console

## Additional Notes

- The fix maintains hash routing (no breaking changes)
- All existing URLs continue to work
- No redirect or migration required
- Google will naturally discover the corrected canonical tags
- The sitemap now correctly lists all 29 pages with proper URL formatting

