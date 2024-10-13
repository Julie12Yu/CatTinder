import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes.js';
import dotenv from 'dotenv';
import swipeRoutes from './routes/swipe.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5039;

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Other middleware
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_ATLAS_URI;
await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
let isOpen= false;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
  isOpen = true;
});

// Use the routes
app.use('/api', routes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Cat Tinder Backend is running! + isOpen: ' + isOpen);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});