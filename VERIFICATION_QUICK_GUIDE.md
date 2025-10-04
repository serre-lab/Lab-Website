# Quick Reference Guide - Publication Verification

## 📁 Generated Files

**Location:** `/Users/tserre/Projects/Lab-Website/`

1. **CRITICAL_ISSUES_SUMMARY.md** (7.3KB)
   - Start here - executive summary of all issues
   - Prioritized action items
   - Critical bug in officialPublicationUrls.js

2. **PUBLICATION_VERIFICATION_REPORT.md** (9.6KB)
   - Detailed full report
   - Complete breakdown by category
   - Publication distribution by year

3. **publication_issues_detailed.csv** (16KB)
   - Spreadsheet-friendly format
   - Use for tracking fixes
   - Filterable by issue type

## 🔢 Quick Stats

- **Total Publications:** 126
- **Total Local PDFs:** 84
- **Publications Missing URLs:** 52 (41%)
- **Publications Missing PDFs:** 47 (37%)
- **Papers with arXiv URLs (should be official):** 15 (12%)
- **Papers with Remote PDFs:** 53 (42%)

## 🚨 Most Critical Issues

### 1. officialPublicationUrls.js Bug
**File:** `/Users/tserre/Projects/Lab-Website/src/data/officialPublicationUrls.js`
**Lines:** 39-52

Six different papers incorrectly mapped to same URL:
```
"2016_Mely_VR": "https://www.nature.com/articles/ncomms13928",
"2016_Mely_CCNV": "https://www.nature.com/articles/ncomms13928",
... (4 more)
```

**Fix:** Remove or correct these entries

### 2. arXiv URLs for Published Papers (15 papers)
These papers are published at NeurIPS/ICLR/CVPR/ICML but link to arXiv.

**Years affected:** 2014, 2018, 2020-2024

**Fix:** Update `url` field in publications_by_year.json to official proceedings

### 3. Missing High-Impact PDFs (5 papers)
- Science Advances (2021)
- Nature Neuroscience (2018)
- Brain (2023)
- Neuropsychopharmacology (2018)
- eNeuro (2020)

**Fix:** Download and add to `/public/papers/`

## 📋 Top Priority Tasks

### Task 1: Fix officialPublicationUrls.js (5 min)
```bash
cd /Users/tserre/Projects/Lab-Website
# Edit src/data/officialPublicationUrls.js
# Remove or correct lines 39-52
```

### Task 2: Fix arXiv URLs (30 min)
1. Open publication_issues_detailed.csv
2. Filter: "arXiv URL for published paper"
3. For each of 15 papers:
   - Find official NeurIPS/ICLR/CVPR page
   - Update URL in publications_by_year.json

### Task 3: Add High-Impact PDFs (1 hour)
1. Open publication_issues_detailed.csv
2. Filter: "Missing pdfPath" + high-impact journals
3. Download 5 PDFs from Science/Nature/Brain
4. Add to `/public/papers/` with consistent naming
5. Update pdfPath in publications_by_year.json

### Task 4: Add Missing URLs (2 hours)
Focus on high-impact journals first:
- Nature Communications (2010)
- PNAS (2011, 2016)
- Psychological Review (2018)
- Communications of the ACM (2010)

### Task 5: Download Remote PDFs (3 hours)
53 papers link to serre-lab.clps.brown.edu
Download and host locally for reliability

## 🎯 Goal

Get from **16% complete** (URL + local PDF) to **100% complete** for all 126 publications.

## 📊 Progress Tracking

Use the CSV file to track your progress:
```bash
cd /Users/tserre/Projects/Lab-Website
open publication_issues_detailed.csv
```

Filter by "Issue Type" to work on specific categories.

## 🔍 Validation

After making changes, run this to verify:
```bash
# Count papers with URLs
grep -c '"url":' src/data/publications_by_year.json

# Count papers with pdfPath
grep -c '"pdfPath":' src/data/publications_by_year.json

# Count local PDFs
ls public/papers/*.pdf | wc -l
```

## ❓ Questions?

Refer to the detailed reports:
- CRITICAL_ISSUES_SUMMARY.md - What to fix and why
- PUBLICATION_VERIFICATION_REPORT.md - Complete analysis
- publication_issues_detailed.csv - Specific papers
