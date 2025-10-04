# Publication Verification Report
**Generated:** 2025-10-04

---

## Executive Summary

### Overall Statistics
- **Total Publications:** 126
- **Total PDFs in Directory:** 84
- **Publications by Year:** 2000-2025 + Work in Progress

### Issues Found

| Issue Type | Count |
|-----------|-------|
| Publications with Missing URLs | 52 |
| Publications with arXiv URLs (but published elsewhere) | 15 |
| Publications with Missing pdfPath | 47 |
| Publications with External PDF URLs (remote) | 53 |
| Publications with Missing PDF Files | 0 (all local PDFs exist) |

---

## Critical Issues

### 1. Papers with arXiv URLs That Should Link to Official Publications (15 papers)

These papers are published at conferences/journals but currently link to arXiv instead of the official venue:

#### 2014
- **Neuronal synchrony in complex-valued deep networks**
  - Journal: International Conference on Learning Representations
  - Current URL: http://arxiv.org/abs/1312.6115
  - Should link to: ICLR official page

#### 2018
- **Learning long-range spatial dependencies with horizontal gated-recurrent units**
  - Journal: Neural Information Processing Systems
  - Current URL: https://arxiv.org/abs/1805.08315
  - Should link to: NeurIPS official page

#### 2020
- **Iterative VAE as a predictive brain model for out-of-distribution generalization**
  - Journal: NeurIPS workshop on Shared Visual Representations in Human and Machine Intelligence (SVRHM)
  - Current URL: https://arxiv.org/abs/2012.00557
  - Should link to: NeurIPS workshop page

- **Stable and expressive recurrent vision models**
  - Journal: Neural Information Processing Systems
  - Current URL: https://arxiv.org/abs/2005.11362
  - Should link to: NeurIPS official page

#### 2021
- **Look at the variance! Efficient black-box explanations with Sobol-based sensitivity analysis**
  - Journal: Neural Information Processing Systems
  - Current URL: https://arxiv.org/abs/2111.04138
  - Should link to: NeurIPS official page

- **Tracking without re-recognition in humans and machines**
  - Journal: Neural Information Processing Systems
  - Current URL: https://arxiv.org/abs/2105.13351
  - Should link to: NeurIPS official page

#### 2022
- **What I cannot predict, I do not understand: A human-centered evaluation framework for explainability methods**
  - Journal: Neural Information Processing Systems
  - Current URL: https://arxiv.org/abs/2112.04417
  - Should link to: NeurIPS official page

- **A benchmark for compositional visual reasoning**
  - Journal: Neural Information Processing Systems
  - Current URL: https://arxiv.org/abs/2206.05379
  - Should link to: NeurIPS official page

- **Meta-reinforcement learning with self-modifying networks**
  - Journal: Neural Information Processing Systems
  - Current URL: https://arxiv.org/abs/2202.02363
  - Should link to: NeurIPS official page

- **Diversity vs. recognizability: Human-like generalization in one-shot generative models**
  - Journal: Neural Information Processing Systems
  - Current URL: https://arxiv.org/abs/2205.10370
  - Should link to: NeurIPS official page

- **Xplique: A deep learning explainability toolbox**
  - Journal: CVPR workshop on XAI4CV: Explainable Artificial Intelligence for Computer Vision
  - Current URL: https://arxiv.org/abs/2206.04394
  - Should link to: CVPR workshop page

- **Understanding the computational demands underlying visual reasoning**
  - Journal: Neural Computation
  - Current URL: https://arxiv.org/abs/2108.03603
  - Should link to: Neural Computation journal page

#### 2023
- **Diffusion models as artists: Are we closing the gap between humans and machines?**
  - Journal: International Conference on Machine Learning
  - Current URL: https://arxiv.org/abs/2301.11722
  - Should link to: ICML official page

- **Don't lie to me! Robust and efficient explainability with verified perturbation analysis**
  - Journal: IEEE Conference on Computer Vision and Pattern Recognition
  - Current URL: https://arxiv.org/abs/2202.07728
  - Should link to: CVPR official page

#### 2024
- **Uncovering intermediate variables in transformers using circuit probing**
  - Journal: Conference on Language Modeling
  - Current URL: https://arxiv.org/abs/2311.04354
  - Should link to: COLM official page

---

### 2. Papers with Missing URLs (52 papers)

These papers have no URL at all and need official journal/conference/repository links:

#### Early Years (2000-2006): 14 papers
All papers from 2000-2006 are missing URLs. These are mostly technical reports and conference papers that should have official URLs.

#### 2007: 3 papers
- Learning complex cell invariance from natural videos: a plausibility proof
- A biologically inspired system for action recognition
- A component-based framework for face detection and identification

#### 2009: 2 papers
- Attentive processing improves object recognition
- A Bayesian inference theory of attention: neuroscience and algorithms

#### 2010: 6 papers
All 2010 publications are missing URLs (journals: Nature Communications, Vision Research, NeuroImage, etc.)

#### 2011: 3 papers
All 2011 publications are missing URLs (Frontiers, PNAS, ICCV)

#### 2012: 3 papers
All 2012 publications are missing URLs

#### 2013-2019: 13 papers
Various papers across these years

#### 2021-2022: 2 papers
- The challenge of appearance-free object tracking with feedforward neural networks (2021)
- A practitioner's guide to improve the logistics of spatiotemporal deep neural networks (2022)

---

### 3. Papers with Missing pdfPath (47 papers)

These papers have no local or remote PDF path defined:

#### Major Gaps by Year:
- **2018:** 5 papers missing PDFs
- **2020:** 5 papers missing PDFs
- **2021:** 4 papers missing PDFs
- **2022:** 11 papers missing PDFs (largest gap!)
- **2023:** 13 papers missing PDFs (largest gap!)
- **2024:** 6 papers missing PDFs

#### Notable Missing PDFs (high-impact journals):
- **Science Advances (2021):** Super-human cell death detection with biomarker-optimized neural networks
- **Nature Neuroscience (2018):** TDP-43 gains function due to perturbed auto-regulation
- **Brain (2023):** Transcriptomic profiling of cerebrospinal fluid
- **Current Opinion in Behavioral Sciences (2020):** Same-different conceptualization
- **eNeuro (2020):** Differential involvement of EEG oscillatory components

---

### 4. Papers with Remote PDF URLs (53 papers)

These papers link to PDFs on the old serre-lab.clps.brown.edu server instead of local copies:

#### Breakdown by Year:
- **2000-2006:** All papers (7 total)
- **2007:** 5 papers
- **2009-2014:** 18 papers
- **2016-2019:** 20 papers
- **2021-2022:** 2 papers

**Recommendation:** These should ideally be downloaded and hosted locally for reliability.

---

## Suspicious Entries in officialPublicationUrls.js

The following entries in the override file appear suspicious or potentially incorrect:

1. **Lines 39-46:** Multiple 2016 papers all mapped to the same Nature Communications URL (ncomms13928):
   - "2016_Mely_VR"
   - "2016_Mely_CCNV"
   - "2016_Pascarella_JNM-1"
   - "2016_Cauchoix_NI"
   - "serre2016"
   - "75760312"

   This is clearly wrong - different papers shouldn't link to the same article.

2. **Lines 54-67:** Placeholders with incomplete URLs (missing DOI/article IDs):
   - "Cauchoix_etal_NIPS20122"
   - "paper_cameraReady-2"
   - "Serre-encyclopedia_revised"
   - "2013_Tan_NIPS"
   - "Leussis_Ank3_BiolPsych2012"
   - etc.

3. **Systematic Issues:**
   - Many entries use PDF filenames instead of publication titles
   - URLs contain placeholder text instead of actual DOIs
   - Several entries reference MIT CSAIL technical reports with incomplete handles

---

## Recommendations

### High Priority
1. **Fix arXiv URLs (15 papers):** Replace arXiv links with official conference/journal URLs for published papers
2. **Fix officialPublicationUrls.js:** Remove or correct the suspicious duplicate/placeholder entries
3. **Add missing URLs (52 papers):** Particularly for high-impact journals and recent papers (2010-2022)

### Medium Priority
4. **Add missing PDFs (47 papers):** Especially for 2022-2024 papers and high-impact journals
5. **Download remote PDFs (53 papers):** Migrate from serre-lab.clps.brown.edu to local hosting

### Low Priority
6. **Verify all URLs:** Ensure all official URLs are correct and working
7. **Standardize PDF naming:** Ensure consistency in pdfPath format

---

## Publication Distribution by Year

| Year | Count | Notes |
|------|-------|-------|
| 2000 | 1 | |
| 2001 | 2 | |
| 2002 | 2 | |
| 2003 | 1 | |
| 2004 | 3 | |
| 2005 | 4 | |
| 2006 | 1 | |
| 2007 | 6 | |
| 2009 | 2 | |
| 2010 | 6 | |
| 2011 | 3 | |
| 2012 | 3 | |
| 2013 | 2 | |
| 2014 | 5 | |
| 2015 | 3 | |
| 2016 | 8 | |
| 2017 | 1 | |
| 2018 | 10 | |
| 2019 | 3 | |
| 2020 | 9 | |
| 2021 | 9 | |
| 2022 | 13 | Most missing PDFs |
| 2023 | 15 | Most missing PDFs |
| 2024 | 8 | |
| 2025 | 4 | |
| Work in Progress | 2 | |
| **TOTAL** | **126** | |

---

## Data Files Analyzed

1. `/Users/tserre/Projects/Lab-Website/src/data/publications_by_year.json` - Main publication database
2. `/Users/tserre/Projects/Lab-Website/src/data/officialPublicationUrls.js` - URL overrides (contains errors)
3. `/Users/tserre/Projects/Lab-Website/public/papers/` - Local PDF directory (84 files)

---

## Next Steps

To fix the identified issues, you should:

1. Create a spreadsheet or database to track the 15 papers that need arXiv→official URL updates
2. Clean up or remove the officialPublicationUrls.js file's duplicate/placeholder entries
3. Systematically add missing official URLs for the 52 papers without any URL
4. Obtain and add PDFs for the 47 papers missing them, prioritizing high-impact journals
5. Consider downloading the 53 remote PDFs to local storage for long-term reliability
