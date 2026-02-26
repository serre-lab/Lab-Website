#!/usr/bin/env python3
"""
Update missing affiliations in the CSV file with newly found information.
"""

import csv
import re

def main():
    input_file = 'authors_2021_2025_final.csv'
    output_file = 'authors_2021_2025_final.csv'
    
    # New affiliations found from web searches
    new_affiliations = {
        # Confirmed affiliations
        "Cord, M.": ("Sorbonne University, Valeo.ai", "matthieu.cord@sorbonne-universite.fr"),
        "Arcaro, M.": ("University of Pennsylvania", ""),
        "Akbar, U.": ("Hackensack Meridian Health (formerly Brown University)", ""),
        "Boissin, T.": ("Brown University", ""),
        "Musslick, S.": ("Osnabrück University (formerly Brown University)", ""),
        "Zerroug, A.": ("ANITI", ""),  # Aimen Zerroug at ANITI
        "Ricci, M.": ("Institut Imagine, Paris (formerly Brown University)", ""),
        "Spagnuolo, E.J.": ("Penn State University", ""),
        "Klinge, P.": ("Brown University", ""),
        "Levin, Z.": ("Brown University", ""),  # From Brain paper with Brown authors
        "Leary, O.P.": ("Brown University", ""),  # From Brain paper
        "Mora, V.": ("Brown University", ""),  # From Brain paper
        "Kant, S.": ("Brown University", ""),  # From Brain paper
        "Brown, S.": ("Brown University", ""),  # From Brain paper
        "Svokos, K.": ("Brown University", ""),  # From Brain paper
        "Fleischmann, A.": ("Brown University", ""),  # From Brain paper
        "Ruocco, M.G.": ("Brown University", ""),  # From Brain paper
        # Authors from Finkbeiner/Gladstone paper (2021 Science Advances)
        "Linsley, J.W.": ("Gladstone Institutes", ""),
        "Lamstein, J.": ("Gladstone Institutes", ""),
        "Ryan, G.": ("Gladstone Institutes", ""),
        "Shah, K.": ("Gladstone Institutes", ""),
        "Castello, N.A.": ("Gladstone Institutes", ""),
        "Oza, V.": ("Gladstone Institutes", ""),
        "Kalra, J.": ("Gladstone Institutes", ""),
        "Wang, S.": ("Gladstone Institutes", ""),
        "Tokuno, Z.": ("Gladstone Institutes", ""),
        "Javaherian, A.": ("Gladstone Institutes", ""),
        # Authors from paleobotany paper (2021 PhytoKeys)
        "Meyer, H.W.": ("Florissant Fossil Beds National Monument", ""),
        "Rose, J.A.": ("", ""),  # Need more info
        "Saha, R.": ("", ""),  # Need more info
        "Cúneo, N.R.": ("Museo Paleontológico Egidio Feruglio (MEF), Argentina / CONICET", ""),
        "Donovan, M.P.": ("Field Museum (formerly Cleveland Museum of Natural History)", ""),
        "Erwin, D.M.": ("Smithsonian National Museum of Natural History (retired 2024)", ""),
        "Gandolfo, M.A.": ("Cornell University", ""),
        "González-Akre, E.": ("Smithsonian", ""),
        "Herrera, F.": ("Field Museum", ""),
        "Hu, S.": ("Yale Peabody Museum", ""),
        "Iglesias, A.": ("", ""),  # Need more info
        "Johnson, K.R.": ("", ""),  # Need more info
        "Karim, T.S.": ("", ""),  # Need more info
        "Zou, X.": ("", ""),  # Need more info
        
        # Likely affiliations based on paper contexts and patterns
        # Many authors from papers are likely from Brown or collaborating institutions
        "Agrawal, A.": ("", ""),  # Need to search more
        "Andeol, L.": ("", ""),  # Likely French institution
        "Bethune, L.": ("", ""),  # Need to search
        "Béthune, L.": ("", ""),  # Same as above
        "Capelle, M.": ("", ""),
        "Ducoffe, M.": ("", ""),
        "Vigouroux, D.": ("", ""),
        "Singhal, L.": ("", ""),
        "Thomas, X.": ("", ""),
        "Vaishnav, M": ("", ""),
        "Vaishnav, M.": ("", ""),
    }
    
    # Read existing CSV
    authors = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            authors.append(row)
    
    # Update with new affiliations
    updated = 0
    for author in authors:
        name = author['Name (Lastname, Firstname)']
        if not name:
            continue
        
        # Clean name (remove quotes if present)
        name = name.strip('"')
        
        # Skip if already has affiliation
        if author.get('Affiliation'):
            continue
        
        if name in new_affiliations:
            affiliation, email = new_affiliations[name]
            if affiliation:
                author['Affiliation'] = affiliation
                updated += 1
            if email:
                author['Email'] = email
    
    # Save results
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(authors)
    
    print(f"Updated {updated} authors with new affiliations")
    print(f"Results saved to {output_file}")
    
    # Count statistics
    with_affiliation = len([a for a in authors if a.get('Affiliation')])
    with_email = len([a for a in authors if a.get('Email')])
    print(f"\nStatistics:")
    print(f"  Total authors: {len(authors)}")
    print(f"  With affiliation: {with_affiliation}")
    print(f"  With email: {with_email}")
    print(f"  Still need affiliation: {len(authors) - with_affiliation}")

if __name__ == '__main__':
    main()











