#!/usr/bin/env python3
"""
Fix PDF path mismatches by matching filenames to publication titles.
For each publication, checks if the PDF filename matches the title.
If not, searches for a better matching PDF in the papers directory.
"""
import json
import re
from pathlib import Path
from difflib import SequenceMatcher


def normalize_for_matching(text):
    """Normalize text for matching: lowercase, remove special chars, keep only alphanumeric and spaces"""
    if not text:
        return ""
    # Convert to lowercase
    text = text.lower()
    # Replace hyphens, underscores, and other separators with spaces
    text = re.sub(r'[-_/]', ' ', text)
    # Remove special characters, keep only alphanumeric and spaces
    text = re.sub(r'[^a-z0-9\s]', '', text)
    # Collapse multiple spaces
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def extract_keywords(title):
    """Extract key words from title (remove common words)"""
    common_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can'}
    words = normalize_for_matching(title).split()
    keywords = [w for w in words if w not in common_words and len(w) > 2]
    return keywords


def similarity_score(text1, text2):
    """Calculate similarity score between two texts"""
    norm1 = normalize_for_matching(text1)
    norm2 = normalize_for_matching(text2)
    return SequenceMatcher(None, norm1, norm2).ratio()


def find_best_matching_pdf(title, pdf_files, current_pdf_path=None):
    """Find the best matching PDF file for a given title"""
    title_normalized = normalize_for_matching(title)
    title_keywords = extract_keywords(title)
    
    best_match = None
    best_score = 0.0
    
    for pdf_file in pdf_files:
        # Skip the current PDF path
        if current_pdf_path and pdf_file.name == Path(current_pdf_path.replace('/papers/', '')).name:
            continue
            
        pdf_name_normalized = normalize_for_matching(pdf_file.stem)  # Use stem (filename without extension)
        
        # Calculate similarity
        score = similarity_score(title_normalized, pdf_name_normalized)
        
        # Bonus if key words match
        pdf_keywords = extract_keywords(pdf_file.stem)
        keyword_overlap = len(set(title_keywords) & set(pdf_keywords))
        if keyword_overlap > 0:
            score += keyword_overlap * 0.1
        
        if score > best_score:
            best_score = score
            best_match = pdf_file
    
    return best_match, best_score


def check_pdf_matches_title(title, pdf_path):
    """Check if PDF filename matches the publication title"""
    if not pdf_path or not pdf_path.startswith('/papers/'):
        return False, 0.0
    
    pdf_filename = Path(pdf_path.replace('/papers/', '')).stem
    title_normalized = normalize_for_matching(title)
    pdf_normalized = normalize_for_matching(pdf_filename)
    
    # Calculate similarity
    score = similarity_score(title_normalized, pdf_normalized)
    
    # Consider it a match if similarity is above threshold
    threshold = 0.3  # Lower threshold to catch partial matches
    return score >= threshold, score


def main():
    """Main function to fix PDF path mismatches"""
    print("🔍 Fixing PDF path mismatches...\n")
    
    # Load lab website publications
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    papers_dir = Path(__file__).parent.parent / 'public' / 'papers'
    
    if not lab_file.exists():
        print(f"❌ Error: Lab file not found: {lab_file}")
        return 1
    
    if not papers_dir.exists():
        print(f"❌ Error: Papers directory not found: {papers_dir}")
        return 1
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Get all PDF files
    pdf_files = list(papers_dir.glob('*.pdf'))
    print(f"📚 Found {len(pdf_files)} PDF files in papers directory\n")
    
    # Track fixes
    fixes = []
    checked = 0
    
    # Process each publication
    for year, pubs in data.items():
        for pub in pubs:
            title = pub.get('title', '')
            pdf_path = pub.get('pdfPath', '')
            
            if not title:
                continue
            
            checked += 1
            
            if pdf_path:
                # Check if current PDF matches title
                matches, score = check_pdf_matches_title(title, pdf_path)
                
                if not matches or score < 0.4:  # If low similarity, try to find better match
                    # Find better matching PDF
                    best_pdf, best_score = find_best_matching_pdf(title, pdf_files, pdf_path)
                    
                    if best_pdf and best_score > score:
                        old_path = pdf_path
                        new_path = f"/papers/{best_pdf.name}"
                        fixes.append({
                            'title': title,
                            'year': year,
                            'old_path': old_path,
                            'new_path': new_path,
                            'old_score': score,
                            'new_score': best_score
                        })
                        pub['pdfPath'] = new_path
                        print(f"✅ Fixed: {title[:60]}")
                        print(f"   Old: {old_path} (score: {score:.2f})")
                        print(f"   New: {new_path} (score: {best_score:.2f})\n")
            else:
                # No PDF path, try to find one
                best_pdf, best_score = find_best_matching_pdf(title, pdf_files)
                
                if best_pdf and best_score > 0.4:  # Only assign if good match
                    new_path = f"/papers/{best_pdf.name}"
                    fixes.append({
                        'title': title,
                        'year': year,
                        'old_path': None,
                        'new_path': new_path,
                        'old_score': 0.0,
                        'new_score': best_score
                    })
                    pub['pdfPath'] = new_path
                    print(f"✅ Added PDF: {title[:60]}")
                    print(f"   Path: {new_path} (score: {best_score:.2f})\n")
    
    # Save updated data
    if fixes:
        with open(lab_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"\n📊 Summary:")
        print(f"  - Checked {checked} publications")
        print(f"  - Fixed {len(fixes)} PDF paths")
        print(f"  - Updated file: {lab_file}\n")
        
        print("✅ PDF path fixes completed!")
        return 0
    else:
        print(f"\n📊 Summary:")
        print(f"  - Checked {checked} publications")
        print(f"  - No fixes needed\n")
        print("✅ All PDF paths appear to match their titles!")
        return 0


if __name__ == "__main__":
    exit(main())
