import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation error',
      details: errors.array().map(e => e.msg),
      field: errors.array().map(e => e.type==="field" ? e.path : "Unknown field"),
    });
  }
  next();
}
