import { Review } from '../models/Review.models.js';

// Create Review
export const createReview = async (req, res) => {
  try {
    const { username, photo, review, rating } = req.body;
    const newReview = await Review.create({ username, photo, review, rating });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
