import { QueryHandler } from '../../common/queryBus';
import { ProductRepository } from '../../../infrastructure/repositories/productRepository';
import { Product } from '../../../domain/products/product.entity';

export class GetProductsQueryHandler
  implements QueryHandler<undefined, Product[]>
{
  constructor(private productRepo: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepo.findAll();
  }
}
