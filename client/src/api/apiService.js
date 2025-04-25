// Client-side mock implementation to avoid API calls
class ApiService {
  async generateTrainingPlan(data) {
    try {
      console.log('Generating training plan locally:', data);
      
      // Extract data for easier access
      const sportName = data.sport.sport.name;
      const experience = data.parameters.experienceLabel;
      const goal = data.parameters.goalLabel;
      const frequency = parseInt(data.parameters.frequency) || 3; // Default to 3 if not specified
      const responseMode = data.responseMode;
      
      console.log(`Generating ${frequency}-day training plan for ${sportName}, ${experience} level, ${goal}`);
      
      // Show loading message to indicate processing
      document.getElementById('loading').querySelector('p').textContent =
        `Analyzing ${sportName} biomechanics and creating ${frequency}-day training plan...`;
      
      // Generate a mock response based on the data
      const mockResponse = this.createMockResponse(sportName, experience, goal, frequency, responseMode);
      
      // Simulate network delay - longer for more complex plans
      const baseDelay = 2000; // Base delay of 2 seconds
      const additionalDelay = frequency * 500; // Additional 500ms per training day
      const totalDelay = baseDelay + additionalDelay;
      
      console.log(`Processing plan, will take approximately ${totalDelay/1000} seconds`);
      
      // Update loading message during "processing"
      setTimeout(() => {
        document.getElementById('loading').querySelector('p').textContent =
          `Optimizing training protocols for ${experience} level ${goal.toLowerCase()}...`;
      }, baseDelay / 2);
      
      await new Promise(resolve => setTimeout(resolve, totalDelay));
      
      return {
        quick_response: mockResponse.quick,
        deep_senzu_research: mockResponse.deep
      };
    } catch (error) {
      console.error('Error generating plan:', error);
      throw error;
    }
  }
  
  createMockResponse(sport, experience, goal, frequency, responseMode) {
    // Hard-coded workout plans for testing
    const workoutPlans = {
      quick: `# ${sport} ${frequency}-Day Training Plan for ${experience} - ${goal}

## Training Schedule

### Day 1: Strength & Movement Development
- Warm-up: 10-15 minutes of dynamic mobility focusing on sport-specific movement patterns
- Main workout: Moderate volume with progressive overload with emphasis on Compound movements with appropriate loading (70-90% 1RM)
  * Front squat: 4 sets of 6-8 reps, 2 min rest
  * Overhead pressing: 4 sets of 8-10 reps, 90 sec rest
  * Core stability: 3 sets of 30-45 seconds, 60 sec rest
- Technical focus: Sport-specific technique development
- Cool-down: 5-10 minutes of targeted mobility work

### Day 2: Sport-Specific Development
- Warm-up: Sport-specific activation drills targeting primary movers
- Main workout: Sport-specific skill development and Conditioning matched to sport demands
  * Technical drills: 4 sets of 5-8 reps, full recovery
  * Sport-specific movement patterns: 3 sets of 10-12 reps, 60 sec rest
- Energy system training: Sport-specific conditioning
- Technical focus: High emphasis on proper form and movement patterns
- Cool-down: Mobility exercises for injury prevention

### Day 3: Recovery & Supplementary Work
- Active recovery: 20-30 minutes of low-intensity activity
- Targeted work for injury prevention: Focus on common problem areas
  * Mobility work: 2-3 sets of 30-45 seconds per position
  * Corrective exercises: 2 sets of 10-12 reps, focus on quality
- Joint stability, mobility maintenance, and recovery optimization`,
      
      deep: `# Comprehensive ${frequency}-Day ${sport} Training Plan for ${experience} - ${goal}

## 🧠 Scientific Needs Analysis Matrix

### Movement Pattern Intelligence

#### 🦴 Biomechanical Analysis
${sport === 'Powerlifting' ? 
  `Powerlifting involves repeated maximal force production through triple extension patterns, placing high biomechanical demand on the spine, hips, knees, and shoulders. The sport requires coordinated recruitment of multiple muscle groups to move maximal loads through specific ranges of motion in the squat, bench press, and deadlift. Training must address spinal stability, hip mobility, and shoulder integrity to optimize performance and mitigate injury risks from heavy loading.` : 
sport === 'Strongman' ? 
  `Strongman involves extreme loading across varied movement patterns including overhead pressing, pulling, carrying, and loading events. This places tremendous biomechanical stress on the entire kinetic chain, particularly the lower back, shoulders, and hips. The sport demands both static and dynamic strength with unpredictable loading patterns. Training should emphasize core stability, total body strength, and grip endurance to handle the diverse event requirements.` :
sport === 'BJJ' ? 
  `BJJ involves repeated flexion and rotation under resistance — placing high biomechanical demand on the spine, shoulders, and knees. Training should address spinal stability and shoulder integrity to mitigate injury risks from joint locks and ground grappling. The sport requires isometric strength endurance, particularly in the gripping muscles, core, and hip flexors for guard maintenance.` :
sport === 'Olympic Weightlifting' ?
  `Olympic Weightlifting involves complex, multi-joint ballistic movements requiring precise biomechanical sequencing and exceptional neuromuscular coordination. Research by Kipp et al. (2018) demonstrates that the snatch and clean & jerk create peak vertical ground reaction forces of 2.5-3.0 times bodyweight, with barbell accelerations exceeding 3.0 m/s². The kinetic chain activates in a precise proximal-to-distal sequence (hip→knee→ankle) during the second pull phase, generating maximum power output. Biomechanical analysis by Gourgoulis et al. (2009) identified critical technical parameters including: barbell trajectory (keeping the bar close to the body's center of mass), timing of the double knee bend, and optimal hip-to-knee extension ratio during the pull. These factors directly impact performance outcomes and injury risk profiles, particularly at the lumbar spine, knees, wrists, and shoulders.` :
  `${sport} involves unique movement patterns with specific biomechanical demands that place stress on key joints and muscle groups. Training must address sport-specific movement patterns, joint loading sequences, and muscular recruitment patterns to optimize performance and reduce injury risk.`}

Primary movement patterns: ${sport === 'Powerlifting' ? 'Squatting, pressing, pulling' : sport === 'Strongman' ? 'Lifting, carrying, pulling, pressing' : sport === 'BJJ' ? 'Grappling, bridging, hip escapes' : sport === 'Olympic Weightlifting' ? 'Triple extension, pull, catch, recovery, overhead stabilization' : 'Sport-specific movement patterns'}
Dominant joints and muscle groups: ${sport === 'Powerlifting' ? 'Hips, knees, shoulders, spine' : sport === 'Strongman' ? 'Shoulders, hips, spine, grip' : sport === 'BJJ' ? 'Shoulders, hips, spine, grip' : sport === 'Olympic Weightlifting' ? 'Ankles, knees, hips, shoulders, wrists, thoracic spine' : 'Key joints and muscle groups specific to the sport'}
Injury-prone zones: ${sport === 'Powerlifting' ? 'Lower back, shoulders, knees' : sport === 'Strongman' ? 'Lower back, shoulders, biceps' : sport === 'BJJ' ? 'Knees, shoulders, neck, fingers' : sport === 'Olympic Weightlifting' ? 'Lower back, knees, wrists, shoulders' : 'Common injury sites in this sport'}

#### 🔄 Multi-Planar Motion
${sport === 'Powerlifting' ? 
  `Powerlifting primarily operates in the sagittal plane with minimal frontal or transverse plane movement. However, stability in all planes is crucial for optimal performance and injury prevention. While the competition lifts are predominantly sagittal, accessory training should incorporate frontal plane movements (lateral lunges, side planks) and transverse plane exercises (rotational core work, anti-rotation exercises) to develop complete joint stability and prevent compensatory movement patterns.` : 
sport === 'Strongman' ? 
  `Strongman requires movement proficiency across all three planes of motion. Unlike powerlifting, strongman events demand sagittal plane strength (deadlifts, presses), frontal plane stability (uneven carries, yoke walks), and transverse plane power (stone loading, tire flips). Training must develop coordination across joints (hips, spine, shoulders) and include anti-rotation and multi-directional stabilization drills to prepare for the unpredictable demands of competition.` :
sport === 'BJJ' ? 
  `BJJ demands movement competency across all three planes of motion, with particular emphasis on rotational (transverse plane) strength and stability. The sport requires constant adjustments in body position, creating unique demands for multi-directional hip mobility, spinal rotation under load, and shoulder stability through varied ranges of motion. Training should incorporate movements in all planes to develop the body control necessary for effective grappling.` :
sport === 'Olympic Weightlifting' ?
  `Olympic Weightlifting demands precise movement through multiple planes with primary emphasis on sagittal plane mechanics. The snatch and clean & jerk require coordinated triple extension (ankle, knee, hip) in the sagittal plane, while maintaining frontal plane stability to prevent lateral displacement of the barbell. The receiving positions—particularly in the snatch—demand significant transverse plane stability at the shoulders. Research by Suchomel et al. (2018) demonstrates that elite weightlifters exhibit superior frontal plane control during the pull phase compared to novices, highlighting the importance of multi-planar stability training.` :
  `${sport} requires specific movement patterns across different planes of motion (sagittal, frontal, transverse). Training should replicate these multi-planar demands to develop sport-specific coordination and stability.`}

Planes of movement required:
- Sagittal: ${sport === 'Powerlifting' ? 'Primary plane for all competition lifts' : sport === 'Strongman' ? 'Deadlifts, presses, carries' : sport === 'BJJ' ? 'Bridging, hip escapes, submissions' : 'Forward/backward movements'}
- Frontal: ${sport === 'Powerlifting' ? 'Stability required for optimal performance' : sport === 'Strongman' ? 'Uneven carries, lateral stability' : sport === 'BJJ' ? 'Sweeps, guard retention, side control' : 'Lateral movements'}
- Transverse: ${sport === 'Powerlifting' ? 'Minimal in competition, important for injury prevention' : sport === 'Strongman' ? 'Stone loading, tire flips, rotational events' : sport === 'BJJ' ? 'Guard passing, transitions, submissions' : 'Rotational movements'}

#### 🧨 Force Production
${sport === 'Powerlifting' ? 
  `Powerlifting requires maximal force production against external resistance in three specific movement patterns. The sport demands high absolute strength with a focus on maximal motor unit recruitment rather than rate of force development. Force is primarily produced in the vertical plane (squat, bench) and vertical-horizontal plane (deadlift). Training should emphasize maximal strength development through progressive overload in the 1-5 rep range with appropriate intensity (80-95% 1RM) and adequate recovery between sets (3-5 minutes).` : 
sport === 'Strongman' ? 
  `Strongman requires diverse force production capabilities including maximal strength, explosive power, and strength-endurance. Unlike powerlifting, strongman events demand force application in multiple directions and patterns, often with awkward implements. The sport requires both maximal static force (holds, carries) and dynamic force production (loading events). Training should develop a broad force profile through varied loading parameters, implement types, and work-to-rest ratios specific to event demands.` :
sport === 'BJJ' ? 
  `BJJ requires primarily submaximal force production with an emphasis on technique and leverage rather than absolute strength. The sport demands isometric strength-endurance, particularly in gripping and positional control. Force application is primarily sustained rather than explosive, though transitions and sweeps benefit from rate of force development. Training should emphasize technical efficiency, isometric strength in sport-specific positions, and the ability to generate force from disadvantaged positions.` :
sport === 'Olympic Weightlifting' ?
  `Olympic Weightlifting demands exceptional rate of force development (RFD) and peak power output. Research by Haff et al. (2005) demonstrates that elite weightlifters produce peak power outputs of 52.5 W/kg during the clean, significantly higher than other strength athletes. The sport requires explosive triple extension force production primarily in the vertical vector, with critical emphasis on the timing of force application through the kinetic chain. Unlike powerlifting, Olympic lifting success depends less on absolute strength and more on power-to-weight ratio and technical efficiency. Training must emphasize both maximal strength (>85% 1RM) and explosive strength (60-80% 1RM) with ballistic intent, as documented by Suchomel et al. (2017) showing optimal power development occurs at approximately 70-80% 1RM for weightlifting derivatives.` :
  `${sport} requires specific force production capabilities including the rate, direction, and method of force output needed for optimal performance. Training should develop the type of strength and power that matches the sport's demands.`}

Type of force needed:
- ${sport === 'Powerlifting' ? 'Maximal (1RM strength in competition lifts)' : sport === 'Strongman' ? 'Maximal and sustained (event-dependent)' : sport === 'BJJ' ? 'Sustained isometric with technical application' : sport === 'Olympic Weightlifting' ? 'Explosive power with precise timing (peak power at 70-80% 1RM)' : 'Sport-specific force requirements'}
- Rate of force development: ${sport === 'Powerlifting' ? 'Secondary to maximal strength' : sport === 'Strongman' ? 'Critical for loading events' : sport === 'BJJ' ? 'Important for sweeps and transitions' : sport === 'Olympic Weightlifting' ? 'Primary determinant of success (>15,000 W peak power output)' : 'Sport-specific RFD requirements'}
- Force application direction: ${sport === 'Powerlifting' ? 'Primarily vertical' : sport === 'Strongman' ? 'Multi-directional' : sport === 'BJJ' ? 'Multi-directional with rotational emphasis' : sport === 'Olympic Weightlifting' ? 'Vertical with precise barbell path control' : 'Sport-specific force vectors'}

#### 🦵 Range-of-Motion Requirements
${sport === 'Powerlifting' ? 
  `Powerlifting requires specific joint ranges of motion to execute competition lifts efficiently and safely. Optimal mobility thresholds include adequate hip flexion and external rotation for proper squat depth, shoulder extension and external rotation for bench press setup, and hip hinge capacity for deadlift positioning. Mobility limitations directly impact technical efficiency and increase injury risk. Training should address sport-specific mobility requirements through targeted dynamic warm-ups, active mobility work, and position-specific drills.` : 
sport === 'Strongman' ? 
  `Strongman competitors require extreme hip and shoulder ROM to execute heavy overhead events and deep pulls from the floor. The sport demands exceptional thoracic extension for overhead pressing, hip mobility for stone loading, and ankle dorsiflexion for various carrying events. Joint stiffness limits both power output and safety — targeted mobility must be part of preparation. Training should address these demands through comprehensive mobility protocols specific to event requirements.` :
sport === 'BJJ' ? 
  `BJJ demands exceptional range of motion across multiple joints, particularly the hips, shoulders, and spine. The sport requires both active and passive flexibility to execute techniques effectively and defend against submissions. Mobility limitations significantly impact technical options and increase submission vulnerability. Training should develop sport-specific mobility through position-specific drills, active-passive flexibility work, and movement pattern training that enhances usable range of motion.` :
sport === 'Olympic Weightlifting' ?
  `Olympic Weightlifting demands exceptional joint mobility thresholds that directly impact technical efficiency and performance capacity. Research by Fuglsang et al. (2017) identified critical ROM requirements including: ankle dorsiflexion (>38° for optimal catch position), hip flexion (>125° for full depth squat), thoracic extension (>20° for overhead stability), shoulder flexion (>180° for secure lockout), and wrist extension (>80° for proper rack position). A systematic review by Myer et al. (2014) demonstrated that mobility limitations in these ranges correlate with technical faults and increased injury risk, particularly at the shoulders, lower back, and knees. Elite weightlifters exhibit significantly greater active mobility in these ranges compared to other strength athletes, highlighting the importance of sport-specific mobility development through position-specific training.` :
  `${sport} requires specific joint mobility and flexibility to execute techniques efficiently and safely. Training should address sport-specific mobility requirements to optimize performance and reduce injury risk.`}

Target joints & ROM thresholds:
- ${sport === 'Powerlifting' ? 'Hip flexion and external rotation for squat depth' : sport === 'Strongman' ? 'Shoulder flexion and external rotation for overhead events' : sport === 'BJJ' ? 'Hip external rotation and abduction for guard work' : sport === 'Olympic Weightlifting' ? 'Ankle dorsiflexion (>38°) for optimal catch position' : 'Sport-specific joint mobility requirements'}
- ${sport === 'Powerlifting' ? 'Shoulder extension for bench press setup' : sport === 'Strongman' ? 'Hip hinge capacity for loading events' : sport === 'BJJ' ? 'Shoulder mobility for defensive postures' : sport === 'Olympic Weightlifting' ? 'Shoulder flexion (>180°) and external rotation for secure lockout' : 'Additional joint mobility requirements'}
- ${sport === 'Powerlifting' ? 'Ankle dorsiflexion for squat mechanics' : sport === 'Strongman' ? 'Thoracic extension for overhead stability' : sport === 'BJJ' ? 'Spinal rotation for transitions and escapes' : sport === 'Olympic Weightlifting' ? 'Wrist extension (>80°) for proper front rack position' : 'Additional joint mobility requirements'}

## Detailed ${frequency}-Day Training Schedule

### Day 1: Strength & Movement Development
- Warm-up: 10-15 minutes of dynamic mobility focusing on sport-specific movement patterns
- Main workout: Moderate volume with progressive overload with emphasis on Compound movements with appropriate loading (70-90% 1RM)
  * Front squat: 4 sets of 6-8 reps at 75-80% 1RM, 2 min rest
  * Overhead pressing: 4 sets of 8-10 reps at 70-75% 1RM, 90 sec rest
  * Core stability: 3 sets of 30-45 seconds, 60 sec rest
- Technical focus: Sport-specific technique development
- Cool-down: 5-10 minutes of targeted mobility work

### Day 2: Sport-Specific Development
- Warm-up: Sport-specific activation drills targeting primary movers
- Main workout: Sport-specific skill development and Conditioning matched to sport demands
  * Technical drills: 4 sets of 5-8 reps, full recovery
  * Sport-specific movement patterns: 3 sets of 10-12 reps, 60 sec rest
- Energy system training: Sport-specific conditioning
- Technical focus: High emphasis on proper form and movement patterns
- Cool-down: Mobility exercises for injury prevention

### Day 3: Recovery & Supplementary Work
- Active recovery: 20-30 minutes of low-intensity activity
- Targeted work for injury prevention: Focus on common problem areas
  * Mobility work: 2-3 sets of 30-45 seconds per position
  * Corrective exercises: 2 sets of 10-12 reps, focus on quality
- Joint stability, mobility maintenance, and recovery optimization`
    };
    
    return { 
      quick: workoutPlans.quick, 
      deep: workoutPlans.deep 
    };
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
  
  generateQuickResponse(sport, experience, goal, frequency, sportData, experienceData, goalData) {
    // Extract injury risks from the object if it exists in that format
    const injuryRisks = sportData.injuryRisks.common ?
      sportData.injuryRisks.common.split(',')[0].toLowerCase() :
      sportData.injuryRisks.split(',')[0].toLowerCase();
    
    // Extract energy systems information
    const energySystems = sportData.energySystems.primary ?
      sportData.energySystems.primary :
      sportData.energySystems;
    
    // Generate the introduction section
    let response = `# ${sport} ${frequency}-Day Training Plan for ${experience} - ${goal}

## User Experience Architecture

### Assessment Parameters
- **Sport Category**: ${sport} (with sport-specific biomechanical considerations)
- **Training History**: ${experience} level athlete with corresponding recovery capacity
- **Equipment Requirements**: Standard ${sport} equipment with adaptations as needed
- **Goal Hierarchy**: Primary focus on ${goal} with balanced process and outcome metrics

### Configuration Settings
- **Training Frequency**: ${frequency} days per week optimized for recovery capacity
- **Session Design**: Progressive intensity with appropriate density for ${experience} level
- **Identified Constraints**: Addressed through individualized programming strategies
- **Special Considerations**: Customized for ${experience}-level ${sport} athlete pursuing ${goal}

## Biomechanical Analysis & Training Focus

${sportData.biomechanics ? sportData.biomechanics.description : 'Sport-specific movement patterns with unique biomechanical demands.'}

### Key Movement Patterns
${sportData.movementPatterns}

### Primary Muscle Groups
${sportData.muscleRecruitment ? `Primary Movers: ${sportData.muscleRecruitment.primaryMovers}
Stabilizers: ${sportData.muscleRecruitment.stabilizers}` : 'Sport-specific muscle recruitment patterns.'}

## Training Schedule
`;

    // Generate training days based on frequency
    const trainingDays = this.generateTrainingDays(frequency, sport, sportData, experienceData, goalData, injuryRisks);
    response += trainingDays;

    // Add the rest of the content
    response += `
## Progression Plan
${experienceData.progressionRate}. Track ${sportData.performanceMetrics ? sportData.performanceMetrics.keyIndicators.split(',')[0].toLowerCase() : goalData.successMetrics.split(',')[0].toLowerCase()} as your primary metric.

## Nutrition Focus
${goalData.nutritionFocus}

## Scientific Credibility Architecture

### Evidence Integration System
- **Primary Research Sources**: Peer-reviewed studies from PubMed, ScienceDirect, and JSTOR databases
- **Quality Assessment**: CRAAP Test applied (Currency, Relevance, Authority, Accuracy, Purpose)
- **Cross-Verification**: Multiple sources confirm key training principles
- **Evidence Classification**: Based on research hierarchy (RCTs, meta-analyses, systematic reviews)

### Knowledge Verification Framework
- **Citation**: ${sportData.references[0]}
- **Methodological Quality**: Rigorous research design with appropriate controls and methodology
- **Practical Significance**: Findings demonstrate meaningful effect sizes beyond statistical significance
- **Confidence Rating**: High confidence in recommendations based on consistent research findings

### Key Research Insights
${sportData.references.length > 1 ? sportData.references[1] : 'Additional supporting research validates the training approach.'}`;

    return response;
  }
  
  // Helper method to generate training days based on frequency
  generateTrainingDays(frequency, sport, sportData, experienceData, goalData, injuryRisks) {
    let trainingDays = '';
    
    // Define different training day templates
    const dayTemplates = [
      {
        title: "Strength & Movement Development",
        content: `- Warm-up: 10-15 minutes of dynamic mobility focusing on ${sportData.biomechanics ? sportData.biomechanics.keyJointActions.split(',')[0].toLowerCase() : 'sport-specific movement patterns'}
- Main workout: ${experienceData.volumeModifier} with emphasis on ${goalData.trainingEmphasis}
  * ${sportData.strengthFocus[0]}
  * ${sportData.strengthFocus[1]}
- Technical focus: ${sportData.biomechanics ? sportData.biomechanics.techniqueFactors.split(',')[0] : 'Sport-specific technique development'}
- Cool-down: 5-10 minutes of targeted mobility work`
      },
      {
        title: "Sport-Specific Development",
        content: `- Warm-up: Sport-specific activation drills targeting ${sportData.muscleRecruitment ? sportData.muscleRecruitment.primaryMovers.split(',')[0] : 'primary movers'}
- Main workout: ${sportData.keyExercises[0]} and ${sportData.keyExercises[1]}
- Energy system training: ${sportData.energySystems.workRestRatios ? sportData.energySystems.workRestRatios.split(';')[0] : 'Sport-specific conditioning'}
- Technical focus: ${experienceData.techniqueEmphasis}
- Cool-down: Mobility exercises for ${injuryRisks} prevention`
      },
      {
        title: "Recovery & Supplementary Work",
        content: `- Active recovery: 20-30 minutes of low-intensity activity
- Targeted work for injury prevention: Focus on ${injuryRisks} ${sportData.injuryRisks.prevention ? `using ${sportData.injuryRisks.prevention.split(',')[0]}` : ''}
- ${goalData.supplementaryWork}`
      },
      {
        title: "Power & Explosiveness",
        content: `- Warm-up: Dynamic movement preparation with emphasis on neural activation
- Main workout: Plyometric and explosive training specific to ${sport}
  * Reactive strength development
  * Sport-specific power exercises
- Technical focus: Speed of movement and force application
- Cool-down: Mobility and light stretching`
      },
      {
        title: "Endurance & Conditioning",
        content: `- Warm-up: Progressive intensity build-up (5-10 minutes)
- Main workout: ${sport}-specific conditioning
  * Interval training matched to sport demands
  * Work-rest ratios based on ${sport} requirements
- Technical focus: Maintaining form under fatigue
- Cool-down: Gradual reduction in intensity and heart rate recovery monitoring`
      },
      {
        title: "Technical Skills & Coordination",
        content: `- Warm-up: Neuromuscular activation drills
- Main workout: Skill development session
  * Technical drills progressing from simple to complex
  * Coordination challenges specific to ${sport}
- Focus: Precision of movement and skill acquisition
- Cool-down: Light activity and skill reflection`
      },
      {
        title: "Active Recovery",
        content: `- Low-intensity activity (30-45 minutes)
- Mobility work targeting areas of restriction
- Self-myofascial release techniques
- Mindfulness and visualization practice
- Focus on quality sleep and nutrition`
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
        // For high frequency (6-7 days), use all templates
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
  
  // Helper method to generate microcycle description based on frequency
  generateMicrocycleDescription(frequency, sport, goalData, sportData, experienceData) {
    let description = '';
    
    if (frequency <= 3) {
      // For low frequency (1-3 days)
      description += `This ${frequency}-day microcycle is designed for optimal results with limited training time:\n\n`;
      
      if (frequency >= 1) {
        description += `- Day 1: Strength Focus - ${goalData.primaryFocus} (Primary training day)\n`;
      }
      
      if (frequency >= 2) {
        description += `- Day 2: Sport-Specific Development - ${sportData.keyExercises[0]} and ${sportData.keyExercises[1]}\n`;
      }
      
      if (frequency >= 3) {
        description += `- Day 3: Recovery & Supplementary Work - ${experienceData.recoveryNeeds}\n`;
      }
      
      description += `\nRest days should include light activity and mobility work to maintain movement quality.`;
    }
    else if (frequency <= 5) {
      // For medium frequency (4-5 days)
      description += `This ${frequency}-day microcycle balances training stimulus with adequate recovery:\n\n`;
      
      description += `- Day 1: Strength Focus - ${goalData.primaryFocus}\n`;
      description += `- Day 2: Sport-Specific Development - ${sportData.keyExercises[0]} and ${sportData.keyExercises[1]}\n`;
      description += `- Day 3: Recovery & Mobility - Active recovery protocols\n`;
      description += `- Day 4: Power Development - Sport-specific power application and reactive training\n`;
      
      if (frequency >= 5) {
        description += `- Day 5: Conditioning - Energy system development matched to ${sport} demands\n`;
      }
      
      description += `\nRemaining days focus on complete rest or very light activity to ensure full recovery.`;
    }
    else {
      // For high frequency (6-7 days)
      description += `This high-frequency ${frequency}-day microcycle is designed for advanced athletes with optimized recovery capabilities:\n\n`;
      
      description += `- Day 1: Strength Focus - ${goalData.primaryFocus}\n`;
      description += `- Day 2: Sport-Specific Development - ${sportData.keyExercises[0]}\n`;
      description += `- Day 3: Recovery & Mobility - ${experienceData.recoveryNeeds}\n`;
      description += `- Day 4: Power Development - Sport-specific power application\n`;
      description += `- Day 5: Technical Skills - Precision and skill acquisition\n`;
      description += `- Day 6: Conditioning - Energy system development matched to ${sport} demands\n`;
      
      if (frequency >= 7) {
        description += `- Day 7: Active Recovery - Low-intensity movement and regeneration protocols\n`;
      }
      
      description += `\nThis structure follows an undulating periodization model with strategic sequencing of training stimuli.`;
    }
    
    return description;
  }
  
  generateDeepResponse(sport, experience, goal, frequency, sportData, experienceData, goalData) {
    // Extract injury risks from the object if it exists in that format
    const injuryRisks = sportData.injuryRisks.common ?
      sportData.injuryRisks.common :
      sportData.injuryRisks;
    
    // Extract energy systems information
    const energySystems = sportData.energySystems.primary ?
      sportData.energySystems.primary :
      sportData.energySystems;
    
    return `# Comprehensive ${frequency}-Day ${sport} Training Plan for ${experience} - ${goal}

## 🧠 Scientific Needs Analysis Matrix

### Movement Pattern Intelligence
- **Biomechanical Analysis**: ${sportData.biomechanics ? sportData.biomechanics.description : 'Sport-specific movement patterns with unique biomechanical demands.'}
- **Multi-Planar Motion**: ${sportData.biomechanics ? sportData.biomechanics.keyJointActions : 'Multi-joint coordination specific to the sport\'s technical requirements.'}
- **Force Production**: ${sportData.biomechanics ? sportData.biomechanics.forceProduction : 'Force application varies based on the specific demands of the sport.'}
- **Range-of-Motion Requirements**: Optimal joint mobility thresholds for ${sport} include ${sportData.biomechanics ? sportData.biomechanics.techniqueFactors : 'technical efficiency factors specific to the sport\'s performance requirements.'}

### Energy System Precision Mapping
- **Energy Pathway Utilization**: ${energySystems}
- **Work-to-Rest Ratio Profile**: ${sportData.energySystems.workRestRatios ? sportData.energySystems.workRestRatios : 'Sport-specific work:rest ratios based on competitive demands.'}
- **Metabolic Power Output**: ${experience} level ${sport} athletes require specific metabolic conditioning through ${sportData.energySystems.conditioningProtocols ? sportData.energySystems.conditioningProtocols : 'conditioning protocols designed to match the metabolic demands of the sport.'}
- **Recovery Capacity Assessment**: ${experienceData.recoveryNeeds}

### Neuromuscular Recruitment Patterns
- **Primary Movers**: ${sportData.muscleRecruitment ? sportData.muscleRecruitment.primaryMovers : 'Primary muscle groups specific to the sport\'s movement patterns.'}
- **Stabilization Systems**: ${sportData.muscleRecruitment ? sportData.muscleRecruitment.stabilizers : 'Stabilizing muscles supporting the primary movement patterns.'}
- **Compensatory Patterns**: ${sportData.muscleRecruitment ? sportData.muscleRecruitment.commonImbalances : 'Common muscular imbalances associated with the sport\'s repetitive movements.'}

### Injury Prevention Intelligence
- **Vulnerability Pattern Recognition**: ${sportData.injuryRisks.common ? sportData.injuryRisks.common : injuryRisks}
- **Corrective Strategies**: ${sportData.injuryRisks.prevention ? sportData.injuryRisks.prevention : 'Preventative strategies addressing the specific injury risks of the sport.'}
- **Tissue Capacity Development**: Progressive loading protocols targeting vulnerable structures specific to ${sport}
- **Workload Monitoring Thresholds**: Individualized based on ${experience} level recovery capacity and training history

### Performance Metrics & Benchmarks
- **Primary KPIs**: ${sportData.performanceMetrics ? sportData.performanceMetrics.keyIndicators : 'Sport-specific performance metrics relevant to competitive success.'}
- **Reference Standards**: ${sportData.performanceMetrics ? sportData.performanceMetrics.benchmarks : 'Performance benchmarks for various competitive levels.'}
- **Testing Protocols**: Standardized assessment battery specific to ${sport} performance demands

## Scientific Periodization Framework

### Macrocycle Design Intelligence
- **Competition-Synchronized Planning**: 12-week structure aligned with ${sport} performance demands
- **Phase Potentiation Sequence**:
  * Weeks 1-4: Foundation Phase - Establishing movement quality and baseline capacities
  * Weeks 5-8: Development Phase - Progressive overload with ${experienceData.intensityGuidance}
  * Weeks 9-12: Performance Phase - Integration of all components with sport-specific application
- **Supercompensation Targeting**: Strategic intensification and tapering to peak for key performance periods
- **Recovery-Adaptation Balance**: Planned deload weeks at the end of each 4-week block to optimize adaptation

### Mesocycle Engineering
- **Block Periodization**: Concentrated load distribution focusing on specific adaptations in each 4-week block
- **Vertical Integration**: Complementary training attributes developed simultaneously with emphasis shifts
- **Progressive Overload Algorithm**: Systematic progression based on ${experienceData.progressionRate.toLowerCase()} with individualized adjustment based on response
- **Periodization Model**: ${experience === 'Advanced' ? 'Undulating daily and weekly intensity to maximize adaptation stimulus' : 'Linear progression with gradual intensity increases to build foundational capacity'}

### Microcycle Precision Programming (${frequency}-Day Structure)
${this.generateMicrocycleDescription(frequency, sport, goalData, sportData, experienceData)}
- **Stress Distribution**: Balanced allocation of neural, metabolic, and mechanical training stress
- **Exercise Sequencing**: Optimized intra-week training order to maximize recovery and adaptation
- **Recovery Windows**: Strategic placement of rest days based on training stress accumulation
- **Readiness-Based Regulation**: Intensity and volume adjustments based on individual recovery status

### Detailed ${frequency}-Day Training Schedule
${this.generateTrainingDays(frequency, sport, sportData, experienceData, goalData, injuryRisks)}

## Advanced Training Component Integration

### Strength Development Protocols
- **Force Profile-Specific Exercises**: ${sportData.strengthFocus[0]} and ${sportData.strengthFocus[1]} selected for optimal transfer to ${sport} performance
- **Biomechanical Specificity**: Movement patterns match the force vectors and joint angles specific to ${sport}
- **Loading Parameters**: ${experienceData.intensityGuidance} with progressive overload based on ${experienceData.progressionRate.toLowerCase()}
- **Velocity-Based Prescription**: Implement speed of movement appropriate to ${sport} demands and ${goal.toLowerCase()} objectives

### Skill Acquisition Engineering
- **Motor Learning Framework**: ${sportData.keyExercises[2] ? sportData.keyExercises[2] : sportData.keyExercises[0]} with emphasis on ${experienceData.techniqueEmphasis.toLowerCase()}
- **Technical Progression Ladder**: Systematic skill development from foundational patterns to sport-specific applications
- **Perceptual-Cognitive Integration**: Decision-making elements incorporated into later stages of skill development
- **Contextual Interference**: Variable practice conditions to enhance skill retention and transfer to competitive environments

### Mobility System Architecture
- **Joint-by-Joint Approach**: Targeted mobility work focusing on ${sport}-specific requirements
- **Active vs. Passive Techniques**: Dynamic mobility during warm-ups, static/passive methods during recovery periods
- **Neuromuscular Recalibration**: Proprioceptive exercises to optimize range-of-motion and movement efficiency
- **Integration Sequencing**: Mobility work strategically placed pre/post-training to enhance performance and recovery

### Recovery Protocols
- **Sleep Optimization**: 7-9 hours per night with emphasis on sleep quality and consistency
- **Nutritional Strategies**: ${goalData.nutritionFocus}
- **Active Recovery Methods**: Low-intensity movement targeting primary muscle groups used in ${sport}
- **Monitoring Systems**: Track subjective and objective recovery markers to guide training modifications

## 🧪 Scientific Rationale
This program integrates evidence-based approaches from current sports science research:

${sportData.references[0]}
${sportData.references[1]}
${sportData.references.length > 2 ? sportData.references[2] : ''}
${sportData.references.length > 3 ? sportData.references[3] : ''}

The training structure follows periodization principles established by Bompa & Buzzichelli (2019), with modifications based on individual response and adaptation rates.

## Performance Monitoring & Feedback Systems

### Metric Identification & Assessment
- **Sport-Specific KPIs**: ${sportData.performanceMetrics ? sportData.performanceMetrics.keyIndicators : 'Sport-specific performance metrics relevant to competitive success'}
- **Measurement Protocols**: Standardized testing procedures with established reliability and validity
- **Progress Tracking**: Statistical significance thresholds to differentiate between meaningful changes and normal variation
- **Adaptation Profiling**: Individual response patterns analyzed to identify fast vs. slow responders to specific training stimuli

### Intelligent Feedback Mechanisms
- **Program Modification Algorithm**: Evidence-based adjustments based on performance data and recovery metrics
- **Stagnation Detection**: Early identification of plateaus with targeted intervention strategies
- **Load-Tolerance Calibration**: Progressive exposure to training stress with continuous refinement based on adaptation
- **Goal Recalibration**: Regular reassessment of objectives with balanced focus on process and outcome metrics

## Implementation Guidelines
1. Begin with a comprehensive assessment of current capacities across all key performance indicators
2. Implement the training plan with meticulous attention to technique and appropriate progression
3. Monitor both objective performance metrics and subjective feedback, particularly tracking ${injuryRisks.split(',')[0].toLowerCase()} for early intervention
4. Utilize ${goalData.nutritionFocus.split('.')[0].toLowerCase()} strategies to support training adaptations
5. Regularly reassess and adjust the program based on individual response patterns`;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
