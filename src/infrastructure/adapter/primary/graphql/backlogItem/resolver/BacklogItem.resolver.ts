import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DateTime } from 'luxon';
import { CreateBacklogItemPort } from 'src/core/backlogItem/port/primary/CreateBacklogItemPort';
import { DeleteBacklogItemPort } from 'src/core/backlogItem/port/primary/DeleteBacklogItemPort';
import { GetBacklogItemsPort } from 'src/core/backlogItem/port/primary/GetBacklogItemsPort';
import { UpdateBacklogItemPort } from 'src/core/backlogItem/port/primary/UpdateBacklogItemPort';
import { RESULT_TYPE } from 'src/shared/Result';
import { BacklogItem } from '../model/BacklogItem.model';
import { Task, TaskInput, TaskUpdateInput } from '../model/Task.model';

@Resolver()
export class BacklogItemResolver {
  constructor(
    private readonly getBacklogItemsPort: GetBacklogItemsPort,
    private readonly createBacklogItemPort: CreateBacklogItemPort,
    private readonly updateBacklogItemPort: UpdateBacklogItemPort,
    private readonly deleteBacklogItemPort: DeleteBacklogItemPort,
  ) {}

  @Query(() => [BacklogItem])
  async getAllBacklogItems(): Promise<BacklogItem[]> {
    const backlogItems = await this.getBacklogItemsPort.getBacklogItems();
    if (backlogItems.resultType === RESULT_TYPE.FAILED) {
      return [];
    }
    const formatted = backlogItems.value.map((backlogItem) => {
      return {
        id: backlogItem.id,
        story: backlogItem.story,
        storyPoint: backlogItem.storyPoint.value,
        backlogItemPriority: backlogItem.backlogItemPriority.value,
        productBacklogId: backlogItem.productBacklogId,
        tasks: backlogItem.tasks.map((task) => {
          return {
            id: task.id,
            name: task.name,
            deadline: task.deadline.toJSDate(),
            description: task.description,
            userId: task.userId,
            status: task.status as number,
          };
        }),
        description: backlogItem.description,
      };
    });

    return formatted;
  }

  @Query(() => [BacklogItem])
  async getBacklogItemsByProductBacklogId(
    @Args('productBacklogId') productBacklogId: string,
  ): Promise<BacklogItem[]> {
    const backlogItems = await this.getBacklogItemsPort.findByProductBacklogId(
      productBacklogId,
    );
    if (backlogItems.resultType === RESULT_TYPE.FAILED) {
      return [];
    }
    const formatted = backlogItems.value.map((backlogItem) => {
      return {
        id: backlogItem.id,
        story: backlogItem.story,
        storyPoint: backlogItem.storyPoint.value,
        backlogItemPriority: backlogItem.backlogItemPriority.value,
        productBacklogId: backlogItem.productBacklogId,
        tasks: backlogItem.tasks.map((task) => {
          return {
            id: task.id,
            name: task.name,
            deadline: task.deadline.toJSDate(),
            description: task.description,
            userId: task.userId,
            status: task.status as number,
          };
        }),
        description: backlogItem.description,
      };
    });

    return formatted;
  }

  @Mutation(() => Number)
  async createBacklogItem(
    @Args({ name: 'story', type: () => String })
    story: string,
    @Args({ name: 'storyPoint', type: () => Number })
    storyPoint: number,
    @Args({ name: 'backlogItemPriority', type: () => Number })
    backlogItemPriority: number,
    @Args({ name: 'productBacklogId', type: () => String })
    productBacklogId: string,
    @Args({ name: 'tasks', type: () => [TaskInput] })
    tasks: Task[],
    @Args({ name: 'description', type: () => String, nullable: true })
    description: string,
  ): Promise<number> {
    const result = await this.createBacklogItemPort.createBacklogItem({
      story: story,
      storyPoint: storyPoint,
      backlogItemPriority: backlogItemPriority,
      productBacklogId: productBacklogId,
      tasks: tasks.map((task) => {
        return {
          name: task.name,
          description: task.description,
          deadline: DateTime.fromJSDate(task.deadline),
          status: task.status,
          userId: task.userId,
        };
      }),
      description: description,
    });

    if (result.resultType === RESULT_TYPE.FAILED) {
      return 0;
    }
    return 1;
  }

  @Mutation(() => String)
  async updateBacklogItem(
    @Args({ name: 'id', type: () => String })
    id: string,
    @Args({ name: 'story', type: () => String, nullable: true })
    story: string,
    @Args({ name: 'storyPoint', type: () => Number, nullable: true })
    storyPoint: number,
    @Args({ name: 'backlogItemPriority', type: () => Number, nullable: true })
    backlogItemPriority: number,
    @Args({ name: 'productBacklogId', type: () => String, nullable: true })
    productBacklogId: string,
    @Args({ name: 'tasks', type: () => [TaskUpdateInput] })
    tasks: Task[],
    @Args({ name: 'description', type: () => String, nullable: true })
    description: string,
  ): Promise<string> {
    const updateResult = await this.updateBacklogItemPort.updateBacklogItem({
      id: id,
      story: story,
      storyPoint: storyPoint,
      backlogItemPriority: backlogItemPriority,
      productBacklogId: productBacklogId,
      description: description,
      tasks: tasks.map((task) => {
        return {
          ...task,
          deadline: DateTime.fromJSDate(task.deadline),
        };
      }),
    });
    if (updateResult.resultType === RESULT_TYPE.FAILED) {
      return 'todo';
    }

    return updateResult.value;
  }

  @Mutation(() => String)
  async deleteBacklogItem(
    @Args({ name: 'id', type: () => String })
    id: string,
  ): Promise<string> {
    const deleteResult = await this.deleteBacklogItemPort.deleteBacklogItem({
      id: id,
    });
    if (deleteResult.resultType === RESULT_TYPE.FAILED) {
      return 'todo';
    }

    return deleteResult.value;
  }
}
