#!/usr/bin/env node

/**
 * Download Breakfast Actions Dataset files to Google Drive
 */

const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Google Drive directory
const GOOGLE_DRIVE_DIR = path.join(os.homedir(), 'Google Drive', 'My Drive', 'Misc', 'Web', 'datasets', 'breakfast');

// Download URLs found on the original website
const DOWNLOAD_URLS = {
    // Large files (Dropbox)
    'dense_traj_all_s1.tar.gz': 'https://www.dropbox.com/s/mfz8pe7jerlj54g/dense_traj_all_s1.tar.gz?dl=1',
    'dense_traj_all_s2.tar.gz': 'https://www.dropbox.com/s/l25u0jbmi62jwjp/dense_traj_all_s2.tar.gz?dl=1',
    'dense_traj_all_s3.tar.gz': 'https://www.dropbox.com/s/0j7enp6cjq2r8jd/dense_traj_all_s3.tar.gz?dl=1',
    'dense_traj_all_s4.tar.gz': 'https://www.dropbox.com/s/0ynhovye29ygha7/dense_traj_all_s4.tar.gz?dl=1',
    
    // Demo bundle
    'demo_bundle.rar': 'http://serre-lab.clps.brown.edu/wp-content/uploads/2012/04/demo_bundle.rar'
};

function downloadFile(url, filename) {
    return new Promise((resolve, reject) => {
        console.log(`📥 Downloading ${filename}...`);
        const filepath = path.join(GOOGLE_DRIVE_DIR, filename);
        const file = fs.createWriteStream(filepath);
        
        const protocol = url.startsWith('https:') ? https : http;
        
        protocol.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            maxRedirects: 5
        }, (response) => {
            // Handle redirects
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                console.log(`   Redirecting to: ${response.headers.location}`);
                downloadFile(response.headers.location, filename).then(resolve).catch(reject);
                return;
            }
            
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
                    console.log(`\n✅ Downloaded: ${filename}`);
                    resolve();
                });
            } else {
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
            }
        }).on('error', reject);
    });
}

async function downloadBreakfastFiles() {
    console.log('🍳 Downloading Breakfast Actions Dataset files...\n');
    
    // Create Google Drive directory
    try {
        fs.mkdirSync(GOOGLE_DRIVE_DIR, { recursive: true });
        console.log(`📁 Created directory: ${GOOGLE_DRIVE_DIR}\n`);
    } catch (error) {
        console.log(`📁 Directory already exists: ${GOOGLE_DRIVE_DIR}\n`);
    }
    
    // Download files
    for (const [filename, url] of Object.entries(DOWNLOAD_URLS)) {
        try {
            await downloadFile(url, filename);
            console.log('');
        } catch (error) {
            console.error(`❌ Failed to download ${filename}: ${error.message}`);
        }
    }
    
    console.log('🎉 Download complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Check Google Drive folder for downloaded files');
    console.log('2. Create public sharing links for each file');
    console.log('3. Update the Breakfast dataset page with real download links');
}

downloadBreakfastFiles().catch(console.error);
