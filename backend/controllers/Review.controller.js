import { Review } from '../models/Review.models.js';

export const submitReview = async (req, res) => {
  try {
    const { name, rating, thought } = req.body;

    if (!name || !rating || !thought) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const review = new Review({ name, rating, thought });
    await review.save();
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
};
