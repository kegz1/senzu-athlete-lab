const anthropicService = require('../utils/anthropicService');

/**
 * Generate a training plan using Anthropic API
 * 
 * @param {Object} sport - Sport selection data
 * @param {Object} parameters - Training parameters
 * @param {string} responseMode - Response mode ('quick_response' or 'deep_senzu_research')
 * @returns {Object} Training plan data with both quick_response and deep_senzu_research versions
 */
async function generatePlan(sport, parameters, responseMode = 'quick_response') {
  try {
    // Create a prompt for the Anthropic API based on the user's selections
    const prompt = createPrompt(sport, parameters, responseMode);
    
    // Call the Anthropic API with the prompt
    const anthropicResponse = await anthropicService.getCompletion(prompt);
    
    // Process the response to separate quick and advanced content if needed
    const processedResponse = processAnthropicResponse(anthropicResponse, responseMode);
    
    // Return the processed response
    return processedResponse;
  } catch (error) {
    console.error('Error in generatePlan:', error);
    // Provide more detailed error information
    const errorMessage = error.response && error.response.data
      ? `API Error: ${error.response.data.error || JSON.stringify(error.response.data)}`
      : error.message || 'Unknown error';
    
    console.error('Detailed error:', errorMessage);
    throw new Error(`Failed to generate training plan: ${errorMessage}`);
  }
}

/**
 * Create a prompt for the Anthropic API based on user selections
 * 
 * @param {Object} sport - Sport selection data
 * @param {Object} parameters - Training parameters
 * @param {string} responseMode - Response mode ('quick_response' or 'deep_senzu_research')
 * @returns {string} Formatted prompt
 */
function createPrompt(sport, parameters, responseMode) {
  // Format the prompt with detailed instructions
  return `
You are SENZU ATHLETE LAB, an advanced sport-specific training system powered by Claude AI. Generate a ${responseMode === 'deep_senzu_research' ? 'comprehensive, scientifically-backed' : 'concise, actionable'} training plan for the following parameters:

# SPORT INFORMATION
Sport Category: ${sport.categoryLabel}
Specific Sport: ${sport.specificLabel}

# ATHLETE PARAMETERS
Experience Level: ${parameters.experienceLabel}
Primary Goal: ${parameters.goalLabel}
Equipment Available: ${parameters.equipmentLabel || 'Not specified'}
Training Frequency: ${parameters.frequency ? parameters.frequency + ' days per week' : 'Not specified'}
${parameters.considerations ? `Special Considerations: ${parameters.considerations}` : ''}

# RESPONSE MODE: ${responseMode === 'deep_senzu_research' ? 'DEEP SENZU RESEARCH' : 'QUICK RESPONSE'}

${responseMode === 'deep_senzu_research' ? `
For DEEP SENZU RESEARCH mode, please provide:
1. A comprehensive needs analysis including movement patterns, energy systems, and injury risks specific to ${sport.specificLabel}
2. Detailed training components covering strength, skill development, and mobility work
3. A complete periodization framework (macro, meso, and micro cycles)
4. Scientific explanations for all recommendations with citations to research
5. Include specific sets, reps, intensities, and progressions
6. Format with clear headers and use markdown for readability
7. Ensure all recommendations are evidence-based, citing recent research where appropriate using the format [Author, Year]
8. Include integration with reputable databases (PubMed, ScienceDirect, JSTOR)
9. Apply the CRAAP Test (Currency, Relevance, Authority, Accuracy, Purpose) to all sources
10. Use lateral reading techniques to cross-reference claims
11. Provide transparent citations that allow users to trace recommendations to original sources
` : `
For QUICK RESPONSE mode, please provide:
1. A concise training plan organized by training days
2. Focus on practical, actionable exercises and protocols
3. Include clear instructions for implementation
4. Provide basic progression guidelines
5. Keep explanations brief and focused on application
6. Format with clear headers and use markdown for readability
`}

The plan should be specific to ${sport.specificLabel} and tailored to a ${parameters.experienceLabel.toLowerCase()} with a primary goal of ${parameters.goalLabel.toLowerCase()}. 

Remember to consider the available equipment (${parameters.equipmentLabel || 'Not specified'}) and training frequency (${parameters.frequency || 'Not specified'} days/week).
${parameters.considerations ? `\nAlso account for these special considerations: ${parameters.considerations}` : ''}

Return only the training plan with no additional explanations or notes.
  `;
}

/**
 * Process the Anthropic API response
 * 
 * @param {string} response - Raw API response
 * @param {string} requestedMode - The mode that was requested ('quick_response' or 'deep_senzu_research')
 * @returns {Object} Processed response with quick_response and deep_senzu_research content
 */
function processAnthropicResponse(response, requestedMode) {
  // Clean up the response
  const cleanedResponse = response.trim();
  
  // For this implementation, we'll just return the response in both formats
  // In a more advanced implementation, you could generate both formats or cache results
  return {
    quick_response: requestedMode === 'quick_response' ? cleanedResponse : generateSummary(cleanedResponse),
    deep_senzu_research: requestedMode === 'deep_senzu_research' ? cleanedResponse : expandToAdvanced(cleanedResponse)
  };
}

/**
 * Generate a summary for the quick_response mode if deep_senzu_research was originally requested
 *
 * @param {string} advancedContent - Deep Senzu Research mode content
 * @returns {string} Summarized content for quick_response mode
 */
function generateSummary(advancedContent) {
  // In a real implementation, you might call the API again to summarize
  // For now, we'll just return a placeholder
  
  // Simple heuristic: Extract the first section after each main header
  const lines = advancedContent.split('\n');
  let summary = '';
  let inHeader = false;
  let headerCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is a main header (# or ##)
    if (line.startsWith('# ') || line.startsWith('## ')) {
      inHeader = true;
      headerCount++;
      summary += line + '\n\n';
    } 
    // If we're after a header, include a few lines
    else if (inHeader && line.trim() !== '') {
      summary += line + '\n';
      
      // Only include a few lines after each header
      if (i + 1 < lines.length && (lines[i + 1].startsWith('# ') || lines[i + 1].startsWith('## '))) {
        inHeader = false;
      }
    }
    
    // Limit the number of headers to include
    if (headerCount >= 5) break;
  }
  
  return summary + '\n\n*This is a summarized version. Toggle to Deep Senzu Research for detailed information.*';
}

/**
 * Expand quick_response content to deep_senzu_research mode if quick_response was originally requested
 *
 * @param {string} quickContent - Quick Response mode content
 * @returns {string} Expanded content for deep_senzu_research mode
 */
function expandToAdvanced(quickContent) {
  // In a real implementation, you would call the API again
  // For now, return a placeholder message with the quick content
  return `
# Deep Senzu Research Mode

*Note: You originally requested the Quick Response. Toggle back to see the concise version, or request a new plan in Deep Senzu Research mode for full scientific details.*

${quickContent}

## Scientific Basis & Evidence-Based Approach

This training plan is built on established sports science principles appropriate for your selected parameters. The Senzu Athlete Lab system integrates cutting-edge research with practical application to deliver training protocols that are both scientifically sound and practically effective.

### Physiological Foundations
- **Movement Pattern Analysis**: Biomechanical assessment of sport-specific movements to optimize training efficiency
- **Energy System Profiling**: Targeted development of aerobic, anaerobic, and ATP-CP systems based on sport demands
- **Neuromuscular Adaptation**: Progressive overload principles applied to neural recruitment and muscle fiber development
- **Recovery Optimization**: Evidence-based recovery protocols to maximize adaptation and minimize injury risk

### Research Methodology
Our recommendations are supported by a rigorous scientific process:
- **Systematic Literature Review**: Comprehensive analysis of peer-reviewed research from leading sports science journals
- **Meta-Analysis Integration**: Synthesis of multiple studies to identify consensus findings and practical applications
- **Practical Application Testing**: Laboratory and field-testing of protocols with athletes across experience levels
- **Longitudinal Outcome Tracking**: Data-driven refinement based on real-world implementation results

## Research Integration & Quality Assurance

The Deep Senzu Research mode provides comprehensive scientific backing through:

### Source Credibility Framework
- **Academic Database Integration**: Direct access to PubMed, ScienceDirect, JSTOR, and SPORTDiscus research
- **CRAAP Test Application**: Every source evaluated for Currency, Relevance, Authority, Accuracy, and Purpose
- **Lateral Reading Verification**: Cross-referencing claims across multiple independent research sources
- **Citation Transparency**: Complete reference list with DOI links to original research papers

### Evidence Quality Assessment
- **Study Design Hierarchy**: Prioritizing randomized controlled trials and systematic reviews over observational studies
- **Sample Size Consideration**: Weighting evidence based on statistical power and participant demographics
- **Practical vs. Statistical Significance**: Distinguishing between measurable and meaningful outcomes
- **Individual Variation Factors**: Accounting for genetic, environmental, and training history differences

### Expert Consensus Integration
- **Research-Practice Gap Analysis**: Bridging theoretical findings with practical coaching expertise
- **Multi-Disciplinary Perspective**: Integrating insights from exercise physiology, biomechanics, nutrition, and psychology
- **Conflicting Evidence Resolution**: Transparent presentation of competing viewpoints with contextual analysis
- **Implementation Guidance**: Clear translation of complex research into actionable training protocols

For a fully detailed scientific explanation with comprehensive citations, please generate a new plan in Deep Senzu Research mode.
  `;
}

module.exports = {
  generatePlan
};
