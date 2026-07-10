#!/usr/bin/env python3
"""
Download PDFs for publications that have a known public PDF URL.

Supports:
- OpenReview: https://openreview.net/forum?id=XXX → https://openreview.net/pdf?id=XXX
- arXiv: https://arxiv.org/abs/XXX → https://arxiv.org/pdf/XXX.pdf

Saves to public/papers/ with a slug filename and can update publications_by_year.json
with pdfPath. Run with --dry-run to only print what would be done.
"""

import json
import re
import sys
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError


def slugify(title: str, max_len: int = 60) -> str:
    """Turn title into a safe filename slug."""
    s = re.sub(r"[^\w\s-]", "", title.lower())
    s = re.sub(r"[-\s]+", "-", s).strip("-")
    return s[:max_len] if len(s) > max_len else s


def get_pdf_url(article_url: str) -> str | None:
    """Return direct PDF URL if we know how to derive it, else None."""
    if not article_url or not article_url.strip():
        return None
    url = article_url.strip()
    # OpenReview: forum?id=XXX -> pdf?id=XXX
    m = re.match(r"https?://openreview\.net/forum\?id=([\w\-]+)", url, re.I)
    if m:
        return f"https://openreview.net/pdf?id={m.group(1)}"
    # arXiv: abs/XXX -> pdf/XXX.pdf
    m = re.match(r"https?://(?:www\.)?arxiv\.org/abs/([\w\.\-]+)", url, re.I)
    if m:
        return f"https://arxiv.org/pdf/{m.group(1)}.pdf"
    return None


def derive_year(section: str, pub: dict, url: str) -> str:
    """Best-effort publication year for the filename.

    Sections like "Work in progress" / "In press" are not years, so fall back to
    the pub's own ``year`` field, then to the year encoded in an arXiv id
    (YYMM.xxxxx -> 20YY), and finally to "preprint".
    """
    if section.isdigit():
        return section
    if str(pub.get("year", "")).strip().isdigit():
        return str(pub["year"]).strip()
    m = re.search(r"arxiv\.org/(?:abs|pdf)/(\d\d)(\d\d)\.", url, re.I)
    if m:
        return "20" + m.group(1)
    return "preprint"


def download_pdf(url: str, dest: Path) -> bool:
    """Download URL to dest. Returns True on success."""
    try:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; LabWebsiteBot/1.0)"})
        with urlopen(req, timeout=30) as resp:
            data = resp.read()
            if len(data) < 500:
                return False  # Likely HTML error page
            dest.write_bytes(data)
            return True
    except (HTTPError, URLError, OSError) as e:
        print(f"  Error: {e}", file=sys.stderr)
        return False


def main():
    import argparse
    ap = argparse.ArgumentParser(description="Download PDFs from OpenReview/arXiv and add pdfPath.")
    ap.add_argument("--dry-run", action="store_true", help="Only print actions, do not download or edit.")
    ap.add_argument("--year", type=str, help="Only process this year/section (e.g. 2022 or 'In press').")
    args = ap.parse_args()

    base = Path(__file__).parent.parent
    data_path = base / "src" / "data" / "publications_by_year.json"
    papers_dir = base / "public" / "papers"

    if not data_path.exists():
        print(f"Not found: {data_path}", file=sys.stderr)
        sys.exit(1)
    papers_dir.mkdir(parents=True, exist_ok=True)

    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    sections = list(data.items())
    if args.year:
        sections = [(k, v) for k, v in sections if k == args.year]
    updated = False

    for section, pubs in sections:
        for pub in pubs:
            if pub.get("pdfPath"):
                continue
            url = pub.get("url") or ""
            pdf_url = get_pdf_url(url)
            if not pdf_url:
                continue
            title = pub.get("title", "")
            year = derive_year(section, pub, url)
            base_name = slugify(title) + "-" + str(year) + ".pdf"
            dest = papers_dir / base_name
            pdf_path_value = "/papers/" + base_name

            print(f"[{section}] {title[:55]}...")
            print(f"  PDF URL: {pdf_url}")
            if args.dry_run:
                print(f"  Would save: {dest}")
                print(f"  Would set pdfPath: {pdf_path_value}")
                continue
            if download_pdf(pdf_url, dest):
                print(f"  Saved: {dest}")
                pub["pdfPath"] = pdf_path_value
                updated = True
            else:
                print(f"  Download failed, skipping.")

    if updated and not args.dry_run:
        with open(data_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("\nUpdated publications_by_year.json with new pdfPath entries.")
    elif args.dry_run:
        print("\nDry run: no files changed.")


if __name__ == "__main__":
    main()
