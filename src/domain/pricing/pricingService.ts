import { Product } from '../products/product.entity';
import { applyBestDiscount } from './discountRules';

export function calculateOrderTotal(
  products: { product: Product; quantity: number }[],
  customerLocation: 'US' | 'EU' | 'ASIA',
  date: Date,
) {
  const baseTotal = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalQuantity = products.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const categories = products.map(p => p.product.category);

  return applyBestDiscount({
    baseTotal,
    totalQuantity,
    date,
    customerLocation,
    productCategories: categories,
  });
}
