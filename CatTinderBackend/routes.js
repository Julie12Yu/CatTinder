import express from 'express';
import  {swipe, getSwipes}  from './routes/swipe.js'; 
import  searchPetsWithFilters  from './routes/searchPetsWithFilters.js';

const router = express.Router();

router.post('/swipe', swipe);
router.get('/swipes', getSwipes);
router.post('/searchPetsWithFilters', async (req, res) => {
  const props = req.body;
  try {
    const cats = await searchPetsWithFilters(props);
    if (cats.length === 0) {
      res.status(400).json({ error: 'No cats found for the current filter.' });
    } else {
      res.status(200).json(cats);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
