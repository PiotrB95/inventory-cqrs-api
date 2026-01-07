import { body } from 'express-validator';

export const createOrderValidator = [
  body('customerId').isString().notEmpty(),
  body('products').isArray({ min: 1 }),
  body('products.*.productId').isString().notEmpty(),
  body('products.*.quantity').isInt({ gt: 0 }),
];
