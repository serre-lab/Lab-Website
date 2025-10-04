# Website Style Consistency Audit

**Date:** October 4, 2025
**Files Audited:** 14 CSS files

---

## Executive Summary

### Issues Found
1. **Color inconsistencies**: 22 unique hex colors used instead of CSS variables
2. **Spacing inconsistencies**: Mix of `px` and `rem` units
3. **Font size proliferation**: 21 different font sizes across the site
4. **Missing variable usage**: Hardcoded colors instead of using CSS variables

### Current State
- ✅ Typography CSS framework exists (`typography.css`)
- ✅ CSS variables defined in `index.css`
- ⚠️ Not consistently applied across all components
- ⚠️ Some components use hardcoded values

---

## Detailed Findings

### 1. Color Palette Issues

**CSS Variables Defined (in index.css):**
- `--color-primary`: #3498db
- `--color-primary-dark`: #2980b9
- `--color-text-primary`: #2c3e50
- `--color-text-secondary`: #666
- `--color-text-tertiary`: #444
- `--color-link`: #3498db
- `--color-link-hover`: #2980b9

**Hardcoded Colors Found:**
1. `#333` - Used in Publications.css (should use `--color-text-tertiary`)
2. `#1971c2` - Used in Publications.css (inconsistent blue)
3. `#e0e0e0` - Used for backgrounds (should create variable)
4. `#f8f9fa` - Used for backgrounds (should create variable)
5. `#34495e` - Used in Home.css (inconsistent with color scheme)
6. `#e1e8ed` - Used for borders (should create variable)
7. `#d6d7e0` - Used for borders in Publications (different from #e1e8ed!)

**Impact:** Inconsistent brand colors, harder to maintain theme

---

### 2. Font Size Issues

**Found 21 Different Font Sizes:**
- 0.75rem, 0.85rem, 0.9rem, 0.9em, 0.95rem
- 1em, 1rem, 1.1rem, 1.15rem, 1.2rem, 1.25rem
- 1.3rem, 1.35rem, 1.4rem
- 1.5em, 1.5rem, 1.75rem, 1.8rem
- 2rem, 2.5rem, 3.2em

**Typography Classes Defined (but not always used):**
- `.page-title`: 2.5rem
- `.section-title`: 2rem
- `.subsection-title`: 1.5rem
- `.card-title`: 1.25rem
- `.body-text`: 1rem
- `.secondary-text`: 0.95rem

**Issue:** Many components define their own font sizes instead of using typography classes

---

### 3. Spacing Issues

**Margins Found:** 9 unique values
- 0.25rem, 0.4rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 2.5rem, 3rem

**Paddings Found:** 14 unique values
- Mix of rem, em, and px units
- 0.25rem, 0.3rem, 0.5rem, 0.6em, 0.75rem, 1rem, 1.25rem, 1.5rem, 1.5em, 2em, 2rem, 4px, 8px, 20px

**Issues:**
- Inconsistent use of px vs rem
- Too many granular spacing values
- Should use a spacing scale (0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem)

---

### 4. Component-Specific Issues

#### Publications.css
- Line 68: `color: #333` → Should use `var(--color-text-tertiary)`
- Line 76: `color: #1971c2` → Should use `var(--color-link-hover)` (#2980b9)
- Line 81: `color: #333` → Should use `var(--color-text-tertiary)`
- Line 102: `background-color: #e0e0e0` → Needs CSS variable
- Line 103: `color: #333` → Should use `var(--color-text-tertiary)`
- Line 120: `background-color: #f8f9fa` → Needs CSS variable
- Line 51: `border-bottom: 1px solid #d6d7e0` → Inconsistent border color
- Line 8: `border-bottom: 1px solid #ccc` → Another inconsistent border color!

#### Home.css
- Line 82: `border: 1px solid #e1e8ed` → Needs CSS variable
- Line 122, 130: `color: #34495e` → Inconsistent, should use `--color-text-tertiary`
- Line 178, 255: `background: #f8f9fa` → Needs CSS variable
- Line 213, 234, 290, 384: `color: #666` → Should use `var(--color-text-secondary)`

---

## Recommendations

### Priority 1: Fix Color Inconsistencies

**Add missing CSS variables to index.css:**
```css
--color-bg-light: #f8f9fa;
--color-bg-gray: #e0e0e0;
--color-border: #e1e8ed;
--color-border-dark: #ccc;
```

**Update Publications.css to use variables:**
- Replace all `#333` with `var(--color-text-tertiary)`
- Replace `#1971c2` with `var(--color-link-hover)`
- Replace background colors with new variables
- Unify border colors to use single variable

**Update Home.css to use variables:**
- Replace `#34495e` with `var(--color-text-tertiary)`
- Replace `#666` with `var(--color-text-secondary)`
- Replace background/border colors with new variables

### Priority 2: Consolidate Font Sizes

**Enforce typography class usage:**
- Audit all components to use `.page-title`, `.section-title`, `.card-title`, etc.
- Remove custom font-size declarations
- Target: Reduce from 21 to 6-8 standard sizes

### Priority 3: Standardize Spacing

**Create spacing scale:**
- Convert all px values to rem
- Use only: 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem
- Create utility classes if needed

### Priority 4: Create Design System Documentation

Create `DESIGN_SYSTEM.md` documenting:
- Color palette with variable names
- Typography scale with class names
- Spacing scale
- Component patterns

---

## Implementation Plan

1. **Phase 1:** Add missing CSS variables to `index.css`
2. **Phase 2:** Update Publications.css to use variables (highest traffic page)
3. **Phase 3:** Update Home.css to use variables
4. **Phase 4:** Update remaining component CSS files
5. **Phase 5:** Create design system documentation
6. **Phase 6:** Set up linting rules to prevent future inconsistencies

---

## Benefits of Fixing

1. **Easier theming**: Change colors/fonts site-wide from one location
2. **Consistency**: Users see cohesive design
3. **Maintainability**: Less code duplication
4. **Performance**: Smaller CSS bundles
5. **Accessibility**: Consistent sizing improves readability
