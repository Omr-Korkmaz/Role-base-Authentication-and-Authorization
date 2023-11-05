import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from './base.entity';
// import { Role } from 'src/auth/user-role.enum';


@ObjectType()
export class Customer extends Base {
  @Field(() => String)
  email: string;

  @Field()
  username: string;


  @Field()
  role: string;

  @Field()
  isVerified: boolean;
  // @Field(() => Role)
  // role: Role;
}
