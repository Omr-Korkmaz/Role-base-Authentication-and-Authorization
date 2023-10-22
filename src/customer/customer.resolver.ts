import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import { GetCustomerInput } from './dto/customer.input';

import { CreateCustomerInput, UpdateCustomerInput } from './dto/customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerService.findAll({ skip, take, where });
  }

  @Mutation(() => Customer)
  async createCustomer(@Args('data') data: CreateCustomerInput): Promise<Customer> {
    return this.customerService.createCustomer(data);
  }

  @Query(() => Customer)
  async customer(@Args('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(id);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id') id: string,
    @Args('data') data: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(id, data);
  }

  // @Mutation(() => Customer)
  // async deleteCustomer(@Args('id') id: string): Promise<void> {
  //   return this.customerService.deleteCustomer(id);
  // }
}
