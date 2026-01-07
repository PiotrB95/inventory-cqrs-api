import { Router } from 'express';
import { ProductRepository } from '../../../infrastructure/repositories/productRepository';
import { createProductValidator } from './productValidators';
import { validate } from '../middleware/validationMiddleware';

export function createProductRouter() {
  const router = Router();
  const productRepo = new ProductRepository();

  router.get('/products', async (req, res, next) => {
    try {
      const products = await productRepo.findAll();
      res.json(products);
    } catch (e) {
      next(e);
    }
  });

  router.post(
    '/products',
    createProductValidator,
    validate,
    async (req, res, next) => {
      try {
        const product = await productRepo.create(req.body);
        res.status(201).json(product);
      } catch (e) {
        next(e);
      }
    },
  );

  return router;
}
