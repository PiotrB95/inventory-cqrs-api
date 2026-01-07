import { QueryHandler } from '../../common/queryBus';
import { Customer } from '../../../domain/customers/customer.entity';
import { CustomerRepository } from '../../../infrastructure/repositories/customerRepository';

export class GetCustomersQueryHandler
  implements QueryHandler<undefined, Customer[]>
{
  constructor(private customerRepo: CustomerRepository) {}

  async execute(): Promise<Customer[]> {
    return this.customerRepo.findAll();
  }
}
