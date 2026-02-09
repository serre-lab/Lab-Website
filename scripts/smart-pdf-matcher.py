#!/usr/bin/env python3
"""
Smart PDF matcher that uses multiple strategies:
1. Year + author name patterns
2. Journal abbreviations
3. Title similarity
4. Manual known mappings
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


def extract_authors(authors_str):
    """Extract last names from authors string"""
    if not authors_str:
        return []
    # Split by comma and &
    parts = re.split(r'[,&]', authors_str)
    last_names = []
    for part in parts:
        part = part.strip()
        # Get last word (usually last name)
        words = part.split()
        if words:
            last_name = words[-1]
            # Remove special characters
            last_name = re.sub(r'[^a-zA-Z]', '', last_name)
            if last_name and len(last_name) > 2:
                last_names.append(last_name.lower())
    return last_names


def match_by_year_author(pub_year, authors, pdf_name):
    """Match PDF by year and author pattern"""
    if not pub_year.isdigit():
        return False, 0.0
    
    year = pub_year
    pdf_lower = pdf_name.lower()
    
    # Check if PDF starts with year
    if pdf_lower.startswith(year) or f"_{year}" in pdf_lower or f"-{year}" in pdf_lower:
        # Extract authors from PDF filename
        author_last_names = extract_authors(authors)
        for author in author_last_names:
            if author in pdf_lower:
                return True, 0.8
    return False, 0.0


def match_by_journal_abbrev(journal, pdf_name):
    """Match by journal abbreviation"""
    journal_lower = journal.lower()
    pdf_lower = pdf_name.lower()
    
    # Common journal abbreviations
    abbrevs = {
        'neural information processing systems': ['nips', 'neurips'],
        'international conference on learning representations': ['iclr'],
        'ieee conference on computer vision and pattern recognition': ['cvpr'],
        'proceedings of the national academy of science': ['pnas'],
        'proceedings of the national academy of sciences': ['pnas'],
        'nature communications': ['ncomms'],
        'journal of neuroscience': ['jn'],
        'neuroimage': ['ni'],
        'vision research': ['visrsrch'],
        'ieee international computer vision conference': ['iccv'],
        'royal society interface focus': ['rsfs'],
        'biological psychiatry': ['biolpsych'],
        'european computer vision conference': ['eccv'],
        'annual meeting of the cognitive science society': ['cogsci'],
        'ieee conference on information sciences and systems': ['ciss'],
    }
    
    for full_name, abbrev_list in abbrevs.items():
        if full_name in journal_lower:
            for abbrev in abbrev_list:
                if abbrev in pdf_lower:
                    return True, 0.7
    return False, 0.0


def similarity_score(text1, text2):
    """Calculate similarity score"""
    norm1 = normalize_for_matching(text1)
    norm2 = normalize_for_matching(text2)
    return SequenceMatcher(None, norm1, norm2).ratio()


# Manual mappings for known matches
MANUAL_MAPPINGS = {
    "NeuroSurgeon: A Toolkit for Subnetwork Analysis": None,  # Need to search
    "Harmonizing the object recognition strategies of deep neural networks with humans": "harmonizing-object-recognition-2022.pdf",
    "A benchmark for compositional visual reasoning": "benchmark-compositional-visual-reasoning-2022.pdf",
    "Meta-reinforcement learning with self-modifying networks": "meta-reinforcement-learning-self-modifying-networks-2022.pdf",
    "Diversity vs. recognizability: Human-like generalization in one-shot generative models": "diversity-vs-recognizability-2022.pdf",
    "A practitioner's guide to improve the logistics of spatiotemporal deep neural networks": None,  # Need to check
    "Recurrent neural circuits for contour detection": "recurrent-neural-circuits-contours-detection-2020.pdf",
    "Development of a deep learning algorithm for the histopathologic diagnosis and gleason grading of prostate cancer biopsies: A pilot study": None,  # Need to search
    "Neural computing on a raspberry pi: Applications to zebrafish behavior monitoring": "VAIB_2018-1.pdf",
    "Not-So-CLEVR: Learning same–different relations strains feedforward neural networks": "not-so-clevr-diagnosing-biases-2022.pdf",
    "Same-different problems strain convolutional neural networks": "same-different-conceptualization-machine-vision-2020.pdf",
    "Learning to predict action potentials end-to-end from calcium imaging data": "Linsley_et_al_CISS2018.pdf",
    "What are the visual features underlying human versus machine vision?": "Linsley_et_al_MBCC_2017-3.pdf",
    "Models of visual categorization": None,  # Need to check
    "How deep is the feature analysis underlying rapid visual categorization?": "2016_Eberhardt_NIPS.pdf",
    "Computer vision cracks the leaf code": "2016_Wilf_PNAS.pdf",
    "Fast ventral stream neural activity enables rapid visual categorization": "2016_Cauchoix_NI.pdf",
    "Source modelling of ElectroCorticoGraphy (ECoG) data: Analysis of stability and spatial filtering": "2016_Pascarella_JNM-1.pdf",
    "Towards a theory of computation in the visual cortex": "2016_Mely_CCNV.pdf",
    "An end-to-end generative framework for video segmentation and recognition": "2016_Kuehne_I3WACV.pdf",
    "Unsupervised invariance learning of transformation sequences in a model of object recognition yields selectivity for non-accidental properties": "unsupervised-invariance-learning-2015.pdf",
    "The neural dynamics of face detection in the wild revealed by MVPA": None,  # Already assigned to neural-dynamics-face-detection-2014.pdf but might be wrong
    "The language of actions: Recovering the syntax and semantics of goal-directed human activities": None,  # Need to check
    "Hierarchical models of the visual system": "hierarchical-models-visual-system-2020.pdf",  # Already assigned
    "Neural representation of action sequences: How far can a simple snippet-matching model take us?": "2013_Tan_NIPS.pdf",
    "The ankyrin 3 (ANK3) bipolar disorder gene regulates mood-related behaviors that are modulated by lithium and stress": "Leussis_Ank3_BiolPsych2012.pdf",
    "A new biologically inspired color image descriptor": None,  # Need to check
    "The neural dynamics of visual processing in monkey extrastriate cortex: A comparison between univariate and multivariate techniques": "Cauchoix_etal_NIPS20122.pdf",
    "Object decoding with attention in inferior temporal cortex": "PNAS-2011-Zhang-8850-5.pdf",
    "HMDB: A large video database for human motion recognition": "Kuehne_etal_ICCV2011.pdf",
    "Automated home-cage behavioral phenotyping of mice": None,  # Need to check - might be ncomms1064.pdf
    "What and where: A Bayesian inference theory of attention": "Chikkerur_Serre_Tan_Poggio_VisRsrchApril2010.pdf",
    "Elements for a neural theory of the processing of dynamic faces": "SerreGiese-Curio_13_Ch13_187-210.pdf",
    "Reading the mind's eye: Decoding category information during mental imagery": "ReddyNeuroImage2009.pdf",
    "A feedforward architecture accounts for rapid categorization": "PNAS-2007-Serre-6424-9.pdf",
    "A biologically inspired system for action recognition": "Jhuang_etal_iccv07.pdf",
    "A component-based framework for face detection and identification": None,  # Need to check
    "Learning a dictionary of shape-components in visual cortex: Comparison with neurons, humans and machines": "Serre_MIT-CSAIL-TR-2006-028.pdf",
    "Learning features of intermediate complexity for the recognition of biological motion": "sigala_etal-ICANN05.pdf",
    "Object recognition with features inspired by visual cortex": None,  # Need to check
    "Using component features for face recognition": "ivanov_etal-FG04.pdf",
    "A theory of object recognition: computations and circuits in the feedforward path of the ventral stream in primate visual cortex": None,  # MIT TR
    "Realistic modeling of simple and complex cell tuning in the HMAX model, and implications for invariant object recognition in cortex": "serre_riesenhuber-AIM-2004-017.pdf",
    "Hierarchical classification and feature reduction for fast face detection with support vector machines": None,  # Need to check
    "On the role of object-specific features for real-world object recognition in biological vision": None,  # Need to check
    "Feature reduction and hierarchy of classifiers for fast object detection in video images": None,  # Need to check
}


def find_best_match(title, year, authors, journal, pdf_files, used_pdfs):
    """Find best matching PDF using multiple strategies"""
    # Check manual mappings first
    if title in MANUAL_MAPPINGS:
        pdf_name = MANUAL_MAPPINGS[title]
        if pdf_name:
            for pdf_file in pdf_files:
                if pdf_file.name == pdf_name and pdf_file.name not in used_pdfs:
                    return pdf_file, 0.95
    
    best_match = None
    best_score = 0.0
    
    for pdf_file in pdf_files:
        if pdf_file.name in used_pdfs:
            continue
        
        pdf_stem = pdf_file.stem
        pdf_lower = pdf_file.name.lower()
        
        # Strategy 1: Year + Author match
        matched, score = match_by_year_author(year, authors, pdf_file.name)
        if matched and score > best_score:
            best_score = score
            best_match = pdf_file
            continue
        
        # Strategy 2: Journal abbreviation match
        matched, score = match_by_journal_abbrev(journal, pdf_file.name)
        if matched and score > best_score:
            best_score = score
            best_match = pdf_file
            continue
        
        # Strategy 3: Title similarity
        score = similarity_score(title, pdf_stem)
        if score > best_score:
            best_score = score
            best_match = pdf_file
    
    return best_match, best_score


def main():
    """Find PDFs for all missing publications"""
    print("🔍 Smart PDF matching for missing publications...\n")
    
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    papers_dir = Path(__file__).parent.parent / 'public' / 'papers'
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    pdf_files = list(papers_dir.glob('*.pdf'))
    print(f"📚 Found {len(pdf_files)} PDF files\n")
    
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
            if title and not pub.get('pdfPath') and year != "In press":
                missing.append((year, title, pub))
    
    print(f"Found {len(missing)} publications without PDFs\n")
    print("=" * 80)
    
    matches = []
    no_matches = []
    
    for year, title, pub in missing:
        authors = pub.get('authors', '')
        journal = pub.get('journal', '')
        
        best_match, best_score = find_best_match(title, year, authors, journal, pdf_files, used_pdfs)
        
        if best_match and best_score > 0.5:
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
                'authors': authors,
                'journal': journal,
                'pub': pub
            })
    
    print("=" * 80)
    print(f"\n📊 Summary:")
    print(f"  - Found matches: {len(matches)}")
    print(f"  - Need manual search: {len(no_matches)}\n")
    
    if no_matches:
        print("=" * 80)
        print("PUBLICATIONS NEEDING MANUAL SEARCH:")
        print("=" * 80)
        for item in no_matches[:10]:  # Show first 10
            print(f"\n- {item['title']}")
            print(f"  Year: {item['year']}, Journal: {item['journal']}")
            print(f"  Authors: {item['authors'][:80]}")
    
    return matches, no_matches


if __name__ == "__main__":
    matches, no_matches = main()
    
    if matches:
        print(f"\n💡 Found {len(matches)} matches. Should I apply them?")
