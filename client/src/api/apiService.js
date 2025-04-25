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
    const quick = `# ${sport} Training Plan for ${experience} - ${goal}

## Training Schedule

### Day 1: Strength Focus
- Warm-up: 10 minutes of light cardio
- Main workout: 3 sets of 10 reps for major muscle groups
- Cool-down: 5 minutes of stretching

### Day 2: Skill Development
- Warm-up: Sport-specific drills for 15 minutes
- Main workout: Technical practice for 30-45 minutes
- Cool-down: Mobility exercises for 10 minutes

### Day 3: Recovery
- Active recovery: 20-30 minutes of low-intensity activity
- Flexibility work: 15-20 minutes of stretching
- Mental training: 10 minutes of visualization

## Progression Plan
Increase intensity by 5-10% every 2 weeks as you adapt to the training load.

## Nutrition Tips
Stay hydrated and ensure adequate protein intake to support recovery.`;

    const deep = `# Comprehensive ${sport} Training Plan for ${experience} - ${goal}

## Needs Analysis

### Movement Patterns
The primary movement patterns in ${sport} include pushing, pulling, rotation, and lower body power development.

### Energy Systems
${sport} primarily utilizes the ATP-CP system for explosive movements, with significant aerobic contribution for overall endurance.

### Injury Risk Assessment
Common injury sites include shoulders, lower back, and knees. Preventative exercises are included in this plan.

## Periodization Framework

### Macrocycle (12 weeks)
- Weeks 1-4: Foundation Phase
- Weeks 5-8: Development Phase
- Weeks 9-12: Performance Phase

### Mesocycle Structure
Each 4-week block progressively increases in intensity while maintaining appropriate volume.

### Microcycle Organization
- Day 1: Strength Focus
- Day 2: Skill Development
- Day 3: Recovery
- Day 4: Power Development
- Day 5: Sport-Specific Conditioning
- Day 6-7: Active Recovery

## Training Components

### Strength Development
- Compound movements: 4 sets of 6-8 reps at 75-85% 1RM
- Accessory exercises: 3 sets of 10-12 reps at 65-75% 1RM
- Progressive overload: Increase weight by 2.5-5% when all reps can be completed with proper form

### Skill Acquisition
- Technical drills: 15-20 minutes daily
- Video analysis: Weekly review of technique
- Deliberate practice: Focus on weak areas identified through assessment

### Recovery Protocols
- Sleep: 7-9 hours per night
- Nutrition: Emphasis on post-workout protein (1.6-2.2g/kg/day)
- Active recovery: Low-intensity movement on rest days

## Scientific Basis
This program is based on principles of progressive overload [Kraemer & Ratamess, 2004], periodization [Issurin, 2010], and sport-specific adaptation [Bompa & Buzzichelli, 2019].

## Implementation Guidelines
Track progress using the provided training log and adjust based on recovery markers and performance metrics.`;

    return { quick, deep };
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
