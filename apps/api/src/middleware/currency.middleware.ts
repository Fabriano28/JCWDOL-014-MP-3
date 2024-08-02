import { Request, Response, NextFunction } from 'express';

export const currencyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Assuming all prices are in IDR, no additional logic required for the middleware
  next();
};
