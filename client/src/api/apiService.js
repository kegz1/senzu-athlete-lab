// Your Render deployment URL
const RENDER_URL = 'https://senzu-athlete-lab-1.onrender.com';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? `${RENDER_URL}/api`
  : 'http://localhost:3001/api';

class ApiService {
  async generateTrainingPlan(data) {
    try {
      // Transform the data to match the server's expected format
      const transformedData = {
        sport: {
          category: data.sport.category.id,
          categoryLabel: data.sport.category.name,
          specific: data.sport.sport.id,
          specificLabel: data.sport.sport.name
        },
        parameters: data.parameters,
        responseMode: data.responseMode
      };

      console.log('Sending data to server:', transformedData);

      const response = await fetch(`${API_BASE_URL}/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformedData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate training plan');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
