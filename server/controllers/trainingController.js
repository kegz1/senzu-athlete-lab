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

## Biomechanical & Physiological Insights
- Joint Angle Analysis: Optimal joint angles and ranges of motion for performance and safety
- Muscle Fiber Type Targeting: Specific protocols for fast-twitch vs. slow-twitch fiber development
- Torque Load Distribution: Analysis of force vectors and torque loads across movement patterns
- Neuromuscular Recruitment Patterns: Specific activation sequences and motor unit recruitment strategies

## Injury Prevention & Prehabilitation
- Movement Screening: Functional movement assessments with corrective strategies
- Compensatory Pattern Identification: Recognition and correction of dysfunctional movement patterns
- Prehabilitation Protocols: Targeted exercises to address potential injury sites
- Reactive Drills: Neuromuscular training to improve proprioception and joint stability

## Performance Monitoring & Feedback Systems
- Metric Identification & Assessment: Sport-specific KPIs, progress tracking with statistical significance thresholds, adaptation rate analysis, and multi-factorial performance modeling
- Intelligent Feedback Mechanisms: Algorithmic program modification based on response patterns, stagnation detection with intervention strategies, load-tolerance calibration, and goal recalibration frameworks

## Scientific Credibility Architecture
- Evidence Integration System: PubMed/ScienceDirect/JSTOR database integration, CRAAP Test application, lateral reading methodology, and hierarchical evidence classification
- Knowledge Verification Framework: Citation system with DOI reference, methodological quality assessment, effect size reporting with practical vs. statistical significance distinction, and confidence rating system

Format with clear headers and use markdown for readability. For each of the ${frequency} training days, provide:

1. A clear training split structure (e.g., Push/Pull/Legs, Upper/Lower, Full Body, etc.)
2. A specific warm-up protocol tailored to the day's training focus
3. For each exercise:
   - Exercise name (with any needed modifications based on equipment or restrictions)
   - Sets / Reps / Tempo / Rest periods (e.g., "4 x 8 @ 3010 tempo, 90s rest")
   - Technical cues and coaching notes (e.g., "focus on external rotation" or "pause at bottom")
4. A mobility and recovery protocol to complete the session

Use a professional, coach-level tone that is direct and results-oriented. Provide expert insights without unnecessary fluff.
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

Format with clear headers and use markdown for readability. For each of the ${frequency} training days, provide:

1. A clear training split structure (e.g., Push/Pull/Legs, Upper/Lower, Full Body, etc.)
2. A brief warm-up protocol
3. For each exercise:
   - Exercise name
   - Sets / Reps / Rest periods
   - 1-2 key coaching cues
4. A brief cool-down protocol

Use a direct, actionable tone that focuses on practical implementation.
`}

The plan must be specific to ${sport.specificLabel} and tailored to a ${parameters.experienceLabel.toLowerCase()} athlete with a primary goal of ${parameters.goalLabel.toLowerCase()}. 

Apply evidence-based training models based on the goal:
- For Muscle Gain goals: Focus on 6-12 reps, moderate-to-heavy load, high volume, progressive overload
- For Fat Loss goals: Implement supersets, circuits, short rest periods, and conditioning finishers
- For Athletic Performance goals: Include CNS priming, plyometrics, reactive drills, and sport-specific movement patterns
- For Mobility/Recovery goals: Incorporate mobility flows, soft tissue work, and blood flow stimulation techniques
- For Sport-Specific goals: Prioritize movement patterns and energy systems specific to ${sport.specificLabel}

Apply appropriate training principles based on fitness level:
- For Novice athletes: Focus on fundamental movement patterns, technique development, and linear progression
- For Intermediate athletes: Implement undulating periodization, increased volume, and more varied exercise selection
- For Advanced athletes: Utilize complex programming, specialized techniques (drop sets, cluster sets), and autoregulation

Consider equipment availability and constraints:
- For Bodyweight training: Emphasize progressive variations, tempo manipulation, and mechanical advantage adjustments
- For Dumbbell/Kettlebell training: Focus on unilateral movements, stability challenges, and metabolic conditioning
- For Full Gym access: Incorporate a wider variety of exercises, specialized equipment, and optimal loading strategies

Account for time constraints by optimizing:
- Volume regulation (total weekly sets based on experience level)
- Intensity control (e.g., RIR, %1RM estimates)
- Movement pattern balance (push/pull, hinge/squat/lunge/carry)
- Progressive overload schedule (linear vs undulating)
- Rest periods and exercise sequencing (based on energy systems)

${parameters.considerations ? `Address the following special considerations: ${parameters.considerations}
- Modify exercises to accommodate any injury restrictions
- Provide alternative movements for problematic exercises
- Include specific prehabilitation exercises for vulnerable areas
- Adjust intensity and volume as needed for safety` : ''}

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
    summary += `## Training Schedule\n${generateTrainingDays(frequency, sportName, parameters.goalLabel)}\n`;
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
function generateTrainingDays(frequency, sportName, goal = 'General Fitness') {
  let trainingDays = '';
  
  // Define different training day templates based on goals
  const goalSpecificTemplates = {
    'Muscle Gain': [
      {
        title: "Upper Body Hypertrophy",
        content: `- Warm-up: 10 minutes of dynamic mobility focusing on upper body
- Main workout: 
  * Bench Press: 4 sets of 8-10 reps at 70-75% 1RM, 90 sec rest
  * Barbell Rows: 4 sets of 8-10 reps at 70% 1RM, 90 sec rest
  * Incline Dumbbell Press: 3 sets of 10-12 reps, 60 sec rest
  * Cable Pulldowns: 3 sets of 10-12 reps, 60 sec rest
  * Lateral Raises: 3 sets of 12-15 reps, 45 sec rest
  * Tricep Pushdowns: 3 sets of 12-15 reps, 45 sec rest
- Cool-down: 5 minutes of upper body mobility work`
      },
      {
        title: "Lower Body Hypertrophy",
        content: `- Warm-up: 10 minutes of dynamic mobility focusing on lower body
- Main workout:
  * Barbell Squats: 4 sets of 8-10 reps at 70-75% 1RM, 2 min rest
  * Romanian Deadlifts: 4 sets of 8-10 reps at 70% 1RM, 2 min rest
  * Leg Press: 3 sets of 10-12 reps, 90 sec rest
  * Walking Lunges: 3 sets of 10-12 reps per leg, 90 sec rest
  * Seated Calf Raises: 4 sets of 12-15 reps, 60 sec rest
  * Leg Curls: 3 sets of 12-15 reps, 60 sec rest
- Cool-down: 5 minutes of lower body mobility work`
      },
      {
        title: "Full Body Hypertrophy",
        content: `- Warm-up: 10 minutes of full-body dynamic mobility
- Main workout:
  * Deadlifts: 4 sets of 6-8 reps at 75-80% 1RM, 2 min rest
  * Incline Bench Press: 4 sets of 8-10 reps at 70-75% 1RM, 90 sec rest
  * Pull-ups or Lat Pulldowns: 4 sets of 8-10 reps, 90 sec rest
  * Dumbbell Shoulder Press: 3 sets of 10-12 reps, 60 sec rest
  * Bulgarian Split Squats: 3 sets of 10-12 reps per leg, 60 sec rest
  * Cable Face Pulls: 3 sets of 12-15 reps, 45 sec rest
- Cool-down: 5 minutes of full-body mobility work`
      },
      {
        title: "Rest & Recovery",
        content: `- Active recovery: 20-30 minutes of low-intensity activity (walking, swimming, or cycling)
- Flexibility work: 15-20 minutes of static stretching focusing on major muscle groups
- Self-myofascial release: 10-15 minutes with foam roller or massage ball
- Ensure adequate protein intake (1.6-2.2g/kg/day) and caloric surplus`
      }
    ],
    'Fat Loss': [
      {
        title: "Upper Body & HIIT",
        content: `- Warm-up: 5 minutes of dynamic mobility
- Circuit training (3 rounds, minimal rest between exercises, 60 sec rest between rounds):
  * Push-ups: 12-15 reps
  * Dumbbell Rows: 12-15 reps per arm
  * Shoulder Press: 12-15 reps
  * TRX/Ring Rows: 12-15 reps
  * Tricep Dips: 12-15 reps
- HIIT Finisher: 
  * 8 rounds of 20 seconds all-out effort (battle ropes, burpees, or mountain climbers), 10 seconds rest
- Cool-down: 5 minutes of light stretching`
      },
      {
        title: "Lower Body & Metabolic Conditioning",
        content: `- Warm-up: 5 minutes of dynamic mobility
- Circuit training (3 rounds, minimal rest between exercises, 60 sec rest between rounds):
  * Goblet Squats: 15 reps
  * Kettlebell Swings: 15 reps
  * Walking Lunges: 10 reps per leg
  * Step-ups: 10 reps per leg
  * Glute Bridges: 15 reps
- Metabolic Finisher:
  * 10-minute AMRAP (As Many Rounds As Possible): 10 box jumps, 10 kettlebell swings, 10 push-ups
- Cool-down: 5 minutes of light stretching`
      },
      {
        title: "Full Body Circuit",
        content: `- Warm-up: 5 minutes of dynamic mobility
- Superset 1 (4 rounds, 30 sec rest between rounds):
  * Dumbbell Thrusters: 12 reps
  * Renegade Rows: 12 reps (6 per side)
- Superset 2 (4 rounds, 30 sec rest between rounds):
  * Reverse Lunges with Bicep Curls: 10 reps per leg
  * Push-up to Side Plank: 10 reps (5 per side)
- Superset 3 (4 rounds, 30 sec rest between rounds):
  * Kettlebell Swings: 15 reps
  * Mountain Climbers: 30 reps (15 per side)
- Conditioning Finisher:
  * 5 rounds of 30 seconds jump rope, 30 seconds rest
- Cool-down: 5 minutes of light stretching`
      },
      {
        title: "Active Recovery & Steady State Cardio",
        content: `- Steady-state cardio: 30-45 minutes at 65-70% max heart rate (walking, cycling, swimming, or elliptical)
- Mobility work: 15 minutes focusing on problem areas
- Self-myofascial release: 10 minutes with foam roller
- Ensure caloric deficit (15-20% below maintenance) with adequate protein (1.8-2.2g/kg/day)`
      }
    ],
    'Athletic Performance': [
      {
        title: "Power & Explosiveness",
        content: `- Warm-up: 10 minutes of dynamic movement preparation with neural activation
- CNS Priming: 
  * 3 sets of 3 reps of box jumps with full recovery
  * 3 sets of 3 reps of medicine ball throws with full recovery
- Main workout:
  * Trap Bar Deadlifts: 5 sets of 3-5 reps at 80-85% 1RM, 2-3 min rest
  * Weighted Pull-ups: 4 sets of 4-6 reps, 2 min rest
  * Plyometric Push-ups: 4 sets of 5-8 reps, 90 sec rest
  * Depth Jumps: 4 sets of 5 reps, 2 min rest
- Cool-down: Mobility and light stretching`
      },
      {
        title: "Speed & Agility",
        content: `- Warm-up: 10 minutes of progressive movement preparation
- Technique drills:
  * A-skips, B-skips, high knees: 3 sets of 20 meters each
  * Lateral shuffles: 3 sets of 20 meters each direction
- Main workout:
  * Sprint accelerations: 8 sets of 20 meters, full recovery
  * 5-10-5 agility drill: 6 sets, full recovery
  * Reactive agility drills: 6 sets with directional cues, full recovery
- Cool-down: Dynamic flexibility work`
      },
      {
        title: "Strength & Power",
        content: `- Warm-up: 10 minutes of dynamic movement preparation
- Main workout:
  * Back Squats: 5 sets of 5 reps at 80% 1RM, 2-3 min rest
  * Bench Press: 5 sets of 5 reps at 80% 1RM, 2-3 min rest
  * Weighted Pull-ups: 4 sets of 5 reps, 2 min rest
  * Barbell Hip Thrusts: 4 sets of 6 reps, 2 min rest
  * Single-leg Bounds: 4 sets of 5 reps per leg, 90 sec rest
- Cool-down: Mobility and light stretching`
      },
      {
        title: "Recovery & Mobility",
        content: `- Active recovery: 20 minutes of low-intensity movement
- Mobility flow: 15 minutes targeting ankles, hips, thoracic spine, and shoulders
- Self-myofascial release: 15 minutes focusing on major muscle groups
- Contrast therapy: Alternating hot and cold exposure if available
- Ensure adequate nutrition and hydration for recovery`
      }
    ],
    'Mobility/Recovery': [
      {
        title: "Upper Body Mobility & Recovery",
        content: `- Soft tissue work: 15 minutes with foam roller and lacrosse ball on upper back, shoulders, and arms
- Mobility sequence:
  * Scapular wall slides: 3 sets of 10 reps with 5-second holds
  * Thoracic extensions over foam roller: 3 sets of 10 reps
  * Shoulder CARs (Controlled Articular Rotations): 3 sets of 5 reps in each direction
  * Forearm and wrist mobility: 3 sets of 30 seconds each position
- Gentle strength work:
  * Band pull-aparts: 3 sets of 15 reps
  * Face pulls: 3 sets of 15 reps
  * Prone YTWLs: 2 sets of 8 reps each position
- Breathing work: 5 minutes of diaphragmatic breathing`
      },
      {
        title: "Lower Body Mobility & Recovery",
        content: `- Soft tissue work: 15 minutes with foam roller and lacrosse ball on glutes, hamstrings, quads, and calves
- Mobility sequence:
  * Hip CARs (Controlled Articular Rotations): 3 sets of 5 reps in each direction
  * Ankle mobility: 3 sets of 10 reps in each direction
  * Active hamstring stretches: 3 sets of 8 reps per leg
  * Hip flexor mobilizations: 3 sets of 30 seconds per side
- Gentle strength work:
  * Glute bridges: 3 sets of 15 reps
  * Calf raises: 3 sets of 15 reps
  * Bodyweight squats: 2 sets of 15 reps with focus on form
- Walking: 15 minutes of mindful walking focusing on gait mechanics`
      },
      {
        title: "Full Body Mobility Flow",
        content: `- Dynamic mobility flow (30 minutes):
  * Sun salutations or similar flowing sequence: 5 rounds
  * World's greatest stretch: 5 reps per side
  * Thoracic rotations: 10 reps per side
  * Hip flow sequence: 5 minutes
  * Shoulder flow sequence: 5 minutes
- Breathing and mindfulness: 10 minutes
- Light movement: 15 minutes of easy swimming, walking, or cycling for blood flow
- Hydration focus: Ensure adequate fluid and electrolyte intake`
      },
      {
        title: "Active Recovery & Regeneration",
        content: `- Low-intensity cardio: 20-30 minutes at 60-65% max heart rate
- Contrast therapy: Alternating hot and cold exposure if available
- Self-massage: 20 minutes focusing on problem areas
- Gentle stretching: 15 minutes of static stretching
- Sleep optimization: Focus on sleep hygiene and quality
- Nutrition focus: Anti-inflammatory foods and adequate protein intake`
      }
    ],
    'Sport-Specific': [
      {
        title: `${sportName}-Specific Skills & Conditioning`,
        content: `- Warm-up: 15 minutes of ${sportName}-specific movement preparation
- Technical skill work:
  * Sport-specific drills focusing on fundamental movement patterns
  * Technical practice with progressive complexity
  * Decision-making elements under controlled conditions
- Conditioning:
  * Work-to-rest ratios matching ${sportName} demands
  * Sport-specific movement patterns at game intensity
- Cool-down: Recovery protocols specific to ${sportName}`
      },
      {
        title: `${sportName} Strength & Power Development`,
        content: `- Warm-up: 10 minutes of dynamic mobility focusing on ${sportName}-specific movement patterns
- Main workout:
  * Compound exercises targeting primary movement patterns in ${sportName}
  * Power development using sport-specific force vectors
  * Unilateral exercises for balance and stability
  * Core training with rotational and anti-rotational emphasis
- Cool-down: Mobility work focusing on sport-specific requirements`
      },
      {
        title: `${sportName} Movement Integration`,
        content: `- Warm-up: 10 minutes of progressive movement preparation
- Movement skills:
  * Sport-specific agility drills with increasing complexity
  * Reactive drills with visual and auditory cues
  * Deceleration and change of direction training
  * Sport-specific plyometric progressions
- Technical integration:
  * Skill application under fatigue conditions
  * Scenario-based training with decision-making elements
- Cool-down: Recovery protocols specific to ${sportName}`
      },
      {
        title: "Recovery & Injury Prevention",
        content: `- Active recovery: 20 minutes of low-intensity movement
- Mobility work: 15 minutes targeting ${sportName}-specific problem areas
- Corrective exercises: Addressing common imbalances in ${sportName}
- Self-myofascial release: 15 minutes focusing on high-stress areas
- Recovery nutrition: Focus on replenishing glycogen and supporting tissue repair`
      }
    ],
    'General Fitness': [
      {
        title: "Strength & Movement Development",
        content: `- Warm-up: 10 minutes of dynamic mobility
- Main workout: 
  * Squats: 3 sets of 8-10 reps
  * Push-ups or Bench Press: 3 sets of 8-10 reps
  * Rows: 3 sets of 8-10 reps
  * Lunges: 3 sets of 8-10 reps per leg
  * Core work: 3 sets of 30-45 seconds
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
- Main workout: 
  * Box jumps: 4 sets of 5 reps
  * Medicine ball throws: 4 sets of 5 reps
  * Kettlebell swings: 3 sets of 10 reps
  * Plyometric push-ups: 3 sets of 5-8 reps
- Cool-down: Mobility and light stretching`
      },
      {
        title: "Endurance & Conditioning",
        content: `- Warm-up: Progressive intensity build-up
- Main workout: 
  * Interval training: 8 rounds of 30 seconds work, 90 seconds rest
  * Circuit training: 3 rounds of 5 exercises, 45 seconds work, 15 seconds rest
- Cool-down: Gradual intensity reduction`
      }
    ]
  };
  
  // Select the appropriate templates based on the goal
  const dayTemplates = goalSpecificTemplates[goal] || goalSpecificTemplates['General Fitness'];
  
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
