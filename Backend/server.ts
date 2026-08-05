// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
// import userRoutes from './routes/user.routes';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
// app.use('/api', userRoutes);

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/instagram-clone')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });