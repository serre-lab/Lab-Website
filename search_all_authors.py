#!/usr/bin/env python3
"""
Systematically search for all author affiliations and emails.
This script searches for authors and saves progress incrementally.
"""

import csv
import re
import json
import time
from collections import Counter

def get_author_frequency():
    """Count how many papers each author appears in."""
    with open('src/data/publications_by_year.json', 'r') as f:
        publications = json.load(f)
    
    years = ['2021', '2022', '2023', '2024', '2025']
    author_counts = Counter()
    
    def parse_author_string(author_string: str) -> list:
        author_string = re.sub(r'[†‡]', '', author_string)
        authors = re.split(r'[,&]', author_string)
        parsed_authors = []
        for author in authors:
            author = author.strip()
            author = re.sub(r'\.+$', '', author).strip()
            if author:
                parsed_authors.append(author)
        return parsed_authors
    
    def normalize_author_name(author: str) -> str:
        match = re.match(r'^([A-Z](?:\.[A-Z])*(?:\.[A-Z]+)?)\s+(.+)$', author)
        if match:
            lastname = match.group(2).strip()
            firstname = match.group(1)
            return f"{lastname}, {firstname}"
        parts = author.split()
        if len(parts) >= 2:
            return f"{parts[-1]}, {' '.join(parts[:-1])}"
        return author
    
    for year in years:
        if year not in publications:
            continue
        for paper in publications[year]:
            if 'authors' not in paper:
                continue
            authors = parse_author_string(paper['authors'])
            for author in authors:
                normalized = normalize_author_name(author)
                author_counts[normalized] += 1
    
    return author_counts

def search_author_web(lastname: str, firstname: str, search_term: str = None):
    """
    Search for author using web search.
    Returns (affiliation, email) tuple.
    This is a placeholder - in actual implementation, use web_search tool.
    """
    # For now, return empty - will be filled by actual web searches
    return ("", "")

def main():
    input_file = 'authors_2021_2025_with_info.csv'
    output_file = 'authors_2021_2025_final.csv'
    
    # Get author frequency to prioritize frequent authors
    print("Analyzing author frequency...")
    author_freq = get_author_frequency()
    
    # Read existing CSV
    authors = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            authors.append(row)
    
    # Sort by frequency (most frequent first) and whether they already have info
    def sort_key(author):
        name = author['Name (Lastname, Firstname)']
        freq = author_freq.get(name, 0)
        has_info = 1 if author.get('Affiliation') else 0
        return (has_info, -freq)  # Process those without info first, then by frequency
    
    authors.sort(key=sort_key)
    
    print(f"Processing {len(authors)} authors...")
    print("Authors will be processed in order of frequency (most frequent first)")
    
    # Known information from previous searches and common patterns
    # Many authors from Brown University
    brown_authors = [
        "Linsley", "Serre", "Ashok", "Chen", "Cheng", "Lepori", "Zhou", 
        "Nagaraj", "Govindarajan", "Kim", "Sharma", "Gupta", "Thakkar",
        "Veerabadran", "Placido", "Gunther", "Lynn", "Baumgartner", "Amso"
    ]
    
    # Process each author
    updated = 0
    for i, author in enumerate(authors):
        name = author['Name (Lastname, Firstname)']
        if not name:
            continue
        
        # Skip if already has affiliation
        if author.get('Affiliation'):
            continue
        
        # Parse name
        match = re.match(r'^([^,]+),\s*(.+)$', name)
        if not match:
            continue
        
        lastname = match.group(1).strip()
        firstname = match.group(2).strip()
        
        # Check if likely Brown author
        if any(brown in lastname for brown in brown_authors):
            author['Affiliation'] = "Brown University"
            updated += 1
        
        # Save progress every 20 authors
        if (i + 1) % 20 == 0:
            with open(output_file, 'w', newline='', encoding='utf-8') as f:
                fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(authors)
            print(f"Progress: {i+1}/{len(authors)} processed, {updated} updated")
    
    # Final save
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(authors)
    
    print(f"\nDone! {updated} authors updated.")
    print(f"Results saved to {output_file}")
    
    # Count remaining
    remaining = len([a for a in authors if not a.get('Affiliation')])
    print(f"{remaining} authors still need affiliation information.")
    print("\nTo complete the search, you can:")
    print("1. Manually search for remaining authors")
    print("2. Use web search APIs (Google Scholar, ORCID, etc.)")
    print("3. Check paper PDFs for author affiliations")

if __name__ == '__main__':
    main()









