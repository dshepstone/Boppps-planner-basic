# BOPPPS Planner Basic
A React-based lesson planning tool that guides instructors through the BOPPPS model (Bridge-in, Objectives, Pre-assessment, Presentation/Practice/Participation, Post-assessment, Summary) with printable and exportable outputs.

## Recent Updates
- Repository renamed to **Boppps-planner-basic** and remote updated accordingly.
- Objective replacement bug fix merged into `main`, ensuring objectives are preserved when loading or exporting lesson data.

## Key Features
- Structured BOPPPS lesson planner with dedicated fields for bridge-in, objectives, assessments, activities, summary, and reflections.
- Dynamic activity rows with add/remove controls for Presentation/Practice/Participation steps.
- JSON import/export for saving and restoring lesson plans, plus a bundled sample plan for quick starts.
- HTML export and print-optimized layout for sharing or hard copies.
- Inline guidance and placeholder text to help complete each section.

## Tech Stack
- React 18 with Create React App toolchain (`react-scripts`).
- Tailwind CSS (PostCSS build) for utility-first styling.
- Lucide React for UI icons.

## Getting Started
### Prerequisites
- Node.js 14 or higher (16+ recommended).
- npm (comes with Node.js).

### Installation
1. Clone the repository:
   ```bash
   git clone <your-remote-url> Boppps-planner-basic
   cd Boppps-planner-basic
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Run
Start the development server (defaults to http://localhost:3000):
```bash
npm start
```

## Scripts
- `npm start` – Run the app in development mode.
- `npm test` – Launch the test runner.
- `npm run build` – Create an optimized production build.
- `npm run eject` – Eject CRA configuration (irreversible).

## Project Structure
- `src/App.js` – Top-level app component mounting the planner.
- `src/index.js` – React entry point.
- `src/index.css` – Global styles and Tailwind imports.
- `src/components/BopppsPlanner.js` – Main planner UI with form logic, exports, printing, and sample loader.
- `public/` – Static assets and HTML template.
- `boppps-sample-json.json` – Example lesson plan for import.

## Configuration / Environment Variables
None required.

## Common Troubleshooting
- **Port already in use**: Set `PORT=3001 npm start` to use a different port.
- **Dependency errors**: Ensure Node.js is updated (14+) and reinstall packages with `rm -rf node_modules package-lock.json && npm install`.
- **Styles not applying**: Restart `npm start` after dependency installs so Tailwind/PostCSS rebuilds.
- **Blank page/build failures**: Clear the CRA cache with `npm start -- --reset-cache` or reinstall dependencies.

## Contributing
- Use `main` as the stable branch and develop new work on short-lived feature branches.
- Keep pull requests focused and small for quicker reviews.

## License
No license specified yet.
