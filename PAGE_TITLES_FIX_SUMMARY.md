# Page Titles & Typography Standardization - Summary

**Date:** October 4, 2025

## Overview

Standardized all page titles to match the navigation menu and use consistent typography classes across the entire website.

---

## Changes Made

### 1. People Page (`People.tsx`)
**Before:**
```tsx
<Title order={1} className="people-page-title">Meet the Team</Title>
```

**After:**
```tsx
<Title order={1} className="page-title">People</Title>
```

**Changes:**
- ✅ Title changed: "Meet the Team" → "People" (matches menu)
- ✅ CSS class changed: `people-page-title` → `page-title` (uses global standard)
- ✅ Removed custom `.people-page-title` class from `People.css`

### 2. Publications Page (`Publications.jsx`)
**Before:**
- No page title

**After:**
```tsx
<Title order={1} className="page-title">Publications</Title>
```

**Changes:**
- ✅ Added missing page title
- ✅ Title matches menu label
- ✅ Uses standard `.page-title` class

### 3. Media/SciComm Page (`SciComm.tsx`)
**Before:**
```tsx
<Title mb="md" style={{ textAlign: "center" }}>Science Communication</Title>
```

**After:**
```tsx
<Title order={1} className="page-title">Media</Title>
```

**Changes:**
- ✅ Title changed: "Science Communication" → "Media" (matches menu)
- ✅ Uses standard `.page-title` class instead of inline styles
- ✅ Proper `order={1}` for H1 semantics

### 4. Research Page (`Research.tsx`)
**Status:** ✅ Already correct
- Title: "Research" (matches menu)
- Class: `page-title` (uses standard)
- No changes needed

### 5. Resources Page (`Resources.tsx`)
**Status:** ✅ Already correct
- Title: "Resources" (matches menu)
- Class: `page-title` (uses standard)
- No changes needed

### 6. Home Page (`Home.tsx`)
**Status:** ✅ Intentionally no title
- Home page uses hero image instead of text title
- This is a common design pattern for landing pages
- No changes needed

---

## Standardized Structure

All pages now follow this consistent pattern:

```tsx
<div className="[page]-container">
    <Title order={1} className="page-title">[Menu Label]</Title>
    {/* Page content */}
</div>
```

### Page Titles Now Match Menu Labels

| Menu Label | Page Title | Status |
|------------|------------|--------|
| Home | (Hero image) | ✅ N/A |
| Research | Research | ✅ Correct |
| Publications | Publications | ✅ Fixed |
| People | People | ✅ Fixed |
| Resources | Resources | ✅ Correct |
| Media | Media | ✅ Fixed |

---

## Typography Consistency

### Before
Different pages used different title approaches:
- Custom class names (`people-page-title`)
- Inline styles (`style={{ textAlign: "center" }}`)
- Missing `order={}` attributes
- Inconsistent title text

### After
All pages now use:
- ✅ **Same CSS class:** `.page-title` (from `typography.css`)
- ✅ **Same HTML semantics:** `<Title order={1}>`
- ✅ **Consistent styling:** 2.5rem, font-weight 700, centered
- ✅ **Matching labels:** Exactly match navigation menu

---

## Benefits

### 1. User Experience
- **Clear navigation:** Users always know where they are
- **Consistency:** Same title style on every page
- **Accessibility:** Proper H1 tags for screen readers

### 2. Maintainability
- **One CSS class:** All page titles use `.page-title`
- **Easy updates:** Change all titles by editing one CSS class
- **No duplication:** Removed custom title classes

### 3. SEO
- **Proper structure:** Every page has an H1
- **Relevant titles:** Titles match menu/navigation
- **Semantic HTML:** Correct heading hierarchy

### 4. Design Consistency
- **Visual unity:** Same font size, weight, color
- **Professional:** Cohesive brand experience
- **Predictable:** Users know what to expect

---

## CSS Classes Removed

These custom classes were removed and replaced with `.page-title`:
1. `.people-page-title` (from `People.css`)

These section title classes remain (they're for H2/H3, not page titles):
- `.people-section-title` - Still used for "Brown University Team" etc.
- `.research-subtitle` - Still used for research sections
- `.research-direction-title` - Still used for research cards
- `.resource-section-title` - Still used for resource categories

---

## Global Typography Classes (from typography.css)

These classes are now standardized across the site:

```css
.page-title       → H1 - Main page titles (2.5rem, weight 700)
.section-title    → H2 - Section titles (2rem, weight 600)
.subsection-title → H3 - Subsection titles (1.5rem, weight 600)
.card-title       → H4 - Card titles (1.25rem, weight 600)
.body-text        → Body text (1rem, line-height 1.7)
.secondary-text   → Secondary text (0.95rem)
```

---

## Testing Checklist

- [ ] Home page still looks correct (hero image, no title needed)
- [ ] Research page title: "Research" ✓
- [ ] Publications page title: "Publications" (newly added)
- [ ] People page title: "People" (changed from "Meet the Team")
- [ ] Resources page title: "Resources" ✓
- [ ] Media page title: "Media" (changed from "Science Communication")
- [ ] All titles use same font/size/style
- [ ] All titles are centered
- [ ] Navigation menu labels match page titles

---

## Notes

- **Home page:** Intentionally has no text title (uses hero image instead)
- **Commented code:** Old "Science Communication" title remains in commented code in SciComm.tsx (harmless)
- **Responsive:** All page titles use responsive typography from `typography.css`
- **Future pages:** New pages should use `<Title order={1} className="page-title">` pattern
