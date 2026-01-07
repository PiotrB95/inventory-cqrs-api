import { Router } from 'express';
import { CustomerRepository } from '../../../infrastructure/repositories/customerRepository';
import { createCustomerValidator } from './customerValidators';
import { validate } from '../middleware/validationMiddleware';

export function createCustomerRouter() {
  const router = Router();
  const repo = new CustomerRepository();

  router.get('/customers', async (req, res, next) => {
    try {
      const customers = await repo.findAll();
      res.json(customers);
    } catch (e) {
      next(e);
    }
  });

  router.post(
    '/customers',
    createCustomerValidator,
    validate,
    async (req, res, next) => {
      try {
        const customer = await repo.save(req.body);
        res.status(201).json(customer);
      } catch (e) {
        next(e);
      }
    }
  );

  return router;
}
