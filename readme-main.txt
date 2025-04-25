# SportVibeGPT Elite Performance System

A sophisticated sport-specific training system that delivers expert-level training plans through a clean, minimalist interface. The application integrates with the Anthropic API to generate personalized training programs based on sport type, experience level, goals, and available equipment.

## Features

- **Expert Sport Analysis**: Detailed analysis of movement patterns, energy systems, and injury risks tailored to specific sports
- **Customized Training Components**: Strength development, skill acquisition, and mobility protocols
- **Scientific Periodization**: Proper training organization across macro, meso, and micro cycles
- **Dual Response Modes**: 
  - Quick Protocol: Concise, actionable training plans
  - Advanced Analysis: Comprehensive explanations with scientific citations

## Tech Stack

- **Frontend**: Vanilla JavaScript with a minimalist design
- **Backend**: Node.js with Express
- **AI Integration**: Anthropic API for generating training plans
- **Deployment**: GitHub and Render
- **Development Environment**: VS Code with Roo Code extension

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Anthropic API Key (https://console.anthropic.com/)

### Installation

1. Clone the repository:
```
git clone https://github.com/your-username/sportvibe-gpt-elite.git
cd sportvibe-gpt-elite
```

2. Install dependencies:
```
npm run install-all
```

3. Create the environment variables file:
```
cd server
cp .env.sample .env
```

4. Edit the `.env` file and add your Anthropic API key

### Running the Application

#### Development Mode

```
npm run dev
```

This will start both the backend server (port 3001) and the frontend development server (port 3000).

#### Production Build

```
npm run build
npm start
```

This will build the frontend and start the server that serves both the API and the static files.

## Project Structure

The project follows a client-server architecture:

- `client/`: Frontend application
- `server/`: Backend API and server
- `package.json`: Root scripts for managing the project

## Deployment

The application is designed to be easily deployed to Render:

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the build command to `npm run install-all && npm run build`
4. Set the start command to `npm start`
5. Add the `ANTHROPIC_API_KEY` environment variable
6. Deploy!

## License

MIT
