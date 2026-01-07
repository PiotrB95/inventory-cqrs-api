import { Router } from 'express';
import { CommandBus } from '../../../application/common/commandBus';
import { QueryBus } from '../../../application/common/queryBus';
import { createProductValidator } from './productValidators';
import { validate } from '../middleware/validationMiddleware';

export function createProductRouter(commandBus: CommandBus, queryBus: QueryBus) {
  const router = Router();

  router.get('/products', async (req, res, next) => {
    try {
      const products = await queryBus.execute('GetProducts', undefined);
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
        const product = await commandBus.execute('CreateProduct', req.body);
        res.status(201).json(product);
      } catch (e) {
        next(e);
      }
    },
  );

  return router;
}
