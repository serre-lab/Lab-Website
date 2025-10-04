# Critical Issues Summary - Lab Website Publications

**Date:** October 4, 2025
**Total Publications:** 126
**Total Local PDFs:** 84

---

## 🚨 CRITICAL ISSUE: officialPublicationUrls.js Contains Duplicate/Wrong URLs

**File:** `/Users/tserre/Projects/Lab-Website/src/data/officialPublicationUrls.js`

### The Problem
Six different 2016 publications are ALL mapped to the SAME Nature Communications article (ncomms13928):

```javascript
"2016_Mely_VR": "https://www.nature.com/articles/ncomms13928",
"2016_Mely_CCNV": "https://www.nature.com/articles/ncomms13928",
"2016_Pascarella_JNM-1": "https://www.nature.com/articles/ncomms13928",
"2016_Cauchoix_NI": "https://www.nature.com/articles/ncomms13928",
"serre2016": "https://www.nature.com/articles/ncomms13928",
"75760312": "https://www.nature.com/articles/ncomms13928",
```

This is clearly incorrect. These are different papers that should link to different articles:
- 2016_Mely_VR → Vision Research paper on boundary detection
- 2016_Mely_CCNV → Computational and Cognitive Neuroscience chapter
- 2016_Pascarella_JNM-1 → Journal of Neuroscience Methods paper
- 2016_Cauchoix_NI → Neuroimage paper on visual categorization
- serre2016 → Wiley review article
- 75760312 → ECCV 2012 color descriptor paper

**Action Required:** Remove or correct these entries immediately. They will cause the wrong URLs to appear on the website.

---

## 📊 Issue Breakdown

### 1. Papers Linking to arXiv Instead of Official Publication (15 papers)

These papers were PUBLISHED at major conferences but still link to arXiv:

**High Priority (NeurIPS papers):**
- 2018: Learning long-range spatial dependencies with horizontal gated-recurrent units
- 2020: Stable and expressive recurrent vision models
- 2021: Look at the variance! Efficient black-box explanations with Sobol-based sensitivity analysis
- 2021: Tracking without re-recognition in humans and machines
- 2022: What I cannot predict, I do not understand (4 papers total)
- 2022: A benchmark for compositional visual reasoning
- 2022: Meta-reinforcement learning with self-modifying networks
- 2022: Diversity vs. recognizability
- 2022: Understanding the computational demands underlying visual reasoning

**Other Conferences:**
- 2014: Neuronal synchrony in complex-valued deep networks (ICLR)
- 2022: Xplique: A deep learning explainability toolbox (CVPR workshop)
- 2023: Diffusion models as artists (ICML)
- 2023: Don't lie to me! Robust and efficient explainability (CVPR)
- 2024: Uncovering intermediate variables in transformers (COLM)

---

### 2. Papers with NO URL (52 papers)

**High-Impact Journals Missing URLs:**
- **Nature Communications (2010):** Automated home-cage behavioral phenotyping of mice
- **PNAS (2011):** Object decoding with attention in inferior temporal cortex
- **PNAS (2016):** Computer vision cracks the leaf code
- **Psychological Review (2018):** Complementary surrounds explain diversity of contextual phenomena
- **Communications of the ACM (2010):** A neuromorphic approach to computer vision

**Major Conferences Missing URLs:**
- Multiple CVPR papers (2001, 2014)
- Multiple ICCV papers (2007, 2011)
- ECCV papers (2012)
- NIPS papers (2013)

---

### 3. Papers with NO PDF (47 papers)

**Highest Priority (High-Impact Journals):**
- **Science Advances (2021):** Super-human cell death detection
- **Nature Neuroscience (2018):** TDP-43 gains function
- **Brain (2023):** Transcriptomic profiling of cerebrospinal fluid
- **Neuropsychopharmacology (2018):** Early life stress
- **eNeuro (2020):** Differential involvement of EEG oscillatory components

**NeurIPS Papers Missing PDFs (2022-2024):**
- 2022: 4 NeurIPS papers missing PDFs
- 2023: 7 NeurIPS papers missing PDFs
- 2024: 4 NeurIPS papers missing PDFs

**Recent High-Impact:**
- Behavioral & Brain Sciences (2023): Fixing the problems of deep neural networks
- Journal of Neural Engineering (2022): Fast inference of spinal neuromodulation
- ICLR (2023): GAMR: A Guided Attention Model

---

### 4. Papers Using Remote PDFs (53 papers)

All papers from 2000-2014 use remote URLs pointing to:
- `http://serre-lab.clps.brown.edu/wp-content/uploads/...`
- `https://serre-lab.clps.brown.edu/wp-content/uploads/...`

**Risk:** If the old server goes down, all these PDFs become unavailable.

**Recommendation:** Download and host locally for reliability.

---

## 📋 Priority Action Items

### Immediate (Do First)
1. ✅ **Fix officialPublicationUrls.js** - Remove/correct the duplicate ncomms13928 entries
2. ✅ **Fix arXiv URLs** - Update 15 papers to link to official conference/journal pages

### High Priority (Do Soon)
3. ✅ **Add missing PDFs for high-impact journals** (Science, Nature, PNAS, Brain) - 5 papers
4. ✅ **Add missing URLs for high-impact journals** - ~15 papers
5. ✅ **Add PDFs for recent NeurIPS papers** (2022-2024) - 15 papers

### Medium Priority
6. ✅ **Add remaining missing URLs** - 37 papers
7. ✅ **Add remaining missing PDFs** - 27 papers
8. ✅ **Download remote PDFs** - 53 papers

### Low Priority
9. ✅ **Verify all existing URLs work**
10. ✅ **Standardize PDF naming conventions**

---

## 📁 Files Generated

This verification generated the following files:

1. **PUBLICATION_VERIFICATION_REPORT.md** - Detailed full report
2. **publication_issues_detailed.csv** - Spreadsheet-friendly issue list
3. **CRITICAL_ISSUES_SUMMARY.md** - This file (executive summary)
4. **publication_verification_report.json** - Machine-readable full data

All files located in: `/Users/tserre/Projects/Lab-Website/`

---

## 🔍 How to Use This Report

### For Fixing arXiv URLs:
1. Open `publication_issues_detailed.csv`
2. Filter by "Issue Type" = "arXiv URL for published paper"
3. For each paper, search for the official conference/journal page
4. Update the `url` field in `publications_by_year.json`

### For Adding Missing PDFs:
1. Open `publication_issues_detailed.csv`
2. Filter by "Issue Type" = "Missing pdfPath"
3. Priority order: Science/Nature/PNAS/Brain → NeurIPS → Other conferences → Other journals
4. Download PDFs and add to `/public/papers/` with consistent naming
5. Update `pdfPath` field in `publications_by_year.json`

### For Adding Missing URLs:
1. Open `publication_issues_detailed.csv`
2. Filter by "Issue Type" = "Missing URL"
3. Search for official journal/conference pages
4. Update `url` field in `publications_by_year.json`

### For Cleaning officialPublicationUrls.js:
1. Review lines 39-52 (duplicate ncomms13928 entries)
2. Either remove these entries or correct them with proper URLs
3. Review other placeholder/incomplete URL entries
4. Consider whether this file is still needed or if URLs should be in the main JSON

---

## 📈 Statistics Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| Total Publications | 126 | 100% |
| Publications with URLs | 74 | 59% |
| Publications with Local PDFs | ~26 | 21% |
| Publications with Remote PDFs | 53 | 42% |
| Publications with No PDF | 47 | 37% |
| Publications Fully Complete (URL + Local PDF) | ~20 | 16% |

**Goal:** Get to 100% with both official URLs and local PDFs for all 126 publications.

---

## 🎯 Next Steps

1. Review this summary
2. Prioritize which issues to fix first based on your goals
3. Use the CSV file to track progress
4. Update publications_by_year.json with corrections
5. Test the website to ensure changes work correctly
6. Consider creating a script to validate publications data going forward
