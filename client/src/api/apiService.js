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
    // Define comprehensive sport-specific training data
    const sportData = {
      'Running': {
        biomechanics: {
          description: 'Running involves a cyclical gait pattern with alternating single-leg support phases and flight phases. The kinetic chain activates in a sequential pattern from ground contact through toe-off.',
          keyJointActions: 'Ankle dorsiflexion (loading) to plantarflexion (propulsion), knee flexion (loading) to extension (propulsion), hip extension (propulsion) with contralateral hip flexion.',
          forceProduction: 'Ground reaction forces typically range from 2.5-3.0x body weight during footstrike, with elite sprinters generating up to 4.0x body weight.',
          techniqueFactors: 'Stride length, stride frequency, ground contact time, flight time, vertical oscillation, and foot strike pattern (forefoot, midfoot, rearfoot).'
        },
        movementPatterns: 'Cyclical lower body movement with emphasis on hip extension, knee extension, and ankle plantarflexion. Running mechanics involve a stretch-shortening cycle utilizing elastic energy storage in the Achilles tendon and plantar fascia.',
        energySystems: {
          primary: 'Primarily aerobic for distances beyond 800m (>75% contribution for marathon), with increasing anaerobic contribution as distance decreases (400m: ~70% anaerobic, 100m: ~90% ATP-PC system).',
          workRestRatios: 'Sprint intervals: 1:3-1:5 work:rest ratio for ATP-PC development; Tempo runs: Continuous effort at 85-90% max heart rate for glycolytic endurance.',
          conditioningProtocols: 'Zone 2 training (65-75% max HR) for aerobic base development, VO2max intervals (90-95% max HR) for aerobic power, and sprint intervals for anaerobic capacity.'
        },
        muscleRecruitment: {
          primaryMovers: 'Gluteus maximus, quadriceps (vastus lateralis, vastus medialis, rectus femoris), hamstrings (biceps femoris, semitendinosus, semimembranosus), gastrocnemius, soleus.',
          stabilizers: 'Gluteus medius, core musculature (transverse abdominis, multifidus), tibialis anterior, peroneus longus.',
          commonImbalances: 'Overactive quadriceps relative to hamstrings, weak gluteus medius leading to hip drop, tight hip flexors limiting hip extension.'
        },
        injuryRisks: {
          common: 'Achilles tendinopathy, plantar fasciitis, patellofemoral pain syndrome, IT band syndrome, stress fractures, medial tibial stress syndrome (shin splints).',
          prevention: 'Progressive loading, eccentric calf strengthening, hip abductor/external rotator strengthening, regular footwear rotation, and gradual mileage progression (10% rule).'
        },
        performanceMetrics: {
          keyIndicators: 'VO2max, lactate threshold, running economy (oxygen cost at submaximal speeds), maximal aerobic speed, critical speed, anaerobic capacity.',
          benchmarks: 'Elite male marathon runners: VO2max >70 ml/kg/min, running economy <200 ml/kg/km at marathon pace; Elite female marathon runners: VO2max >65 ml/kg/min.'
        },
        keyExercises: [
          'Progressive interval training (400m, 800m, 1600m repeats)',
          'Hill sprints (10-15 second maximal effort uphill runs)',
          'Tempo runs (20-40 minutes at lactate threshold pace)',
          'Long slow distance (LSD) runs (60-150 minutes at 65-75% max heart rate)'
        ],
        strengthFocus: [
          'Single-leg exercises (Bulgarian split squats, single-leg deadlifts)',
          'Hip abductor strengthening (clamshells, lateral band walks)',
          'Calf raises (both straight-leg and bent-knee variations)',
          'Core stability work (planks, Pallof press, dead bugs)'
        ],
        references: [
          'Napier C, et al. "Kinetic risk factors of running-related injuries in female recreational runners." Scandinavian Journal of Medicine & Science in Sports, 28(10), 2018.',
          'Barnes KR, et al. "Strategies to Improve Running Economy in Trained Distance Runners." Sports Medicine, 45, 2015.',
          'Novacheck TF. "The biomechanics of running." Gait & Posture, 7(1), 1998.',
          'Jones AM, et al. "The three-minute all-out test for aerobic function." Medicine & Science in Sports & Exercise, 42(5), 2010.',
          'Lieberman DE, et al. "Foot strike patterns and collision forces in habitually barefoot versus shod runners." Nature, 463(7280), 2010.'
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
    // Extract injury risks from the object if it exists in that format
    const injuryRisks = sportData.injuryRisks.common ?
      sportData.injuryRisks.common.split(',')[0].toLowerCase() :
      sportData.injuryRisks.split(',')[0].toLowerCase();
    
    // Extract energy systems information
    const energySystems = sportData.energySystems.primary ?
      sportData.energySystems.primary :
      sportData.energySystems;
    
    return `# ${sport} Training Plan for ${experience} - ${goal}

## Biomechanical Analysis & Training Focus

${sportData.biomechanics ? sportData.biomechanics.description : 'Sport-specific movement patterns with unique biomechanical demands.'}

### Key Movement Patterns
${sportData.movementPatterns}

### Primary Muscle Groups
${sportData.muscleRecruitment ? `Primary Movers: ${sportData.muscleRecruitment.primaryMovers}
Stabilizers: ${sportData.muscleRecruitment.stabilizers}` : 'Sport-specific muscle recruitment patterns.'}

## Training Schedule

### Day 1: Strength & Movement Development
- Warm-up: 10-15 minutes of dynamic mobility focusing on ${sportData.biomechanics ? sportData.biomechanics.keyJointActions.split(',')[0].toLowerCase() : 'sport-specific movement patterns'}
- Main workout: ${experienceData.volumeModifier} with emphasis on ${goalData.trainingEmphasis}
  * ${sportData.strengthFocus[0]}
  * ${sportData.strengthFocus[1]}
- Technical focus: ${sportData.biomechanics ? sportData.biomechanics.techniqueFactors.split(',')[0] : 'Sport-specific technique development'}
- Cool-down: 5-10 minutes of targeted mobility work

### Day 2: Sport-Specific Development
- Warm-up: Sport-specific activation drills targeting ${sportData.muscleRecruitment ? sportData.muscleRecruitment.primaryMovers.split(',')[0] : 'primary movers'}
- Main workout: ${sportData.keyExercises[0]} and ${sportData.keyExercises[1]}
- Energy system training: ${sportData.energySystems.workRestRatios ? sportData.energySystems.workRestRatios.split(';')[0] : 'Sport-specific conditioning'}
- Technical focus: ${experienceData.techniqueEmphasis}
- Cool-down: Mobility exercises for ${injuryRisks} prevention

### Day 3: Recovery & Supplementary Work
- Active recovery: 20-30 minutes of low-intensity activity
- Targeted work for injury prevention: Focus on ${injuryRisks} ${sportData.injuryRisks.prevention ? `using ${sportData.injuryRisks.prevention.split(',')[0]}` : ''}
- ${goalData.supplementaryWork}

## Progression Plan
${experienceData.progressionRate}. Track ${sportData.performanceMetrics ? sportData.performanceMetrics.keyIndicators.split(',')[0].toLowerCase() : goalData.successMetrics.split(',')[0].toLowerCase()} as your primary metric.

## Nutrition Focus
${goalData.nutritionFocus}

## Scientific Basis
This program is based on research from:
${sportData.references[0]}`;
  }
  
  generateDeepResponse(sport, experience, goal, sportData, experienceData, goalData) {
    // Extract injury risks from the object if it exists in that format
    const injuryRisks = sportData.injuryRisks.common ?
      sportData.injuryRisks.common :
      sportData.injuryRisks;
    
    // Extract energy systems information
    const energySystems = sportData.energySystems.primary ?
      sportData.energySystems.primary :
      sportData.energySystems;
    
    return `# Comprehensive ${sport} Training Plan for ${experience} - ${goal}

## 🧠 Comprehensive Sport-Specific Analysis

### Key Movement Patterns & Biomechanics
${sportData.biomechanics ? sportData.biomechanics.description : 'Sport-specific movement patterns with unique biomechanical demands.'}

Key Joint Actions: ${sportData.biomechanics ? sportData.biomechanics.keyJointActions : 'Multi-joint coordination specific to the sport\'s technical requirements.'}

Force Production: ${sportData.biomechanics ? sportData.biomechanics.forceProduction : 'Force application varies based on the specific demands of the sport.'}

Technique Factors: ${sportData.biomechanics ? sportData.biomechanics.techniqueFactors : 'Technical efficiency factors specific to the sport\'s performance requirements.'}

### Energy System Demands
${energySystems}

Work-Rest Ratios: ${sportData.energySystems.workRestRatios ? sportData.energySystems.workRestRatios : 'Sport-specific work:rest ratios based on competitive demands.'}

Conditioning Protocols: ${sportData.energySystems.conditioningProtocols ? sportData.energySystems.conditioningProtocols : 'Conditioning protocols designed to match the metabolic demands of the sport.'}

### Primary Muscles Involved
Primary Movers: ${sportData.muscleRecruitment ? sportData.muscleRecruitment.primaryMovers : 'Primary muscle groups specific to the sport\'s movement patterns.'}

Stabilizers: ${sportData.muscleRecruitment ? sportData.muscleRecruitment.stabilizers : 'Stabilizing muscles supporting the primary movement patterns.'}

Common Imbalances: ${sportData.muscleRecruitment ? sportData.muscleRecruitment.commonImbalances : 'Common muscular imbalances associated with the sport\'s repetitive movements.'}

### Injury Risk & Prevention
Common Injuries: ${sportData.injuryRisks.common ? sportData.injuryRisks.common : injuryRisks}

Prevention Strategies: ${sportData.injuryRisks.prevention ? sportData.injuryRisks.prevention : 'Preventative strategies addressing the specific injury risks of the sport.'}

### Performance Metrics to Track
Key Indicators: ${sportData.performanceMetrics ? sportData.performanceMetrics.keyIndicators : 'Sport-specific performance metrics relevant to competitive success.'}

Benchmarks: ${sportData.performanceMetrics ? sportData.performanceMetrics.benchmarks : 'Performance benchmarks for various competitive levels.'}

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

## 🧪 Scientific Rationale
This program integrates evidence-based approaches from current sports science research:

${sportData.references[0]}
${sportData.references[1]}
${sportData.references.length > 2 ? sportData.references[2] : ''}
${sportData.references.length > 3 ? sportData.references[3] : ''}

The training structure follows periodization principles established by Bompa & Buzzichelli (2019), with modifications based on individual response and adaptation rates.

## Implementation Guidelines
1. Begin with an assessment of current capacities in key performance indicators
2. Track progress using the provided metrics: ${sportData.performanceMetrics ? sportData.performanceMetrics.keyIndicators : goalData.successMetrics}
3. Adjust based on individual response, particularly monitoring ${injuryRisks.split(',')[0].toLowerCase()} for early intervention
4. Implement ${goalData.nutritionFocus.split('.')[0].toLowerCase()} to support training adaptations`;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
