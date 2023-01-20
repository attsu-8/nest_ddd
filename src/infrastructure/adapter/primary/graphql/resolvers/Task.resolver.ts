import { Query, Resolver } from '@nestjs/graphql';
import { GetAllTasksUseCasePort } from 'src/core/port/primary/task/useCase/GetAllTasksUseCasePort';
import { Task } from '../models/Task.model';

@Resolver()
export class TaskResolver {
  constructor(private getAllTasksUseCase: GetAllTasksUseCasePort) {}

  @Query(() => [Task])
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.getAllTasksUseCase.handle();
    const formatedTasks: Task[] = tasks.map((task) => {
      return {
        id: task.id,
        name: task.name.value,
        done: task.done,
      };
    });

    return formatedTasks;
  }
}
