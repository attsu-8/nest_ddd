import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DateTime } from 'luxon';
import { CreateBacklogItemUseCasePort } from 'src/core/backlogItem/port/primary/CreateBacklogItemUseCasePort';
import { GetBacklogItemsUseCasePort } from 'src/core/backlogItem/port/primary/GetBacklogItemsUseCasePort';
import { RESULT_TYPE } from 'src/shared/Result';
import { BacklogItem } from '../models/BacklogItem.model';
import { Task, TaskInput } from '../models/Task.model';

@Resolver()
export class BacklogItemResolver {
  constructor(
    private getBacklogItemsUseCase: GetBacklogItemsUseCasePort,
    private createBacklogItemUseCase: CreateBacklogItemUseCasePort,
  ) {}

  @Query(() => [BacklogItem])
  async getAllBacklogItems(): Promise<BacklogItem[]> {
    const backlogItems = await this.getBacklogItemsUseCase.execute();
    // const tasks = await this.getAllTasksUseCase.handle();
    if (backlogItems.resultType === RESULT_TYPE.FAILED) {
      return [];
    }
    const formatted = backlogItems.value.map((backlogItem) => {
      return {
        id: backlogItem.id,
        story: backlogItem.story,
        storyPoint: backlogItem.storyPoint.value,
        backlogItemPriority: backlogItem.backlogItemPriority.value,
        description: backlogItem.description,
        // tasks: [],
        tasks: backlogItem.tasks.map((task) => {
          return {
            id: task.id,
            name: task.name,
            deadline: task.deadline.toJSDate(),
            description: task.description,
            userId: task.userId,
            status: 1,
          };
        }),
      };
    });

    return formatted;
  }

  @Mutation(() => Number)
  async createOneBacklogItem(
    @Args({ name: 'story', type: () => String })
    story: string,
    @Args({ name: 'description', type: () => String })
    description: string,
    @Args({ name: 'storyPoint', type: () => Number })
    storyPoint: number,
    @Args({ name: 'backlogItemPriority', type: () => Number })
    backlogItemPriority: number,
    @Args({ name: 'tasks', type: () => [TaskInput] })
    tasks: Task[],
  ): Promise<number> {
    const result = await this.createBacklogItemUseCase.execute({
      story: story,
      storyPoint: storyPoint,
      backlogItemPriority: backlogItemPriority,
      description: description,
      tasks: tasks.map((task) => {
        return {
          name: task.name,
          description: task.description,
          deadline: DateTime.fromJSDate(task.deadline),
          status: task.status,
          userId: task.userId,
        };
      }),
    });

    if (result.resultType === RESULT_TYPE.FAILED) {
      return 0;
    }
    return 1;
  }

  // @Mutation(() => Boolean)
  // async updateOne(
  //   @Args({ name: 'id', type: () => Number })
  //   id: number,
  //   @Args({ name: 'name', type: () => String })
  //   name: string,
  //   @Args({ name: 'done', type: () => Boolean })
  //   done: boolean,
  // ): Promise<boolean> {
  //   await this.updateTaskUseCase.handle({
  //     id: id,
  //     name: name,
  //     done: done,
  //   });

  //   return true;
  // }

  // @Mutation(() => Boolean)
  // async deleteOne(
  //   @Args({ name: 'id', type: () => Number })
  //   id: number,
  // ): Promise<boolean> {
  //   await this.deleteTaskUseCase.handle({
  //     id: id,
  //   });

  //   return true;
  // }
}
