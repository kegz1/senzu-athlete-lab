import App from './App.js';
import './styles/styles.css';

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
