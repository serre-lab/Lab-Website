#!/usr/bin/env node

/**
 * Publication Data Updater
 * Updates publication data to separate official URLs from PDF paths
 */

const fs = require('fs');
const path = require('path');

// Read the current publications data
const publicationsPath = path.join(__dirname, '..', 'src', 'data', 'publications_by_year.json');
const publicationsData = JSON.parse(fs.readFileSync(publicationsPath, 'utf-8'));

// Read the official URLs mapping
const officialUrlsPath = path.join(__dirname, '..', 'src', 'data', 'officialPublicationUrls.js');
const officialUrlsContent = fs.readFileSync(officialUrlsPath, 'utf-8');

// Extract the mapping object from the JS file
const mappingMatch = officialUrlsContent.match(/export const officialPublicationUrls = ({[\s\S]*?});/);
if (!mappingMatch) {
    console.error('Could not extract officialPublicationUrls mapping');
    process.exit(1);
}

const officialUrls = eval(`(${mappingMatch[1]})`);

console.log('🔄 Updating publication data structure...\n');

let updatedCount = 0;
let pdfCount = 0;

// Process each year
Object.keys(publicationsData).forEach(year => {
    console.log(`📅 Processing ${year}...`);
    
    publicationsData[year].forEach((publication, index) => {
        const originalUrl = publication.url;
        
        // Get official URL from mapping
        const officialUrl = officialUrls[publication.title];
        
        // Determine PDF path
        let pdfPath = null;
        if (originalUrl && originalUrl.endsWith('.pdf')) {
            pdfPath = originalUrl;
            pdfCount++;
        }
        
        // Update the publication object
        const updatedPublication = {
            ...publication,
            url: officialUrl || (originalUrl && !originalUrl.endsWith('.pdf') ? originalUrl : null),
            pdfPath: pdfPath
        };
        
        // Only update if there's a change
        if (updatedPublication.url !== originalUrl || updatedPublication.pdfPath) {
            publicationsData[year][index] = updatedPublication;
            updatedCount++;
            
            console.log(`  ✅ ${publication.title}`);
            if (officialUrl) {
                console.log(`     Official: ${officialUrl}`);
            }
            if (pdfPath) {
                console.log(`     PDF: ${pdfPath}`);
            }
        }
    });
});

// Write updated data back
fs.writeFileSync(publicationsPath, JSON.stringify(publicationsData, null, 2));

console.log(`\n📊 Summary:`);
console.log(`  Publications updated: ${updatedCount}`);
console.log(`  PDFs found: ${pdfCount}`);
console.log(`  Official URLs mapped: ${Object.keys(officialUrls).length}`);

console.log('\n✅ Publication data structure updated!');
console.log('\nNext steps:');
console.log('1. Review the updated publications data');
console.log('2. Add missing official URLs to officialPublicationUrls.js');
console.log('3. Download missing PDFs to /papers/ directory');
console.log('4. Test the Publications page');

