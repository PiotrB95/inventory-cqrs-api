import { body, param } from 'express-validator';

export const createProductValidator = [
  body('name').isString().isLength({ max: 50 }).notEmpty(),
  body('description').isString().isLength({ max: 50 }).notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('stock').isInt({ min: 0 }),
  body('category').isString().notEmpty(),
];

export const restockValidator = [
  param('id').isString(),
  body('amount').isInt({ gt: 0 }),
];

export const sellValidator = restockValidator;
