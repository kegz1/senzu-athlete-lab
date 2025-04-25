import SportSelection from './components/SportSelection.js';
import Parameters from './components/Parameters.js';
import Results from './components/Results.js';
import Toggle from './components/Toggle.js';
import apiService from './api/apiService.js';

class App {
  constructor() {
    // DOM elements
    this.inputSection = document.getElementById('input-section');
    this.resultsSection = document.getElementById('results-section');
    this.generateBtn = document.getElementById('generate-btn');
    this.copyBtn = document.getElementById('copy-btn');
    this.backBtn = document.getElementById('back-btn');
    this.loadingIndicator = document.getElementById('loading');
    
    // Components
    this.sportSelection = null;
    this.parameters = null;
    this.results = null;
    this.toggle = null;
    
    // State
    this.currentResponseMode = 'quick_response'; // 'quick_response' or 'deep_senzu_research'
    this.currentPlan = null;
  }
  
  init() {
    // Initialize components
    this.sportSelection = new SportSelection(document.getElementById('sport-selection'));
    this.parameters = new Parameters(document.getElementById('parameters'));
    this.results = new Results(document.getElementById('results-content'));
    this.toggle = new Toggle(
      document.getElementById('toggle'), 
      this.handleToggleChange.bind(this)
    );
    
    // Add event listeners
    this.generateBtn.addEventListener('click', this.handleGenerateClick.bind(this));
    this.copyBtn.addEventListener('click', this.handleCopyClick.bind(this));
    this.backBtn.addEventListener('click', this.handleBackClick.bind(this));
    
    // Render components
    this.sportSelection.render();
    this.parameters.render();
    this.toggle.render();
  }
  
  // Event handlers
  async handleGenerateClick() {
    const sportData = this.sportSelection.getSelectedSport();
    const parametersData = this.parameters.getParametersData();
    
    if (!this.validateInputs(sportData, parametersData)) {
      return;
    }
    
    this.showLoading(true);
    
    try {
      const planData = await apiService.generateTrainingPlan({
        sport: sportData,
        parameters: parametersData,
        responseMode: this.currentResponseMode
      });
      
      this.currentPlan = planData;
      this.showResults();
      this.results.setContent(planData[this.currentResponseMode]);
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('An error occurred while generating your training plan. Please try again.');
    } finally {
      this.showLoading(false);
    }
  }
  
  handleToggleChange(isAdvanced) {
    this.currentResponseMode = isAdvanced ? 'deep_senzu_research' : 'quick_response';
    
    // Update toggle label based on mode
    const toggleLabel = document.querySelector('.toggle-label');
    if (toggleLabel) {
      if (isAdvanced) {
        toggleLabel.textContent = 'Advanced Analysis Mode';
        toggleLabel.setAttribute('title', 'Comprehensive scientific exposition with detailed physiological mechanisms and research support');
      } else {
        toggleLabel.textContent = 'Quick Protocol Mode';
        toggleLabel.setAttribute('title', 'Distilled, actionable training prescriptions with essential coaching cues');
      }
    }
    
    if (this.currentPlan) {
      // Add a brief loading effect when switching modes
      this.showLoading(true);
      setTimeout(() => {
        this.results.setContent(this.currentPlan[this.currentResponseMode]);
        this.showLoading(false);
      }, 500);
    }
  }
  
  handleCopyClick() {
    this.results.copyToClipboard();
  }
  
  handleBackClick() {
    this.showInputForm();
  }
  
  // Helper methods
  validateInputs(sportData, parametersData) {
    if (!sportData || !sportData.category || !sportData.sport) {
      alert('Please select a sport category and specific sport.');
      return false;
    }
    
    if (!parametersData.experience || !parametersData.goal) {
      alert('Please fill in all required fields.');
      return false;
    }
    
    return true;
  }
  
  showLoading(show) {
    if (show) {
      this.loadingIndicator.classList.remove('hidden');
    } else {
      this.loadingIndicator.classList.add('hidden');
    }
  }
  
  showResults() {
    this.inputSection.classList.add('hidden');
    this.resultsSection.classList.remove('hidden');
  }
  
  showInputForm() {
    this.resultsSection.classList.add('hidden');
    this.inputSection.classList.remove('hidden');
  }
}

export default App;
