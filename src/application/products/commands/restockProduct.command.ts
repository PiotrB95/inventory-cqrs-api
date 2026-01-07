import { CommandHandler } from '../../common/commandBus';
import { ProductRepository } from '../../../infrastructure/repositories/productRepository';

export type RestockProductCommandPayload = {
  productId: string;
  amount: number;
};

export class RestockProductCommandHandler
  implements CommandHandler<RestockProductCommandPayload, void>
{
  constructor(private productRepo: ProductRepository) {}

  async execute({ productId, amount }: RestockProductCommandPayload): Promise<void> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error('Product not found');
    product.restock(amount);
    await this.productRepo.save(product);
  }
}
