# Serre Lab Website – README

Welcome to the Serre Lab site repository! This document explains the structure of the site and how to update content like people, research, resources, and publications.

---

## Typography

For future editors of the code:

- `<Title order={1}>` is for main page titles
- `<Title order={2}>` is for section titles  
- `<Title order={3}>` is for subsection titles
- `<Text>` is for paragraph text

## Tech stack
- **Framework**: React (with Vite)
- **UI Library**: Mantine UI
- **Routing**: React Router (Hash Router)
- **Styling**: CSS Modules + Global CSS
- **Animation**: Motion for React
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
│   ├── HeroBanner/HeroBanner.tsx
│   ├── Header/Header.tsx       # Navigation header
│   ├── Footer/Footer.tsx       # Site footer
│   └── MarkdownPage/           # Dynamic markdown pages
├── data/
│   ├── people.json              # List of lab members
│   ├── alumni.json              # List of alumni
│   ├── research.json            # Grant descriptions and funding
│   ├── resources.json           # Resources and tools
│   ├── scicomm.json             # Media coverage
│   ├── talks.json               # Talks list (not filtered by media search)
│   ├── publications_by_year.json  # Generated from the CV central file
│   └── officialPublicationUrls.js  # Publication URL mappings
├── pages/
│   ├── Home/Home.tsx            # Homepage
│   ├── People/People.tsx        # People page
│   ├── Research/Research.tsx    # Research page
│   ├── Resources/Resources.tsx  # Resources page
│   ├── Publications/Publications.jsx  # Publications page
│   └── SciComm/SciComm.tsx      # Media page
├── markdown-pages/
│   └── resources/               # Dynamic markdown content
└── styles/
    ├── typography.css           # Global typography
    └── index.css                # Global styles
public/
├── hmdb51.html                  # Standalone HMDB page (real path, not a hash route)
├── breakfast-actions-dataset.html
└── datasets/                    # No dataset archives are committed; see public/datasets/README.md
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

## Editing research (Research page)
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
- **Hash routes**: in-app pages such as `/resources/the-multi-cue-boundary-detection-dataset` (the site uses hash routing, so the browser URL is `/#/resources/...`)
- **Standalone HTML**: `/hmdb51.html` and `/breakfast-actions-dataset.html` are real document paths, not hash routes
- **External links**: Use full URLs for external resources

---

## Editing publications

Do not edit `src/data/publications_by_year.json` or `~/Work/personal/cv/data/publications_structured.json` by hand. `publications_structured.json` is generated.

1. Edit only `~/Work/personal/cv/data/publications_central.json`.
2. Follow `~/Work/personal/cv/memory/procedures/publication-style.md` (sentence-case titles, author lines; never arXiv title case).
3. From the configured Python environment (`source ~/Work/agents/claude/scripts/activate-env.sh`):

```bash
cd ~/Work/personal/cv && python scripts/sync_from_central.py
cd ~/Work/research/lab-website && python scripts/sync_from_central_publications.py
```

The CV script regenerates `publications_structured.json` from central and also rewrites the lab JSON, copying `pdf_path` when central has one. The lab script then rebuilds `src/data/publications_by_year.json` from that generated file. It keeps a local `pdfPath` only when the lab file it reads still has one.

Home-page publication cards in `src/pages/Home/Home.tsx` are manual.

Search matches title, authors, and journal as a trimmed, case-insensitive substring. Year groups stay in the existing order: Work in progress, In press, then years descending. A usable `url` on the record is the public link. `src/data/officialPublicationUrls.js` applies only when that URL is missing, blank, a PDF, or a `/papers/` path. Prefer the publisher or DOI link. Do not add an untagged local PDF as the publication link.

---

## Editing media

- **Coverage**: `src/data/scicomm.json` is an array of `{ "title", "link", "blurb", "image" }`.
- **Talks**: `src/data/talks.json` is a separate array (`venue`, `location`, `date`, optional `title`, `link`, `upcoming`). The media search filters coverage only; talks stay listed.
- Search matches title and blurb as a trimmed, case-insensitive substring.

---

## Dataset pages

HMDB and Breakfast are standalone HTML files, not React routes:

- `public/hmdb51.html`
- `public/breakfast-actions-dataset.html`

Resources links them with a normal `<a href>` because the URL ends in `.html`. Other resource write-ups are markdown files under `src/markdown-pages/`. `src/utils/loadMarkdownFiles.ts` registers every `.md` file there as a hash route. They are not added to the main navigation. `src/markdown-pages/resources/joining-the-lab.md` is reachable and is omitted from the sitemap.

The site uses hash routing. Do not add server rewrites to imitate path routing. See `public/datasets/README.md` for which dataset files are actually in the repo.

---

## Adding dynamic markdown pages
- **Location**: `src/markdown-pages/resources/`
- **Format**: Create `.md` files
- **Routing**: Loaded as hash routes by `loadMarkdownFiles`. Included in `public/sitemap.xml` on the next `npm run build`, except `joining-the-lab`
- **Styling**: `MarkdownPage.css`

---

## Adding new content

### Adding People:
1. Add a supplied headshot to `public/people/`, or use an empty `imagePath` for an initials placeholder
2. Edit `src/data/people.json` or `src/data/alumni.json`
3. Follow the JSON format above

### Adding publications:
Edit `~/Work/personal/cv/data/publications_central.json` only, then run the two sync commands in [Editing publications](#editing-publications). Do not hand-edit the generated JSON and do not add an untagged local PDF as the publication link.

### Adding Resources:
1. Edit `src/data/resources.json`
2. Choose appropriate category
3. Use internal paths for site pages, full URLs for external

### Adding Media:
1. Edit `src/data/scicomm.json`
2. Use the image from the source article by default (extract og:image or hero image URL)
3. Each entry: `title`, `link`, `blurb`, `image`

> ⚠️ **Important**: Always validate your JSON syntax (check for commas, braces, quotes)

---

## Development workflow

### Local development
```bash
npm install
npm run dev          # http://localhost:5173
npm run lint
npm test             # Playwright. Builds the site, then previews it on port 4173
npm run build        # Regenerates public/sitemap.xml, then typechecks and builds
npm run deploy       # predeploy runs the build; publishes dist/ with gh-pages
```

Before each deploy, run a Lighthouse accessibility audit and check keyboard navigation (Tab, Shift+Tab, Enter, Escape).

### Hash routing and the sitemap
`src/App.tsx` uses `createHashRouter`. App pages are fragments such as `https://serre.lab.brown.edu/#/publications`. `scripts/generate-sitemap.cjs` writes those hash URLs plus the two standalone dataset HTML files. It omits `lastmod` and leaves `joining-the-lab` unlisted. Many crawlers do not index fragments. The sitemap documents the routes that exist; it does not create server paths for them.

### File management
- **Images**: `public/`
- **Page content**: JSON under `src/data/`, except publications (see above)
- **Styling**: CSS next to each page

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

Contact the development team for questions.