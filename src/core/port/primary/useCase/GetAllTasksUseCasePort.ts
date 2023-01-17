import { TaskEntity } from 'src/core/domain/task/TaskEntity';

export abstract class GetAllTasksUseCasePort {
  abstract handle(): Promise<TaskEntity[]>;
}
