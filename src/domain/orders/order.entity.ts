export class Order {
  constructor(
    public id: string,
    public customerId: string,
    public products: { productId: string; quantity: number }[],
    public total: number,
    public appliedDiscountType: string | null
  ) {
    if (!customerId) throw new Error('Order must have a customerId');
    if (products.length === 0) throw new Error('Order must contain products');
    if (total <= 0) throw new Error('Order total must be positive');
  }
}
