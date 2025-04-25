const axios = require('axios');

/**
 * Service for interacting with the Anthropic API
 */
class AnthropicService {
  constructor() {
    // API configuration
    this.apiKey = process.env.ANTHROPIC_API_KEY;
    this.baseUrl = 'https://api.anthropic.com';
    this.model = 'claude-3-7-sonnet-20250219'; // Updated to Claude 3.7
    this.maxTokens = 4000;
  }
  
  /**
   * Get a completion from the Anthropic API
   * 
   * @param {string} prompt - The prompt to send to the API
   * @returns {Promise<string>} The completion response
   */
  async getCompletion(prompt) {
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
    }
    
    try {
      const response = await axios.post(
        `${this.baseUrl}/v1/messages`,
        {
          model: this.model,
          max_tokens: this.maxTokens,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          }
        }
      );
      
      // Extract the text content from the response
      if (response.data && 
          response.data.content && 
          response.data.content.length > 0 && 
          response.data.content[0].type === 'text') {
        return response.data.content[0].text;
      } else {
        throw new Error('Unexpected response structure from Anthropic API');
      }
    } catch (error) {
      console.error('Anthropic API error:', error.response?.data || error.message);
      
      // Provide a more specific error message if available
      if (error.response?.data?.error) {
        throw new Error(`Anthropic API error: ${error.response.data.error.message || 'Unknown error'}`);
      }
      
      throw error;
    }
  }
}

// Export a singleton instance
module.exports = new AnthropicService();
