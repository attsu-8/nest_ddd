import { TaskEntity } from 'src/core/domain/task/TaskEntity';
import { TaskName } from 'src/core/domain/task/valueObject/TaskName';

export interface NewTaskCreatorPort {
  handle(taskName: TaskName): Promise<TaskEntity>;
}
