const fs = require('fs');
const { execSync } = require('child_process');

// Read the publications data
const publicationsData = JSON.parse(fs.readFileSync('src/data/publications_by_year.json', 'utf8'));

// Get all PDF files
const pdfFiles = fs.readdirSync('public/papers/').filter(file => file.endsWith('.pdf'));

console.log(`📚 Found ${pdfFiles.length} PDF files\n`);
console.log(`📝 Processing ${Object.values(publicationsData).flat().length} publications\n`);

// Create a comprehensive mapping
const titleToPdfMap = {};

// Get the OLD publications data before the URL restructuring
try {
    const oldData = execSync('git show c9eb7fe:src/data/publications_by_year.json', { encoding: 'utf8' });
    const oldPublications = JSON.parse(oldData);
    
    console.log('📖 Reading old publication data...\n');
    
    Object.keys(oldPublications).forEach(year => {
        oldPublications[year].forEach(pub => {
            if (pub.url && pub.url.includes('.pdf')) {
                // Extract the filename from URL
                const urlParts = pub.url.split('/');
                const filename = urlParts[urlParts.length - 1];
                
                // Check if this PDF file exists
                if (pdfFiles.includes(filename)) {
                    titleToPdfMap[pub.title] = `/papers/${filename}`;
                } else if (pub.url.startsWith('http://serre-lab.clps.brown.edu')) {
                    // Keep remote URLs for old papers
                    titleToPdfMap[pub.title] = pub.url;
                }
            }
        });
    });
    
    console.log(`✅ Found ${Object.keys(titleToPdfMap).length} PDF mappings from old data\n`);
} catch (error) {
    console.log('⚠️  Could not read old data, trying alternate approach...\n');
}

// Manual mapping for newer papers based on known patterns
const manualMappings = {
    'Better artificial intelligence does not mean better models of biology': '/papers/better-ai-better-models-biology-2025.pdf',
    'Local vs distributed representations: What is the right basis for interpretability?': '/papers/local-vs-distributed-representations-interpretability-2025.pdf',
    'Enhancing deep neural networks through complex-valued representations and Kuramoto synchronization dynamics': '/papers/enhancing-deep-neural-networks-complex-valued-kuramoto-2025.pdf',
    'Tracking objects that change in appearance with phase synchrony': '/papers/tracking-objects-phase-synchrony-2025.pdf',
    'The 3D-PC: A benchmark for visual perspective taking in humans and machines': '/papers/3d-pc-benchmark-visual-perspective-taking-2025.pdf',
    'Beyond adversarial robustness: Breaking the robustness-alignment trade-off in object recognition': '/papers/beyond-adversarial-robustness-trade-off-2025.pdf',
    'Feature binding in biological and artificial vision': '/papers/feature-binding-biological-artificial-vision-2025.pdf',
    'From prediction to understanding: Will AI foundation models transform brain science?': '/papers/from-prediction-to-understanding-ai-foundation-models-2025.pdf',
    'An active electronic, high-density epidural paddle array for chronic spinal cord neuromodulation': '/papers/parker-epidural-paddle-array-2025.pdf',
};

Object.assign(titleToPdfMap, manualMappings);

// Now update the publications
let updatedCount = 0;

Object.keys(publicationsData).forEach(year => {
    publicationsData[year].forEach((publication, index) => {
        if (titleToPdfMap[publication.title] && (!publication.pdfPath || publication.pdfPath === '')) {
            const oldPdfPath = publication.pdfPath;
            publication.pdfPath = titleToPdfMap[publication.title];
            updatedCount++;
            console.log(`✅ ${publication.title.substring(0, 60)}`);
            console.log(`   PDF: ${titleToPdfMap[publication.title]}`);
        }
    });
});

console.log(`\n📊 Updated ${updatedCount} publications`);

// Write updated data back
fs.writeFileSync('src/data/publications_by_year.json', JSON.stringify(publicationsData, null, 2));

console.log('\n✅ Done! Publications data updated.');

