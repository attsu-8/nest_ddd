import { TaskEntity } from 'src/core/task/domain/TaskEntity';
import { TaskName } from 'src/core/task/domain/valueObject/TaskName';

export abstract class NewTaskCreatorPort {
  abstract handle(taskName: TaskName): Promise<TaskEntity>;
}
