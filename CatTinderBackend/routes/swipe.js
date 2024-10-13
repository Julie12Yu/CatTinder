import SwipeModel from '../models/SwipeModel.js'; // Ensure the file extension is included

export async function swipe(req, res) {
  const { userNum, catId, direction } = req.body;
  const newSwipe = new SwipeModel({ userNum, catId, direction });
  try {
    await newSwipe.save();
    res.status(201).json(newSwipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export default swipe;