import { Injectable } from '@nestjs/common';
import { DuplicateTaskChecker } from 'src/core/domain/task/service/DuplicateTaskChecker';
import { TaskName } from 'src/core/domain/task/valueObject/TaskName';
import { NewTaskCreatorPort } from 'src/core/port/secondary/factory/NewTaskCreatorPort';
import { TaskRepositoryPort } from 'src/core/port/secondary/repository/TaskRepositoryPort';
import { Exception } from 'src/exception';
import { CreateTaskCommand } from './commands/CreateTaskCommand';

@Injectable()
export class CreateTaskUseCase {
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
