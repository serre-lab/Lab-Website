#!/usr/bin/env node

/**
 * Migration script for Breakfast Actions Dataset
 * Downloads small files locally, prepares large files for Google Drive
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = 'https://serre-lab.clps.brown.edu/wp-content/uploads/2014/04/';
const LOCAL_DIR = './public/datasets/breakfast';
const GOOGLE_DRIVE_DIR = '~/Google Drive/My Drive/Misc/Web/datasets/breakfast';

// File definitions with sizes and categories
const FILES = {
    // Small files (< 5GB) - download locally
    small: [
        {
            name: 'BreakfastII_15fps_qvga_sync.tar.gz',
            size: '3.6 GB',
            description: 'Main video dataset'
        },
        {
            name: 'breakfast_data.tar.gz',
            size: '~1GB',
            description: 'Frame-based features (64 dim)'
        },
        {
            name: 'segmentation_coarse.tar.gz',
            size: 'Unknown',
            description: 'Coarse segmentation data'
        },
        {
            name: 'segmentation_fine.tar.gz',
            size: 'Unknown',
            description: 'Fine segmentation data'
        },
        {
            name: 'test_train_splits.rar',
            size: 'Small',
            description: 'Train/test splits'
        }
    ],
    
    // Large files (> 5GB) - move to Google Drive
    large: [
        {
            name: 'dense_traj_all.rar',
            size: '~220GB',
            description: 'Dense trajectories (all)'
        },
        {
            name: 'dense_traj_all_s1.tar.gz',
            size: '~37GB',
            description: 'Dense trajectories split 1'
        },
        {
            name: 'dense_traj_all_s2.tar.gz',
            size: '~57GB',
            description: 'Dense trajectories split 2'
        },
        {
            name: 'dense_traj_all_s3.tar.gz',
            size: '~42GB',
            description: 'Dense trajectories split 3'
        },
        {
            name: 'dense_traj_all_s4.tar.gz',
            size: '~75GB',
            description: 'Dense trajectories split 4'
        },
        {
            name: 'bf_kinetics_feat.tar.gz',
            size: '27.7 GB',
            description: 'I3D features (RGB and flow)'
        }
    ]
};

// Multipart files
const MULTIPART_FILES = [
    'Breakfast_Final.tar.1',
    'Breakfast_Final.tar.2', 
    'Breakfast_Final.tar.3',
    'Breakfast_Final.tar.4',
    'Breakfast_Final.tar.5',
    'Breakfast_Final.tar.6'
];

function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
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
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
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

async function migrateBreakfastDataset() {
    console.log('🍳 Starting Breakfast Actions Dataset migration...\n');
    
    // Create directories
    if (!fs.existsSync(LOCAL_DIR)) {
        fs.mkdirSync(LOCAL_DIR, { recursive: true });
        console.log(`✅ Created local directory: ${LOCAL_DIR}`);
    }
    
    console.log(`📁 Google Drive directory: ${GOOGLE_DRIVE_DIR}\n`);
    
    // Check small files
    console.log('📦 Checking small files for local download...');
    for (const file of FILES.small) {
        const url = BASE_URL + file.name;
        const exists = await checkFileExists(url);
        
        if (exists) {
            console.log(`✅ ${file.name} (${file.size}) - Available for download`);
        } else {
            console.log(`❌ ${file.name} (${file.size}) - Not found`);
        }
    }
    
    console.log('\n📦 Large files for Google Drive migration...');
    for (const file of FILES.large) {
        console.log(`📁 ${file.name} (${file.size}) - Move to Google Drive`);
        console.log(`   Description: ${file.description}`);
    }
    
    console.log('\n📋 Migration Plan:');
    console.log('1. Download small files to public/datasets/breakfast/');
    console.log('2. Move large files to Google Drive');
    console.log('3. Create public sharing links for Google Drive files');
    console.log('4. Update Breakfast dataset page with new links');
    
    console.log('\n🔗 Google Drive Setup Instructions:');
    console.log('1. Copy large files to: ~/Google Drive/My Drive/Misc/Web/datasets/breakfast/');
    console.log('2. Right-click each file → Share → Anyone with the link');
    console.log('3. Copy the sharing links');
    console.log('4. Update the Breakfast dataset page with these links');
    
    console.log('\n📝 Files to move to Google Drive:');
    FILES.large.forEach(file => {
        console.log(`   - ${file.name}`);
    });
}

// Run migration
migrateBreakfastDataset().catch(console.error);
