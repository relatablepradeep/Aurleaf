import express from 'express';
import {Review} from '../models/Review.models.js';

const router = express.Router();

// GET all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST new review
router.post('/reviews', async (req, res) => {
  try {
    const { username, photo, review, rating } = req.body;

    if (!username || !review || !rating) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newReview = new Review({ username, photo, review, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

export default router;
