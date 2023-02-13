import { DateTime } from 'luxon';
import {
  ResultFailed,
  ResultSucceeded,
  ResultType,
  RESULT_TYPE,
} from 'src/infrastructure/adapter/secondary/repository/Result';
import { BacklogItemPriorityValueObject } from './backlogItemPriority/valueObject/BacklogItemPriority';
import { StoryPonitValueObject } from './storyPoint/valueObject/StoryPointValueObject';
import { TaskEntity } from './task/TaskEntity';

interface TaskFactoryParams {
  id: string;
  taskName: string;
  description?: string;
  deadline: DateTime;
  status: number;
  userId: number;
}

interface BacklogItemEntiryFactoryParams {
  id: string;
  story: string;
  storyPoint: number;
  backlogItemPriority: number;
  description?: string;
  tasks: TaskFactoryParams[];
}

interface BacklogItemEntiryCreationParams {
  id: string;
  story: string;
  storyPoint: StoryPonitValueObject;
  backlogItemPriority: BacklogItemPriorityValueObject;
  description?: string;
  tasks: TaskEntity[];
}

export class BacklogItemEntity {
  private _id: string;
  private _story: string;
  private _storyPoint: StoryPonitValueObject;
  private _backlogItemPriority: BacklogItemPriorityValueObject;
  private _description?: string;
  private _tasks: TaskEntity[];

  get id(): string {
    return this._id;
  }

  get story(): string {
    return this._story;
  }

  get storyPoint(): StoryPonitValueObject {
    return this._storyPoint;
  }

  get backlogItemPriority(): BacklogItemPriorityValueObject {
    return this._backlogItemPriority;
  }

  get description(): string {
    return this._description;
  }

  get tasks(): TaskEntity[] {
    return this._tasks;
  }

  private constructor(params: BacklogItemEntiryCreationParams) {
    this._id = params.id;
    this._story = params.story;
    this._storyPoint = params.storyPoint;
    this._backlogItemPriority = params.backlogItemPriority;
    this._description = params.description;
    this._tasks = params.tasks;
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

    const tasks = [];
    for (const taskEntity of taskEntities) {
      if (taskEntity.resultType === RESULT_TYPE.FAILED) {
        return new ResultFailed(taskEntity.error);
      }
      tasks.push(taskEntity.value);
    }

    return new ResultSucceeded(
      new BacklogItemEntity({
        id: params.id,
        story: params.story,
        storyPoint: storyPoint.value,
        backlogItemPriority: backlogItemPriority.value,
        description: params.description,
        tasks: tasks,
      }),
    );
  }
}
