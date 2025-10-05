#!/usr/bin/env node

/**
 * Migrate Breakfast Actions Dataset from original server
 * Based on: https://serre-lab.clps.brown.edu/resource/breakfast-actions-dataset/
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

// Configuration
const LOCAL_DIR = './public/datasets/breakfast';
const GOOGLE_DRIVE_DIR = path.join(require('os').homedir(), 'Google Drive', 'My Drive', 'Misc', 'Web', 'datasets', 'breakfast');

// Files from the original page that need migration
const FILES_TO_MIGRATE = {
    // Small files for local hosting (GitHub)
    small: [
        {
            name: 'demo_bundle.rar',
            url: 'https://serre-lab.clps.brown.edu/wp-content/uploads/2012/04/demo_bundle.rar',
            size: 'Small',
            description: 'MATLAB demo bundle'
        },
        {
            name: 'segmentation_coarse.tar.gz',
            url: 'https://serre-lab.clps.brown.edu/wp-content/uploads/2014/04/segmentation_coarse.tar.gz',
            size: 'Unknown',
            description: 'Coarse segmentation data'
        },
        {
            name: 'segmentation_fine.tar.gz',
            url: 'https://serre-lab.clps.brown.edu/wp-content/uploads/2014/04/segmentation_fine.tar.gz',
            size: 'Unknown',
            description: 'Fine segmentation data'
        }
    ],
    
    // Large files for Google Drive
    large: [
        {
            name: 'BreakfastII_15fps_qvga_sync.tar.gz',
            url: 'https://serre-lab.clps.brown.edu/wp-content/uploads/2014/04/BreakfastII_15fps_qvga_sync.tar.gz',
            size: '3.6 GB',
            description: 'Main video dataset'
        },
        {
            name: 'breakfast_data.tar.gz',
            url: 'https://serre-lab.clps.brown.edu/wp-content/uploads/2014/04/breakfast_data.tar.gz',
            size: '~1GB',
            description: 'Frame-based features (64 dim)'
        },
        {
            name: 'bf_kinetics_feat.tar.gz',
            url: 'https://serre-lab.clps.brown.edu/wp-content/uploads/2014/04/bf_kinetics_feat.tar.gz',
            size: '27.7 GB',
            description: 'I3D features (RGB and flow)'
        }
    ]
};

// External files that stay external (from the original page)
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

async function migrateBreakfastDataset() {
    console.log('🍳 Starting Breakfast Actions Dataset migration from original server...\n');
    console.log('📋 Source: https://serre-lab.clps.brown.edu/resource/breakfast-actions-dataset/\n');
    
    // Create directories
    if (!fs.existsSync(LOCAL_DIR)) {
        fs.mkdirSync(LOCAL_DIR, { recursive: true });
        console.log(`✅ Created local directory: ${LOCAL_DIR}`);
    }
    
    if (!fs.existsSync(GOOGLE_DRIVE_DIR)) {
        fs.mkdirSync(GOOGLE_DRIVE_DIR, { recursive: true });
        console.log(`✅ Created Google Drive directory: ${GOOGLE_DRIVE_DIR}`);
    }
    
    console.log('\n📦 Downloading small files to local directory...');
    for (const file of FILES_TO_MIGRATE.small) {
        try {
            const filepath = path.join(LOCAL_DIR, file.name);
            await downloadFile(file.url, filepath);
        } catch (error) {
            console.error(`❌ Failed to download ${file.name}: ${error.message}`);
        }
    }
    
    console.log('\n📁 Downloading large files to Google Drive...');
    for (const file of FILES_TO_MIGRATE.large) {
        try {
            const filepath = path.join(GOOGLE_DRIVE_DIR, file.name);
            await downloadFile(file.url, filepath);
        } catch (error) {
            console.error(`❌ Failed to download ${file.name}: ${error.message}`);
        }
    }
    
    console.log('\n🔗 External files (keeping as external links):');
    for (const [filename, url] of Object.entries(EXTERNAL_FILES)) {
        console.log(`🌐 ${filename} - External: ${url}`);
    }
    
    console.log('\n🎉 Migration complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Update Breakfast dataset page with local/external links');
    console.log('2. Create public sharing links for Google Drive files');
    console.log('3. Test all download links');
}

// Run migration
migrateBreakfastDataset().catch(console.error);
