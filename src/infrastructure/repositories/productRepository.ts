import { ProductModel } from '../models/product.model';
import { Product } from '../../domain/products/product.entity';

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    const docs = await ProductModel.find();
    return docs.map(
      d => new Product(d.id, d.name, d.description, d.price, d.stock, d.category),
    );
  }

  async create(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
  }): Promise<Product> {
    const doc = await ProductModel.create(data);
    return new Product(doc.id, doc.name, doc.description, doc.price, doc.stock, doc.category);
  }
}
