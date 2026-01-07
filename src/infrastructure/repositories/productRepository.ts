import { ProductModel } from '../models/product.model';
import { Product } from '../../domain/products/product.entity';

export class ProductRepository {

  async findAll(): Promise<Product[]> {
    const docs = await ProductModel.find();
    return docs.map(
      d =>
        new Product(
          d._id.toString(),
          d.name,
          d.description,
          d.price,
          d.stock,
          d.category
        )
    );
  }

  async findById(id: string): Promise<Product | null> {
    const d = await ProductModel.findById(id);
    if (!d) return null;

    return new Product(
      d._id.toString(),
      d.name,
      d.description,
      d.price,
      d.stock,
      d.category
    );
  }

  async save(product: Product): Promise<void> {
    await ProductModel.findByIdAndUpdate(
      product.id,
      {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
      },
      { upsert: true }
    );
  }
}
