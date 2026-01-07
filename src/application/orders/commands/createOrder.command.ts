import { CommandHandler } from '../../common/commandBus';
import { OrderRepository } from '../../../infrastructure/repositories/orderRepository';
import { ProductRepository } from '../../../infrastructure/repositories/productRepository';
import { CustomerRepository } from '../../../infrastructure/repositories/customerRepository';
import { calculateOrderTotal } from '../../../domain/pricing/pricingService';
import { Order } from '../../../domain/orders/order.entity';
import { Types } from 'mongoose';

export type CreateOrderCommandPayload = {
  customerId: string;
  products: { productId: string; quantity: number }[];
};

export class CreateOrderCommandHandler
  implements CommandHandler<CreateOrderCommandPayload, any>
{
  constructor(
    private orderRepo: OrderRepository,
    private productRepo: ProductRepository,
    private customerRepo: CustomerRepository
  ) {}

  async execute(payload: CreateOrderCommandPayload): Promise<any> {
    const customer = await this.customerRepo.findById(payload.customerId);
    if (!customer) throw new Error('Customer not found');

    const items: { product: any; quantity: number }[] = [];

    for (const p of payload.products) {
      const product = await this.productRepo.findById(p.productId);
      if (!product) throw new Error(`Product ${p.productId} not found`);

      if (product.stock < p.quantity) {
        throw new Error(`Insufficient stock for product ${p.productId}`);
      }

      items.push({ product, quantity: p.quantity });
    }

    const { finalTotal, type } = calculateOrderTotal(
      items,
      customer.location,
      new Date()
    );

    for (const item of items) {
      item.product.sell(item.quantity);
      await this.productRepo.save(item.product);
    }

    const orderId = new Types.ObjectId().toString();

    const order = new Order(
      orderId,
      payload.customerId,
      payload.products,
      finalTotal,
      type
    );

    await this.orderRepo.save(order);

    return order;
  }
}
