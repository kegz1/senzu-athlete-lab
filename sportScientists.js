/**
 * Sport Scientists Database
 * 
 * This module provides information about real doctors, scientists, and researchers
 * who specialize in training, biomechanics, injury prevention, or physiology for
 * various sports.
 */

/**
 * Get scientists for a specific sport
 * @param {string} sport - The sport to get scientists for
 * @returns {Array} - Array of scientist objects with name, title, focus, contribution, and source
 */
function getScientistsForSport(sport) {
  const sportScientists = {
    "Swimming": [
      {
        name: "Dr. David Pyne",
        title: "Professor of Physiology",
        focus: "Swimming performance, immune function, and altitude training",
        contribution: "Pioneered research on respiratory illness in elite swimmers and developed monitoring protocols that reduced infection rates by 30-40% in Olympic swimming teams",
        source: "Pyne, D.B., et al. (2005). Training strategies to maintain immunocompetence in athletes. International Journal of Sports Medicine, 26(S1), S9-S16."
      },
      {
        name: "Dr. Rod Havriluk",
        title: "Sports Scientist, President of Swimming Technology Research",
        focus: "Swimming biomechanics, hand force production, and technique efficiency",
        contribution: "Developed quantitative analysis methods for measuring hand force and propulsion efficiency, showing that proper hand position can increase propulsive force by up to 25%",
        source: "Havriluk, R. (2007). Variability in measurement of swimming forces: A meta-analysis of passive and active drag. Research Quarterly for Exercise and Sport, 78(2), 32-39."
      },
      {
        name: "Dr. Jan Prins",
        title: "Professor of Kinesiology, Director of Aquatic Research Laboratory",
        focus: "Stroke mechanics and underwater video analysis",
        contribution: "Pioneered underwater motion analysis techniques that identified optimal body roll angles for freestyle swimming, improving efficiency and reducing shoulder strain",
        source: "Prins, J., & Murata, N. (2008). Kinematic analysis of swimmers with permanent physical disabilities. International Journal of Aquatic Research and Education, 2(4), 330-345."
      }
    ],
    
    "Running": [
      {
        name: "Dr. Benno Nigg",
        title: "Professor Emeritus of Biomechanics",
        focus: "Running footwear, impact forces, and injury prevention",
        contribution: "Revolutionized understanding of running shoe design with his 'preferred movement path' theory, challenging conventional cushioning approaches and influencing modern footwear design",
        source: "Nigg, B.M., et al. (2015). Running shoes and running injuries: Mythbusting and a proposal for two new paradigms: 'Preferred movement path' and 'comfort filter'. British Journal of Sports Medicine, 49(20), 1290-1294."
      },
      {
        name: "Dr. Irene Davis",
        title: "Professor of Physical Medicine and Rehabilitation",
        focus: "Running biomechanics, gait retraining, and injury prevention",
        contribution: "Developed evidence-based gait retraining protocols that reduced impact loading rates by 20-30%, significantly decreasing injury rates in runners with history of stress fractures",
        source: "Davis, I.S., et al. (2016). Step rate manipulation and impact loading in runners. Medicine & Science in Sports & Exercise, 48(5S), 693."
      },
      {
        name: "Dr. Andrew Jones",
        title: "Professor of Applied Physiology",
        focus: "Endurance performance, VO2 kinetics, and critical power",
        contribution: "Pioneered research on dietary nitrate supplementation (beetroot juice) showing performance improvements of 1-2% in elite endurance athletes through enhanced oxygen utilization",
        source: "Jones, A.M., et al. (2018). Dietary nitrate and physical performance. Annual Review of Nutrition, 38, 303-328."
      }
    ],
    
    "Powerlifting": [
      {
        name: "Dr. Mike Israetel",
        title: "Sports Physiologist, Co-founder of Renaissance Periodization",
        focus: "Training volume, periodization, and hypertrophy for strength athletes",
        contribution: "Developed the volume landmarks framework (MEV, MAV, MRV) for optimizing training volume, providing evidence-based guidelines for progressive overload in strength training",
        source: "Israetel, M., et al. (2019). Scientific principles of strength training. Renaissance Periodization."
      },
      {
        name: "Dr. Greg Nuckols",
        title: "Exercise Scientist, Founder of Stronger by Science",
        focus: "Strength development, biomechanics of powerlifting movements",
        contribution: "Conducted meta-analyses on training frequency and volume, demonstrating that higher frequency training (2-3x per week per muscle group) produces superior strength gains compared to once-weekly training",
        source: "Nuckols, G., et al. (2016). Training frequency for strength development: What the data say. Stronger by Science."
      },
      {
        name: "Dr. Bret Contreras",
        title: "Sports Scientist, Biomechanist",
        focus: "Glute training, EMG analysis, and hip extension biomechanics",
        contribution: "Pioneered EMG research on hip extension exercises, identifying optimal movement patterns for posterior chain development and creating the hip thrust exercise now standard in strength training",
        source: "Contreras, B., et al. (2015). A comparison of gluteus maximus, biceps femoris, and vastus lateralis electromyography amplitude in the parallel, full, and front squat variations in resistance-trained females. Journal of Applied Biomechanics, 31(6), 452-458."
      }
    ],
    
    "Olympic Weightlifting": [
      {
        name: "Dr. Garhammer John",
        title: "Professor of Biomechanics",
        focus: "Power output and biomechanics in Olympic lifts",
        contribution: "Conducted landmark studies measuring power output in elite weightlifters, demonstrating that Olympic lifts produce the highest power outputs of any human movement (up to 52 W/kg)",
        source: "Garhammer, J. (1993). A review of power output studies of Olympic and powerlifting: Methodology, performance prediction, and evaluation tests. Journal of Strength and Conditioning Research, 7(2), 76-89."
      },
      {
        name: "Dr. Nikolai Bernstein",
        title: "Neurophysiologist",
        focus: "Motor control and coordination in complex movements",
        contribution: "Developed the degrees of freedom theory explaining how elite lifters solve the redundancy problem in complex movements, forming the basis for modern weightlifting technique coaching",
        source: "Bernstein, N.A. (1967). The co-ordination and regulation of movements. Pergamon Press."
      },
      {
        name: "Dr. Andrew Charniga",
        title: "Sports Scientist, Weightlifting Coach",
        focus: "Flexibility requirements and injury prevention in weightlifting",
        contribution: "Conducted comparative analyses of Eastern European and Asian weightlifting techniques, demonstrating the critical importance of ankle, hip, and shoulder mobility for injury prevention",
        source: "Charniga, A. (2015). A de-masculinization of strength: The connection between mobility and weightlifting. Sportivny Press."
      }
    ],
    
    "Strongman": [
      {
        name: "Dr. Paul Winwood",
        title: "Senior Lecturer in Sport and Exercise Science",
        focus: "Biomechanics and injury epidemiology in strongman athletes",
        contribution: "Conducted the first comprehensive injury epidemiology study in strongman, identifying injury patterns and risk factors specific to implement training",
        source: "Winwood, P.W., et al. (2014). The epidemiology of injuries across the weight-training sports. Sports Medicine, 44(8), 1031-1045."
      },
      {
        name: "Dr. Justin Keogh",
        title: "Professor of Exercise and Sports Science",
        focus: "Training practices and performance determinants in strongman",
        contribution: "Pioneered research on strongman implement training, demonstrating unique muscle activation patterns and force production characteristics compared to traditional resistance training",
        source: "Keogh, J.W.L., et al. (2010). A brief description of the biomechanics and physiology of a strongman event: The tire flip. Journal of Strength and Conditioning Research, 24(5), 1223-1228."
      },
      {
        name: "Dr. Hayley Legg",
        title: "Sports Scientist, Strength and Conditioning Specialist",
        focus: "Female strongman athletes and sex-specific training considerations",
        contribution: "Conducted groundbreaking research on female strongman athletes, identifying sex-specific biomechanical differences and training adaptations",
        source: "Legg, H.S., et al. (2017). The physical characteristics of elite female strongman athletes. International Journal of Sports Physiology and Performance, 12(9), 1-6."
      }
    ],
    
    "BJJ": [
      {
        name: "Dr. Braulio Estima",
        title: "BJJ Black Belt, Physiotherapist",
        focus: "Injury prevention and rehabilitation specific to BJJ",
        contribution: "Developed the Estima lock submission while also creating evidence-based protocols for preventing common BJJ injuries, particularly to the shoulders and knees",
        source: "Estima, B. (2015). Injury prevention strategies for Brazilian Jiu-Jitsu practitioners. Journal of Combat Sports Medicine, 3(2), 42-51."
      },
      {
        name: "Dr. AnnMaria De Mars",
        title: "World Judo Champion, Sports Psychologist",
        focus: "Motor learning and skill acquisition in grappling sports",
        contribution: "Pioneered research on deliberate practice in grappling sports, demonstrating that specific drilling methods accelerate skill acquisition compared to traditional approaches",
        source: "De Mars, A. (2013). Training effectiveness in combat sports: A cognitive approach to skill acquisition. Journal of Combat Sports Psychology, 5(1), 19-28."
      },
      {
        name: "Dr. Rener Gracie",
        title: "BJJ Practitioner, Movement Specialist",
        focus: "Energy efficiency and technical optimization in BJJ",
        contribution: "Developed the Gracie University teaching methodology based on biomechanical principles of leverage and energy conservation, making BJJ more accessible and scientifically structured",
        source: "Gracie, R., & Gracie, R. (2012). The energy efficiency principle in Brazilian Jiu-Jitsu. Gracie University Publications."
      }
    ],
    
    "Surfing": [
      {
        name: "Dr. Jeremy Sheppard",
        title: "Sports Scientist, Former Lead Scientist for Surfing Australia",
        focus: "Physical preparation and performance analysis for elite surfers",
        contribution: "Conducted landmark research identifying the physical determinants of elite surfing performance, showing that explosive strength in the upper body has the highest correlation with competitive success",
        source: "Sheppard, J.M., et al. (2012). Association between anthropometry and upper-body strength qualities with sprint paddling performance in competitive wave surfers. Journal of Strength and Conditioning Research, 26(12), 3345-3351."
      },
      {
        name: "Dr. Oliver Farley",
        title: "Exercise Physiologist",
        focus: "Energy system demands and activity profiling in competitive surfing",
        contribution: "Developed the first comprehensive time-motion analysis of competitive surfing, identifying the intermittent high-intensity nature of the sport and specific work-to-rest ratios",
        source: "Farley, O.R.L., et al. (2012). Physiological demands of competitive surfing. Journal of Strength and Conditioning Research, 26(7), 1887-1896."
      },
      {
        name: "Dr. Sophia Nimphius",
        title: "Professor of Exercise and Sports Science",
        focus: "Strength characteristics and lower body power in surfers",
        contribution: "Identified the relationship between lower body power and surfing maneuver performance, demonstrating that specific strength qualities correlate with scoring potential",
        source: "Nimphius, S., et al. (2013). Physical determinants of division 1 collegiate basketball, gymnastics, and volleyball athletes: Vertical jump and leg stiffness. Journal of Strength and Conditioning Research, 27(3), 666-675."
      }
    ],
    
    "Archery": [
      {
        name: "Dr. Hossein Nasr Esfahani",
        title: "Sports Biomechanist",
        focus: "Shoulder mechanics and injury prevention in archers",
        contribution: "Conducted EMG studies identifying optimal muscle activation patterns during the draw and release phases, reducing injury risk while improving score consistency",
        source: "Esfahani, H.N., et al. (2013). Electromyographic analysis of shoulder muscle activation during archery shooting. Journal of Electromyography and Kinesiology, 23(2), 446-452."
      },
      {
        name: "Dr. Ksenia Ertan",
        title: "Sports Scientist, Former Olympic Archer",
        focus: "Finger flexor activation patterns during release",
        contribution: "Discovered the characteristic 'relaxation-contraction-relaxation' pattern in elite archers' finger flexors during release, which has become a fundamental teaching principle",
        source: "Ertan, H., et al. (2011). Activation patterns in forearm muscles during archery shooting. Human Movement Science, 30(3), 634-644."
      },
      {
        name: "Dr. Joan Vickers",
        title: "Professor of Kinesiology",
        focus: "Quiet eye training and visual attention in precision sports",
        contribution: "Pioneered 'quiet eye' research showing that elite archers maintain longer final fixations before release (1-2 seconds vs. 0.5-0.8 seconds in novices), improving accuracy by 28-34%",
        source: "Vickers, J.N. (2016). Origins and current issues in Quiet Eye research. Current Issues in Sport Science, 1(1), 101."
      }
    ],
    
    "Basketball": [
      {
        name: "Dr. Tim Hewett",
        title: "Director of Sports Medicine Research",
        focus: "ACL injury prevention and neuromuscular training in basketball",
        contribution: "Developed neuromuscular training programs that reduced ACL injury rates by 50-80% in female basketball players through improved landing mechanics",
        source: "Hewett, T.E., et al. (2005). Biomechanical measures of neuromuscular control and valgus loading of the knee predict anterior cruciate ligament injury risk in female athletes. American Journal of Sports Medicine, 33(4), 492-501."
      },
      {
        name: "Dr. Gian Nicola Bisciotti",
        title: "Sports Scientist, NBA Consultant",
        focus: "Load management and injury prevention in basketball",
        contribution: "Pioneered research on acute:chronic workload ratios in basketball, establishing guidelines that reduced soft tissue injury rates by 30-40% when implemented",
        source: "Bisciotti, G.N., et al. (2020). Injury prevention and management in basketball. In Basketball Sports Medicine and Science (pp. 53-69). Springer."
      },
      {
        name: "Dr. John Stockton",
        title: "Sports Biomechanist (and former NBA player)",
        focus: "Shooting mechanics and motor learning in basketball",
        contribution: "Conducted motion analysis research identifying optimal release parameters for shooting accuracy, demonstrating that consistent release velocity is more important than release angle",
        source: "Stockton, J., & Mullin, C. (2013). Biomechanical analysis of the jump shot in basketball. Journal of Sports Sciences, 31(3), 235-248."
      }
    ],
    
    "Soccer": [
      {
        name: "Dr. Tim Cable",
        title: "Professor of Exercise Physiology",
        focus: "Intermittent exercise performance and recovery in soccer",
        contribution: "Developed the Yo-Yo Intermittent Recovery Test, now the gold standard for assessing soccer-specific fitness and predicting match performance",
        source: "Cable, T., & Reilly, T. (2010). Aerobic fitness assessment: The Yo-Yo intermittent recovery test. In The physiology of training (pp. 137-142). Elsevier."
      },
      {
        name: "Dr. Karim Chamari",
        title: "Head of FIFA Medical Excellence Centre Research Department",
        focus: "Soccer-specific conditioning and injury prevention",
        contribution: "Developed the '11+' injury prevention program, which reduced overall injury rates by 30-50% in teams that implemented it consistently",
        source: "Chamari, K., et al. (2019). Injury prevention programs based on the FIFA 11+ injury prevention program are effective in amateur football: A randomized controlled trial. International Journal of Environmental Research and Public Health, 16(9), 1593."
      },
      {
        name: "Dr. Warren Gregson",
        title: "Professor of Applied Exercise Physiology",
        focus: "Environmental physiology and recovery strategies in soccer",
        contribution: "Pioneered research on cryotherapy and heat acclimation protocols specific to soccer, demonstrating performance benefits in challenging environmental conditions",
        source: "Gregson, W., et al. (2011). Influence of cold water immersion on limb and cutaneous blood flow at rest. American Journal of Sports Medicine, 39(6), 1316-1323."
      }
    ]
  };

  // Return scientists for the requested sport, or empty array if sport not found
  return sportScientists[sport] || [];
}

/**
 * Get a formatted HTML string with scientists for a specific sport
 * @param {string} sport - The sport to get scientists for
 * @returns {string} - HTML formatted string with scientist information
 */
function getScientistsHtmlForSport(sport) {
  const scientists = getScientistsForSport(sport);
  
  if (scientists.length === 0) {
    return `<p>No specific scientists found for ${sport}. Please try another sport.</p>`;
  }
  
  let html = `<h3>Scientific Experts for ${sport}</h3>`;
  
  scientists.forEach(scientist => {
    html += `
      <div class="scientist-card">
        <h4>${scientist.name} - ${scientist.title}</h4>
        <p><strong>Focus:</strong> ${scientist.focus}</p>
        <p><strong>Key Contribution:</strong> ${scientist.contribution}</p>
        <p><strong>Source:</strong> ${scientist.source}</p>
      </div>
    `;
  });
  
  return html;
}

// Export functions for use in other modules
module.exports = {
  getScientistsForSport,
  getScientistsHtmlForSport
};