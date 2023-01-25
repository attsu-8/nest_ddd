import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  done: boolean;
}
