import { marked } from 'marked';

class Results {
  constructor(container) {
    this.container = container;
    this.currentContent = '';
  }
  
  render() {
    // No initial rendering needed as content will be set later
    this.container.innerHTML = '';
  }
  
  setContent(content) {
    if (!content) {
      this.container.innerHTML = '<p>No training plan content available.</p>';
      this.currentContent = '';
      return;
    }
    
    this.currentContent = content;
    
    // Convert markdown to HTML for better formatting
    const htmlContent = marked.parse(content);
    
    // Create a wrapper div with the results-content class
    const contentDiv = document.createElement('div');
    contentDiv.className = 'results-content';
    contentDiv.innerHTML = htmlContent;
    
    // Clear container and append the new content
    this.container.innerHTML = '';
    this.container.appendChild(contentDiv);
  }
  
  getContent() {
    return this.currentContent;
  }
  
  copyToClipboard() {
    if (!this.currentContent) {
      alert('No content to copy to clipboard.');
      return;
    }
    
    navigator.clipboard.writeText(this.currentContent)
      .then(() => {
        // Create a temporary element for the success message
        const message = document.createElement('div');
        message.textContent = 'Training plan copied to clipboard!';
        message.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: black;
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          z-index: 1000;
        `;
        
        document.body.appendChild(message);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
          document.body.removeChild(message);
        }, 3000);
      })
      .catch(err => {
        console.error('Failed to copy content: ', err);
        alert('Failed to copy to clipboard. Please try again.');
      });
  }
}

export default Results;
