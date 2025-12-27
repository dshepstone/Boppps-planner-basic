import React, { useState, useRef } from 'react';
import { Download, Upload, Plus, Minus, Printer } from 'lucide-react';

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

  const formatText = (value) => {
    if (value === undefined || value === null) return '';
    if (Array.isArray(value)) {
      return value.map(item => String(item)).join('<br>');
    }
    return String(value).replace(/\n/g, '<br>');
  };

  const handlePrint = () => {
    const printContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>BOPPPS Lesson Plan - ${lessonData.lessonTopic || 'Untitled'}</title>
    <style>
        @page {
            size: landscape;
            margin: 0.5in;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            line-height: 1.2;
            color: #000;
        }
        .header {
            text-align: center;
            margin-bottom: 10px;
            border-bottom: 2px solid #000;
            padding-bottom: 5px;
        }
        .header h1 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 2px;
        }
        .header p {
            font-size: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            border: 2px solid #000;
        }
        td, th {
            border: 1px solid #000;
            padding: 4px;
            vertical-align: top;
        }
        .section-header {
            background-color: #f0f0f0;
            font-weight: bold;
            width: 120px;
            font-size: 10px;
        }
        .black-header {
            background-color: #000;
            color: #fff;
            font-weight: bold;
            text-align: center;
            font-size: 11px;
        }
        .sub-header {
            background-color: #f0f0f0;
            font-weight: bold;
            font-size: 10px;
            text-align: center;
        }
        .content {
            font-size: 10px;
            line-height: 1.3;
        }
        .activity-row {
            height: 60px;
        }
        .duration-col {
            width: 60px;
            text-align: center;
        }
        .activity-col {
            width: auto;
        }
        .materials-col {
            width: 150px;
        }
        .objectives-col {
            width: 60%;
        }
        .pre-assessment-col {
            width: 20%;
        }
        .post-assessment-col {
            width: 60%;
        }
        .summary-col {
            width: 20%;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>BOPPPS Lesson Planning Template</h1>
    </div>
    
    <table>
        <tr>
            <td class="section-header">Lesson Topic</td>
            <td class="content" colspan="3">${lessonData.lessonTopic || ''}</td>
        </tr>
        
        <tr>
            <td class="section-header">Bridge-In</td>
            <td class="content" colspan="3">${formatText(lessonData.bridgeIn)}</td>
        </tr>

        <tr>
            <td class="section-header">Objective(s)</td>
            <td class="content objectives-col">${formatText(lessonData.objective)}</td>
            <td class="section-header" style="width: 120px;">Pre-Assessment</td>
            <td class="content pre-assessment-col">${formatText(lessonData.preAssessment)}</td>
        </tr>
        
        <tr>
            <td class="black-header" colspan="4">Presentation/Practice/Participation</td>
        </tr>
        
        <tr>
            <td class="sub-header duration-col">Duration<br>(in min.)</td>
            <td class="sub-header activity-col">Facilitator or Learner Activity (add rows as needed)</td>
            <td class="sub-header materials-col">Materials Required</td>
        </tr>
        
        ${lessonData.activities.map(activity => `
            <tr class="activity-row">
                <td class="content duration-col">${activity.duration || ''}</td>
                <td class="content activity-col">${formatText(activity.facilitatorActivity)}</td>
                <td class="content materials-col">${formatText(activity.materialsRequired)}</td>
            </tr>
        `).join('')}

        <tr>
            <td class="section-header">Post-Assessment</td>
            <td class="content post-assessment-col">${formatText(lessonData.postAssessment)}</td>
            <td class="section-header" style="width: 120px;">Summary</td>
            <td class="content summary-col">${formatText(lessonData.summary)}</td>
        </tr>

        <tr>
            <td class="section-header">Reflections on the Lesson</td>
            <td class="content" colspan="3">${formatText(lessonData.reflections)}</td>
        </tr>
    </table>
</body>
</html>`;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleHTMLExport = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BOPPPS Lesson Plan - ${lessonData.lessonTopic || 'Untitled'}</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.4;
            color: #333;
            background-color: #f9fafb;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: white;
            border-bottom: 1px solid #e5e7eb;
        }
        .header h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #1f2937;
        }
        .header p {
            font-size: 14px;
            color: #6b7280;
        }
        .table-container {
            border: 1px solid #d1d5db;
        }
        .row {
            display: flex;
            border-bottom: 1px solid #d1d5db;
            min-height: 60px;
        }
        .row:last-child {
            border-bottom: none;
        }
        .section-header {
            background-color: #f3f4f6;
            font-weight: bold;
            padding: 12px;
            border-right: 1px solid #d1d5db;
            display: flex;
            align-items: flex-start;
            width: 160px;
            min-width: 160px;
            font-size: 14px;
        }
        .content {
            padding: 12px;
            flex: 1;
            font-size: 14px;
            white-space: pre-wrap;
            display: flex;
            align-items: flex-start;
        }
        .content-split {
            display: flex;
            flex: 1;
        }
        .content-main {
            padding: 12px;
            border-right: 1px solid #d1d5db;
            flex: 1;
            font-size: 14px;
            white-space: pre-wrap;
        }
        .content-side {
            padding: 12px;
            width: 200px;
            min-width: 200px;
            font-size: 14px;
            white-space: pre-wrap;
        }
        .content-side-header {
            font-weight: bold;
            margin-bottom: 8px;
            font-size: 12px;
        }
        .black-header {
            background-color: #000;
            color: white;
            font-weight: bold;
            text-align: center;
            padding: 12px;
            font-size: 14px;
        }
        .sub-header-row {
            display: flex;
            background-color: #f9fafb;
            border-bottom: 1px solid #d1d5db;
            min-height: 48px;
        }
        .sub-header {
            padding: 12px;
            font-weight: bold;
            font-size: 12px;
            border-right: 1px solid #d1d5db;
            display: flex;
            align-items: center;
        }
        .duration-header {
            width: 80px;
            min-width: 80px;
            justify-content: center;
        }
        .activity-header {
            flex: 1;
        }
        .materials-header {
            width: 200px;
            min-width: 200px;
            justify-content: center;
        }
        .activity-row {
            display: flex;
            min-height: 80px;
            border-bottom: 1px solid #d1d5db;
        }
        .duration-cell {
            width: 80px;
            min-width: 80px;
            padding: 12px;
            border-right: 1px solid #d1d5db;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            font-size: 14px;
        }
        .activity-cell {
            flex: 1;
            padding: 12px;
            border-right: 1px solid #d1d5db;
            font-size: 14px;
            white-space: pre-wrap;
        }
        .materials-cell {
            width: 200px;
            min-width: 200px;
            padding: 12px;
            font-size: 14px;
            white-space: pre-wrap;
        }
        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>BOPPPS Lesson Planning Template</h1>
        </div>
        
        <div class="table-container">
            <div class="row">
                <div class="section-header">Lesson Topic</div>
                <div class="content">${lessonData.lessonTopic || ''}</div>
            </div>
            
            <div class="row">
                <div class="section-header">Bridge-In</div>
                <div class="content">${lessonData.bridgeIn || ''}</div>
            </div>
            
            <div class="row">
                <div class="section-header">Objective(s)</div>
                <div class="content-split">
                    <div class="content-main">${lessonData.objective || ''}</div>
                    <div class="content-side">
                        <div class="content-side-header">Pre-Assessment</div>
                        ${lessonData.preAssessment || ''}
                    </div>
                </div>
            </div>
            
            <div class="black-header">Presentation/Practice/Participation</div>
            
            <div class="sub-header-row">
                <div class="sub-header duration-header">Duration (in min.)</div>
                <div class="sub-header activity-header">Facilitator or Learner Activity (add rows as needed)</div>
                <div class="sub-header materials-header">Materials Required</div>
            </div>
            
            ${lessonData.activities.map(activity => `
                <div class="activity-row">
                    <div class="duration-cell">${activity.duration || ''}</div>
                    <div class="activity-cell">${activity.facilitatorActivity || ''}</div>
                    <div class="materials-cell">${activity.materialsRequired || ''}</div>
                </div>
            `).join('')}
            
            <div class="row">
                <div class="section-header">Post-Assessment</div>
                <div class="content-split">
                    <div class="content-main">${lessonData.postAssessment || ''}</div>
                    <div class="content-side">
                        <div class="content-side-header">Summary</div>
                        ${lessonData.summary || ''}
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="section-header">Reflections on the Lesson</div>
                <div class="content">${lessonData.reflections || ''}</div>
            </div>
        </div>
    </div>
</body>
</html>`;

    const dataStr = htmlContent;
    const dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `boppps_lesson_plan_${new Date().toISOString().split('T')[0]}.html`;
    
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
          
          {/* File Operations */}
          <div className="flex justify-center gap-3 mb-6 no-print flex-wrap">
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
            <button
              onClick={handleHTMLExport}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Download size={16} />
              Export HTML
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Printer size={16} />
              Print
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
        <div className="border border-gray-300 overflow-hidden shadow-sm">
          {/* Lesson Topic */}
          <div className="border-b border-gray-300 min-h-16 flex">
            <div className="bg-gray-100 p-3 font-bold border-r border-gray-300" style={{width: '160px', minWidth: '160px'}}>
              <div className="flex items-center h-full">Lesson Topic</div>
            </div>
            <div className="flex-1 p-3 flex items-center">
              <input
                type="text"
                value={lessonData.lessonTopic}
                onChange={(e) => handleInputChange('lessonTopic', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter lesson topic"
              />
            </div>
          </div>

          {/* Bridge-In */}
          <div className="border-b border-gray-300 min-h-24 flex">
            <div className="bg-gray-100 p-3 font-bold border-r border-gray-300" style={{width: '160px', minWidth: '160px'}}>
              <div className="flex items-start h-full pt-1">Bridge-In</div>
            </div>
            <div className="flex-1 p-3">
              <textarea
                value={lessonData.bridgeIn}
                onChange={(e) => handleInputChange('bridgeIn', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="3"
                placeholder="Describe how you will connect with learners and introduce the topic"
              />
            </div>
          </div>

          {/* Objective(s) and Pre-Assessment */}
          <div className="border-b border-gray-300 min-h-32 flex">
            <div className="bg-gray-100 p-3 font-bold border-r border-gray-300" style={{width: '160px', minWidth: '160px'}}>
              <div className="flex items-start h-full pt-1">Objective(s)</div>
            </div>
            <div className="p-3 border-r border-gray-300" style={{width: 'calc(100% - 360px)'}}>
              <textarea
                value={lessonData.objective}
                onChange={(e) => handleInputChange('objective', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="4"
                placeholder="List learning objectives (use bullet points or numbers)"
              />
            </div>
            <div className="p-3" style={{width: '200px', minWidth: '200px'}}>
              <div className="font-bold text-sm mb-2">Pre-Assessment</div>
              <textarea
                value={lessonData.preAssessment}
                onChange={(e) => handleInputChange('preAssessment', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="3"
                placeholder="How will you assess prior knowledge?"
              />
            </div>
          </div>

          {/* Presentation/Practice/Participation Header */}
          <div className="border-b border-gray-300">
            <div className="bg-black text-white p-3 font-bold text-center text-sm">
              Presentation/Practice/Participation
            </div>
            <div className="min-h-12 flex bg-gray-50">
              <div className="p-3 border-r border-gray-300 font-bold text-sm flex items-center" style={{width: '80px', minWidth: '80px'}}>
                Duration (in min.)
              </div>
              <div className="p-3 border-r border-gray-300 font-bold text-left text-sm flex items-center" style={{width: 'calc(100% - 280px)'}}>
                Facilitator or Learner Activity (add rows as needed)
              </div>
              <div className="p-3 font-bold text-center text-sm flex items-center justify-center" style={{width: '200px', minWidth: '200px'}}>
                Materials Required
              </div>
            </div>
          </div>

          {/* Activities */}
          {lessonData.activities.map((activity, index) => (
            <div key={index} className="border-b border-gray-300 min-h-24 flex">
              <div className="p-3 border-r border-gray-300 flex items-center" style={{width: '80px', minWidth: '80px'}}>
                <input
                  type="text"
                  value={activity.duration}
                  onChange={(e) => handleActivityChange(index, 'duration', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="min"
                />
              </div>
              <div className="p-3 border-r border-gray-300 relative" style={{width: 'calc(100% - 280px)'}}>
                <div className="absolute left-1 top-1 z-10">
                  <button
                    onClick={addActivity}
                    className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors mr-1"
                    title="Add Activity"
                  >
                    <Plus size={16} />
                  </button>
                  {lessonData.activities.length > 1 && (
                    <button
                      onClick={() => removeActivity(index)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
                      title="Remove Activity"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
                <textarea
                  value={activity.facilitatorActivity}
                  onChange={(e) => handleActivityChange(index, 'facilitatorActivity', e.target.value)}
                  className="w-full p-2 pt-8 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows="3"
                  placeholder="Describe the activity in detail"
                />
              </div>
              <div className="p-3" style={{width: '200px', minWidth: '200px'}}>
                <textarea
                  value={activity.materialsRequired}
                  onChange={(e) => handleActivityChange(index, 'materialsRequired', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows="3"
                  placeholder="List materials needed"
                />
              </div>
            </div>
          ))}

          {/* Post-Assessment and Summary */}
          <div className="border-b border-gray-300 min-h-32 flex">
            <div className="bg-gray-100 p-3 font-bold border-r border-gray-300" style={{width: '160px', minWidth: '160px'}}>
              <div className="flex items-start h-full pt-1">Post-Assessment</div>
            </div>
            <div className="p-3 border-r border-gray-300" style={{width: 'calc(100% - 360px)'}}>
              <textarea
                value={lessonData.postAssessment}
                onChange={(e) => handleInputChange('postAssessment', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="4"
                placeholder="How will you assess learning outcomes?"
              />
            </div>
            <div className="p-3" style={{width: '200px', minWidth: '200px'}}>
              <div className="font-bold text-sm mb-2">Summary</div>
              <textarea
                value={lessonData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="3"
                placeholder="Summarize key learning points"
              />
            </div>
          </div>

          {/* Reflections */}
          <div className="min-h-24 flex">
            <div className="bg-gray-100 p-3 font-bold border-r border-gray-300" style={{width: '160px', minWidth: '160px'}}>
              <div className="flex items-start h-full pt-1">Reflections on the Lesson</div>
            </div>
            <div className="flex-1 p-3">
              <textarea
                value={lessonData.reflections}
                onChange={(e) => handleInputChange('reflections', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="4"
                placeholder="Reflect on what worked well, what could be improved, and lessons learned for next time"
              />
            </div>
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
            <li>Export a shareable HTML version using the "Export HTML" button</li>
            <li>Print a professional copy using the "Print" button (optimized for landscape)</li>
            <li>The template follows the BOPPPS model: Bridge-in, Objectives, Pre-assessment, Presentation/Practice/Participation, Post-assessment, Summary</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BopppsPlanner;