import json
import re
from bs4 import BeautifulSoup

def parse_publications_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    publications = {}
    
    # Find all publication lists
    publication_lists = soup.find_all('ol', class_='publication_list')
    
    for pub_list in publication_lists:
        # Get the year from the h1 tag
        year_tag = pub_list.find('h1', class_='publication_year')
        if year_tag:
            year = year_tag.text.strip()
            publications[year] = []
            
            # Find all publication items in this list
            pub_items = pub_list.find_all('li', class_='publication')
            
            for item in pub_items:
                publication = {}
                
                # Extract title and URL
                title_link = item.find('a', class_='publication_title')
                if title_link:
                    publication['title'] = title_link.text.strip()
                    publication['url'] = title_link.get('href', '')
                
                # Extract journal
                journal_tag = item.find('h2', class_='journal')
                if journal_tag:
                    publication['journal'] = journal_tag.text.strip()
                else:
                    publication['journal'] = ''
                
                # Extract authors
                authors_tag = item.find('h2', class_='authors')
                if authors_tag:
                    publication['authors'] = authors_tag.text.strip()
                else:
                    publication['authors'] = ''
                
                # Add extra info if present
                extra_info = item.find('a', class_='extra_info')
                if extra_info:
                    publication['extra_info'] = extra_info.get('href', '')
                
                publications[year].append(publication)
    
    return publications

# HTML content (paste your HTML here)
html_content = '''
<div class="left_column"><ol class="publication_list"><a href="" name="Work in progress"><h1 class="publication_year">Work in progress</h1></a><li class="low_horizontal_line"></li><li class="publication"><a class="publication_title" href="https://arxiv.org/abs/2504.16940">Better artificial intelligence does not mean better models of biology</a><h2 class="journal">arXiv</h2><h2 class="authors">Linsley, Feng &amp; Serre</h2></li><li class="publication"><a class="publication_title" href="https://arxiv.org/abs/2411.03993v1">Local vs distributed representations: What is the right basis for interpretability?</a><h2 class="journal"></h2><h2 class="authors">J. Colin, L. Goetschalckx, T. Fel, V. Boutin, J. Gopal, T. Serre* 
 &amp; N. Oliver*</h2></li></ol>
<!-- ... rest of your HTML content ... -->
</div>
'''

if __name__ == "__main__":
    # Parse the publications
    publications_data = parse_publications_html(html_content)
    
    # Save to JSON file
    with open('/home/jesus/brown/Lab-Website/publications.json', 'w', encoding='utf-8') as f:
        json.dump(publications_data, f, indent=2, ensure_ascii=False)
    
    print("Publications converted to JSON successfully!")
