import { CustomerModel } from '../models/customer.model';
import { Customer } from '../../domain/customers/customer.entity';

export class CustomerRepository {
  async findAll(): Promise<Customer[]> {
    const docs = await CustomerModel.find();
    return docs.map(
      d => new Customer(d._id.toString(), d.name, d.location)
    );
  }

  async findById(id: string): Promise<Customer | null> {
    const d = await CustomerModel.findById(id);
    if (!d) return null;
    return new Customer(d._id.toString(), d.name, d.location);
  }

  async save(data: { name: string; location: 'US' | 'EU' | 'ASIA' }) {
    const doc = await CustomerModel.create(data);
    return new Customer(doc._id.toString(), doc.name, doc.location);
  }
}
