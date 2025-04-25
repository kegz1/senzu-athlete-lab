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

// In production, just provide a simple response for the root route
// since we're using a separate static site service for the frontend
if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.send('SENZU ATHLETE LAB API is running. The frontend is available at https://senzu-athlete-lab.onrender.com');
  });
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
