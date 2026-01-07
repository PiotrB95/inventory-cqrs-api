import express from 'express';
import { CommandBus } from './application/common/commandBus';
import { QueryBus } from './application/common/queryBus';
import { ProductRepository } from './infrastructure/repositories/productRepository';
import { CreateProductCommandHandler } from './application/products/commands/createProduct.command';
import { GetProductsQueryHandler } from './application/products/queries/getProducts.query';
import { createProductRouter } from './interfaces/http/routes/productRoutes';
import { RestockProductCommandHandler } from './application/products/commands/restockProduct.command';
import { SellProductCommandHandler } from './application/products/commands/sellProduct.command';
import { OrderRepository } from './infrastructure/repositories/orderRepository';
import { CustomerRepository } from './infrastructure/repositories/customerRepository';
import { CreateOrderCommandHandler } from './application/orders/commands/createOrder.command';
import { createOrderRouter } from './interfaces/http/routes/orderRoutes';
import { errorHandler } from './interfaces/http/middleware/errorHandler';
import { createCustomerRouter } from './interfaces/http/routes/customerRoutes';
import { GetOrdersQueryHandler } from './application/orders/queries/getOrders.query';
import { GetCustomersQueryHandler } from './application/customers/queries/getCustomers.query';
import { CreateCustomerCommandHandler } from './application/customers/commands/createCustomer.command';

export function createApp() {
  const app = express();
  app.use(express.json());

  const commandBus = new CommandBus();
  const queryBus = new QueryBus();

  const productRepo = new ProductRepository();
  const orderRepo = new OrderRepository();
  const customerRepo = new CustomerRepository();


  commandBus.register('CreateProduct', new CreateProductCommandHandler(productRepo));
  commandBus.register('RestockProduct', new RestockProductCommandHandler(productRepo));
  commandBus.register('SellProduct', new SellProductCommandHandler(productRepo));

  commandBus.register('CreateOrder', new CreateOrderCommandHandler(orderRepo, productRepo, customerRepo));

  commandBus.register('CreateCustomer', new CreateCustomerCommandHandler(customerRepo));

  queryBus.register('GetProducts', new GetProductsQueryHandler(productRepo));
  queryBus.register('GetOrders', new GetOrdersQueryHandler(orderRepo));
  queryBus.register('GetCustomers', new GetCustomersQueryHandler(customerRepo));

  app.use(createProductRouter(commandBus, queryBus));
  app.use(createOrderRouter(commandBus));
  app.use(createCustomerRouter());

  app.use(errorHandler);
  
  return app;
}
