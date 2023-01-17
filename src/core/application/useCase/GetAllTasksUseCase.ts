import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/core/domain/task/TaskEntity';
import { GetAllTasksUseCasePort } from 'src/core/port/primary/useCase/GetAllTasksUseCasePort';
import { TaskRepositoryPort } from 'src/core/port/secondary/repository/TaskRepositoryPort';

@Injectable()
export class GetAllTasksUseCase implements GetAllTasksUseCasePort {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async handle(): Promise<TaskEntity[]> {
    return this.taskRepository.getAll();
  }
}
