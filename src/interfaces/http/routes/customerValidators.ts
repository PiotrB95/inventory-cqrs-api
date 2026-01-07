import { body } from 'express-validator';

export const createCustomerValidator = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Customer name is required'),

  body('location')
    .isIn(['US', 'EU', 'ASIA'])
    .withMessage('Location must be one of: US, EU, ASIA'),
];
