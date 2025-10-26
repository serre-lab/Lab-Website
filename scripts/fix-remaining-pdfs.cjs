const fs = require('fs');

// Read the publications data
const publicationsData = JSON.parse(fs.readFileSync('src/data/publications_by_year.json', 'utf8'));

// Manual mappings for the 3 missing PDFs
const pdfMappings = {
    'TDP-43 gains function due to perturbed auto-regulation in a Tardbp knock-in mouse model of ALS-FTD': '/papers/tdp43-gains-function-als-ftd-2018.pdf',
    "Don't lie to me! Robust and efficient explainability with verified perturbation analysis": '/papers/dont-lie-to-me-explainability-2023.pdf',
    'Translesional stimulation replaces lost function in persons with paraplegia': '/papers/parker-epidural-paddle-array-2025.pdf'
};

console.log('🔧 Fixing the 3 remaining PDFs...\n');

let updatedCount = 0;

Object.keys(publicationsData).forEach(year => {
    publicationsData[year].forEach((publication, index) => {
        if (pdfMappings[publication.title] && (!publication.pdfPath || publication.pdfPath === '')) {
            const oldPdfPath = publication.pdfPath;
            publication.pdfPath = pdfMappings[publication.title];
            updatedCount++;
            console.log(`✅ ${publication.title.substring(0, 70)}`);
            console.log(`   PDF: ${pdfMappings[publication.title]}`);
        }
    });
});

console.log(`\n📊 Updated ${updatedCount} publications`);

// Write updated data back
fs.writeFileSync('src/data/publications_by_year.json', JSON.stringify(publicationsData, null, 2));

console.log('\n✅ Done! All PDFs should now be linked.');

