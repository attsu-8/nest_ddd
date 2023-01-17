import { TaskEntity } from 'src/core/domain/task/TaskEntity';
import { TaskName } from 'src/core/domain/task/valueObject/TaskName';

export abstract class NewTaskCreatorPort {
  abstract handle(taskName: TaskName): Promise<TaskEntity>;
}
