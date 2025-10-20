#!/usr/bin/env python3
"""
Convert publications_by_year.json to BibTeX format for Zotero import.
"""

import json
import re
from pathlib import Path


def clean_latex_special_chars(text):
    """Escape special LaTeX/BibTeX characters."""
    if not text:
        return ""

    # BibTeX special characters that need escaping
    replacements = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\textasciicircum{}',
    }

    result = text
    for char, replacement in replacements.items():
        result = result.replace(char, replacement)

    return result


def generate_citation_key(authors, year, title):
    """Generate a unique citation key from publication metadata."""
    # Extract first author's last name
    first_author = authors.split(',')[0].split('&')[0].strip()
    # Remove initials and special characters
    first_author = re.sub(r'[^\w\s-]', '', first_author)
    last_name_parts = first_author.split()
    last_name = last_name_parts[-1] if last_name_parts else 'Unknown'

    # Get first meaningful word from title (skip common words)
    skip_words = {'a', 'an', 'the', 'on', 'in', 'at', 'of', 'for', 'to', 'and', 'or'}
    title_words = re.findall(r'\w+', title.lower())
    first_word = next((w for w in title_words if w not in skip_words), 'paper')
    first_word = first_word.capitalize()

    # Handle special year values
    year_str = str(year) if year not in ['Work in progress', 'In press', 'Under review'] else '2025'

    return f"{last_name}{year_str}{first_word}"


def infer_entry_type(journal):
    """Infer BibTeX entry type from journal name."""
    journal_lower = journal.lower()

    # Conference proceedings
    conference_keywords = [
        'conference', 'proceedings', 'workshop', 'symposium', 'cvpr',
        'iccv', 'nips', 'neurips', 'icml', 'iclr', 'wacv', 'eccv'
    ]
    if any(keyword in journal_lower for keyword in conference_keywords):
        return 'inproceedings'

    # Technical reports
    if 'technical report' in journal_lower or 'arxiv' in journal_lower:
        return 'techreport'

    # Books and book chapters
    if 'encyclopedia' in journal_lower or 'book' in journal_lower:
        return 'incollection'

    # Default to article (journal paper)
    return 'article'


def format_authors_bibtex(authors):
    """Format authors for BibTeX (separate with 'and')."""
    # Replace '&' or ',' with 'and' for BibTeX format
    # Handle various author separators
    authors_clean = authors.replace(' et al', ' and others')
    authors_clean = re.sub(r'\s*[†‡]\s*', ' ', authors_clean)  # Remove footnote markers
    authors_clean = re.sub(r'\s*&\s*', ' and ', authors_clean)
    authors_clean = re.sub(r',\s*([A-Z]\.)', r' and \1', authors_clean)

    return authors_clean


def create_bibtex_entry(pub, year):
    """Create a single BibTeX entry from publication data."""
    entry_type = infer_entry_type(pub['journal'])
    citation_key = generate_citation_key(pub['authors'], year, pub['title'])

    # Start building the entry
    lines = [f"@{entry_type}{{{citation_key},"]

    # Required fields
    lines.append(f"  title = {{{pub['title']}}},")
    lines.append(f"  author = {{{format_authors_bibtex(pub['authors'])}}},")

    # Year
    if year not in ['Work in progress', 'In press', 'Under review']:
        lines.append(f"  year = {{{year}}},")
    else:
        lines.append(f"  year = {{2025}},")
        lines.append(f"  note = {{{year}}},")

    # Journal/Booktitle based on entry type
    if entry_type == 'inproceedings':
        lines.append(f"  booktitle = {{{pub['journal']}}},")
    elif entry_type == 'techreport':
        lines.append(f"  institution = {{{pub['journal']}}},")
    elif entry_type == 'incollection':
        lines.append(f"  booktitle = {{{pub['journal']}}},")
    else:  # article
        lines.append(f"  journal = {{{pub['journal']}}},")

    # Optional fields
    if pub.get('url'):
        lines.append(f"  url = {{{pub['url']}}},")

    if pub.get('pdfPath'):
        lines.append(f"  file = {{{pub['pdfPath']}}},")

    # Close entry
    lines.append("}")

    return '\n'.join(lines)


def main():
    """Main function to convert JSON to BibTeX."""
    # Load the JSON file
    json_path = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'

    with open(json_path, 'r', encoding='utf-8') as f:
        publications_by_year = json.load(f)

    # Generate BibTeX entries
    bibtex_entries = []

    # Process years in reverse chronological order
    years = sorted([y for y in publications_by_year.keys() if y.isdigit()], reverse=True)
    special_sections = ['In press', 'Under review', 'Work in progress']

    # Add special sections first
    for section in special_sections:
        if section in publications_by_year:
            for pub in publications_by_year[section]:
                bibtex_entries.append(create_bibtex_entry(pub, section))

    # Add regular years
    for year in years:
        for pub in publications_by_year[year]:
            bibtex_entries.append(create_bibtex_entry(pub, year))

    # Write to file
    output_path = Path(__file__).parent.parent / 'serre_lab_publications.bib'

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("% Serre Lab Publications\n")
        f.write("% Auto-generated from publications_by_year.json\n")
        f.write(f"% Total entries: {len(bibtex_entries)}\n\n")
        f.write('\n\n'.join(bibtex_entries))

    print(f"✓ Generated {len(bibtex_entries)} BibTeX entries")
    print(f"✓ Output file: {output_path}")
    print(f"\nTo import into Zotero:")
    print(f"  1. Open Zotero")
    print(f"  2. Go to File → Import")
    print(f"  3. Select '{output_path.name}'")
    print(f"  4. Choose import options (recommend creating a new collection)")


if __name__ == '__main__':
    main()
