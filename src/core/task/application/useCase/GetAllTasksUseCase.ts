import { Injectable } from '@nestjs/common';
import { GetAllTasksUseCasePort } from 'src/core/task/port/primary/useCase/GetAllTasksUseCasePort';
import { TaskEntity } from '../../domain/TaskEntity';
import { TaskRepositoryPort } from '../../port/secondary/repository/TaskRepositoryPort';

@Injectable()
export class GetAllTasksUseCase implements GetAllTasksUseCasePort {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async handle(): Promise<TaskEntity[]> {
    return this.taskRepository.getAll();
  }
}
