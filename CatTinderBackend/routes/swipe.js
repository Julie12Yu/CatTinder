import SwipeModel from '../models/SwipeModel.js'; // Ensure the file extension is included
import  getCatInfo  from './getCatInfo.js';

export async function swipe(req, res) {
  const { userNum, catInfo } = req.body;
  const newSwipe = new SwipeModel({ userNum, catInfo });
  try {
    await newSwipe.save();
    res.status(201).json(newSwipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getSwipes(req, res) {
  const { userNum, limit } = req.query;
  try {
    // Only right swipes, sorted by timestamp descending and limited
    const swipes = await SwipeModel.find({ userNum})

    const enrichedSwipes = swipes;

    if (enrichedSwipes.length === 0) {
      res.status(400).json({ error: 'No swipes found for the current user.' });
    } else {
      res.status(200).json(enrichedSwipes);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export default { swipe, getSwipes };