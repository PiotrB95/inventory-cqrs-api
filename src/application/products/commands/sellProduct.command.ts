import { CommandHandler } from '../../common/commandBus';
import { ProductRepository } from '../../../infrastructure/repositories/productRepository';

export type SellProductCommandPayload = {
  productId: string;
  amount: number;
};

export class SellProductCommandHandler
  implements CommandHandler<SellProductCommandPayload, void>
{
  constructor(private productRepo: ProductRepository) {}

  async execute({ productId, amount }: SellProductCommandPayload): Promise<void> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error('Product not found');
    product.sell(amount);
    await this.productRepo.save(product);
  }
}
