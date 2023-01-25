import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskUseCasePort } from 'src/core/port/primary/task/useCase/CreateTaskUseCasePort';
import { DeleteTaskUseCasePort } from 'src/core/port/primary/task/useCase/DeleteTaskUseCasePort';
import { GetAllTasksUseCasePort } from 'src/core/port/primary/task/useCase/GetAllTasksUseCasePort';
import { UpdateTaskUseCasePort } from 'src/core/port/primary/task/useCase/UpdateTaskUseCasePort';
import { Task } from '../models/Task.model';

@Resolver()
export class TaskResolver {
  constructor(
    private getAllTasksUseCase: GetAllTasksUseCasePort,
    private createTaskUseCase: CreateTaskUseCasePort,
    private updateTaskUseCase: UpdateTaskUseCasePort,
    private deleteTaskUseCase: DeleteTaskUseCasePort,
  ) {}

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

  @Mutation(() => Boolean)
  async createOne(
    @Args({ name: 'name', type: () => String })
    name: string,
  ): Promise<boolean> {
    await this.createTaskUseCase.handle({
      name: name,
    });

    return true;
  }

  @Mutation(() => Boolean)
  async updateOne(
    @Args({ name: 'id', type: () => Number })
    id: number,
    @Args({ name: 'name', type: () => String })
    name: string,
    @Args({ name: 'done', type: () => Boolean })
    done: boolean,
  ): Promise<boolean> {
    await this.updateTaskUseCase.handle({
      id: id,
      name: name,
      done: done,
    });

    return true;
  }

  @Mutation(() => Boolean)
  async deleteOne(
    @Args({ name: 'id', type: () => Number })
    id: number,
  ): Promise<boolean> {
    await this.deleteTaskUseCase.handle({
      id: id,
    });

    return true;
  }
}
