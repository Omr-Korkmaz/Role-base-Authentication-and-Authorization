import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'lib/entities/base.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@ObjectType()
export class Customer extends Base {
  @Field(() => String)
  email: string;

  @Field()
  // @Field(() => String, { nullable: true })
username: string;

// @Field(() => UserRole)
// role: UserRole;


}



