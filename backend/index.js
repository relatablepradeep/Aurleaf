import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import reviewRoutes from './Route/Review.js';

const app = express();
const PORT = 3005;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/Reviews', reviewRoutes);

// DB & Server Start
mongoose
  .connect('mongodb://127.0.0.1:27017/reviewApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
