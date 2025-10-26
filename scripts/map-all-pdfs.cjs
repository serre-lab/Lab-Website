const fs = require('fs');
const path = require('path');

// Read the publications data
const publicationsData = JSON.parse(fs.readFileSync('src/data/publications_by_year.json', 'utf8'));

// Get all PDF files
const pdfFiles = fs.readdirSync('public/papers/').filter(file => file.endsWith('.pdf'));

// Create a mapping of simplified titles to PDF files
function simplifyTitle(title) {
    return title.toLowerCase()
        .replace(/[^\w\s]/g, ' ')  // Replace punctuation with spaces
        .replace(/\s+/g, ' ')        // Normalize whitespace
        .trim()
        .substring(0, 80);           // Limit length
}

// Create title to PDF mapping
const pdfMap = {};

// First, try to create a mapping based on the title
Object.keys(publicationsData).forEach(year => {
    publicationsData[year].forEach((pub, index) => {
        const simpleTitle = simplifyTitle(pub.title);
        
        // Try to find a matching PDF file
        for (const pdfFile of pdfFiles) {
            const simplePdfName = pdfFile.toLowerCase()
                .replace('.pdf', '')
                .replace(/-/g, ' ')
                .replace(/_/g, ' ')
                .trim();
            
            // Check if the PDF filename contains keywords from the title
            const titleWords = simpleTitle.split(' ').filter(w => w.length > 3);
            const matchingWords = titleWords.filter(word => simplePdfName.includes(word)).length;
            
            // If at least 40% of significant words match, consider it a match
            if (matchingWords >= Math.max(1, Math.floor(titleWords.length * 0.4))) {
                if (!pdfMap[pub.title]) {
                    pdfMap[pub.title] = pdfFile;
                }
            }
        }
    });
});

console.log(`Found ${Object.keys(pdfMap).length} potential PDF matches\n`);

// Update publications
let updatedCount = 0;

Object.keys(publicationsData).forEach(year => {
    publicationsData[year].forEach((publication, index) => {
        if (pdfMap[publication.title] && (!publication.pdfPath || publication.pdfPath === '')) {
            const oldPdfPath = publication.pdfPath;
            publication.pdfPath = `/papers/${pdfMap[publication.title]}`;
            updatedCount++;
            console.log(`✅ ${publication.title.substring(0, 60)}`);
            console.log(`   PDF: ${pdfMap[publication.title]}`);
        }
    });
});

console.log(`\n📊 Updated ${updatedCount} publications`);

// Write updated data back
fs.writeFileSync('src/data/publications_by_year.json', JSON.stringify(publicationsData, null, 2));

console.log('\n✅ Done! Publications data updated.');

