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
    
    // Create form row for side-by-side layout
    const formRow = document.createElement('div');
    formRow.className = 'form-row';
    
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
    
    // Add both form groups to the form row
    formRow.appendChild(categoryDiv);
    formRow.appendChild(specificDiv);
    
    // Add the form row to the container
    this.container.appendChild(formRow);
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
  
  getSelectedSport() {
    const categoryValue = this.categorySelect.value;
    const sportValue = this.specificSelect.value;
    
    if (!categoryValue || !sportValue) {
      return null;
    }
    
    const category = this.sportsData[categoryValue];
    const sport = category.sports.find(s => s.id === sportValue);
    
    return {
      category: {
        id: categoryValue,
        name: category.label
      },
      sport: {
        id: sport.id,
        name: sport.name
      }
    };
  }
}

export default SportSelection;