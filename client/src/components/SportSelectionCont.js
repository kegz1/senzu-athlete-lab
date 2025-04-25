class SportSelection {
  constructor(container) {
    this.container = container;
    this.sportsData = {
      'endurance': {
        label: 'Endurance Sports',
        sports: [
          { id: 'marathon', name: 'Marathon Running' },
          { id: 'cycling', name: 'Cycling' },
          { id: 'triathlon', name: 'Triathlon' },
          { id: 'swimming', name: 'Swimming' },
          { id: 'ultradistance', name: 'Ultra-Distance Events' }
        ]
      },
      'strength': {
        label: 'Strength & Power Sports',
        sports: [
          { id: 'powerlifting', name: 'Powerlifting' },
          { id: 'olympic_weightlifting', name: 'Olympic Weightlifting' },
          { id: 'bodybuilding', name: 'Bodybuilding' },
          { id: 'strongman', name: 'Strongman' },
          { id: 'crossfit', name: 'CrossFit' }
        ]
      },
      'team': {
        label: 'Team Sports',
        sports: [
          { id: 'soccer', name: 'Soccer/Football' },
          { id: 'basketball', name: 'Basketball' },
          { id: 'volleyball', name: 'Volleyball' },
          { id: 'hockey', name: 'Hockey' },
          { id: 'rugby', name: 'Rugby' },
          { id: 'american_football', name: 'American Football' }
        ]
      },
      'combat': {
        label: 'Combat Sports',
        sports: [
          { id: 'boxing', name: 'Boxing' },
          { id: 'mma', name: 'Mixed Martial Arts' },
          { id: 'bjj', name: 'Brazilian Jiu-Jitsu' },
          { id: 'wrestling', name: 'Wrestling' },
          { id: 'judo', name: 'Judo' }
        ]
      },
      'racket': {
        label: 'Racket Sports',
        sports: [
          { id: 'tennis', name: 'Tennis' },
          { id: 'badminton', name: 'Badminton' },
          { id: 'squash', name: 'Squash' },
          { id: 'table_tennis', name: 'Table Tennis' },
          { id: 'pickleball', name: 'Pickleball' }
        ]
      },
      'outdoor': {
        label: 'Outdoor/Adventure Sports',
        sports: [
          { id: 'climbing', name: 'Rock Climbing' },
          { id: 'hiking', name: 'Hiking/Trekking' },
          { id: 'surfing', name: 'Surfing' },
          { id: 'kayaking', name: 'Kayaking' },
          { id: 'mountain_biking', name: 'Mountain Biking' }
        ]
      },
      'precision': {
        label: 'Precision Sports',
        sports: [
          { id: 'golf', name: 'Golf' },
          { id: 'archery', name: 'Archery' },
          { id: 'shooting', name: 'Shooting' },
          { id: 'billiards', name: 'Billiards/Pool' },
          { id: 'bowling', name: 'Bowling' }
        ]
      },
      'winter': {
        label: 'Winter Sports',
        sports: [
          { id: 'skiing', name: 'Alpine Skiing' },
          { id: 'snowboarding', name: 'Snowboarding' },
          { id: 'ice_hockey', name: 'Ice Hockey' },
          { id: 'figure_skating', name: 'Figure Skating' },
          { id: 'speed_skating', name: 'Speed Skating' }
        ]
      }
    };
    
    this.categorySelect = null;
    this.specificSelect = null;
  }
  
  render() {
    this.container.innerHTML = '';
    
    // Create category selection
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'form-group';
    
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Sport Category:';
    categoryLabel.setAttribute('for', 'category-select');
    
    this.categorySelect = document.createElement('select');
    this.categorySelect.id = 'category-select';
    this.categorySelect.innerHTML = '<option value="">Select a category</option>';
    
    Object.entries(this.sportsData).forEach(([key, value]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = value.label;
      this.categorySelect.appendChild(option);
    });
    
    this.categorySelect.addEventListener('change', this.handleCategoryChange.bind(this));
    
    categoryDiv.appendChild(categoryLabel);
    categoryDiv.appendChild(this.categorySelect);
    this.container.appendChild(categoryDiv);
    
    // Create specific sport selection
    const specificDiv = document.createElement('div');
    specificDiv.className = 'form-group';
    
    const specificLabel = document.createElement('label');
    specificLabel.textContent = 'Specific Sport:';
    specificLabel.setAttribute('for', 'specific-select');
    
    this.specificSelect = document.createElement('select');
    this.specificSelect.id = 'specific-select';
    this.specificSelect.innerHTML = '<option value="">Select a sport</option>';
    this.specificSelect.disabled = true;
    
    specificDiv.appendChild(specificLabel);
    specificDiv.appendChild(this.specificSelect);
    this.container.appendChild(specificDiv);
  }
  
  handleCategoryChange() {
    const selectedCategory = this.categorySelect.value;
    
    // Reset and enable/disable the specific sport dropdown
    this.specificSelect.innerHTML = '<option value="">Select a specific sport</option>';
    
    if (selectedCategory) {
      this.specificSelect.disabled = false;
      
      // Populate specific sports based on selected category
      this.sportsData[selectedCategory].sports.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport.id;
        option.textContent = sport.name;
        this.specificSelect.appendChild(option);
      });
    } else {
      this.specificSelect.disabled = true;
    }
  }
  
  getSelectedData() {
    const categoryValue = this.categorySelect.value;
    const specificValue = this.specificSelect.value;
    
    let categoryLabel = '';
    let specificLabel = '';
    
    if (categoryValue) {
      categoryLabel = this.sportsData[categoryValue].label;
      
      if (specificValue) {
        const sport = this.sportsData[categoryValue].sports.find(s => s.id === specificValue);
        if (sport) {
          specificLabel = sport.name;
        }
      }
    }
    
    return {
      category: categoryValue,
      categoryLabel: categoryLabel,
      specific: specificValue,
      specificLabel: specificLabel
    };
  }
}

export default SportSelection;
