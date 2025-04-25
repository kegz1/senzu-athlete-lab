# SportVibeGPT Elite - Server

This is the backend server for SportVibeGPT Elite, handling Anthropic API integration and serving the client application.

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. Create a `.env` file in the server directory with your Anthropic API key:
```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
```

3. Start the development server:
```
npm run dev
```

4. Start production server:
```
npm start
```

## Project Structure

- `server.js` - Main Express server
- `routes/` - API routes
  - `api.js` - API endpoints
- `controllers/` - Business logic
  - `trainingController.js` - Training plan generation logic
- `utils/` - Utility functions
  - `anthropicService.js` - Anthropic API integration

## API Endpoints

- `POST /api/generate-plan` - Generate a training plan based on user parameters
