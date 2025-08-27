# BOPPPS Lesson Planning Template

A React-based interactive lesson planning tool following the BOPPPS instructional design model (Bridge-in, Objectives, Pre-assessment, Presentation/Practice/Participation, Post-assessment, Summary).

## Features

- **Interactive Form**: Easy-to-use interface matching the original BOPPPS template
- **Dynamic Activities**: Add or remove lesson activities as needed
- **JSON Import/Export**: Save and load lesson plans for reuse
- **Sample Template**: Load a pre-filled example to get started
- **Responsive Design**: Works on desktop and mobile devices
- **Print-Friendly**: Clean layout for printing lesson plans

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Create the project folder:**
   ```bash
   mkdir boppps-planner
   cd boppps-planner
   ```

2. **Create the folder structure:**
   ```
   boppps-planner/
   ├── public/
   │   └── index.html
   ├── src/
   │   ├── App.js
   │   ├── index.js
   │   ├── index.css
   │   └── components/
   │       └── BopppsPlanner.js
   ├── package.json
   └── README.md
   ```

3. **Copy all the provided files** into their respective folders

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```

6. **Open your browser** to `http://localhost:3000`

## Usage

### Creating a New Lesson Plan

1. Fill out the **Lesson Topic** field
2. Complete the **Bridge-In** section with your opening activity
3. List your **Objectives** and **Pre-Assessment** methods
4. Add **Activities** using the + button (include duration and materials)
5. Define your **Post-Assessment** and **Summary**
6. Add **Reflections** after teaching the lesson

### Saving and Loading

- **Save**: Click "Save JSON" to download your lesson plan
- **Load**: Click "Upload JSON" to load a previously saved plan
- **Sample**: Click "Load Sample" to see an example lesson plan

### File Format

Lesson plans are saved as JSON files with the following structure:

```json
{
  "lessonTopic": "Your lesson topic",
  "bridgeIn": "Opening activity description",
  "objective": "Learning objectives",
  "preAssessment": "Pre-assessment methods",
  "activities": [
    {
      "duration": "15",
      "facilitatorActivity": "Activity description",
      "materialsRequired": "Materials list"
    }
  ],
  "postAssessment": "Assessment methods",
  "summary": "Key points summary",
  "reflections": "Post-lesson reflections"
}
```

## Building for Production

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## BOPPPS Model

The template follows the BOPPPS instructional design model:

- **B**ridge-in: Connect with learners and introduce the topic
- **O**bjectives: Clear learning goals
- **P**re-assessment: Gauge prior knowledge
- **P**resentation/**P**ractice/**P**articipation: Main learning activities
- **P**ost-assessment: Evaluate learning outcomes
- **S**ummary: Consolidate key points

## Technologies Used

- React 18
- Tailwind CSS (via CDN)
- Lucide React (for icons)
- Modern JavaScript (ES6+)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is designed for educational use by Teaching and Learning Conestoga, adapted from the Instructional Skills Workshop (ISW) Handbook for Participants.