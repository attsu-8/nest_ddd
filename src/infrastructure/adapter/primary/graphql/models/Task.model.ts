import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  taskName: string;

  @Field()
  description?: string;

  @Field()
  deadline: string;

  @Field()
  status: number;

  @Field()
  userId: number;
}
