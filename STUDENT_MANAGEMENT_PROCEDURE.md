# PROCEDURE FOR MANAGING STUDENTS AND ALUMNI

## CENTRAL SOURCES OF TRUTH

### CV System
**Location:** `/Users/tserre/Projects/personal/cv/data/mentoring.json`

This file contains ALL student information organized by categories:
- Graduate students
- Postdoctoral fellows  
- Full-time research staff
- Masters students
- Undergraduate honors thesis students
- International/visiting graduate students
- Ph.D. thesis committees
- External examiner roles

### Lab Website System
**Location:** `/Users/tserre/Projects/research/lab_website/src/data/people.json`

This file contains current lab members with:
- Full name
- Title (PhD student, MSc student, etc.)
- University affiliation
- Image path
- Description

## PROCEDURE FOR ADDING NEW STUDENTS

### 1. Add to CV Central File
Edit `/Users/tserre/Projects/personal/cv/data/mentoring.json`

**Structure:**
```json
{
  "years": "2025–present",
  "name": "Student Name",
  "role": "Graduate students",
  "affiliation": "",
  "current_position": "CoPsy; industry"
}
```

**Conventions:**
- Use "present" for current students
- Include co-advisor information in `current_position`
- Use consistent role categories
- **CV uses initials:** A. Ashok, J. Chang, etc.
- **Lab website uses full names:** Alekh Ashok, Jorge Chang, etc.

### 2. Add to Lab Website Central File
Edit `/Users/tserre/Projects/research/lab_website/src/data/people.json`

**Structure:**
```json
{
  "fullName": "Student Name",
  "title": "PhD student",
  "university": "Brown",
  "imagePath": "people/student-name.jpg",
  "description": "Student description..."
}
```

### 3. Regenerate CV
```bash
cd /Users/tserre/Projects/personal/cv/scripts
python generate_cv.py
```

### 4. Update Lab Website
The lab website will automatically reflect changes from `people.json`

### 5. Commit Changes
```bash
cd /Users/tserre/Projects/personal/cv
git add -A
git commit -m "Add new student: [Name]"
git push origin main
```

## PROCEDURE FOR MOVING STUDENTS TO ALUMNI

### 1. Update CV Central File
Edit `/Users/tserre/Projects/personal/cv/data/mentoring.json`

**Change:**
- Update `years` field to include end date (e.g., "2021–2024")
- Update `current_position` to reflect new position

### 2. Remove from Lab Website Central File
Edit `/Users/tserre/Projects/research/lab_website/src/data/people.json`

**Remove the entire student entry** from the `people` array

### 3. Regenerate Both Systems
- Regenerate CV: `python scripts/generate_cv.py`
- Lab website updates automatically

### 4. Commit Changes
```bash
cd /Users/tserre/Projects/personal/cv
git add -A
git commit -m "Move student to alumni: [Name]"
git push origin main
```

## CRITICAL RULES
- ✅ ALWAYS edit BOTH central files (CV and lab website)
- ✅ Keep student information synchronized between systems
- ✅ Use consistent formatting conventions
- ❌ Never edit generated files directly
- ❌ Never edit `/Users/tserre/Projects/personal/cv/latex/serre_cv.tex` directly

## VERIFICATION
1. Check CV shows student in correct category with correct dates
2. Check lab website shows/hides student appropriately
3. Ensure both sources are consistent
4. Verify alumni appear in CV but not on lab website
