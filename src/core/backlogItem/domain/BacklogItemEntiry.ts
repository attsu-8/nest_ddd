import { DateTime } from 'luxon';
import {
  ResultFailed,
  ResultSucceeded,
  ResultType,
  RESULT_TYPE,
} from 'src/shared/Result';
import { BacklogItemPriorityValueObject } from './backlogItemPriority/valueObject/BacklogItemPriority';
import { StoryPonitValueObject } from './storyPoint/valueObject/StoryPointValueObject';
import { TaskEntity } from './task/TaskEntity';

interface TaskFactoryParams {
  id: string;
  name: string;
  description?: string;
  deadline: DateTime;
  status: number;
  userId: string;
}

interface BacklogItemEntiryFactoryParams {
  id: string;
  story: string;
  storyPoint: number;
  backlogItemPriority: number;
  productBacklogId: string;
  tasks: TaskFactoryParams[];
  description?: string;
}

export class BacklogItemEntity {
  private constructor(
    public readonly id: string,
    public readonly story: string,
    public readonly storyPoint: StoryPonitValueObject,
    public readonly backlogItemPriority: BacklogItemPriorityValueObject,
    public readonly productBacklogId: string,
    public readonly tasks: TaskEntity[],
    public readonly description?: string,
  ) {}

  update(updateParams: {
    story?: string;
    storyPoint?: number;
    backlogItemPriority?: number;
    productBacklogId?: string;
    tasks?: {
      id: string;
      name?: string;
      description?: string;
      deadline?: DateTime;
      status?: number;
      userId?: string;
    }[];
    description?: string;
  }) {
    return BacklogItemEntity.create({
      id: this.id,
      story: updateParams.story ?? this.story,
      storyPoint: updateParams.storyPoint ?? this.storyPoint.value,
      backlogItemPriority:
        updateParams.backlogItemPriority ?? this.backlogItemPriority.value,
      productBacklogId: updateParams.productBacklogId ?? this.productBacklogId,
      tasks: updateParams.tasks.map((task) => {
        const oldTask = this.tasks.find((t) => task.id === t.id);
        return {
          id: task.id,
          name: task.name ?? oldTask.name,
          description: task.description ?? oldTask.description,
          deadline: task.deadline ?? oldTask.deadline,
          status: task.status ?? (oldTask.status as number),
          userId: task.userId ?? oldTask.userId,
        };
      }),
      description: updateParams.description ?? this.description,
    });
  }

  static hasDuplicateTaskName(taskNames: string[]): boolean {
    return taskNames.length !== new Set(taskNames).size;
  }

  static create(
    params: BacklogItemEntiryFactoryParams,
  ): ResultType<BacklogItemEntity, Error> {
    const storyPoint = StoryPonitValueObject.create(params.storyPoint);
    if (storyPoint.resultType === RESULT_TYPE.FAILED) {
      return new ResultFailed(storyPoint.error);
    }

    const backlogItemPriority = BacklogItemPriorityValueObject.create(
      params.backlogItemPriority,
    );
    if (backlogItemPriority.resultType === RESULT_TYPE.FAILED) {
      return new ResultFailed(backlogItemPriority.error);
    }

    const taskEntities = params.tasks.map((task) => {
      const taskEntity = TaskEntity.create(task);
      return taskEntity;
    });

    if (
      BacklogItemEntity.hasDuplicateTaskName(
        params.tasks.map((task) => {
          return task.name;
        }),
      )
    ) {
      return new ResultFailed(Error('duplicated error'));
    }
    const tasks = [];
    for (const taskEntity of taskEntities) {
      if (taskEntity.resultType === RESULT_TYPE.FAILED) {
        return new ResultFailed(taskEntity.error);
      }
      tasks.push(taskEntity.value);
    }

    return new ResultSucceeded(
      new BacklogItemEntity(
        params.id,
        params.story,
        storyPoint.value,
        backlogItemPriority.value,
        params.productBacklogId,
        tasks,
        params.description,
      ),
    );
  }
}
