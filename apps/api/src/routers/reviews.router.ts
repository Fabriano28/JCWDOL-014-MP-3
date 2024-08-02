import { Router } from 'express';
import { getAllReviews, createReview } from '../controllers/reviews.controller';

const router = Router();

router.get('/', getAllReviews);
router.post('/', createReview);

export default router;
