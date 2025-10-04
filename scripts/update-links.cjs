#!/usr/bin/env node

/**
 * Link Update Script
 * Updates old website links to point to new local resources
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OLD_DOMAIN = 'serre-lab.clps.brown.edu';

/**
 * Mapping rules for URL transformations
 */
const urlMappings = [
  // HMDB dataset files
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2013\/10\/(hmdb51_[^"'\s)]+)/g,
    replace: '/datasets/hmdb/$1'
  },
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2013\/10\/(test_train_splits\.rar)/g,
    replace: '/datasets/hmdb/$1'
  },
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2013\/10\/([^"'\s)]+\.txt)/g,
    replace: '/datasets/hmdb/$1'
  },
  
  // HMDB paper and citations
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2012\/08\/(Kuehne_etal_iccv11\.(pdf|bib))/g,
    replace: '/papers/$1'
  },
  
  // HMDB images
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2012\/08\/([^"'\s)]+\.(png|jpg|jpeg|gif))/g,
    replace: '/images/resources/hmdb/$1'
  },
  
  // Multi-cue dataset
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/resources-static\/(multicue-dataset\.tar\.bz2)/g,
    replace: '/datasets/multicue/$1'
  },
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2014\/08\/([^"'\s)]+\.(png|jpg|jpeg|gif))/g,
    replace: '/images/resources/multicue/$1'
  },
  
  // Rodent behavioral phenotyping dataset
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2010\/07\/(clipped_database\.zip)/g,
    replace: '/datasets/rodent/$1'
  },
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2010\/07\/(full_database\.zip)/g,
    replace: '/datasets/rodent/$1'
  },
  
  // Crowd perception images
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2014\/11\/([^"'\s)]+\.(png|jpg|jpeg|gif))/g,
    replace: '/images/resources/crowd/$1'
  },
  
  // Color processing images
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/2012\/10\/([^"'\s)]+\.(png|jpg|jpeg|gif))/g,
    replace: '/images/resources/color/$1'
  },
  
  // Internal page links (old resource paths to new)
  {
    pattern: /https?:\/\/serre-lab\.clps\.brown\.edu\/resource\/([^\/]+)\//g,
    replace: '/resources/$1'
  },
  
  // Generic wp-content images (catch-all)
  {
    pattern: /http:\/\/serre-lab\.clps\.brown\.edu\/wp-content\/uploads\/(\d{4})\/(\d{2})\/([^"'\s)]+\.(png|jpg|jpeg|gif))/g,
    replace: '/images/resources/$1-$2-$3'
  }
];

/**
 * Update links in a file
 */
function updateFileLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let changeCount = 0;
  
  for (const mapping of urlMappings) {
    const matches = content.match(mapping.pattern);
    if (matches) {
      content = content.replace(mapping.pattern, mapping.replace);
      changeCount += matches.length;
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return changeCount;
  }
  
  return 0;
}

/**
 * Find all files that need updating
 */
function findFilesWithOldLinks() {
  console.log('🔍 Finding files with old links...\n');
  
  try {
    const output = execSync(
      `grep -rl "${OLD_DOMAIN}" src/ --include="*.md" --include="*.tsx" --include="*.ts" --include="*.json"`,
      { encoding: 'utf-8' }
    );
    
    return output.trim().split('\n').filter(f => f);
  } catch (error) {
    if (error.status === 1) {
      return [];
    }
    throw error;
  }
}

/**
 * Verify that local files exist
 */
function verifyLocalFiles() {
  console.log('\n🔍 Verifying local files exist...\n');
  
  const publicDir = path.join(__dirname, '..', 'public');
  const requiredDirs = [
    'datasets/hmdb',
    'datasets/multicue',
    'papers',
    'images/resources/hmdb',
    'images/resources/multicue',
    'images/resources/crowd',
    'images/resources/color'
  ];
  
  const missing = [];
  
  for (const dir of requiredDirs) {
    const fullPath = path.join(publicDir, dir);
    if (!fs.existsSync(fullPath)) {
      missing.push(dir);
    } else {
      const files = fs.readdirSync(fullPath);
      console.log(`  ✓ ${dir}: ${files.length} files`);
    }
  }
  
  if (missing.length > 0) {
    console.log('\n  ⚠️  WARNING: Missing directories:');
    missing.forEach(dir => console.log(`     - ${dir}`));
    console.log('\n  Run migration script first:');
    console.log('    node scripts/migrate-resources.js --live');
    return false;
  }
  
  return true;
}

/**
 * Create a backup of files before modification
 */
function createBackup(files) {
  const backupDir = path.join(__dirname, '..', '.migration-backup');
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  console.log('\n💾 Creating backup...');
  
  for (const file of files) {
    const relativePath = path.relative(path.join(__dirname, '..'), file);
    const backupPath = path.join(backupDir, relativePath);
    const backupDir = path.dirname(backupPath);
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    fs.copyFileSync(file, backupPath);
  }
  
  console.log(`  ✓ Backed up ${files.length} files to .migration-backup/`);
}

/**
 * Main update function
 */
function updateLinks(options = {}) {
  const { dryRun = false, skipVerify = false } = options;
  
  console.log('🔗 Link Update Script\n');
  console.log(`Mode: ${dryRun ? 'DRY RUN (no changes)' : 'LIVE'}`);
  console.log('─'.repeat(60) + '\n');
  
  // Verify local files exist (unless skipped)
  if (!skipVerify && !dryRun) {
    const filesExist = verifyLocalFiles();
    if (!filesExist) {
      console.log('\n❌ Aborting: Local files not ready');
      console.log('   Use --skip-verify to update links anyway');
      process.exit(1);
    }
  }
  
  // Find files to update
  const files = findFilesWithOldLinks();
  
  if (files.length === 0) {
    console.log('✓ No files with old links found');
    return;
  }
  
  console.log(`Found ${files.length} files with old links:\n`);
  files.forEach(f => console.log(`  - ${f}`));
  
  if (dryRun) {
    console.log('\nDRY RUN - No changes made');
    console.log('\nTo update links, run:');
    console.log('  node scripts/update-links.js --live');
    return;
  }
  
  // Create backup
  createBackup(files);
  
  // Update files
  console.log('\n🔄 Updating links...\n');
  
  let totalChanges = 0;
  const results = [];
  
  for (const file of files) {
    const changes = updateFileLinks(file);
    totalChanges += changes;
    
    if (changes > 0) {
      console.log(`  ✓ ${file}: ${changes} links updated`);
      results.push({ file, changes });
    }
  }
  
  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 Update Summary:\n');
  console.log(`  Files updated: ${results.length}`);
  console.log(`  Total links updated: ${totalChanges}`);
  console.log(`  Backup location: .migration-backup/`);
  
  // Save report
  const report = {
    date: new Date().toISOString(),
    filesUpdated: results.length,
    totalChanges,
    results
  };
  
  fs.writeFileSync(
    path.join(__dirname, '..', 'link-update-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('\n✓ Report saved to link-update-report.json');
  console.log('\n' + '═'.repeat(60) + '\n');
  console.log('⚠️  IMPORTANT: Review changes before committing!');
  console.log('   Use git diff to see what changed');
  console.log('   Restore from .migration-backup/ if needed\n');
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  dryRun: !args.includes('--live'),
  skipVerify: args.includes('--skip-verify')
};

// Run update
updateLinks(options);

