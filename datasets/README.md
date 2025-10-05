# Dataset Files

This directory contains large dataset files that are **not committed to the repository** due to their size.

## Local Development

Dataset files can be downloaded locally for testing:

```bash
# Download all datasets
npm run migrate:all

# Or download specific categories
npm run migrate:images  # Just images (small, safe)
```

Downloaded files will be:
- ✅ Available locally at `http://localhost:5173/datasets/...`
- ✅ Ignored by git (won't be committed)
- ✅ Working for local development and testing

## Production Deployment

For production, large dataset files should be:

### Option 1: Keep on Old Server (Current)
Links point to: `http://serre-lab.clps.brown.edu/...`
- ✅ No migration needed
- ✅ Works immediately
- ⚠️ Depends on old server staying online

### Option 2: External Research Data Repository (Recommended)
Upload datasets to:
- **Zenodo** (https://zenodo.org/) - Free, permanent, DOI for citations
- **OSF** (https://osf.io/) - Free, good for research data
- Then update links in markdown files to point to new location

### Option 3: Git LFS (If needed)
For files that must be in the repo:
```bash
brew install git-lfs
git lfs install
git lfs track "public/datasets/**/*.rar"
git add .gitattributes
git commit -m "Add Git LFS"
```
Note: GitHub has 1GB free LFS storage limit.

## Current Dataset Files

### HMDB (~7.5GB)
- `hmdb51_org.rar` (2GB)
- `hmdb51_sta.rar` (2GB)
- `hmdb51_org_stips.rar` (3.5GB)
- `test_train_splits.rar`
- Documentation files

### Multi-Cue (~3.4GB)
- `multicue-dataset.tar.bz2` (3.4GB)

### Rodent Behavioral (sizes TBD)
- `clipped_database.zip`
- `full_database.zip`

### Breakfast Actions
- Hosted externally on Google Drive (no migration needed)

## File Status

| Dataset | Status | Location |
|---------|--------|----------|
| HMDB | 🔗 Old server | http://serre-lab.clps.brown.edu |
| Multi-Cue | 🔗 Old server | http://serre-lab.clps.brown.edu |
| Rodent | 🔗 Old server | http://serre-lab.clps.brown.edu |
| Breakfast | 🔗 External | Google Drive |

## Deployment Notes

When deploying with Vite/GitHub Pages:
1. Build process: `npm run build`
2. Output: `dist/` directory
3. Large files in `public/datasets/` are NOT included in build
4. Links in markdown point to external URLs (old server or research repos)

This keeps the GitHub repo small and deployment fast while maintaining access to datasets.

