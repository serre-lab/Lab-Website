#!/usr/bin/env python3
"""
Generate a semi-random list of publications for manual PDF verification.
Selects publications from different years and categories.
"""
import json
import random
from pathlib import Path


def main():
    """Generate verification list"""
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Collect all publications with PDFs
    publications_with_pdfs = []
    
    for year, pubs in data.items():
        for pub in pubs:
            title = pub.get('title', '')
            pdf_path = pub.get('pdfPath', '')
            
            if pdf_path and pdf_path.startswith('/papers/'):
                publications_with_pdfs.append({
                    'title': title,
                    'year': year,
                    'pdfPath': pdf_path,
                    'authors': pub.get('authors', ''),
                    'journal': pub.get('journal', '')
                })
    
    # Select semi-random publications (mix of recent and older, different years)
    random.seed(42)  # For reproducibility
    
    # Get publications from different years
    recent = [p for p in publications_with_pdfs if p['year'].isdigit() and int(p['year']) >= 2023]
    older = [p for p in publications_with_pdfs if p['year'].isdigit() and int(p['year']) < 2023]
    special = [p for p in publications_with_pdfs if not p['year'].isdigit()]
    
    # Select 3-4 recent, 3-4 older, 1-2 special
    selected = []
    if recent:
        selected.extend(random.sample(recent, min(4, len(recent))))
    if older:
        selected.extend(random.sample(older, min(4, len(older))))
    if special:
        selected.extend(random.sample(special, min(2, len(special))))
    
    # If we don't have enough, fill with random
    if len(selected) < 10:
        remaining = [p for p in publications_with_pdfs if p not in selected]
        needed = 10 - len(selected)
        selected.extend(random.sample(remaining, min(needed, len(remaining))))
    
    # Limit to 10
    selected = selected[:10]
    
    # Shuffle for randomness
    random.shuffle(selected)
    
    print("=" * 80)
    print("PUBLICATION PDF VERIFICATION LIST")
    print("=" * 80)
    print(f"\nPlease manually verify that these {len(selected)} publications link to the correct PDFs:\n")
    
    for i, pub in enumerate(selected, 1):
        print(f"{i}. {pub['title']}")
        print(f"   Year: {pub['year']}")
        print(f"   PDF: {pub['pdfPath']}")
        print(f"   Authors: {pub['authors'][:80]}...")
        print()
    
    print("=" * 80)
    print("\nInstructions:")
    print("1. Go to the lab website publications page")
    print("2. Find each publication in the list above")
    print("3. Click the PDF icon/link")
    print("4. Verify that the PDF matches the publication title")
    print("5. Report any mismatches")
    print("=" * 80)


if __name__ == "__main__":
    main()
