import express from 'express';
import { CommandBus } from './application/common/commandBus';
import { QueryBus } from './application/common/queryBus';
import { ProductRepository } from './infrastructure/repositories/productRepository';
import { CreateProductCommandHandler } from './application/products/commands/createProduct.command';
import { GetProductsQueryHandler } from './application/products/queries/getProducts.query';
import { createProductRouter } from './interfaces/http/routes/productRoutes';
import { RestockProductCommandHandler } from './application/products/commands/restockProduct.command';
import { SellProductCommandHandler } from './application/products/commands/sellProduct.command';
import { errorHandler } from './interfaces/http/middleware/errorhandler';

export function createApp() {
  const app = express();
  app.use(express.json());

  const commandBus = new CommandBus();
  const queryBus = new QueryBus();

  const productRepo = new ProductRepository();

  commandBus.register('CreateProduct', new CreateProductCommandHandler(productRepo));
  commandBus.register('RestockProduct', new RestockProductCommandHandler(productRepo));
  commandBus.register('SellProduct', new SellProductCommandHandler(productRepo));

  queryBus.register('GetProducts', new GetProductsQueryHandler(productRepo));

  app.use(createProductRouter(commandBus, queryBus));

  app.use(errorHandler);
  
  return app;
}
