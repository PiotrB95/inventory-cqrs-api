import { CommandHandler } from '../../common/commandBus';
import { CustomerRepository } from '../../../infrastructure/repositories/customerRepository';
import { Customer } from '../../../domain/customers/customer.entity';
import { Types } from 'mongoose';

export type CreateCustomerCommandPayload = {
  name: string;
  location: 'US' | 'EU' | 'ASIA';
};

export class CreateCustomerCommandHandler
  implements CommandHandler<CreateCustomerCommandPayload, any>
{
  constructor(private customerRepo: CustomerRepository) {}

  async execute(payload: CreateCustomerCommandPayload): Promise<any> {
    const id = new Types.ObjectId().toString();

    const customer = new Customer(id, payload.name, payload.location);

    return this.customerRepo.save({
      name: customer.name,
      location: customer.location,
    });
  }
}
