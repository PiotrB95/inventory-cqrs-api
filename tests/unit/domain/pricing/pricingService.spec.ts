import { applyBestDiscount } from "../../../../src/domain/pricing/discountRules";
import { calculateOrderTotal } from "../../../../src/domain/pricing/pricingService";
import { Product } from "../../../../src/domain/products/product.entity";

jest.mock('../../../../src/domain/pricing/discountRules', () => ({
  applyBestDiscount: jest.fn(),
}));

describe('calculateOrderTotal', () => {
  it('should correctly compute baseTotal, totalQuantity and categories, then call applyBestDiscount', () => {
    
    const productA = new Product(
      'p1',
      'Test Bike',
      'example',
      2000,
      10,
      'bikes'
    );

    const productB = new Product(
      'p2',
      'Test Bike 2',
      'example',
      1000,
      5,
      'tires'
    );

    const date = new Date('2025-01-01');

    (applyBestDiscount as jest.Mock).mockReturnValue({
      finalTotal: 2500,
      type: 'TEST_DISCOUNT',
    });

    const result = calculateOrderTotal(
      [
        { product: productA, quantity: 1 }, 
        { product: productB, quantity: 1 }, 
      ],
      'EU',
      date
    );

    expect(applyBestDiscount).toHaveBeenCalledWith({
      baseTotal: 3000,
      totalQuantity: 2,
      date,
      customerLocation: 'EU',
      productCategories: ['bikes', 'tires'],
    });

    expect(result).toEqual({
      finalTotal: 2500,
      type: 'TEST_DISCOUNT',
    });
  });
});
