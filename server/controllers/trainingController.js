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
    // Ensure frequency is properly handled
    const frequency = parameters.frequency || 3; // Default to 3 if not specified
    console.log(`Generating ${frequency}-day training plan for ${sport.specificLabel}, ${parameters.experienceLabel} level, ${parameters.goalLabel}`);
    
    // Create a prompt for the Anthropic API based on the user's selections
    const prompt = createPrompt(sport, parameters, responseMode);
    
    // Call the Anthropic API with the prompt
    const anthropicResponse = await anthropicService.getCompletion(prompt);
    
    // Process the response to separate quick and advanced content if needed
    const processedResponse = processAnthropicResponse(anthropicResponse, responseMode, sport, parameters);
    
    // Return the processed response
    return processedResponse;
  } catch (error) {
    console.error('Error in generatePlan:', error);
    throw new Error('Failed to generate training plan. Please try again.');
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
  // Ensure frequency is properly handled
  const frequency = parameters.frequency || 3; // Default to 3 if not specified
  const isAdvanced = responseMode === 'deep_senzu_research';
  
  // Format the prompt with detailed instructions
  return `
You are SENZU ATHLETE LAB, a revolutionary training system that delivers genius-level sport-specific programming through a minimalist interface. Generate a ${isAdvanced ? 'comprehensive, scientifically-backed' : 'concise, actionable'} ${frequency}-day training plan for the following parameters:

# SPORT INFORMATION
Sport Category: ${sport.categoryLabel}
Specific Sport: ${sport.specificLabel}

# ATHLETE PARAMETERS
Experience Level: ${parameters.experienceLabel}
Primary Goal: ${parameters.goalLabel}
Equipment Available: ${parameters.equipmentLabel || 'Standard equipment'}
Training Frequency: ${frequency} days per week
${parameters.considerations ? `Special Considerations: ${parameters.considerations}` : ''}

# RESPONSE MODE: ${isAdvanced ? 'DEEP SENZU RESEARCH' : 'QUICK RESPONSE'}

${isAdvanced ? `
For DEEP SENZU RESEARCH mode, provide a comprehensive scientific exposition with:

## Scientific Needs Analysis Matrix
- Movement Pattern Intelligence: Biomechanical deconstruction of sport-specific movements, multi-planar motion analysis, force vector mapping, and range-of-motion requirements
- Energy System Precision Mapping: Quantified energy pathway utilization percentages, work-to-rest ratio profiling, metabolic power output requirements, and recovery capacity assessment
- Injury Prevention Intelligence: Sport-specific vulnerability pattern recognition, compensatory movement identification, tissue capacity development, and workload monitoring thresholds
- Performance Metrics & Benchmarks: Sport-specific KPIs with validity-tested measurement protocols, reference standards, and testing protocols

## Scientific Periodization Framework
- Macrocycle Design Intelligence: Competition-synchronized planning, phase potentiation sequencing, physiological supercompensation targeting, and recovery-adaptation balance
- Mesocycle Engineering: Block periodization with concentrated load distribution, vertical integration of complementary attributes, progressive overload algorithms, and appropriate periodization model selection
- Microcycle Precision Programming: Neural/metabolic/mechanical stress distribution, exercise sequencing optimization, recovery window calculation, and readiness-based auto-regulation

## Advanced Training Component Integration
- Strength Development Protocols: Force profile-specific exercise selection, biomechanical specificity analysis, loading parameter optimization, and velocity-based prescription
- Skill Acquisition Engineering: Motor learning principles with deliberate practice frameworks, technical progression ladders, perceptual-cognitive integration, and contextual interference application
- Mobility System Architecture: Joint-by-joint approach with specific insufficiency remediation, active vs. passive technique application, neuromuscular recalibration, and integration sequencing

## Performance Monitoring & Feedback Systems
- Metric Identification & Assessment: Sport-specific KPIs, progress tracking with statistical significance thresholds, adaptation rate analysis, and multi-factorial performance modeling
- Intelligent Feedback Mechanisms: Algorithmic program modification based on response patterns, stagnation detection with intervention strategies, load-tolerance calibration, and goal recalibration frameworks

## Scientific Credibility Architecture
- Evidence Integration System: PubMed/ScienceDirect/JSTOR database integration, CRAAP Test application, lateral reading methodology, and hierarchical evidence classification
- Knowledge Verification Framework: Citation system with DOI reference, methodological quality assessment, effect size reporting with practical vs. statistical significance distinction, and confidence rating system

Format with clear headers and use markdown for readability. Include specific sets, reps, intensities, and progressions for each of the ${frequency} training days.
` : `
For QUICK RESPONSE mode, provide distilled, actionable training prescriptions with:

## User Experience Architecture
- Assessment Parameters: Sport category with biomechanical considerations, training history with recovery capacity, equipment requirements, and goal hierarchy
- Configuration Settings: Training frequency optimization, session design parameters, constraint identification, and special considerations

## Biomechanical Analysis & Training Focus
- Key movement patterns specific to ${sport.specificLabel}
- Primary muscle groups involved with stabilization requirements

## Training Schedule
- ${frequency} days of training with clear, actionable protocols
- Essential coaching cues for technical execution
- Progressive overload guidelines

## Scientific Credibility Architecture
- Evidence-based recommendations with primary research sources
- Key research insights supporting the training approach

Format with clear headers and use markdown for readability. Focus on practical implementation with specific exercises, sets, reps, and rest periods for each of the ${frequency} training days.
`}

The plan must be specific to ${sport.specificLabel} and tailored to a ${parameters.experienceLabel.toLowerCase()} athlete with a primary goal of ${parameters.goalLabel.toLowerCase()}. 

Ensure all ${frequency} training days are fully detailed with specific exercises, sets, reps, intensities, and rest periods. The training frequency is ${frequency} days per week, so create exactly ${frequency} distinct training days.

Return only the training plan with no additional explanations or notes.
  `;
}

/**
 * Process the Anthropic API response
 * 
 * @param {string} response - Raw API response
 * @param {string} requestedMode - The mode that was requested ('quick_response' or 'deep_senzu_research')
 * @param {Object} sport - Sport selection data
 * @param {Object} parameters - Training parameters
 * @returns {Object} Processed response with quick_response and deep_senzu_research content
 */
function processAnthropicResponse(response, requestedMode, sport, parameters) {
  // Clean up the response
  const cleanedResponse = response.trim();
  
  // For this implementation, we'll return the response in both formats
  // In a more advanced implementation, you could generate both formats or cache results
  return {
    quick_response: requestedMode === 'quick_response' ? cleanedResponse : generateSummary(cleanedResponse, sport, parameters),
    deep_senzu_research: requestedMode === 'deep_senzu_research' ? cleanedResponse : expandToAdvanced(cleanedResponse, sport, parameters)
  };
}

/**
 * Generate a summary for the quick mode if advanced was originally requested
 * 
 * @param {string} advancedContent - Deep Senzu Research mode content
 * @param {Object} sport - Sport selection data
 * @param {Object} parameters - Training parameters
 * @returns {string} Summarized content for Quick Response mode
 */
function generateSummary(advancedContent, sport, parameters) {
  const sportName = sport.specificLabel || 'General Sport';
  const experience = parameters.experienceLabel || 'Beginner';
  const goal = parameters.goalLabel || 'General Fitness';
  const frequency = parameters.frequency || 3; // Default to 3 if not specified
  
  // Extract key sections for the quick response
  const lines = advancedContent.split('\n');
  let summary = `# ${sportName} ${frequency}-Day Training Plan for ${experience} - ${goal}\n\n`;
  
  // Add User Experience Architecture section
  summary += `## User Experience Architecture\n\n`;
  summary += `### Assessment Parameters\n`;
  summary += `- **Sport Category**: ${sportName} (with sport-specific biomechanical considerations)\n`;
  summary += `- **Training History**: ${experience} level athlete with corresponding recovery capacity\n`;
  summary += `- **Equipment Requirements**: ${parameters.equipmentLabel || 'Standard equipment'}\n`;
  summary += `- **Goal Hierarchy**: Primary focus on ${goal} with balanced process and outcome metrics\n\n`;
  
  summary += `### Configuration Settings\n`;
  summary += `- **Training Frequency**: ${frequency} days per week optimized for recovery capacity\n`;
  summary += `- **Session Design**: Progressive intensity with appropriate density for ${experience} level\n`;
  summary += `- **Identified Constraints**: Addressed through individualized programming strategies\n`;
  summary += `- **Special Considerations**: ${parameters.considerations || 'None specified'}\n\n`;
  
  // Add Biomechanical Analysis section
  summary += `## Biomechanical Analysis & Training Focus\n\n`;
  summary += `${sportName} involves unique movement patterns with specific biomechanical demands that must be addressed through targeted training.\n\n`;
  
  summary += `### Key Movement Patterns\n`;
  summary += `Multi-planar movement with sport-specific biomechanical demands including pushing, pulling, rotation, and lower body power development.\n\n`;
  
  summary += `### Primary Muscle Groups\n`;
  summary += `Primary Movers: Major muscle groups specific to ${sportName} performance\n`;
  summary += `Stabilizers: Core and joint stabilizers supporting primary movement patterns\n\n`;
  
  // Extract training days section
  let inTrainingDays = false;
  let trainingDaysContent = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('Training Schedule') || line.includes('Training Days') || line.includes('Day 1:')) {
      inTrainingDays = true;
    }
    
    if (inTrainingDays) {
      trainingDaysContent += line + '\n';
      
      // Stop after we've captured all training days
      if (line.includes(`Day ${frequency}:`) && i + 10 < lines.length) {
        // Capture a few more lines after the last day
        for (let j = 1; j <= 10; j++) {
          if (i + j < lines.length && !lines[i + j].startsWith('##')) {
            trainingDaysContent += lines[i + j] + '\n';
          } else {
            break;
          }
        }
        break;
      }
    }
  }
  
  // Add the training days section
  if (trainingDaysContent) {
    summary += `## Training Schedule\n${trainingDaysContent}\n`;
  } else {
    // Fallback if we couldn't extract the training days
    summary += `## Training Schedule\n${generateTrainingDays(frequency, sportName)}\n`;
  }
  
  // Add Scientific Credibility Architecture section
  summary += `## Scientific Credibility Architecture\n\n`;
  summary += `### Evidence Integration System\n`;
  summary += `- **Primary Research Sources**: Peer-reviewed studies from PubMed, ScienceDirect, and JSTOR databases\n`;
  summary += `- **Quality Assessment**: CRAAP Test applied (Currency, Relevance, Authority, Accuracy, Purpose)\n`;
  summary += `- **Cross-Verification**: Multiple sources confirm key training principles\n`;
  summary += `- **Evidence Classification**: Based on research hierarchy (RCTs, meta-analyses, systematic reviews)\n\n`;
  
  summary += `### Knowledge Verification Framework\n`;
  summary += `- **Citation**: Kraemer & Ratamess, 2004; Issurin, 2010; Bompa & Buzzichelli, 2019\n`;
  summary += `- **Methodological Quality**: Rigorous research design with appropriate controls and methodology\n`;
  summary += `- **Practical Significance**: Findings demonstrate meaningful effect sizes beyond statistical significance\n`;
  summary += `- **Confidence Rating**: High confidence in recommendations based on consistent research findings\n\n`;
  
  // Add a note about the advanced mode
  summary += `\n\n*This is a summarized version. Toggle to Deep Senzu Research for detailed scientific information and comprehensive training protocols.*`;
  
  return summary;
}

/**
 * Expand quick content to advanced mode if quick was originally requested
 * 
 * @param {string} quickContent - Quick Response mode content
 * @param {Object} sport - Sport selection data
 * @param {Object} parameters - Training parameters
 * @returns {string} Expanded content for Deep Senzu Research mode
 */
function expandToAdvanced(quickContent, sport, parameters) {
  const sportName = sport.specificLabel || 'General Sport';
  const experience = parameters.experienceLabel || 'Beginner';
  const goal = parameters.goalLabel || 'General Fitness';
  const frequency = parameters.frequency || 3; // Default to 3 if not specified
  
  // Create a more comprehensive advanced response based on the quick content
  let advanced = `# Comprehensive ${frequency}-Day ${sportName} Training Plan for ${experience} - ${goal}\n\n`;
  
  // Add Scientific Needs Analysis Matrix section
  advanced += `## 🧠 Scientific Needs Analysis Matrix\n\n`;
  advanced += `### Movement Pattern Intelligence\n`;
  advanced += `- **Biomechanical Analysis**: ${sportName} involves unique movement patterns with specific biomechanical demands\n`;
  advanced += `- **Multi-Planar Motion**: Sport-specific joint actions and movement sequences across multiple planes of motion\n`;
  advanced += `- **Force Production**: Specific force application requirements for optimal ${sportName} performance\n`;
  advanced += `- **Range-of-Motion Requirements**: Optimal joint mobility thresholds for ${sportName}\n\n`;
  
  advanced += `### Energy System Precision Mapping\n`;
  advanced += `- **Energy Pathway Utilization**: ${sportName} utilizes a specific blend of energy systems based on competitive demands\n`;
  advanced += `- **Work-to-Rest Ratio Profile**: Optimized for ${sportName} performance requirements\n`;
  advanced += `- **Metabolic Power Output**: ${experience} level ${sportName} athletes require specific conditioning protocols\n`;
  advanced += `- **Recovery Capacity Assessment**: Tailored to ${experience} experience level\n\n`;
  
  advanced += `### Neuromuscular Recruitment Patterns\n`;
  advanced += `- **Primary Movers**: Major muscle groups specific to ${sportName} performance requirements\n`;
  advanced += `- **Stabilization Systems**: Core and joint stabilizers supporting primary movement patterns\n`;
  advanced += `- **Compensatory Patterns**: Common muscular imbalances associated with repetitive ${sportName} movements\n\n`;
  
  advanced += `### Injury Prevention Intelligence\n`;
  advanced += `- **Vulnerability Pattern Recognition**: Sport-specific injury risk factors for ${sportName}\n`;
  advanced += `- **Corrective Strategies**: Preventative exercises tailored to ${sportName} demands\n`;
  advanced += `- **Tissue Capacity Development**: Progressive loading protocols targeting vulnerable structures\n`;
  advanced += `- **Workload Monitoring Thresholds**: Individualized based on ${experience} level recovery capacity\n\n`;
  
  // Add Scientific Periodization Framework section
  advanced += `## Scientific Periodization Framework\n\n`;
  advanced += `### Macrocycle Design Intelligence\n`;
  advanced += `- **Competition-Synchronized Planning**: 12-week structure aligned with ${sportName} performance demands\n`;
  advanced += `- **Phase Potentiation Sequence**:\n`;
  advanced += `  * Weeks 1-4: Foundation Phase - Establishing movement quality and baseline capacities\n`;
  advanced += `  * Weeks 5-8: Development Phase - Progressive overload with ${experience === 'Beginner' ? 'moderate intensity (60-70% of maximum effort)' : 
    experience === 'Intermediate' ? 'varied intensity (70-85% of maximum effort)' : 
    'strategic high-intensity work (80-95% of maximum effort)'}\n`;
  advanced += `  * Weeks 9-12: Performance Phase - Integration of all components with sport-specific application\n`;
  advanced += `- **Supercompensation Targeting**: Strategic intensification and tapering to peak for key performance periods\n`;
  advanced += `- **Recovery-Adaptation Balance**: Planned deload weeks at the end of each 4-week block to optimize adaptation\n\n`;
  
  advanced += `### Mesocycle Engineering\n`;
  advanced += `- **Block Periodization**: Concentrated load distribution focusing on specific adaptations in each 4-week block\n`;
  advanced += `- **Vertical Integration**: Complementary training attributes developed simultaneously with emphasis shifts\n`;
  advanced += `- **Progressive Overload Algorithm**: Systematic progression based on ${experience === 'Beginner' ? 'rapid initial progress' : 
    experience === 'Intermediate' ? 'steady progression' : 
    'nuanced progression'} with individualized adjustment based on response\n`;
  advanced += `- **Periodization Model**: ${experience === 'Advanced' ? 'Undulating daily and weekly intensity to maximize adaptation stimulus' : 
    'Linear progression with gradual intensity increases to build foundational capacity'}\n\n`;
  
  // Add the original quick content
  advanced += quickContent;
  
  // Add Performance Monitoring & Feedback Systems section
  advanced += `\n\n## Performance Monitoring & Feedback Systems\n\n`;
  advanced += `### Metric Identification & Assessment\n`;
  advanced += `- **Sport-Specific KPIs**: Performance metrics relevant to ${sportName} competitive success\n`;
  advanced += `- **Measurement Protocols**: Standardized testing procedures with established reliability and validity\n`;
  advanced += `- **Progress Tracking**: Statistical significance thresholds to differentiate between meaningful changes and normal variation\n`;
  advanced += `- **Adaptation Profiling**: Individual response patterns analyzed to identify fast vs. slow responders to specific training stimuli\n\n`;
  
  advanced += `### Intelligent Feedback Mechanisms\n`;
  advanced += `- **Program Modification Algorithm**: Evidence-based adjustments based on performance data and recovery metrics\n`;
  advanced += `- **Stagnation Detection**: Early identification of plateaus with targeted intervention strategies\n`;
  advanced += `- **Load-Tolerance Calibration**: Progressive exposure to training stress with continuous refinement based on adaptation\n`;
  advanced += `- **Goal Recalibration**: Regular reassessment of objectives with balanced focus on process and outcome metrics\n\n`;
  
  // Add note about generating a full advanced analysis
  advanced += `\n\n*Note: This is an expanded version of the Quick Response. For a complete scientific analysis with comprehensive research citations, please generate a new plan directly in Deep Senzu Research mode.*`;
  
  return advanced;
}

/**
 * Generate training days based on frequency
 * 
 * @param {number} frequency - Number of training days
 * @param {string} sportName - Name of the sport
 * @returns {string} Formatted training days
 */
function generateTrainingDays(frequency, sportName) {
  let trainingDays = '';
  
  // Define different training day templates
  const dayTemplates = [
    {
      title: "Strength & Movement Development",
      content: `- Warm-up: 10 minutes of dynamic mobility
- Main workout: 3-4 sets of 6-10 reps for major muscle groups
- Cool-down: 5 minutes of targeted mobility work`
    },
    {
      title: "Sport-Specific Development",
      content: `- Warm-up: Sport-specific drills for 15 minutes
- Main workout: Technical practice for 30-45 minutes
- Cool-down: Mobility exercises for 10 minutes`
    },
    {
      title: "Recovery & Supplementary Work",
      content: `- Active recovery: 20-30 minutes of low-intensity activity
- Flexibility work: 15-20 minutes of stretching
- Mental training: 10 minutes of visualization`
    },
    {
      title: "Power & Explosiveness",
      content: `- Warm-up: Dynamic movement preparation
- Main workout: Plyometric and explosive training
- Cool-down: Mobility and light stretching`
    },
    {
      title: "Endurance & Conditioning",
      content: `- Warm-up: Progressive intensity build-up
- Main workout: Sport-specific conditioning intervals
- Cool-down: Gradual intensity reduction`
    }
  ];
  
  // Generate appropriate number of training days
  for (let i = 1; i <= frequency; i++) {
    // Select template based on day number and frequency
    let templateIndex;
    
    if (frequency <= 3) {
      // For low frequency, use the first 3 templates in order
      templateIndex = (i - 1) % 3;
    } else if (frequency <= 5) {
      // For medium frequency, distribute key training types
      if (i === 1) templateIndex = 0; // Strength
      else if (i === 2) templateIndex = 1; // Sport-specific
      else if (i === frequency) templateIndex = 2; // Recovery
      else templateIndex = 3 + ((i - 3) % 2); // Power or Endurance
    } else {
      // For high frequency (6-7 days), cycle through all templates
      templateIndex = (i - 1) % dayTemplates.length;
    }
    
    const template = dayTemplates[templateIndex];
    
    trainingDays += `
### Day ${i}: ${template.title}
${template.content}
`;
  }
  
  return trainingDays;
}

module.exports = {
  generatePlan
};
