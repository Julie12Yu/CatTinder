const mongoose = require('mongoose');

const swipeSchema = new mongoose.Schema({
  userId: String,
  catId: String,
  direction: String, // 'left' or 'right'
  timestamp: { type: Date, default: Date.now }
});

const Swipe = mongoose.model('Swipe', swipeSchema);

module.exports = Swipe;