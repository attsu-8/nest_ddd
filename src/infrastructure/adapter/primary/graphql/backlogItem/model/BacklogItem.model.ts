import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from './Task.model';

@ObjectType()
export class BacklogItem {
  @Field(() => ID)
  id: string;

  @Field()
  story: string;

  @Field()
  storyPoint: number;

  @Field()
  backlogItemPriority: number;

  @Field()
  productBacklogId: string;

  @Field()
  tasks: Task[];

  @Field()
  description?: string;
}
