// Client-side mock implementation to avoid API calls
class ApiService {
  async generateTrainingPlan(data) {
    try {
      console.log('Generating training plan locally:', data);
      
      // Extract data for easier access
      const sportName = data.sport.sport.name;
      const experience = data.parameters.experienceLabel;
      const goal = data.parameters.goalLabel;
      const responseMode = data.responseMode;
      
      // Generate a mock response based on the data
      const mockResponse = this.createMockResponse(sportName, experience, goal, responseMode);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        quick_response: responseMode === 'quick_response' ? mockResponse.quick : mockResponse.quick,
        deep_senzu_research: responseMode === 'deep_senzu_research' ? mockResponse.deep : mockResponse.deep
      };
    } catch (error) {
      console.error('Error generating plan:', error);
      throw error;
    }
  }
  
  createMockResponse(sport, experience, goal, responseMode) {
    // Sport-specific training recommendations
    const sportSpecificData = this.getSportSpecificData(sport);
    
    // Experience-specific adjustments
    const experienceAdjustments = this.getExperienceAdjustments(experience);
    
    // Goal-specific focus
    const goalFocus = this.getGoalFocus(goal);
    
    // Generate appropriate response based on mode
    const quick = this.generateQuickResponse(sport, experience, goal, sportSpecificData, experienceAdjustments, goalFocus);
    const deep = this.generateDeepResponse(sport, experience, goal, sportSpecificData, experienceAdjustments, goalFocus);
    
    return { quick, deep };
  }
  
  getSportSpecificData(sport) {
    // Define sport-specific training data
    const sportData = {
      'Running': {
        movementPatterns: 'Cyclical lower body movement with emphasis on hip extension, knee extension, and ankle plantarflexion',
        energySystems: 'Primary reliance on aerobic system for distances beyond 800m, with increasing anaerobic contribution as distance decreases',
        injuryRisks: 'Achilles tendinopathy, plantar fasciitis, patellofemoral pain syndrome, IT band syndrome, stress fractures',
        keyExercises: ['Progressive interval training', 'Hill sprints', 'Tempo runs', 'Long slow distance (LSD) runs'],
        strengthFocus: ['Single-leg exercises', 'Hip abductor strengthening', 'Calf raises', 'Core stability work'],
        references: [
          'Napier C, et al. "Kinetic risk factors of running-related injuries in female recreational runners." Scand J Med Sci Sports, 28(10), 2018.',
          'Barnes KR, et al. "Strategies to Improve Running Economy in Trained Distance Runners." Sports Medicine, 45, 2015.'
        ]
      },
      'Swimming': {
        movementPatterns: 'Multi-planar upper and lower body movements with emphasis on shoulder rotation, hip rotation, and spinal extension',
        energySystems: 'Mixed energy system contribution depending on distance, with sprint events relying on ATP-CP and glycolytic systems, and distance events on aerobic system',
        injuryRisks: 'Swimmer\'s shoulder (rotator cuff tendinopathy), breaststroker\'s knee, neck strain, lower back pain',
        keyExercises: ['Interval sets with varied stroke techniques', 'Drill-focused technique work', 'Hypoxic training', 'Sprint sets'],
        strengthFocus: ['Rotator cuff strengthening', 'Scapular stabilization', 'Core anti-rotation exercises', 'Lat development'],
        references: [
          'Wanivenhaus F, et al. "Epidemiology of injuries and prevention strategies in competitive swimmers." Sports Health, 4(3), 2012.',
          'Crowley E, et al. "Effects of dry land strength training on swimming performance: A systematic review." Journal of Strength and Conditioning Research, 32(9), 2018.'
        ]
      },
      'Basketball': {
        movementPatterns: 'Multi-directional movement with frequent acceleration/deceleration, jumping, and lateral movement',
        energySystems: 'Primarily anaerobic with repeated high-intensity efforts and incomplete recovery, supported by aerobic base',
        injuryRisks: 'Ankle sprains, ACL tears, patellar tendinopathy, finger/hand injuries, lower back pain',
        keyExercises: ['Plyometric training', 'Agility ladder drills', 'Defensive slide practice', 'Shooting drills under fatigue'],
        strengthFocus: ['Single-leg stability work', 'Posterior chain development', 'Core anti-rotation', 'Ankle proprioception'],
        references: [
          'Scanlan AT, et al. "The physiological and activity demands experienced by Australian female basketball players during competition." Journal of Science and Medicine in Sport, 15(4), 2012.',
          'Schelling X, et al. "A comparison of a GPS device and a multi-camera video technology during official basketball matches." Journal of Strength and Conditioning Research, 30(8), 2016.'
        ]
      },
      'Weightlifting': {
        movementPatterns: 'Triple extension (ankle, knee, hip), overhead stabilization, core bracing, and spinal alignment',
        energySystems: 'Primary reliance on ATP-CP system for maximal efforts with glycolytic system supporting training volume',
        injuryRisks: 'Lower back strain, shoulder impingement, wrist sprains, knee pain, tendinopathies',
        keyExercises: ['Clean and jerk technique work', 'Snatch progression', 'Position-specific strength development', 'Overhead stability drills'],
        strengthFocus: ['Front squat', 'Overhead pressing', 'Pull variations', 'Core stability'],
        references: [
          'Storey A, et al. "The Snatch: A Review of the Literature." Strength and Conditioning Journal, 38(2), 2016.',
          'Calhoon G, et al. "Injury rates and profiles of elite competitive weightlifters." Journal of Athletic Training, 34(3), 1999.'
        ]
      },
      'Cycling': {
        movementPatterns: 'Cyclical lower body movement with emphasis on hip flexion/extension, knee extension, and ankle plantarflexion in a fixed position',
        energySystems: 'Primarily aerobic for endurance cycling with anaerobic system contribution during climbs, sprints, and high-intensity efforts',
        injuryRisks: 'Patellofemoral pain, IT band syndrome, lower back pain, neck strain, saddle sores',
        keyExercises: ['Interval training', 'Hill repeats', 'Tempo rides', 'Technical descending practice'],
        strengthFocus: ['Single-leg exercises', 'Core stability', 'Hip mobility work', 'Upper body postural exercises'],
        references: [
          'Bini RR, et al. "Biomechanics of cycling - A literature review." Journal of Science and Cycling, 1(1), 2012.',
          'Abt JP, et al. "Relationship between cycling mechanics and core stability." Journal of Strength and Conditioning Research, 21(4), 2007.'
        ]
      },
      // Default for other sports
      'default': {
        movementPatterns: 'Multi-planar movement with sport-specific biomechanical demands',
        energySystems: 'Mixed energy system contribution depending on the specific demands of the sport',
        injuryRisks: 'Sport-specific injury patterns related to movement demands and common overuse patterns',
        keyExercises: ['Sport-specific skill development', 'Conditioning matched to sport demands', 'Movement pattern training', 'Recovery protocols'],
        strengthFocus: ['Functional strength development', 'Core stability', 'Movement-specific power', 'Injury prevention'],
        references: [
          'Bompa T, et al. "Periodization: Theory and Methodology of Training." Human Kinetics, 2018.',
          'Haff GG, et al. "Training Principles for Power." Strength and Conditioning Journal, 34(6), 2012.'
        ]
      }
    };
    
    // Return sport-specific data or default if not found
    return sportData[sport] || sportData['default'];
  }
  
  getExperienceAdjustments(experience) {
    const adjustments = {
      'Beginner': {
        volumeModifier: 'Lower initial volume with focus on technique development',
        intensityGuidance: 'Moderate intensity (60-70% of maximum effort) to develop base fitness',
        progressionRate: 'Rapid initial progress with emphasis on movement quality before intensity',
        techniqueEmphasis: 'High emphasis on proper form and movement patterns',
        recoveryNeeds: 'More recovery between sessions to allow for adaptation'
      },
      'Intermediate': {
        volumeModifier: 'Moderate volume with progressive overload',
        intensityGuidance: 'Varied intensity (70-85% of maximum effort) with periodic higher intensity work',
        progressionRate: 'Steady progression with planned deload periods',
        techniqueEmphasis: 'Refinement of technique under increasing loads/speeds',
        recoveryNeeds: 'Structured recovery protocols with attention to problem areas'
      },
      'Advanced': {
        volumeModifier: 'Higher volume with periodized approach',
        intensityGuidance: 'Strategic high-intensity work (80-95% of maximum effort) with appropriate recovery',
        progressionRate: 'Nuanced progression focusing on weaknesses and specialized adaptations',
        techniqueEmphasis: 'Technique maintenance under fatigue and maximum effort',
        recoveryNeeds: 'Sophisticated recovery strategies including active recovery, nutrition timing, and sleep optimization'
      },
      // Default for other experience levels
      'default': {
        volumeModifier: 'Individualized volume based on training history',
        intensityGuidance: 'Progressive intensity based on adaptation and goals',
        progressionRate: 'Systematic progression with regular assessment',
        techniqueEmphasis: 'Ongoing technique development appropriate to level',
        recoveryNeeds: 'Recovery matched to training stress'
      }
    };
    
    return adjustments[experience] || adjustments['default'];
  }
  
  getGoalFocus(goal) {
    const goalData = {
      'Strength Building': {
        primaryFocus: 'Progressive overload of major movement patterns',
        trainingEmphasis: 'Compound movements with appropriate loading (70-90% 1RM)',
        nutritionFocus: 'Caloric surplus with emphasis on protein intake (1.6-2.2g/kg/day)',
        supplementaryWork: 'Joint stability, mobility maintenance, and recovery optimization',
        successMetrics: 'Strength increases in key lifts, improved force production, and structural adaptations'
      },
      'Endurance Development': {
        primaryFocus: 'Cardiovascular efficiency and substrate utilization',
        trainingEmphasis: 'Zone-based training with emphasis on aerobic development and lactate threshold work',
        nutritionFocus: 'Fueling strategies for training, carbohydrate periodization, and micronutrient adequacy',
        supplementaryWork: 'Strength maintenance, mobility, and recovery techniques',
        successMetrics: 'Improved time to exhaustion, lactate threshold, and performance at submaximal intensities'
      },
      'Weight Loss': {
        primaryFocus: 'Sustainable caloric deficit with muscle preservation',
        trainingEmphasis: 'Combination of resistance training and high-efficiency cardiovascular work',
        nutritionFocus: 'Moderate caloric deficit (15-20%), adequate protein (1.8-2.2g/kg/day), and nutrient density',
        supplementaryWork: 'Stress management, sleep optimization, and habit formation',
        successMetrics: 'Body composition changes, performance maintenance/improvement, and metabolic health markers'
      },
      'Muscle Gain': {
        primaryFocus: 'Hypertrophy-specific training with progressive overload',
        trainingEmphasis: 'Volume-focused training in moderate rep ranges (8-15) with appropriate intensity',
        nutritionFocus: 'Caloric surplus (10-20% above maintenance), high protein intake (1.6-2.2g/kg/day), and meal distribution',
        supplementaryWork: 'Recovery optimization, sleep quality, and stress management',
        successMetrics: 'Lean mass increases, strength improvements, and visual muscle development'
      },
      'Performance Enhancement': {
        primaryFocus: 'Sport-specific physical capacities and skill transfer',
        trainingEmphasis: 'Periodized approach targeting limiting factors in performance',
        nutritionFocus: 'Performance-based nutrition timing and composition',
        supplementaryWork: 'Recovery techniques, mobility work, and injury prevention',
        successMetrics: 'Sport-specific performance metrics, competition results, and physical testing improvements'
      },
      // Default for other goals
      'default': {
        primaryFocus: 'Balanced development of fitness components',
        trainingEmphasis: 'Varied stimulus addressing multiple fitness domains',
        nutritionFocus: 'Balanced macronutrient approach with emphasis on whole foods',
        supplementaryWork: 'Mobility, stability, and recovery work',
        successMetrics: 'Improvements in relevant performance metrics and subjective well-being'
      }
    };
    
    return goalData[goal] || goalData['default'];
  }
  
  generateQuickResponse(sport, experience, goal, sportData, experienceData, goalData) {
    return `# ${sport} Training Plan for ${experience} - ${goal}

## Training Schedule

### Day 1: Strength & Movement Patterns
- Warm-up: 10 minutes of dynamic mobility focusing on ${sportData.movementPatterns.split(',')[0].toLowerCase()}
- Main workout: ${experienceData.volumeModifier} with emphasis on ${goalData.trainingEmphasis}
  * ${sportData.strengthFocus[0]}
  * ${sportData.strengthFocus[1]}
- Cool-down: 5 minutes of targeted mobility work

### Day 2: Sport-Specific Development
- Warm-up: Sport-specific activation drills
- Main workout: ${sportData.keyExercises[0]} and ${sportData.keyExercises[1]}
- Technical focus: ${experienceData.techniqueEmphasis}
- Cool-down: Mobility exercises for ${sportData.injuryRisks.split(',')[0].toLowerCase()} prevention

### Day 3: Recovery & Supplementary Work
- Active recovery: 20-30 minutes of low-intensity activity
- Targeted work for injury prevention: Focus on ${sportData.injuryRisks.split(',')[0].toLowerCase()} and ${sportData.injuryRisks.split(',')[1].toLowerCase()}
- ${goalData.supplementaryWork}

## Progression Plan
${experienceData.progressionRate}. Track ${goalData.successMetrics.split(',')[0].toLowerCase()} as your primary metric.

## Nutrition Focus
${goalData.nutritionFocus}`;
  }
  
  generateDeepResponse(sport, experience, goal, sportData, experienceData, goalData) {
    return `# Comprehensive ${sport} Training Plan for ${experience} - ${goal}

## Needs Analysis

### Movement Patterns
${sportData.movementPatterns}. These movement patterns form the foundation of our training approach, ensuring specificity and transfer to performance.

### Energy Systems
${sportData.energySystems}. Training is structured to develop the appropriate energy system contribution based on ${sport} demands and ${goal.toLowerCase()} requirements.

### Injury Risk Assessment
Common injury sites include ${sportData.injuryRisks}. This plan incorporates preventative exercises and load management strategies to minimize these risks.

## Periodization Framework

### Macrocycle (12 weeks)
- Weeks 1-4: Foundation Phase - Establishing movement quality and baseline capacities
- Weeks 5-8: Development Phase - Progressive overload with ${experienceData.intensityGuidance}
- Weeks 9-12: Performance Phase - Integration of all components with sport-specific application

### Mesocycle Structure
Each 4-week block progressively increases in intensity while maintaining appropriate volume, with week 4 serving as a strategic deload to optimize adaptation.

### Microcycle Organization
- Day 1: Strength Focus - ${goalData.primaryFocus}
- Day 2: Sport-Specific Development - ${sportData.keyExercises[0]} and ${sportData.keyExercises[1]}
- Day 3: Recovery - ${experienceData.recoveryNeeds}
- Day 4: Power Development - Sport-specific power application
- Day 5: Conditioning - Energy system development matched to ${sport} demands
- Day 6-7: Active Recovery - Low-intensity movement and mobility work

## Training Components

### Strength Development
- Primary movements: ${sportData.strengthFocus[0]} and ${sportData.strengthFocus[1]}
- Loading parameters: ${experienceData.intensityGuidance}
- Progressive overload: Systematic progression based on ${experienceData.progressionRate.toLowerCase()}

### Skill Acquisition
- Technical focus: ${sportData.keyExercises[2]} with emphasis on ${experienceData.techniqueEmphasis.toLowerCase()}
- Practice structure: Distributed practice with varied contexts
- Feedback implementation: Video analysis and coached sessions

### Recovery Protocols
- Sleep: 7-9 hours per night with emphasis on sleep quality
- Nutrition: ${goalData.nutritionFocus}
- Active recovery: Low-intensity movement targeting primary muscle groups used in ${sport}

## Scientific Basis
This program integrates evidence-based approaches from current sports science research:

${sportData.references[0]}
${sportData.references[1]}

The training structure follows periodization principles established by Bompa & Buzzichelli (2019), with modifications based on individual response and adaptation rates.

## Implementation Guidelines
1. Begin with an assessment of current capacities in key performance indicators
2. Track progress using the provided metrics: ${goalData.successMetrics}
3. Adjust based on individual response, particularly monitoring ${sportData.injuryRisks.split(',')[0].toLowerCase()} for early intervention
4. Implement ${goalData.nutritionFocus.split('.')[0].toLowerCase()} to support training adaptations`;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
