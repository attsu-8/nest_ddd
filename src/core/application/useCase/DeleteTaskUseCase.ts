import { Injectable } from '@nestjs/common';
import {
  DeleteTaskCommand,
  DeleteTaskUseCasePort,
} from 'src/core/port/primary/useCase/DeleteTaskUseCasePort';
import { TaskRepositoryPort } from 'src/core/port/secondary/repository/TaskRepositoryPort';

@Injectable()
export class DeleteTaskUseCase implements DeleteTaskUseCasePort {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async handle(deleteTaskCommand: DeleteTaskCommand): Promise<void> {
    await this.taskRepository.deleteOne(deleteTaskCommand.id);
  }
}
