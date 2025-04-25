require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['https://kegz1.github.io', 'http://localhost:3000', 'https://senzu-athlete-lab.onrender.com'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging for development

// API routes
app.use('/api', apiRoutes);

// Serve static files from the frontend app in production
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '../client/dist');
  
  // Check if the client/dist directory exists
  const fs = require('fs');
  if (fs.existsSync(clientDistPath)) {
    console.log('Serving static files from:', clientDistPath);
    
    // Serve any static files
    app.use(express.static(clientDistPath));

    // Handle frontend routing, return all requests to the frontend app
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  } else {
    console.log('Warning: client/dist directory not found. Static files will not be served.');
    
    // Provide a simple response for the root route
    app.get('/', (req, res) => {
      res.send('SENZU ATHLETE LAB API is running. Frontend not found.');
    });
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing
