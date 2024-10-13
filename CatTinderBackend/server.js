import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Use the routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});