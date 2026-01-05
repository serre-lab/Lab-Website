#!/usr/bin/env python3
"""
Replace year format (YYYY) with date format (1/1/XX) where XX is the 2-digit year.
"""

import csv

def main():
    input_file = 'authors_2021_2025_final.csv'
    output_file = 'authors_2021_2025_final.csv'
    
    # Read CSV
    authors = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            authors.append(row)
    
    # Update date format
    updated = 0
    for author in authors:
        year = author.get('Latest Publication Date', '')
        if year and year.isdigit():
            # Convert YYYY to 1/1/XX (2-digit year)
            year_int = int(year)
            year_2digit = year_int % 100
            author['Latest Publication Date'] = f"1/1/{year_2digit:02d}"
            updated += 1
    
    # Write back
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', '', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(authors)
    
    print(f"Updated {updated} dates to 1/1/XX format")
    print(f"Total authors: {len(authors)}")

if __name__ == '__main__':
    main()









