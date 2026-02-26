#!/usr/bin/env python3
"""
Conservative fix for PDF path duplicates.
For each PDF that's used by multiple publications, keeps it only for the best matching title.
For others, removes the PDF path (they can be manually assigned later).
"""
import json
import re
from pathlib import Path
from difflib import SequenceMatcher
from collections import defaultdict


def normalize_for_matching(text):
    """Normalize text for matching: lowercase, remove special chars"""
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r'[-_/]', ' ', text)
    text = re.sub(r'[^a-z0-9\s]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def similarity_score(text1, text2):
    """Calculate similarity score between two texts"""
    norm1 = normalize_for_matching(text1)
    norm2 = normalize_for_matching(text2)
    return SequenceMatcher(None, norm1, norm2).ratio()


def main():
    """Main function to fix PDF duplicates conservatively"""
    print("🔍 Fixing PDF path duplicates (conservative approach)...\n")
    
    # Load lab website publications
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    papers_dir = Path(__file__).parent.parent / 'public' / 'papers'
    
    if not lab_file.exists():
        print(f"❌ Error: Lab file not found: {lab_file}")
        return 1
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Find all PDFs and which publications use them
    pdf_to_publications = defaultdict(list)
    
    for year, pubs in data.items():
        for pub in pubs:
            title = pub.get('title', '')
            pdf_path = pub.get('pdfPath', '')
            
            if pdf_path and pdf_path.startswith('/papers/'):
                pdf_to_publications[pdf_path].append({
                    'year': year,
                    'title': title,
                    'pub': pub
                })
    
    # Find duplicates
    duplicates = {pdf: pubs for pdf, pubs in pdf_to_publications.items() if len(pubs) > 1}
    
    if not duplicates:
        print("✅ No duplicate PDF assignments found!")
        return 0
    
    print(f"Found {len(duplicates)} PDFs with duplicate assignments\n")
    
    fixes = []
    
    # For each duplicate PDF, keep it only for the best matching title
    for pdf_path, publications in duplicates.items():
        pdf_filename = Path(pdf_path.replace('/papers/', '')).stem
        
        print(f"📄 PDF: {pdf_path}")
        print(f"   Used by {len(publications)} publications:\n")
        
        # Calculate similarity for each publication
        matches = []
        for pub_info in publications:
            title = pub_info['title']
            score = similarity_score(title, pdf_filename)
            matches.append((score, pub_info))
            print(f"   - {title[:60]} (similarity: {score:.2f})")
        
        # Sort by similarity (highest first)
        matches.sort(reverse=True, key=lambda x: x[0])
        
        # Keep PDF only for the best match
        best_match = matches[0]
        best_score = best_match[0]
        
        print(f"\n   ✅ Keeping PDF for: {best_match[1]['title'][:60]} (score: {best_score:.2f})")
        
        # Remove PDF from others
        for score, pub_info in matches[1:]:
            if 'pdfPath' in pub_info['pub']:
                old_path = pub_info['pub'].get('pdfPath')
                del pub_info['pub']['pdfPath']
                fixes.append({
                    'title': pub_info['title'],
                    'year': pub_info['year'],
                    'action': 'removed',
                    'pdf': pdf_path,
                    'reason': f'Duplicate - kept for better match (score: {best_score:.2f} vs {score:.2f})'
                })
                print(f"   ❌ Removed PDF from: {pub_info['title'][:60]} (score: {score:.2f})")
        
        print()
    
    # Save updated data
    if fixes:
        with open(lab_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"\n📊 Summary:")
        print(f"  - Fixed {len(fixes)} duplicate assignments")
        print(f"  - Updated file: {lab_file}\n")
        print("✅ Duplicate PDF assignments fixed!")
        print("\nNote: Publications that had PDFs removed can be manually assigned later.")
        return 0
    else:
        print("✅ No fixes needed!")
        return 0


if __name__ == "__main__":
    exit(main())
