#!/usr/bin/env python3
"""
Shorten affiliations and keep only the latest/primary one.
"""

import csv
import re

def shorten_affiliation(affiliation):
    """Shorten affiliation to a concise format."""
    if not affiliation:
        return ""
    
    # If multiple affiliations separated by ";", take the first one
    if ";" in affiliation:
        affiliation = affiliation.split(";")[0].strip()
    
    # Common abbreviations and shortenings
    replacements = {
        r'Brown University': 'Brown University',
        r'Harvard University \(Kempner Institute\)': 'Harvard University',
        r'University of Pennsylvania': 'University of Pennsylvania',
        r'Penn State University': 'Penn State University',
        r'New York University': 'NYU',
        r'Northeastern University': 'Northeastern University',
        r'Purdue University / UC Irvine': 'Purdue University',
        r'Netherlands Institute for Neuroscience': 'Netherlands Institute for Neuroscience',
        r'Smithsonian National Museum of Natural History \(retired 2024\)': 'Smithsonian (retired)',
        r'Smithsonian Institution': 'Smithsonian',
        r'Smithsonian': 'Smithsonian',
        r'Field Museum \(formerly Cleveland Museum of Natural History\)': 'Field Museum',
        r'Field Museum': 'Field Museum',
        r'Cornell University': 'Cornell University',
        r'Yale Peabody Museum': 'Yale University',
        r'Florissant Fossil Beds National Monument': 'Florissant Fossil Beds',
        r'Gladstone Institutes': 'Gladstone Institutes',
        r'CerCo, CNRS, Toulouse': 'CNRS CerCo, Toulouse',
        r'CNRS, CerCo, Toulouse': 'CNRS CerCo, Toulouse',
        r'ANITI, Brown University': 'ANITI / Brown University',
        r'ANITI, ELLIS Alicante': 'ANITI / ELLIS Alicante',
        r'ANITI; ANITI, ELLIS Alicante': 'ANITI / ELLIS Alicante',
        r'ANITI': 'ANITI',
        r'Sorbonne University, Valeo\.ai': 'Sorbonne University',
        r'Hugging Face \(formerly Tesla, Sorbonne University\)': 'Hugging Face',
        r'Museo Paleontológico Egidio Feruglio \(MEF\), Argentina / CONICET': 'MEF, Argentina',
        r'Institut Imagine, Paris \(formerly Brown University\)': 'Institut Imagine, Paris',
        r'Osnabrück University \(formerly Brown University\)': 'Osnabrück University',
        r'Hackensack Meridian Health \(formerly Brown University\)': 'Hackensack Meridian Health',
        r'Harvard Medical School': 'Harvard Medical School',
    }
    
    # Apply replacements
    for pattern, replacement in replacements.items():
        affiliation = re.sub(pattern, replacement, affiliation, flags=re.IGNORECASE)
    
    # Remove extra whitespace
    affiliation = re.sub(r'\s+', ' ', affiliation).strip()
    
    # If still very long, truncate intelligently
    if len(affiliation) > 80:
        # Try to keep the main institution name
        # Look for patterns like "Institution, Location" and keep just "Institution"
        match = re.match(r'^([^,]+(?:University|Institute|College|Hospital|Museum|Center|Centre))', affiliation)
        if match:
            affiliation = match.group(1)
        else:
            # Just truncate
            affiliation = affiliation[:80] + "..."
    
    return affiliation

def main():
    input_file = 'authors_2021_2025_final.csv'
    output_file = 'authors_2021_2025_final.csv'
    
    # Read CSV
    authors = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            authors.append(row)
    
    # Process each author
    updated = 0
    for author in authors:
        affiliation = author.get('Affiliation', '')
        if affiliation:
            shortened = shorten_affiliation(affiliation)
            if shortened != affiliation:
                author['Affiliation'] = shortened
                updated += 1
    
    # Write back
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(authors)
    
    print(f"Updated {updated} affiliations")
    print(f"Total authors: {len(authors)}")

if __name__ == '__main__':
    main()











