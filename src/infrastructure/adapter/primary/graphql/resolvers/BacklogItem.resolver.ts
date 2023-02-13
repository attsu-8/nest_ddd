import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBacklogItemUseCasePort } from 'src/core/backlogItem/port/primary/CreateBacklogItemUseCasePort';
import { RESULT_TYPE } from 'src/infrastructure/adapter/secondary/repository/Result';
import { BacklogItem } from '../models/BacklogItem.model';

@Resolver()
export class BacklogItemResolver {
  constructor(private createBacklogItemUseCase: CreateBacklogItemUseCasePort) {}

  @Query(() => [BacklogItem])
  async getAllTasks(): Promise<BacklogItem[]> {
    // const tasks = await this.getAllTasksUseCase.handle();
    const formatedTasks: BacklogItem[] = [
      {
        id: '1',
        story: 'story',
        storyPoint: 1,
        backlogItemPriority: 1,
        description: 'description',
        tasks: [],
      },
    ];
    // const formatedTasks: BacklogItem[] = tasks.map((task) => {
    //   return {
    //     id: task.id,
    //     name: task.name.value,
    //     done: task.done,
    //   };
    // });

    return formatedTasks;
  }

  @Mutation(() => Number)
  async createOne(
    @Args({ name: 'story', type: () => String })
    story: string,
    @Args({ name: 'description', type: () => String })
    description: string,
    @Args({ name: 'storyPoint', type: () => Number })
    storyPoint: number,
    @Args({ name: 'backlogItemPriority', type: () => Number })
    backlogItemPriority: number,
  ): Promise<number> {
    const result = await this.createBacklogItemUseCase.execute({
      story: story,
      storyPoint: storyPoint,
      backlogItemPriority: backlogItemPriority,
      description: description,
      tasks: [],
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
