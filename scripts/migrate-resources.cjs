#!/usr/bin/env node

/**
 * Resource Migration Script
 * Downloads resources from old website and updates links
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const OLD_DOMAIN = 'serre-lab.clps.brown.edu';
const BASE_URL = `http://${OLD_DOMAIN}`;

// File categorization
const fileCategories = {
  datasets: ['.rar', '.zip', '.tar.bz2', '.tar.gz'],
  papers: ['.pdf', '.bib'],
  images: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
};

// Size limits (in bytes)
const GITHUB_LIMIT = 100 * 1024 * 1024; // 100MB
const WARNING_SIZE = 50 * 1024 * 1024;  // 50MB

// Obsolete files to skip
const SKIP_FILES = [
  'hmdb51_sta_stips.rar'  // Obsolete HMDB stabilized STIP features
];

/**
 * Extract all old website links from the codebase
 */
function extractLinks() {
  console.log('🔍 Scanning codebase for old website links...\n');
  
  try {
    const grepOutput = execSync(
      `grep -r "${OLD_DOMAIN}" src/ --include="*.md" --include="*.tsx" --include="*.ts" --include="*.json"`,
      { encoding: 'utf-8' }
    );
    
    // Parse URLs from grep output
    const urlPattern = new RegExp(`https?://${OLD_DOMAIN.replace('.', '\\.')}/[^\\s\\)\\]"']+`, 'g');
    const urls = [...new Set(grepOutput.match(urlPattern) || [])];
    
    console.log(`Found ${urls.length} unique URLs\n`);
    return urls;
  } catch (error) {
    if (error.status === 1) {
      // grep returns 1 when no matches found
      console.log('No links found');
      return [];
    }
    throw error;
  }
}

/**
 * Categorize URL into appropriate directory
 */
function categorizeUrl(url) {
  const ext = path.extname(url).toLowerCase();
  
  if (fileCategories.datasets.includes(ext)) {
    // Try to determine dataset type from URL
    if (url.includes('hmdb')) return 'datasets/hmdb';
    if (url.includes('multicue')) return 'datasets/multicue';
    if (url.includes('breakfast')) return 'datasets/breakfast';
    if (url.includes('clipped_database') || url.includes('full_database') || url.includes('2010/07')) return 'datasets/rodent';
    return 'datasets';
  }
  
  if (fileCategories.papers.includes(ext)) {
    return 'papers';
  }
  
  if (fileCategories.images.includes(ext)) {
    // Determine image category from URL path
    if (url.includes('2012/08') || url.includes('hmdb')) return 'images/resources/hmdb';
    if (url.includes('2014/08') || url.includes('multicue')) return 'images/resources/multicue';
    if (url.includes('2014/11') || url.includes('crowd')) return 'images/resources/crowd';
    if (url.includes('2012/10') || url.includes('color')) return 'images/resources/color';
    return 'images/resources';
  }
  
  // Default to misc
  return 'misc';
}

/**
 * Download a file from URL
 */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    
    console.log(`  Downloading: ${path.basename(destPath)}`);
    
    // Parse URL to get proper request options
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': `http://${OLD_DOMAIN}/`
      }
    };
    
    protocol.get(options, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(response.headers.location, destPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`Failed to download: ${response.statusCode}`));
      }
      
      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloadedSize = 0;
      
      response.on('data', (chunk) => {
        downloadedSize += chunk.length;
        if (totalSize) {
          const percent = ((downloadedSize / totalSize) * 100).toFixed(1);
          process.stdout.write(`\r  Progress: ${percent}% (${(downloadedSize / 1024 / 1024).toFixed(1)}MB / ${(totalSize / 1024 / 1024).toFixed(1)}MB)`);
        }
      });
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('\n  ✓ Downloaded');
        
        // Check file size
        const stats = fs.statSync(destPath);
        if (stats.size > GITHUB_LIMIT) {
          console.log(`  ⚠️  WARNING: File exceeds GitHub limit (${(stats.size / 1024 / 1024).toFixed(1)}MB > 100MB)`);
          console.log(`     Consider using Git LFS or external hosting`);
        } else if (stats.size > WARNING_SIZE) {
          console.log(`  ⚠️  WARNING: Large file (${(stats.size / 1024 / 1024).toFixed(1)}MB) - consider Git LFS`);
        }
        
        resolve({ url, destPath, size: stats.size });
      });
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

/**
 * Main migration function
 */
async function migrate(options = {}) {
  const { dryRun = false, skipLarge = false, onlyImages = false } = options;
  
  console.log('🚀 Starting Resource Migration\n');
  console.log(`Mode: ${dryRun ? 'DRY RUN (no downloads)' : 'LIVE'}`);
  console.log(`Skip large files (>100MB): ${skipLarge}`);
  console.log(`Only images: ${onlyImages}\n`);
  console.log('─'.repeat(60) + '\n');
  
  // Extract all links
  const urls = extractLinks();
  
  if (urls.length === 0) {
    console.log('No URLs to migrate');
    return;
  }
  
  // Categorize and prepare downloads
  const downloadPlan = [];
  
  for (const url of urls) {
    const category = categorizeUrl(url);
    const filename = path.basename(new URL(url).pathname);
    const destDir = path.join(__dirname, '..', 'public', category);
    const destPath = path.join(destDir, filename);
    
    // Skip obsolete files
    if (SKIP_FILES.includes(filename)) {
      console.log(`⏭️  Skipping obsolete file: ${filename}`);
      continue;
    }
    
    // Skip if only downloading images and this isn't an image
    if (onlyImages && !category.startsWith('images')) {
      continue;
    }
    
    downloadPlan.push({ url, category, destPath, destDir });
  }
  
  // Group by category
  const byCategory = downloadPlan.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
  
  console.log('📋 Download Plan:\n');
  for (const [category, items] of Object.entries(byCategory)) {
    console.log(`  ${category}: ${items.length} files`);
  }
  console.log('\n' + '─'.repeat(60) + '\n');
  
  if (dryRun) {
    console.log('DRY RUN - No files downloaded');
    console.log('\nTo perform actual download, run:');
    console.log('  node scripts/migrate-resources.js --live');
    return;
  }
  
  // Download files
  const results = {
    success: [],
    failed: [],
    skipped: []
  };
  
  for (const item of downloadPlan) {
    console.log(`\n📦 ${item.category}/${path.basename(item.destPath)}`);
    
    try {
      // Create directory if it doesn't exist
      if (!fs.existsSync(item.destDir)) {
        fs.mkdirSync(item.destDir, { recursive: true });
      }
      
      // Skip if file already exists
      if (fs.existsSync(item.destPath)) {
        console.log('  ⏭️  Already exists, skipping');
        results.skipped.push(item);
        continue;
      }
      
      const result = await downloadFile(item.url, item.destPath);
      results.success.push(result);
      
      // Add small delay between requests to be nice to the server
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`  ✗ Failed: ${error.message}`);
      results.failed.push({ ...item, error: error.message });
    }
  }
  
  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 Migration Summary:\n');
  console.log(`  ✓ Success: ${results.success.length}`);
  console.log(`  ✗ Failed: ${results.failed.length}`);
  console.log(`  ⏭️  Skipped: ${results.skipped.length}`);
  
  const totalSize = results.success.reduce((sum, r) => sum + r.size, 0);
  console.log(`  📦 Total downloaded: ${(totalSize / 1024 / 1024 / 1024).toFixed(2)}GB`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed downloads:');
    results.failed.forEach(f => {
      console.log(`  - ${f.url}`);
      console.log(`    Error: ${f.error}`);
    });
  }
  
  // Save manifest
  const manifest = {
    date: new Date().toISOString(),
    totalFiles: downloadPlan.length,
    results
  };
  
  fs.writeFileSync(
    path.join(__dirname, '..', 'migration-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('\n✓ Migration manifest saved to migration-manifest.json');
  console.log('\n' + '═'.repeat(60) + '\n');
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  dryRun: !args.includes('--live'),
  skipLarge: args.includes('--skip-large'),
  onlyImages: args.includes('--only-images')
};

// Run migration
migrate(options).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

