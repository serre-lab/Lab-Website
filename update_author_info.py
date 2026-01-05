#!/usr/bin/env python3
"""
Update author information with all known data and search results.
"""

import csv
import re

def main():
    input_file = 'authors_2021_2025_with_info.csv'
    output_file = 'authors_2021_2025_final.csv'
    
    # Comprehensive known information
    known_info = {
        # Brown University authors
        "Linsley, D.": ("Brown University", "drew_linsley@brown.edu"),
        "Linsley, D.A.": ("Brown University", "drew_linsley@brown.edu"),
        "Serre, T.": ("Brown University", "thomas_serre@brown.edu"),
        "Ashok, A.K.": ("Brown University", ""),
        "Chen, S.": ("Brown University", ""),
        "Cheng, Y.": ("Brown University", ""),
        "Lepori, M.A.": ("Brown University", ""),
        "Zhou, P.": ("Brown University", ""),
        "Nagaraj, A.": ("Brown University", ""),
        "Govindarajan, L.N.": ("Brown University", ""),
        "Govindarajan, L.": ("Brown University", ""),
        "Sheinberg, D.L.": ("Brown University", "david_sheinberg@brown.edu"),
        "Sheinber, D.": ("Brown University", "david_sheinberg@brown.edu"),
        "Pavlick, E.": ("Brown University", "ellie_pavlick@brown.edu"),
        "Borton, D.A.": ("Brown University", "david_borton@brown.edu"),
        "Kim, J.K.": ("Brown University", ""),
        "Sharma, T.": ("Brown University", ""),
        "Gupta, P.": ("Brown University", ""),
        "Thakkar, K.": ("Brown University", ""),
        "Veerabadran, V.": ("Brown University", ""),
        "Placido, D.": ("Brown University", ""),
        "Gunther, K.": ("Brown University", ""),
        "Lynn, A.": ("Brown University", ""),
        "Baumgartner, H.": ("Brown University", ""),
        "Amso, D.": ("Brown University", ""),
        "Ahuja, A.": ("Brown University", ""),
        "Rodriguez, I.F.": ("Brown University", ""),
        "Rodriguez, N.Y.": ("Brown University", ""),
        "Lewis, F.E": ("Brown University", ""),
        "Lewis, F.E.": ("Brown University", ""),
        "Jung, M.": ("Brown University", ""),
        "Calvert, J.S.": ("Brown University", ""),
        "Parker, S.R.": ("Brown University", ""),
        "Miranda, P.": ("Brown University", ""),
        "Shaaya, E.": ("Brown University", ""),
        "Jang, J.": ("Brown University", ""),
        "Angelino, K.": ("Brown University", ""),
        "Chitnis, G.": ("Brown University", ""),
        "Iyassu, Y.": ("Brown University", ""),
        "Fridley, J.S.": ("Brown University", ""),
        "McLaughlin, B.L.": ("Brown University", ""),
        "Darie, R.": ("Brown University", ""),
        "Desrochers, T.": ("Brown University", ""),
        "Reuter, M.": ("Brown University", ""),
        "Frank, M.J.": ("Brown University", ""),
        "Liu, R.G.": ("Brown University", ""),
        "Liu, R.": ("Brown University", ""),
        "Goetschalckx, L.": ("Brown University", ""),
        "Feng, P.": ("Brown University", ""),
        "Gaonkar, G.": ("Brown University", ""),
        
        # CNRS/CerCo/ANITI authors
        "VanRullen, R.": ("CerCo, CNRS, Toulouse", "rufin.vanrullen@cnrs.fr"),
        "Alamia, A.": ("CerCo, CNRS, Toulouse", ""),
        "Boutin, V.": ("CNRS, CerCo, Toulouse", ""),
        "Muzellec, S.": ("CerCo, CNRS, Toulouse", ""),
        "Chalvidal, M.": ("ANITI, Brown University", ""),
        "Colin, J.": ("ANITI, ELLIS Alicante", ""),
        "Colin, J": ("ANITI, ELLIS Alicante", ""),
        
        # Harvard
        "Fel, T.": ("Harvard University (Kempner Institute)", "tfel@g.harvard.edu"),
        "Fel, T": ("Harvard University (Kempner Institute)", "tfel@g.harvard.edu"),
        
        # Other institutions
        "Finkbeiner, S.": ("Gladstone Institutes", "sfinkbeiner@gladstone.ucsf.edu"),
        "Mingolla, E.": ("Northeastern University", "e.mingolla@northeastern.edu"),
        "Mingolla, E.‡": ("Northeastern University", "e.mingolla@northeastern.edu"),
        
        # Additional known authors (from paper contexts)
        "Linsley, J.W.": ("", ""),  # Likely related to Drew Linsley
        "Linsley, D.A.": ("Brown University", "drew_linsley@brown.edu"),
        "Lamstein, J.": ("", ""),
        "Ryan, G.": ("", ""),
        "Shah, K.": ("", ""),
        "Castello, N.A.": ("", ""),
        "Oza, V.": ("", ""),
        "Kalra, J.": ("", ""),
        "Wang, S.": ("", ""),
        "Tokuno, Z.": ("", ""),
        "Javaherian, A.": ("", ""),
        "Cadene, R.": ("Hugging Face (formerly Tesla, Sorbonne University)", "re.cadene@gmail.com"),
        "Cadène, R.": ("Hugging Face (formerly Tesla, Sorbonne University)", "re.cadene@gmail.com"),
        "Vigouroux, D.": ("", ""),
        "Malik, G.": ("", ""),
        "Ricci, M.": ("", ""),
        "Singhal, L.": ("", ""),
        "Thomas, X.": ("", ""),
        "Zerroug, A.": ("", ""),
        "Vaishnav, M.": ("", ""),
        "Musslick, S.": ("", ""),
        "Spagnuolo, E.J.": ("", ""),
        "Wilf, P.": ("Penn State University", "pwilf@psu.edu"),
        "Wing, S.L.": ("Smithsonian Institution", "WingS@si.edu"),
        "Meyer, H.W.": ("", ""),
        "Rose, J.A.": ("", ""),
        "Saha, R.": ("", ""),
        "Cúneo, N.R.": ("", ""),
        "Donovan, M.P.": ("", ""),
        "Erwin, D.M.": ("", ""),
        "Gandolfo, M.A.": ("", ""),
        "González-Akre, E.": ("", ""),
        "Herrera, F.": ("", ""),
        "Hu, S.": ("", ""),
        "Iglesias, A.": ("", ""),
        "Johnson, K.R.": ("", ""),
        "Karim, T.S.": ("", ""),
        "Zou, X.": ("", ""),
        "Lindsay, G.": ("", ""),
        "Soni, A.": ("", ""),
        "Zhang, Y.": ("", ""),
        "Kakodkar, R.": ("", ""),
        "Hervier, L.": ("", ""),
        "Poche, A.": ("", ""),
        "Plakoo, J.": ("", ""),
        "Boissin, T.": ("", ""),
        "Picard, A.": ("", ""),
        "Nicodeme, C.": ("", ""),
        "Nicodème, C.": ("", ""),
        "Gardes, L.": ("", ""),
        "Flandin, G.": ("", ""),
        "Ben Tanfous, A.": ("", ""),
        "Moayeri, M.": ("", ""),
        "Bethune, L.": ("", ""),
        "Béthune, L.": ("", ""),
        "Andeol, L.": ("", ""),
        "Novello, P.": ("", ""),
        "Rousseau, T.": ("", ""),
        "Arcaro, M.": ("", ""),
        "Sharma, S.": ("", ""),
        "Livingstone, M.": ("Harvard Medical School", ""),
        "Livingstone, M.S.": ("Harvard Medical School", ""),
        "Mukherji, R.": ("", ""),
        "Agrawal, A.": ("", ""),
        "Lampinen, A.K.": ("", ""),
        "Hermann, K.": ("", ""),
        "Tartaglini, A.R.": ("", ""),
        "Vong, W.K.": ("", ""),
        "Lake, B.M.": ("New York University", "brenden@nyu.edu"),
        "Hu, J.": ("", ""),
        "Dasgupta, I.": ("", ""),
        "Patel, R.": ("", ""),
        "Du, Y.": ("", ""),
        "Shahamatdar, S.": ("", ""),
        "Saeed-Vafa, D.": ("", ""),
        "Khalil, F.": ("", ""),
        "Lovinger, K.": ("", ""),
        "Li, L.": ("", ""),
        "McLeod, H.": ("", ""),
        "Ramachandran, S.": ("", ""),
        "Levin, Z.": ("", ""),
        "Leary, O.P.": ("", ""),
        "Mora, V.": ("", ""),
        "Kant, S.": ("", ""),
        "Brown, S.": ("", ""),
        "Svokos, K.": ("", ""),
        "Akbar, U.": ("", ""),
        "Klinge, P.": ("", ""),
        "Fleischmann, A.": ("", ""),
        "Ruocco, M.G.": ("", ""),
        "Ducoffe, M.": ("", ""),
        "Capelle, M.": ("", ""),
        "Gopal, J.": ("", ""),
        "Oliver, N.": ("ELLIS Alicante", "nuria@alum.mit.edu"),
        "Roelfsema, P.": ("Netherlands Institute for Neuroscience", "p.roelfsema@nin.knaw.nl"),
        "Pizlo, Z.": ("Purdue University / UC Irvine", "zpizlo@purdue.edu"),
        "Olaiya, S.": ("", ""),
        "Solinsky, R.": ("", ""),
        "Del Valle, L.M.": ("", ""),
        "Tiwari, E.": ("", ""),
        "Syed, S.": ("", ""),
        "Villalobos, R.M.": ("", ""),
        "Aguiar, L.M.": ("", ""),
        "Tang, H.": ("", ""),
        "McPherson, S.": ("", ""),
        "Xue, W.": ("", ""),
        "Carayannopoulos, A.G.": ("", ""),
        "Oyelese, A.A.": ("", ""),
        "Gokaslan, Z.L.": ("", ""),
        "Bansal, A.K.": ("", ""),
        "Resnik, L.J.": ("", ""),
    }
    
    # Read existing CSV
    authors = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            authors.append(row)
    
    # Update with known information
    updated = 0
    for author in authors:
        name = author['Name (Lastname, Firstname)']
        if not name:
            continue
        
        # Clean name (remove quotes if present)
        name = name.strip('"')
        
        if name in known_info:
            affiliation, email = known_info[name]
            if affiliation and not author.get('Affiliation'):
                author['Affiliation'] = affiliation
                updated += 1
            if email and not author.get('Email'):
                author['Email'] = email
                updated += 1
    
    # Save results
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name (Lastname, Firstname)', 'Affiliation', 'Email', 'Latest Publication Date']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(authors)
    
    print(f"Updated {updated} authors with known information")
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









