import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductBacklog {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description?: string;

  @Field()
  productOwnerId: string;
}
