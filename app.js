// Resume Analyzer Application JavaScript

// Application data from the provided JSON
const appData = {
  jobDescriptions: {
    data_scientist: {
      title: "Data Scientist",
      company: "TechCorp Inc.",
      description: "We are seeking a skilled Data Scientist to join our analytics team. The ideal candidate will have experience with Python, machine learning, and statistical analysis. You will work on developing predictive models, analyzing large datasets, and providing actionable insights to drive business decisions.\n\nResponsibilities:\n• Develop and implement machine learning models\n• Analyze complex datasets using statistical methods\n• Create data visualizations and reports\n• Collaborate with cross-functional teams\n• Present findings to stakeholders\n\nRequired Skills:\n• Python programming\n• Machine Learning (Scikit-learn, TensorFlow)\n• Statistics and Statistical Analysis\n• SQL and Database Management\n• Pandas and NumPy\n• Data Visualization tools\n\nPreferred Skills:\n• Cloud platforms (AWS, Azure)\n• Docker and containerization\n• Git version control\n• Jupyter notebooks\n• Deep learning frameworks",
      required_skills: ["Python", "Machine Learning", "Statistics", "SQL", "Pandas", "Scikit-learn", "Data Visualization"],
      preferred_skills: ["TensorFlow", "PyTorch", "AWS", "Docker", "Git", "Jupyter"],
      experience: "2-5 years"
    },
    software_engineer: {
      title: "Software Engineer",
      company: "InnovateTech",
      description: "Join our development team to build scalable web applications. We need someone proficient in modern JavaScript frameworks and backend technologies. You will be responsible for developing user-facing features and server-side logic.\n\nResponsibilities:\n• Build responsive web applications\n• Develop RESTful APIs\n• Write clean, maintainable code\n• Participate in code reviews\n• Work in agile development environment\n\nRequired Skills:\n• JavaScript (ES6+)\n• React.js or similar framework\n• Node.js and Express\n• API Development\n• Git version control\n• Database design and management\n\nPreferred Skills:\n• TypeScript\n• Cloud services (AWS)\n• Docker containerization\n• MongoDB or PostgreSQL\n• CI/CD pipelines\n• Agile methodologies",
      required_skills: ["JavaScript", "React", "Node.js", "API Development", "Git", "Database Design"],
      preferred_skills: ["TypeScript", "AWS", "Docker", "MongoDB", "CI/CD", "Agile"],
      experience: "1-3 years"
    },
    web_developer: {
      title: "Frontend Web Developer", 
      company: "WebSolutions Ltd",
      description: "We're looking for a creative frontend developer to build engaging user interfaces and optimize user experience across our web applications. You will work closely with designers and backend developers to create pixel-perfect, responsive websites.\n\nResponsibilities:\n• Create responsive web interfaces\n• Implement UI/UX designs\n• Optimize application performance\n• Ensure cross-browser compatibility\n• Collaborate with design team\n\nRequired Skills:\n• HTML5 and semantic markup\n• CSS3 and responsive design\n• JavaScript (vanilla and frameworks)\n• React.js or Vue.js\n• Git version control\n• Cross-browser compatibility\n\nPreferred Skills:\n• SASS/SCSS preprocessing\n• Webpack and build tools\n• TypeScript\n• Testing frameworks\n• UI/UX design principles\n• Performance optimization",
      required_skills: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design", "Git"],
      preferred_skills: ["Vue.js", "SASS", "Webpack", "TypeScript", "Testing", "UI/UX Design"],
      experience: "2-4 years"
    }
  },
  sampleAnalysis: {
    overall_score: 85,
    breakdown: {
      skills_match: 88,
      experience_relevance: 82,
      ats_compatibility: 76,
      completeness: 90,
      formatting: 78
    },
    skills_analysis: {
      matched_skills: ["Python", "Machine Learning", "SQL", "Git", "Pandas"],
      missing_skills: ["Docker", "AWS", "TensorFlow", "Kubernetes"],
      skill_categories: {
        "Programming Languages": 90,
        "Machine Learning": 85,
        "Data Analysis": 92,
        "Cloud Computing": 45,
        "DevOps": 35
      }
    },
    recommendations: [
      "Add Docker and containerization experience to improve DevOps skills",
      "Include cloud computing certifications (AWS/Azure) for better market competitiveness", 
      "Improve resume formatting for better ATS compatibility",
      "Add quantifiable achievements in work experience section",
      "Consider adding a personal projects section to showcase practical skills",
      "Update contact information section with LinkedIn profile",
      "Use standard section headings for better ATS parsing"
    ],
    ats_issues: [
      "Use standard section headings (Experience, Education, Skills)",
      "Avoid complex formatting and graphics",
      "Include more keywords from the job description",
      "Save as .docx format for better compatibility"
    ]
  }
};

// Application state
let currentFile = null;
let analysisResults = null;
let charts = {};

// DOM Elements
const elements = {
  // Upload elements
  uploadArea: document.getElementById('uploadArea'),
  resumeFile: document.getElementById('resumeFile'),
  uploadProgress: document.getElementById('uploadProgress'),
  progressFill: document.getElementById('progressFill'),
  progressText: document.getElementById('progressText'),
  uploadedFile: document.getElementById('uploadedFile'),
  fileName: document.getElementById('fileName'),
  removeFile: document.getElementById('removeFile'),
  
  // Job description elements
  jobTemplate: document.getElementById('jobTemplate'),
  jobDescription: document.getElementById('jobDescription'),
  wordCount: document.getElementById('wordCount'),
  keywordCount: document.getElementById('keywordCount'),
  
  // Analysis elements
  analyzeBtn: document.getElementById('analyzeBtn'),
  loadingSection: document.getElementById('loadingSection'),
  resultsSection: document.getElementById('resultsSection'),
  
  // Theme toggle
  themeToggle: document.getElementById('themeToggle'),
  
  // Modal elements
  successModal: document.getElementById('successModal'),
  closeModal: document.getElementById('closeModal'),
  viewResults: document.getElementById('viewResults'),
  
  // Export elements
  exportPdf: document.getElementById('exportPdf'),
  exportJson: document.getElementById('exportJson'),
  newAnalysis: document.getElementById('newAnalysis')
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  updateWordCount();
  updateAnalyzeButton();
});

// Event Listeners
function initializeEventListeners() {
  // File upload events
  elements.uploadArea.addEventListener('click', () => elements.resumeFile.click());
  elements.uploadArea.addEventListener('dragover', handleDragOver);
  elements.uploadArea.addEventListener('dragleave', handleDragLeave);
  elements.uploadArea.addEventListener('drop', handleDrop);
  elements.resumeFile.addEventListener('change', handleFileSelect);
  elements.removeFile.addEventListener('click', removeFile);
  
  // Job description events
  elements.jobTemplate.addEventListener('change', handleTemplateChange);
  elements.jobDescription.addEventListener('input', updateWordCount);
  
  // Analysis button
  elements.analyzeBtn.addEventListener('click', startAnalysis);
  
  // Tab navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
  });
  
  // Theme toggle
  elements.themeToggle.addEventListener('click', toggleTheme);
  
  // Modal events
  elements.closeModal.addEventListener('click', closeModal);
  elements.viewResults.addEventListener('click', () => {
    closeModal();
    scrollToResults();
  });
  
  // Export events
  elements.exportPdf.addEventListener('click', exportPDF);
  elements.exportJson.addEventListener('click', exportJSON);
  elements.newAnalysis.addEventListener('click', resetAnalysis);
  
  // Modal overlay click
  elements.successModal.addEventListener('click', (e) => {
    if (e.target === elements.successModal || e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });
}

// File Upload Functions
function handleDragOver(e) {
  e.preventDefault();
  elements.uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  elements.uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  elements.uploadArea.classList.remove('dragover');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
}

function handleFile(file) {
  // Validate file type and size
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    alert('Please upload a PDF, DOC, or DOCX file.');
    return;
  }
  
  if (file.size > maxSize) {
    alert('File size must be less than 5MB.');
    return;
  }
  
  currentFile = file;
  simulateFileUpload(file);
}

function simulateFileUpload(file) {
  // Hide upload area, show progress
  elements.uploadArea.classList.add('hidden');
  elements.uploadProgress.classList.remove('hidden');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => showUploadedFile(file), 500);
    }
    
    elements.progressFill.style.width = progress + '%';
    elements.progressText.textContent = Math.round(progress) + '%';
  }, 100);
}

function showUploadedFile(file) {
  elements.uploadProgress.classList.add('hidden');
  elements.uploadedFile.classList.remove('hidden');
  elements.fileName.textContent = file.name;
  updateAnalyzeButton();
}

function removeFile() {
  currentFile = null;
  elements.uploadedFile.classList.add('hidden');
  elements.uploadArea.classList.remove('hidden');
  elements.resumeFile.value = '';
  updateAnalyzeButton();
}

// Job Description Functions
function handleTemplateChange() {
  const template = elements.jobTemplate.value;
  if (template && appData.jobDescriptions[template]) {
    elements.jobDescription.value = appData.jobDescriptions[template].description;
    updateWordCount();
  }
}

function updateWordCount() {
  const text = elements.jobDescription.value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  const keywords = extractKeywords(text);
  
  elements.wordCount.textContent = words;
  elements.keywordCount.textContent = keywords.length;
  
  updateAnalyzeButton();
}

function extractKeywords(text) {
  const commonKeywords = [
    'python', 'javascript', 'react', 'nodejs', 'sql', 'machine learning', 
    'aws', 'docker', 'git', 'api', 'database', 'html', 'css', 'tensorflow',
    'pandas', 'numpy', 'scikit-learn', 'mongodb', 'postgresql', 'vue'
  ];
  
  const textLower = text.toLowerCase();
  return commonKeywords.filter(keyword => textLower.includes(keyword));
}

function updateAnalyzeButton() {
  const hasFile = currentFile !== null;
  const hasJobDescription = elements.jobDescription.value.trim().length > 50;
  
  // Enable button if either condition is met (for demo purposes)
  elements.analyzeBtn.disabled = !(hasFile || hasJobDescription);
}

// Analysis Functions
function startAnalysis() {
  // For demo purposes, allow analysis with just job description
  if (!elements.jobDescription.value.trim()) {
    alert('Please provide a job description to analyze against.');
    return;
  }
  
  // If no file uploaded, simulate one for demo
  if (!currentFile) {
    currentFile = { name: 'sample-resume.pdf', type: 'application/pdf', size: 1024000 };
  }
  
  console.log('Starting analysis...');
  
  // Show loading section
  elements.loadingSection.classList.remove('hidden');
  elements.analyzeBtn.disabled = true;
  
  // Update button text
  elements.analyzeBtn.querySelector('.btn-text').classList.add('hidden');
  elements.analyzeBtn.querySelector('.btn-loader').classList.remove('hidden');
  
  // Simulate analysis steps
  simulateAnalysisSteps();
}

function simulateAnalysisSteps() {
  const steps = ['step1', 'step2', 'step3'];
  let currentStep = 0;
  
  const interval = setInterval(() => {
    if (currentStep > 0) {
      const prevStep = document.getElementById(steps[currentStep - 1]);
      if (prevStep) prevStep.classList.remove('active');
    }
    
    if (currentStep < steps.length) {
      const currentStepElement = document.getElementById(steps[currentStep]);
      if (currentStepElement) currentStepElement.classList.add('active');
      currentStep++;
    } else {
      clearInterval(interval);
      setTimeout(completeAnalysis, 1000);
    }
  }, 1500);
}

function completeAnalysis() {
  console.log('Analysis completed, showing results...');
  
  // Hide loading section
  elements.loadingSection.classList.add('hidden');
  
  // Reset button
  elements.analyzeBtn.disabled = false;
  elements.analyzeBtn.querySelector('.btn-text').classList.remove('hidden');
  elements.analyzeBtn.querySelector('.btn-loader').classList.add('hidden');
  
  // Set analysis results
  analysisResults = { ...appData.sampleAnalysis };
  
  // Show results immediately
  displayResults();
  
  // Show success modal
  setTimeout(() => {
    elements.successModal.classList.remove('hidden');
  }, 500);
}

function displayResults() {
  console.log('Displaying results...');
  
  // Show results section
  elements.resultsSection.classList.remove('hidden');
  
  // Update overall score
  const overallScoreElement = document.getElementById('overallScore');
  if (overallScoreElement) {
    overallScoreElement.textContent = analysisResults.overall_score;
  }
  
  // Update breakdown bars with animation
  setTimeout(() => {
    updateBreakdownBars();
    createCharts();
  }, 300);
  
  // Update skills lists
  updateSkillsDisplay();
  
  // Update recommendations
  updateRecommendations();
  
  // Update ATS issues
  updateATSIssues();
  
  // Scroll to results
  setTimeout(() => {
    elements.resultsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, 1000);
}

function updateBreakdownBars() {
  const breakdown = analysisResults.breakdown;
  const breakdownItems = document.querySelectorAll('.breakdown-item');
  
  const keys = Object.keys(breakdown);
  breakdownItems.forEach((item, index) => {
    if (keys[index]) {
      const value = breakdown[keys[index]];
      const fill = item.querySelector('.breakdown-fill');
      const valueSpan = item.querySelector('.breakdown-value');
      
      if (fill && valueSpan) {
        setTimeout(() => {
          fill.style.width = value + '%';
          valueSpan.textContent = value + '%';
        }, index * 100);
      }
    }
  });
}

function createCharts() {
  console.log('Creating charts...');
  
  // Destroy existing charts
  Object.values(charts).forEach(chart => {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  });
  charts = {};
  
  // Overall Score Chart (Doughnut)
  const overallCtx = document.getElementById('overallScoreChart');
  if (overallCtx) {
    try {
      charts.overall = new Chart(overallCtx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [analysisResults.overall_score, 100 - analysisResults.overall_score],
            backgroundColor: ['#1FB8CD', '#f3f4f6'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '80%',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating overall score chart:', error);
    }
  }
  
  // Skills Chart (Radar)
  const skillsCtx = document.getElementById('skillsChart');
  if (skillsCtx) {
    try {
      const categories = Object.keys(analysisResults.skills_analysis.skill_categories);
      const values = Object.values(analysisResults.skills_analysis.skill_categories);
      
      charts.skills = new Chart(skillsCtx, {
        type: 'radar',
        data: {
          labels: categories,
          datasets: [{
            label: 'Skill Level',
            data: values,
            backgroundColor: 'rgba(31, 184, 205, 0.2)',
            borderColor: '#1FB8CD',
            borderWidth: 2,
            pointBackgroundColor: '#1FB8CD',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating skills chart:', error);
    }
  }
  
  // ATS Chart (Gauge - using doughnut)
  const atsCtx = document.getElementById('atsChart');
  if (atsCtx) {
    try {
      const atsScore = analysisResults.breakdown.ats_compatibility;
      charts.ats = new Chart(atsCtx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [atsScore, 100 - atsScore],
            backgroundColor: ['#FFC185', '#f3f4f6'],
            borderWidth: 0,
            circumference: 180,
            rotation: 270
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '80%',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating ATS chart:', error);
    }
  }
}

function updateSkillsDisplay() {
  // Update matched skills
  const matchedContainers = document.querySelectorAll('#skillsTab .skills-list');
  const matchedSkills = analysisResults.skills_analysis.matched_skills;
  
  if (matchedContainers[0]) {
    matchedContainers[0].innerHTML = matchedSkills.map(skill => 
      `<div class="skill-tag matched">${skill}</div>`
    ).join('');
  }
  
  // Update missing skills
  const missingSkills = analysisResults.skills_analysis.missing_skills;
  if (matchedContainers[1]) {
    matchedContainers[1].innerHTML = missingSkills.map(skill => 
      `<div class="skill-tag missing">${skill}</div>`
    ).join('');
  }
  
  // Update category scores
  const categories = analysisResults.skills_analysis.skill_categories;
  const categoryItems = document.querySelectorAll('.category-item');
  
  Object.entries(categories).forEach(([category, score], index) => {
    if (categoryItems[index]) {
      const fill = categoryItems[index].querySelector('.category-fill');
      const valueSpan = categoryItems[index].querySelector('span:last-child');
      
      if (fill && valueSpan) {
        setTimeout(() => {
          fill.style.width = score + '%';
          valueSpan.textContent = score + '%';
        }, index * 150);
      }
    }
  });
}

function updateRecommendations() {
  const recommendations = analysisResults.recommendations;
  const priorities = ['high', 'high', 'medium', 'low'];
  
  const container = document.querySelector('.recommendation-list');
  if (container) {
    container.innerHTML = recommendations.slice(0, 4).map((rec, index) => {
      const title = rec.length > 50 ? rec.substring(0, 50) + '...' : rec;
      return `
        <div class="recommendation-item ${priorities[index] || 'low'}">
          <div class="rec-priority">${(priorities[index] || 'low').toUpperCase()}</div>
          <div class="rec-content">
            <h5>${title}</h5>
            <p>${rec}</p>
          </div>
        </div>
      `;
    }).join('');
  }
}

function updateATSIssues() {
  const issues = analysisResults.ats_issues;
  const container = document.querySelector('.issues-list');
  
  if (container) {
    container.innerHTML = issues.map(issue => `
      <div class="issue-item">
        <span class="issue-icon">⚠️</span>
        <span>${issue}</span>
      </div>
    `).join('');
  }
}

// Tab Functions
function switchTab(tabName) {
  console.log('Switching to tab:', tabName);
  
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const targetTab = document.getElementById(tabName + 'Tab');
  if (targetTab) {
    targetTab.classList.add('active');
  }
}

// Theme Functions
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-color-scheme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-color-scheme', newTheme);
  
  // Update button text
  elements.themeToggle.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  
  // Recreate charts with new theme
  if (Object.keys(charts).length > 0) {
    setTimeout(createCharts, 100);
  }
}

// Modal Functions
function closeModal() {
  elements.successModal.classList.add('hidden');
}

function scrollToResults() {
  if (elements.resultsSection) {
    elements.resultsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Export Functions
function exportPDF() {
  // Simulate PDF export
  const loadingText = '📄 Generating PDF...';
  const originalText = elements.exportPdf.textContent;
  
  elements.exportPdf.textContent = loadingText;
  elements.exportPdf.disabled = true;
  
  setTimeout(() => {
    // Create a simple text report
    const report = generateTextReport();
    downloadFile('resume-analysis-report.txt', report, 'text/plain');
    
    elements.exportPdf.textContent = originalText;
    elements.exportPdf.disabled = false;
  }, 2000);
}

function exportJSON() {
  const data = {
    analysis_date: new Date().toISOString(),
    file_name: currentFile ? currentFile.name : 'demo-resume.pdf',
    job_description: elements.jobDescription.value,
    results: analysisResults,
    recommendations: analysisResults.recommendations
  };
  
  const jsonString = JSON.stringify(data, null, 2);
  downloadFile('resume-analysis.json', jsonString, 'application/json');
}

function generateTextReport() {
  return `RESUME ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}
File: ${currentFile ? currentFile.name : 'Demo Resume'}

OVERALL SCORE: ${analysisResults.overall_score}/100

BREAKDOWN:
- Skills Match: ${analysisResults.breakdown.skills_match}%
- Experience Relevance: ${analysisResults.breakdown.experience_relevance}%
- ATS Compatibility: ${analysisResults.breakdown.ats_compatibility}%
- Resume Completeness: ${analysisResults.breakdown.completeness}%

MATCHED SKILLS:
${analysisResults.skills_analysis.matched_skills.join(', ')}

MISSING SKILLS:
${analysisResults.skills_analysis.missing_skills.join(', ')}

RECOMMENDATIONS:
${analysisResults.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

ATS ISSUES:
${analysisResults.ats_issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

---
Report generated by AI Resume Analyzer
Data Science Project 2025`;
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function resetAnalysis() {
  // Reset all states
  currentFile = null;
  analysisResults = null;
  
  // Reset UI
  removeFile();
  elements.jobDescription.value = '';
  elements.jobTemplate.value = '';
  elements.resultsSection.classList.add('hidden');
  
  // Reset word count
  updateWordCount();
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Destroy charts
  Object.values(charts).forEach(chart => {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  });
  charts = {};
}

// Utility Functions
function simulateNetworkDelay(min = 500, max = 2000) {
  return new Promise(resolve => {
    const delay = Math.random() * (max - min) + min;
    setTimeout(resolve, delay);
  });
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('Application Error:', e.error);
});

// Prevent default drag behaviors on document level
document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', e => e.preventDefault());