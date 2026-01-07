import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err.message === 'Product not found') {
    return res.status(404).json({ message: err.message });
  }

  if (err.message === 'Insufficient stock') {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === 'Restock amount must be positive') {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === 'Sell amount must be positive') {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
}
