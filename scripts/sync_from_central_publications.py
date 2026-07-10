#!/usr/bin/env python3
"""
Update lab website publications_by_year.json from central publications_structured.json
Preserves existing PDF paths from the lab website file
"""

import json
import subprocess
import sys
from pathlib import Path


def normalize_title(title):
    """Normalize title for matching (strip whitespace, handle special chars)"""
    if not title:
        return ""
    return title.strip().replace('  ', ' ')


def find_publication_by_title(publications_list, target_title):
    """Find a publication in a list by matching normalized title"""
    normalized_target = normalize_title(target_title)
    for pub in publications_list:
        if normalize_title(pub.get('title', '')) == normalized_target:
            return pub
    return None


def load_existing_pdf_paths():
    """Load existing PDF paths from lab website file to preserve them"""
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    
    pdf_paths = {}
    
    if lab_file.exists():
        with open(lab_file, 'r', encoding='utf-8') as f:
            lab_data = json.load(f)
        
        # Extract PDF paths by title
        for year, publications in lab_data.items():
            for pub in publications:
                title = pub.get('title', '')
                pdf_path = pub.get('pdfPath')
                if title and pdf_path:
                    pdf_paths[normalize_title(title)] = pdf_path
    
    return pdf_paths


def convert_to_lab_website_format(central_data, existing_pdf_paths):
    """Convert central publications_structured.json to lab website format"""
    
    # Initialize lab website structure with all years
    lab_data = {}
    
    # Add all years from 2000 to 2030
    for year in range(2000, 2031):
        lab_data[str(year)] = []
    
    # Add special sections
    lab_data["Work in progress"] = []
    lab_data["In press"] = []
    
    # Process under_review -> "Work in progress"
    for pub in central_data.get('under_review', []):
        title = pub.get('title', '')
        lab_pub = {
            "title": title,
            "authors": pub.get('authors', ''),
            "journal": pub.get('journal', ''),
            "url": pub.get('url', '')
        }
        
        # PDF path: central file takes precedence, then existing lab file
        normalized_title = normalize_title(title)
        pdf_path = pub.get('pdfPath') or pub.get('pdf_path') or existing_pdf_paths.get(normalized_title)
        if pdf_path:
            lab_pub["pdfPath"] = pdf_path
        
        lab_data["Work in progress"].append(lab_pub)
    
    # Process in_press -> "In press"
    for pub in central_data.get('in_press', []):
        title = pub.get('title', '')
        lab_pub = {
            "title": title,
            "authors": pub.get('authors', ''),
            "journal": pub.get('journal', ''),
            "url": pub.get('url', '')
        }
        
        # PDF path: central file takes precedence, then existing lab file
        normalized_title = normalize_title(title)
        pdf_path = pub.get('pdfPath') or pub.get('pdf_path') or existing_pdf_paths.get(normalized_title)
        if pdf_path:
            lab_pub["pdfPath"] = pdf_path
        
        lab_data["In press"].append(lab_pub)
    
    # Process peer_reviewed -> years
    for pub in central_data.get('peer_reviewed', []):
        year = pub.get('year', '')
        if not year or year not in lab_data:
            # If year is missing or out of range, skip
            continue
        
        title = pub.get('title', '')
        lab_pub = {
            "title": title,
            "authors": pub.get('authors', ''),
            "journal": pub.get('journal', ''),
            "url": pub.get('url', '')
        }
        
        # PDF path: central file takes precedence, then existing lab file
        normalized_title = normalize_title(title)
        pdf_path = pub.get('pdfPath') or pub.get('pdf_path') or existing_pdf_paths.get(normalized_title)
        if pdf_path:
            lab_pub["pdfPath"] = pdf_path
        
        lab_data[year].append(lab_pub)
    
    # Process unpublished_preprints -> years
    for pub in central_data.get('unpublished_preprints', []):
        year = pub.get('year', '')
        if not year or year not in lab_data:
            # If year is missing or out of range, skip
            continue
        
        title = pub.get('title', '')
        lab_pub = {
            "title": title,
            "authors": pub.get('authors', ''),
            "journal": pub.get('journal', ''),
            "url": pub.get('url', '')
        }
        
        # PDF path: central file takes precedence, then existing lab file
        normalized_title = normalize_title(title)
        pdf_path = pub.get('pdfPath') or pub.get('pdf_path') or existing_pdf_paths.get(normalized_title)
        if pdf_path:
            lab_pub["pdfPath"] = pdf_path
        
        lab_data[year].append(lab_pub)
    
    # Remove empty years to keep the file clean
    lab_data = {k: v for k, v in lab_data.items() if v}
    
    return lab_data


def main():
    """Main function to sync lab website from central file"""
    print("🔄 Syncing lab website publications from central file...\n")
    
    # Load central file
    central_file = Path("/Users/tserre/Work/personal/cv/data/publications_structured.json")
    if not central_file.exists():
        print(f"❌ Error: Central file not found: {central_file}")
        return
    
    with open(central_file, 'r', encoding='utf-8') as f:
        central_data = json.load(f)
    
    print(f"✓ Loaded central file: {central_file}")
    
    # Load existing PDF paths to preserve them
    existing_pdf_paths = load_existing_pdf_paths()
    print(f"✓ Loaded {len(existing_pdf_paths)} existing PDF paths to preserve")
    
    # Convert to lab website format
    lab_data = convert_to_lab_website_format(central_data, existing_pdf_paths)
    
    # Write to lab website file
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    lab_file.parent.mkdir(parents=True, exist_ok=True)
    
    with open(lab_file, 'w', encoding='utf-8') as f:
        json.dump(lab_data, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Updated lab website file: {lab_file}")
    
    # Print summary
    print(f"\n📊 Summary:")
    print(f"  - Work in progress: {len(lab_data.get('Work in progress', []))}")
    print(f"  - In press: {len(lab_data.get('In press', []))}")
    
    # Count publications by year (excluding special sections)
    year_counts = {k: len(v) for k, v in lab_data.items() 
                   if k not in ['Work in progress', 'In press'] and v}
    
    if year_counts:
        print(f"  - Years with publications: {len(year_counts)}")
        # Show recent years
        recent_years = sorted([int(y) for y in year_counts.keys() if y.isdigit()], reverse=True)[:5]
        for year in recent_years:
            print(f"    {year}: {year_counts[str(year)]} publications")
    
    print(f"\n✅ Lab website publications synced successfully!")

    # Automatically fetch local PDFs for any new publications that expose a
    # downloadable source (arXiv / OpenReview). This keeps public/papers/ in
    # step with the metadata so we always retain local copies — see the
    # 2026-07 audit, when metadata sync had drifted ahead of the PDF archive.
    fetch_missing_pdfs()

    print(f"\nNext steps:")
    print(f"  1. Review the updated file: {lab_file}")
    print(f"  2. Test the publications page on the lab website")
    print(f"  3. If the website is deployed, rebuild and redeploy")


def fetch_missing_pdfs():
    """Run download_publication_pdfs.py so new pubs get a local PDF."""
    downloader = Path(__file__).parent / "download_publication_pdfs.py"
    if not downloader.exists():
        return
    print("\n🔽 Fetching PDFs for publications missing a local copy...")
    try:
        subprocess.run([sys.executable, str(downloader)], check=False)
    except Exception as e:  # pragma: no cover - best-effort convenience step
        print(f"  ⚠️  PDF download step failed (non-fatal): {e}")


if __name__ == "__main__":
    main()

