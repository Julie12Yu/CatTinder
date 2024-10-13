const express = require('express');
const router = express.Router();
const Swipe = require('./models/Swipe'); // Assuming you have a models directory with Swipe model

// Define a route for swiping
router.post('/swipe', async (req, res) => {
  const { userId, catId, direction } = req.body;
  const newSwipe = new Swipe({ userId, catId, direction });
  try {
    await newSwipe.save();
    res.status(201).json(newSwipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// You can define more routes here

module.exports = router;