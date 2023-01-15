import { TaskEntity } from 'src/core/domain/task/TaskEntity';
import { TaskName } from 'src/core/domain/task/valueObject/TaskName';

export abstract class TaskRepositoryPort {
  abstract getAll(): Promise<TaskEntity[]>;
  abstract save(task: TaskEntity): Promise<void>;
  abstract updateOne(task: TaskEntity): Promise<void>;
  abstract deleteOne(id: number): Promise<void>;
  abstract findOneById(id: number): Promise<TaskEntity | null>;
  abstract findOneByName(taskName: TaskName): Promise<TaskEntity | null>;
  abstract getNextId(): Promise<number>; // TODO: Possibly not suitable for a repository's responsibility.
}
