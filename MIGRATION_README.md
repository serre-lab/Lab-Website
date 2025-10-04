# Website Migration Guide

This guide will help you migrate resources from the old website (`serre-lab.clps.brown.edu`) to the new website.

## 🎯 Quick Start

### Step 1: Analyze what needs to be downloaded
```bash
npm run migrate:dry-run
```

This will scan all files and show you what would be downloaded without actually downloading anything.

### Step 2: Download images first (recommended)
```bash
npm run migrate:images
```

Downloads only image files (safe, small size). Good for testing the process.

### Step 3: Download everything
```bash
npm run migrate:all
```

⚠️ **Warning**: This will download ~15GB of data. See "Large Files" section below.

### Step 4: Update links in code
```bash
npm run update-links:dry-run    # Preview changes
npm run update-links            # Apply changes
```

## 📁 File Organization

Downloaded files are organized as follows:

```
public/
├── datasets/              # Large data files (.rar, .zip, .tar.bz2)
│   ├── hmdb/             # HMDB51 dataset (~10GB)
│   ├── multicue/         # Multi-cue dataset (~3.4GB)
│   └── breakfast/        # Breakfast actions dataset
│
├── papers/               # PDF publications and .bib files
│   └── Kuehne_etal_iccv11.pdf
│
└── images/
    └── resources/        # Images from resource pages
        ├── hmdb/        # HMDB visualizations
        ├── multicue/    # Multi-cue images
        ├── crowd/       # Crowd perception figures
        └── color/       # Color processing diagrams
```

## 🔍 What Gets Downloaded

**Total: 206 files, ~15GB**

### By Category:
- **HMDB Dataset**: 9 files, ~10GB
  - Videos (original & stabilized)
  - Pre-extracted features (STIP)
  - Train/test splits
  - Documentation
  - Paper PDF & BibTeX

- **Multi-Cue Dataset**: 1 file, ~3.4GB
  - Full dataset with annotations

- **Images**: ~150+ files, ~500MB
  - Research figures
  - Visualizations
  - Example images

- **Papers**: ~20 PDFs

## ⚠️ Large Files Warning

### GitHub Limitations
- **Max file size**: 100MB
- **Files >50MB**: Trigger warnings
- **Repository size**: Should stay under 1GB for good performance

### Problem Files (exceed 100MB):
1. `hmdb51_org.rar` (~2GB)
2. `hmdb51_sta.rar` (~2GB)
3. `hmdb51_org_stips.rar` (~3.5GB)
4. `hmdb51_sta_stips.rar` (~2.9GB)
5. `multicue-dataset.tar.bz2` (~3.4GB)

**Total**: ~13.8GB in files that **cannot** be pushed to GitHub without Git LFS

### Solutions for Large Files

#### Option 1: Git LFS (Recommended for datasets)
```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "public/datasets/**/*.rar"
git lfs track "public/datasets/**/*.tar.bz2"

# Commit .gitattributes
git add .gitattributes
git commit -m "Configure Git LFS for large datasets"

# Now you can add and commit large files
git add public/datasets/
git commit -m "Add datasets via Git LFS"
```

**Note**: GitHub has LFS storage limits (1GB free, then paid)

#### Option 2: External Hosting (Recommended for public datasets)
Host large datasets on:
- **Zenodo** - Free, permanent DOI, unlimited size
- **Open Science Framework (OSF)** - Free, good for research
- **Google Drive / Dropbox** - Easy but not permanent
- **University server** - If you have access

Then update links to point to external URLs.

#### Option 3: .gitignore (Don't commit)
```bash
# Add to .gitignore
echo "public/datasets/**/*.rar" >> .gitignore
echo "public/datasets/**/*.tar.bz2" >> .gitignore

# Keep links pointing to old website
# Good for transition period
```

## 🔗 Link Update Process

The `update-links` script automatically converts old URLs to new paths:

### Example transformations:
```
OLD: http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_org.rar
NEW: /datasets/hmdb/hmdb51_org.rar

OLD: http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/image.png
NEW: /images/resources/hmdb/image.png

OLD: http://serre-lab.clps.brown.edu/resource/hmdb-dataset/
NEW: /resources/hmdb-dataset
```

### What gets updated:
- ✅ Markdown files (`.md`)
- ✅ TypeScript files (`.tsx`, `.ts`)
- ✅ JSON data files

### Safety features:
- 🔒 Creates backup in `.migration-backup/` before changes
- 📋 Generates detailed report in `link-update-report.json`
- 🔍 Dry-run mode to preview changes

## 📋 Step-by-Step Migration

### Complete Migration Process

#### 1. Initial Assessment
```bash
npm run migrate:dry-run
```

Review the output. Check:
- How many files will be downloaded
- Total size estimate
- Which categories are affected

#### 2. Test with Images Only
```bash
npm run migrate:images
```

This downloads only images (~500MB). Check that:
- Files appear in correct directories
- No errors occurred
- You're comfortable with the process

#### 3. Handle Large Files
Choose one of the options above for large dataset files.

**Option A - Use Git LFS**:
```bash
git lfs install
git lfs track "public/datasets/**/*.rar"
git lfs track "public/datasets/**/*.tar.bz2"
git add .gitattributes
git commit -m "Configure Git LFS"
```

**Option B - Skip large files and use external hosting**:
Keep large files on old server or move to Zenodo/OSF.

#### 4. Download All Files
```bash
npm run migrate:all
```

This will download everything. Monitor the output for errors.

#### 5. Update Links (Dry Run)
```bash
npm run update-links:dry-run
```

Review what will change. Check the output carefully.

#### 6. Update Links (Live)
```bash
npm run update-links
```

This updates all files. A backup is created automatically.

#### 7. Review Changes
```bash
# See what changed
git diff

# Check specific files
git diff src/markdown-pages/resources/hmdb-a-large-human-motion-database.md
```

#### 8. Test Locally
```bash
npm run dev
```

Visit the site at http://localhost:5173 and check:
- Resource pages load correctly
- Images display properly
- Download links work
- No broken links

#### 9. Commit Changes
```bash
# If using Git LFS
git add .gitattributes public/datasets/

# Add everything else
git add public/images/ public/papers/
git add src/

git commit -m "Migrate resources from old website

- Downloaded images, papers, and datasets
- Updated all links to point to local files
- Configured Git LFS for large dataset files
- Total: 206 files migrated"

git push
```

## 🔄 Rollback Instructions

If something goes wrong:

### Restore from backup
```bash
# Copy backup files back
cp -r .migration-backup/src/* src/

# Or use git
git restore src/
```

### Remove downloaded files
```bash
rm -rf public/datasets/
rm -rf public/images/resources/
rm -rf public/papers/
```

## 📊 Monitoring & Verification

After migration, verify everything works:

### Check for broken links
```bash
# Check if any old URLs remain
grep -r "serre-lab.clps.brown.edu" src/
```

### Check file sizes
```bash
# See what was downloaded
du -sh public/datasets/*
du -sh public/images/resources/*
du -sh public/papers/
```

### Verify images display
1. Start dev server: `npm run dev`
2. Visit each resource page
3. Check that all images load
4. Check that download links work

## 🆘 Troubleshooting

### Download fails with "Failed to download: 404"
- File may have moved on old server
- Check if URL is correct
- May need to download manually

### Files are huge, can't push to GitHub
- Use Git LFS (see Large Files section)
- Or use external hosting (Zenodo, OSF)
- Or keep on old server temporarily

### Links not updating correctly
- Check `update-links.js` mapping rules
- File might need custom mapping
- Update script and rerun

### Images not displaying after migration
- Check file paths in browser DevTools
- Verify file exists in public/ directory
- Check that Vite is serving files correctly

## 📚 Additional Resources

- **Git LFS Documentation**: https://git-lfs.github.com/
- **Zenodo**: https://zenodo.org/
- **OSF**: https://osf.io/
- **GitHub File Size Limits**: https://docs.github.com/en/repositories/working-with-files/managing-large-files

## 🎉 Success Checklist

- [ ] All images display correctly on local site
- [ ] All PDF links work
- [ ] Large dataset files are hosted appropriately
- [ ] No old URLs remain in code
- [ ] Site builds without errors (`npm run build`)
- [ ] Changes committed to git
- [ ] Backup of original files saved
- [ ] Migration manifest saved
- [ ] Old website can be maintained as fallback

---

## Need Help?

If you encounter issues:
1. Check the troubleshooting section
2. Review migration logs
3. Check `.migration-backup/` for original files
4. Use dry-run modes to preview changes

