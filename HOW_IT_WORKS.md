# How Your Lab Website Works (Plain English)

## The Big Picture

Your website is a **React application** - think of it like a modern, interactive website where everything updates smoothly without full page reloads. It's built using:

- **React** - The framework that creates interactive web pages
- **TypeScript** - JavaScript with type checking (catches errors before they happen)
- **Vite** - A fast tool that builds and runs your website
- **Mantine UI** - A collection of pre-made, styled components (buttons, cards, etc.)

---

## How It's Structured (Like Building Blocks)

Think of your website like a **stack of building blocks**:

### 1. **The Foundation: `Root.tsx`**
Every page uses the same layout structure:
```
┌─────────────────────────┐
│      Header             │  ← Navigation bar (always at top)
├─────────────────────────┤
│                         │
│    Page Content         │  ← This changes for each page
│    (varies by route)    │
│                         │
├─────────────────────────┤
│      Footer             │  ← Bottom section (always at bottom)
└─────────────────────────┘
```

The header and footer stay the same, but the middle content changes based on which page you're on.

### 2. **The Main App: `App.tsx`**
This is like the **traffic controller** of your website. It:
- Loads all the markdown files (those resource pages)
- Sets up routing (which URL shows which page)
- Wraps everything in a theme/style provider

### 3. **Pages**
Each main section is its own "page component":
- `Home.tsx` - The homepage
- `Research.tsx` - Research projects page
- `Publications.tsx` - List of publications
- `People.tsx` - Lab members
- `Resources.tsx` - Resources and tools
- `SciComm.tsx` - Media and science communication

Each page reads data from JSON files and displays it.

---

## How Data Works (The Content)

Your website stores content in **JSON files** - these are like organized spreadsheets:

### Main Data Files:
- **`people.json`** - List of all lab members (names, photos, descriptions)
- **`alumni.json`** - Former lab members
- **`research.json`** - Research projects and descriptions
- **`publications_by_year.json`** - All publications organized by year
- **`resources.json`** - Tools and resources
- **`scicomm.json`** - Media appearances and talks

### Example: How People Page Works
1. `People.tsx` reads `people.json`
2. It loops through each person in the file
3. For each person, it creates a card showing:
   - Their photo
   - Their name
   - Their title
   - Their description

**To add a new person:** Just edit `people.json` - no code changes needed!

---

## How Routing Works (Navigation)

Your website uses **hash routing** - URLs look like:
- `https://serre-lab.github.io/Lab-Website/#/` (home)
- `https://serre-lab.github.io/Lab-Website/#/people` (people page)
- `https://serre-lab.github.io/Lab-Website/#/research` (research page)

The `#/` part is like a bookmark in the URL.

### Two Types of Pages:

1. **Static Pages** (hard-coded routes):
   - `/` → Home page
   - `/research` → Research page
   - `/publications` → Publications page
   - `/people` → People page
   - `/resources` → Resources page
   - `/sci-comm` → Media page

2. **Dynamic Pages** (auto-generated from markdown):
   - Any `.md` file in `src/markdown-pages/resources/` becomes a page
   - Example: `clickme.md` → becomes `/resources/clickme`
   - The website automatically finds all markdown files and creates pages

---

## How Markdown Pages Work

You have markdown files (like documentation) that automatically become web pages:

1. **Location**: `src/markdown-pages/resources/*.md`
2. **Process**: 
   - Website scans this folder on startup
   - Finds all `.md` files
   - Converts each to a route
   - Renders them using the `MarkdownPage` component
3. **Result**: Add a `.md` file → it automatically becomes a page!

---

## How Styling Works

Your website uses **CSS files** to control how things look:

- **Global styles**: `index.css` - applies to everything
- **Component styles**: Each component has its own `.css` file
  - `Header.css` - styles for the header
  - `Footer.css` - styles for the footer
  - `People.css` - styles for the people page
  - etc.

Colors, fonts, spacing - all controlled by CSS files.

---

## How It Gets Built (From Code to Website)

### Development (when you're working on it):
1. Run `npm run dev`
2. Vite starts a local server
3. You see changes instantly as you edit files
4. Everything runs on `localhost:4000`

### Production (when it goes live):
1. Run `npm run build`
2. Vite:
   - Converts TypeScript to JavaScript
   - Bundles all files together
   - Optimizes images and code
   - Creates a `dist/` folder with ready-to-deploy files
3. Run `npm run deploy`
4. Files in `dist/` get pushed to GitHub Pages
5. Website goes live!

---

## The Component System (Reusable Pieces)

Your website uses **components** - reusable building blocks:

- **`Person.tsx`** - Shows one person card (used multiple times on People page)
- **`ResearchProject.tsx`** - Shows one research project (used multiple times)
- **`HeroBanner.tsx`** - Large banner at top of pages
- **`Header.tsx`** - Navigation bar
- **`Footer.tsx`** - Footer with links

Think of components like LEGO blocks - you build the same block once, then use it many times.

---

## How Updates Work

### To Update Content:
1. **Edit JSON files** (for people, research, publications, etc.)
   - Change `people.json` → People page updates
   - Change `publications_by_year.json` → Publications page updates
2. **Edit markdown files** (for resource pages)
   - Edit any `.md` file in `markdown-pages/resources/`
   - That page updates automatically
3. **Rebuild and redeploy**
   - Run `npm run build`
   - Run `npm run deploy`

### To Change Design:
- Edit CSS files in each component folder
- Changes affect styling, colors, layout

---

## Key Concepts in Plain Terms

### **React Components**
Like custom HTML elements you create. Instead of writing `<div>Person info</div>` every time, you create `<Person name="..." photo="..." />` and reuse it.

### **Props**
Information you pass to components. Like parameters to a function:
```jsx
<Person 
  name="John Doe" 
  title="PhD student"
  photo="/people/john.jpg"
/>
```

### **State**
Data that can change while the website is running. For example, which page you're currently viewing, or whether a modal is open.

### **Routing**
Matching URLs to pages. Like a receptionist directing visitors:
- Visit `/people` → Show People page
- Visit `/research` → Show Research page

### **JSON Files**
Structured data files. Like Excel spreadsheets but in text format:
```json
{
  "people": [
    {
      "name": "John",
      "title": "PhD student"
    }
  ]
}
```

---

## The Flow: From URL to Page

1. **User visits**: `https://serre-lab.github.io/Lab-Website/#/people`
2. **Router checks**: "What page is `/people`?"
3. **Router finds**: `/people` → `People.tsx` component
4. **People.tsx loads**: Reads `people.json` file
5. **People.tsx renders**: Creates person cards for each person
6. **Browser displays**: The formatted page

---

## Why This Structure?

### ✅ **Separation of Content and Code**
- Content (people, publications) = JSON files (easy to edit)
- Code (how it looks, how it works) = TypeScript/React files
- You can update content without touching code!

### ✅ **Reusable Components**
- Write a component once (like `Person.tsx`)
- Use it many times (for each person)
- Change it once → updates everywhere

### ✅ **Easy to Maintain**
- Each page is separate
- Each component is separate
- Easy to find and fix issues

### ✅ **Fast and Modern**
- Uses React (efficient updates)
- Uses Vite (fast builds)
- Static site (loads quickly)

---

## Summary in One Sentence

Your website is a React app that reads JSON data files, automatically creates pages from markdown files, uses reusable components, and gets built into static files that deploy to GitHub Pages.

---

## Common Tasks Made Simple

**Add a new person:**
1. Open `src/data/people.json`
2. Add a new person object
3. Add their photo to `public/people/`
4. Rebuild and deploy

**Add a new research project:**
1. Open `src/data/research.json`
2. Add a new project object
3. Rebuild and deploy

**Add a new resource page:**
1. Create a new `.md` file in `src/markdown-pages/resources/`
2. It automatically becomes a page!
3. Rebuild and deploy

**Change colors/styling:**
1. Edit the CSS files
2. See changes immediately in development
3. Rebuild and deploy for production

---

That's it! Your website is essentially a smart system that reads data files, uses reusable components, and automatically creates pages - all wrapped in a nice-looking, fast-loading React application.

















