#!/usr/bin/env python3
"""
Find PDF matches for publications that don't have PDF paths.
Uses conservative matching to suggest PDFs.
"""
import json
import re
from pathlib import Path
from difflib import SequenceMatcher


def normalize_for_matching(text):
    """Normalize text for matching"""
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r'[-_/]', ' ', text)
    text = re.sub(r'[^a-z0-9\s]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def similarity_score(text1, text2):
    """Calculate similarity score"""
    norm1 = normalize_for_matching(text1)
    norm2 = normalize_for_matching(text2)
    return SequenceMatcher(None, norm1, norm2).ratio()


def main():
    """Find PDF matches for publications without PDFs"""
    print("🔍 Finding PDF matches for publications without PDFs...\n")
    
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    papers_dir = Path(__file__).parent.parent / 'public' / 'papers'
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Get all PDF files
    pdf_files = list(papers_dir.glob('*.pdf'))
    
    # Get all currently used PDFs
    used_pdfs = set()
    for year, pubs in data.items():
        for pub in pubs:
            pdf_path = pub.get('pdfPath', '')
            if pdf_path and pdf_path.startswith('/papers/'):
                used_pdfs.add(pdf_path.replace('/papers/', ''))
    
    # Find publications without PDFs
    missing = []
    for year, pubs in data.items():
        for pub in pubs:
            title = pub.get('title', '')
            if title and not pub.get('pdfPath'):
                missing.append((year, title, pub))
    
    if not missing:
        print("✅ All publications have PDF paths!")
        return 0
    
    print(f"Found {len(missing)} publications without PDFs\n")
    print("Suggestions (only high-confidence matches):\n")
    
    suggestions = []
    for year, title, pub in missing:
        best_match = None
        best_score = 0.0
        
        for pdf_file in pdf_files:
            if pdf_file.name in used_pdfs:
                continue  # Skip already used PDFs
            
            pdf_name = pdf_file.stem
            score = similarity_score(title, pdf_name)
            
            if score > best_score:
                best_score = score
                best_match = pdf_file
        
        if best_match and best_score > 0.5:  # Only suggest if good match
            suggestions.append({
                'title': title,
                'year': year,
                'pdf': best_match.name,
                'score': best_score
            })
            print(f"✅ {title[:60]}")
            print(f"   Suggested: /papers/{best_match.name} (score: {best_score:.2f})\n")
    
    if suggestions:
        print(f"\n📊 Found {len(suggestions)} high-confidence matches")
        print("You can manually review and assign these PDFs.")
    else:
        print("No high-confidence matches found. PDFs will need manual assignment.")
    
    return 0


if __name__ == "__main__":
    exit(main())
