#!/usr/bin/env python3
"""
Extract author affiliations from PDF papers published 2021-2025.
"""

import json
import csv
import re
import os
import subprocess
from collections import defaultdict

def extract_text(pdf_path):
    """Extract text from PDF using pdftotext command-line tool."""
    if not os.path.exists(pdf_path):
        return ""
    
    try:
        result = subprocess.run(
            ['pdftotext', '-layout', pdf_path, '-'],
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            return result.stdout
        else:
            print(f"  pdftotext error for {pdf_path}: {result.stderr}")
            return ""
    except subprocess.TimeoutExpired:
        print(f"  Timeout extracting text from {pdf_path}")
        return ""
    except Exception as e:
        print(f"  Error extracting text from {pdf_path}: {e}")
        return ""

def find_affiliations_in_text(text, authors_list):
    """
    Find affiliations in PDF text.
    Looks for common patterns like:
    - Author names followed by affiliations
    - Affiliation markers (1, 2, 3, a, b, c, etc.)
    - Department/University patterns
    """
    affiliations = {}
    
    if not text:
        return affiliations
    
    # Get first 8000 characters (usually contains title page with affiliations)
    first_part = text[:8000]
    
    # Extract last names from authors
    author_lastnames = {}
    for author in authors_list:
        lastname_match = re.search(r'([A-Z][a-z]+)', author)
        if lastname_match:
            lastname = lastname_match.group(1)
            author_lastnames[author] = lastname
    
    # First, extract all affiliations with their markers
    # Look for patterns like: "1Text..." or "USA. 2Text..." or "\n2Text..."
    all_affiliations = {}  # marker -> affiliation
    
    # Find all markers and their affiliations
    marker_pattern = r'([.,;]\s*|^|\s)([0-9]+)([A-Z][^0-9\n]*(?:University|Institute|College|Hospital|Museum|Center|Centre|Department|Laboratory|Lab|CNRS|ANITI|CerCo)[^\n]*)'
    marker_matches = list(re.finditer(marker_pattern, first_part, re.MULTILINE | re.IGNORECASE))
    
    for match in marker_matches:
        marker = match.group(2)
        affil_text = match.group(3).strip()
        # Clean up
        affil_text = re.sub(r'\s+', ' ', affil_text)
        # Stop at next marker
        affil_text = re.split(r'\s+[0-9]+[A-Z]', affil_text)[0]
        affil_text = re.sub(r'[.,;]+$', '', affil_text)
        if len(affil_text) > 10 and len(affil_text) < 200:
            all_affiliations[marker] = affil_text
    
    # Also look for first affiliation (no marker, usually before first numbered one)
    # Find text before first numbered affiliation that contains institution keywords
    if marker_matches:
        first_marker_pos = marker_matches[0].start()
        before_first = first_part[:first_marker_pos]
        # Look for affiliation-like text
        first_affil_match = re.search(r'([A-Z][^0-9\n]*(?:University|Institute|College|Hospital|Museum|Center|Centre|Department|Laboratory|Lab|CNRS|ANITI|CerCo)[^\n]*)', before_first, re.IGNORECASE)
        if first_affil_match:
            first_affil = first_affil_match.group(1).strip()
            first_affil = re.sub(r'\s+', ' ', first_affil)
            first_affil = re.sub(r'[.,;]+$', '', first_affil)
            if len(first_affil) > 10 and len(first_affil) < 200:
                all_affiliations['1'] = first_affil  # Assign to marker 1
    
    # Now match authors to affiliations using their markers
    for author, lastname in author_lastnames.items():
        # Look for lastname followed by a number (affiliation marker)
        pattern = rf'{re.escape(lastname)}\s*([0-9]+)'
        matches = list(re.finditer(pattern, first_part, re.IGNORECASE))
        
        if matches:
            # Get all markers for this author
            markers = set()
            for match in matches:
                markers.add(match.group(1))
            
            # Match to affiliations
            for marker in markers:
                if marker in all_affiliations:
                    affil = all_affiliations[marker]
                    if author not in affiliations:
                        affiliations[author] = affil
                    else:
                        if affil not in affiliations[author]:
                            affiliations[author] += "; " + affil
    
    # Pattern 2: Look for affiliation blocks (common in some paper formats)
    # Find all lines that look like affiliations (contain institution keywords)
    lines = first_part.split('\n')
    affiliation_candidates = []
    
    institution_keywords = [
        'University', 'Institute', 'College', 'Hospital', 'Museum',
        'Center', 'Centre', 'Department', 'Laboratory', 'Lab',
        'Brown', 'Harvard', 'MIT', 'Stanford', 'Yale', 'Cornell',
        'Penn State', 'Smithsonian', 'Field Museum', 'Gladstone',
        'CNRS', 'Sorbonne', 'ANITI', 'CerCo', 'Toulouse'
    ]
    
    for i, line in enumerate(lines):
        line_clean = line.strip()
        if len(line_clean) > 15 and len(line_clean) < 250:
            if any(keyword.lower() in line_clean.lower() for keyword in institution_keywords):
                # Check if it starts with a number (affiliation marker)
                if re.match(r'^[0-9]+', line_clean):
                    affiliation_candidates.append((i, line_clean))
                # Or if it's clearly an affiliation line
                elif any(word in line_clean for word in ['University', 'Institute', 'Department', 'Center', 'Centre']):
                    affiliation_candidates.append((i, line_clean))
    
    # Match authors to affiliations using markers
    if not affiliations and affiliation_candidates:
        for author, lastname in author_lastnames.items():
            # Find author with marker
            pattern = rf'{re.escape(lastname)}\s*([0-9]+)'
            match = re.search(pattern, first_part, re.IGNORECASE)
            if match:
                marker = match.group(1)
                # Find affiliation starting with this marker
                for _, affil_line in affiliation_candidates:
                    if re.match(rf'^{marker}[^a-zA-Z]', affil_line):
                        affil = re.sub(rf'^{marker}[^a-zA-Z0-9]*', '', affil_line).strip()
                        if len(affil) > 10:
                            affiliations[author] = affil
                            break
    
    return affiliations

def main():
    # Load publications
    with open('src/data/publications_by_year.json', 'r') as f:
        publications = json.load(f)
    
    years = ['2021', '2022', '2023', '2024', '2025']
    
    # Load current CSV
    authors_dict = {}
    with open('authors_2021_2025_final.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row['Name (Lastname, Firstname)'].strip('"')
            authors_dict[name] = row
    
    # Process each paper
    papers_processed = 0
    affiliations_found = defaultdict(set)
    
    for year in years:
        if year not in publications:
            continue
        
        for paper in publications[year]:
            if 'pdfPath' not in paper or not paper['pdfPath']:
                continue
            
            pdf_path = paper['pdfPath']
            # Convert /papers/... to public/papers/...
            if pdf_path.startswith('/'):
                pdf_path = pdf_path[1:]
            full_path = os.path.join('public', pdf_path)
            
            if not os.path.exists(full_path):
                print(f"PDF not found: {full_path}")
                continue
            
            print(f"Processing: {full_path}")
            
            # Extract text
            text = extract_text(full_path)
            if not text:
                print(f"  Could not extract text from {full_path}")
                continue
            
            # Get authors from paper
            authors_str = paper.get('authors', '')
            if not authors_str:
                continue
            
            # Parse authors
            authors_str = re.sub(r'[†‡]', '', authors_str)
            authors = re.split(r'[,&]', authors_str)
            authors = [a.strip() for a in authors if a.strip()]
            
            # Find affiliations in text
            paper_affiliations = find_affiliations_in_text(text, authors)
            
            # Match to CSV authors
            for author in authors:
                # Normalize author name
                match = re.match(r'^([A-Z](?:\.[A-Z])*(?:\.[A-Z]+)?)\s+(.+)$', author)
                if match:
                    lastname = match.group(2).strip()
                    firstname = match.group(1)
                    csv_name = f"{lastname}, {firstname}"
                    
                    if csv_name in authors_dict:
                        if csv_name in paper_affiliations:
                            affiliations_found[csv_name].add(paper_affiliations[csv_name])
            
            papers_processed += 1
    
    print(f"\nProcessed {papers_processed} papers")
    print(f"Found affiliations for {len(affiliations_found)} authors")
    
    # Update CSV
    updated = 0
    for name, affil_set in affiliations_found.items():
        if name in authors_dict and not authors_dict[name].get('Affiliation'):
            # Use the most common affiliation or first one
            affil = list(affil_set)[0] if affil_set else ""
            if affil:
                authors_dict[name]['Affiliation'] = affil
                updated += 1
                print(f"  {name}: {affil}")
    
    # Save updated CSV
    with open('authors_2021_2025_final.csv', 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for name in sorted(authors_dict.keys()):
            writer.writerow(authors_dict[name])
    
    print(f"\nUpdated {updated} authors with affiliations from PDFs")

if __name__ == '__main__':
    main()









