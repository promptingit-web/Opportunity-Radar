# OpportunityRadar — Discover. Explore. Apply. Grow.

> **Never miss an opportunity.**  
> A centralised opportunity discovery and application tracking platform designed for university students.

OpportunityRadar brings together internships, hackathons, scholarships, undergraduate research fellowships, competitions, and startup grants into a structured, searchable, and personalised editorial interface.

---

## 🧭 Product Principles & Aesthetics

- **Editorial Marketplace Design**: Minimal, elegant, information-rich, and built with generous whitespace and precise typography.
- **Strictly No Generic AI SaaS Tropes**: Free of neon purple gradients, glowing borders, identical generic cards, or useless dummy buttons.
- **Transparent Matching Engine**: Real, explainable rule-based scoring comparing verified student profiles against explicit eligibility criteria and skill profiles.
- **True Application Integrity**: No fabricated URLs or dead-end links; every listing directs to official employer portals, research lab pages, or verified hosts.

---

## 🎨 Design System Tokens

| Element | Hex Code | Purpose |
|---|---|---|
| Main Background | `#F7F7F4` | Warm, comfortable editorial canvas |
| Primary Surface | `#FFFFFF` | Clean card and sheet surfaces |
| Primary Text | `#202B3C` | Deep navy readability |
| Secondary Text | `#7C8490` | Refined metadata and labels |
| Primary Accent | `#416FAD` | Confident blue primary actions |
| Accent Background | `#E6EEF8` | Subtle focus states and badges |
| Deadline Accent | `#E9A66B` | Approaching deadlines & urgency |
| Success Background | `#DCE9DD` | Verified status and offers |
| Success Text | `#54765A` | Eligibility & verified labels |
| Research Accent | `#E9E2F1` | Academic research tags |
| Borders | `#E9EAE7` | Crisp divider lines |

### Typography
- **Headings**: DM Sans
- **Body**: Inter
- **Editorial Headlines**: DM Serif Display

---

## ⚡ Key Features

1. **Editorial Discover Homepage**
   - Hero search bar with instant keyword matching and popular tags.
   - Varied Editor’s Picks layout (1 prominent horizontal feature + 2 compact companion cards).
   - Responsive 3-Column discovery layout: Persistent Filters (Left), Category-Specific Opportunity Listings (Center), Personalised Discovery & Deadline Radar (Right).

2. **Category-Specific Metadata Rows**
   - Tailored row formats displaying stipend + duration for Internships, prize pool + team size for Hackathons, award amount + eligibility for Scholarships, and research domain for Academic Labs.

3. **Multi-Dimensional Filters & Sorting**
   - Filter by Program Type, Work Arrangement (Remote, Hybrid, On-site), Academic Standing (1st, 2nd, 3rd, 4th, Graduate), Compensation Type (Paid, Funded, Prize), Skills, and Urgency (Closing this week, this month).

4. **Opportunity Details & Match Radar**
   - Individual editorial pages with official source links.
   - **Eligibility Assessment**: Transparent breakdown explaining why a student is likely eligible, needs to review requirements, or falls outside target standing.
   - **Skill Gap Radar**: Compares student profile skills against required competencies, showing match percentage and suggested areas to review.

5. **Application Tracker (Kanban Board & Table View)**
   - Track application stages: `Interested` → `Applied` → `Assessment` → `Interview` → `Shortlisted` → `Selected` → `Rejected`.
   - Add custom applications or 1-click track any catalog listing.
   - Record interview dates, next steps, and personal prep notes.

6. **Interactive Deadline Calendar**
   - Monthly and weekly grid navigation with color-coded opportunity types.
   - Click any event to open a modal drawer with instant details and apply links.
   - Chronological upcoming deadlines list.

7. **Student Profile & Preferences**
   - Declare university, degree, graduation year, verified skills, and interests.
   - Fully editable and stored client-side in `localStorage`.

8. **Settings & Local Storage Controls**
   - Export workspace history to JSON.
   - One-click demo data reset to restore sample applications and notifications.

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Date Utilities**: date-fns
- **Persistence**: Browser LocalStorage

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

