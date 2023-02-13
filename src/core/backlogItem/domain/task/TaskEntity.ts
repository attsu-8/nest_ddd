import { DateTime } from 'luxon';
import {
  ResultSucceeded,
  ResultType,
} from 'src/infrastructure/adapter/secondary/repository/Result';
import { TaskStatus } from './taskStatus/enum/TaskStatus';

interface TaskEntityFactoryParams {
  id: string;
  taskName: string;
  description?: string;
  deadline: DateTime;
  status: number;
  userId: number;
}

interface TaskEntityCreationParams {
  id: string;
  taskName: string;
  description?: string;
  deadline: DateTime;
  status: TaskStatus;
  userId: number;
}

export class TaskEntity {
  private _id: string;
  private _taskName: string;
  private _description?: string;
  private _deadline: DateTime;
  private _status: TaskStatus;
  private _userId: number;

  private constructor(params: TaskEntityCreationParams) {
    this._id = params.id;
    this._taskName = params.taskName;
    this._description = params.description;
    this._deadline = params.deadline;
    this._status = params.status;
    this._userId = params.userId;
  }

  get id(): string {
    return this._id;
  }

  get taskName(): string {
    return this._taskName;
  }

  get description(): string {
    return this._description;
  }

  get deadline(): DateTime {
    return this._deadline;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get userId(): number {
    return this._userId;
  }

  static create(
    params: TaskEntityFactoryParams,
  ): ResultType<TaskEntity, Error> {
    const taskEntity = new TaskEntity(params);

    return new ResultSucceeded(taskEntity);
  }
}
