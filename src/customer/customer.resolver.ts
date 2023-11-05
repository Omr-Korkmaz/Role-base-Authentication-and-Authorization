import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';

import { CustomerService } from './customer.service';
import { DeleteCustomerInput, GetCustomerInput } from './dto/customer.input';

import { UpdateCustomerInput } from './dto/customer.input';

import { Auth } from 'src/auth/decorators/auth.decotator';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Auth('USER', 'ADMIN')
  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerService.findAll({ skip, take, where });
  }


  @Auth('USER', 'ADMIN')
  @Query(() => Customer)
  async customer(@Args('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(id);
  }

  @Auth('ADMIN')
  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id') id: string,
    @Args('data') data: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(id, data);
  }

  @Auth('ADMIN')
  @Mutation(() => Customer)
  async deleteCustomer(@Args('data') data: DeleteCustomerInput): Promise<void> {
    return this.customerService.deleteCustomer(data);
  }
}
