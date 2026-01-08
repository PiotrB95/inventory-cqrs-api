import express from 'express';
import { errorHandler } from '../../../src/interfaces/http/middleware/errorHandler';
import { createProductRouter } from '../../../src/interfaces/http/routes/productRoutes';
import { createOrderRouter } from '../../../src/interfaces/http/routes/orderRoutes';
import { createCustomerRouter } from '../../../src/interfaces/http/routes/customerRoutes';

import { CommandBus } from '../../../src/application/common/commandBus';
import { QueryBus } from '../../../src/application/common/queryBus';

import { ProductRepository } from '../../../src/infrastructure/repositories/productRepository';
import { CreateProductCommandHandler } from '../../../src/application/products/commands/createProduct.command';
import { RestockProductCommandHandler } from '../../../src/application/products/commands/restockProduct.command';
import { SellProductCommandHandler } from '../../../src/application/products/commands/sellProduct.command';
import { GetProductsQueryHandler } from '../../../src/application/products/queries/getProducts.query';
import { OrderRepository } from '../../../src/infrastructure/repositories/orderRepository';
import { CustomerRepository } from '../../../src/infrastructure/repositories/customerRepository';
import { CreateOrderCommandHandler } from '../../../src/application/orders/commands/createOrder.command';
import { CreateCustomerCommandHandler } from '../../../src/application/customers/commands/createCustomer.command';
import { GetOrdersQueryHandler } from '../../../src/application/orders/queries/getOrders.query';
import { GetCustomersQueryHandler } from '../../../src/application/customers/queries/getCustomers.query';

export function createTestServer() {
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
