import { Product } from "../../../../src/domain/products/product.entity";

describe('Product entity', () => {
  it('should decrease stock when selling', () => {
    const p = new Product('1', 'Test Bike', 'example bike', 2000, 10, 'bikes');
    p.sell(3);
    expect(p.stock).toBe(7);
  });

  it('should throw when selling too much', () => {
    const p = new Product('1', 'Test', 'example', 2000, 2, 'bikes');
    expect(() => p.sell(5)).toThrow('Insufficient stock');
  });

  it('should increase stock when restocking', () => {
    const p = new Product('1', 'Test', 'example', 2000, 5, 'bikes');
    p.restock(10);
    expect(p.stock).toBe(15);
  });
});
