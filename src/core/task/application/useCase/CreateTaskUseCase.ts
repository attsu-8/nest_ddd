import { Injectable } from '@nestjs/common';
import { DuplicateTaskChecker } from 'src/core/task/domain/service/DuplicateTaskChecker';
import {
  CreateTaskCommand,
  CreateTaskUseCasePort,
} from 'src/core/task/port/primary/useCase/CreateTaskUseCasePort';
import { NewTaskCreatorPort } from 'src/core/task/port/secondary/factory/NewTaskCreatorPort';
import { Exception } from 'src/shared/exception';
import { TaskName } from '../../domain/valueObject/TaskName';
import { TaskRepositoryPort } from '../../port/secondary/repository/TaskRepositoryPort';

@Injectable()
export class CreateTaskUseCase implements CreateTaskUseCasePort {
  constructor(
    private readonly duplicateTaskChecker: DuplicateTaskChecker,
    private readonly newTaskCreator: NewTaskCreatorPort,
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async handle(createTaskCommand: CreateTaskCommand): Promise<void> {
    const task = await this.newTaskCreator.handle(
      new TaskName(createTaskCommand.name),
    );

    const doesTaskExist = await this.duplicateTaskChecker.handle(task);
    if (doesTaskExist) throw new Exception('Same task already exists.');

    await this.taskRepository.save(task);
  }
}
