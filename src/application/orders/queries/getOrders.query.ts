import { QueryHandler } from '../../common/queryBus';
import { OrderRepository } from '../../../infrastructure/repositories/orderRepository';
import { Order } from '../../../domain/orders/order.entity';

export class GetOrdersQueryHandler
  implements QueryHandler<undefined, Order[]>
{
  constructor(private ordersRepo: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.ordersRepo.findAll();
  }
}
