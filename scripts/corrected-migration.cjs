#!/usr/bin/env node

/**
 * Corrected Migration Strategy for Serre Lab Website
 * Only migrate files that were hosted on the old web server
 * Keep external links (Dropbox, etc.) as external
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const OLD_SERVER_BASE = 'https://serre-lab.clps.brown.edu/wp-content/uploads/';
const LOCAL_DIR = './public/datasets';
const GOOGLE_DRIVE_DIR = path.join(require('os').homedir(), 'Google Drive', 'My Drive', 'Misc', 'Web', 'datasets');

// Files that were actually hosted on the old server (not external)
const SERVER_HOSTED_FILES = {
    // Small files (< 5GB) - download locally
    small: [
        {
            name: 'demo_bundle.rar',
            path: '2012/04/demo_bundle.rar',
            size: 'Small',
            description: 'MATLAB demo bundle'
        },
        {
            name: 'test_train_splits.rar',
            path: '2014/04/test_train_splits.rar',
            size: 'Small',
            description: 'Train/test splits'
        },
        {
            name: 'segmentation_coarse.tar.gz',
            path: '2014/04/segmentation_coarse.tar.gz',
            size: 'Unknown',
            description: 'Coarse segmentation data'
        },
        {
            name: 'segmentation_fine.tar.gz',
            path: '2014/04/segmentation_fine.tar.gz',
            size: 'Unknown',
            description: 'Fine segmentation data'
        }
    ],
    
    // Large files (> 5GB) - move to Google Drive
    large: [
        {
            name: 'BreakfastII_15fps_qvga_sync.tar.gz',
            path: '2014/04/BreakfastII_15fps_qvga_sync.tar.gz',
            size: '3.6 GB',
            description: 'Main video dataset'
        },
        {
            name: 'breakfast_data.tar.gz',
            path: '2014/04/breakfast_data.tar.gz',
            size: '~1GB',
            description: 'Frame-based features (64 dim)'
        },
        {
            name: 'bf_kinetics_feat.tar.gz',
            path: '2014/04/bf_kinetics_feat.tar.gz',
            size: '27.7 GB',
            description: 'I3D features (RGB and flow)'
        }
    ]
};

// External files that should stay external (Dropbox, etc.)
const EXTERNAL_FILES = {
    'dense_traj_all_s1.tar.gz': 'https://www.dropbox.com/s/mfz8pe7jerlj54g/dense_traj_all_s1.tar.gz?dl=1',
    'dense_traj_all_s2.tar.gz': 'https://www.dropbox.com/s/l25u0jbmi62jwjp/dense_traj_all_s2.tar.gz?dl=1',
    'dense_traj_all_s3.tar.gz': 'https://www.dropbox.com/s/0j7enp6cjq2r8jd/dense_traj_all_s3.tar.gz?dl=1',
    'dense_traj_all_s4.tar.gz': 'https://www.dropbox.com/s/0ynhovye29ygha7/dense_traj_all_s4.tar.gz?dl=1'
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

function checkFileExists(url) {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https:') ? https : http;
        protocol.request(url, { method: 'HEAD' }, (response) => {
            resolve(response.statusCode === 200);
        }).on('error', () => resolve(false)).end();
    });
}

async function migrateServerHostedFiles() {
    console.log('🍳 Starting CORRECTED Breakfast Actions Dataset migration...\n');
    console.log('📋 Strategy: Only migrate files hosted on old server, keep external links external\n');
    
    // Create directories
    if (!fs.existsSync(LOCAL_DIR)) {
        fs.mkdirSync(LOCAL_DIR, { recursive: true });
        console.log(`✅ Created local directory: ${LOCAL_DIR}`);
    }
    
    console.log(`📁 Google Drive directory: ${GOOGLE_DRIVE_DIR}\n`);
    
    // Check small files for local download
    console.log('📦 Checking small files for local download...');
    for (const file of SERVER_HOSTED_FILES.small) {
        const url = OLD_SERVER_BASE + file.path;
        const exists = await checkFileExists(url);
        
        if (exists) {
            console.log(`✅ ${file.name} (${file.size}) - Available for download`);
        } else {
            console.log(`❌ ${file.name} (${file.size}) - Not found on server`);
        }
    }
    
    console.log('\n📦 Large files for Google Drive migration...');
    for (const file of SERVER_HOSTED_FILES.large) {
        const url = OLD_SERVER_BASE + file.path;
        const exists = await checkFileExists(url);
        
        if (exists) {
            console.log(`📁 ${file.name} (${file.size}) - Move to Google Drive`);
        } else {
            console.log(`❌ ${file.name} (${file.size}) - Not found on server`);
        }
    }
    
    console.log('\n🔗 External files (keep as external links):');
    for (const [filename, url] of Object.entries(EXTERNAL_FILES)) {
        console.log(`🌐 ${filename} - Keep external: ${url}`);
    }
    
    console.log('\n📋 CORRECTED Migration Plan:');
    console.log('1. Download small server-hosted files to public/datasets/');
    console.log('2. Move large server-hosted files to Google Drive');
    console.log('3. Keep Dropbox files as external links');
    console.log('4. Update Breakfast dataset page with mixed local/external links');
}

// Run migration
migrateServerHostedFiles().catch(console.error);
