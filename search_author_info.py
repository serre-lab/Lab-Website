#!/usr/bin/env python3
"""
Search for author affiliations and emails online.
"""

import csv
import re
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import quote_plus
import json

def search_author_online(lastname: str, firstname: str) -> tuple:
    """
    Search for author's affiliation and email online.
    Returns (affiliation, email) tuple.
    """
    affiliation = ""
    email = ""
    
    # Construct search queries
    queries = [
        f"{firstname} {lastname} Brown University",
        f"{firstname} {lastname} affiliation",
        f"{firstname} {lastname} email",
        f'"{firstname} {lastname}" site:edu',
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    for query in queries[:2]:  # Limit to first 2 queries to avoid rate limiting
        try:
            # Use DuckDuckGo or Google search
            search_url = f"https://html.duckduckgo.com/html/?q={quote_plus(query)}"
            
            response = requests.get(search_url, headers=headers, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Look for email patterns
                email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
                emails_found = re.findall(email_pattern, response.text)
                
                # Filter for likely academic emails
                for e in emails_found:
                    if any(domain in e.lower() for domain in ['.edu', '.ac.', 'brown.edu']):
                        email = e
                        break
                
                # Look for affiliation keywords
                text = soup.get_text().lower()
                affiliation_keywords = [
                    'brown university',
                    'university of',
                    'mit',
                    'stanford',
                    'harvard',
                    'princeton',
                    'yale',
                    'columbia',
                    'cornell',
                    'institute of technology',
                    'cnrs',
                    'aniti',
                    'ellis',
                ]
                
                for keyword in affiliation_keywords:
                    if keyword in text:
                        # Try to extract the full affiliation
                        idx = text.find(keyword)
                        snippet = text[max(0, idx-50):idx+100]
                        # Clean up the snippet
                        affiliation = snippet.strip()
                        if len(affiliation) > 200:
                            affiliation = affiliation[:200]
                        break
                
                if affiliation or email:
                    break
                    
            time.sleep(1)  # Be respectful with rate limiting
            
        except Exception as e:
            print(f"Error searching for {lastname}, {firstname}: {e}")
            continue
    
    return (affiliation, email)

def main():
    input_file = 'authors_2021_2025.csv'
    output_file = 'authors_2021_2025_with_info.csv'
    
    # Read existing CSV
    authors = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            authors.append(row)
    
    print(f"Searching for information on {len(authors)} authors...")
    print("This may take a while. Progress will be saved incrementally.")
    
    # Process each author
    for i, author in enumerate(authors):
        name = author['Name (Lastname, Firstname)']
        if not name:
            continue
        
        # Skip if already has affiliation
        if author.get('Affiliation'):
            print(f"[{i+1}/{len(authors)}] Skipping {name} (already has affiliation)")
            continue
        
        # Parse name
        match = re.match(r'^([^,]+),\s*(.+)$', name)
        if match:
            lastname = match.group(1).strip()
            firstname = match.group(2).strip()
        else:
            print(f"[{i+1}/{len(authors)}] Could not parse name: {name}")
            continue
        
        print(f"[{i+1}/{len(authors)}] Searching for {name}...")
        
        # Search for affiliation and email
        affiliation, email = search_author_online(lastname, firstname)
        
        if affiliation:
            author['Affiliation'] = affiliation
        if email:
            author['Email'] = email
        
        # Save progress every 10 authors
        if (i + 1) % 10 == 0:
            with open(output_file, 'w', newline='', encoding='utf-8') as f:
                fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(authors)
            print(f"Progress saved: {i+1}/{len(authors)} authors processed")
        
        time.sleep(2)  # Be respectful with rate limiting
    
    # Final save
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(authors)
    
    print(f"\nDone! Results saved to {output_file}")

if __name__ == '__main__':
    main()









