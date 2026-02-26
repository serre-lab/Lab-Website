#!/usr/bin/env python3
"""
Find PDFs for publications that are missing them.
Tries to match publication titles to PDF filenames in the papers directory.
"""
import json
import re
from pathlib import Path
from difflib import SequenceMatcher, get_close_matches


def normalize_for_filename(text):
    """Normalize text to create a potential filename"""
    if not text:
        return ""
    text = text.lower()
    # Remove special characters, keep only alphanumeric and spaces
    text = re.sub(r'[^a-z0-9\s]', '', text)
    # Replace multiple spaces with single space
    text = re.sub(r'\s+', ' ', text)
    # Replace spaces with hyphens
    text = text.strip().replace(' ', '-')
    # Remove multiple consecutive hyphens
    text = re.sub(r'-+', '-', text)
    return text


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


def extract_keywords(title):
    """Extract key words from title"""
    common_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'}
    words = normalize_for_matching(title).split()
    keywords = [w for w in words if w not in common_words and len(w) > 2]
    return keywords


def find_matching_pdf(title, pdf_files, used_pdfs):
    """Find the best matching PDF for a title"""
    title_normalized = normalize_for_filename(title)
    title_keywords = extract_keywords(title)
    
    # First, try exact or near-exact filename match
    potential_filenames = [
        title_normalized,
        title_normalized + '.pdf',
        title_normalized[:50],  # Truncated version
        title_normalized[:50] + '.pdf',
    ]
    
    # Also try with year appended (common pattern)
    for year in ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015']:
        potential_filenames.append(title_normalized + '-' + year)
        potential_filenames.append(title_normalized[:50] + '-' + year)
    
    best_match = None
    best_score = 0.0
    
    for pdf_file in pdf_files:
        if pdf_file.name in used_pdfs:
            continue
        
        pdf_stem = pdf_file.stem  # filename without extension
        
        # Check if it matches any potential filename
        for potential in potential_filenames:
            if pdf_stem == potential or pdf_stem.startswith(potential) or potential.startswith(pdf_stem):
                score = 0.9  # High score for filename match
                if score > best_score:
                    best_score = score
                    best_match = pdf_file
                    break
        
        if best_match:
            continue
        
        # Try similarity matching
        score = similarity_score(title, pdf_stem)
        
        # Bonus for keyword overlap
        pdf_keywords = extract_keywords(pdf_stem)
        keyword_overlap = len(set(title_keywords) & set(pdf_keywords))
        if keyword_overlap > 0:
            score += keyword_overlap * 0.1
        
        if score > best_score:
            best_score = score
            best_match = pdf_file
    
    return best_match, best_score


def main():
    """Find PDFs for all publications missing them"""
    print("🔍 Finding PDFs for publications missing them...\n")
    
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    papers_dir = Path(__file__).parent.parent / 'public' / 'papers'
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Get all PDF files
    pdf_files = list(papers_dir.glob('*.pdf'))
    print(f"📚 Found {len(pdf_files)} PDF files in papers directory\n")
    
    # Get all currently used PDFs
    used_pdfs = set()
    for year, pubs in data.items():
        for pub in pubs:
            pdf_path = pub.get('pdfPath', '')
            if pdf_path and pdf_path.startswith('/papers/'):
                used_pdfs.add(pdf_path.replace('/papers/', ''))
    
    # Find publications without PDFs (excluding "In press")
    missing = []
    for year, pubs in data.items():
        for pub in pubs:
            title = pub.get('title', '')
            if title and not pub.get('pdfPath'):
                # Skip "In press" - they don't have PDFs yet
                if year == "In press":
                    continue
                missing.append((year, title, pub))
    
    print(f"Found {len(missing)} publications without PDFs (excluding 'In press')\n")
    print("=" * 80)
    
    matches = []
    no_matches = []
    
    for year, title, pub in missing:
        best_match, best_score = find_matching_pdf(title, pdf_files, used_pdfs)
        
        if best_match and best_score > 0.4:  # Threshold for matching
            matches.append({
                'title': title,
                'year': year,
                'pdf': best_match.name,
                'score': best_score,
                'pub': pub
            })
            print(f"✅ {title[:60]}")
            print(f"   Year: {year}")
            print(f"   Match: {best_match.name} (score: {best_score:.2f})\n")
        else:
            no_matches.append({
                'title': title,
                'year': year,
                'pub': pub
            })
    
    print("=" * 80)
    print(f"\n📊 Summary:")
    print(f"  - Found matches: {len(matches)}")
    print(f"  - No matches found: {len(no_matches)}\n")
    
    if no_matches:
        print("=" * 80)
        print("PUBLICATIONS WITHOUT MATCHES (need manual assignment or search):")
        print("=" * 80)
        for item in no_matches:
            print(f"\n- {item['title']}")
            print(f"  Year: {item['year']}")
            print(f"  Authors: {item['pub'].get('authors', '')[:80]}")
            print(f"  Journal: {item['pub'].get('journal', '')}")
    
    # Ask if we should apply the matches
    if matches:
        print("\n" + "=" * 80)
        print(f"Ready to assign {len(matches)} PDFs. Should I apply these matches?")
        print("=" * 80)
        return matches, no_matches
    
    return matches, no_matches


if __name__ == "__main__":
    matches, no_matches = main()
    
    if matches:
        print(f"\n💡 To apply these matches, run with --apply flag")
        print(f"   Or review the matches above and manually assign PDFs")
