#!/usr/bin/env python3
"""
Validate PDF paths in publications_by_year.json
Checks if PDFs exist and reports duplicates
"""
import json
from pathlib import Path


def main():
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    papers_dir = Path(__file__).parent.parent / 'public' / 'papers'
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print("🔍 Validating PDF paths...\n")
    
    pdf_to_titles = {}
    missing_pdfs = []
    invalid_paths = []
    
    for year, pubs in data.items():
        for pub in pubs:
            title = pub.get('title', '')
            pdf_path = pub.get('pdfPath', '')
            
            if pdf_path:
                # Check if PDF exists
                if pdf_path.startswith('/papers/'):
                    pdf_file = papers_dir / pdf_path.replace('/papers/', '')
                    if not pdf_file.exists():
                        missing_pdfs.append((title, pdf_path))
                    else:
                        # Track which titles use which PDFs
                        if pdf_path not in pdf_to_titles:
                            pdf_to_titles[pdf_path] = []
                        pdf_to_titles[pdf_path].append(title)
                elif pdf_path.startswith('http'):
                    # Remote URLs are OK
                    pass
                else:
                    invalid_paths.append((title, pdf_path))
    
    # Report duplicates
    print("📊 PDF Usage Report:\n")
    duplicates_found = False
    for pdf, titles in pdf_to_titles.items():
        if len(titles) > 1:
            duplicates_found = True
            print(f"⚠️  PDF used by {len(titles)} publications: {pdf}")
            for title in titles:
                print(f"   - {title[:70]}")
            print()
    
    if not duplicates_found:
        print("✅ No duplicate PDF assignments found\n")
    
    # Report missing PDFs
    if missing_pdfs:
        print(f"❌ Missing PDFs ({len(missing_pdfs)}):\n")
        for title, pdf_path in missing_pdfs:
            print(f"   {title[:60]}")
            print(f"   {pdf_path}\n")
    else:
        print("✅ All PDFs exist\n")
    
    # Report invalid paths
    if invalid_paths:
        print(f"⚠️  Invalid PDF paths ({len(invalid_paths)}):\n")
        for title, pdf_path in invalid_paths:
            print(f"   {title[:60]}")
            print(f"   {pdf_path}\n")
    
    if duplicates_found or missing_pdfs or invalid_paths:
        print("\n❌ Validation failed - please fix the issues above")
        return 1
    else:
        print("✅ All PDF paths are valid!")
        return 0


if __name__ == "__main__":
    exit(main())
