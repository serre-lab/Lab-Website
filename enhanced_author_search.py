#!/usr/bin/env python3
"""
Enhanced script to search for author affiliations and emails.
Uses existing people.json data and web search for missing information.
"""

import csv
import json
import re
import time
from typing import Dict, Tuple, Optional

def load_people_data() -> Dict[str, Dict]:
    """Load people.json and create a lookup dictionary."""
    try:
        with open('src/data/people.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        people_lookup = {}
        for person in data.get('people', []):
            full_name = person.get('fullName', '')
            # Create variations of the name for matching
            name_parts = full_name.split()
            if len(name_parts) >= 2:
                lastname = name_parts[-1]
                firstname = name_parts[0]
                # Create key variations
                key1 = f"{lastname}, {firstname[0]}."
                key2 = f"{lastname}, {firstname}"
                key3 = full_name
                
                people_lookup[key1] = {
                    'affiliation': person.get('university', ''),
                    'email': '',  # Not in people.json
                    'full_name': full_name
                }
                people_lookup[key2] = people_lookup[key1]
                people_lookup[key3] = people_lookup[key1]
        
        return people_lookup
    except Exception as e:
        print(f"Error loading people.json: {e}")
        return {}

def normalize_name_for_matching(name: str) -> str:
    """Normalize name for matching purposes."""
    # Remove extra spaces, normalize case
    name = ' '.join(name.split())
    return name

def search_author_simple(lastname: str, firstname: str) -> Tuple[str, str]:
    """
    Simple search - for now returns empty, but can be enhanced with web search.
    In a real implementation, this would use web_search tool or API.
    """
    # This is a placeholder - actual implementation would use web search
    # For now, we'll rely on people.json and manual updates
    return ("", "")

def main():
    input_file = 'authors_2021_2025.csv'
    output_file = 'authors_2021_2025_with_info.csv'
    
    # Load people data
    people_lookup = load_people_data()
    print(f"Loaded {len(people_lookup)} people from people.json")
    
    # Read existing CSV
    authors = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            authors.append(row)
    
    print(f"Processing {len(authors)} authors...")
    
    # Known affiliations from web search (manually curated for key authors)
    known_affiliations = {
        "Linsley, D.": ("Brown University", ""),
        "Linsley, D.A.": ("Brown University", ""),
        "Linsley, J.W.": ("", ""),
        "Fel, T.": ("Harvard University (Kempner Institute)", "tfel@g.harvard.edu"),
        "Boutin, V.": ("CNRS, CerCo, Toulouse", ""),
        "Serre, T.": ("Brown University", ""),
        "Ashok, A.K.": ("Brown University", ""),
        "Chen, S.": ("Brown University", ""),
        "Cheng, Y.": ("Brown University", ""),
        "Lepori, M.A.": ("Brown University", ""),
        "Zhou, P.": ("Brown University", ""),
        "Nagaraj, A.": ("Brown University", ""),
        "Colin, J.": ("ANITI, ELLIS Alicante", ""),
        "Colin, J.": ("ANITI, ELLIS Alicante", ""),
        "Govindarajan, L.N.": ("Brown University", ""),
        "VanRullen, R.": ("CerCo, CNRS, Toulouse", ""),
        "Alamia, A.": ("CerCo, CNRS, Toulouse", ""),
        "Muzellec, S.": ("CerCo, CNRS, Toulouse", ""),
    }
    
    # Process each author
    matched_count = 0
    for i, author in enumerate(authors):
        name = author['Name (Lastname, Firstname)']
        if not name:
            continue
        
        # Check if already filled
        if author.get('Affiliation') and author.get('Email'):
            continue
        
        # Try to match with people.json
        normalized_name = normalize_name_for_matching(name)
        matched = False
        
        # Try exact match first
        if normalized_name in people_lookup:
            info = people_lookup[normalized_name]
            if info.get('affiliation'):
                author['Affiliation'] = info['affiliation']
                matched = True
                matched_count += 1
        
        # Try known affiliations
        if name in known_affiliations:
            affiliation, email = known_affiliations[name]
            if affiliation:
                author['Affiliation'] = affiliation
            if email:
                author['Email'] = email
            matched = True
        
        # Try partial matching (lastname only)
        if not matched:
            match = re.match(r'^([^,]+),', name)
            if match:
                lastname = match.group(1).strip()
                # Check if any people.json entry has this lastname
                for key, info in people_lookup.items():
                    if lastname in key and info.get('affiliation'):
                        # Only use if it's a reasonable match
                        if 'Brown' in info['affiliation'] or 'ANITI' in info['affiliation']:
                            author['Affiliation'] = info['affiliation']
                            matched_count += 1
                            break
    
    print(f"Matched {matched_count} authors with known information")
    
    # Save results
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(authors)
    
    print(f"Results saved to {output_file}")
    print(f"\nNote: {len([a for a in authors if not a.get('Affiliation')])} authors still need affiliation information.")
    print("You can search for them individually or use web search APIs for batch processing.")

if __name__ == '__main__':
    main()











