#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the publications data
const publicationsPath = path.join(__dirname, '..', 'src', 'data', 'publications_by_year.json');
const publicationsData = JSON.parse(fs.readFileSync(publicationsPath, 'utf8'));

// Function to fix author formatting
function fixAuthorFormatting(authors) {
    if (!authors || typeof authors !== 'string') {
        return authors;
    }
    
    // Split by commas, but be careful about commas within parentheses
    let parts = [];
    let current = '';
    let parenDepth = 0;
    
    for (let i = 0; i < authors.length; i++) {
        const char = authors[i];
        if (char === '(') parenDepth++;
        if (char === ')') parenDepth--;
        
        if (char === ',' && parenDepth === 0) {
            parts.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    if (current.trim()) {
        parts.push(current.trim());
    }
    
    // If we only have one part, return as is
    if (parts.length <= 1) {
        return authors;
    }
    
    // Clean up each part
    parts = parts.map(part => part.trim());
    
    // Check if the last part already has "&" or "and"
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('&') || lastPart.toLowerCase().includes(' and ')) {
        return authors; // Already formatted correctly
    }
    
    // Join all but the last part with commas, then add "&" before the last part
    if (parts.length === 2) {
        return `${parts[0]} & ${parts[1]}`;
    } else {
        const firstParts = parts.slice(0, -1).join(', ');
        const lastPart = parts[parts.length - 1];
        return `${firstParts} & ${lastPart}`;
    }
}

// Process all publications
let changesCount = 0;
for (const [year, publications] of Object.entries(publicationsData)) {
    for (const publication of publications) {
        if (publication.authors) {
            const originalAuthors = publication.authors;
            const fixedAuthors = fixAuthorFormatting(originalAuthors);
            if (originalAuthors !== fixedAuthors) {
                console.log(`Fixed: "${originalAuthors}" -> "${fixedAuthors}"`);
                publication.authors = fixedAuthors;
                changesCount++;
            }
        }
    }
}

// Write back to file
fs.writeFileSync(publicationsPath, JSON.stringify(publicationsData, null, 2));

console.log(`\nFixed ${changesCount} author formatting issues.`);
