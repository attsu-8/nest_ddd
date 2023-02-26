import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description?: string;

  @Field()
  deadline: Date;

  @Field()
  status: number;

  @Field()
  userId: string;
}

@InputType()
export class TaskInput {
  @Field()
  name: string;

  @Field()
  description?: string;

  @Field()
  deadline: Date;

  @Field()
  status: number;

  @Field()
  userId: string;
}

@InputType()
export class TaskUpdateInput {
  @Field()
  id: string;

  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field()
  deadline?: Date;

  @Field()
  status?: number;

  @Field()
  userId?: string;
}
