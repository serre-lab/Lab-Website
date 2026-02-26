#!/usr/bin/env python3
"""
Generate a list of publications for manual PDF verification.
Includes a mix of recently fixed ones and random selections.
"""
import json
import random
from pathlib import Path


def main():
    """Generate verification list"""
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Collect publications with PDFs
    pubs_with_pdfs = []
    
    for year, pubs in data.items():
        for pub in pubs:
            title = pub.get('title', '')
            pdf_path = pub.get('pdfPath', '')
            
            if pdf_path and pdf_path.startswith('/papers/'):
                pubs_with_pdfs.append({
                    'title': title,
                    'year': year,
                    'pdfPath': pdf_path,
                    'authors': pub.get('authors', ''),
                    'journal': pub.get('journal', '')
                })
    
    # Select a mix: some recently fixed, some random
    random.seed(42)
    
    # Recently fixed ones (good to verify)
    recently_fixed = [
        "Diversity vs. recognizability: Human-like generalization in one-shot generative models",
        "Neural computing on a raspberry pi: Applications to zebrafish behavior monitoring",
        "Not-So-CLEVR: Learning same–different relations strains feedforward neural networks",
        "Same-different problems strain convolutional neural networks",
        "Learning to predict action potentials end-to-end from calcium imaging data",
        "What are the visual features underlying human versus machine vision?",
        "How deep is the feature analysis underlying rapid visual categorization?",
        "Computer vision cracks the leaf code",
        "Recurrent neural circuits for contour detection",
    ]
    
    selected = []
    
    # Add recently fixed ones that exist
    for title in recently_fixed:
        for pub in pubs_with_pdfs:
            if pub['title'] == title:
                selected.append(pub)
                break
    
    # Add some random ones from different years
    recent = [p for p in pubs_with_pdfs if p['year'].isdigit() and int(p['year']) >= 2023 and p not in selected]
    older = [p for p in pubs_with_pdfs if p['year'].isdigit() and int(p['year']) < 2023 and p not in selected]
    
    if recent:
        selected.extend(random.sample(recent, min(3, len(recent))))
    if older:
        selected.extend(random.sample(older, min(3, len(older))))
    
    # Limit to 10 total
    selected = selected[:10]
    
    print("=" * 80)
    print("PUBLICATIONS FOR MANUAL PDF VERIFICATION")
    print("=" * 80)
    print(f"\nPlease verify these {len(selected)} publications on the lab website:\n")
    print("Instructions:")
    print("1. Go to: https://serre-lab.github.io/Lab-Website/ (or your local dev server)")
    print("2. Navigate to the Publications page")
    print("3. Find each publication below")
    print("4. Click the PDF icon/link")
    print("5. Verify the PDF matches the publication title")
    print("6. Report any mismatches\n")
    print("=" * 80)
    print()
    
    for i, pub in enumerate(selected, 1):
        print(f"{i}. {pub['title']}")
        print(f"   Year: {pub['year']}")
        print(f"   PDF: {pub['pdfPath']}")
        print(f"   Journal: {pub['journal']}")
        print()
    
    print("=" * 80)
    print("\nNote: Some of these were recently fixed/assigned, so please verify they're correct!")
    print("=" * 80)


if __name__ == "__main__":
    main()
