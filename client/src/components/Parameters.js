class Parameters {
  constructor(container) {
    this.container = container;
    
    this.experienceLevels = [
      { id: 'beginner', name: 'Beginner' },
      { id: 'intermediate', name: 'Intermediate' },
      { id: 'advanced', name: 'Advanced' },
      { id: 'elite', name: 'Elite' }
    ];
    
    this.trainingGoals = [
      { id: 'performance', name: 'Performance Improvement' },
      { id: 'endurance', name: 'Endurance Development' },
      { id: 'strength', name: 'Strength Building' },
      { id: 'skill', name: 'Skill Development' },
      { id: 'weight_loss', name: 'Weight Management' },
      { id: 'rehab', name: 'Recovery/Rehabilitation' },
      { id: 'competition', name: 'Competition Preparation' }
    ];
    
    this.equipmentOptions = [
      { id: 'full_gym', name: 'Full Gym Access' },
      { id: 'home_basic', name: 'Basic Home Equipment' },
      { id: 'bodyweight', name: 'Bodyweight Only' },
      { id: 'specialty', name: 'Specialty Equipment' }
    ];
    
    this.experienceSelect = null;
    this.goalSelect = null;
    this.equipmentSelect = null;
    this.frequencySelect = null;
    this.specialConsiderations = null;
  }
  
  render() {
    this.container.innerHTML = '';
    
    // First row: Experience Level and Training Goal
    const row1 = document.createElement('div');
    row1.className = 'form-row';
    
    // Experience Level
    const experienceDiv = document.createElement('div');
    experienceDiv.className = 'form-group';
    
    const experienceLabel = document.createElement('label');
    experienceLabel.textContent = 'Experience Level:';
    experienceLabel.setAttribute('for', 'experience-select');
    
    this.experienceSelect = document.createElement('select');
    this.experienceSelect.id = 'experience-select';
    this.experienceSelect.innerHTML = '<option value="">Select experience level</option>';
    
    this.experienceLevels.forEach(level => {
      const option = document.createElement('option');
      option.value = level.id;
      option.textContent = level.name;
      this.experienceSelect.appendChild(option);
    });
    
    experienceDiv.appendChild(experienceLabel);
    experienceDiv.appendChild(this.experienceSelect);
    
    // Training Goal
    const goalDiv = document.createElement('div');
    goalDiv.className = 'form-group';
    
    const goalLabel = document.createElement('label');
    goalLabel.textContent = 'Primary Training Goal:';
    goalLabel.setAttribute('for', 'goal-select');
    
    this.goalSelect = document.createElement('select');
    this.goalSelect.id = 'goal-select';
    this.goalSelect.innerHTML = '<option value="">Select primary goal</option>';
    
    this.trainingGoals.forEach(goal => {
      const option = document.createElement('option');
      option.value = goal.id;
      option.textContent = goal.name;
      this.goalSelect.appendChild(option);
    });
    
    goalDiv.appendChild(goalLabel);
    goalDiv.appendChild(this.goalSelect);
    
    // Add to first row
    row1.appendChild(experienceDiv);
    row1.appendChild(goalDiv);
    this.container.appendChild(row1);
    
    // Second row: Equipment Available and Training Frequency
    const row2 = document.createElement('div');
    row2.className = 'form-row';
    
    // Equipment Available
    const equipmentDiv = document.createElement('div');
    equipmentDiv.className = 'form-group';
    
    const equipmentLabel = document.createElement('label');
    equipmentLabel.textContent = 'Equipment Available:';
    equipmentLabel.setAttribute('for', 'equipment-select');
    
    this.equipmentSelect = document.createElement('select');
    this.equipmentSelect.id = 'equipment-select';
    this.equipmentSelect.innerHTML = '<option value="">Select equipment</option>';
    
    this.equipmentOptions.forEach(equipment => {
      const option = document.createElement('option');
      option.value = equipment.id;
      option.textContent = equipment.name;
      this.equipmentSelect.appendChild(option);
    });
    
    equipmentDiv.appendChild(equipmentLabel);
    equipmentDiv.appendChild(this.equipmentSelect);
    
    // Training Frequency
    const frequencyDiv = document.createElement('div');
    frequencyDiv.className = 'form-group';
    
    const frequencyLabel = document.createElement('label');
    frequencyLabel.textContent = 'Training Frequency (days per week):';
    frequencyLabel.setAttribute('for', 'frequency-select');
    
    this.frequencySelect = document.createElement('select');
    this.frequencySelect.id = 'frequency-select';
    this.frequencySelect.innerHTML = '<option value="">Select frequency</option>';
    
    for (let i = 1; i <= 7; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      this.frequencySelect.appendChild(option);
    }
    
    frequencyDiv.appendChild(frequencyLabel);
    frequencyDiv.appendChild(this.frequencySelect);
    
    // Add to second row
    row2.appendChild(equipmentDiv);
    row2.appendChild(frequencyDiv);
    this.container.appendChild(row2);
    
    // Special Considerations (full width)
    const considerationsDiv = document.createElement('div');
    considerationsDiv.className = 'form-group';
    
    const considerationsLabel = document.createElement('label');
    considerationsLabel.textContent = 'Special Considerations (optional):';
    considerationsLabel.setAttribute('for', 'considerations-textarea');
    
    this.specialConsiderations = document.createElement('textarea');
    this.specialConsiderations.id = 'considerations-textarea';
    this.specialConsiderations.rows = 3;
    this.specialConsiderations.placeholder = 'Enter any injuries, limitations, or special requirements...';
    
    considerationsDiv.appendChild(considerationsLabel);
    considerationsDiv.appendChild(this.specialConsiderations);
    this.container.appendChild(considerationsDiv);
  }
  
  getParametersData() {
    const experienceValue = this.experienceSelect.value;
    const goalValue = this.goalSelect.value;
    const equipmentValue = this.equipmentSelect.value;
    const frequencyValue = this.frequencySelect.value;
    const considerationsValue = this.specialConsiderations.value;
    
    let experienceLabel = '';
    let goalLabel = '';
    let equipmentLabel = '';
    
    if (experienceValue) {
      const experience = this.experienceLevels.find(e => e.id === experienceValue);
      if (experience) experienceLabel = experience.name;
    }
    
    if (goalValue) {
      const goal = this.trainingGoals.find(g => g.id === goalValue);
      if (goal) goalLabel = goal.name;
    }
    
    if (equipmentValue) {
      const equipment = this.equipmentOptions.find(e => e.id === equipmentValue);
      if (equipment) equipmentLabel = equipment.name;
    }
    
    return {
      experience: experienceValue,
      experienceLabel: experienceLabel,
      goal: goalValue,
      goalLabel: goalLabel,
      equipment: equipmentValue,
      equipmentLabel: equipmentLabel,
      frequency: frequencyValue,
      considerations: considerationsValue
    };
  }
}

export default Parameters;
