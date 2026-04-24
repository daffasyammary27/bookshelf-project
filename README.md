# BOOK DISCOVERY ARCHIVE [v1.0 BETA]

A minimalist book discovery interface inspired by the **International Typographic Style** (Swiss Design). This application serves as a digital gallery for my interest using the Google Books API.

## 01 / CONCEPT
The project reimagines book searching not as a list of results, but as a curated archival experience. The design focuses on legibility, grid-based harmony, and objective information hierarchy.

## 02 / DESIGN PHILOSOPHY
- **Grid-First**: Every element is aligned to a strict mathematical grid to ensure visual stability.
- **Typography**: Utilizing high-contrast sans-serif typefaces (Inter) and serif accents for a modern archival feel.
- **Interaction**: Smooth state transitions powered by Framer Motion, treating page changes as shifts in a physical index.
- **Color Palette**: 
  - Primary: `#0F172A` (Deep Slate)
  - Accent: `#EF4444` (Swiss Red / Primary Warning)
  - Paper: `#FFFFFF` (Neutral White)

## 03 / TECHNICAL SPECIFICATIONS
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS (Utility-first framework)
- **Animation**: Framer Motion (Page transitions & subtle component interactions)
- **Data Source**: Google Books API
- **State Management**: URL Search Params (for persistence and shareability)
- **Routing**: React Router 6.4+
- **Icons**: Lucide React

## 04 / FEATURES
- **Persistent Search**: Refreshing or navigating back preserves query and pagination state.
- **Archival Detail View**: Deep-dive into book specifics (page count, categories, ratings).
- **Responsive Architecture**: Fully optimized for mobile, tablet, and desktop viewports.
- **Accessibility**: Semantic HTML and logic-driven ARIA labels for assistive technologies.

## 05 / INFRASTRUCTURE
To run this project locally, ensure you have a standard Node.js environment:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
