import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DeleteCustomerInput, GetCustomerInput } from './dto/customer.input';

import { Customer } from '../lib/entities/customer.entity';
// import { Customer } from '@prisma/client';

import { CreateCustomerInput, UpdateCustomerInput } from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;
    return this.prisma.customer.findMany({ skip, take, cursor, where });
  }

  // async createCustomer(data: CreateCustomerInput): Promise<Customer> {
  //   return this.prisma.customer.create({ data });
  // }
  // async createCustomer(data: CreateCustomerInput): Promise<Customer> {
  //   const defaultRole = UserRole.USER; // Set the default role for a new customer
  //   return this.prisma.customer.create({ data: { ...data, role: defaultRole } });
  // }

  async getCustomerById(id: string): Promise<Customer> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async updateCustomer(
    id: string,
    data: UpdateCustomerInput,
  ): Promise<Customer> {
    await this.getCustomerById(id); // Ensure customer exists
    return this.prisma.customer.update({ where: { id }, data });
  }

  async deleteCustomer(data: DeleteCustomerInput): Promise<void> {
    // delete the customer based on id or email
    try {
      const { id, email } = data;

      if (id) {
        await this.prisma.customer.delete({ where: { id } });
      } else if (email) {
        await this.prisma.customer.delete({ where: { email } });
      } else {
        throw new Error(" 'id' or 'email' must be provided for deletion.");
      }
    } catch (error) {
      console.error('Error deleting customer:', error.message);
      throw new Error('Failed to delete customer.');
    }
  }
}
