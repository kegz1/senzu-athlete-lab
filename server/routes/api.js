const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

/**
 * Route to generate a training plan
 * 
 * Expected request body:
 * {
 *   sport: {
 *     category: string,
 *     categoryLabel: string,
 *     specific: string,
 *     specificLabel: string
 *   },
 *   parameters: {
 *     experience: string,
 *     experienceLabel: string,
 *     goal: string,
 *     goalLabel: string,
 *     equipment: string,
 *     equipmentLabel: string,
 *     frequency: string,
 *     considerations: string
 *   },
 *   responseMode: 'quick_response' | 'deep_senzu_research'
 * }
 */
router.post('/generate-plan', async (req, res, next) => {
  try {
    // Validate request body
    const { sport, parameters, responseMode } = req.body;
    
    if (!sport || !sport.category || !sport.specific || !sport.categoryLabel || !sport.specificLabel) {
      return res.status(400).json({ message: 'Sport selection is required' });
    }
    
    if (!parameters || !parameters.experience || !parameters.goal) {
      return res.status(400).json({ message: 'Training parameters are required' });
    }
    
    if (!responseMode || !['quick_response', 'deep_senzu_research'].includes(responseMode)) {
      return res.status(400).json({ message: 'Valid response mode is required' });
    }
    
    // Generate the training plan
    const plan = await trainingController.generatePlan(sport, parameters, responseMode);
    
    // Return the generated plan
    res.json(plan);
  } catch (error) {
    console.error('Error generating plan:', error);
    next(error);
  }
});

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
