#!/usr/bin/env python3
"""
Remove duplicate authors from CSV, keeping the entry with the latest publication date.
More careful about which entries are actually duplicates.
"""

import csv
import re
from collections import defaultdict

def normalize_name(name):
    """Normalize author name for comparison (remove accents, periods, etc.)."""
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

def extract_firstname(name):
    """Extract firstname from 'Lastname, Firstname' format."""
    match = re.match(r'^[^,]+,(.+)$', name)
    if match:
        return match.group(1).strip()
    return ''

def are_same_person(name1, name2):
    """Check if two names are the same person."""
    # Normalize both
    norm1 = normalize_name(name1)
    norm2 = normalize_name(name2)
    
    # Exact match after normalization
    if norm1 == norm2:
        return True
    
    # Extract lastnames and firstnames
    last1 = norm1.split(',')[0].strip()
    last2 = norm2.split(',')[0].strip()
    
    # Different lastnames = different people
    if last1 != last2:
        return False
    
    # Same lastname, check firstnames
    first1 = extract_firstname(name1).lower()
    first2 = extract_firstname(name2).lower()
    
    # Remove periods
    first1 = re.sub(r'\.', '', first1)
    first2 = re.sub(r'\.', '', first2)
    
    # If firstnames are identical (after removing periods), same person
    if first1 == first2:
        return True
    
    # If one firstname is empty or just whitespace, can't determine
    if not first1 or not first2:
        return False
    
    # Check if one is abbreviation of other (e.g., "d" and "da", "t" and "t")
    # But be careful - "j" and "jk" are different people
    if len(first1) == 1 and len(first2) == 1:
        return first1 == first2  # Single letters must match exactly
    
    # If one starts with the other and both are very short (2-3 chars), likely same
    if (first1.startswith(first2) or first2.startswith(first1)) and len(first1) <= 3 and len(first2) <= 3:
        # But exclude cases like "j" and "jk" (different people)
        if abs(len(first1) - len(first2)) > 1:
            return False
        return True
    
    return False

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
    
    # Process duplicates
    merged_authors = []
    processed = set()
    duplicates_removed = []
    
    # First pass: handle exact duplicates (normalized name matches)
    for normalized, group in groups.items():
        if len(group) > 1:
            # These are exact duplicates (after normalization)
            duplicates_removed.append((normalized, group))
            # Keep the one with latest date, merge info
            group.sort(key=lambda x: int(x['Latest Publication Date']), reverse=True)
            kept = group[0].copy()
            
            # Merge affiliations and emails
            for other in group[1:]:
                if other.get('Affiliation') and not kept.get('Affiliation'):
                    kept['Affiliation'] = other['Affiliation']
                elif other.get('Affiliation') and kept.get('Affiliation') and other['Affiliation'] != kept['Affiliation']:
                    if other['Affiliation'] not in kept['Affiliation']:
                        kept['Affiliation'] = kept['Affiliation'] + "; " + other['Affiliation']
                
                if other.get('Email') and not kept.get('Email'):
                    kept['Email'] = other['Email']
            
            merged_authors.append(kept)
            processed.add(normalized)
    
    # Second pass: handle similar names (same lastname, similar firstname)
    remaining_authors = [a for a in authors if normalize_name(a['Name (Lastname, Firstname)'].strip('"')) not in processed]
    
    while remaining_authors:
        current = remaining_authors.pop(0)
        current_name = current['Name (Lastname, Firstname)'].strip('"')
        current_norm = normalize_name(current_name)
        
        # Look for duplicates in remaining authors
        found_duplicate = False
        for i, other in enumerate(remaining_authors):
            other_name = other['Name (Lastname, Firstname)'].strip('"')
            other_norm = normalize_name(other_name)
            
            if current_norm == other_norm:
                continue  # Already handled in first pass
            
            if are_same_person(current_name, other_name):
                # Found a duplicate
                duplicates_removed.append((f"{current_norm} (similar)", [current, other]))
                
                # Keep the one with latest date
                candidates = [current, other]
                candidates.sort(key=lambda x: int(x['Latest Publication Date']), reverse=True)
                kept = candidates[0].copy()
                
                # Merge info
                for candidate in candidates[1:]:
                    if candidate.get('Affiliation') and not kept.get('Affiliation'):
                        kept['Affiliation'] = candidate['Affiliation']
                    elif candidate.get('Affiliation') and kept.get('Affiliation') and candidate['Affiliation'] != kept['Affiliation']:
                        if candidate['Affiliation'] not in kept['Affiliation']:
                            kept['Affiliation'] = kept['Affiliation'] + "; " + candidate['Affiliation']
                    
                    if candidate.get('Email') and not kept.get('Email'):
                        kept['Email'] = candidate['Email']
                
                merged_authors.append(kept)
                # Remove the other from remaining
                remaining_authors.pop(i)
                found_duplicate = True
                break
        
        if not found_duplicate:
            merged_authors.append(current)
    
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
    for dup_name, group in duplicates_removed:
        print(f"  {dup_name}: {len(group)} entries -> 1 entry")
        for entry in group:
            print(f"    - {entry['Name (Lastname, Firstname)']} ({entry['Latest Publication Date']})")
    
    print(f"\nBefore: {len(authors)} authors")
    print(f"After: {len(merged_authors)} authors")
    print(f"Removed: {len(authors) - len(merged_authors)} duplicates")

if __name__ == '__main__':
    main()









