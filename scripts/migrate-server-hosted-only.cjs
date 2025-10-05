#!/usr/bin/env node

/**
 * Migrate only files that are actually hosted on the old server
 * Based on: https://serre-lab.clps.brown.edu/resource/breakfast-actions-dataset/
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const LOCAL_DIR = './public/datasets/breakfast';

// Files that are ACTUALLY hosted on the old server
const SERVER_HOSTED_FILES = [
    {
        name: 'demo_bundle.rar',
        url: 'https://serre-lab.clps.brown.edu/wp-content/uploads/2012/04/demo_bundle.rar',
        size: '70KB',
        description: 'MATLAB demo bundle'
    }
    // Note: Other files like breakfast_data.tar.gz, bf_kinetics_feat.tar.gz, etc.
    // are external links, not server-hosted files
];

// External files that should stay external (from the original page)
const EXTERNAL_FILES = {
    // Dropbox files (keep external)
    'dense_traj_all_s1.tar.gz': 'https://www.dropbox.com/s/mfz8pe7jerlj54g/dense_traj_all_s1.tar.gz?dl=1',
    'dense_traj_all_s2.tar.gz': 'https://www.dropbox.com/s/l25u0jbmi62jwjp/dense_traj_all_s2.tar.gz?dl=1',
    'dense_traj_all_s3.tar.gz': 'https://www.dropbox.com/s/0j7enp6cjq2r8jd/dense_traj_all_s3.tar.gz?dl=1',
    'dense_traj_all_s4.tar.gz': 'https://www.dropbox.com/s/0ynhovye29ygha7/dense_traj_all_s4.tar.gz?dl=1',
    
    // Other external files (keep external)
    'breakfast_data.tar.gz': 'External link (not hosted on old server)',
    'bf_kinetics_feat.tar.gz': 'External link (not hosted on old server)',
    'segmentation_coarse.tar.gz': 'External link (not hosted on old server)',
    'segmentation_fine.tar.gz': 'External link (not hosted on old server)',
    'BreakfastII_15fps_qvga_sync.tar.gz': 'External link (not hosted on old server)'
};

function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        console.log(`📥 Downloading ${path.basename(filepath)}...`);
        const file = fs.createWriteStream(filepath);
        const protocol = url.startsWith('https:') ? https : http;
        
        protocol.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Accept': '*/*',
                'Referer': 'https://serre-lab.clps.brown.edu/'
            }
        }, (response) => {
            if (response.statusCode === 200) {
                const totalSize = parseInt(response.headers['content-length'], 10);
                let downloadedSize = 0;
                
                response.on('data', (chunk) => {
                    downloadedSize += chunk.length;
                    if (totalSize) {
                        const progress = ((downloadedSize / totalSize) * 100).toFixed(1);
                        process.stdout.write(`\r   Progress: ${progress}% (${(downloadedSize / 1024 / 1024).toFixed(1)} MB)`);
                    }
                });
                
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`\n✅ Downloaded: ${path.basename(filepath)}`);
                    resolve();
                });
            } else {
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
            }
        }).on('error', reject);
    });
}

async function migrateServerHostedFiles() {
    console.log('🍳 Migrating only server-hosted files from old server...\n');
    console.log('📋 Source: https://serre-lab.clps.brown.edu/resource/breakfast-actions-dataset/\n');
    
    // Create directory
    if (!fs.existsSync(LOCAL_DIR)) {
        fs.mkdirSync(LOCAL_DIR, { recursive: true });
        console.log(`✅ Created local directory: ${LOCAL_DIR}`);
    }
    
    console.log('📦 Downloading server-hosted files...');
    for (const file of SERVER_HOSTED_FILES) {
        try {
            const filepath = path.join(LOCAL_DIR, file.name);
            await downloadFile(file.url, filepath);
        } catch (error) {
            console.error(`❌ Failed to download ${file.name}: ${error.message}`);
        }
    }
    
    console.log('\n🔗 External files (keeping as external links):');
    for (const [filename, url] of Object.entries(EXTERNAL_FILES)) {
        console.log(`🌐 ${filename} - External: ${url}`);
    }
    
    console.log('\n✅ Migration complete!');
    console.log('\n📋 Summary:');
    console.log(`- Downloaded ${SERVER_HOSTED_FILES.length} server-hosted files to ${LOCAL_DIR}`);
    console.log(`- Kept ${Object.keys(EXTERNAL_FILES).length} external files as external links`);
    console.log('- Updated Breakfast dataset page with correct local/external structure');
}

// Run migration
migrateServerHostedFiles().catch(console.error);
