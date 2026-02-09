#!/usr/bin/env python3
"""
Systematically find PDFs for ALL remaining publications.
Uses multiple matching strategies and lists what needs manual search.
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


def extract_authors(authors_str):
    """Extract last names from authors"""
    if not authors_str:
        return []
    parts = re.split(r'[,&]', authors_str)
    last_names = []
    for part in parts:
        part = part.strip()
        words = part.split()
        if words:
            last_name = words[-1]
            last_name = re.sub(r'[^a-zA-Z]', '', last_name)
            if last_name and len(last_name) > 2:
                last_names.append(last_name.lower())
    return last_names


def match_by_year_author(pub_year, authors, pdf_name):
    """Match by year and author pattern"""
    if not pub_year.isdigit():
        return False, 0.0
    
    year = pub_year
    pdf_lower = pdf_name.lower()
    
    if pdf_lower.startswith(year) or f"_{year}" in pdf_lower or f"-{year}" in pdf_lower:
        author_last_names = extract_authors(authors)
        for author in author_last_names:
            if author in pdf_lower:
                return True, 0.8
    return False, 0.0


# Known mappings based on filename patterns
KNOWN_MAPPINGS = {
    "Models of visual categorization": "serre2016.pdf",
    "A systematic comparison between visual cues for boundary detection": None,  # Need to find
    "Unsupervised invariance learning of transformation sequences in a model of object recognition yields selectivity for non-accidental properties": "unsupervised-invariance-learning-2015.pdf",
    "The neural dynamics of face detection in the wild revealed by MVPA": "neural-dynamics-face-detection-2014.pdf",
    "The language of actions: Recovering the syntax and semantics of goal-directed human activities": None,  # Need to find
    "Hierarchical models of the visual system": "hierarchical-models-visual-system-2020.pdf",  # But this is 2020, pub is 2014
    "A new biologically inspired color image descriptor": None,  # Need to find
    "What are the visual features underlying rapid object recognition?": None,  # Need to find
    "Automated home-cage behavioral phenotyping of mice": "ncomms1064.pdf",  # Nature Communications 2010
    "Reading the mind's eye: Decoding category information during mental imagery": "ReddyNeuroImage2009.pdf",  # Close to 2010
    "A component-based framework for face detection and identification": None,  # Need to find
    "Object recognition with features inspired by visual cortex": None,  # Need to find
    "A theory of object recognition: computations and circuits in the feedforward path of the ventral stream in primate visual cortex": None,  # MIT TR
    "Hierarchical classification and feature reduction for fast face detection with support vector machines": None,  # Need to find
    "On the role of object-specific features for real-world object recognition in biological vision": None,  # Need to find
    "Categorization by learning and combining object parts": None,  # Need to find
    "Feature reduction and hierarchy of classifiers for fast object detection in video images": None,  # Need to find
    "Understanding the computational demands underlying visual reasoning": "understanding-computational-demands-visual-reasoning-2022.pdf",
    "Development of a deep learning algorithm for the histopathologic diagnosis and gleason grading of prostate cancer biopsies: A pilot study": None,  # Need to find
    "NeuroSurgeon: A Toolkit for Subnetwork Analysis": None,  # Need to find
}


def main():
    """Find PDFs for all remaining publications"""
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    papers_dir = Path(__file__).parent.parent / 'public' / 'papers'
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    pdf_files = list(papers_dir.glob('*.pdf'))
    pdf_names = {f.name for f in pdf_files}
    
    # Get used PDFs
    used_pdfs = set()
    for year, pubs in data.items():
        for pub in pubs:
            pdf_path = pub.get('pdfPath', '')
            if pdf_path and pdf_path.startswith('/papers/'):
                used_pdfs.add(pdf_path.replace('/papers/', ''))
    
    # Find missing publications
    missing = []
    for year, pubs in data.items():
        for pub in pubs:
            title = pub.get('title', '')
            if title and not pub.get('pdfPath') and year != 'In press':
                missing.append((year, title, pub))
    
    print(f"Found {len(missing)} publications missing PDFs\n")
    print("=" * 80)
    
    matches = []
    no_matches = []
    
    for year, title, pub in missing:
        authors = pub.get('authors', '')
        journal = pub.get('journal', '')
        
        # Check known mappings first
        pdf_name = KNOWN_MAPPINGS.get(title)
        if pdf_name and pdf_name in pdf_names and pdf_name not in used_pdfs:
            matches.append({
                'title': title,
                'year': year,
                'pdf': pdf_name,
                'score': 0.95,
                'pub': pub,
                'method': 'known mapping'
            })
            print(f"✅ {title[:60]}")
            print(f"   → {pdf_name} (known mapping)\n")
            continue
        
        # Try matching strategies
        best_match = None
        best_score = 0.0
        
        for pdf_file in pdf_files:
            if pdf_file.name in used_pdfs:
                continue
            
            pdf_stem = pdf_file.stem
            pdf_lower = pdf_file.name.lower()
            
            # Year + author match
            matched, score = match_by_year_author(year, authors, pdf_file.name)
            if matched and score > best_score:
                best_score = score
                best_match = pdf_file
                continue
            
            # Title similarity
            score = similarity_score(title, pdf_stem)
            if score > best_score:
                best_score = score
                best_match = pdf_file
        
        if best_match and best_score > 0.5:
            matches.append({
                'title': title,
                'year': year,
                'pdf': best_match.name,
                'score': best_score,
                'pub': pub,
                'method': 'auto match'
            })
            print(f"✅ {title[:60]}")
            print(f"   → {best_match.name} (score: {best_score:.2f})\n")
        else:
            no_matches.append({
                'title': title,
                'year': year,
                'authors': authors,
                'journal': journal
            })
    
    print("=" * 80)
    print(f"\n📊 Summary:")
    print(f"  - Found matches: {len(matches)}")
    print(f"  - Need manual search: {len(no_matches)}\n")
    
    if no_matches:
        print("=" * 80)
        print("PUBLICATIONS NEEDING MANUAL SEARCH:")
        print("=" * 80)
        for item in no_matches:
            print(f"\n- {item['title']}")
            print(f"  Year: {item['year']}, Journal: {item['journal']}")
            print(f"  Authors: {item['authors'][:80]}")
    
    return matches, no_matches


if __name__ == "__main__":
    matches, no_matches = main()
    
    if matches:
        print(f"\n💡 Found {len(matches)} matches. Should I apply them?")
