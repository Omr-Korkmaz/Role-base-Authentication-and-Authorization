import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '../../lib/entities/customer.entity';

@ObjectType()
export class SignResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => Customer)
  customer: Customer;
}
