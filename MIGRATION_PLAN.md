# Website Migration Plan

## Overview
This document outlines the migration of resources from the old website (serre-lab.clps.brown.edu) to the new website.

## Directory Structure

```
public/
├── datasets/           # Large data files (.rar, .zip, .tar.bz2)
│   ├── hmdb/          # HMDB51 dataset files
│   ├── multicue/      # Multi-cue boundary detection
│   └── breakfast/     # Breakfast actions dataset
├── papers/            # PDF publications
└── images/
    └── resources/     # Images used in resource pages
        ├── hmdb/
        ├── multicue/
        ├── crowd/
        └── color/
```

## Files to Download from Old Website

### HMDB Dataset Files (Priority: HIGH)
Location: `public/datasets/hmdb/`
- `hmdb51_org.rar` (~2GB) - http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_org.rar
- `hmdb51_sta.rar` (~2GB) - http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_sta.rar
- `stabilized_readme.txt` - http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/stabilized_readme.txt
- `hmdb51_org_stips.rar` (~3.5GB) - http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_org_stips.rar
- `hmdb51_sta_stips.rar` (~2.9GB) - http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_sta_stips.rar
- `test_train_splits.rar` - http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/test_train_splits.rar
- `split_readme.txt` - http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/split_readme.txt
- `Kuehne_etal_iccv11.pdf` - http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/Kuehne_etal_iccv11.pdf
- `Kuehne_etal_iccv11.bib` - http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/Kuehne_etal_iccv11.bib

### HMDB Images
Location: `public/images/resources/hmdb/`
- Snapshot images, annotation visualizations, stabilization examples

### Multi-Cue Dataset (Priority: HIGH)
Location: `public/datasets/multicue/`
- `multicue-dataset.tar.bz2` (~3.4GB) - http://serre-lab.clps.brown.edu/resources-static/multicue-dataset.tar.bz2

### Breakfast Actions Dataset
Location: `public/datasets/breakfast/`
- Dataset files and documentation

### Papers (Priority: MEDIUM)
Location: `public/papers/`
- Various PDF publications referenced across the site

### Resource Images (Priority: LOW)
Location: `public/images/resources/`
- Figures and diagrams from various resource pages

## Migration Steps

### Step 1: Download Large Datasets (Manual - due to size)
```bash
cd public/datasets/hmdb/
# Download HMDB files manually or use wget/curl
wget http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_org.rar
wget http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_sta.rar
# ... etc
```

### Step 2: Run Automated Download Script
```bash
npm run migrate-resources
```

### Step 3: Update Links in Codebase
After files are downloaded, run the link update script:
```bash
npm run update-links
```

## Files Found (206 total links)

### By Category:
1. **HMDB Resources**: ~15 files (datasets, papers, images)
2. **Multi-Cue Dataset**: ~10 files (dataset + images)
3. **Breakfast Actions**: ~5 files
4. **Crowd Perception**: ~15 images
5. **Color Processing**: ~10 images
6. **Various Papers**: ~20 PDFs
7. **Other Resources**: ~130 images and misc files

## Link Pattern Updates

Old: `http://serre-lab.clps.brown.edu/wp-content/uploads/YYYY/MM/filename.ext`
New: `/public/[datasets|papers|images]/[category]/filename.ext`

Old: `http://serre-lab.clps.brown.edu/resource/page-name/`
New: `/resources/page-name`

## Notes

- **Large files (>100MB)**: Consider hosting on external services (Zenodo, OSF, etc.) due to GitHub file size limits
- **Git LFS**: May need to use Git Large File Storage for files >50MB
- **CDN**: Consider using a CDN for frequently accessed large files
- **Old links**: Keep a redirect map in case external sites link to old URLs

## Estimated Total Size
- HMDB: ~10GB
- Multi-Cue: ~3.4GB
- Other resources: ~2GB
- **Total: ~15GB**

⚠️ **GitHub Warning**: GitHub has a 100MB file size limit. Files larger than this will need alternative hosting or Git LFS.

