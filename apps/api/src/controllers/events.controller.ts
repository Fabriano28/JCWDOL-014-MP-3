import { Request, Response } from 'express';
import { prisma } from '../config';

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const {
    name,
    description,
    location,
    date,
    time,
    availableSeats,
    price,
    isFree,
    organizerId,
  } = req.body;
  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        location,
        date: new Date(date),
        time: new Date(time),
        availableSeats,
        price,
        isFree,
        organizerId,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    description,
    location,
    date,
    time,
    availableSeats,
    price,
    isFree,
  } = req.body;
  try {
    const event = await prisma.event.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        location,
        date: new Date(date),
        time: new Date(time),
        availableSeats,
        price,
        isFree,
      },
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
