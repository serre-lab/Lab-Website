#!/usr/bin/env node

/**
 * Migration Status Checker
 * Shows current status of the migration process
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OLD_DOMAIN = 'serre-lab.clps.brown.edu';
const GITHUB_LIMIT = 100 * 1024 * 1024;

/**
 * Check for remaining old URLs in codebase
 */
function checkRemainingUrls() {
  console.log('🔍 Checking for remaining old URLs...\n');
  
  try {
    const output = execSync(
      `grep -r "${OLD_DOMAIN}" src/ --include="*.md" --include="*.tsx" --include="*.ts" --include="*.json" | wc -l`,
      { encoding: 'utf-8' }
    );
    
    const count = parseInt(output.trim());
    
    if (count === 0) {
      console.log('  ✅ No old URLs found in source files\n');
      return true;
    } else {
      console.log(`  ⚠️  Found ${count} references to old domain\n`);
      
      // Show a few examples
      try {
        const examples = execSync(
          `grep -r "${OLD_DOMAIN}" src/ --include="*.md" --include="*.tsx" --include="*.ts" --include="*.json" | head -5`,
          { encoding: 'utf-8' }
        );
        console.log('  Examples:');
        console.log(examples.split('\n').slice(0, 5).map(l => `    ${l}`).join('\n'));
        console.log('');
      } catch (e) {}
      
      return false;
    }
  } catch (error) {
    if (error.status === 1) {
      console.log('  ✅ No old URLs found\n');
      return true;
    }
    throw error;
  }
}

/**
 * Check downloaded files
 */
function checkDownloadedFiles() {
  console.log('📦 Checking downloaded files...\n');
  
  const publicDir = path.join(__dirname, '..', 'public');
  const categories = [
    { name: 'datasets/hmdb', label: 'HMDB Dataset' },
    { name: 'datasets/multicue', label: 'Multi-Cue Dataset' },
    { name: 'datasets/breakfast', label: 'Breakfast Dataset' },
    { name: 'datasets/rodent', label: 'Rodent Behavioral Dataset' },
    { name: 'papers', label: 'Papers' },
    { name: 'images/resources/hmdb', label: 'HMDB Images' },
    { name: 'images/resources/multicue', label: 'Multi-Cue Images' },
    { name: 'images/resources/crowd', label: 'Crowd Images' },
    { name: 'images/resources/color', label: 'Color Images' }
  ];
  
  let totalFiles = 0;
  let totalSize = 0;
  let largeFiles = [];
  
  for (const cat of categories) {
    const dirPath = path.join(publicDir, cat.name);
    
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      totalFiles += files.length;
      
      let categorySize = 0;
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        categorySize += stats.size;
        
        if (stats.size > GITHUB_LIMIT) {
          largeFiles.push({
            path: path.join(cat.name, file),
            size: stats.size
          });
        }
      }
      
      totalSize += categorySize;
      
      const sizeMB = (categorySize / 1024 / 1024).toFixed(1);
      console.log(`  ✓ ${cat.label}: ${files.length} files (${sizeMB}MB)`);
    } else {
      console.log(`  ⏸️  ${cat.label}: Not downloaded`);
    }
  }
  
  console.log(`\n  📊 Total: ${totalFiles} files, ${(totalSize / 1024 / 1024 / 1024).toFixed(2)}GB\n`);
  
  if (largeFiles.length > 0) {
    console.log('  ⚠️  Files exceeding GitHub limit (>100MB):\n');
    for (const file of largeFiles) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1);
      console.log(`     - ${file.path} (${sizeMB}MB)`);
    }
    console.log('\n     💡 Consider using Git LFS or external hosting');
    console.log('        See MIGRATION_README.md for instructions\n');
    return { totalFiles, totalSize, hasLargeFiles: true };
  }
  
  return { totalFiles, totalSize, hasLargeFiles: false };
}

/**
 * Check Git LFS status
 */
function checkGitLFS() {
  console.log('🔧 Checking Git LFS...\n');
  
  try {
    execSync('git lfs version', { encoding: 'utf-8' });
    console.log('  ✅ Git LFS is installed\n');
    
    // Check if .gitattributes exists
    const gitattributesPath = path.join(__dirname, '..', '.gitattributes');
    if (fs.existsSync(gitattributesPath)) {
      const content = fs.readFileSync(gitattributesPath, 'utf-8');
      console.log('  📄 .gitattributes content:');
      console.log(content.split('\n').map(l => `     ${l}`).join('\n'));
      console.log('');
      return { installed: true, configured: true };
    } else {
      console.log('  ⚠️  Git LFS installed but not configured');
      console.log('     Run: git lfs track "public/datasets/**/*.rar"\n');
      return { installed: true, configured: false };
    }
  } catch (error) {
    console.log('  ⏸️  Git LFS not installed');
    console.log('     Install: https://git-lfs.github.com/\n');
    return { installed: false, configured: false };
  }
}

/**
 * Check for migration artifacts
 */
function checkMigrationArtifacts() {
  console.log('📋 Checking migration artifacts...\n');
  
  const artifacts = [
    { file: 'migration-manifest.json', label: 'Download Manifest' },
    { file: 'link-update-report.json', label: 'Link Update Report' },
    { file: '.migration-backup', label: 'Backup Directory' }
  ];
  
  for (const artifact of artifacts) {
    const artifactPath = path.join(__dirname, '..', artifact.file);
    if (fs.existsSync(artifactPath)) {
      console.log(`  ✓ ${artifact.label}: Found`);
      
      if (artifact.file.endsWith('.json')) {
        const data = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'));
        console.log(`    Date: ${new Date(data.date).toLocaleString()}`);
        if (data.totalFiles) console.log(`    Files: ${data.totalFiles}`);
        if (data.results) {
          const success = data.results.success ? data.results.success.length : 0;
          const failed = data.results.failed ? data.results.failed.length : 0;
          console.log(`    Success: ${success}, Failed: ${failed}`);
        }
      }
    } else {
      console.log(`  ⏸️  ${artifact.label}: Not found`);
    }
  }
  console.log('');
}

/**
 * Recommend next steps
 */
function recommendNextSteps(urlsClean, filesStatus, lfsStatus) {
  console.log('🎯 Recommended Next Steps:\n');
  
  if (filesStatus.totalFiles === 0) {
    console.log('  1. 📥 Download resources:');
    console.log('     npm run migrate:images      # Start with images');
    console.log('     npm run migrate:all         # Download everything\n');
  } else if (!urlsClean) {
    console.log('  1. 🔗 Update links in codebase:');
    console.log('     npm run update-links:dry-run');
    console.log('     npm run update-links\n');
  } else if (filesStatus.hasLargeFiles && !lfsStatus.configured) {
    console.log('  1. ⚙️  Configure Git LFS for large files:');
    console.log('     git lfs install');
    console.log('     git lfs track "public/datasets/**/*.rar"');
    console.log('     git lfs track "public/datasets/**/*.tar.bz2"\n');
  } else if (urlsClean && filesStatus.totalFiles > 0) {
    console.log('  1. ✅ Migration appears complete!');
    console.log('     - Test the site locally: npm run dev');
    console.log('     - Review changes: git diff');
    console.log('     - Commit changes: git add . && git commit\n');
  }
  
  console.log('  📚 For detailed instructions, see: MIGRATION_README.md\n');
}

/**
 * Main status check
 */
function checkStatus() {
  console.log('═'.repeat(70));
  console.log('  🔄 Website Migration Status Check');
  console.log('═'.repeat(70));
  console.log('');
  
  const urlsClean = checkRemainingUrls();
  const filesStatus = checkDownloadedFiles();
  const lfsStatus = checkGitLFS();
  checkMigrationArtifacts();
  
  console.log('═'.repeat(70));
  recommendNextSteps(urlsClean, filesStatus, lfsStatus);
  console.log('═'.repeat(70));
}

// Run status check
checkStatus();

