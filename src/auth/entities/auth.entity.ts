import { ObjectType, Field} from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field({ description: 'Example field (placeholder)' })
  exampleField: string;
}
