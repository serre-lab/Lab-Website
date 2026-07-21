#!/usr/bin/env python3
"""
Validate PDF paths in publications_by_year.json
Checks if PDFs exist and reports duplicates
"""
import json
import re
import shutil
import subprocess
from pathlib import Path


def _normalise(text):
    return re.sub(r'[^a-z0-9 ]+', ' ', text.lower())


def check_pdf_content(data, papers_dir):
    """Flag publications whose PDF text doesn't look like the stated title.

    Uses pdftotext on the first two pages. A PDF passes if a run of >=4 leading
    title words appears verbatim, or enough of the title's words are present.
    Returns a list of (title, pdf_path, score) for the ones that fail. Silently
    skips scanned/image-only PDFs and returns nothing if pdftotext is absent.
    """
    if shutil.which('pdftotext') is None:
        return []

    mismatches = []
    for _year, pubs in data.items():
        for pub in pubs:
            pdf_path = pub.get('pdfPath', '') or ''
            if not pdf_path.startswith('/papers/'):
                continue
            pdf_file = papers_dir / pdf_path.replace('/papers/', '')
            if not pdf_file.exists():
                continue
            try:
                raw = subprocess.run(
                    ['pdftotext', '-f', '1', '-l', '2', str(pdf_file), '-'],
                    capture_output=True, timeout=30,
                ).stdout.decode('utf-8', 'ignore')
            except Exception:
                continue
            text = _normalise(re.sub(r'\s+', ' ', raw))
            if len(text) < 40:
                continue  # scanned / image-only, can't verify

            words = _normalise(pub.get('title', '')).split()
            runs = [n for n in range(3, min(10, len(words)) + 1)
                    if ' '.join(words[:n]) in text]
            longest_run = max(runs) if runs else 0

            # Many papers typeset the title in small caps or with letter
            # spacing ("B EYOND A DVERSARIAL"), which breaks word-run matching.
            # Comparing with all whitespace stripped sees through that.
            squashed = text.replace(' ', '')
            if ''.join(words[:6]) and ''.join(words[:6]) in squashed:
                longest_run = max(longest_run, 6)
            meaningful = [w for w in words if len(w) > 3]
            coverage = (sum(1 for w in meaningful if w in text) /
                        max(1, len(meaningful)))

            ok = (longest_run >= 4
                  or (longest_run >= 3 and coverage >= 0.6)
                  or coverage >= 0.8)
            if not ok:
                mismatches.append((pub.get('title', ''), pdf_path, coverage))
    return mismatches


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

    # Check each PDF's text actually matches the publication title. This catches
    # both wrong assignments and PDFs that have gone stale (e.g. a preprint
    # revised under a new title, where the downloader skips it because a
    # pdfPath already exists).
    content_mismatches = check_pdf_content(data, papers_dir)
    if content_mismatches:
        print(f"⚠️  PDFs whose text does not match the title ({len(content_mismatches)}):\n")
        for title, pdf_path, score in content_mismatches:
            print(f"   {title[:60]}")
            print(f"   {pdf_path}  (title-word match: {score:.0%})\n")
        print("   → verify manually; if the paper was revised, re-download the PDF.\n")
    else:
        print("✅ All PDFs match their publication titles\n")

    if duplicates_found or missing_pdfs or invalid_paths:
        print("\n❌ Validation failed - please fix the issues above")
        return 1
    else:
        print("✅ All PDF paths are valid!")
        return 0


if __name__ == "__main__":
    exit(main())
