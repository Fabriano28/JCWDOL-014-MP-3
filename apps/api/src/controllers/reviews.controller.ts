import { Request, Response } from 'express';
import { prisma } from '../config';

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const createReview = async (req: Request, res: Response) => {
  const { rating, comment, userId, eventId } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        eventId,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};
