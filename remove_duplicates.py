#!/usr/bin/env python3
"""
Remove duplicate authors from CSV, keeping the entry with the latest publication date.
"""

import csv
import re
from collections import defaultdict

def normalize_name(name):
    """Normalize author name for comparison (remove accents, periods, etc.)."""
    # Remove quotes
    name = name.strip('"')
    # Remove periods and normalize whitespace
    name = re.sub(r'\.', '', name)
    name = re.sub(r'\s+', ' ', name).strip()
    # Convert to lowercase for comparison
    name = name.lower()
    # Remove accents (approximate)
    replacements = {
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'á': 'a', 'à': 'a', 'â': 'a', 'ä': 'a',
        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        'ó': 'o', 'ò': 'o', 'ô': 'o', 'ö': 'o',
        'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'ç': 'c', 'ñ': 'n'
    }
    for old, new in replacements.items():
        name = name.replace(old, new)
    return name

def extract_lastname(name):
    """Extract lastname from 'Lastname, Firstname' format."""
    match = re.match(r'^([^,]+),', name)
    if match:
        return match.group(1).strip().lower()
    return name.lower()

def main():
    input_file = 'authors_2021_2025_final.csv'
    output_file = 'authors_2021_2025_final.csv'
    
    # Read all authors
    authors = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            authors.append(row)
    
    # Group by normalized name
    groups = defaultdict(list)
    for author in authors:
        name = author['Name (Lastname, Firstname)'].strip('"')
        normalized = normalize_name(name)
        groups[normalized].append(author)
    
    # Also group by lastname only (for cases like "Linsley, D." and "Linsley, D.A.")
    lastname_groups = defaultdict(list)
    for author in authors:
        name = author['Name (Lastname, Firstname)'].strip('"')
        lastname = extract_lastname(name)
        lastname_groups[lastname].append(author)
    
    # Find duplicates
    duplicates_found = []
    processed = set()
    merged_authors = []
    
    for normalized, group in groups.items():
        if len(group) > 1:
            # These are exact duplicates (after normalization)
            duplicates_found.append((normalized, group))
            # Keep the one with latest date, merge info
            group.sort(key=lambda x: int(x['Latest Publication Date']), reverse=True)
            kept = group[0].copy()
            
            # Merge affiliations and emails
            for other in group[1:]:
                if other.get('Affiliation') and not kept.get('Affiliation'):
                    kept['Affiliation'] = other['Affiliation']
                elif other.get('Affiliation') and kept.get('Affiliation') and other['Affiliation'] != kept['Affiliation']:
                    # Both have different affiliations - keep both
                    if other['Affiliation'] not in kept['Affiliation']:
                        kept['Affiliation'] = kept['Affiliation'] + "; " + other['Affiliation']
                
                if other.get('Email') and not kept.get('Email'):
                    kept['Email'] = other['Email']
            
            merged_authors.append(kept)
            processed.add(normalized)
        else:
            # Check if this might be a duplicate based on lastname
            name = group[0]['Name (Lastname, Firstname)'].strip('"')
            lastname = extract_lastname(name)
            lastname_group = lastname_groups[lastname]
            
            if len(lastname_group) > 1 and normalized not in processed:
                # Check if these are likely the same person
                # (e.g., "Linsley, D." and "Linsley, D.A." or "Serre, T." variations)
                firstnames = [extract_firstname(a['Name (Lastname, Firstname)'].strip('"')) for a in lastname_group]
                # If firstnames are similar (one is abbreviation of other), likely same person
                if are_likely_same_person(firstnames):
                    duplicates_found.append((f"{lastname} (similar)", lastname_group))
                    # Keep the one with latest date
                    lastname_group.sort(key=lambda x: int(x['Latest Publication Date']), reverse=True)
                    kept = lastname_group[0].copy()
                    
                    # Merge info from others
                    for other in lastname_group[1:]:
                        if other.get('Affiliation') and not kept.get('Affiliation'):
                            kept['Affiliation'] = other['Affiliation']
                        elif other.get('Affiliation') and kept.get('Affiliation') and other['Affiliation'] != kept['Affiliation']:
                            if other['Affiliation'] not in kept['Affiliation']:
                                kept['Affiliation'] = kept['Affiliation'] + "; " + other['Affiliation']
                        
                        if other.get('Email') and not kept.get('Email'):
                            kept['Email'] = other['Email']
                    
                    merged_authors.append(kept)
                    # Mark all as processed
                    for a in lastname_group:
                        processed.add(normalize_name(a['Name (Lastname, Firstname)'].strip('"')))
                else:
                    # Not duplicates, keep all
                    for a in group:
                        if normalize_name(a['Name (Lastname, Firstname)'].strip('"')) not in processed:
                            merged_authors.append(a)
                            processed.add(normalize_name(a['Name (Lastname, Firstname)'].strip('"')))
            else:
                # No duplicates, keep as is
                merged_authors.append(group[0])
                processed.add(normalized)
    
    # Add any authors that weren't processed
    for author in authors:
        normalized = normalize_name(author['Name (Lastname, Firstname)'].strip('"'))
        if normalized not in processed:
            merged_authors.append(author)
            processed.add(normalized)
    
    # Sort by lastname, firstname
    def sort_key(author):
        name = author['Name (Lastname, Firstname)'].strip('"')
        match = re.match(r'^([^,]+),\s*(.+)$', name)
        if match:
            return (match.group(1).lower(), match.group(2).lower())
        return (name.lower(), '')
    
    merged_authors.sort(key=sort_key)
    
    # Write back
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(merged_authors)
    
    print(f"Removed duplicates:")
    for dup_name, group in duplicates_found:
        print(f"  {dup_name}: {len(group)} entries -> 1 entry")
        for entry in group:
            print(f"    - {entry['Name (Lastname, Firstname)']} ({entry['Latest Publication Date']})")
    
    print(f"\nBefore: {len(authors)} authors")
    print(f"After: {len(merged_authors)} authors")
    print(f"Removed: {len(authors) - len(merged_authors)} duplicates")

def extract_firstname(name):
    """Extract firstname from 'Lastname, Firstname' format."""
    match = re.match(r'^[^,]+,(.+)$', name)
    if match:
        return match.group(1).strip().lower()
    return ''

def are_likely_same_person(firstnames):
    """Check if firstnames are likely the same person (e.g., 'd' and 'd.a' or 't' and 't.')"""
    if len(firstnames) < 2:
        return False
    
    # Remove periods and normalize
    normalized = [re.sub(r'\.', '', fn).strip() for fn in firstnames]
    normalized = [fn for fn in normalized if fn]
    
    if len(normalized) < 2:
        return False
    
    # Only consider as same person if:
    # 1. One is a clear prefix/abbreviation of another (e.g., 'd' and 'da', 't' and 't')
    # 2. They're both single letters (likely same person with/without period)
    # 3. One starts with the other (e.g., 'd' starts 'da')
    
    # Check if one is a prefix of another (e.g., 'd' and 'da')
    for i, fn1 in enumerate(normalized):
        for fn2 in normalized[i+1:]:
            # If both are single characters, likely same
            if len(fn1) == 1 and len(fn2) == 1:
                return True
            # If one starts with the other and both are short
            if (fn1.startswith(fn2) or fn2.startswith(fn1)) and len(fn1) <= 3 and len(fn2) <= 3:
                return True
            # If they're identical after normalization
            if fn1 == fn2:
                return True
    
    return False

if __name__ == '__main__':
    main()











