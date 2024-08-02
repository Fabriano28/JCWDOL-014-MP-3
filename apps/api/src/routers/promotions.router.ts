import { Router } from 'express';
import { getAllPromotions, createPromotion } from '../controllers/promotions.controller';

const router = Router();

router.get('/', getAllPromotions);
router.post('/', createPromotion);

export default router;
