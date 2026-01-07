import express from 'express';
import { CommandBus } from './application/common/commandBus';
import { QueryBus } from './application/common/queryBus';
import { ProductRepository } from './infrastructure/repositories/productRepository';
import { CreateProductCommandHandler } from './application/products/commands/createProduct.command';
import { GetProductsQueryHandler } from './application/products/queries/getProducts.query';
import { createProductRouter } from './interfaces/http/routes/productRoutes';

export function createApp() {
  const app = express();
  app.use(express.json());

  const commandBus = new CommandBus();
  const queryBus = new QueryBus();

  const productRepo = new ProductRepository();

  commandBus.register('CreateProduct', new CreateProductCommandHandler(productRepo));
  queryBus.register('GetProducts', new GetProductsQueryHandler(productRepo));

  app.use(createProductRouter(commandBus, queryBus));

  return app;
}
