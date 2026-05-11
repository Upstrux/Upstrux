# UPSTRUX Website — GitHub + Vercel Ready

This is a complete Vite + React + Tailwind project prepared for GitHub and Vercel deployment.

## Important image setup

The uploaded project images are inside:

```txt
src/assets/
```

They are imported in:

```txt
src/App.jsx
```

Example:

```jsx
import structuralAnalysisDesign from "./assets/structural-analysis-design.png";
import buildingTechnology from "./assets/building-technology.jpg";
import constructionManagement from "./assets/construction-management.jpg";
```

This is the most reliable method for Vite/Vercel and prevents broken image paths.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Vercel settings

- Framework Preset: Vite
- Build Command: npm run build
- Output Directory: dist

## Project structure

```txt
upstrux-website/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.cjs
├── vercel.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    └── assets/
        ├── structural-analysis-design.png
        ├── building-technology.jpg
        └── construction-management.jpg
```
