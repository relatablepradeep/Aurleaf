import express from 'express';
import { submitReview, getAllReviews } from '../controllers/Review.controller.js';

const router = express.Router();

router.post('/', submitReview);
router.get('/', getAllReviews);

export default router;
