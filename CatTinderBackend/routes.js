const express = require('express');
const router = express.Router();
const SwipeModel = require('./models/SwipeModel'); 
const { swipe } = require('./routes/swipe.js');
const { searchPetsWithFilters } = require('./routes/searchPetsWithFilters.ts');

router.post('/swipe', swipe);
router.post('/searchPetsWithFilters', async (req, res) => {
    const props = req.body;
    try {
      const cats = await searchPetsWithFilters(props);
      res.status(200).json(cats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


module.exports = router;