import { Injectable } from '@nestjs/common';
import { DuplicateTaskChecker } from 'src/core/domain/task/service/DuplicateTaskChecker';
import { TaskName } from 'src/core/domain/task/valueObject/TaskName';
import {
  UpdateTaskCommand,
  UpdateTaskUseCasePort,
} from 'src/core/port/primary/useCase/UpdateTaskUseCasePort';
import { TaskRepositoryPort } from 'src/core/port/secondary/repository/TaskRepositoryPort';
import { Exception } from 'src/exception';

@Injectable()
export class UpdateTaskUseCase implements UpdateTaskUseCasePort {
  constructor(
    private readonly duplicateTaskChecker: DuplicateTaskChecker,
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async handle(updateTaskCommand: UpdateTaskCommand): Promise<void> {
    const task = await this.taskRepository.findOneById(updateTaskCommand.id);
    if (!task)
      throw new Exception(`Cannot find task (id: ${updateTaskCommand.id}).`);

    task.updateName(new TaskName(updateTaskCommand.name));
    task.updateDone(updateTaskCommand.done);

    // TODO: Fix bug. Since in this way, updating only status is not available.
    const doesTaskExist = await this.duplicateTaskChecker.handle(task);
    if (doesTaskExist) throw new Exception('Same task already exists.');
    await this.taskRepository.updateOne(task);
  }
}
