const fs = require('fs');
const path = require('path');

// Read the publications data
const publicationsData = JSON.parse(fs.readFileSync('src/data/publications_by_year.json', 'utf8'));

// Read the official URLs (it's a JS file, so we need to extract the object)
const officialUrlsContent = fs.readFileSync('src/data/officialPublicationUrls.js', 'utf8');
// Extract the object from the JS file (simple approach)
const officialUrlsMatch = officialUrlsContent.match(/export const officialPublicationUrls = ({[\s\S]*?});/);
let officialUrls = {};
if (officialUrlsMatch) {
    try {
        // Replace the JS object syntax with JSON syntax
        let jsonString = officialUrlsMatch[1]
            .replace(/(\w+):/g, '"$1":') // Add quotes around keys
            .replace(/'/g, '"'); // Replace single quotes with double quotes
        officialUrls = JSON.parse(jsonString);
    } catch (e) {
        console.log('Warning: Could not parse officialPublicationUrls.js');
    }
}

console.log('🔍 CHECKING PUBLICATIONS FOR MISSING LINKS AND PDFs\n');

let totalPublications = 0;
let missingOfficialLinks = 0;
let missingPDFs = 0;
let issues = [];

// Function to check if a URL is accessible (basic check)
function isUrlValid(url) {
    if (!url) return false;
    if (url.startsWith('http://') || url.startsWith('https://')) return true;
    if (url.startsWith('/')) return true; // Local path
    return false;
}

// Function to check if PDF exists locally
function checkLocalPDF(pdfPath) {
    if (!pdfPath) return false;
    if (pdfPath.startsWith('http://') || pdfPath.startsWith('https://')) {
        // External PDF - assume it exists
        return true;
    }
    if (pdfPath.startsWith('/papers/')) {
        // Local PDF path
        const localPath = path.join('public', pdfPath);
        return fs.existsSync(localPath);
    }
    return false;
}

// Process each year
Object.entries(publicationsData).forEach(([year, publications]) => {
    console.log(`\n📅 ${year} (${publications.length} publications)`);
    
    publications.forEach((pub, index) => {
        totalPublications++;
        const pubNum = index + 1;
        
        // Check for official URL
        const hasOfficialUrl = officialUrls[pub.title] || 
                             (pub.url && !pub.url.endsWith('.pdf') && !pub.url.includes('/papers/'));
        
        // Check for PDF
        const hasPDF = pub.pdfPath || (pub.url && pub.url.endsWith('.pdf'));
        const pdfExists = checkLocalPDF(pub.pdfPath || pub.url);
        
        // Report issues
        if (!hasOfficialUrl) {
            missingOfficialLinks++;
            issues.push({
                year,
                title: pub.title,
                issue: 'Missing official link',
                journal: pub.journal,
                authors: pub.authors
            });
            console.log(`  ❌ ${pubNum}. "${pub.title}" - Missing official link`);
        } else if (!hasPDF) {
            missingPDFs++;
            issues.push({
                year,
                title: pub.title,
                issue: 'Missing PDF',
                journal: pub.journal,
                authors: pub.authors
            });
            console.log(`  📄 ${pubNum}. "${pub.title}" - Missing PDF`);
        } else {
            console.log(`  ✅ ${pubNum}. "${pub.title}" - OK`);
        }
    });
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY');
console.log('='.repeat(60));
console.log(`Total publications: ${totalPublications}`);
console.log(`Missing official links: ${missingOfficialLinks}`);
console.log(`Missing PDFs: ${missingPDFs}`);
console.log(`Total issues: ${issues.length}`);

if (issues.length > 0) {
    console.log('\n🚨 ISSUES TO FIX:');
    console.log('='.repeat(60));
    
    // Group by issue type
    const byIssue = {};
    issues.forEach(issue => {
        if (!byIssue[issue.issue]) byIssue[issue.issue] = [];
        byIssue[issue.issue].push(issue);
    });
    
    Object.entries(byIssue).forEach(([issueType, pubs]) => {
        console.log(`\n${issueType} (${pubs.length} publications):`);
        pubs.forEach(pub => {
            console.log(`  • ${pub.year}: "${pub.title}"`);
            console.log(`    Journal: ${pub.journal}`);
            console.log(`    Authors: ${pub.authors}`);
            console.log('');
        });
    });
}

console.log('\n✅ Analysis complete!');
