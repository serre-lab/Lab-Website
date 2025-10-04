# Page Titles Consistency Audit

**Date:** October 4, 2025

## Menu Labels (from App.tsx)

The navigation menu shows these labels:
1. **Home**
2. **Research**
3. **Publications**
4. **People**
5. **Resources**
6. **Media** (route: /sci-comm)

---

## Current Page Titles

### Home Page (`Home.tsx`)
- **Has title?** NO - No page title at all
- **Issue:** Missing H1 page title

### Research Page (`Research.tsx`)
- **Current title:** "Research"
- **CSS class:** `page-title`
- **Tag:** `<Title order={1}>`
- **Status:** ✅ CORRECT - Matches menu

### Publications Page (`Publications.jsx`)
- **Has title?** NO - No page-level H1 title
- **Only has:** Year headings (className="year-heading")
- **Issue:** Missing page title, only shows years

### People Page (`People.tsx`)
- **Current title:** "Meet the Team"
- **CSS class:** `people-page-title`
- **Tag:** `<Title order={1}>`
- **Issue:** ⚠️ Doesn't match menu ("People" vs "Meet the Team")

### Resources Page (`Resources.tsx`)
- **Need to check** - Not yet examined

### Media/SciComm Page (`SciComm.tsx`)
- **Need to check** - Not yet examined

---

## Font/Typography Issues

### CSS Classes Used
Different pages use different class names for the same purpose:

1. **Research:** Uses `.page-title` ✅
2. **People:** Uses `.people-page-title` ❌ (should use `.page-title`)
3. **Publications:** No title ❌
4. **Home:** No title ❌

### Typography CSS Available
From `typography.css`:
- `.page-title` - Main page titles (H1): 2.5rem, weight 700
- `.section-title` - Section titles (H2): 2rem, weight 600
- `.subsection-title` - Subsection titles (H3): 1.5rem, weight 600
- `.card-title` - Card titles (H4): 1.25rem, weight 600

---

## Recommendations

### Fix Page Titles

1. **Home Page**
   - Add: `<Title order={1} className="page-title">Home</Title>`
   - Or consider: No title (since it's a landing page with hero image)

2. **Publications Page**
   - Add: `<Title order={1} className="page-title">Publications</Title>`

3. **People Page**
   - Change: "Meet the Team" → "People"
   - Change class: `people-page-title` → `page-title`

4. **Resources Page**
   - Ensure it has: `<Title order={1} className="page-title">Resources</Title>`

5. **Media Page**
   - Ensure it has: `<Title order={1} className="page-title">Media</Title>`

### Standardize CSS Classes

**Remove custom page title classes:**
- `.people-page-title` → use `.page-title` instead
- `.research-page-title` → use `.page-title` instead (if exists)
- Any other custom variants → use `.page-title`

**Benefit:** One standard class = consistent styling everywhere

---

## Implementation Priority

### High Priority
1. **Add title to Publications page** - Most visited page, should have title
2. **Change People page title** - "Meet the Team" → "People"
3. **Standardize People page CSS class** - Use `.page-title` instead of custom class

### Medium Priority
4. **Add title to Home page** (or intentionally skip for design reasons)
5. **Check Resources and Media pages**

### Low Priority
6. **Remove unused CSS classes** from component CSS files

---

## Benefits

✅ **Consistency:** All pages use same title format
✅ **Navigation:** Users know where they are
✅ **SEO:** Proper H1 tags on every page
✅ **Maintainability:** One CSS class for all page titles
✅ **Accessibility:** Screen readers can identify page structure

