import { TaskEntity } from 'src/core/task/domain/TaskEntity';

export abstract class GetAllTasksUseCasePort {
  abstract handle(): Promise<TaskEntity[]>;
}
