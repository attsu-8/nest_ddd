import { Injectable } from '@nestjs/common';
import { DuplicateTaskChecker } from 'src/core/task/domain/service/DuplicateTaskChecker';
import {
  UpdateTaskCommand,
  UpdateTaskUseCasePort,
} from 'src/core/task/port/primary/useCase/UpdateTaskUseCasePort';
import { Exception } from 'src/shared/exception';
import { TaskName } from '../../domain/valueObject/TaskName';
import { TaskRepositoryPort } from '../../port/secondary/repository/TaskRepositoryPort';

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
