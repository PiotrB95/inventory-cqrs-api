import { NextFunction, Request, Response, Router } from 'express';
import { CommandBus } from '../../../application/common/commandBus';
import { OrderRepository } from '../../../infrastructure/repositories/orderRepository';

export function createOrderRouter(commandBus: CommandBus) {
  const router = Router();
  const repo = new OrderRepository();

  router.get('/orders', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await repo.findAll();
      res.json(orders);
    } catch (e) {
      next(e);
    }
  });

  router.post('/orders', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await commandBus.execute('CreateOrder', req.body);
      res.status(201).json(order);
    } catch (e) {
      next(e);
    }
  });

  return router;
}
