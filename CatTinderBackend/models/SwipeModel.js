import mongoose from 'mongoose';

const swipeSchema = new mongoose.Schema({
  userId: String,
  userNum: String,
  catInfo: Object,
  timestamp: { type: Date, default: Date.now }
});

const SwipeModel = mongoose.model('Swipe', swipeSchema);

export default SwipeModel;