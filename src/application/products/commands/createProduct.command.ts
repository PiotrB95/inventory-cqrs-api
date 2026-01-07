import { CommandHandler } from '../../common/commandBus';
import { ProductRepository } from '../../../infrastructure/repositories/productRepository';
import { Product } from '../../../domain/products/product.entity';
import { Types } from 'mongoose';

export type CreateProductCommandPayload = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
};

export class CreateProductCommandHandler
  implements CommandHandler<CreateProductCommandPayload, Product>
{
  constructor(private productRepo: ProductRepository) {}

  async execute(payload: CreateProductCommandPayload): Promise<Product> {
    const product = new Product(
        new Types.ObjectId().toString(),
        payload.name,
        payload.description,
        payload.price,
        payload.stock,
        payload.category,
);

    await this.productRepo.save(product);
    return product;
  }
}
