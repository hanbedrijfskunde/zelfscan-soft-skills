/**
 * Main application file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Make sure Utils is defined
    if (typeof Utils === 'undefined') {
      console.error('Utils is not defined. Make sure utils.js is properly loaded.');
      return;
    }
    
    // Store elements that will be used frequently
    const elements = {
      navTabs: Utils.getElements('[data-tabs-target]'),
      tabContent: Utils.getElements('#tab-content > div'),
      quizContainer: Utils.getElement('quiz-container'),
      reflectionContainer: Utils.getElement('reflection-container'),
      nextToPersonal: Utils.getElement('next-to-personal'),
      backToQualifications: Utils.getElement('back-to-qualifications'),
      viewResults: Utils.getElement('view-results'),
      backToEdit: Utils.getElement('back-to-edit'),
      resetBtn: Utils.getElement('reset-btn'),
      saveBtn: Utils.getElement('save-btn'),
      resultsSummary: Utils.getElement('results-summary'),
      commentsContainer: Utils.getElement('comments-container'),
      reflectionSummary: Utils.getElement('reflection-summary'),
      radarChart: Utils.getElement('radar-chart')
    };
  
    // Initialize the application
    initialize();
  
    /**
     * Initialize the application
     */
    function initialize() {
      try {
        renderQualifications();
        renderReflectionForm();
        initEventListeners();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    }
  
    /**
     * Render qualification sections
     */
    function renderQualifications() {
      const container = document.getElementById('quiz-container');
      if (!container) {
        console.error('Quiz container not found');
        return;
      }
      
      const html = CONFIG.QUALIFICATION_DATA
        .map(qualification => Templates.qualificationSection(qualification))
        .join('');
      
      container.innerHTML = html;
    }
  
    /**
     * Render reflection form sections
     */
    function renderReflectionForm() {
      const container = document.getElementById('reflection-container');
      if (!container) {
        console.error('Reflection container not found');
        return;
      }
      
      let html = '';
      
      // Professional Development Section
      html += Templates.reflectionSection(
        'Professionele ontwikkeling', 
        CONFIG.REFLECTION_SECTIONS.professionalDevelopment
      );
      
      // STARR Reflection Section
      html += Templates.starrReflectionSection(
        CONFIG.REFLECTION_SECTIONS.starrReflection
      );
      
      // Moral Compass Section
      html += Templates.reflectionSection(
        'Moreel kompas',
        CONFIG.REFLECTION_SECTIONS.moralCompass
      );
      
      container.innerHTML = html;
    }
  
    /**
     * Initialize all event listeners
     */
    function initEventListeners() {
      // Tab navigation
      elements.navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          Utils.setActiveTab(tab, elements.navTabs, elements.tabContent);
        });
      });
      
      // Navigation buttons
      if (elements.nextToPersonal) {
        elements.nextToPersonal.addEventListener('click', () => {
          document.getElementById('personal-reflection-tab').click();
        });
      }
      
      if (elements.backToQualifications) {
        elements.backToQualifications.addEventListener('click', () => {
          document.getElementById('qualifications-tab').click();
        });
      }
      
      if (elements.viewResults) {
        elements.viewResults.addEventListener('click', handleViewResults);
      }
      
      if (elements.backToEdit) {
        elements.backToEdit.addEventListener('click', () => {
          document.getElementById('qualifications-tab').click();
        });
      }
      
      // Action buttons
      if (elements.resetBtn) {
        elements.resetBtn.addEventListener('click', handleReset);
      }
      
      if (elements.saveBtn) {
        elements.saveBtn.addEventListener('click', () => {
          Utils.saveAsPDF(document.getElementById('results-content'));
        });
      }
    }
  
    /**
     * Event handler for view results button
     */
    function handleViewResults() {
      const formData = Utils.getFormData();
      
      if (!formData.isComplete) {
        alert('Zorg ervoor dat je alle eindkwalificaties hebt beoordeeld voordat je de resultaten bekijkt.');
        return;
      }
      
      generateResults(formData);
      document.getElementById('results-tab').click();
    }
  
    /**
     * Event handler for reset form button
     */
    function handleReset() {
      if (confirm('Weet je zeker dat je alle antwoorden wilt wissen?')) {
        Utils.resetForm();
        alert('Formulier is gereset.');
      }
    }
  
    /**
     * Generate results content from form data
     * @param {Object} formData - The form data object
     */
    function generateResults(formData) {
      clearResults();
      displayScores(formData.scores);
      displayComments(formData.comments);
      displayReflectionSummary(formData.personalReflection);
      Utils.createRadarChart(formData.scores, elements.radarChart);
    }
  
    /**
     * Clear all results containers
     */
    function clearResults() {
      if (elements.resultsSummary) elements.resultsSummary.innerHTML = '';
      if (elements.commentsContainer) elements.commentsContainer.innerHTML = '';
      if (elements.reflectionSummary) elements.reflectionSummary.innerHTML = '';
    }
  
    /**
     * Display scores in the results tab
     * @param {Object} scores - Object with qualification scores
     */
    function displayScores(scores) {
      if (!elements.resultsSummary) return;
      
      let html = '';
      
      CONFIG.QUALIFICATION_DATA.forEach(qual => {
        if (scores[qual.id] !== undefined) {
          html += Templates.scoreResult(qual.id, qual.name, scores[qual.id]);
        }
      });
      
      elements.resultsSummary.innerHTML = html;
    }
  
    /**
     * Display comments in the results tab
     * @param {Object} comments - Object with qualification comments
     */
    function displayComments(comments) {
      if (!elements.commentsContainer) return;
      
      let html = '';
      let hasComments = false;
      
      CONFIG.QUALIFICATION_DATA.forEach(qual => {
        const comment = comments[qual.id];
        if (comment && comment.trim() !== '') {
          hasComments = true;
          html += Templates.commentDisplay(qual.id, qual.name, comment);
        }
      });
      
      if (!hasComments) {
        html = '<p class="text-gray-500 italic">Geen toelichtingen gegeven.</p>';
      }
      
      elements.commentsContainer.innerHTML = html;
    }
  
    /**
     * Display reflection summary in the results tab
     * @param {Object} personalReflection - Personal reflection form data
     */
    function displayReflectionSummary(personalReflection) {
      if (!elements.reflectionSummary) return;
      
      let html = '';
      
      // Professional Development Section
      html += Templates.reflectionSummarySection('Professionele ontwikkeling', [
        {
          label: 'Hoe keek je aan het begin tegen je professionele ontwikkeling aan?',
          value: personalReflection['prof-development-start'] || ''
        },
        {
          label: 'Wat vond je al wel goed gaan en wat niet?',
          value: personalReflection['prof-strengths-weaknesses'] || ''
        },
        {
          label: 'Hoe kijk je er nu naar je professionele houding en wat is er veranderd?',
          value: personalReflection['prof-development-now'] || ''
        }
      ]);
      
      // Moral Compass Section
      html += Templates.reflectionSummarySection('Moreel kompas', [
        {
          label: 'Hoe zie jij je eigen morele kompas? Heb je een voorbeeld waarbij je op je morele kompas hebt gevaren?',
          value: personalReflection['moral-compass'] || ''
        },
        {
          label: 'Welke strategische keuzes/dilemma\'s ben je tegengekomen?',
          value: personalReflection['strategic-dilemmas'] || ''
        },
        {
          label: 'Welke morele dilemma\'s ben je tegengekomen?',
          value: personalReflection['moral-dilemmas'] || ''
        },
        {
          label: 'Had je dat voorzien van tevoren? Hoe bewust heb je hier gehandeld?',
          value: personalReflection['moral-foresight'] || ''
        }
      ]);
      
      // STARR Reflection
      const starrItems = CONFIG.REFLECTION_SECTIONS.starrReflection.map(field => ({
        label: field.label.split(':')[0] + ':',
        value: personalReflection[field.name] || ''
      }));
      
      // Check if any STARR field has content
      const hasStarrContent = starrItems.some(item => item.value.trim() !== '');
      
      if (hasStarrContent) {
        html += Templates.reflectionSummarySection('STARR Reflectie', starrItems);
      } else {
        html += Templates.reflectionSummarySection('STARR Reflectie', [{
          label: 'STARR Reflectie',
          value: '<span class="italic text-gray-500">Geen STARR reflectie ingevuld.</span>'
        }]);
      }
      
      elements.reflectionSummary.innerHTML = html;
    }
  });