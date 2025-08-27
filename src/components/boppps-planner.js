import React, { useState, useRef } from 'react';
import { Download, Upload, Plus, Minus } from 'lucide-react';

const BopppsPlanner = () => {
  const [lessonData, setLessonData] = useState({
    lessonTopic: '',
    bridgeIn: '',
    objective: '',
    preAssessment: '',
    activities: [
      { duration: '', facilitatorActivity: '', materialsRequired: '' }
    ],
    postAssessment: '',
    summary: '',
    reflections: ''
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setLessonData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleActivityChange = (index, field, value) => {
    setLessonData(prev => ({
      ...prev,
      activities: prev.activities.map((activity, i) => 
        i === index ? { ...activity, [field]: value } : activity
      )
    }));
  };

  const addActivity = () => {
    setLessonData(prev => ({
      ...prev,
      activities: [...prev.activities, { duration: '', facilitatorActivity: '', materialsRequired: '' }]
    }));
  };

  const removeActivity = (index) => {
    if (lessonData.activities.length > 1) {
      setLessonData(prev => ({
        ...prev,
        activities: prev.activities.filter((_, i) => i !== index)
      }));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setLessonData(jsonData);
        } catch (error) {
          alert('Error parsing JSON file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid JSON file.');
    }
    // Reset file input
    event.target.value = '';
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(lessonData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `boppps_lesson_plan_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const loadSample = () => {
    const sampleData = {
      "lessonTopic": "Introduction to Critical Thinking",
      "bridgeIn": "Begin with a quick puzzle or optical illusion to demonstrate how our minds can be deceived. Ask students to share a time when they changed their opinion about something important. This connects to the lesson by showing that questioning our assumptions is valuable and necessary for clear thinking.",
      "objective": "By the end of this lesson, students will be able to:\n• Define critical thinking and explain its key components\n• Identify common logical fallacies in everyday arguments\n• Apply the CRAAP test (Currency, Relevance, Authority, Accuracy, Purpose) to evaluate sources\n• Demonstrate improved questioning techniques in group discussions",
      "preAssessment": "Quick poll using clickers or hand-raising:\n• How confident are you in your ability to spot fake news? (1-5 scale)\n• Have you ever changed your mind about something important after learning new information?\n• What does 'critical thinking' mean to you? (write on sticky note)",
      "activities": [
        {
          "duration": "15",
          "facilitatorActivity": "Mini-lecture: Define critical thinking, present key components (analysis, evaluation, inference, interpretation). Use interactive slides with embedded questions.",
          "materialsRequired": "PowerPoint slides, clicker system or polling app, whiteboard"
        },
        {
          "duration": "20",
          "facilitatorActivity": "Small group activity: Students work in teams of 3-4 to analyze news articles using provided criteria. Each group presents findings to class.",
          "materialsRequired": "Printed news articles (mix of reliable and questionable sources), evaluation worksheets, flip chart paper"
        },
        {
          "duration": "10",
          "facilitatorActivity": "Interactive demonstration: Show examples of logical fallacies using current events and popular advertisements. Students identify the fallacy type.",
          "materialsRequired": "Video clips, advertisement examples, logical fallacy reference sheet"
        },
        {
          "duration": "15",
          "facilitatorActivity": "Practice session: Students apply CRAAP test to websites they find on their phones. Peer sharing of results and discussion of challenges.",
          "materialsRequired": "CRAAP test checklist handout, student smartphones/tablets, timer"
        }
      ],
      "postAssessment": "Exit ticket with three questions:\n1. List two characteristics of a credible source\n2. Give an example of a logical fallacy you might encounter in social media\n3. Rate your confidence in evaluating information sources now (1-5 scale)\n\nAlso collect the completed CRAAP test worksheets for review.",
      "summary": "Critical thinking involves actively analyzing, evaluating, and interpreting information rather than passively accepting it. Key skills include recognizing bias, identifying logical fallacies, and using systematic methods like the CRAAP test to evaluate sources. These skills are essential for academic success and informed citizenship in our information-rich society.",
      "reflections": "What worked well:\n• Students were highly engaged with the news article analysis activity\n• The logical fallacy examples using advertisements resonated well\n• Interactive elements kept energy high throughout\n\nAreas for improvement:\n• Need more time for the CRAAP test practice - students rushed through it\n• Some groups finished the article analysis much faster than others - need extension activities\n• Could use more diverse examples that reflect student backgrounds\n\nFor next time:\n• Add 5 more minutes to CRAAP test activity\n• Prepare advanced questions for early finishers\n• Research more culturally relevant examples for logical fallacies"
    };
    setLessonData(sampleData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            BOPPPS Lesson Planning Template
          </h1>
          <p className="text-sm text-center text-gray-600 mb-4">
            <strong>by Teaching and Learning Conestoga</strong><br/>
            (adapted from Instructional Skills Workshop (ISW) Handbook for Participants)
          </p>
          
          {/* File Operations */}
          <div className="flex justify-center gap-4 mb-6 no-print">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Upload size={16} />
              Upload JSON
            </button>
            <button
              onClick={loadSample}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Load Sample
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download size={16} />
              Save JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Main Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Lesson Topic */}
          <div className="border-b border-gray-300 flex">
            <div className="bg-gray-100 p-4 font-bold border-r border-gray-300 w-40 flex items-center">
              Lesson Topic
            </div>
            <div className="flex-1 p-4">
              <input
                type="text"
                value={lessonData.lessonTopic}
                onChange={(e) => handleInputChange('lessonTopic', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter lesson topic"
              />
            </div>
          </div>

          {/* Bridge-In */}
          <div className="border-b border-gray-300 flex">
            <div className="bg-gray-100 p-4 font-bold border-r border-gray-300 w-40 flex items-start">
              Bridge-In
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={lessonData.bridgeIn}
                onChange={(e) => handleInputChange('bridgeIn', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Describe how you will connect with learners and introduce the topic"
              />
            </div>
          </div>

          {/* Objective(s) and Pre-Assessment */}
          <div className="border-b border-gray-300 flex">
            <div className="bg-gray-100 p-4 font-bold border-r border-gray-300 w-40 flex items-start">
              Objective(s)
            </div>
            <div className="flex-1 p-4 border-r border-gray-300">
              <textarea
                value={lessonData.objective}
                onChange={(e) => handleInputChange('objective', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="5"
                placeholder="List learning objectives (use bullet points or numbers)"
              />
            </div>
            <div className="w-64 p-4">
              <div className="font-bold mb-2">Pre-Assessment</div>
              <textarea
                value={lessonData.preAssessment}
                onChange={(e) => handleInputChange('preAssessment', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="5"
                placeholder="How will you assess prior knowledge?"
              />
            </div>
          </div>

          {/* Presentation/Practice/Participation Header */}
          <div className="border-b border-gray-300 bg-gray-50">
            <div className="flex">
              <div className="bg-gray-100 p-4 font-bold border-r border-gray-300 w-40 flex items-center">
                Presentation/Practice/Participation
              </div>
              <div className="flex-1 flex">
                <div className="flex-1 p-4 border-r border-gray-300 font-bold text-center">
                  Facilitator or Learner Activity (add rows as needed)
                </div>
                <div className="w-24 p-4 border-r border-gray-300 font-bold text-center">
                  Duration (min.)
                </div>
                <div className="w-64 p-4 font-bold text-center">
                  Materials Required
                </div>
              </div>
            </div>
          </div>

          {/* Activities */}
          {lessonData.activities.map((activity, index) => (
            <div key={index} className="border-b border-gray-300 flex">
              <div className="bg-gray-100 p-4 border-r border-gray-300 w-40 flex flex-col items-center justify-center">
                <button
                  onClick={addActivity}
                  className="text-green-600 hover:text-green-800 mb-2 p-1 rounded-full hover:bg-green-100 transition-colors"
                  title="Add Activity"
                >
                  <Plus size={20} />
                </button>
                {lessonData.activities.length > 1 && (
                  <button
                    onClick={() => removeActivity(index)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
                    title="Remove Activity"
                  >
                    <Minus size={20} />
                  </button>
                )}
              </div>
              <div className="flex-1 p-4 border-r border-gray-300">
                <textarea
                  value={activity.facilitatorActivity}
                  onChange={(e) => handleActivityChange(index, 'facilitatorActivity', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Describe the activity in detail"
                />
              </div>
              <div className="w-24 p-4 border-r border-gray-300 flex items-center">
                <input
                  type="text"
                  value={activity.duration}
                  onChange={(e) => handleActivityChange(index, 'duration', e.target.value)}
                  className="w-full p-3 border rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="min"
                />
              </div>
              <div className="w-64 p-4">
                <textarea
                  value={activity.materialsRequired}
                  onChange={(e) => handleActivityChange(index, 'materialsRequired', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="List materials needed"
                />
              </div>
            </div>
          ))}

          {/* Post-Assessment and Summary */}
          <div className="border-b border-gray-300 flex">
            <div className="bg-gray-100 p-4 font-bold border-r border-gray-300 w-40 flex items-start">
              Post-Assessment
            </div>
            <div className="flex-1 p-4 border-r border-gray-300">
              <textarea
                value={lessonData.postAssessment}
                onChange={(e) => handleInputChange('postAssessment', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="5"
                placeholder="How will you assess learning outcomes?"
              />
            </div>
            <div className="w-64 p-4">
              <div className="font-bold mb-2">Summary</div>
              <textarea
                value={lessonData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="5"
                placeholder="Summarize key learning points"
              />
            </div>
          </div>

          {/* Reflections */}
          <div>
            <div className="bg-gray-100 p-4 font-bold border-r border-gray-300 w-40 float-left">
              Reflections on the Lesson
            </div>
            <div className="ml-40 p-4">
              <textarea
                value={lessonData.reflections}
                onChange={(e) => handleInputChange('reflections', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="5"
                placeholder="Reflect on what worked well, what could be improved, and lessons learned for next time"
              />
            </div>
            <div className="clear-both"></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-600 no-print">
          <p><strong>Instructions:</strong></p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Fill out each section of the lesson plan template</li>
            <li>Use the "+" button to add more activities as needed</li>
            <li>Click "Load Sample" to see an example lesson plan</li>
            <li>Save your work as a JSON file using the "Save JSON" button</li>
            <li>Load a previously saved lesson plan using the "Upload JSON" button</li>
            <li>The template follows the BOPPPS model: Bridge-in, Objectives, Pre-assessment, Presentation/Practice/Participation, Post-assessment, Summary</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BopppsPlanner;