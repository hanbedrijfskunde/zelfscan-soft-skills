/**
 * Utility functions for the application
 */

// Make sure Utils is a global variable
window.Utils = {
    /**
     * Get DOM element by ID
     * @param {string} id - Element ID
     * @returns {HTMLElement} The DOM element
     */
    getElement(id) {
      return document.getElementById(id);
    },
  
    /**
     * Get all DOM elements by selector
     * @param {string} selector - CSS selector
     * @returns {NodeList} List of matching DOM elements
     */
    getElements(selector) {
      return document.querySelectorAll(selector);
    },
  
    /**
     * Set active tab
     * @param {HTMLElement} tab - The tab element to activate
     * @param {NodeList} allTabs - All tab elements
     * @param {NodeList} allContent - All content elements
     */
    setActiveTab(tab, allTabs, allContent) {
      // Get target content ID
      const targetId = tab.getAttribute('data-tabs-target');
      const targetContent = document.getElementById(targetId);
      
      // Hide all content
      allContent.forEach(content => content.classList.add('hidden'));
      
      // Remove active class from all tabs
      allTabs.forEach(t => {
        t.classList.remove('text-blue-600', 'border-blue-600', 'active-tab');
        t.classList.add('border-transparent');
      });
      
      // Show target content
      targetContent.classList.remove('hidden');
      
      // Add active class to clicked tab
      tab.classList.add('text-blue-600', 'border-blue-600', 'active-tab');
      tab.classList.remove('border-transparent');
    },
    
    /**
     * Get form data from inputs
     * @returns {Object} Object containing form data
     */
    getFormData() {
      const qualificationData = CONFIG.QUALIFICATION_DATA.map(qual => qual.id);
      const formData = {
        scores: {},
        comments: {},
        isComplete: true,
        personalReflection: {}
      };
      
      // Collect qualification scores and comments
      qualificationData.forEach(id => {
        const selectedRadio = document.querySelector(`input[name="score-${id}"]:checked`);
        if (!selectedRadio) {
          formData.isComplete = false;
        } else {
          formData.scores[id] = parseInt(selectedRadio.value);
        }
        
        formData.comments[id] = document.querySelector(`textarea[name="comment-${id}"]`).value || "";
      });
      
      // Collect personal reflection data
      Utils.getElements('#personal-reflection-content textarea').forEach(textarea => {
        formData.personalReflection[textarea.name] = textarea.value || "";
      });
      
      return formData;
    },
    
    /**
     * Reset form to initial state
     */
    resetForm() {
      Utils.getElements('input[type="radio"]').forEach(radio => {
        radio.checked = false;
      });
      
      Utils.getElements('textarea').forEach(textarea => {
        textarea.value = "";
      });
    },
    
    /**
     * Create and update a radar chart
     * @param {Object} scores - Object with qualification scores
     * @param {HTMLCanvasElement} canvas - The canvas element for the chart
     */
    createRadarChart(scores, canvas) {
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }
      
      const ctx = canvas.getContext('2d');
      
      // Destroy existing chart if it exists
      if (window.radarChart) {
        window.radarChart.destroy();
      }
      
      // Prepare data for radar chart
      const labels = CONFIG.QUALIFICATION_DATA.map(qual => `${qual.id}. ${qual.name}`);
      const data = CONFIG.QUALIFICATION_DATA.map(qual => scores[qual.id] || 0);
      
      // Create chart
      window.radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Jouw scores',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          }]
        },
        options: {
          scales: {
            r: {
              angleLines: { display: true },
              suggestedMin: 0,
              suggestedMax: 3,
              ticks: { stepSize: 1 }
            }
          }
        }
      });
    },
    
    /**
     * Save HTML content as PDF
     * @param {HTMLElement} element - Element to save as PDF
     */
    saveAsPDF(element) {
      if (!element) return;
      
      const options = {
        margin: 1,
        filename: 'zelfbeoordeling-en-reflectie.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      try {
        html2pdf().from(element).set(options).save();
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Er is een fout opgetreden bij het genereren van de PDF.');
      }
    }
  };