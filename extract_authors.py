#!/usr/bin/env python3
"""
Extract authors from papers published since 2021, find their affiliations and emails,
and create a CSV file with the information.
"""

import json
import re
import csv
from collections import defaultdict
from typing import Dict, Set, Tuple
import requests
from bs4 import BeautifulSoup
import time

def parse_author_string(author_string: str) -> list:
    """
    Parse an author string into individual author names.
    Handles formats like:
    - "T. Serre"
    - "D. Linsley†"
    - "J.W. Linsley"
    - "T. Serre & D. Linsley"
    """
    # Remove special characters like †, ‡
    author_string = re.sub(r'[†‡]', '', author_string)
    
    # Split by comma or ampersand
    authors = re.split(r'[,&]', author_string)
    
    # Clean up each author name
    parsed_authors = []
    for author in authors:
        author = author.strip()
        if not author:
            continue
        
        # Remove trailing periods and extra spaces
        author = re.sub(r'\.+$', '', author).strip()
        
        # Skip if empty after cleaning
        if author:
            parsed_authors.append(author)
    
    return parsed_authors

def normalize_author_name(author: str) -> Tuple[str, str]:
    """
    Convert author name from "Initials. Lastname" to "Lastname, Firstname" format.
    Examples:
    - "T. Serre" -> ("Serre", "T")
    - "J.W. Linsley" -> ("Linsley", "J.W.")
    - "D.A. Linsley" -> ("Linsley", "D.A.")
    """
    author = author.strip()
    
    # Pattern: initials (with dots) followed by lastname
    # Match patterns like "T. Serre", "J.W. Linsley", "D.A. Linsley"
    match = re.match(r'^([A-Z](?:\.[A-Z])*(?:\.[A-Z]+)?)\s+(.+)$', author)
    if match:
        initials = match.group(1)
        lastname = match.group(2).strip()
        # Convert initials to firstname format (keep dots)
        firstname = initials
        return (lastname, firstname)
    
    # If no match, try to split by space
    parts = author.split()
    if len(parts) >= 2:
        # Assume last part is lastname, rest is initials
        lastname = parts[-1]
        firstname = ' '.join(parts[:-1])
        return (lastname, firstname)
    
    # Fallback: assume entire string is lastname
    return (author, "")

def search_author_affiliation_email(lastname: str, firstname: str) -> Tuple[str, str]:
    """
    Search online for author's affiliation and email.
    Returns (affiliation, email) tuple.
    """
    # Construct search query
    search_query = f"{firstname} {lastname} Brown University"
    
    try:
        # Use Google Scholar or university directory search
        # For now, we'll try to search via web
        url = f"https://www.google.com/search?q={search_query.replace(' ', '+')}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=5)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            # This is a simplified approach - in practice, you'd need more sophisticated parsing
            # For now, return empty strings and we'll fill manually or use better APIs
            pass
    except Exception as e:
        print(f"Error searching for {lastname}, {firstname}: {e}")
    
    # Return empty for now - will need manual research or better API
    return ("", "")

def main():
    # Load publications data
    with open('src/data/publications_by_year.json', 'r') as f:
        publications = json.load(f)
    
    # Extract papers from 2021-2025
    years = ['2021', '2022', '2023', '2024', '2025']
    
    # Dictionary to store author info: (lastname, firstname) -> (affiliation, email, latest_year)
    author_info: Dict[Tuple[str, str], Dict[str, any]] = {}
    
    # Process each year
    for year in years:
        if year not in publications:
            continue
        
        year_int = int(year)
        papers = publications[year]
        
        for paper in papers:
            if 'authors' not in paper:
                continue
            
            authors_str = paper['authors']
            parsed_authors = parse_author_string(authors_str)
            
            for author in parsed_authors:
                lastname, firstname = normalize_author_name(author)
                key = (lastname, firstname)
                
                # Update latest publication year
                if key not in author_info:
                    author_info[key] = {
                        'affiliation': '',
                        'email': '',
                        'latest_year': year_int
                    }
                else:
                    author_info[key]['latest_year'] = max(
                        author_info[key]['latest_year'], 
                        year_int
                    )
    
    # Sort authors by lastname, then firstname
    sorted_authors = sorted(author_info.items(), key=lambda x: (x[0][0], x[0][1]))
    
    # Write to CSV
    output_file = 'authors_2021_2025.csv'
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date'])
        
        for (lastname, firstname), info in sorted_authors:
            name = f"{lastname}, {firstname}" if firstname else lastname
            writer.writerow([
                name,
                info['affiliation'],
                info['email'],
                info['latest_year']
            ])
    
    print(f"Extracted {len(sorted_authors)} unique authors")
    print(f"CSV file created: {output_file}")
    print("\nNote: Affiliation and Email columns are empty and need to be filled manually or via API search.")

if __name__ == '__main__':
    main()
