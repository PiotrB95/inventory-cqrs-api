import { CreateOrderCommandHandler } from "../../../../../src/application/orders/commands/createOrder.command";
import { mockCustomerRepo, mockOrderRepo, mockProductRepo } from "../../../mocks/mockRepos";

let orderRepo = mockOrderRepo();
let productRepo = mockProductRepo();
let customerRepo = mockCustomerRepo();

describe('CreateOrderCommandHandler', () => {
  it('should create order and update stock', async () => {
    productRepo.findById = jest.fn().mockResolvedValue({
        id: 'p1',
        price: 100,
        stock: 10,
        sell: function (q: number) { this.stock -= q; }
      })
      
    customerRepo.findById =  jest.fn().mockResolvedValue({ id: 'c1', location: 'EU' });

    const handler = new CreateOrderCommandHandler(orderRepo, productRepo, customerRepo);

    const result = await handler.execute({
      customerId: 'c1',
      products: [{ productId: 'p1', quantity: 2 }]
    });

    expect(productRepo.save).toHaveBeenCalled();
    expect(orderRepo.save).toHaveBeenCalled();
    expect(result.total).toBeGreaterThan(0);
  });

  it('should throw when stock is insufficient', async () => {
    productRepo.findById = jest.fn().mockResolvedValue({
        id: 'p1',
        price: 100,
        stock: 1,
        sell: function () {}
      })

    customerRepo.findById = jest.fn().mockResolvedValue({ id: 'c1', location: 'EU' });

    const handler = new CreateOrderCommandHandler(orderRepo, productRepo, customerRepo);

    await expect(
      handler.execute({
        customerId: 'c1',
        products: [{ productId: 'p1', quantity: 5 }]
      })
    ).rejects.toThrow('Insufficient stock');
  });
});
