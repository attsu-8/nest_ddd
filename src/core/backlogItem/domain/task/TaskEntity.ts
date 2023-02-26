import { DateTime } from 'luxon';
import { ResultSucceeded, ResultType } from 'src/shared/Result';
import { TaskStatus } from './taskStatus/enum/TaskStatus';

interface TaskEntityFactoryParams {
  id: string;
  name: string;
  deadline: DateTime;
  status: number;
  userId: string;
  description?: string;
}

export class TaskEntity {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly deadline: DateTime,
    public readonly status: TaskStatus,
    public readonly userId: string,
    public readonly description?: string,
  ) {}

  static create(
    params: TaskEntityFactoryParams,
  ): ResultType<TaskEntity, Error> {
    const taskEntity = new TaskEntity(
      params.id,
      params.name,
      params.deadline,
      params.status,
      params.userId,
      params.description,
    );

    return new ResultSucceeded(taskEntity);
  }
}
