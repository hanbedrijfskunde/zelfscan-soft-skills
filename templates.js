/**
 * HTML template functions for dynamic content generation
 */

const Templates = {
    /**
     * Generate HTML for a qualification section
     * @param {Object} qualification - The qualification data object
     * @returns {string} HTML string for the qualification section
     */
    qualificationSection(qualification) {
      return `
        <div class="qualification-section mb-8 ${qualification.id < 9 ? 'border-b pb-6' : ''}">
          <h2 class="text-2xl font-semibold text-blue-700 mb-3">
            Eindkwalificatie ${qualification.id}: ${qualification.name}
          </h2>
          <div class="mb-4">
            <div class="bg-gray-50 p-4 rounded-md mb-4">
              <h3 class="text-lg font-medium text-blue-600 mb-2">
                Voldoende:
              </h3>
              <ul class="list-disc pl-6 text-gray-700">
                ${qualification.sufficient.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="bg-blue-50 p-4 rounded-md mb-4">
              <h3 class="text-lg font-medium text-blue-600 mb-2">
                Onderscheidend:
              </h3>
              <ul class="list-disc pl-6 text-gray-700">
                ${qualification.distinguished.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2">Je score:</label>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
              ${CONFIG.SCORE_DESCRIPTIONS.map((desc, index) => `
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    name="score-${qualification.id}"
                    value="${index}"
                    class="form-radio text-blue-600"
                  />
                  <span class="ml-2">${index} - ${desc}</span>
                </label>
              `).join('')}
            </div>
          </div>
  
          <div>
            <label class="block text-gray-700 font-medium mb-2">Toelichting (optioneel):</label>
            <textarea
              name="comment-${qualification.id}"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
      `;
    },
  
    /**
     * Generate HTML for a reflection section
     * @param {string} title - Section title
     * @param {Array} fields - Array of field objects with name, label, and rows properties
     * @returns {string} HTML string for the reflection section
     */
    reflectionSection(title, fields) {
      return `
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-blue-700 mb-3">${title}</h3>
          ${fields.map(field => `
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">${field.label}</label>
              <textarea
                name="${field.name}"
                rows="${field.rows}"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          `).join('')}
        </div>
      `;
    },
  
    /**
     * Generate HTML for the STARR reflection section with container
     * @param {Array} fields - Array of STARR field objects
     * @returns {string} HTML string for the STARR reflection section
     */
    starrReflectionSection(fields) {
      return `
        <div class="mb-6 border p-4 rounded-md">
          <h3 class="text-xl font-semibold text-blue-700 mb-3">STARR Reflectie op een situatie</h3>
          ${fields.map(field => `
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">${field.label}</label>
              <textarea
                name="${field.name}"
                rows="${field.rows}"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          `).join('')}
        </div>
      `
    },
  
    /**
     * Generate HTML for a score result in the results tab
     * @param {number} id - Qualification ID
     * @param {string} name - Qualification name
     * @param {number} score - Score value
     * @returns {string} HTML string for the score result
     */
    scoreResult(id, name, score) {
      return `
        <div class="p-2">
          <p class="font-medium">${id}. ${name}</p>
          <p class="text-lg">Score: <span class="${CONFIG.SCORE_COLORS[score] || 'text-gray-600'}">${score} - ${CONFIG.SCORE_DESCRIPTIONS[score]}</span></p>
        </div>
      `;
    },
  
    /**
     * Generate HTML for a comment in the results tab
     * @param {number} id - Qualification ID
     * @param {string} name - Qualification name
     * @param {string} comment - Comment text
     * @returns {string} HTML string for the comment display
     */
    commentDisplay(id, name, comment) {
      return `
        <div class="bg-gray-50 p-4 rounded-md mb-4">
          <h4 class="font-medium mb-2">${id}. ${name}</h4>
          <p class="text-gray-700">${comment}</p>
        </div>
      `;
    },
  
    /**
     * Generate HTML for reflection summary section in results tab
     * @param {string} title - Section title
     * @param {Array} items - Array of {label, value} objects to display
     * @returns {string} HTML string for the reflection summary section
     */
    reflectionSummarySection(title, items) {
      return `
        <div class="mb-4">
          <h4 class="font-medium text-lg text-blue-700 mb-3">${title}</h4>
          <div class="bg-gray-50 p-4 rounded-md mb-4 space-y-4">
            ${items.map(item => `
              <div class="mb-3">
                <p class="font-medium mb-1">${item.label}</p>
                <p class="text-gray-700 bg-white border border-gray-200 p-2 rounded whitespace-pre-line">
                  ${item.value.trim() || '<span class="italic text-gray-500">Niet ingevuld</span>'}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  };