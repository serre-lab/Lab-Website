#!/usr/bin/env python3
"""
Apply PDF matches to publications.
Only applies matches that are valid (PDF not already used, good score).
"""
import json
from pathlib import Path

# Valid matches to apply (manually verified)
VALID_MATCHES = {
    "A benchmark for compositional visual reasoning": "benchmark-compositional-visual-reasoning-2022.pdf",
    "Meta-reinforcement learning with self-modifying networks": "meta-reinforcement-learning-self-modifying-networks-2022.pdf",
    "Diversity vs. recognizability: Human-like generalization in one-shot generative models": "diversity-vs-recognizability-2022.pdf",
    "Neural computing on a raspberry pi: Applications to zebrafish behavior monitoring": "VAIB_2018-1.pdf",
    "Not-So-CLEVR: Learning same–different relations strains feedforward neural networks": "not-so-clevr-diagnosing-biases-2022.pdf",
    "Same-different problems strain convolutional neural networks": "2018_COGSCI-1.pdf",
    "Learning to predict action potentials end-to-end from calcium imaging data": "Linsley_et_al_CISS2018.pdf",
    "What are the visual features underlying human versus machine vision?": "Linsley_et_al_MBCC_2017-3.pdf",
    "How deep is the feature analysis underlying rapid visual categorization?": "2016_Eberhardt_NIPS.pdf",
    "Computer vision cracks the leaf code": "2016_Wilf_PNAS.pdf",
    "Fast ventral stream neural activity enables rapid visual categorization": "2016_Cauchoix_NI.pdf",
    "Source modelling of ElectroCorticoGraphy (ECoG) data: Analysis of stability and spatial filtering": "2016_Pascarella_JNM-1.pdf",
    "Towards a theory of computation in the visual cortex": "2016_Mely_CCNV.pdf",
    "An end-to-end generative framework for video segmentation and recognition": "2016_Kuehne_I3WACV.pdf",
    "Neural representation of action sequences: How far can a simple snippet-matching model take us?": "2013_Tan_NIPS.pdf",
    "The ankyrin 3 (ANK3) bipolar disorder gene regulates mood-related behaviors that are modulated by lithium and stress": "Leussis_Ank3_BiolPsych2012.pdf",
    "The neural dynamics of visual processing in monkey extrastriate cortex: A comparison between univariate and multivariate techniques": "Cauchoix_etal_NIPS20122.pdf",
    "Object decoding with attention in inferior temporal cortex": "PNAS-2011-Zhang-8850-5.pdf",
    "HMDB: A large video database for human motion recognition": "Kuehne_etal_ICCV2011.pdf",
    "What and where: A Bayesian inference theory of attention": "Chikkerur_Serre_Tan_Poggio_VisRsrchApril2010.pdf",
    "Elements for a neural theory of the processing of dynamic faces": "SerreGiese-Curio_13_Ch13_187-210.pdf",
    "A feedforward architecture accounts for rapid categorization": "PNAS-2007-Serre-6424-9.pdf",
    "A biologically inspired system for action recognition": "Jhuang_etal_iccv07.pdf",
    "Learning a dictionary of shape-components in visual cortex: Comparison with neurons, humans and machines": "Serre_MIT-CSAIL-TR-2006-028.pdf",
    "Learning features of intermediate complexity for the recognition of biological motion": "sigala_etal-ICANN05.pdf",
    "Using component features for face recognition": "ivanov_etal-FG04.pdf",
    "Realistic modeling of simple and complex cell tuning in the HMAX model, and implications for invariant object recognition in cortex": "serre_riesenhuber-AIM-2004-017.pdf",
    "Unsupervised invariance learning of transformation sequences in a model of object recognition yields selectivity for non-accidental properties": "unsupervised-invariance-learning-2015.pdf",
}

# Need to check these manually or search online
NEED_MANUAL_CHECK = [
    "NeuroSurgeon: A Toolkit for Subnetwork Analysis",
    "Harmonizing the object recognition strategies of deep neural networks with humans",  # Already assigned elsewhere
    "A practitioner's guide to improve the logistics of spatiotemporal deep neural networks",
    "Recurrent neural circuits for contour detection",
    "Development of a deep learning algorithm for the histopathologic diagnosis and gleason grading of prostate cancer biopsies: A pilot study",
    "Models of visual categorization",
    "Hierarchical models of the visual system",  # Already assigned
    "The neural dynamics of face detection in the wild revealed by MVPA",
    "The language of actions: Recovering the syntax and semantics of goal-directed human activities",
    "A new biologically inspired color image descriptor",
    "Automated home-cage behavioral phenotyping of mice",
    "Reading the mind's eye: Decoding category information during mental imagery",
    "A component-based framework for face detection and identification",
    "Object recognition with features inspired by visual cortex",
    "A theory of object recognition: computations and circuits in the feedforward path of the ventral stream in primate visual cortex",
    "Hierarchical classification and feature reduction for fast face detection with support vector machines",
    "On the role of object-specific features for real-world object recognition in biological vision",
    "Feature reduction and hierarchy of classifiers for fast object detection in video images",
]


def main():
    """Apply valid PDF matches"""
    lab_file = Path(__file__).parent.parent / 'src' / 'data' / 'publications_by_year.json'
    papers_dir = Path(__file__).parent.parent / 'public' / 'papers'
    
    with open(lab_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Get currently used PDFs
    used_pdfs = set()
    for year, pubs in data.items():
        for pub in pubs:
            pdf_path = pub.get('pdfPath', '')
            if pdf_path and pdf_path.startswith('/papers/'):
                used_pdfs.add(pdf_path.replace('/papers/', ''))
    
    # Check which PDFs from VALID_MATCHES are available
    pdf_files = {f.name for f in papers_dir.glob('*.pdf')}
    
    applied = 0
    skipped = []
    
    print("Applying PDF matches...\n")
    
    for year, pubs in data.items():
        for pub in pubs:
            title = pub.get('title', '')
            if title in VALID_MATCHES:
                pdf_name = VALID_MATCHES[title]
                
                # Check if PDF exists
                if pdf_name not in pdf_files:
                    print(f"⚠️  PDF not found: {pdf_name} for '{title[:50]}'")
                    skipped.append((title, pdf_name, "PDF not found"))
                    continue
                
                # Check if PDF is already used
                if pdf_name in used_pdfs:
                    print(f"⚠️  PDF already used: {pdf_name} for '{title[:50]}'")
                    skipped.append((title, pdf_name, "PDF already assigned"))
                    continue
                
                # Apply the match
                pub['pdfPath'] = f"/papers/{pdf_name}"
                used_pdfs.add(pdf_name)
                applied += 1
                print(f"✅ {title[:60]}")
                print(f"   → {pdf_name}\n")
    
    # Save updated data
    with open(lab_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print("=" * 80)
    print(f"📊 Summary:")
    print(f"  - Applied: {applied} matches")
    print(f"  - Skipped: {len(skipped)}")
    if skipped:
        print(f"\nSkipped matches:")
        for title, pdf, reason in skipped:
            print(f"  - {title[:50]}: {reason}")
    
    print(f"\n✅ Updated {lab_file}")
    print(f"\nRemaining publications needing manual check: {len(NEED_MANUAL_CHECK)}")


if __name__ == "__main__":
    main()
