# 🚀 Website Migration Quick Start

## Current Status
✅ Migration system ready to use  
⏸️ Files not yet downloaded (148 old URLs found)  
⏸️ Links not yet updated

## What You Need to Know

### 📊 Summary
- **Total files to migrate**: ~206 files
- **Total size**: ~13GB
- **Large files**: 4 files exceed GitHub's 100MB limit
- **Breakfast Actions Dataset**: Needs to be located/verified

### 🎯 Quick Commands

```bash
# Check current migration status
npm run migration:status

# Download only images (safe, ~500MB)
npm run migrate:images

# Preview what would be downloaded
npm run migrate:dry-run

# Download everything (~15GB - see warnings below!)
npm run migrate:all

# Preview link updates
npm run update-links:dry-run

# Update all links to point to local files
npm run update-links
```

## ⚠️ IMPORTANT: Large Files

**4 files are too large for GitHub** (>100MB each, ~11GB total):
1. `hmdb51_org.rar` (2GB)
2. `hmdb51_sta.rar` (2GB)
3. `hmdb51_org_stips.rar` (3.5GB)
4. `multicue-dataset.tar.bz2` (3.4GB)

**Note**: `hmdb51_sta_stips.rar` is obsolete and will not be migrated.

### Solutions:

**Option 1: Git LFS** (if you want files in repo)
```bash
# Install Git LFS
brew install git-lfs  # macOS
# or visit: https://git-lfs.github.com/

git lfs install
git lfs track "public/datasets/**/*.rar"
git lfs track "public/datasets/**/*.tar.bz2"
git add .gitattributes
git commit -m "Configure Git LFS"
```

**Option 2: External Hosting** (recommended for public datasets)
- Upload to [Zenodo](https://zenodo.org/) (free, permanent, DOI)
- Upload to [OSF](https://osf.io/) (free, good for research)
- Keep on current server temporarily
- Then update links to point to external URL

**Option 3: Skip large files**
```bash
# Add to .gitignore
echo "public/datasets/**/*.rar" >> .gitignore
echo "public/datasets/**/*.tar.bz2" >> .gitignore
```

## 📋 Recommended Workflow

### Step 1: Start with images (safe, small)
```bash
npm run migrate:images
```

This downloads ~150 images (~500MB). Safe for GitHub.

### Step 2: Update links
```bash
npm run update-links:dry-run  # Preview
npm run update-links          # Apply
```

### Step 3: Test locally
```bash
npm run dev
```

Visit http://localhost:5173 and check:
- Images display correctly
- Resource pages load
- No broken links

### Step 4: Decide on large files
Choose one of the options above for the 5 large dataset files.

### Step 5: Commit
```bash
git add .
git commit -m "Migrate website resources from old site"
git push
```

## 📁 File Organization

After migration, files will be at:

```
public/
├── datasets/
│   ├── hmdb/              # HMDB dataset files
│   ├── multicue/          # Multi-cue dataset
│   ├── breakfast/         # Breakfast actions (external)
│   └── rodent/            # Rodent behavioral phenotyping
├── papers/                # PDF publications
└── images/
    └── resources/         # Images from resource pages
        ├── hmdb/
        ├── multicue/
        ├── crowd/
        └── color/
```

## 🆘 Help & Documentation

- **Full guide**: [MIGRATION_README.md](MIGRATION_README.md)
- **Technical plan**: [MIGRATION_PLAN.md](MIGRATION_PLAN.md)
- **Check status**: `npm run migration:status`

## 📞 Quick Answers

**Q: Can I test without downloading everything?**  
A: Yes! Use `npm run migrate:images` to download only images first.

**Q: What if I don't want to commit large files?**  
A: Use external hosting (Zenodo, OSF) or keep them on the old server.

**Q: How do I undo changes?**  
A: Backups are created automatically in `.migration-backup/`

**Q: Do I need to download everything now?**  
A: No! You can migrate images first, test, then handle datasets later.

**Q: Will this break the old website?**  
A: No, this doesn't touch the old website. It just copies files.

---

**Next step**: Run `npm run migration:status` to see current state!

