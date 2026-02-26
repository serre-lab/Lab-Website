# PDF Path Assignment Issue - Root Cause Analysis

## Problem
PDF paths in `publications_by_year.json` are incorrectly assigned, with multiple publications sharing the same PDF path. This keeps happening even after fixes.

## Root Cause

The sync script `scripts/sync_from_central_publications.py` has a function `load_existing_pdf_paths()` that **blindly preserves ALL existing PDF paths** from the lab website file:

```python
def load_existing_pdf_paths():
    """Load existing PDF paths from lab website file to preserve them"""
    # ...
    # Extract PDF paths by title
    for year, publications in lab_data.items():
        for pub in publications:
            title = pub.get('title', '')
            pdf_path = pub.get('pdfPath')
            if title and pdf_path:
                pdf_paths[normalize_title(title)] = pdf_path  # ← Preserves without validation
```

**The problem**: Once a PDF is incorrectly assigned (by any script or manual edit), it gets "locked in" and preserved through all subsequent syncs.

## Why This Happens

1. A script (like `map-all-pdfs.cjs`, `fix-pdf-paths.cjs`, etc.) incorrectly assigns a PDF, perhaps due to:
   - Fuzzy title matching
   - Case sensitivity issues
   - Similar titles being confused
   - Bugs in the mapping logic

2. The wrong PDF path gets saved in `publications_by_year.json`

3. When `sync_from_central_publications.py` runs:
   - It loads existing PDF paths from the file
   - It preserves ALL of them, including wrong ones
   - Wrong PDFs persist through syncs

## Current Issues Found

The validation script found many duplicate PDF assignments:

- `/papers/The-Challenge-of-Appearance-Free-Object-Tracking-with-Feedforward-Neural-Networks.pdf` is used by **14 publications**
- `/papers/deep-learning-good-bad-ugly-2019.pdf` is used by **3 publications** (including "Xplique" and "Development of a deep learning algorithm")
- Many other duplicates

## Solutions

### Immediate Fix
1. ✅ Fixed the specific issue with "Deep learning: The good, the bad and the ugly"
2. ✅ Created validation script: `scripts/validate-pdf-paths.py`

### Long-term Solutions

**Option 1: Add validation to sync script (Recommended)**
- Before preserving a PDF path, validate it:
  - Check if the PDF file actually exists
  - Check if the PDF path makes sense for the publication title
  - Warn or skip if validation fails

**Option 2: Remove PDF preservation from sync script**
- Don't preserve PDF paths from existing file
- Only use PDFs if they're explicitly in the central file
- Or require manual assignment via a separate mapping file

**Option 3: Use a trusted source for PDF paths**
- Store correct PDF mappings in a separate file (e.g., `pdf_mappings.json`)
- Only preserve PDFs that are in this trusted mapping
- Sync script only uses this mapping, not the existing file

**Option 4: Manual validation step**
- Run `scripts/validate-pdf-paths.py` after every sync
- Fix issues before committing

## Recommendation

I recommend **Option 3**: Create a trusted PDF mapping file that is manually curated and validated. The sync script should:
1. Load PDF mappings from the trusted file
2. Only preserve PDFs that are in the trusted mapping
3. Ignore PDFs from the existing file (or validate them against the trusted mapping)

This breaks the cycle of wrong PDFs being preserved.
