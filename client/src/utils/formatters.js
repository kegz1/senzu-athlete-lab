/**
 * Format a date as YYYY-MM-DD
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Format training plan parameters for display
 * @param {Object} parameters - Training parameters
 * @returns {string} Formatted string for display
 */
export function formatTrainingParameters(parameters) {
  const lines = [];
  
  if (parameters.experienceLabel) {
    lines.push(`Experience: ${parameters.experienceLabel}`);
  }
  
  if (parameters.goalLabel) {
    lines.push(`Goal: ${parameters.goalLabel}`);
  }
  
  if (parameters.equipmentLabel) {
    lines.push(`Equipment: ${parameters.equipmentLabel}`);
  }
  
  if (parameters.frequency) {
    lines.push(`Frequency: ${parameters.frequency} days/week`);
  }
  
  if (parameters.considerations) {
    lines.push(`Special Considerations: ${parameters.considerations}`);
  }
  
  return lines.join('\n');
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text;
  
  return text.substring(0, length).trim() + '...';
}

/**
 * Add citation formatting to text
 * @param {string} text - Input text
 * @returns {string} Text with formatted citations
 */
export function formatCitations(text) {
  // Basic pattern for citation patterns like [1], [2], etc.
  const citationPattern = /\[(\d+)\]/g;
  
  // Replace citation patterns with superscript formatting
  return text.replace(citationPattern, '<sup>[$1]</sup>');
}
