import { NextFunction, Request, Response, Router } from 'express';
import { CustomerRepository } from '../../../infrastructure/repositories/customerRepository';
import { createCustomerValidator } from './customerValidators';
import { validate } from '../middleware/validationMiddleware';

export function createCustomerRouter() {
  const router = Router();
  const repo = new CustomerRepository();

  router.get('/customers', async (req: Request, res: Response, next: NextFunction) => {
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
    async (req: Request, res: Response, next: NextFunction) => {
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
