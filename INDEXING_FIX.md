# Google Search Console: "Discovered - Currently Not Indexed" Fix

## Problem

Google Search Console shows pages as **"Discovered - currently not indexed"**, meaning Google found the pages but hasn't indexed them yet. This is common with React SPAs using hash routing because:

1. Googlebot needs to execute JavaScript to see content
2. Pages may lack unique titles/descriptions
3. Google may not understand what each page is about

## Solution Implemented

### ✅ Enhanced Dynamic SEO Meta Tags

Enhanced the `SEOHead` component to dynamically update:

1. **Page Titles** - Each page now has a unique, descriptive title:
   - Home: "Serre Lab | Brown University"
   - Research: "Research | Serre Lab"
   - Publications: "Publications | Serre Lab"
   - People: "People | Serre Lab"
   - Resources: "Resources | Serre Lab"
   - Media: "Media & Science Communication | Serre Lab"
   - Markdown pages: Auto-generated from path

2. **Meta Descriptions** - Each page has a unique description explaining its content

3. **Open Graph Tags** - Updated for social sharing (og:title, og:description, og:url)

4. **Twitter Card Tags** - Updated for Twitter sharing

5. **Canonical URLs** - Already implemented (from previous fix)

## How It Works

The `SEOHead` component runs on every page and:
- Detects the current route
- Updates `document.title` dynamically
- Updates all meta tags in the `<head>`
- Provides unique metadata for each page

This helps Googlebot understand:
- What each page is about (via title and description)
- Which page is which (unique titles prevent confusion)
- The canonical URL for each page

## Benefits

1. **Better Indexing**: Google can better understand and categorize each page
2. **Improved Search Results**: Unique titles/descriptions improve search result appearance
3. **Social Sharing**: Proper Open Graph tags improve link previews
4. **User Experience**: Browser tabs show meaningful page titles

## Next Steps

1. **Wait for Google to Recrawl** (1-2 weeks):
   - Google will discover the updated meta tags on next crawl
   - Pages should move from "Discovered" to "Indexed"

2. **Request Indexing** (Optional, for faster results):
   - Use Google Search Console → URL Inspection
   - Enter each page URL
   - Click "Request Indexing"
   - This speeds up the process but isn't required

3. **Monitor Progress**:
   - Check Google Search Console → Coverage report
   - Watch for pages moving from "Discovered" to "Indexed"
   - Should see improvement over 1-2 weeks

## Technical Details

### Files Changed
- `src/components/SEOHead.tsx` - Enhanced with title/description logic

### How It Works
```typescript
// Detects route and updates:
- document.title
- <meta name="description">
- <meta property="og:title">
- <meta property="og:description">
- <meta property="twitter:title">
- <meta property="twitter:description">
- <link rel="canonical">
```

### Hash Routing Consideration

Since the site uses hash routing (`#/`), Googlebot must:
1. ✅ Execute JavaScript (React app handles this)
2. ✅ See unique titles/descriptions (now fixed)
3. ✅ Understand page content (meta tags help)
4. ⏳ Have time to crawl (happens automatically)

## Expected Timeline

- **Immediate**: Meta tags are live on all pages
- **1-3 days**: Googlebot may recrawl some pages
- **1-2 weeks**: Most pages should be indexed
- **Ongoing**: Google continues to discover and index new content

## Additional Recommendations

If pages still aren't indexing after 2-3 weeks:

1. **Check Page Content**: Ensure pages have substantial content (not just navigation)
2. **Internal Linking**: Make sure pages are linked from other pages
3. **Sitemap**: Verify sitemap is submitted and up-to-date (✅ already done)
4. **Server-Side Rendering**: Consider SSR/pre-rendering for faster indexing (advanced)

## Summary

✅ **Fixed**: Dynamic page titles and descriptions  
✅ **Fixed**: Unique meta tags for each page  
✅ **Fixed**: Proper Open Graph and Twitter Card tags  
✅ **Deployed**: Changes are live on production  

The "Discovered - currently not indexed" issue should resolve as Google recrawls and indexes pages with the improved metadata.

