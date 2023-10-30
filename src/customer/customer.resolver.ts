import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';

import { CustomerService } from './customer.service';
import { DeleteCustomerInput, GetCustomerInput } from './dto/customer.input';

import { CreateCustomerInput, UpdateCustomerInput } from './dto/customer.input';
import { ForbiddenException } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerService.findAll({ skip, take, where });
  }

  // @Mutation(() => Customer)
  // async createCustomer(
  //   @Args('data') data: CreateCustomerInput,
  // ): Promise<Customer> {
  //   return this.customerService.createCustomer(data);
  // }

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

  @Mutation(() => Customer)
  async deleteCustomer(@Args('data') data: DeleteCustomerInput): Promise<void> {
    return this.customerService.deleteCustomer(data);
  }



// @Mutation(() => Customer)
// async deleteCustomer(
//   @Args('data') data: DeleteCustomerInput,
//   @Context('customer') customer: JwtPayload,
// ) {
//   // Check if the logged-in user is an admin
//   if (customer.role !== UserRole.ADMIN) {
//     throw new ForbiddenException('Access Denied');
//   }

//   // Continue with the delete operation
//   return this.customerService.deleteCustomer(data);
// }


}
