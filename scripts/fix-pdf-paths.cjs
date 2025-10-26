const fs = require('fs');
const path = require('path');

// Read the publications data
const publicationsData = JSON.parse(fs.readFileSync('src/data/publications_by_year.json', 'utf8'));

// Read the CSV mapping
const csvContent = fs.readFileSync('publication_issues_detailed.csv', 'utf8');
const lines = csvContent.split('\n').slice(1).filter(line => line.trim());

// Create a mapping from title to pdfPath
const pdfPathMap = {};
lines.forEach(line => {
    const parts = line.split(',');
    if (parts.length >= 6 && parts[5] && parts[5] !== 'NONE' && parts[5] !== 'MISSING') {
        const title = parts[1];
        let pdfPath = parts[5];
        
        // Clean up the PDF path
        if (pdfPath.includes('http://serre-lab.clps.brown.edu')) {
            // Keep remote URLs as is
        } else if (pdfPath.startsWith('/papers/')) {
            // Already in correct format
        } else if (pdfPath.endsWith('.pdf')) {
            // Convert to /papers/ format if not already
            const filename = pdfPath.split('/').pop();
            pdfPath = `/papers/${filename}`;
        }
        
        pdfPathMap[title] = pdfPath;
    }
});

console.log(`📚 Found ${Object.keys(pdfPathMap).length} PDF mappings\n`);

// Process each publication
let updatedCount = 0;

Object.keys(publicationsData).forEach(year => {
    publicationsData[year].forEach((publication, index) => {
        const title = publication.title;
        
        if (pdfPathMap[title] && (!publication.pdfPath || publication.pdfPath === '')) {
            const oldPdfPath = publication.pdfPath;
            publication.pdfPath = pdfPathMap[title];
            updatedCount++;
            console.log(`✅ ${title}`);
            console.log(`   Updated pdfPath: ${oldPdfPath} → ${pdfPathMap[title]}`);
        }
    });
});

console.log(`\n📊 Updated ${updatedCount} publications`);

// Write updated data back
fs.writeFileSync('src/data/publications_by_year.json', JSON.stringify(publicationsData, null, 2));

console.log('\n✅ Done! Publications data updated.');

