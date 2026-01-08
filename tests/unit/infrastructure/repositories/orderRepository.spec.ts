import { OrderRepository } from "../../../../src/infrastructure/repositories/orderRepository";

describe('OrderRepository', () => {
  it('should map Mongo document to Order entity', async () => {
    const repo = new OrderRepository();

    jest.spyOn(repo as any, 'findAll').mockResolvedValue([
      {
        id: '1',
        customerId: 'c1',
        products: [{ productId: 'p1', quantity: 2 }],
        total: 200,
        appliedDiscountType: null
      }
    ]);

    const orders = await repo.findAll();
    expect(orders[0].customerId).toBe('c1');
  });
});
