import { OrderModel } from '../models/order.model';
import { Order } from '../../domain/orders/order.entity';

export class OrderRepository {

  async save(order: Order): Promise<Order> {
    await OrderModel.findByIdAndUpdate(
      order.id,
      {
        customerId: order.customerId,
        products: order.products.map(p => ({
          productId: p.productId,
          quantity: p.quantity,
        })),
        total: order.total,
        appliedDiscountType: order.appliedDiscountType,
      },
      { upsert: true }
    );

    return order;
  }

  async findById(id: string): Promise<Order | null> {
    const d = await OrderModel.findById(id).lean();

    if (!d) return null;

    return new Order(
      d._id.toString(),
      d.customerId,
      d.products.map((p: any) => ({
        productId: p.productId,
        quantity: p.quantity,
      })),
      d.total,
      d.appliedDiscountType ?? null
    );
  }

  async findAll(): Promise<Order[]> {
    const docs = await OrderModel.find().lean();

    return docs.map(d =>
      new Order(
        d._id.toString(),
        d.customerId,
        d.products.map((p: any) => ({
          productId: p.productId,
          quantity: p.quantity,
        })),
        d.total,
        d.appliedDiscountType ?? null
      )
    );
  }
}
