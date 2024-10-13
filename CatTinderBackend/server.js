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
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://cat-tinder-f723c050o-julie12yus-projects.vercel.app',
      'http://localhost:3000',
      "https://cat-tinder.vercel.app/",
      "https://cat-tinder-julie12yus-projects.vercel.app/",
      "https://cat-tinder-git-main-julie12yus-projects.vercel.app/" ,
      "https://cat-tinder-15u57jrm0-julie12yus-projects.vercel.app/"   
 ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Other middleware
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_ATLAS_URI;
await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Use the routes
app.use('/api', routes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Cat Tinder Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});