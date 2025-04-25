class Toggle {
  constructor(container, onChange) {
    this.container = container;
    this.onChange = onChange;
    this.toggleCheckbox = null;
  }
  
  render() {
    this.container.innerHTML = '';
    
    const toggleSwitch = document.createElement('div');
    toggleSwitch.className = 'toggle-switch';
    
    // Create left label (Quick Response)
    const quickLabel = document.createElement('span');
    quickLabel.className = 'toggle-label';
    quickLabel.textContent = 'Quick Response';
    
    // Create toggle switch container
    const toggleWrapper = document.createElement('div');
    toggleWrapper.className = 'toggle-wrapper';
    
    // Create checkbox input
    this.toggleCheckbox = document.createElement('input');
    this.toggleCheckbox.type = 'checkbox';
    this.toggleCheckbox.id = 'mode-toggle';
    this.toggleCheckbox.className = 'toggle-checkbox';
    
    // Create the slider element
    const toggleSlider = document.createElement('label');
    toggleSlider.setAttribute('for', 'mode-toggle');
    
    // Create right label (Deep Senzu Research)
    const advancedLabel = document.createElement('span');
    advancedLabel.className = 'toggle-label';
    advancedLabel.textContent = 'Deep Senzu Research';
    
    // Add event listener
    this.toggleCheckbox.addEventListener('change', () => {
      if (this.onChange) {
        this.onChange(this.toggleCheckbox.checked);
      }
    });
    
    // Append elements to toggle wrapper
    toggleWrapper.appendChild(this.toggleCheckbox);
    toggleWrapper.appendChild(toggleSlider);
    
    // Append all elements to toggle switch
    toggleSwitch.appendChild(quickLabel);
    toggleSwitch.appendChild(toggleWrapper);
    toggleSwitch.appendChild(advancedLabel);
    
    this.container.appendChild(toggleSwitch);
  }
  
  // Get the current toggle state
  getState() {
    return this.toggleCheckbox ? this.toggleCheckbox.checked : false;
  }
  
  // Set the toggle state programmatically
  setState(isAdvanced) {
    if (this.toggleCheckbox) {
      this.toggleCheckbox.checked = isAdvanced;
      
      if (this.onChange) {
        this.onChange(isAdvanced);
      }
    }
  }
}

export default Toggle;
