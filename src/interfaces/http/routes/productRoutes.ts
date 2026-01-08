import { Router, Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../application/common/commandBus';
import { QueryBus } from '../../../application/common/queryBus';
import { createProductValidator, restockValidator, sellValidator } from './productValidators';
import { validate } from '../middleware/validationMiddleware';

export function createProductRouter(commandBus: CommandBus, queryBus: QueryBus) {
  const router = Router();

  router.get('/products', async (req: Request, res: Response, next: NextFunction) => {
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
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const product = await commandBus.execute('CreateProduct', req.body);
        res.status(201).json(product);
      } catch (e) {
        next(e);
      }
    },
  );

  router.post(
    '/products/:id/restock',
    restockValidator,
    validate,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await commandBus.execute('RestockProduct', {
        productId: req.params.id,
        amount: req.body.amount,
      });
      res.status(204).send();
      } catch (e) {
      next(e);
      }
  },
);

  router.post(
    '/products/:id/sell',
    sellValidator,
    validate,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await commandBus.execute('SellProduct', {
        productId: req.params.id,
        amount: req.body.amount,
      });
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
);

  return router;
}
