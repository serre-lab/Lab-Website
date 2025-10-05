# Serre Lab Website – README

Welcome to the Serre Lab site repository! This document explains the structure of the site and how to update content like people, research, resources, and publications.

---

## Typography

For future editors of the code:

- `<Title order={1}>` is for main page titles
- `<Title order={2}>` is for section titles  
- `<Title order={3}>` is for subsection titles
- `<Text>` is for paragraph text

## 🚀 Tech Stack
- **Framework**: React (with Vite)
- **UI Library**: Mantine UI
- **Routing**: React Router (Hash Router)
- **Styling**: CSS Modules + Global CSS
- **Animation**: Framer Motion
- **Icons**: React Icons (Font Awesome)
- **Data Source**: JSON files
- **Markdown**: React Markdown (for dynamic pages)

---

## 🗂 File Structure (Relevant to Content)
```
src/
├── components/
│   ├── Person/Person.tsx        # Person card + modal
│   ├── ResearchProject/        # Research project component
│   ├── LearnMoreAbout/Learn.tsx
│   ├── Header/Header.tsx       # Navigation header
│   ├── Footer/Footer.tsx       # Site footer
│   └── MarkdownPage/           # Dynamic markdown pages
├── data/
│   ├── people.json              # List of lab members
│   ├── alumni.json              # List of alumni
│   ├── research.json            # Research projects
│   ├── resources.json           # Resources and tools
│   ├── scicomm.json             # Media and talks
│   ├── publications_by_year.json  # Publications grouped by year
│   └── officialPublicationUrls.js  # Publication URL mappings
├── pages/
│   ├── Home/Home.tsx            # Homepage
│   ├── People/People.tsx        # People page
│   ├── Research/Research.tsx    # Research page
│   ├── Resources/Resources.tsx  # Resources page
│   ├── Publications/Publications.jsx  # Publications page
│   ├── SciComm/SciComm.tsx      # Media page
│   └── Datasets/                # Dataset pages (HMDB51, Breakfast)
├── markdown-pages/
│   └── resources/               # Dynamic markdown content
└── styles/
    ├── typography.css           # Global typography
    └── index.css                # Global styles
```

---

## 👥 Editing People (People Page)
- **File**: `src/data/people.json`
- **Required fields**:
  - `fullName`: Person's full name
  - `title`: Job title (see valid options below)
  - `university`: Either `"Brown"` or `"ANITI"`
  - `description`: Bio or description
  - `imagePath`: Path to headshot image
  - `website`: Personal website URL (optional)

- **Valid title options**:
  - `"Principal Investigator"`
  - `"Assistant Professor of Research"`
  - `"PostDoc"`
  - `"Grad student"`
  - `"Research Assistant"`
  - `"Undergraduate student"`

- **Format**:
```json
{
  "people": [
    {
      "fullName": "First Last",
      "title": "Grad student",
      "university": "Brown",
      "description": "Short bio or research interests.",
      "imagePath": "/people/firstlast.jpg",
      "website": "https://firstlast.com"
    }
  ]
}
```

- **Alumni**: Edit `src/data/alumni.json` for former lab members
- **Layout**: People are grouped by university and title, sorted alphabetically within groups

---

## 🖼️ Headshot Image Guidelines

- **Recommended size**: 400x400 to 600x600 pixels (square)
- **Aspect ratio**: 1:1 (square)
- **Resolution**: 72–150 dpi (web)
- **File size**: Under 200 KB for fast loading
- **Format**: JPG or PNG
- **Location**: Save in `public/people/` directory
- **Naming**: Use lowercase with hyphens (e.g., `first-last.jpg`)

---

## 📚 Editing Research (Research Page)
- **File**: `src/data/research.json`
- **Format**:
```json
{
  "researchProjects": [
    {
      "title": "Project Name",
      "years": "2021–2024",
      "fundingSource": "NSF / NIH",
      "description": [
        "First paragraph about the project...",
        "Second paragraph with more details..."
      ]
    }
  ]
}
```

---

## 🔗 Editing Resources (Resources Page)
- **File**: `src/data/resources.json`
- **Structure**: Organized by category and subcategory
- **Format**:
```json
{
  "Resources": {
    "Datasets": [
      {
        "title": "Dataset Name",
        "url": "https://example.com"
      }
    ],
    "Demos and Tutorials": [
      {
        "title": "Demo Name", 
        "url": "https://demo.com"
      }
    ],
    "Tools & Software": [
      {
        "title": "Tool Name",
        "url": "https://tool.com"
      }
    ],
    "Videos & Talks": [
      {
        "title": "Talk Title",
        "url": "https://youtube.com/watch?v=..."
      }
    ]
  }
}
```

- **Categories**: Datasets, Demos and Tutorials, Tools & Software, Videos & Talks, Cognitive Benchmark Tests
- **Internal links**: Use paths like `/hmdb51` for internal pages
- **External links**: Use full URLs for external resources

---

## 📄 Editing Publications (Publications Page)
- **File**: `src/data/publications_by_year.json`
- **Structure**: Grouped by year with special categories
- **Format**:
```json
{
  "2024": [
    {
      "title": "Paper Title",
      "authors": "Author1, Author2 & LastAuthor",
      "journal": "Journal Name",
      "url": "https://doi.org/...",
      "pdfPath": "/papers/paper-title-2024.pdf"
    }
  ],
  "Work in progress": [
    {
      "title": "Preprint Title",
      "authors": "Author1 & Author2", 
      "journal": "arXiv",
      "url": "https://arxiv.org/abs/...",
      "pdfPath": "/papers/preprint-2024.pdf"
    }
  ],
  "In press": [
    {
      "title": "Accepted Paper",
      "authors": "Author1 & Author2",
      "journal": "Journal Name",
      "url": "https://journal.com/..."
    }
  ],
  "Before 2010": [
    {
      "title": "Old Paper",
      "authors": "Author1 & Author2",
      "journal": "Journal Name",
      "url": "https://doi.org/..."
    }
  ]
}
```

- **Author formatting**: Use "&" before the last author (e.g., "Author1, Author2 & LastAuthor")
- **PDF icons**: Add `pdfPath` field to show PDF download icon
- **Special categories**: 
  - `"Work in progress"`: Preprints and work in progress
  - `"In press"`: Accepted papers not yet published
  - `"Before 2010"`: All papers from 2009 and earlier
- **Search**: Publications are searchable by title, author, or journal
- **Filtering**: Can filter by year or special category

---

## 📺 Editing Media (Media Page)
- **File**: `src/data/scicomm.json`
- **Structure**: Similar to resources, organized by category
- **Format**:
```json
{
  "Media": {
    "Videos & Talks": [
      {
        "title": "Talk Title",
        "url": "https://youtube.com/watch?v=..."
      }
    ],
    "Podcasts": [
      {
        "title": "Podcast Episode",
        "url": "https://podcast.com/episode"
      }
    ]
  }
}
```

---

## 📊 Adding Dataset Pages
- **Location**: `src/pages/Datasets/`
- **Current pages**: 
  - `HMDB51.tsx` - HMDB51 dataset page
  - `BreakfastDataset.tsx` - Breakfast Actions dataset page
- **Styling**: Use `DatasetPage.css` for consistent styling
- **Routing**: Add routes in `src/App.tsx`

---

## 📝 Adding Dynamic Markdown Pages
- **Location**: `src/markdown-pages/resources/`
- **Format**: Create `.md` files for new pages
- **Routing**: Automatically added to navigation
- **Styling**: Uses `MarkdownPage.css` for consistent formatting

---

## ✨ How to Add New Content

### Adding People:
1. Add headshot to `public/people/`
2. Edit `src/data/people.json` or `src/data/alumni.json`
3. Follow the JSON format above

### Adding Publications:
1. Download PDF to `public/papers/` (optional)
2. Edit `src/data/publications_by_year.json`
3. Add `pdfPath` field if you have a local PDF
4. Use correct author formatting with "&"

### Adding Resources:
1. Edit `src/data/resources.json`
2. Choose appropriate category
3. Use internal paths for site pages, full URLs for external

### Adding Media:
1. Edit `src/data/scicomm.json`
2. Use appropriate category
3. YouTube URLs work best for video previews

> ⚠️ **Important**: Always validate your JSON syntax (check for commas, braces, quotes)

---

## 🔧 Development Workflow

### Local Development:
```bash
npm install          # Install dependencies
npm run dev          # Start development server
# Visit http://localhost:5173
```

### Deployment:
```bash
git add -A
git commit -m "meaningful commit message"
git push
npm run deploy       # Deploy to production
```

### File Management:
- **Images**: Save in `public/` directory
- **PDFs**: Save in `public/papers/` directory  
- **Data**: Edit JSON files in `src/data/`
- **Styling**: Edit CSS files in respective page directories

---

## 🎨 Styling Guidelines

- **Consistent spacing**: Use standardized margins and padding
- **Typography**: Follow the typography hierarchy (Title order 1-3, Text)
- **Colors**: Use CSS variables defined in `src/index.css`
- **Responsive**: All pages should work on mobile and desktop
- **Accessibility**: Use semantic HTML and proper contrast ratios

---

## 🧠 Future Improvements

- **CMS Integration**: Consider using a headless CMS for non-technical editing
- **Image Upload**: Add drag-and-drop image upload functionality
- **Publication Sync**: Automate publication syncing from BibTeX or ORCID
- **Search Enhancement**: Add full-text search across all content
- **Analytics**: Add usage analytics and publication metrics

---

## 📞 Support

For questions about editing the website:
1. Check this README first
2. Look at existing examples in the JSON files
3. Contact the development team

**Happy editing!** 🧠✨