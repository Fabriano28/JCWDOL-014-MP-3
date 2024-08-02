import { Request, Response } from 'express';
import { prisma } from '../config';

export const getAllPromotions = async (req: Request, res: Response) => {
  try {
    const promotions = await prisma.promotion.findMany();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch promotions' });
  }
};

export const createPromotion = async (req: Request, res: Response) => {
  const { code, discount, eventId, maxUsage, expirationDate } = req.body;
  try {
    const promotion = await prisma.promotion.create({
      data: {
        code,
        discount,
        eventId,
        maxUsage,
        expirationDate: new Date(expirationDate),
      },
    });
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create promotion' });
  }
};
