#!/usr/bin/env python3
"""
Add a third empty column to the CSV file.
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
    
    # Write back with new empty column
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', '', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for author in authors:
            row = {
                'Name (Lastname, Firstname)': author['Name (Lastname, Firstname)'],
                'Affiliation': author.get('Affiliation', ''),
                'Email': author.get('Email', ''),
                '': '',  # Empty column
                'Latest Publication Date': author['Latest Publication Date']
            }
            writer.writerow(row)
    
    print(f"Added empty column. Total columns: {len(fieldnames)}")
    print(f"Total authors: {len(authors)}")

if __name__ == '__main__':
    main()









