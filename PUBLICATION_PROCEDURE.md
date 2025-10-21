# PROCEDURE FOR ADDING PUBLICATIONS

## CENTRAL SOURCE OF TRUTH
**Location:** `/Users/tserre/Projects/prj_cv/data/publications_structured.json`

This is the SINGLE file that controls all publications for both CV and lab website.

## STEP-BY-STEP PROCEDURE

### 1. Edit the Central File
Edit `/Users/tserre/Projects/prj_cv/data/publications_structured.json`

**Structure:**
```json
{
  "under_review": [
    {
      "title": "Paper Title",
      "authors": "Author1, Author2 & T. Serre",
      "journal": "Journal Name",
      "url": "https://arxiv.org/abs/XXXX",
      "year": "2025"
    }
  ],
  "peer_reviewed": [...],
  "unpublished_preprints": [...]
}
```

**Conventions:**
- Use † for first equal authors, ‡ for last equal authors
- Use sentence case capitalization (first word + after colons)
- Include arXiv URLs when available
- Place new papers at bottom of appropriate year section

### 2. Regenerate CV
```bash
cd /Users/tserre/Projects/prj_cv/scripts
python generate_cv.py
```

### 3. Update Lab Website
**Option A:** Edit HTML source in `/Users/tserre/Projects/Lab-Website/public/misc/publications`
**Option B:** Run lab website update scripts (if available)

### 4. Commit Changes
```bash
cd /Users/tserre/Projects/prj_cv
git add -A
git commit -m "Add new publication: [Title]"
git push origin main
```

## CRITICAL RULES
- ✅ ALWAYS edit the central JSON file first
- ✅ NEVER edit generated LaTeX files directly
- ✅ Use consistent formatting conventions
- ❌ Never edit `/Users/tserre/Projects/prj_cv/latex/serre_cv.tex` directly
- ❌ Never edit `/Users/tserre/Projects/prj_cv/latex/serre_cv.pdf` directly

## VERIFICATION
1. Check generated CV PDF looks correct
2. Check lab website displays correctly
3. Ensure both sources are identical
